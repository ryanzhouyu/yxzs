import { useNavigate } from 'react-router-dom';

export default function IndustryHotspots() {
  const navigate = useNavigate();
  
  return (
    <div className="h-full w-full bg-dark-charcoal relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[30%] bg-accent-blue/10 blur-[100px] rounded-full"></div>
        <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[40%] bg-accent-purple/10 blur-[120px] rounded-full"></div>
      </div>
      
      <header className="pt-4 pb-4 px-6 z-50 relative shrink-0">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => navigate(-1)} className="w-8 h-8 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
              <span className="material-symbols-outlined text-sm text-white">arrow_back_ios_new</span>
            </button>
            <div>
              <h1 className="text-3xl font-black tracking-tight text-glow text-white">行业热点分析</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-bold text-accent-blue uppercase tracking-wider">酒店业</span>
                <span className="w-1 h-1 rounded-full bg-white/50"></span>
                <span className="text-xs font-medium text-white/60">实时数据更新</span>
              </div>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center hover:bg-white/10 transition-colors">
            <span className="material-symbols-outlined text-xl text-white">tune</span>
          </button>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <span className="material-symbols-outlined text-white/50 group-focus-within:text-accent-blue transition-colors">search</span>
          </div>
          <input className="w-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl py-3 pl-11 pr-4 text-sm text-white placeholder-white/40 focus:outline-none focus:ring-1 focus:ring-accent-blue/50 focus:border-accent-blue/50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.3)]" placeholder="搜索细分领域、品牌或话题..." type="text"/>
        </div>
      </header>
      
      <main className="h-[calc(100%-160px)] w-full overflow-y-auto hide-scrollbar px-6 pb-32 z-10 relative space-y-6">
        <section className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-xl">trending_up</span>
              社交媒体热度
            </h2>
            <span className="text-xs font-medium text-white/50 bg-white/5 px-2 py-1 rounded-md">近7日趋势</span>
          </div>
          <div className="space-y-4">
            <div className="h-[150px] w-full relative">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 300 120">
                <path className="drop-shadow-[0_0_8px_rgba(255,51,102,0.6)]" d="M0,100 C50,80 100,90 150,60 C200,30 250,50 300,20" fill="none" stroke="#ff3366" strokeWidth="3"></path>
                <path d="M0,110 C50,100 100,105 150,85 C200,65 250,70 300,45" fill="none" stroke="#ef4444" strokeWidth="2"></path>
                <path d="M0,115 C50,110 100,112 150,100 C200,85 250,90 300,75" fill="none" stroke="#f97316" strokeWidth="2"></path>
              </svg>
              <div className="absolute bottom-0 w-full flex justify-between text-[10px] text-white/40 px-2">
                <span>1日</span><span>2日</span><span>3日</span><span>4日</span><span>5日</span><span>6日</span><span>7日</span>
              </div>
            </div>
            <div className="flex justify-center gap-4 text-xs font-medium">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_5px_#ff3366]"></div>抖音</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500"></div>小红书</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-orange-500"></div>快手</div>
            </div>
          </div>
        </section>
        
        <section className="glass-panel rounded-3xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-accent-blue text-xl">map</span>
              区域热度
            </h2>
          </div>
          <div className="flex p-1 bg-white/5 rounded-xl mb-5">
            <button className="flex-1 py-1.5 text-xs font-bold rounded-lg bg-white/10 text-white shadow-sm">当前城市</button>
            <button className="flex-1 py-1.5 text-xs font-medium rounded-lg text-white/60 hover:text-white">省份</button>
            <button className="flex-1 py-1.5 text-xs font-medium rounded-lg text-white/60 hover:text-white">全国</button>
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
            <RegionItem rank={1} name="黄浦区" desc="外滩江景房热卖" score="95%" color="from-yellow-300 to-yellow-600" />
            <RegionItem rank={2} name="浦东新区" desc="迪士尼周边火爆" score="82%" color="from-gray-300 to-gray-500" />
            <RegionItem rank={3} name="静安区" desc="设计酒店受捧" score="68%" color="from-orange-300 to-orange-600" />
          </div>
        </section>
        
        <section className="glass-panel rounded-3xl p-5">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-bold">热点资讯类型</h2>
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
                <div className="text-xs text-white/60">总内容</div>
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
        
        <section className="glass-panel rounded-3xl p-5">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-6 bg-yellow-500 rounded-full"></div>
            <h2 className="text-lg font-bold">热点话题与标签</h2>
          </div>
          <div className="grid grid-cols-4 grid-rows-2 gap-3 h-48 mb-4">
            <HotTopicTag title="精品酒店" heat="98.5K" color="from-red-500 to-orange-500" size="large" />
            <HotTopicTag title="明星打卡" heat="85.1K" color="from-purple-500 to-indigo-500" size="medium" />
            <HotTopicTag title="亲子游" heat="72.3K" color="from-green-500 to-teal-500" size="small" />
            <HotTopicTag title="周末去哪儿" heat="68.9K" color="from-blue-500 to-cyan-500" size="small" />
          </div>
          <div className="flex flex-wrap gap-2">
            <span className="bg-white/5 px-3 py-1 rounded-full text-xs">#特色民宿</span>
            <span className="bg-white/5 px-3 py-1 rounded-full text-xs">#无边泳池</span>
            <span className="bg-white/5 px-3 py-1 rounded-full text-xs">#情侣约会</span>
          </div>
        </section>
      </main>
    </div>
  );
}

function RegionItem({ rank, name, desc, score, color }: any) {
  return (
    <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
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

function HotTopicTag({ title, heat, size, color }: any) {
  const sizeClasses = {
    large: 'col-span-2 row-span-2',
    medium: 'col-span-2 row-span-1',
    small: 'col-span-1 row-span-1'
  };
  
  const textSizes = {
    large: { title: 'text-xl', heat: 'text-base' },
    medium: { title: 'text-base', heat: 'text-sm' },
    small: { title: 'text-sm', heat: 'text-xs' }
  };
  
  const textSize = textSizes[size as keyof typeof textSizes];
  
  return (
    <div className={`rounded-2xl p-4 bg-gradient-to-br ${color} relative overflow-hidden ${sizeClasses[size as keyof typeof sizeClasses]} flex flex-col justify-between`}>
      <div>
        <h3 className={`${textSize.title} font-bold text-white mb-1`}>{title}</h3>
        <div className={`${textSize.heat} text-white/90`}>热度 {heat}</div>
      </div>
    </div>
  );
}
