type RegionItemProps = {
  rank: number;
  name: string;
  desc: string;
  score: string;
  color: string;
};

type HotTopicSize = 'large' | 'medium' | 'small';

type HotTopicTagProps = {
  title: string;
  heat: string;
  size: HotTopicSize;
  color: string;
};

export default function IndustryHotspots() {
  const now = new Date();
  const dateLabel = now.toLocaleDateString('zh-CN', { month: 'long', day: 'numeric', weekday: 'long' });
  const greeting = now.getHours() < 12 ? '早上好' : now.getHours() < 18 ? '下午好' : '晚上好';

  return (
    <div className="app-page relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-accent-blue/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full"></div>
      </div>

      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="title-1 text-glow">行业热点分析</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-white/70">{dateLabel}</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">{greeting}，创作者</span>
            </div>
          </div>
          <button type="button" className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center" aria-label="通知">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="h-full w-full overflow-y-auto hide-scrollbar px-6 pb-32 pt-20 z-10 relative space-y-6">
        <section className="glass-panel radius-card p-5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/10 blur-3xl -mr-16 -mt-16"></div>
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="title-2">酒店旅游行业</h2>
            </div>
            <div className="text-right">
              <div className="text-primary-orange font-bold text-lg">极高热度</div>
              <p className="text-[10px] text-slate-500">数据源：抖音 / 小红书</p>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <div className="flex items-end justify-between gap-1 h-16 px-2">
              <div className="w-full bg-primary-orange/20 rounded-t-sm h-1/2"></div>
              <div className="w-full bg-primary-orange/20 rounded-t-sm h-3/4"></div>
              <div className="w-full bg-primary-orange/40 rounded-t-sm h-2/3"></div>
              <div className="w-full bg-primary-orange/30 rounded-t-sm h-5/6"></div>
              <div className="w-full bg-primary-orange/60 rounded-t-sm h-1/2"></div>
              <div className="w-full bg-primary-orange rounded-t-sm h-full active-glow"></div>
              <div className="w-full bg-primary-orange/50 rounded-t-sm h-3/4"></div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 radius-control p-3">
                <p className="text-slate-400 text-[10px] uppercase">总曝光量</p>
                <p className="text-lg font-bold">1.2M <span className="text-[10px] text-emerald-400 font-normal">+15.4%</span></p>
                <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">抖音</span>
                    <span className="text-white font-medium">800K</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">小红书</span>
                    <span className="text-white font-medium">400K</span>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 radius-control p-3">
                <p className="text-slate-400 text-[10px] uppercase">互动率</p>
                <p className="text-lg font-bold">8.2% <span className="text-[10px] text-emerald-400 font-normal">+2.1%</span></p>
                <div className="mt-2 pt-2 border-t border-white/10 space-y-1">
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">抖音</span>
                    <span className="text-white font-medium">5.8%</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px]">
                    <span className="text-slate-500">小红书</span>
                    <span className="text-white font-medium">12.6%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel radius-card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="title-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-blue text-xl">map</span>
              区域热度
            </h2>
          </div>
          <div className="flex p-1 bg-white/5 radius-control mb-5">
            <button type="button" className="flex-1 py-1.5 text-xs font-bold radius-control bg-white/10 text-white shadow-sm">当前城市</button>
            <button type="button" className="flex-1 py-1.5 text-xs font-medium radius-control text-white/60 hover:text-white">省份</button>
            <button type="button" className="flex-1 py-1.5 text-xs font-medium radius-control text-white/60 hover:text-white">全国</button>
          </div>
          <div className="mb-5 border-b border-white/10 pb-5">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-bold text-accent-blue">上海市 <span className="text-xs font-normal text-white/60 ml-1">酒店行业热度趋势</span></span>
              <span className="text-xs text-green-400">+15%</span>
            </div>
            <div className="h-[80px] w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 80">
                <path className="drop-shadow-[0_0_5px_rgba(0,242,255,0.6)]" d="M0,70 C50,60 100,75 150,40 C200,10 250,30 300,5" fill="none" stroke="#00f2ff" strokeWidth="2"></path>
              </svg>
            </div>
          </div>
          <div className="space-y-3">
            <RegionItem rank={1} name="黄浦区" desc="外滩江景房热度" score="95%" color="from-yellow-300 to-yellow-600" />
            <RegionItem rank={2} name="浦东新区" desc="迪士尼周边热度" score="82%" color="from-gray-300 to-gray-500" />
            <RegionItem rank={3} name="静安区" desc="设计酒店受捧" score="68%" color="from-orange-300 to-orange-600" />
          </div>
        </section>

        <section className="glass-panel radius-card p-5">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="title-2">热点资讯类型</h2>
          </div>
          <div className="flex flex-col items-center">
            <div className="relative w-40 h-40 mb-6">
              <svg className="w-full h-full" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="8" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#8B5CF6" strokeWidth="8" strokeDasharray="283" strokeDashoffset="99" transform="rotate(-90 50 50)" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="#EC4899" strokeWidth="8" strokeDasharray="283" strokeDashoffset="184" transform="rotate(126 50 50)" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-2xl font-bold">1.2M</div>
                <div className="text-xs text-white/60">总内容量</div>
              </div>
            </div>
            <div className="flex gap-6 text-sm font-medium">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-purple-500"></div>
                <span>视频 65%</span>
                <span className="text-xs text-white/50">（抖音/快手为主）</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-pink-500"></div>
                <span>图文 35%</span>
                <span className="text-xs text-white/50">（小红书/微博为主）</span>
              </div>
            </div>
          </div>
        </section>

        <section className="glass-panel radius-card p-5">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
            <h2 className="title-2">热点话题与标签</h2>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-48 mb-4">
            <HotTopicTag title="精品酒店" heat="98.5K" color="from-red-500 to-orange-500" size="large" />
            <HotTopicTag title="明星打卡" heat="85.1K" color="from-purple-500 to-indigo-500" size="medium" />
            <HotTopicTag title="亲子游" heat="72.3K" color="from-green-500 to-teal-500" size="small" />
            <HotTopicTag title="周末去哪儿" heat="68.9K" color="from-blue-500 to-cyan-500" size="small" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/5 px-3 py-1 radius-control text-xs">#特色民宿</span>
            <span className="bg-white/5 px-3 py-1 radius-control text-xs">#无边泳池</span>
            <span className="bg-white/5 px-3 py-1 radius-control text-xs">#情侣约会</span>
          </div>
        </section>
      </main>
    </div>
  );
}

function RegionItem({ rank, name, desc, score, color }: RegionItemProps) {
  return (
    <div className="flex items-center gap-3 p-2.5 radius-control bg-white/5 border border-white/5">
      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${color} flex items-center justify-center text-black font-black text-sm`}>{rank}</div>
      <div className="flex-1">
        <div className="text-sm font-bold">{name}</div>
        <div className="text-[10px] text-white/50">{desc}</div>
      </div>
      <div className="text-right">
        <div className="text-sm font-bold text-accent-blue">{score}</div>
        <div className="w-16 h-1 bg-white/10 rounded-full mt-1 overflow-hidden">
          <div className="h-full bg-accent-blue" style={{ width: score }}></div>
        </div>
      </div>
    </div>
  );
}

function HotTopicTag({ title, heat, size, color }: HotTopicTagProps) {
  const sizeClasses: Record<HotTopicSize, string> = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-2 row-span-1',
    small: 'col-span-1 row-span-1'
  };

  const textSizes: Record<HotTopicSize, { title: string; heat: string }> = {
    large: { title: 'text-xl', heat: 'text-base' },
    medium: { title: 'text-base', heat: 'text-sm' },
    small: { title: 'text-sm', heat: 'text-xs' }
  };

  const textSize = textSizes[size];

  return (
    <div className={`radius-panel p-4 bg-gradient-to-br ${color} relative overflow-hidden ${sizeClasses[size]} flex flex-col justify-between`}>
      <div>
        <h3 className={`${textSize.title} title-3 text-white mb-1`}>{title}</h3>
        <div className={`${textSize.heat} text-white/90`}>热度 {heat}</div>
      </div>
    </div>
  );
}

