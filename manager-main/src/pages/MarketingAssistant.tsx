import { useNavigate } from 'react-router-dom';

export default function MarketingAssistant() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-[#120b08] min-h-screen text-slate-100 pb-24 h-full overflow-y-auto hide-scrollbar">
      <header className="sticky top-0 z-50 flex items-center justify-between p-6 pt-4 bg-[#120b08]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary-orange text-3xl">campaign</span>
          <h1 className="text-xl font-bold tracking-tight text-slate-100">营销助手</h1>
        </div>
        <div className="flex gap-3">
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300">
            <span className="material-symbols-outlined text-xl">search</span>
          </button>
          <button className="w-10 h-10 rounded-full glass-card flex items-center justify-center text-slate-300">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>
      
      <main className="px-6 space-y-8">
        <section className="space-y-4 cursor-pointer group" onClick={() => navigate('/hotspots')}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-orange">local_fire_department</span>
              行业热点
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400 bg-white/5 px-2 py-1 rounded">实时更新</span>
              <span className="material-symbols-outlined text-slate-400 text-sm group-hover:translate-x-1 transition-transform">chevron_right</span>
            </div>
          </div>
          <div className="glass-card rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary-orange/10 blur-3xl -mr-16 -mt-16"></div>
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-slate-400 text-sm mb-1">当前关注行业</p>
                <h3 className="text-2xl font-bold">酒店旅游行业</h3>
              </div>
              <div className="text-right">
                <div className="text-primary-orange font-bold text-lg">极高热度</div>
                <p className="text-[10px] text-slate-500">数据源: 抖音 / 小红书</p>
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
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-slate-400 text-[10px] uppercase">总曝光量</p>
                  <p className="text-lg font-bold">1.2M <span className="text-[10px] text-emerald-400 font-normal">+15.4%</span></p>
                </div>
                <div className="bg-white/5 rounded-xl p-3">
                  <p className="text-slate-400 text-[10px] uppercase">互动率</p>
                  <p className="text-lg font-bold">8.2% <span className="text-[10px] text-emerald-400 font-normal">+2.1%</span></p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-orange">auto_awesome</span>
            智能营销计划
          </h2>
          <div className="grid grid-cols-1 gap-4">
            <RecommendationCard icon="tag" title="推荐话题" desc="#奢华酒店探店 #周末去哪儿" subDesc="匹配度: 98%" />
            <RecommendationCard icon="schedule" title="最佳发布时间" desc="今日 18:00 - 20:00" subDesc="流量高峰期预计在 19:30" />
            <RecommendationCard icon="edit_note" title="内容策略建议" desc="强调“避世”与“高性价比”" subDesc="建议采用 VLOG 形式展示客房景观" />
          </div>
        </section>
        
        <section className="space-y-4">
          <h2 className="text-xl font-bold">参考素材</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            <ReferenceCard views="45k" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAwc54w4weTAU7SQ2QDHvx25LfRhI3vk9q6tv8DlLtp7rdKn5mZiSRk8dIWTN8tD05p5gyEbhGbxE7UYhahHnB3HZvzR4uINp-ma9WTdVbfdkFri08z4qLjhSbdR_b0yxtOcDSl0F4pfoABkdQgEncp3kq8nfW9hQ2fHpEOYx4MQRo-D1d9nUZS0KI6qjvI1WTqTHRXN1gwBvSI80fSIm7zYA6eSSt5FK00g-bnHBMpiYqhMoLLkIMRczhef68IMZewTuUflRgfzo2u" />
            <ReferenceCard views="32k" img="https://lh3.googleusercontent.com/aida-public/AB6AXuCtNw7yMrHcW2yYz6Sa16-5IH3lTPkha5DS9zfH1xVARVmpwguBZM_fZih5cX8EUl6Xu4WsO27qRavR0z2xmyBGm27E2gYL5BvB5cOV8QQGV9wP0Mg_Jrxnk22fxsuHTzm-7ScvjVDsuML-FcfOVeCZXCjmXsB3OSIeHnvPZZBwJCNyRakR-cN_dHe8ZdjfeLwbRunITYMFy1yYeP6JJfVGliDoYOjU9fZIP6KaoQOO2CLsPh98HPuLYJtffQvrbGC4i8ZDuPBYR3im" />
            <ReferenceCard views="18k" img="https://lh3.googleusercontent.com/aida-public/AB6AXuAPSw-C7E9kSSXbNIy-SMRgWe8RPg_oIQmrMvdUYQ1GfZ6z_Rls1k3x1ijFZYv4bQDfHxRtBf1milbk8Sw-fWL4sCOfJBjt9iRQi61yrZq9pXmNTMlQYq264D8mJ4VdP8B3PYFy7Mwv7US19GY7UyT9t4Z091tywxq67OVRuA5aRCD-pVVV8fgqd3Oms7bAZORYwNZsHQ2sMQ3ZSWAswumrhLtRqje7SulN5RL4zssNCLMekHCqII5tn-z2zQCGRqlpU8_Byqf4Nwt3" />
          </div>
        </section>
      </main>
    </div>
  );
}

function RecommendationCard({ icon, title, desc, subDesc }: any) {
  return (
    <div className="glass-card rounded-2xl p-5 flex items-start gap-4">
      <div className="bg-primary-orange/20 p-3 rounded-xl">
        <span className="material-symbols-outlined text-primary-orange">{icon}</span>
      </div>
      <div className="flex-1">
        <h4 className="text-slate-400 text-xs mb-1">{title}</h4>
        <p className="font-semibold text-slate-100">{desc}</p>
        <p className="text-xs text-slate-500 mt-1">{subDesc}</p>
      </div>
    </div>
  );
}

function ReferenceCard({ views, img }: any) {
  return (
    <div className="min-w-[140px] aspect-[3/4] rounded-xl glass-card overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}></div>
      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-black/40 backdrop-blur-md rounded px-2 py-1 flex items-center gap-1 w-fit">
          <span className="material-symbols-outlined text-[12px]">visibility</span>
          <span className="text-[10px]">{views}</span>
        </div>
      </div>
    </div>
  );
}
