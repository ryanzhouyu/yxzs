import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type AnalysisCardProps = {
  title: string;
  value: string;
  trend: string;
  trendType: 'up' | 'down';
  icon: string;
};

type StrategyCardProps = {
  title: string;
  description: string;
  icon: string;
  tags: string[];
};

type HotTopicProps = {
  topic: string;
  heat: string;
  match: string;
};

type ReportCardProps = {
  id: string;
  title: string;
  date: string;
  status: 'draft' | 'completed';
  views: string;
};

type CalendarDayProps = {
  date: number;
  day: string;
  hasContent: boolean;
  isToday: boolean;
};

const analysisData: AnalysisCardProps[] = [
  {
    title: '社交媒体影响力',
    value: '85/100',
    trend: '+12%',
    trendType: 'up',
    icon: 'trending_up'
  },
  {
    title: '内容互动率',
    value: '7.2%',
    trend: '-0.8%',
    trendType: 'down',
    icon: 'insert_chart'
  },
  {
    title: '粉丝增长率',
    value: '24%',
    trend: '+5.3%',
    trendType: 'up',
    icon: 'groups'
  },
  {
    title: '内容质量评分',
    value: '88/100',
    trend: '+3.1%',
    trendType: 'up',
    icon: 'star'
  }
];

const strategyData: StrategyCardProps[] = [
  {
    title: '宣发策略',
    description: '基于您酒店的豪华定位，建议采用高端生活方式内容为主，结合季节性促销活动',
    icon: 'campaign',
    tags: ['高端生活方式', '季节性促销', 'KOL合作']
  },
  {
    title: '内容调性',
    description: '建议采用优雅、专业的调性，强调酒店的独特卖点和客户体验',
    icon: 'style',
    tags: ['优雅', '专业', '体验导向']
  }
];

const hotTopics: HotTopicProps[] = [
  { topic: '#豪华酒店探店', heat: '95%', match: '98%' },
  { topic: '#周末度假好去处', heat: '92%', match: '95%' },
  { topic: '#城市地标酒店', heat: '88%', match: '90%' },
  { topic: '#商务旅行首选', heat: '85%', match: '87%' },
  { topic: '#酒店美食推荐', heat: '82%', match: '85%' }
];

const reports: ReportCardProps[] = [
  {
    id: '1',
    title: '3月社交媒体运营分析',
    date: '2026-03-10',
    status: 'completed',
    views: '128'
  },
  {
    id: '2',
    title: '2月营销策略优化',
    date: '2026-02-15',
    status: 'completed',
    views: '96'
  },
  {
    id: '3',
    title: '1月内容规划报告',
    date: '2026-01-20',
    status: 'completed',
    views: '84'
  }
];

const calendarDays: CalendarDayProps[] = [
  { date: 1, day: '一', hasContent: false, isToday: false },
  { date: 2, day: '二', hasContent: false, isToday: false },
  { date: 3, day: '三', hasContent: true, isToday: false },
  { date: 4, day: '四', hasContent: false, isToday: false },
  { date: 5, day: '五', hasContent: true, isToday: false },
  { date: 6, day: '六', hasContent: false, isToday: false },
  { date: 7, day: '日', hasContent: true, isToday: false },
  { date: 8, day: '一', hasContent: false, isToday: false },
  { date: 9, day: '二', hasContent: false, isToday: false },
  { date: 10, day: '三', hasContent: true, isToday: false },
  { date: 11, day: '四', hasContent: false, isToday: false },
  { date: 12, day: '五', hasContent: false, isToday: false },
  { date: 13, day: '六', hasContent: true, isToday: false },
  { date: 14, day: '日', hasContent: false, isToday: false },
  { date: 15, day: '一', hasContent: true, isToday: true },
  { date: 16, day: '二', hasContent: false, isToday: false },
  { date: 17, day: '三', hasContent: true, isToday: false },
  { date: 18, day: '四', hasContent: false, isToday: false },
  { date: 19, day: '五', hasContent: false, isToday: false },
  { date: 20, day: '六', hasContent: true, isToday: false },
  { date: 21, day: '日', hasContent: false, isToday: false },
  { date: 22, day: '一', hasContent: false, isToday: false },
  { date: 23, day: '二', hasContent: true, isToday: false },
  { date: 24, day: '三', hasContent: false, isToday: false },
  { date: 25, day: '四', hasContent: false, isToday: false },
  { date: 26, day: '五', hasContent: true, isToday: false },
  { date: 27, day: '六', hasContent: false, isToday: false },
  { date: 28, day: '日', hasContent: false, isToday: false },
  { date: 29, day: '一', hasContent: true, isToday: false },
  { date: 30, day: '二', hasContent: false, isToday: false }
];

type AppState = 'intro' | 'authorizing' | 'analyzing' | 'dashboard';

export default function MarketingAssistant() {
  const navigate = useNavigate();
  const [appState, setAppState] = useState<AppState>('intro');
  const [activeTab, setActiveTab] = useState<'analysis' | 'plan' | 'reports'>('analysis');

  const handleAuthorize = () => {
    setAppState('authorizing');
    // 模拟授权过程
    setTimeout(() => {
      setAppState('analyzing');
      // 模拟分析过程
      setTimeout(() => {
        setAppState('dashboard');
      }, 2000);
    }, 1000);
  };

  if (appState === 'intro') {
    return (
      <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
        <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="title-1 text-glow">营销助手</h1>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs font-medium text-white/70">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <span className="w-1 h-1 rounded-full bg-white/40"></span>
                <span className="text-xs font-medium text-white/90">
                  {new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好'}，酒店运营者
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="px-6 space-y-8 pt-24 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md text-center">
            <div className="w-24 h-24 bg-primary-orange/20 rounded-full flex items-center justify-center mx-auto mb-8">
              <span className="material-symbols-outlined text-4xl text-primary-orange">campaign</span>
            </div>
            <h2 className="title-1 mb-4">欢迎使用营销助手</h2>
            <p className="text-slate-300 mb-8">
              营销助手将帮助您分析酒店的社交媒体运营状况，为您定制化设计社交媒体运营计划，包含宣发策略、内容调性、热门话题推荐以及发布计划。
            </p>
            
            <div className="space-y-4 mb-12">
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-orange text-sm">analytics</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">酒店分析</h3>
                  <p className="text-slate-400 text-sm">分析您酒店的社交媒体数据，提供详细的运营状况报告</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-orange text-sm">campaign</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">运营计划</h3>
                  <p className="text-slate-400 text-sm">基于分析结果，为您定制化设计社交媒体运营计划</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-orange text-sm">event</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">发布计划</h3>
                  <p className="text-slate-400 text-sm">根据时间周期制定合理的内容发布计划</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-white/5 rounded-lg">
                <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary-orange text-sm">history</span>
                </div>
                <div className="text-left">
                  <h3 className="font-semibold mb-1">往期报告</h3>
                  <p className="text-slate-400 text-sm">查看历史分析报告，追踪运营效果</p>
                </div>
              </div>
            </div>
            
            <button
              type="button"
              onClick={handleAuthorize}
              className="w-full py-3 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold active:scale-95 transition-transform"
            >
              开始授权分析
            </button>
            
            <p className="text-xs text-slate-400 mt-4">
              授权后，我们将分析您酒店的社交媒体数据，为您提供个性化的运营建议
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (appState === 'authorizing') {
    return (
      <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
        <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="title-1 text-glow">营销助手</h1>
            </div>
          </div>
        </header>

        <main className="px-6 space-y-8 pt-24 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 border-4 border-primary-orange/30 border-t-primary-orange rounded-full animate-spin mb-8"></div>
            <h2 className="title-2 mb-4">正在授权</h2>
            <p className="text-slate-300">
              正在获取您的酒店信息，请稍候...
            </p>
          </div>
        </main>
      </div>
    );
  }

  if (appState === 'analyzing') {
    return (
      <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
        <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="title-1 text-glow">营销助手</h1>
            </div>
          </div>
        </header>

        <main className="px-6 space-y-8 pt-24 flex flex-col items-center justify-center min-h-[80vh]">
          <div className="w-full max-w-md text-center">
            <div className="w-20 h-20 border-4 border-primary-orange/30 border-t-primary-orange rounded-full animate-spin mb-8"></div>
            <h2 className="title-2 mb-4">正在分析</h2>
            <p className="text-slate-300 mb-4">
              正在分析您酒店的社交媒体数据，请稍候...
            </p>
            <div className="w-full bg-white/10 rounded-full h-2 mb-2">
              <div className="bg-primary-orange h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-xs text-slate-400">
              分析完成后将自动生成运营计划
            </p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="title-1 text-glow">营销助手</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-white/70">{new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">
                {new Date().getHours() < 12 ? '早上好' : new Date().getHours() < 18 ? '下午好' : '晚上好'}，酒店运营者
              </span>
            </div>
          </div>
          <button type="button" className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center" aria-label="通知">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="px-6 space-y-8 pt-20">
        {/* 导航标签 */}
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <button
            type="button"
            onClick={() => setActiveTab('analysis')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'analysis' ? 'bg-primary-orange text-white shadow-lg' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
          >
            酒店分析
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'plan' ? 'bg-primary-orange text-white shadow-lg' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
          >
            运营计划
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reports')}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${activeTab === 'reports' ? 'bg-primary-orange text-white shadow-lg' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
          >
            往期报告
          </button>
        </div>

        {/* 酒店分析模块 */}
        {activeTab === 'analysis' && (
          <>
            <section className="glass-card radius-card p-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary-orange/10 blur-3xl -mr-32 -mt-32"></div>
              <h2 className="title-2 mb-6">酒店社交媒体分析</h2>
              <div className="grid grid-cols-2 gap-4">
                {analysisData.map((item) => (
                  <Fragment key={item.title}>
                    <AnalysisCard {...item} />
                  </Fragment>
                ))}
              </div>
              <div className="mt-6 pt-6 border-t border-white/10">
                <h3 className="text-lg font-semibold mb-4">分析结论</h3>
                <p className="text-slate-300 mb-4">
                  基于您酒店的社交媒体数据，我们发现您在内容互动率方面有提升空间。建议增加更多用户参与性内容，如问答、投票等形式。同时，您的粉丝增长趋势良好，可以考虑扩大KOL合作范围。
                </p>
                <button
                  type="button"
                  className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-sm active:scale-95 transition-transform"
                >
                  生成详细分析报告
                </button>
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="title-2">热门话题推荐</h2>
              <div className="glass-card radius-card p-5">
                <div className="space-y-4">
                  {hotTopics.map((topic) => (
                    <div key={topic.topic} className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{topic.topic}</p>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-xs text-slate-400">热度: {topic.heat}</span>
                          <span className="text-xs text-primary-orange">匹配度: {topic.match}</span>
                        </div>
                      </div>
                      <button
                        type="button"
                        className="px-3 py-1 bg-white/5 text-xs rounded-full hover:bg-white/10 transition-colors"
                      >
                        使用
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* 运营计划模块 */}
        {activeTab === 'plan' && (
          <>
            <section className="space-y-4">
              <h2 className="title-2">策略建议</h2>
              <div className="grid grid-cols-1 gap-4">
                {strategyData.map((strategy) => (
                  <Fragment key={strategy.title}>
                    <StrategyCard {...strategy} />
                  </Fragment>
                ))}
              </div>
            </section>

            <section className="space-y-4">
              <h2 className="title-2 flex items-center gap-2">
                <span className="material-symbols-outlined text-primary-orange">event</span>
                发布计划日历
              </h2>
              <div className="glass-card radius-card p-5">
                <div className="grid grid-cols-7 gap-2 mb-4">
                  {['日', '一', '二', '三', '四', '五', '六'].map((day) => (
                    <div key={day} className="text-center text-xs text-slate-400 font-medium">
                      {day}
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-2">
                  {calendarDays.map((day) => (
                    <Fragment key={day.date}>
                      <CalendarDay {...day} />
                    </Fragment>
                  ))}
                </div>
              </div>
            </section>

            <section className="glass-card radius-card p-5">
              <h3 className="text-lg font-semibold mb-4">内容发布建议</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-orange text-sm">event</span>
                  </div>
                  <div>
                    <p className="font-medium">3月17日 (周三) 18:00</p>
                    <p className="text-slate-400 text-sm mt-1">发布酒店春季促销活动，强调季节性特色</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-orange text-sm">event</span>
                  </div>
                  <div>
                    <p className="font-medium">3月20日 (周六) 12:00</p>
                    <p className="text-slate-400 text-sm mt-1">分享酒店特色美食，吸引周末用餐客人</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                  <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="material-symbols-outlined text-primary-orange text-sm">event</span>
                  </div>
                  <div>
                    <p className="font-medium">3月23日 (周二) 19:30</p>
                    <p className="text-slate-400 text-sm mt-1">发布客房设施介绍视频，展示酒店特色</p>
                  </div>
                </div>
              </div>
              <button
                type="button"
                className="mt-6 w-full py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-sm active:scale-95 transition-transform"
              >
                生成完整发布计划
              </button>
            </section>
          </>
        )}

        {/* 往期报告模块 */}
        {activeTab === 'reports' && (
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="title-2">往期分析报告</h2>
              <button
                type="button"
                className="px-4 py-2 bg-white/5 text-sm rounded-full hover:bg-white/10 transition-colors"
              >
                查看全部
              </button>
            </div>
            <div className="space-y-3">
              {reports.map((report) => (
                <Fragment key={report.id}>
                  <ReportCard {...report} />
                </Fragment>
              ))}
            </div>
            <div className="glass-card radius-card p-5 text-center">
              <p className="text-slate-400 mb-4">需要更多历史数据来生成完整的分析报告</p>
              <button
                type="button"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-full font-semibold text-sm active:scale-95 transition-transform"
              >
                导入历史数据
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

function AnalysisCard({ title, value, trend, trendType, icon }: AnalysisCardProps) {
  return (
    <div className="bg-white/5 radius-card p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-slate-400 text-sm">{title}</p>
        <div className={`flex items-center gap-1 text-xs font-medium ${trendType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>
          <span className={`material-symbols-outlined text-[12px]`}>
            {trendType === 'up' ? 'trending_up' : 'trending_down'}
          </span>
          {trend}
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-primary-orange/20 rounded-full flex items-center justify-center">
          <span className="material-symbols-outlined text-primary-orange">{icon}</span>
        </div>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
}

function StrategyCard({ title, description, icon, tags }: StrategyCardProps) {
  return (
    <div className="glass-card radius-card p-5">
      <div className="flex items-start gap-4">
        <div className="bg-primary-orange/20 p-3 radius-control flex-shrink-0">
          <span className="material-symbols-outlined text-primary-orange">{icon}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg mb-2">{title}</h3>
          <p className="text-slate-300 mb-4">{description}</p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-white/5 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ReportCard({ id, title, date, status, views }: ReportCardProps) {
  return (
    <div className="glass-card radius-card p-4 flex items-center justify-between">
      <div>
        <h3 className="font-semibold">{title}</h3>
        <div className="flex items-center gap-4 mt-1">
          <span className="text-xs text-slate-400">{date}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full ${status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
            {status === 'completed' ? '已完成' : '草稿'}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1 text-xs text-slate-400">
          <span className="material-symbols-outlined text-[12px]">visibility</span>
          {views}
        </div>
        <button
          type="button"
          className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center hover:bg-white/10 transition-colors"
        >
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </button>
      </div>
    </div>
  );
}

function CalendarDay({ date, day, hasContent, isToday }: CalendarDayProps) {
  return (
    <div className={`aspect-square rounded-lg flex flex-col items-center justify-center transition-all ${isToday ? 'bg-primary-orange text-white' : hasContent ? 'bg-white/5 hover:bg-white/10' : 'hover:bg-white/5'}`}>
      <span className="text-sm font-medium">{date}</span>
      <span className="text-xs text-slate-400 mt-1">{day}</span>
      {hasContent && !isToday && (
        <div className="w-1 h-1 rounded-full bg-primary-orange mt-1"></div>
      )}
    </div>
  );
}
