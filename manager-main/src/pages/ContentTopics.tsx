import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SafeImage from '../components/SafeImage';
import TopicCard from '../components/TopicCard';
import { topicCards } from '../data/topicCards';

export default function ContentTopics() {
  const navigate = useNavigate();

  return (
    <div className="app-page relative min-h-screen overflow-y-auto pb-24 hide-scrollbar">
      <PageHeader
        title="内容选题"
        centered
        leftAction={{
          icon: 'arrow_back_ios_new',
          ariaLabel: '返回',
          onClick: () => navigate(-1),
        }}
        rightAction={{
          icon: 'more_horiz',
          ariaLabel: '更多选项',
        }}
      />

      <main className="space-y-4 px-4 pb-10 pt-20">
        <section className="glass-card radius-card p-6 text-white">
          <div className="mb-4 flex items-center space-x-2">
            <div className="h-6 w-1.5 rounded-full bg-purple-500"></div>
            <h2 className="title-2">当前创意</h2>
          </div>
          <div className="relative mb-4 aspect-video overflow-hidden radius-panel bg-black">
            <SafeImage
              alt="创意缩略图"
              className="h-full w-full object-cover opacity-80"
              src="https://picsum.photos/seed/office-worker/800/450"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="title-2">工作日打工人吐槽短片</h3>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            基于这个创意，为你推荐以下三个可直接生成的内容选题。
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="h-6 w-1.5 rounded-full bg-green-500"></div>
            <h2 className="title-2 text-white">推荐选题</h2>
          </div>

          <div className="-mx-4 overflow-x-auto px-4 pb-2 hide-scrollbar">
            <div className="flex snap-x snap-mandatory gap-4 pr-4">
              {topicCards.map((topic) => (
                <TopicCard key={topic.title} {...topic} />
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
