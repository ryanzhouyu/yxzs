import { useNavigate, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import SafeImage from '../components/SafeImage';
import { useApi } from '../hooks/useApi';
import { getVideoBySlug } from '../lib/api/videos';

export default function CreativeDetails() {
  const navigate = useNavigate();
  const { slug = '' } = useParams<{ slug: string }>();
  const { data, loading, error, refetch } = useApi(
    () => getVideoBySlug(slug).then((response) => response.data),
    [slug],
  );

  return (
    <div className="app-page min-h-screen pb-24 overflow-y-auto hide-scrollbar relative">
      <PageHeader
        title="创意详情"
        centered
        leftAction={{ icon: 'arrow_back_ios_new', ariaLabel: '返回', onClick: () => navigate(-1) }}
        rightAction={{ icon: 'share', ariaLabel: '分享' }}
      />

      <main className="px-4 space-y-6 pb-10 pt-20">
        {loading ? (
          <LoadingSkeleton lines={12} />
        ) : error || !data ? (
          <ErrorState message={error || '未找到内容'} onRetry={refetch} />
        ) : (
          <>
            <section className="relative radius-card overflow-hidden shadow-2xl bg-black aspect-3/4">
              <SafeImage alt={data.title} className="w-full h-full object-cover opacity-80" src={data.imgSrc} />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent"></div>
              <div className="absolute top-4 right-4 glass-card px-3 py-1 radius-control text-xs text-white/90">{data.tag}</div>
              <div className="absolute bottom-4 left-4 right-4 glass-panel radius-panel p-4 text-white/95">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 text-3xl font-semibold">
                      <span className="material-symbols-outlined">play_circle</span>
                      <span>{data.views}万</span>
                    </div>
                    <p className="text-xs text-white/70 mt-1">总播放量</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-semibold">{data.rating || '--'}</span>
                  </div>
                </div>
                <div className="grid grid-cols-4 gap-2 border-t border-white/15 pt-3 text-center">
                  <StatItem icon="favorite" value={data.likes} label="点赞" />
                  <StatItem icon="chat_bubble" value={data.comments} label="评论" />
                  <StatItem icon="bookmark" value={data.bookmarks || '--'} label="收藏" />
                  <StatItem icon="share" value={data.shares} label="分享" />
                </div>
              </div>
            </section>

            <section className="glass-card radius-card p-6 text-white">
              <h2 className="title-2 mb-3">{data.title}</h2>
              <p className="text-sm text-white/70 leading-relaxed mb-6">{data.description}</p>
              <div className="flex flex-wrap gap-2">
                {data.hashtags.map((tag) => (
                  <span key={tag} className="bg-gray-700/50 px-3 py-1 radius-control text-xs">{tag}</span>
                ))}
              </div>
            </section>

            <section className="glass-card radius-card p-6 text-white">
              <h2 className="title-2 mb-4">热门内容</h2>
              <div className="space-y-4">
                {data.hotContents?.map((item) => (
                  <div key={item.id} className="glass-card radius-panel p-3 flex items-center gap-4">
                    <div className="w-20 h-20 radius-control overflow-hidden shrink-0">
                      <SafeImage alt={item.title} className="w-full h-full object-cover" src={item.imgSrc} />
                    </div>
                    <div className="flex-1">
                      <h3 className="title-3 mb-2 line-clamp-2">{item.title}</h3>
                      <div className="text-xs text-white/60">{item.platform} · {item.type}</div>
                      <div className="text-xs text-white/60 mt-1">播放 {item.views} · 热度 {item.heat}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}
      </main>

      {data ? (
        <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 glass-nav px-6 py-3 border-t border-white/10">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="flex h-12 w-12 shrink-0 items-center justify-center radius-control bg-white/10 text-white transition-transform active:scale-95"
              aria-label="收藏"
            >
              <span className="material-symbols-outlined text-[22px]">bookmark_border</span>
            </button>
            <button
            type="button"
            onClick={() => navigate(`/topics/${data.slug}`)}
            className="min-w-0 flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 radius-control font-bold text-lg"
          >
            使用这个创意生成内容
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function StatItem({ icon, value, label }: { icon: string; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <div className="material-symbols-outlined text-base text-white/80">{icon}</div>
      <div className="text-[13px] font-semibold text-white/95">{value}</div>
      <div className="text-[10px] text-white/55">{label}</div>
    </div>
  );
}
