import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import TopicCard from '../components/TopicCard';
import { topicCards } from '../data/topicCards';

export default function ContentTopics() {
  const navigate = useNavigate();

  return (
    <div className="app-page min-h-screen pb-24 overflow-y-auto hide-scrollbar relative">
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

      <main className="px-4 space-y-4 pb-10 pt-20">
        <section className="glass-card radius-card p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="title-2">当前创意</h2>
          </div>
          <div className="relative radius-panel overflow-hidden bg-black aspect-video mb-4">
            <img
              alt="创意缩略图"
              className="w-full h-full object-cover opacity-80"
              src="https://picsum.photos/seed/office-worker/800/450"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="title-2">工作日打工人吐槽短片</h3>
            </div>
          </div>
          <p className="text-sm text-gray-300">
            基于这个创意，为您推荐以下三个可生成的内容选题
          </p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
            <h2 className="title-2 text-white">推荐选题</h2>
          </div>

          {topicCards.map((topic) => (
            <TopicCard key={topic.title} {...topic} compact />
          ))}
        </section>
      </main>
    </div>
  );
}
