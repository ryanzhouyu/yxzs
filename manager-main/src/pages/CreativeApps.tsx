export default function CreativeApps() {
  return (
    <div className="h-full w-full bg-gradient-to-br from-[#121212] via-[#1a0b2e] to-[#2d1b4e] relative">
      <header className="w-full pt-4 pb-4 px-6 z-50">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-glow">创意应用</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm font-medium text-white/70">释放 AI 创作潜能</span>
            </div>
          </div>
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
        </div>
      </header>
      
      <main className="h-[calc(100%-120px)] w-full overflow-y-auto hide-scrollbar px-6 pb-32">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AppCard 
            title="AI 产品图生成" 
            desc="一键生成高质量商业产品图" 
            icon="camera" 
            colorFrom="#ff3366" colorTo="#ec4899" 
            glowFrom="#ec4899" glowTo="#8b5cf6" 
          />
          <AppCard 
            title="素材优化" 
            desc="智能提升画质，修复瑕疵" 
            icon="auto_fix_high" 
            colorFrom="#00f2ff" colorTo="#3b82f6" 
            glowFrom="#0ea5e9" glowTo="#3b82f6" 
          />
          <AppCard 
            title="智能选题" 
            desc="深度分析热点，提供创作方向" 
            icon="lightbulb" 
            colorFrom="#7000ff" colorTo="#d946ef" 
            glowFrom="#8b5cf6" glowTo="#d946ef" 
          />
          <AppCard 
            title="AI 文案优化" 
            desc="一键润色、扩写、改写文案" 
            icon="edit" 
            colorFrom="#2dd4bf" colorTo="#10b981" 
            glowFrom="#2dd4bf" glowTo="#10b981" 
          />
        </div>
        
        <div className="mt-8">
          <h3 className="text-sm font-bold text-white/80 mb-4 px-1">最近使用</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 pb-2">
            <RecentApp icon="camera" label="产品图" />
            <RecentApp icon="edit" label="文案优化" />
            <RecentApp icon="auto_fix_high" label="画质提升" />
          </div>
        </div>
      </main>
    </div>
  );
}

function AppCard({ title, desc, icon, colorFrom, colorTo, glowFrom, glowTo }: any) {
  return (
    <div className="bg-glass rounded-3xl p-5 border border-white/10 shadow-xl relative overflow-hidden group">
      <div className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40" style={{ background: `linear-gradient(to bottom right, ${glowFrom}, ${glowTo})` }}></div>
      <div className="w-12 h-12 mb-4 rounded-xl p-[1.5px] relative z-10" style={{ background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})` }}>
        <div className="w-full h-full bg-black/60 backdrop-blur-md rounded-[10px] flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl text-white">{icon}</span>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="text-lg font-bold mb-1">{title}</h2>
        <p className="text-[11px] text-white/60 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

function RecentApp({ icon, label }: any) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[64px]">
      <div className="w-14 h-14 rounded-full bg-glass border border-white/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-white/80">{icon}</span>
      </div>
      <span className="text-[10px] text-white/60">{label}</span>
    </div>
  );
}
