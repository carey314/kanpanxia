import BlurText from '@/components/BlurText'
import ShinyText from '@/components/ShinyText'
import CountUp from '@/components/CountUp'
import AnimatedContent from '@/components/AnimatedContent'
import StarBorder from '@/components/StarBorder'
import DecryptedText from '@/components/DecryptedText'
import ClickSpark from '@/components/ClickSpark'
import './landing.css'

export default function LandingPage() {
  return (
    <ClickSpark sparkSize={8} sparkRadius={12} sparkCount={6} sparkColor="#06d6a0">
      <div className="min-h-screen bg-[#040a0a] text-white overflow-hidden">

        {/* ===== 背景渐变 ===== */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-b from-[#062a2a] via-[#041515] to-[#040a0a]" />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[800px] bg-[#06d6a0]/8 rounded-full blur-[200px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#06d6a0]/3 rounded-full blur-[180px]" />
        </div>

        {/* ===== 导航 ===== */}
        <nav className="relative z-50 max-w-6xl mx-auto px-6 py-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-[#06d6a0]/15 border border-[#06d6a0]/30 rounded-lg flex items-center justify-center text-sm">
              📊
            </div>
            <span className="font-bold text-white tracking-wide">看盘侠</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-gray-400">
            <a href="#features" className="hover:text-[#06d6a0] transition-colors">Features</a>
            <a href="#engine" className="hover:text-[#06d6a0] transition-colors">Engine</a>
            <a href="#tech" className="hover:text-[#06d6a0] transition-colors">Tech</a>
          </div>
          <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener"
            className="px-5 py-2 bg-[#06d6a0] text-[#040a0a] text-sm font-bold rounded-full hover:bg-[#00f5d4] transition-all hover:scale-105">
            GitHub →
          </a>
        </nav>

        {/* ===== Hero: 设备 Mockup ===== */}
        <section className="relative z-10 max-w-6xl mx-auto px-6 pt-8 pb-20">
          <AnimatedContent distance={40} direction="vertical">
            {/* 设备外框 */}
            <div className="relative rounded-[2rem] border-2 border-[#06d6a0]/20 bg-[#0a0f0f]/80 backdrop-blur-xl p-2 shadow-[0_0_80px_rgba(6,214,160,0.08)]">
              {/* 顶部状态栏 */}
              <div className="flex items-center justify-between px-5 py-3">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-[#06d6a0]/10 border border-[#06d6a0]/20 rounded-lg flex items-center justify-center text-xs">📊</div>
                  <span className="text-xs text-gray-500 font-mono">KanPanXia</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-2 h-2 rounded-full bg-[#06d6a0] shadow-[0_0_8px_rgba(6,214,160,0.6)]" />
                  <span className="text-[10px] text-[#06d6a0] font-mono">LIVE</span>
                </div>
              </div>

              {/* 主内容区 */}
              <div className="flex rounded-[1.5rem] overflow-hidden min-h-[520px]">
                {/* 左侧：终端模拟 */}
                <div className="w-[55%] bg-[#0a0c0c] p-6 font-mono text-[12px] leading-[2] text-gray-500 relative overflow-hidden">
                  {/* 终端光效 */}
                  <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#06d6a0]/5 to-transparent pointer-events-none" />

                  <div className="relative z-10">
                    <div><span className="text-[#06d6a0]">carey</span><span className="text-gray-700">@mac</span>:<span className="text-[#06d6a0]/60">~</span>$ <span className="text-white">claude --dangerously-skip-permissions</span></div>
                    <div className="mt-1 text-gray-700">┌ Claude Code v2.1.87 · Opus 4.6</div>
                    <div className="text-gray-700">└ /{'{'}看盘侠 盯盘系统{'}'}</div>
                    <div className="mt-3"><span className="text-[#06d6a0]">{'>'}</span> <span className="text-gray-300">开启盯盘</span></div>
                    <div className="mt-1 text-[#06d6a0]">  ✓ 加载 18 板块 76 只龙头</div>
                    <div className="text-[#06d6a0]">  ✓ 设置定时任务 08:57 / 14:03 / 15:05</div>
                    <div className="text-[#06d6a0]">  ✓ AKShare 行情连接</div>
                    <div className="mt-2"><span className="text-[#06d6a0]">{'>'}</span> <span className="text-gray-500">拉取实时行情...</span></div>
                    <div className="mt-1">  半导体ETF <span className="text-white">1.572</span> <span className="text-[#06d6a0]">+0.70%</span></div>
                    <div>  恒指科技 <span className="text-white">0.620</span> <span className="text-[#ef4444]">-0.64%</span></div>
                    <div>  医疗ETF  <span className="text-white">0.335</span> <span className="text-[#ef4444]">-1.18%</span></div>
                    <div className="mt-2"><span className="text-[#06d6a0]">{'>'}</span> <span className="text-gray-500">连板扫描 (15:05)</span></div>
                    <div className="mt-1">  <span className="text-[#06d6a0]">#1</span> 甘肃能源 ¥8.00 <span className="text-[#06d6a0] font-bold">71%</span></div>
                    <div>  <span className="text-[#06d6a0]">#2</span> 瑞斯康达 ¥15.26 <span className="text-[#06d6a0] font-bold">71%</span></div>
                    <div>  <span className="text-[#06d6a0]">#3</span> 中安科 ¥4.49 <span className="text-[#06d6a0] font-bold">71%</span></div>
                    <div className="mt-3 text-[#06d6a0]">  系统就绪。等待指令。</div>
                    <div className="mt-2"><span className="text-[#06d6a0]">{'>'}</span> <span className="animate-pulse text-[#06d6a0]">_</span></div>
                  </div>
                </div>

                {/* 右侧：产品介绍 */}
                <div className="w-[45%] bg-gradient-to-br from-[#0d1a1a] to-[#0a0f0f] p-8 flex flex-col justify-between relative">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-[#06d6a0]/5 rounded-full blur-[80px] pointer-events-none" />

                  <div className="relative z-10">
                    <ShinyText text="AI-Powered Trading Terminal" speed={3} className="text-[10px] tracking-[0.3em] uppercase text-[#06d6a0]/50 font-mono mb-6" />

                    <h1 className="text-4xl font-black leading-tight mb-4">
                      <span className="text-[#06d6a0]">AI</span> 智能
                      <br />盯盘系统
                    </h1>

                    <p className="text-gray-500 text-sm leading-relaxed mb-8">
                      左手终端运行 Claude Code，右手六维数据面板实时刷新。连板预测引擎每日收盘自动扫描，5 维度评分锁定明日候选。
                    </p>

                    {/* 导航点 */}
                    <div className="flex gap-2 mb-8">
                      <div className="w-8 h-2 rounded-full bg-[#06d6a0]" />
                      <div className="w-2 h-2 rounded-full bg-gray-700" />
                      <div className="w-2 h-2 rounded-full bg-gray-700" />
                    </div>

                    <a href="https://github.com/carey314/kanpanxia/releases" target="_blank" rel="noopener"
                      className="inline-block px-8 py-3 bg-[#06d6a0] text-[#040a0a] font-bold text-sm rounded-full hover:bg-[#00f5d4] transition-all hover:scale-105 shadow-[0_0_30px_rgba(6,214,160,0.2)]">
                      Download Now
                    </a>
                  </div>

                  {/* 底部倒计时风格统计 */}
                  <div className="relative z-10 grid grid-cols-4 gap-2 mt-8">
                    {[
                      { value: 83, label: 'Win%' },
                      { value: 110, label: 'Stocks' },
                      { value: 5, label: 'Min' },
                      { value: 6, label: 'Panels' },
                    ].map((s, i) => (
                      <div key={i} className="bg-[#06d6a0]/5 border border-[#06d6a0]/10 rounded-xl p-3 text-center">
                        <div className="text-2xl font-black text-white font-mono">
                          <CountUp from={0} to={s.value} duration={2} className="inline" />
                        </div>
                        <div className="text-[8px] text-[#06d6a0]/50 uppercase tracking-wider mt-0.5">{s.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedContent>
        </section>

        {/* ===== Features ===== */}
        <section id="features" className="relative z-10 max-w-5xl mx-auto px-6 py-28">
          <AnimatedContent distance={20} direction="vertical">
            <div className="text-center mb-16">
              <BlurText text="Core Features" delay={100} animateBy="letters" direction="top" className="text-4xl font-black mb-3" />
              <p className="text-gray-600 text-sm">Everything you need for A-share short-term trading</p>
            </div>
          </AnimatedContent>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { icon: '⌨️', title: '实时终端', desc: '内嵌 PTY，直接运行 Claude Code' },
              { icon: '🔍', title: '连板预测', desc: '5 维度评分，每日自动扫描涨停板' },
              { icon: '📊', title: '实时行情', desc: '盘中每 5 分钟 AKShare 自动刷新' },
              { icon: '🎯', title: 'V3 系统', desc: '5 条件 + 70% 门槛 + 回测 83%' },
              { icon: '🔥', title: '妖股监控', desc: 'Day1 首板锁定，Day2 精准入场' },
              { icon: '📝', title: '判断追踪', desc: '记录验证准确率，数据优化直觉' },
            ].map((f, i) => (
              <AnimatedContent key={i} distance={25} direction="vertical" delay={i * 0.06}>
                <div className="group bg-[#0a1010] border border-[#06d6a0]/8 rounded-2xl p-6 hover:border-[#06d6a0]/25 transition-all duration-500">
                  <div className="text-2xl mb-3 group-hover:scale-110 transition-transform">{f.icon}</div>
                  <h3 className="text-sm font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">{f.desc}</p>
                </div>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ===== Scan Engine ===== */}
        <section id="engine" className="relative z-10 max-w-4xl mx-auto px-6 py-28">
          <AnimatedContent distance={20} direction="vertical">
            <div className="text-center mb-14">
              <BlurText text="Prediction Engine" delay={100} animateBy="letters" direction="top" className="text-4xl font-black mb-3" />
              <p className="text-gray-600 text-sm">5-dimensional scoring model for next-day limit-up prediction</p>
            </div>
          </AnimatedContent>

          <AnimatedContent distance={25} direction="vertical" delay={0.1}>
            <div className="grid grid-cols-5 gap-3 mb-10">
              {[
                { name: '封板时间', w: '30%' },
                { name: '板块共振', w: '25%' },
                { name: '换手率', w: '15%' },
                { name: '低价', w: '15%' },
                { name: '小盘', w: '15%' },
              ].map((d, i) => (
                <div key={i} className="bg-[#0a1010] border border-[#06d6a0]/8 rounded-xl p-4 text-center hover:border-[#06d6a0]/25 transition-all">
                  <div className="text-lg font-black text-[#06d6a0] mb-0.5">{d.w}</div>
                  <div className="text-white text-[11px] font-bold">{d.name}</div>
                </div>
              ))}
            </div>
          </AnimatedContent>

          <AnimatedContent distance={25} direction="vertical" delay={0.2}>
            <div className="bg-[#0a1010] border border-[#06d6a0]/8 rounded-2xl p-6 font-mono text-[13px]">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2 h-2 rounded-full bg-[#06d6a0] shadow-[0_0_8px_rgba(6,214,160,0.6)]" />
                <span className="text-[#06d6a0] text-xs">LIVE SCAN RESULT</span>
                <span className="text-gray-700 text-xs ml-auto">2026-04-14 15:05</span>
              </div>
              <div className="space-y-3">
                {[
                  { r: '1', c: '000791', n: '甘肃能源', p: '8.00', s: 65, pb: 71 },
                  { r: '2', c: '603803', n: '瑞斯康达', p: '15.26', s: 63, pb: 71 },
                  { r: '3', c: '600654', n: '中安科', p: '4.49', s: 63, pb: 71 },
                ].map((s) => (
                  <div key={s.c} className="flex items-center gap-4 py-2 border-b border-white/3 last:border-0">
                    <span className="text-gray-700 w-5">#{s.r}</span>
                    <span className="text-[10px] px-1.5 py-0.5 border border-[#06d6a0]/20 text-[#06d6a0] rounded">A</span>
                    <span className="text-[#06d6a0]/70 w-16">{s.c}</span>
                    <span className="text-white w-24 font-bold">{s.n}</span>
                    <span className="text-gray-500">¥{s.p}</span>
                    <span className="ml-auto text-gray-700">Score {s.s}</span>
                    <span className="text-[#06d6a0] font-bold text-base">{s.pb}%</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedContent>
        </section>

        {/* ===== Tech ===== */}
        <section id="tech" className="relative z-10 max-w-3xl mx-auto px-6 py-20 text-center">
          <AnimatedContent distance={15} direction="vertical">
            <h2 className="text-xl font-bold text-gray-500 mb-8">Built With</h2>
          </AnimatedContent>
          <div className="flex flex-wrap justify-center gap-2.5">
            {['React 19', 'Electron', 'TypeScript', 'Tailwind', 'AKShare', 'node-cron', 'ttyd', 'Claude Code'].map((t, i) => (
              <AnimatedContent key={t} distance={10} direction="vertical" delay={i * 0.03}>
                <span className="px-4 py-2 bg-[#0a1010] border border-[#06d6a0]/8 rounded-full text-gray-600 text-xs font-mono hover:text-[#06d6a0] hover:border-[#06d6a0]/25 transition-all cursor-default">
                  {t}
                </span>
              </AnimatedContent>
            ))}
          </div>
        </section>

        {/* ===== CTA ===== */}
        <section className="relative z-10 py-32 text-center">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#06d6a0]/5 rounded-full blur-[150px] pointer-events-none" />
          <AnimatedContent distance={25} direction="vertical">
            <div className="relative z-10">
              <DecryptedText text="Start Trading" speed={80} maxIterations={15} className="text-5xl md:text-6xl font-black inline-block mb-6" />
              <p className="text-gray-600 text-sm mb-10 max-w-sm mx-auto">
                Download KanPanXia, connect Claude Code, let AI watch the market for you.
              </p>
              <a href="https://github.com/carey314/kanpanxia" target="_blank" rel="noopener"
                className="inline-block px-10 py-3.5 bg-[#06d6a0] text-[#040a0a] font-bold rounded-full hover:bg-[#00f5d4] transition-all hover:scale-105 shadow-[0_0_40px_rgba(6,214,160,0.15)]">
                Get Started →
              </a>
            </div>
          </AnimatedContent>
        </section>

        {/* ===== Footer ===== */}
        <footer className="relative z-10 py-8 text-center border-t border-white/3">
          <p className="text-gray-800 text-xs">看盘侠 KanPanXia — Built with Claude Code + React Bits</p>
          <a href="https://github.com/carey314/kanpanxia" className="text-gray-800 text-xs hover:text-[#06d6a0] transition-colors">
            github.com/carey314/kanpanxia
          </a>
        </footer>
      </div>
    </ClickSpark>
  )
}
