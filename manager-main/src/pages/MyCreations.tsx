import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import SafeImage from '../components/SafeImage';
import { useApi } from '../hooks/useApi';
import { getCreationCalendar, getInspirations, getWorks } from '../lib/api/creations';

export default function MyCreations() {
  const navigate = useNavigate();
  const calendarQuery = useApi(() => getCreationCalendar().then((response) => response.data), []);
  const inspirationsQuery = useApi(() => getInspirations().then((response) => response.data), []);
  const worksQuery = useApi(() => getWorks().then((response) => response.data), []);

  const error = calendarQuery.error || inspirationsQuery.error || worksQuery.error;
  const loading = calendarQuery.loading || inspirationsQuery.loading || worksQuery.loading;

  return (
    <div className="app-page min-h-screen text-slate-100 pb-24 overflow-y-auto hide-scrollbar relative">
      <PageHeader title="我的创意" />

      <main className="space-y-8 pt-20">
        {loading ? (
          <div className="px-6"><LoadingSkeleton lines={12} /></div>
        ) : error ? (
          <div className="px-6"><ErrorState message={error} onRetry={() => {
            calendarQuery.refetch();
            inspirationsQuery.refetch();
            worksQuery.refetch();
          }} /></div>
        ) : (
          <>
            <section>
              <div className="px-6 flex items-center justify-between mb-4">
                <h2 className="title-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-orange">calendar_month</span>
                  7天营销日历
                </h2>
              </div>
              <div className="flex overflow-x-auto hide-scrollbar px-6 gap-4">
                {calendarQuery.data?.map((item, index) => (
                  <div key={`${item.title}-${index}`} className="min-w-[160px] glass-card radius-panel p-3">
                    <div className="text-[10px] text-primary-orange">{item.dayLabel || '计划'}</div>
                    <p className="text-sm font-semibold mt-2">{item.title}</p>
                    <p className="text-[10px] mt-1 text-slate-400">推荐 {item.timeHint || '全天'} 发布</p>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <div className="px-6 flex items-center justify-between mb-4">
                <h2 className="title-2 flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary-orange">bookmark</span>
                  灵感收藏
                </h2>
              </div>
              <div className="grid grid-cols-3 gap-3 px-6">
                {inspirationsQuery.data?.slice(0, 6).map((item) => (
                  <div key={item.id} className="aspect-square glass-card radius-control overflow-hidden">
                    <SafeImage alt={item.altText || '灵感图片'} className="w-full h-full object-cover" src={item.imgSrc || item.imageUrl} />
                  </div>
                ))}
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
                {worksQuery.data?.map((work) => (
                  <div key={work.id} className="glass-card radius-panel p-4 flex gap-4">
                    <div className="w-24 h-24 radius-control overflow-hidden shrink-0">
                      <SafeImage alt={work.title} className="w-full h-full object-cover" src={work.imageUrl || work.imgSrc} />
                    </div>
                    <div className="flex-1">
                      <h3 className="title-3">{work.title}</h3>
                      <p className="text-xs text-slate-500 line-clamp-2 mt-1">{work.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
