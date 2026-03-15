import { useNavigate } from 'react-router-dom';

type CalendarCardProps = {
  day: string;
  title: string;
  time: string;
  img: string;
  active?: boolean;
};

type PortfolioCardProps = {
  title: string;
  desc: string;
  time: string;
  img: string;
};

export default function MyCreations() {
  const navigate = useNavigate();

  return (
    <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="title-1 text-glow">我的创意</h1>
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

      <main className="space-y-8 pt-20">
        <section>
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="title-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-orange">calendar_month</span>
              7天营销日历
            </h2>
            <span className="text-xs text-slate-500">更多建议</span>
          </div>
          <div className="flex overflow-x-auto hide-scrollbar px-6 gap-4">
            <CalendarCard
              day="周一"
              title="精致午后时光"
              time="14:00"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuC2gp815mqjP-X_9PD7VdR5Xt4PLfEHKvSOMKtGxRPf4-qdKxxOJUwJOhe6CxFZumgFkCB1zHjcwG66Kb-pnCPMyTPTRdCA6PsW7JD6mBd4IcC6e12xCeFiDTWjXRHsp2RLmDr9Jh8cElB2o9mnsQoDbC8AZumOWwgWkSybvt-ca8qrVbamyKWLzwNuuiO12JQI_pqijoQrofHvxw24W53qEjXVxCeAmoagjnV6kmDY4k7aW_juKIJBKdr83bfU94Hz_fPYIGoWFPMt"
              active
            />
            <CalendarCard
              day="周二"
              title="舒适下午体验"
              time="10:00"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuDmKje1aClEYxmuTgtGb62GBTUTzuIw_TNPUHLRZvx52LXqCFKi2VtOYBRRU4xUz744f0WBSYJhkf8UcDwkZJ3kI6rcXGC7xjUrDwlU_0jt4TbLgp4xdwKECsJYZXqGQem9sdWBOcD1Fbf1obAsAQkFt890uuWzFw3A6NsmQ2p6J6PhhA1dhr_EkAKrBnKPgVDUN1CMk8BdFkdGDUBnZjAvkOWuiO7hu89Xk4lKgkwCepLkJf3O7V-GAbFa93Yn6ahC0dDYBtjmaGKV"
            />
          </div>
        </section>

        <section>
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="title-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-orange">bookmark</span>
              灵感收藏
            </h2>
            <span className="text-xs text-slate-500">查看全部</span>
          </div>
          <div className="grid grid-cols-3 gap-3 px-6">
            <div className="aspect-square glass-card radius-control overflow-hidden">
              <img alt="灵感收藏1" className="w-full h-full object-cover grayscale hover:grayscale-0 transition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAbUbBua0qfPRYN8a13JDOnhVeUWORVH3TG2IjRQmCX9tqR-oX3-qLIjSXEwRldogTrl97AO3DPezNVfaMEaUHr9IosHslvhyxiNnfIzrc9oNqhnXD2E2ZH0Le6OGqjQP6Sql9zbAh3mbU-yKH1eVAQkF_CCC9ewSafC3U7tQIIcgSgStrhOCzShE7pHib8Hxp8JYnkfftUpg8krvzDC_8XOtezeqhEln4MuAMXa8MYjOUmgHxHkrubfT85_uYq1PO7NIpy0qCjpH7_" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square glass-card radius-control overflow-hidden">
              <img alt="灵感收藏2" className="w-full h-full object-cover grayscale hover:grayscale-0 transition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUhInN1E0P7WqsaWiuNxlIRn7m4T2a0fjNXwNxGOf6jpaS0S6CSLcsCzFWw08IlCk1X4A2ij6K_8Gx_JnU2GF5qp061g8bn8rldFjssaT7_aga-qY4sXnZGyV_OYQ8i-I87vNT0viRiOrcSxnLJhNIpu2ZFfKNmWHesryLgKeXjbq2gbOL9JjDVYbLqj0NZdD8sTj_stJlkbfT-g79qgAxo_I1gMSpI86wotIsDg-4G-BM91yLlSgQ_7NFxXjOD5duL2VjHxVrlkTg" referrerPolicy="no-referrer" />
            </div>
            <div className="aspect-square glass-card radius-control overflow-hidden">
              <img alt="灵感收藏3" className="w-full h-full object-cover grayscale hover:grayscale-0 transition" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDwRrsMTpHmSb-tNgbLWBt-Cgcp-q6-oa_jS2xfPRCGXPz0SirT6oFfxAfS4Qf4RlfFItCoeSOJfiHK265-rkcXZ2cqLY8gZe5Yt6Nfql3_wc3nDbpWp3D9DjH6gfrPC0NThB2M5bk-GS3qcp1_W2Jdjx_DmkjaooABPo2b40U1wF8dTHHppesLjtAqsvAKsDff6qD9HkzqhsovB9Zw6Fx9PlFNEHydsWjp26oMqlqsQQbxUYLOtXvdH9AqlYdACcaI-OGZhHZXp13E" referrerPolicy="no-referrer" />
            </div>
          </div>
        </section>

        <section>
          <div className="px-6 flex items-center justify-between mb-4">
            <h2 className="title-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary-orange">auto_awesome</span>
              AI 作品墙
            </h2>
            <button type="button" onClick={() => navigate('/marketing')} className="bg-primary-orange/20 text-primary-orange px-3 py-1 radius-control text-xs font-semibold">营销助手</button>
          </div>
          <div className="px-6 space-y-4">
            <PortfolioCard
              title="夏季推广文案 #1"
              desc="探讨城市绿洲的宁静，结合行政酒店的奢华体验..."
              time="3小时前生成"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuCXmjL5JnMRAhHwb5dRg0_8VAVQjQ0kqnWmDFKbk58cPSJ-Os49rhSHkD2Qgm9oeXHL0BXolWc9U7ngKJMiDkMF0jYU2qAT1pImSiahfb9Ylx1ViEZVHDoOsHEsOaB2CobbILTP9UTJOnr7xUWOpXaE0UmsEhOcx_BJ_N7UntK4EDdyYeukhuzPU0ASf9T_GBu0vimNnoZRgZlwvxa-J9-Epir4yksOzf5awdXW1BSMveexQefN7q4E4JFTkP79mx06Np2uicjapfLG"
            />
            <PortfolioCard
              title="活力健身周计划"
              desc="通过 AI 优化的高清海报，展示顶级运动设施..."
              time="昨天 18:24"
              img="https://lh3.googleusercontent.com/aida-public/AB6AXuAJVx-BNjwDolkNBi4gxx_zkUa_ukd5TMXdIwdjvON3-fiwnCrjzaZ8xUvhzyZfqjU-GOgq4rnamealyKZbWser2n668lplw75w9Eft-m6EV5R0CwpmNHcFEMpIUDNUZrUaj9zwsbxQst7Esw7vRPm_8qxqs_Fz1W8X95m0tN29bgD3k8lnOMmXOwNsTpRWWbBAGpbnai4mDCcNXKLhI-qsNZTogWl9UytAhzDeyBIxuTQCLAaTwFeiJcz0RCQaJx5PfMiYPTOm6qJY"
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function CalendarCard({ day, title, time, img, active }: CalendarCardProps) {
  return (
    <div className="min-w-[160px] glass-card radius-panel p-3 flex flex-col gap-3">
      <div className={`w-full aspect-[4/5] radius-control overflow-hidden relative ${!active && 'opacity-80'}`}>
        <img alt={`${day} - ${title}`} className="w-full h-full object-cover" src={img} referrerPolicy="no-referrer" />
        <div className={`absolute top-2 left-2 text-white text-[10px] font-bold px-2 py-0.5 radius-control ${active ? 'bg-primary-orange' : 'bg-slate-500'}`}>{day}</div>
      </div>
      <div>
        <p className="text-sm font-semibold truncate">{title}</p>
        <p className={`text-[10px] mt-1 ${active ? 'text-primary-orange/80' : 'text-slate-500'}`}>推荐 {time} 发布</p>
      </div>
    </div>
  );
}

function PortfolioCard({ title, desc, time, img }: PortfolioCardProps) {
  return (
    <div className="glass-card radius-panel p-4 flex gap-4">
      <div className="w-24 h-24 radius-control overflow-hidden shrink-0">
        <img alt={title} className="w-full h-full object-cover" src={img} referrerPolicy="no-referrer" />
      </div>
      <div className="flex flex-col justify-between py-1 flex-1">
        <div>
          <h3 className="title-3">{title}</h3>
          <p className="text-xs text-slate-500 line-clamp-2 mt-1">{desc}</p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-400">{time}</span>
          <div className="flex gap-2">
            <span className="material-symbols-outlined text-sm cursor-pointer">share</span>
            <span className="material-symbols-outlined text-sm cursor-pointer">more_horiz</span>
          </div>
        </div>
      </div>
    </div>
  );
}


