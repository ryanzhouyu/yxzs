import { useNavigate } from 'react-router-dom';

export default function ContentTopics() {
  const navigate = useNavigate();

  return (
    <div className="bg-slate-dark min-h-screen pb-24 text-white h-full overflow-y-auto hide-scrollbar">
      <header className="flex items-center justify-between px-6 py-4 pt-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
          <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold text-white">内容选题</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
          <span className="material-symbols-outlined text-white">more_horiz</span>
        </button>
      </header>

      <main className="px-4 space-y-4 pb-10">
        <section className="glass-card p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-bold">当前创意</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden bg-black aspect-video mb-4">
            <img alt="创意缩略图" className="w-full h-full object-cover opacity-80" src="https://picsum.photos/seed/office-worker/800/450" referrerPolicy="no-referrer" />
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
              <h3 className="text-xl font-bold">工作日打工人吐槽短片</h3>
            </div>
          </div>
          <p className="text-sm text-gray-300">基于这个创意，为您推荐以下三个可生成的内容选题</p>
        </section>

        <section className="space-y-4">
          <div className="flex items-center space-x-2 px-2">
            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-bold text-white">推荐选题</h2>
          </div>
          
          <TopicCard 
            title="同事互相吐槽，最终鼓励彼此加油"
            type="短视频"
            duration="30-60秒"
            description="展示同事之间互相吐槽工作中的烦恼，最后互相鼓励加油，传递正能量"
            imgSrc="https://picsum.photos/seed/colleague-talk/600/400"
            isFirst={true}
          />
          
          <TopicCard 
            title="打工人心情变化"
            type="短视频"
            duration="20-40秒"
            description="用表情和动作展示打工人从周一到周五的心情变化"
            imgSrc="https://picsum.photos/seed/mood-change/600/400"
            isFirst={false}
          />
          
          <TopicCard 
            title="老板说vs实际做"
            type="短视频"
            duration="25-45秒"
            description="对比老板说的话和员工实际做的事情，制造幽默反差"
            imgSrc="https://picsum.photos/seed/boss-vs-real/600/400"
            isFirst={false}
          />
        </section>
      </main>
    </div>
  );
}

function TopicCard({ title, type, duration, description, imgSrc, isFirst }: any) {
  return (
    <div className={`glass-card p-4 text-white ${isFirst ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className="flex gap-4">
        <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0">
          <img className="w-full h-full object-cover" src={imgSrc} referrerPolicy="no-referrer" />
        </div>
        <div className="flex-1">
          {isFirst && (
            <div className="inline-block mb-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 rounded-full">
              推荐
            </div>
          )}
          <h3 className="text-sm font-bold mb-2">{title}</h3>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xs px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">
              {type}
            </span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">
              {duration}
            </span>
          </div>
          <p className="text-xs text-gray-400 line-clamp-2">{description}</p>
        </div>
      </div>
      <div className="mt-4 flex gap-2">
        <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 rounded-xl font-semibold text-sm active:scale-95 transition-transform flex items-center justify-center gap-1">
          <span className="material-symbols-outlined text-base">play_circle</span>
          生成内容
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/10 active:scale-95 transition-transform">
          <span className="material-symbols-outlined text-white">bookmark_border</span>
        </button>
      </div>
    </div>
  );
}
