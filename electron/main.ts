import { app, BrowserWindow, ipcMain, Tray, Menu, nativeImage } from 'electron'
import path from 'path'
import os from 'os'
import fs from 'fs'
import http from 'http'
import net from 'net'
import { fileURLToPath } from 'url'
import { spawn, type ChildProcess } from 'child_process'
import cron from 'node-cron'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const CWD = os.homedir() + '/projects/AI_Project/todoDemo/claude盯盘'
const SCRIPTS = path.join(CWD, 'scripts')
const TRADING_DATA_PATH = path.join(CWD, 'trading-data.json')
const SCAN_RESULT_PATH = path.join(CWD, 'scan_result.json')

let mainWindow: BrowserWindow | null = null
let tray: Tray | null = null
let ttydProcess: ChildProcess | null = null
const APP_PORT = 18080

// ============================================================
// 工具函数
// ============================================================

function readJSON(filepath: string): any {
  try { return JSON.parse(fs.readFileSync(filepath, 'utf-8')) } catch { return null }
}

function writeJSON(filepath: string, data: any) {
  fs.writeFileSync(filepath, JSON.stringify(data, null, 2), 'utf-8')
}

function pushToFrontend(data: any) {
  if (mainWindow && !mainWindow.isDestroyed()) {
    mainWindow.webContents.send('trading-data:updated', data)
    console.log(`[push] 数据已推送到前端 ${new Date().toLocaleTimeString('zh-CN')}`)
  }
}

function log(tag: string, msg: string) {
  console.log(`[${tag}] ${msg}`)
}

/** 执行 shell 命令并返回 stdout */
function execCmd(cmd: string): Promise<string> {
  return new Promise((resolve) => {
    const child = spawn('/bin/zsh', ['-lc', cmd], { env: process.env })
    let out = ''
    child.stdout?.on('data', (d: Buffer) => { out += d.toString() })
    child.stderr?.on('data', (d: Buffer) => { out += d.toString() })
    child.on('close', () => resolve(out.trim()))
    child.on('error', () => resolve(''))
  })
}

/** 执行 Python 脚本，返回 JSON 结果 */
function runPython(script: string): Promise<any> {
  return new Promise((resolve) => {
    const child = spawn('python3', [script], {
      cwd: CWD,
      env: { ...process.env, NO_PROXY: '*', PYTHONIOENCODING: 'utf-8' },
    })
    let stdout = ''
    let stderr = ''
    child.stdout?.on('data', (d: Buffer) => { stdout += d.toString() })
    child.stderr?.on('data', (d: Buffer) => { stderr += d.toString() })
    child.on('close', (code) => {
      if (code === 0 && stdout.trim()) {
        try { resolve(JSON.parse(stdout.trim())) } catch { resolve(null) }
      } else {
        log('python', `脚本 ${path.basename(script)} 失败: ${stderr.slice(0, 200)}`)
        resolve(null)
      }
    })
    child.on('error', () => resolve(null))
  })
}

// ============================================================
// 数据引擎：统一管理 trading-data.json
// ============================================================

ipcMain.handle('trading-data:get', () => readJSON(TRADING_DATA_PATH))

/** 监听 trading-data.json 变化 → 推送到前端 */
function watchTradingData() {
  if (!fs.existsSync(TRADING_DATA_PATH)) return
  let debounce: ReturnType<typeof setTimeout> | null = null
  fs.watch(TRADING_DATA_PATH, () => {
    if (debounce) clearTimeout(debounce)
    debounce = setTimeout(() => {
      const data = readJSON(TRADING_DATA_PATH)
      if (data) pushToFrontend(data)
    }, 300)
  })
  log('data', `监听 ${TRADING_DATA_PATH}`)
}

/** 拉取实时行情 → 合并到 JSON → 推送 */
async function refreshMarketData() {
  log('task', '拉取实时行情...')
  const realtime = await runPython(path.join(SCRIPTS, 'fetch_realtime.py'))
  if (!realtime) { log('task', '行情拉取失败'); return }

  // 调用 update_json.py 合并
  const child = spawn('python3', [path.join(SCRIPTS, 'update_json.py')], {
    cwd: CWD,
    env: { ...process.env, NO_PROXY: '*', PYTHONIOENCODING: 'utf-8' },
  })
  child.stdin?.write(JSON.stringify(realtime))
  child.stdin?.end()

  let result = ''
  child.stdout?.on('data', (d: Buffer) => { result += d.toString() })
  child.on('close', () => {
    log('task', `行情更新: ${result.trim()}`)
    // fs.watch 会自动触发 pushToFrontend
  })
}

/** 跑连板扫描 → 合并到 JSON → 推送 */
async function runDailyScan() {
  log('task', '执行连板扫描...')
  const scanScript = path.join(CWD, 'scan_next_day.py')
  if (!fs.existsSync(scanScript)) { log('task', 'scan_next_day.py 不存在'); return }

  await runPython(scanScript)

  // 扫描结果合并到 trading-data.json
  const child = spawn('python3', [path.join(SCRIPTS, 'update_json.py')], {
    cwd: CWD,
    env: { ...process.env, NO_PROXY: '*', PYTHONIOENCODING: 'utf-8' },
  })
  child.stdin?.end() // 不传 stdin，update_json.py 会自动读 scan_result.json
  child.on('close', () => log('task', '扫描结果已合并'))
}

// ============================================================
// 定时任务调度（node-cron）
// ============================================================

function setupCronJobs() {
  // 盘中行情刷新：交易日 9:30-15:00 每5分钟
  cron.schedule('*/5 9-14 * * 1-5', () => {
    const hour = new Date().getHours()
    const min = new Date().getMinutes()
    // 9:30 之前不跑
    if (hour === 9 && min < 30) return
    refreshMarketData()
  }, { timezone: 'Asia/Shanghai' })

  // 15:00 最后一次刷新
  cron.schedule('0 15 * * 1-5', () => {
    refreshMarketData()
  }, { timezone: 'Asia/Shanghai' })

  // 15:05 连板扫描
  cron.schedule('5 15 * * 1-5', () => {
    runDailyScan()
  }, { timezone: 'Asia/Shanghai' })

  // 8:57 盘前刷新
  cron.schedule('57 8 * * 1-5', () => {
    refreshMarketData()
  }, { timezone: 'Asia/Shanghai' })

  log('cron', '定时任务已注册:')
  log('cron', '  08:57      盘前行情')
  log('cron', '  09:30-15:00 每5分钟刷新行情')
  log('cron', '  15:05      连板扫描')
}

// 手动触发刷新（前端刷新按钮）
ipcMain.handle('market:refresh', async () => {
  await refreshMarketData()
  return { success: true }
})

ipcMain.handle('scan:run', async () => {
  await runDailyScan()
  return { success: true }
})

// ============================================================
// ttyd 终端
// ============================================================

function startTtyd() {
  const env = { ...process.env }
  delete env.CLAUDECODE
  delete env.CLAUDE_CODE

  ttydProcess = spawn('ttyd', [
    '--port', '7681', '--writable',
    '--base-path', '/terminal', '--max-clients', '5',
    '/bin/zsh', '-l',
  ], { cwd: CWD, env, stdio: 'pipe' })

  ttydProcess.on('error', (err) => log('ttyd', `启动失败: ${err.message}`))
  ttydProcess.stderr?.on('data', () => {})
  log('ttyd', 'http://localhost:7681/terminal/')
}

// ============================================================
// 环境检测 IPC
// ============================================================

ipcMain.handle('env:check', async () => {
  const [ttydPath, claudePath, brewPath, ttydPort] = await Promise.all([
    execCmd('which ttyd'), execCmd('which claude'),
    execCmd('which brew'), execCmd('lsof -i :7681 -t'),
  ])
  return {
    hasBrew: !!brewPath, hasTtyd: !!ttydPath, hasClaude: !!claudePath,
    ttydRunning: !!ttydPort, ttydPath, claudePath,
    platform: process.platform, arch: process.arch,
  }
})

ipcMain.handle('env:setup-ttyd', async () => {
  const result = await execCmd('brew install ttyd 2>&1')
  return { success: !result.includes('Error'), output: result }
})

ipcMain.handle('env:setup-service', async () => {
  const plistPath = `${os.homedir()}/Library/LaunchAgents/com.carey.ttyd.plist`
  const ttydPath = (await execCmd('which ttyd')).trim()
  if (!ttydPath) return { success: false, output: '请先安装 ttyd' }
  const plist = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.carey.ttyd</string>
  <key>ProgramArguments</key><array>
    <string>${ttydPath}</string><string>--port</string><string>7681</string>
    <string>--writable</string><string>--base-path</string><string>/terminal</string>
    <string>--max-clients</string><string>5</string><string>/bin/zsh</string><string>-l</string>
  </array>
  <key>WorkingDirectory</key><string>${CWD}</string>
  <key>RunAtLoad</key><true/><key>KeepAlive</key><true/>
</dict></plist>`
  fs.writeFileSync(plistPath, plist)
  await execCmd(`launchctl unload ${plistPath} 2>/dev/null; launchctl load ${plistPath}`)
  await new Promise(r => setTimeout(r, 1500))
  const check = await execCmd('lsof -i :7681 -t')
  return { success: !!check, output: check ? '服务已启动' : '启动失败' }
})

ipcMain.handle('env:setup-claude', async () => {
  const result = await execCmd('npm install -g @anthropic-ai/claude-code 2>&1 | tail -3')
  return { success: !result.includes('ERR'), output: result }
})

ipcMain.on('env:skip', () => {})

// ============================================================
// 终端 IPC（PTY — 备用，主要用 ttyd）
// ============================================================

let shell: any = null
ipcMain.on('terminal:input', (_e, data: string) => shell?.write(data))
ipcMain.on('terminal:resize', (_e, cols: number, rows: number) => shell?.resize(cols, rows))
ipcMain.on('terminal:restart', () => {})

// ============================================================
// 窗口
// ============================================================

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1400, height: 900, minWidth: 1000, minHeight: 600,
    titleBarStyle: 'hiddenInset',
    trafficLightPosition: { x: 12, y: 12 },
    backgroundColor: '#18191c',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      nodeIntegration: false, contextIsolation: true,
      webSecurity: false,
    },
  })

  if (process.env.VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(process.env.VITE_DEV_SERVER_URL)
  } else {
    mainWindow.loadURL(`http://127.0.0.1:${APP_PORT}`)
  }

  mainWindow.on('close', (e) => {
    if (!app.isQuitting) { e.preventDefault(); mainWindow?.hide() }
  })
  mainWindow.on('closed', () => { mainWindow = null })
}

// ============================================================
// 托盘
// ============================================================

function createTray() {
  const icon = nativeImage.createFromDataURL(
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAbwAAAG8B8aLcQwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAABNSURBVDiNY/z//z8DEwMDAwMDAxMDGQCSZoIrpKsBjKQawMjIyEA2A/7//89ENgMYGRnJZgDIFSQbAHIFyQYwkssARkZGxv///5NsAABELQ0fk/hIHwAAAABJRU5ErkJggg=='
  )
  tray = new Tray(icon.resize({ width: 16, height: 16 }))
  tray.setToolTip('看盘侠')
  tray.setContextMenu(Menu.buildFromTemplate([
    { label: '显示窗口', click: () => mainWindow?.show() },
    { label: '刷新行情', click: () => refreshMarketData() },
    { label: '连板扫描', click: () => runDailyScan() },
    { type: 'separator' },
    { label: '退出', click: () => { app.isQuitting = true; app.quit() } },
  ]))
  tray.on('click', () => mainWindow?.show())
}

// ============================================================
// 生产模式 HTTP 服务
// ============================================================

function startProductionServer() {
  startTtyd()

  const distPath = path.join(__dirname, '../dist')
  const mimeTypes: Record<string, string> = {
    '.html': 'text/html', '.js': 'application/javascript', '.css': 'text/css',
    '.json': 'application/json', '.png': 'image/png', '.svg': 'image/svg+xml',
  }

  const server = http.createServer((req, res) => {
    if (req.url === '/trading-data.json') {
      const data = readJSON(TRADING_DATA_PATH)
      res.writeHead(200, { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' })
      res.end(JSON.stringify(data))
      return
    }
    if (req.url?.startsWith('/terminal')) {
      const proxy = http.request(
        { hostname: '127.0.0.1', port: 7681, path: req.url, method: req.method, headers: req.headers },
        (pRes) => { res.writeHead(pRes.statusCode || 200, pRes.headers); pRes.pipe(res) }
      )
      req.pipe(proxy)
      proxy.on('error', () => res.end())
      return
    }
    let filePath = path.join(distPath, req.url === '/' ? 'index.html' : req.url || '')
    if (!fs.existsSync(filePath)) filePath = path.join(distPath, 'index.html')
    const ext = path.extname(filePath)
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' })
    fs.createReadStream(filePath).pipe(res)
  })

  server.on('upgrade', (req, socket, head) => {
    if (req.url?.startsWith('/terminal')) {
      const upstream = net.connect(7681, '127.0.0.1', () => {
        upstream.write(`GET ${req.url} HTTP/1.1\r\n` +
          Object.entries(req.headers).map(([k, v]) => `${k}: ${v}`).join('\r\n') + '\r\n\r\n')
        upstream.write(head)
        socket.pipe(upstream).pipe(socket)
      })
      upstream.on('error', () => socket.destroy())
      socket.on('error', () => upstream.destroy())
    }
  })

  server.listen(APP_PORT, '127.0.0.1', () => log('http', `http://127.0.0.1:${APP_PORT}`))
}

// ============================================================
// 启动
// ============================================================

app.whenReady().then(() => {
  if (!process.env.VITE_DEV_SERVER_URL) startProductionServer()

  watchTradingData()
  setupCronJobs()
  createWindow()
  createTray()

  // 启动后立刻刷新一次行情
  setTimeout(() => refreshMarketData(), 3000)

  app.on('activate', () => {
    if (!mainWindow) createWindow()
    else mainWindow.show()
  })
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

app.on('before-quit', () => {
  app.isQuitting = true
  ttydProcess?.kill()
})

declare module 'electron' { interface App { isQuitting: boolean } }
app.isQuitting = false
