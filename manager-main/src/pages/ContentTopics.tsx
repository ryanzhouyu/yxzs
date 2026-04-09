import { useNavigate, useParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import TopicCard from '../components/TopicCard';
import { useApi } from '../hooks/useApi';
import { getVideoBySlug, getVideoTopics } from '../lib/api/videos';

export default function ContentTopics() {
  const navigate = useNavigate();
  const { creativeId = '' } = useParams<{ creativeId: string }>();
  const topicQuery = useApi(() => getVideoTopics(creativeId).then((response) => response.data), [creativeId]);
  const videoQuery = useApi(() => getVideoBySlug(creativeId).then((response) => response.data), [creativeId]);

  return (
    <div className="app-page relative min-h-screen overflow-y-auto pb-24 hide-scrollbar">
      <PageHeader
        title="内容选题"
        centered
        leftAction={{ icon: 'arrow_back_ios_new', ariaLabel: '返回', onClick: () => navigate(-1) }}
        rightAction={{ icon: 'more_horiz', ariaLabel: '更多选项' }}
      />

      <main className="space-y-4 px-4 pb-10 pt-20">
        {videoQuery.loading || topicQuery.loading ? (
          <LoadingSkeleton lines={10} />
        ) : videoQuery.error || topicQuery.error || !videoQuery.data ? (
          <ErrorState
            message={videoQuery.error || topicQuery.error || '加载失败'}
            onRetry={() => {
              videoQuery.refetch();
              topicQuery.refetch();
            }}
          />
        ) : (
          <>
            <section className="glass-card radius-card p-6 text-white">
              <div className="mb-4 flex items-center space-x-2">
                <div className="h-6 w-1.5 rounded-full bg-purple-500"></div>
                <h2 className="title-2">当前创意</h2>
              </div>
              <p className="text-sm text-gray-300">
                基于「{videoQuery.data.title}」已生成以下可直接复用的内容选题。
              </p>
            </section>

            <section className="space-y-4">
              <div className="flex items-center space-x-2 px-2">
                <div className="h-6 w-1.5 rounded-full bg-green-500"></div>
                <h2 className="title-2 text-white">推荐选题</h2>
              </div>
              <div className="space-y-4">
                {topicQuery.data?.map((topic) => (
                  <TopicCard key={topic.title} {...topic} compact />
                ))}
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  );
}
