import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import { useApi } from '../hooks/useApi';
import { getHotspots } from '../lib/api/hotspots';

export default function IndustryHotspots() {
  const { data, loading, error, refetch } = useApi(
    () => getHotspots().then((response) => response.data),
    [],
  );

  return (
    <div className="app-page relative">
      <PageHeader title="行业热点分析" />

      <main className="h-full w-full overflow-y-auto hide-scrollbar px-6 pb-32 pt-20 z-10 relative space-y-6">
        {loading ? (
          <LoadingSkeleton lines={14} />
        ) : error || !data ? (
          <ErrorState message={error || '加载失败'} onRetry={refetch} />
        ) : (
          <>
            <section className="glass-panel radius-card p-5">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="title-2">{data.metrics.industryName}</h2>
                </div>
                <div className="text-right">
                  <div className="text-primary-orange font-bold text-lg">{data.metrics.heatLevel}</div>
                  <p className="text-[10px] text-slate-500">数据来源：抖音 / 小红书</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <MetricCard title="总曝光量" value={data.metrics.totalExposure} trend={data.metrics.exposureTrend} />
                <MetricCard title="互动率" value={data.metrics.engagementRate} trend={data.metrics.engagementTrend} />
              </div>
            </section>

            <section className="glass-panel radius-card p-5">
              <h2 className="title-2 mb-4">区域热度</h2>
              <div className="space-y-3">
                {data.regions.map((region) => (
                  <div key={region.rank} className="flex items-center gap-3 p-2.5 radius-control bg-white/5 border border-white/5">
                    <div className="w-8 h-8 rounded-full bg-primary-orange flex items-center justify-center text-black font-black text-sm">{region.rank}</div>
                    <div className="flex-1">
                      <div className="text-sm font-bold">{region.name}</div>
                      <div className="text-[10px] text-white/50">{region.desc}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-accent-blue">{region.score}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section className="glass-panel radius-card p-5">
              <h2 className="title-2 mb-4">热点话题</h2>
              <div className="grid grid-cols-2 gap-3">
                {data.hotTopics.map((topic) => (
                  <div key={topic.title} className="radius-panel p-4 bg-white/5">
                    <h3 className="title-3">{topic.title}</h3>
                    <div className="text-xs text-white/70 mt-2">热度 {topic.heat}</div>
                  </div>
                ))}
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {data.trendTags.map((tag) => (
                  <span key={tag} className="bg-white/5 px-3 py-1 radius-control text-xs">{tag}</span>
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}

function MetricCard({ title, value, trend }: { title: string; value: string; trend: string }) {
  return (
    <div className="bg-white/5 radius-control p-3">
      <p className="text-slate-400 text-[10px] uppercase">{title}</p>
      <p className="text-lg font-bold">{value}</p>
      <div className="text-[10px] text-emerald-400 mt-1">{trend}</div>
    </div>
  );
}
