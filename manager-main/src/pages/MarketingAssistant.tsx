import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import Toast from '../components/Toast';
import { useApi } from '../hooks/useApi';
import {
  getMarketingAnalysis,
  getMarketingCalendar,
  getMarketingReports,
  getMarketingStrategies,
  getMarketingTopics,
  getPublishSuggestions,
} from '../lib/api/marketing';

export default function MarketingAssistant() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'analysis' | 'plan' | 'reports'>('analysis');
  const [toast, setToast] = useState('');
  const query = useApi(async () => {
    const [analysis, strategies, topics, calendar, suggestions, reports] = await Promise.all([
      getMarketingAnalysis(),
      getMarketingStrategies(),
      getMarketingTopics(),
      getMarketingCalendar(),
      getPublishSuggestions(),
      getMarketingReports(),
    ]);

    return {
      analysis: analysis.data,
      strategies: strategies.data,
      topics: topics.data,
      calendar: calendar.data,
      suggestions: suggestions.data,
      reports: reports.data,
    };
  }, []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const id = window.setTimeout(() => setToast(''), 2000);
    return () => window.clearTimeout(id);
  }, [toast]);

  const calendarDays = useMemo(() => query.data?.calendar ?? [], [query.data]);

  if (query.loading) {
    return (
      <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
        <PageHeader title="营销助手" />
        <main className="px-6 pt-24"><LoadingSkeleton lines={14} /></main>
      </div>
    );
  }

  if (query.error || !query.data) {
    return (
      <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
        <PageHeader title="营销助手" />
        <main className="px-6 pt-24">
          <ErrorState message={query.error || '加载失败'} onRetry={query.refetch} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
      {toast ? <Toast message={toast} /> : null}
      <PageHeader title="营销助手" />

      <main className="px-6 space-y-8 pt-20">
        <div className="flex gap-2 overflow-x-auto pb-2 hide-scrollbar">
          <TabButton active={activeTab === 'analysis'} onClick={() => setActiveTab('analysis')}>酒店分析</TabButton>
          <TabButton active={activeTab === 'plan'} onClick={() => setActiveTab('plan')}>运营计划</TabButton>
          <TabButton active={activeTab === 'reports'} onClick={() => setActiveTab('reports')}>往期报告</TabButton>
        </div>

        {activeTab === 'analysis' ? (
          <>
            <section className="glass-card radius-card p-6">
              <h2 className="title-2 mb-6">酒店社媒分析</h2>
              <div className="grid grid-cols-2 gap-4">
                {query.data.analysis.cards.map((item) => (
                  <div key={item.title} className="bg-white/5 radius-card p-4">
                    <p className="text-slate-400 text-sm">{item.title}</p>
                    <p className="text-2xl font-bold mt-3">{item.value}</p>
                    <div className={`text-xs mt-2 ${item.trendType === 'up' ? 'text-emerald-400' : 'text-red-400'}`}>{item.trend}</div>
                  </div>
                ))}
              </div>
              <p className="text-slate-300 mt-6">{query.data.analysis.summary}</p>
            </section>

            <section className="glass-card radius-card p-5">
              <h2 className="title-2 mb-4">热门话题推荐</h2>
              <div className="space-y-4">
                {query.data.topics.map((topic) => (
                  <div key={topic.topic} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{topic.topic}</p>
                      <div className="text-xs text-slate-400 mt-1">热度 {topic.heat} · 匹配度 {topic.match}</div>
                    </div>
                    <button type="button" className="px-3 py-1 bg-white/5 text-xs rounded-full" onClick={() => navigate('/details/office-worker')}>使用</button>
                  </div>
                ))}
              </div>
            </section>
          </>
        ) : null}

        {activeTab === 'plan' ? (
          <>
            <section className="space-y-4">
              <h2 className="title-2">策略建议</h2>
              {query.data.strategies.map((strategy) => (
                <div key={strategy.title} className="glass-card radius-card p-5">
                  <h3 className="font-semibold text-lg">{strategy.title}</h3>
                  <p className="text-slate-300 mt-2">{strategy.description}</p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {strategy.tags.map((tag) => (
                      <span key={tag} className="px-3 py-1 bg-white/5 text-xs rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

            <section className="glass-card radius-card p-5">
              <h2 className="title-2 mb-4">发布时间建议</h2>
              <div className="grid grid-cols-7 gap-2 mb-5">
                {calendarDays.map((day, index) => (
                  <div
                    key={`${day.date}-${index}`}
                    className={`aspect-square rounded-lg flex items-center justify-center text-sm ${day.isToday ? 'bg-primary-orange' : day.hasContent ? 'bg-white/10' : 'bg-white/5'}`}
                  >
                    {day.date || ''}
                  </div>
                ))}
              </div>
              <div className="space-y-3">
                {query.data.suggestions.map((item) => (
                  <div key={`${item.time}-${item.title}`} className="flex items-start gap-3 p-3 bg-white/5 rounded-lg">
                    <div className="w-8 h-8 bg-primary-orange/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-primary-orange text-sm">event</span>
                    </div>
                    <div>
                      <p className="font-medium">{item.time} · {item.platform} · {item.type}</p>
                      <p className="text-slate-400 text-sm mt-1">{item.title}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button type="button" className="mt-6 w-full py-2 bg-primary-orange rounded-full font-semibold text-sm" onClick={() => setToast('完整发布计划已生成，可继续扩展导出能力')}>
                生成完整发布计划
              </button>
            </section>
          </>
        ) : null}

        {activeTab === 'reports' ? (
          <section className="space-y-4">
            <h2 className="title-2">往期分析报告</h2>
            {query.data.reports.map((report) => (
              <div key={report.id} className="glass-card radius-card p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">{report.title}</h3>
                  <div className="text-xs text-slate-400 mt-1">{report.date || report.reportDate}</div>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${report.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                  {report.status === 'completed' ? '已完成' : '草稿'}
                </span>
              </div>
            ))}
          </section>
        ) : null}
      </main>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm font-medium ${active ? 'bg-primary-orange text-white shadow-lg' : 'bg-white/5 text-white/70 hover:bg-white/10'}`}
    >
      {children}
    </button>
  );
}
