import BlurText from '@/components/BlurText'
import GradientText from '@/components/GradientText'
import ShinyText from '@/components/ShinyText'
import CountUp from '@/components/CountUp'
import AnimatedContent from '@/components/AnimatedContent'
import SpotlightCard from '@/components/SpotlightCard'
import StarBorder from '@/components/StarBorder'
import DecryptedText from '@/components/DecryptedText'
import ClickSpark from '@/components/ClickSpark'
import './landing.css'

const features = [
  { title: '实时终端', desc: '内嵌真实 PTY 终端，直接运行 Claude Code，对话即操盘', icon: '⌨️' },
  { title: '智能扫盘', desc: '15:05 自动扫描涨停板，5维评分预测明日连板概率', icon: '🔍' },
  { title: '实时行情', desc: '盘中每 5 分钟刷新 ETF / 指数 / 板块，AKShare 直连', icon: '📊' },
  { title: '交易系统 V3', desc: '5 条件入场 + 70% 胜率门槛 + 严格止损，回测 83%', icon: '🎯' },
  { title: '妖股监控', desc: '封板时间+共振+换手+低价评分，Day1 锁定 Day2', icon: '🔥' },
  { title: '判断追踪', desc: '记录判断，验证对错，追踪准确率，用数据优化直觉', icon: '📝' },
]

const stats = [
  { value: 83, suffix: '%', label: '回测胜率' },
  { value: 110, suffix: '+', label: '监控个股' },
  { value: 5, suffix: 'min', label: '行情刷新' },
  { value: 6, suffix: '个', label: '数据面板' },
]

const techStack = ['React 19', 'Electron', 'TypeScript', 'Tailwind CSS', 'AKShare', 'node-cron', 'ttyd', 'Motion', 'React Bits']

export default function LandingPage() {
  return (
    <ClickSpark sparkSize={10} sparkRadius={15} sparkCount={8} sparkColor="#f59e0b">
      <div className="min-h-screen bg-[#09090b] text-white">

        {/* ===== Nav ===== */}
        <nav className="fixed top-0 w-full z-50 bg-[#09090b]/80 backdrop-blur-xl border-b border-white/5">
          <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">📊</span>
              <span className="font-bold text-white">看盘侠</span>
            </div>
            <div className="flex items-center gap-6">
              <a href="#features" className="text-sm text-gray-400 hover:text-white transition-colors">功能</a>
              <a href="#preview" className="text-sm text-gray-400 hover:text-white transition-colors">预览</a>
              <a href="#engine" className="text-sm text-gray-400 hover:text-white transition-colors">引擎</a>
              <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener"
                className="text-sm px-4 py-1.5 bg-white/10 hover:bg-white/15 rounded-lg transition-colors">
                GitHub
              </a>
            </div>
          </div>
        </nav>

        {/* ===== Hero ===== */}
        <section className="relative min-h-screen flex items-center justify-center">
          {/* 背景光晕 */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-[#f59e0b]/8 rounded-full blur-[150px] pointer-events-none" />
          <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-[#ea580c]/5 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
            <AnimatedContent distance={20} direction="vertical">
              <div className="mb-8">
                <ShinyText text="A股短线交易 AI 盯盘系统" speed={3} className="text-xs tracking-[0.3em] uppercase text-[#f59e0b]/60 font-mono" />
              </div>
            </AnimatedContent>

            <BlurText
              text="看盘侠"
              delay={150}
              animateBy="letters"
              direction="top"
              className="text-[clamp(4rem,12vw,8rem)] font-black tracking-tight leading-none"
            />

            <div className="mt-8 mb-14">
              <AnimatedContent distance={15} direction="vertical" delay={0.3}>
                <p className="text-lg md:text-xl text-gray-400 leading-relaxed max-w-lg mx-auto">
                  左手终端，右手数据。
                  <br />
                  Claude Code 驱动的智能盯盘桌面客户端。
                </p>
              </AnimatedContent>
            </div>

            <AnimatedContent distance={15} direction="vertical" delay={0.5}>
              <div className="flex gap-4 justify-center flex-wrap">
                <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener">
                  <StarBorder as="div" color="#f59e0b" speed="5s" className="px-7 py-3 text-sm font-semibold cursor-pointer">
                    ⭐ GitHub 源码
                  </StarBorder>
                </a>
                <a href="https://github.com/carey314/kanpanxia/releases" target="_blank" rel="noopener"
                  className="px-7 py-3 text-sm font-semibold bg-[#f59e0b] text-black rounded-xl hover:bg-[#fbbf24] transition-all hover:scale-[1.02]">
                  下载客户端 →
                </a>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ===== Stats ===== */}
        <section className="py-20 px-6 border-t border-white/5">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10">
            {stats.map((s, i) => (
              <AnimatedContent key={i} distance={30} direction="vertical" delay={i * 0.08}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-white mb-1 font-mono">
                    <CountUp from={0} to={s.value} duration={1.5} className="inline" />
                    <span className="text-2xl text-[#f59e0b] ml-0.5">{s.suffix}</span>
                  </div>
                  <div className="text-gray-600 text-xs tracking-wider uppercase">{s.label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ===== Features ===== */}
        <section id="features" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedContent distance={20} direction="vertical">
              <div className="text-center mb-16">
                <GradientText colors={['#f59e0b', '#ea580c', '#f59e0b', '#fbbf24']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  核心功能
                </GradientText>
                <p className="text-gray-600 mt-3 text-sm">终端 + AI + 数据，三位一体</p>
              </div>
            </AnimatedContent>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {features.map((f, i) => (
                <AnimatedContent key={i} distance={30} direction="vertical" delay={i * 0.06}>
                  <SpotlightCard className="h-full bg-[#0f0f11] border border-white/5 rounded-2xl p-6" spotlightColor="rgba(245, 158, 11, 0.08)">
                    <div className="text-2xl mb-3">{f.icon}</div>
                    <h3 className="text-base font-bold text-white mb-1.5">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ===== Preview ===== */}
        <section id="preview" className="py-28 px-6">
          <div className="max-w-5xl mx-auto">
            <AnimatedContent distance={20} direction="vertical">
              <div className="text-center mb-14">
                <GradientText colors={['#10b981', '#06b6d4', '#10b981']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  界面预览
                </GradientText>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={40} direction="vertical" delay={0.15}>
              <div className="bg-[#0f0f11] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
                {/* Mac bar */}
                <div className="h-10 bg-[#18181b] flex items-center px-4 gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-[11px] text-gray-600 ml-3 font-mono">看盘侠</span>
                </div>
                <div className="flex" style={{ height: 480 }}>
                  {/* Terminal */}
                  <div className="w-1/2 bg-[#0a0a0c] p-5 font-mono text-[12px] leading-[1.8] text-gray-500 border-r border-white/5 overflow-hidden">
                    <div><span className="text-[#10b981]">carey</span><span className="text-gray-700">@mac</span>:<span className="text-[#06b6d4]">~</span>$ <span className="text-white">claude</span></div>
                    <div className="mt-2 text-gray-700">┌ Claude Code v2.1.87</div>
                    <div className="text-gray-700">└ Opus 4.6</div>
                    <div className="mt-3"><span className="text-[#f59e0b]">{'>'}</span> <span className="text-gray-300">开启盯盘</span></div>
                    <div className="mt-1.5 text-[#10b981]">  ✓ 持仓总览.md</div>
                    <div className="text-[#10b981]">  ✓ 妖股监控.md</div>
                    <div className="text-[#10b981]">  ✓ 板块龙头.md (18板块76只)</div>
                    <div className="mt-2"><span className="text-[#f59e0b]">{'>'}</span> <span className="text-gray-500">拉取 ETF 实时行情...</span></div>
                    <div className="mt-1">  半导体ETF <span className="text-white">1.572</span> <span className="text-[#10b981]">+0.70%</span></div>
                    <div>  恒指科技 <span className="text-white">0.620</span> <span className="text-[#ef4444]">-0.64%</span></div>
                    <div className="mt-2"><span className="text-[#f59e0b]">{'>'}</span> <span className="text-gray-500">连板扫描 (15:05)</span></div>
                    <div className="mt-1">  #1 甘肃能源 ¥8.00 <span className="text-[#10b981]">71%</span></div>
                    <div>  #2 瑞斯康达 ¥15.26 <span className="text-[#10b981]">71%</span></div>
                    <div className="mt-3 text-[#10b981]">  系统就绪。</div>
                    <div className="mt-2"><span className="text-[#f59e0b]">{'>'}</span> <span className="animate-pulse text-gray-400">_</span></div>
                  </div>
                  {/* Panel */}
                  <div className="w-1/2 bg-[#111113] p-5 text-[11px] overflow-hidden">
                    <div className="flex gap-4 mb-5 text-[10px] border-b border-white/5 pb-2.5">
                      <span className="text-[#f59e0b] font-medium">仪表盘</span>
                      <span className="text-gray-700">持仓</span>
                      <span className="text-gray-700">交易系统</span>
                      <span className="text-gray-700">妖股</span>
                      <span className="text-gray-700">日志</span>
                      <span className="text-gray-700">任务</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2.5 mb-3">
                      <div className="bg-[#18181b] rounded-xl p-3.5">
                        <div className="text-[9px] text-gray-600 mb-1">总资产</div>
                        <div className="text-white font-bold text-[18px]">¥79,500</div>
                      </div>
                      <div className="bg-[#18181b] rounded-xl p-3.5">
                        <div className="text-[9px] text-gray-600 mb-1">本月盈亏</div>
                        <div className="text-[#10b981] font-bold text-[18px]">+¥1,675</div>
                      </div>
                    </div>
                    <div className="bg-[#18181b] rounded-xl p-3.5 mb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[9px] text-gray-600">回本进度</span>
                        <span className="text-[9px] text-[#f59e0b] font-mono">35%</span>
                      </div>
                      <div className="h-1.5 bg-black/50 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full" style={{ width: '35%' }} />
                      </div>
                    </div>
                    <div className="bg-[#18181b] rounded-xl p-3.5 mb-3">
                      <div className="text-[9px] text-gray-600 mb-2.5">板块强度</div>
                      {[
                        { n: '玻纤', v: '+8.21%', c: 'text-[#10b981]' },
                        { n: '光伏', v: '+6.00%', c: 'text-[#10b981]' },
                        { n: '锂矿', v: '+4.31%', c: 'text-[#10b981]' },
                        { n: '油气', v: '-5.20%', c: 'text-[#ef4444]' },
                      ].map((s, i) => (
                        <div key={i} className="flex justify-between py-0.5">
                          <span className="text-gray-500">{s.n}</span>
                          <span className={`font-mono ${s.c}`}>{s.v}</span>
                        </div>
                      ))}
                    </div>
                    <div className="bg-[#18181b] rounded-xl p-3.5">
                      <div className="text-[9px] text-gray-600 mb-2">连板预测 TOP3</div>
                      {['甘肃能源 71%', '瑞斯康达 71%', '中安科 71%'].map((s, i) => (
                        <div key={i} className="flex justify-between py-0.5">
                          <span className="text-gray-500">{s.split(' ')[0]}</span>
                          <span className="font-mono text-[#f59e0b]">{s.split(' ')[1]}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ===== Scan Engine ===== */}
        <section id="engine" className="py-28 px-6 bg-[#07070a]">
          <div className="max-w-4xl mx-auto">
            <AnimatedContent distance={20} direction="vertical">
              <div className="text-center mb-14">
                <GradientText colors={['#ef4444', '#f59e0b', '#ef4444']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  连板预测引擎
                </GradientText>
                <p className="text-gray-600 mt-3 text-sm">每日收盘自动扫描，5 维度评分锁定明日候选</p>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={30} direction="vertical" delay={0.1}>
              <div className="grid grid-cols-5 gap-3 mb-10">
                {[
                  { name: '封板时间', weight: '30%', desc: '越早越强' },
                  { name: '板块共振', weight: '25%', desc: '≥3只涨停' },
                  { name: '换手率', weight: '15%', desc: '5-15%' },
                  { name: '低价', weight: '15%', desc: '<20元' },
                  { name: '小盘', weight: '15%', desc: '<100亿' },
                ].map((d, i) => (
                  <div key={i} className="bg-[#0f0f11] border border-white/5 rounded-xl p-4 text-center">
                    <div className="text-xl font-black text-[#f59e0b] mb-0.5">{d.weight}</div>
                    <div className="text-white text-xs font-bold mb-0.5">{d.name}</div>
                    <div className="text-gray-700 text-[10px]">{d.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent distance={30} direction="vertical" delay={0.2}>
              <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-6 font-mono text-[13px]">
                <div className="text-gray-700 mb-2">$ python3 scan_next_day.py</div>
                <div className="text-[#f59e0b] mb-4">{'>'} 连板预测 | 2026-04-14 15:05</div>
                <div className="text-gray-600 mb-4">涨停 59只 | 首板 51只 | 筛选 &lt;120元 排除688</div>
                <div className="space-y-3">
                  {[
                    { rank: '1', code: '000791', name: '甘肃能源', price: '8.00', score: 65, prob: 71 },
                    { rank: '2', code: '603803', name: '瑞斯康达', price: '15.26', score: 63, prob: 71 },
                    { rank: '3', code: '600654', name: '中安科', price: '4.49', score: 63, prob: 71 },
                  ].map((s) => (
                    <div key={s.code} className="flex items-center gap-4">
                      <span className="text-gray-700 w-4">#{s.rank}</span>
                      <span className="text-[#f59e0b] text-[10px] px-1.5 py-0.5 border border-[#f59e0b]/20 rounded">A</span>
                      <span className="text-[#06b6d4] w-16">{s.code}</span>
                      <span className="text-white w-24">{s.name}</span>
                      <span className="text-gray-500">¥{s.price}</span>
                      <span className="text-gray-700 ml-auto">得分{s.score}</span>
                      <span className="text-[#10b981] font-bold">{s.prob}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ===== Architecture ===== */}
        <section className="py-28 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedContent distance={20} direction="vertical">
              <div className="text-center mb-14">
                <GradientText colors={['#06b6d4', '#3b82f6', '#06b6d4']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  Architecture
                </GradientText>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={30} direction="vertical" delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Main Process */}
                <div className="md:col-span-3 bg-[#0f0f11] border border-white/5 rounded-2xl p-6">
                  <div className="text-[#06b6d4] text-xs font-mono mb-4 tracking-wider">ELECTRON MAIN PROCESS</div>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { time: '08:57', task: 'Pre-market Scan', tool: 'AKShare' },
                      { time: '09:30-15:00', task: 'Realtime Refresh', tool: 'Every 5min' },
                      { time: '15:05', task: 'Board Prediction', tool: 'ML Scoring' },
                    ].map((t, i) => (
                      <div key={i} className="bg-black/30 rounded-xl p-3 text-center">
                        <div className="text-[#f59e0b] font-mono text-sm font-bold">{t.time}</div>
                        <div className="text-white text-xs mt-1">{t.task}</div>
                        <div className="text-gray-700 text-[10px] mt-0.5">{t.tool}</div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-center my-4 text-gray-700">
                    <div className="flex-1 h-px bg-white/5" />
                    <span className="px-4 text-xs">↓ trading-data.json ↓</span>
                    <div className="flex-1 h-px bg-white/5" />
                  </div>
                  <div className="text-center text-gray-600 text-xs">fs.watch → IPC push → Auto refresh</div>
                </div>
                {/* Renderer */}
                <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-5 text-center">
                  <div className="text-[#10b981] text-xs font-mono mb-3 tracking-wider">TERMINAL</div>
                  <div className="text-3xl mb-2">⌨️</div>
                  <div className="text-white text-sm font-bold">ttyd PTY</div>
                  <div className="text-gray-600 text-[10px] mt-1">Real shell access</div>
                </div>
                <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-5 text-center">
                  <div className="text-[#f59e0b] text-xs font-mono mb-3 tracking-wider">DASHBOARD</div>
                  <div className="text-3xl mb-2">📊</div>
                  <div className="text-white text-sm font-bold">6 Tabs</div>
                  <div className="text-gray-600 text-[10px] mt-1">Live data panels</div>
                </div>
                <div className="bg-[#0f0f11] border border-white/5 rounded-2xl p-5 text-center">
                  <div className="text-[#ef4444] text-xs font-mono mb-3 tracking-wider">SCANNER</div>
                  <div className="text-3xl mb-2">🔥</div>
                  <div className="text-white text-sm font-bold">Prediction</div>
                  <div className="text-gray-600 text-[10px] mt-1">5-dim scoring</div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ===== Tech Stack ===== */}
        <section className="py-20 px-6 bg-[#07070a]">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedContent distance={20} direction="vertical">
              <h2 className="text-2xl font-bold mb-8 text-gray-400">Tech Stack</h2>
            </AnimatedContent>
            <div className="flex flex-wrap justify-center gap-2.5">
              {techStack.map((t, i) => (
                <AnimatedContent key={t} distance={15} direction="vertical" delay={i * 0.03}>
                  <span className="px-4 py-2 bg-[#0f0f11] border border-white/5 rounded-full text-gray-500 text-xs font-mono hover:text-[#f59e0b] hover:border-[#f59e0b]/20 transition-all cursor-default">
                    {t}
                  </span>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="py-32 px-6 text-center relative overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#f59e0b]/5 rounded-full blur-[150px] pointer-events-none" />
          <div className="relative z-10">
            <AnimatedContent distance={30} direction="vertical">
              <div className="mb-6">
                <DecryptedText text="Start Trading" speed={80} maxIterations={15} className="text-5xl md:text-7xl font-black inline-block" />
              </div>
              <p className="text-gray-500 text-base mb-10 max-w-md mx-auto leading-relaxed">
                下载看盘侠，连接 Claude Code
                <br />
                让 AI 帮你看盘、扫盘、选股
              </p>
              <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener"
                className="inline-block px-10 py-3.5 text-base font-bold bg-[#f59e0b] text-black rounded-xl hover:bg-[#fbbf24] transition-all hover:scale-[1.02]">
                前往 GitHub →
              </a>
            </AnimatedContent>
          </div>
        </section>

        {/* ===== Footer ===== */}
        <footer className="py-8 px-6 border-t border-white/5 text-center">
          <p className="text-gray-700 text-xs">
            看盘侠 KanPanXia — Built with Claude Code + React Bits
          </p>
          <p className="mt-1">
            <a href="https://github.com/carey314/kanpanxia" className="text-gray-700 text-xs hover:text-[#f59e0b] transition-colors">
              github.com/carey314/kanpanxia
            </a>
          </p>
        </footer>
      </div>
    </ClickSpark>
  )
}
