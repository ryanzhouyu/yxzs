import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

type RecommendationCardProps = {
  icon: string;
  title: string;
  desc: string;
  subDesc: string;
};

type ReferenceCardProps = {
  views: string;
  img: string;
};

const recommendationCards: RecommendationCardProps[] = [
  { icon: 'tag', title: '推荐话题', desc: '#豪华酒店探店 #周末去哪儿', subDesc: '匹配度 98%' },
  { icon: 'schedule', title: '最佳发布时间', desc: '今日 18:00 - 20:00', subDesc: '流量高峰预计在 19:30' },
  { icon: 'edit_note', title: '内容策略建议', desc: '强调“避世”和“高性价比”', subDesc: '建议采用 VLOG 形式展示客房景观' }
];

const referenceCards: ReferenceCardProps[] = [
  {
    views: '45k',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAwc54w4weTAU7SQ2QDHvx25LfRhI3vk9q6tv8DlLtp7rdKn5mZiSRk8dIWTN8tD05p5gyEbhGbxE7UYhahHnB3HZvzR4uINp-ma9WTdVbfdkFri08z4qLjhSbdR_b0yxtOcDSl0F4pfoABkdQgEncp3kq8nfW9hQ2fHpEOYx4MQRo-D1d9nUZS0KI6qjvI1WTqTHRXN1gwBvSI80fSIm7zYA6eSSt5FK00g-bnHBMpiYqhMoLLkIMRczhef68IMZewTuUflRgfzo2u'
  },
  {
    views: '32k',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCtNw7yMrHcW2yYz6Sa16-5IH3lTPkha5DS9zfH1xVARVmpwguBZM_fZih5cX8EUl6Xu4WsO27qRavR0z2xmyBGm27E2gYL5BvB5cOV8QQGV9wP0Mg_Jrxnk22fxsuHTzm-7ScvjVDsuML-FcfOVeCZXCjmXsB3OSIeHnvPZZBwJCNyRakR-cN_dHe8ZdjfeLwbRunITYMFy1yYeP6JJfVGliDoYOjU9fZIP6KaoQOO2CLsPh98HPuLYJtffQvrbGC4i8ZDuPBYR3im'
  },
  {
    views: '18k',
    img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAPSw-C7E9kSSXbNIy-SMRgWe8RPg_oIQmrMvdUYQ1GfZ6z_Rls1k3x1ijFZYv4bQDfHxRtBf1milbk8Sw-fWL4sCOfJBjt9iRQi61yrZq9pXmNTMlQYq264D8mJ4VdP8B3PYFy7Mwv7US19GY7UyT9t4Z091tywxq67OVRuA5aRCD-pVVV8fgqd3Oms7bAZORYwNZsHQ2sMQ3ZSWAswumrhLtRqje7SulN5RL4zssNCLMekHCqII5tn-z2zQCGRqlpU8_Byqf4Nwt3'
  }
];

export default function MarketingAssistant() {
  const navigate = useNavigate();

  return (
    <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="title-1 text-glow">营销助手</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-white/70">10月6日 星期一</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">早上好，创作者</span>
            </div>
          </div>
          <button type="button" className="w-10 h-10 rounded-full glass-card flex items-center justify-center" aria-label="通知">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="px-6 space-y-8 pt-20">
        <section className="space-y-4">
          <h2 className="title-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary-orange">auto_awesome</span>
            智能营销计划
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {recommendationCards.map((card) => (
              <Fragment key={card.title}>
                <RecommendationCard {...card} />
              </Fragment>
            ))}
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="title-2">参考素材</h2>
          <div className="flex gap-4 overflow-x-auto pb-4 hide-scrollbar">
            {referenceCards.map((card) => (
              <Fragment key={card.img}>
                <ReferenceCard {...card} />
              </Fragment>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function RecommendationCard({ icon, title, desc, subDesc }: RecommendationCardProps) {
  return (
    <div className="glass-card radius-card p-5 flex items-start gap-4">
      <div className="bg-primary-orange/20 p-3 radius-control">
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

function ReferenceCard({ views, img }: ReferenceCardProps) {
  return (
    <div className="min-w-[140px] aspect-[3/4] radius-panel glass-card overflow-hidden relative">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url('${img}')` }}></div>
      <div className="absolute bottom-2 left-2 right-2">
        <div className="bg-black/40 backdrop-blur-md radius-control px-2 py-1 flex items-center gap-1 w-fit">
          <span className="material-symbols-outlined text-[12px]">visibility</span>
          <span className="text-[10px]">{views}</span>
        </div>
      </div>
    </div>
  );
}


