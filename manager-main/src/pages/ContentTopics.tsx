import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';

type TopicCardProps = {
  title: string;
  type: string;
  duration: string;
  description: string;
  imgSrc: string;
  isFirst: boolean;
};

const topics: TopicCardProps[] = [
  {
    title: '同事互相吐槽，最后彼此加油',
    type: '短视频',
    duration: '30-60秒',
    description: '展示同事之间互相吐槽工作中的烦恼，最后互相鼓励加油，传递正能量',
    imgSrc: 'https://picsum.photos/seed/colleague-talk/600/400',
    isFirst: true
  },
  {
    title: '打工人心情变化',
    type: '短视频',
    duration: '20-40秒',
    description: '用表情和动作展示打工人从周一到周五的心情变化',
    imgSrc: 'https://picsum.photos/seed/mood-change/600/400',
    isFirst: false
  },
  {
    title: '老板说的 vs 实际做的',
    type: '短视频',
    duration: '25-45秒',
    description: '对比老板说的话和员工实际做的事情，制造幽默反差',
    imgSrc: 'https://picsum.photos/seed/boss-vs-real/600/400',
    isFirst: false
  }
];

export default function ContentTopics() {
  const navigate = useNavigate();

  return (
    <div className="app-page min-h-screen pb-24 overflow-y-auto hide-scrollbar relative">
      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex justify-between items-start">
          <button type="button" onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full glass-card" aria-label="返回">
            <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
          </button>
          <div className="text-center">
            <h1 className="title-1 text-glow">内容选题</h1>
            <div className="flex items-center gap-2 mt-1 justify-center">
              <span className="text-xs font-medium text-white/70">10月6日 星期一</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">早上好，创作者</span>
            </div>
          </div>
          <button type="button" className="w-10 h-10 flex items-center justify-center rounded-full glass-card" aria-label="更多选项">
            <span className="material-symbols-outlined text-white">more_horiz</span>
          </button>
        </div>
      </header>

      <main className="px-4 space-y-4 pb-10 pt-20">
        <section className="glass-card radius-card p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="title-2">当前创意</h2>
          </div>
          <div className="relative radius-panel overflow-hidden bg-black aspect-video mb-4">
            <img alt="创意缩略图" className="w-full h-full object-cover opacity-80" src="https://picsum.photos/seed/office-worker/800/450" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="title-2">工作日打工人吐槽短片</h3>
            </div>
          </div>
          <p className="text-sm text-gray-300">基于这个创意，为您推荐以下三个可生成的内容选题</p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
            <h2 className="title-2 text-white">推荐选题</h2>
          </div>

          {topics.map((topic) => (
            <Fragment key={topic.title}>
              <TopicCard {...topic} />
            </Fragment>
          ))}
        </section>
      </main>
    </div>
  );
}

function TopicCard({ title, type, duration, description, imgSrc, isFirst }: TopicCardProps) {
  return (
    <div className={`glass-card radius-panel p-4 text-white ${isFirst ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className="flex gap-4">
        <div className="w-24 h-24 radius-control overflow-hidden shrink-0">
          <img alt={title} className="w-full h-full object-cover" src={imgSrc} referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          {isFirst && (
            <div className="inline-block mb-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 radius-control">
              推荐
            </div>
          )}
          <h3 className="title-3 mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 radius-control bg-purple-500/20 text-purple-400">
              {type}
            </span>
            <span className="text-xs px-2 py-0.5 radius-control bg-gray-700/50 text-gray-300">
              {duration}
            </span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button type="button" className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 radius-control font-semibold text-sm active:scale-95 transition-transform flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-base">play_circle</span>
          生成内容
        </button>
        <button type="button" className="w-10 h-10 flex items-center justify-center radius-control bg-white/10 active:scale-95 transition-transform" aria-label="收藏">
          <span className="material-symbols-outlined text-white">bookmark_border</span>
        </button>
      </div>
    </div>
  );
}


