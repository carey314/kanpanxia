import BlurText from '@/components/BlurText'
import GradientText from '@/components/GradientText'
// SplitText 依赖 GSAP 付费插件，用 FadeContent 替代
import ShinyText from '@/components/ShinyText'
import CountUp from '@/components/CountUp'
import AnimatedContent from '@/components/AnimatedContent'
import SpotlightCard from '@/components/SpotlightCard'
import Aurora from '@/components/Aurora'
import StarBorder from '@/components/StarBorder'
import DecryptedText from '@/components/DecryptedText'
import ClickSpark from '@/components/ClickSpark'
import './landing.css'

const features = [
  { title: '实时终端', desc: '内嵌真实 PTY 终端，直接运行 Claude Code，对话即操盘', icon: '⌨️' },
  { title: '智能扫盘', desc: '每日 15:05 自动扫描涨停板，评分模型预测明日连板概率', icon: '🔍' },
  { title: '实时行情', desc: '盘中每 5 分钟自动刷新 ETF/指数/板块数据，AKShare 直连', icon: '📊' },
  { title: '交易系统 V3', desc: '5 条件入场 + 70% 胜率门槛 + 严格止损止盈，回测 83% 胜率', icon: '🎯' },
  { title: '妖股监控', desc: '封板时间 + 板块共振 + 换手率 + 低价评分，Day1 锁定 Day2', icon: '🔥' },
  { title: '判断追踪', desc: '记录每日判断，验证对错，追踪分类准确率，用数据优化直觉', icon: '📝' },
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
      <div className="landing-page min-h-screen bg-[#0a0a0b] text-white overflow-x-hidden">

        {/* ====== Hero ====== */}
        <section className="relative min-h-screen flex flex-col items-center justify-center px-6">
          <div className="absolute inset-0 z-0 opacity-60">
            <Aurora colorStops={['#f59e0b', '#ea580c', '#f59e0b']} speed={0.3} />
          </div>
          <div className="absolute inset-0 z-0 hero-gradient" />

          <div className="relative z-10 text-center max-w-4xl mx-auto">
            <div className="mb-6">
              <ShinyText text="A股短线交易 AI 盯盘系统" speed={3} className="text-sm tracking-widest text-[#f59e0b]/70 font-mono" />
            </div>

            <BlurText text="看盘侠" delay={150} animateBy="letters" direction="top" className="text-7xl md:text-9xl font-black tracking-tight mb-2" />

            <div className="mt-8 mb-12 max-w-2xl mx-auto">
              <BlurText text="左手终端，右手数据。Claude Code 驱动的智能盯盘桌面客户端。" delay={30} animateBy="words" direction="bottom" className="text-lg md:text-xl text-gray-400 leading-relaxed" />
            </div>

            <div className="flex gap-4 justify-center flex-wrap">
              <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener">
                <StarBorder as="div" color="#f59e0b" speed="5s" className="px-8 py-3 text-base font-semibold cursor-pointer">
                  ⭐ GitHub 源码
                </StarBorder>
              </a>
              <a href="https://github.com/carey314/kanpanxia/releases" target="_blank" rel="noopener" className="px-8 py-3 text-base font-semibold bg-[#f59e0b] text-black rounded-xl hover:bg-[#fbbf24] transition-colors">
                下载客户端
              </a>
            </div>
          </div>

          <div className="absolute bottom-10 animate-bounce text-gray-600">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M19 12l-7 7-7-7" /></svg>
          </div>
        </section>

        {/* ====== Stats ====== */}
        <section className="py-20 px-6">
          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((s, i) => (
              <AnimatedContent key={i} distance={40} direction="vertical" delay={i * 0.1}>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-black text-[#f59e0b] mb-2 font-mono">
                    <CountUp from={0} to={s.value} duration={1.5} className="inline" />
                    <span className="text-2xl md:text-3xl ml-1">{s.suffix}</span>
                  </div>
                  <div className="text-gray-500 text-sm">{s.label}</div>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ====== Features ====== */}
        <section className="py-24 px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <AnimatedContent distance={30} direction="vertical">
                <GradientText colors={['#f59e0b', '#ea580c', '#f59e0b', '#fbbf24']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  核心功能
                </GradientText>
                <p className="text-gray-500 mt-4">终端 + AI + 数据，三位一体的盯盘体验</p>
              </AnimatedContent>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {features.map((f, i) => (
                <AnimatedContent key={i} distance={40} direction="vertical" delay={i * 0.08}>
                  <SpotlightCard className="h-full bg-[#111113] border border-[#1a1a1c] rounded-2xl p-6" spotlightColor="rgba(245, 158, 11, 0.12)">
                    <div className="text-3xl mb-4">{f.icon}</div>
                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                  </SpotlightCard>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ====== Screenshot ====== */}
        <section className="py-24 px-6 bg-[#07070a]">
          <div className="max-w-6xl mx-auto">
            <AnimatedContent distance={30} direction="vertical">
              <div className="text-center mb-12">
                <GradientText colors={['#10b981', '#06b6d4', '#10b981']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  界面预览
                </GradientText>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={50} direction="vertical" delay={0.2}>
              <div className="bg-[#111113] border border-[#1a1a1c] rounded-2xl overflow-hidden shadow-2xl shadow-[#f59e0b]/5">
                {/* Mac 标题栏 */}
                <div className="h-10 bg-[#1a1a1c] flex items-center px-4 gap-2">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-xs text-gray-600 ml-4 font-mono">看盘侠 — 左终端 右面板</span>
                </div>
                <div className="flex" style={{ height: '520px' }}>
                  {/* 终端侧 */}
                  <div className="w-1/2 bg-[#0f1013] p-5 font-mono text-[13px] text-gray-400 border-r border-[#1a1a1c] overflow-hidden">
                    <div><span className="text-green-500">carey</span><span className="text-gray-600">@mac</span>:<span className="text-[#06b6d4]">~/claude盯盘</span>$ <span className="text-white">claude</span></div>
                    <div className="mt-3 text-gray-600">┌ Claude Code v2.1.87</div>
                    <div className="text-gray-600">└ Opus 4.6</div>
                    <div className="mt-4 text-[#f59e0b]">{'>'} <span className="text-white">开启盯盘</span></div>
                    <div className="mt-2 text-green-500">  读取 持仓总览.md ✓</div>
                    <div className="text-green-500">  读取 妖股监控.md ✓</div>
                    <div className="text-green-500">  读取 板块龙头.md (18板块76只) ✓</div>
                    <div className="mt-3 text-[#f59e0b]">{'>'} <span className="text-gray-400">拉取 ETF 实时行情...</span></div>
                    <div className="mt-1">  半导体ETF <span className="text-white">1.572</span> <span className="text-green-500">+0.70%</span></div>
                    <div>  恒指科技 <span className="text-white">0.620</span> <span className="text-red-500">-0.64%</span></div>
                    <div>  医疗ETF <span className="text-white">0.335</span> <span className="text-red-500">-1.18%</span></div>
                    <div className="mt-3 text-[#f59e0b]">{'>'} <span className="text-gray-400">连板扫描完成 (15:05)</span></div>
                    <div className="mt-1">  #1 甘肃能源 ¥8.00 得分65 <span className="text-green-500">概率71%</span></div>
                    <div>  #2 瑞斯康达 ¥15.26 得分63 <span className="text-green-500">概率71%</span></div>
                    <div>  #3 中安科 ¥4.49 得分63 <span className="text-green-500">概率71%</span></div>
                    <div className="mt-4 text-green-500">  盯盘系统就绪。</div>
                    <div className="mt-3 text-[#f59e0b]">{'>'} <span className="animate-pulse text-white">_</span></div>
                  </div>
                  {/* 面板侧 */}
                  <div className="w-1/2 bg-[#18191c] p-4 text-xs overflow-hidden">
                    <div className="flex gap-3 mb-4 text-[10px] border-b border-[#222] pb-2">
                      <span className="text-[#f59e0b] font-medium">仪表盘</span>
                      <span className="text-gray-600">持仓</span>
                      <span className="text-gray-600">交易系统</span>
                      <span className="text-gray-600">妖股</span>
                      <span className="text-gray-600">日志</span>
                      <span className="text-gray-600">任务</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-[#1e1f22] rounded-lg p-3">
                        <div className="text-[10px] text-gray-500">总资产</div>
                        <div className="text-white font-bold text-lg">¥79,500</div>
                        <div className="text-[9px] text-gray-600">三账户合计</div>
                      </div>
                      <div className="bg-[#1e1f22] rounded-lg p-3">
                        <div className="text-[10px] text-gray-500">本月盈亏</div>
                        <div className="text-green-500 font-bold text-lg">+¥1,675</div>
                        <div className="text-[9px] text-gray-600">+4.99% 跑赢大盘</div>
                      </div>
                    </div>
                    <div className="bg-[#1e1f22] rounded-lg p-3 mb-3">
                      <div className="text-[10px] text-gray-500 mb-2">回本进度</div>
                      <div className="h-2 bg-[#111] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#f59e0b] to-[#fbbf24] rounded-full" style={{ width: '35%' }} />
                      </div>
                      <div className="flex justify-between mt-1 text-[9px] text-gray-600">
                        <span>亏损 ¥8,170</span><span className="text-[#f59e0b]">35%</span><span>回本</span>
                      </div>
                    </div>
                    <div className="bg-[#1e1f22] rounded-lg p-3 mb-3">
                      <div className="text-[10px] text-gray-500 mb-2">板块强度 (实时)</div>
                      <div className="space-y-1.5">
                        {[
                          { name: '玻纤', val: '+8.21%', tag: '新方向' },
                          { name: '光伏', val: '+6.00%', tag: '启动' },
                          { name: '锂矿', val: '+4.31%', tag: '持续' },
                          { name: '油气', val: '-5.20%', tag: '退潮' },
                        ].map((s, i) => (
                          <div key={i} className="flex items-center justify-between">
                            <span className="text-gray-400">{s.name}</span>
                            <span className={`font-mono ${s.val.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{s.val}</span>
                            <span className={`text-[8px] px-1.5 py-0.5 rounded border ${
                              s.tag === '新方向' ? 'text-[#f59e0b] border-[#f59e0b]/30' :
                              s.tag === '启动' ? 'text-green-500 border-green-500/30' :
                              s.tag === '持续' ? 'text-[#06b6d4] border-[#06b6d4]/30' :
                              'text-red-500 border-red-500/30'
                            }`}>{s.tag}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="bg-[#1e1f22] rounded-lg p-3">
                      <div className="text-[10px] text-gray-500 mb-2">连板预测 TOP3</div>
                      <div className="space-y-1">
                        {['甘肃能源 ¥8.00 71%', '瑞斯康达 ¥15.26 71%', '中安科 ¥4.49 71%'].map((s, i) => (
                          <div key={i} className="text-[10px] text-gray-400 flex justify-between">
                            <span>{s.split(' ')[0]}</span>
                            <span className="font-mono text-[#f59e0b]">{s.split(' ')[2]}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ====== Architecture ====== */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto">
            <AnimatedContent distance={30} direction="vertical">
              <div className="text-center mb-12">
                <GradientText colors={['#06b6d4', '#3b82f6', '#06b6d4']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  架构设计
                </GradientText>
              </div>
            </AnimatedContent>
            <AnimatedContent distance={40} direction="vertical" delay={0.2}>
              <div className="bg-[#111113] border border-[#1a1a1c] rounded-2xl p-6 md:p-8 font-mono text-[11px] md:text-sm">
                <pre className="text-gray-500 leading-relaxed overflow-x-auto whitespace-pre">{`┌──────────────────────────────────────────┐
│         Electron 主进程 (node-cron)       │
│                                          │
│  08:57  盘前扫描 ──→ AKShare Python     │
│  09:30  每5min刷新 ──→ fetch_realtime.py │
│  15:05  连板扫描 ──→ scan_next_day.py    │
│              │                            │
│              ↓                            │
│    trading-data.json (单一数据源)          │
│              │                            │
│         fs.watch → IPC 推送               │
├──────────────┼───────────────────────────┤
│  渲染进程     ↓                           │
│  ┌────────┐  ┌──────────────────────┐    │
│  │  ttyd  │  │  React 前端 (6 Tab)  │    │
│  │  终端  │  │  自动刷新 · 0延迟    │    │
│  └────────┘  └──────────────────────┘    │
└──────────────────────────────────────────┘`}</pre>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ====== Scan Demo ====== */}
        <section className="py-24 px-6 bg-[#07070a]">
          <div className="max-w-4xl mx-auto">
            <AnimatedContent distance={30} direction="vertical">
              <div className="text-center mb-12">
                <GradientText colors={['#ef4444', '#f59e0b', '#ef4444']} animationSpeed={4} className="text-3xl md:text-4xl font-bold">
                  连板预测引擎
                </GradientText>
                <p className="text-gray-500 mt-4">每日收盘自动扫描，5 维度评分锁定明日候选</p>
              </div>
            </AnimatedContent>

            <AnimatedContent distance={40} direction="vertical" delay={0.15}>
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                {[
                  { name: '封板时间', weight: '30%', desc: '越早封越强' },
                  { name: '板块共振', weight: '25%', desc: '≥3只涨停' },
                  { name: '换手率', weight: '15%', desc: '5-15%最佳' },
                  { name: '低价优势', weight: '15%', desc: '<20元优先' },
                  { name: '小盘弹性', weight: '15%', desc: '<100亿' },
                ].map((d, i) => (
                  <div key={i} className="bg-[#111113] border border-[#1a1a1c] rounded-xl p-4 text-center">
                    <div className="text-2xl font-black text-[#f59e0b] mb-1">{d.weight}</div>
                    <div className="text-white text-sm font-bold mb-1">{d.name}</div>
                    <div className="text-gray-600 text-[11px]">{d.desc}</div>
                  </div>
                ))}
              </div>
            </AnimatedContent>

            <AnimatedContent distance={30} direction="vertical" delay={0.3}>
              <div className="bg-[#111113] border border-[#1a1a1c] rounded-2xl p-6 font-mono text-sm">
                <div className="text-gray-500 mb-3">$ python3 scan_next_day.py</div>
                <div className="text-[#f59e0b] mb-4">{'>'} 连板预测扫描 | 2026-04-14 15:05</div>
                <div className="text-gray-400 mb-2">今日涨停: 59只 | 首板: 51只</div>
                <div className="space-y-2 mt-4">
                  {[
                    { rank: '#1', grade: 'A', code: '000791', name: '甘肃能源', price: '8.00', score: 65, prob: 71 },
                    { rank: '#2', grade: 'A', code: '603803', name: '瑞斯康达', price: '15.26', score: 63, prob: 71 },
                    { rank: '#3', grade: 'A', code: '600654', name: '中安科', price: '4.49', score: 63, prob: 71 },
                  ].map((s) => (
                    <div key={s.code} className="flex items-center gap-3">
                      <span className="text-gray-600 w-6">{s.rank}</span>
                      <span className="text-[#f59e0b] text-xs px-1.5 py-0.5 border border-[#f59e0b]/30 rounded">{s.grade}级</span>
                      <span className="text-[#06b6d4] w-16">{s.code}</span>
                      <span className="text-white w-20">{s.name}</span>
                      <span className="text-gray-400">¥{s.price}</span>
                      <span className="text-gray-600 ml-auto">得分{s.score}</span>
                      <span className="text-green-500 font-bold">→ {s.prob}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedContent>
          </div>
        </section>

        {/* ====== Tech Stack ====== */}
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <AnimatedContent distance={30} direction="vertical">
              <h2 className="text-3xl font-bold mb-10 text-gray-300">技术栈</h2>
            </AnimatedContent>
            <div className="flex flex-wrap justify-center gap-3">
              {techStack.map((t, i) => (
                <AnimatedContent key={t} distance={20} direction="vertical" delay={i * 0.04}>
                  <span className="px-5 py-2.5 bg-[#111113] border border-[#1a1a1c] rounded-full text-gray-400 text-sm font-mono hover:text-[#f59e0b] hover:border-[#f59e0b]/30 transition-all duration-300 cursor-default">
                    {t}
                  </span>
                </AnimatedContent>
              ))}
            </div>
          </div>
        </section>

        {/* ====== CTA ====== */}
        <section className="py-32 px-6 text-center relative">
          <div className="absolute inset-0 z-0 opacity-30">
            <Aurora colorStops={['#f59e0b', '#ea580c', '#f59e0b']} speed={0.2} />
          </div>
          <div className="relative z-10">
            <AnimatedContent distance={40} direction="vertical">
              <DecryptedText text="开始盯盘" speed={80} maxIterations={15} className="text-5xl md:text-7xl font-black mb-6 inline-block" />
              <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
                下载看盘侠，连接 Claude Code，让 AI 帮你看盘、扫盘、选股。
              </p>
              <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener" className="inline-block px-12 py-4 text-lg font-bold bg-[#f59e0b] text-black rounded-xl hover:bg-[#fbbf24] transition-colors hover:scale-105 transform duration-200">
                前往 GitHub →
              </a>
            </AnimatedContent>
          </div>
        </section>

        {/* ====== Footer ====== */}
        <footer className="py-8 px-6 border-t border-[#111] text-center text-gray-700 text-sm">
          <p>看盘侠 KanPanXia — Built with Claude Code + React Bits</p>
          <p className="mt-1">
            <a href="https://github.com/carey314/kanpanxia" className="hover:text-[#f59e0b] transition-colors">github.com/carey314/kanpanxia</a>
          </p>
        </footer>
      </div>
    </ClickSpark>
  )
}
