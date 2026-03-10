import { useNavigate } from 'react-router-dom';

export default function CreativeDetails() {
  const navigate = useNavigate();
  
  return (
    <div className="bg-slate-dark min-h-screen pb-24 text-white h-full overflow-y-auto hide-scrollbar">
      <header className="flex items-center justify-between px-6 py-4 pt-4">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
          <span className="material-symbols-outlined text-white">arrow_back_ios_new</span>
        </button>
        <h1 className="text-lg font-bold text-white">创意详情</h1>
        <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10">
          <span className="material-symbols-outlined text-white">share</span>
        </button>
      </header>
      
      <main className="px-4 space-y-4 pb-10">
        <section className="relative rounded-[32px] overflow-hidden shadow-2xl bg-black aspect-[3/4]">
          <img alt="Hero Image" className="w-full h-full object-cover opacity-80" src="https://picsum.photos/seed/office-worker/1080/1920" referrerPolicy="no-referrer" />
          <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-3 py-1 rounded-lg text-xs text-white">创意视频</div>
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent text-white">
            <div className="flex items-end justify-between mb-4">
              <div>
                <div className="flex items-center space-x-2 text-3xl font-bold">
                  <span className="material-symbols-outlined">play_circle</span>
                  <span>420万</span>
                </div>
                <p className="text-sm opacity-70">总播放量</p>
              </div>
              <div className="text-right">
                <div className="flex text-yellow-400 mb-1 text-sm">
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                  <span className="material-symbols-outlined fill-current">star</span>
                </div>
                <span className="text-2xl font-bold">5.0</span>
              </div>
            </div>
            <div className="flex justify-between border-t border-white/20 pt-4 text-center">
              <StatItem icon="favorite" value="120万" label="点赞" />
              <StatItem icon="chat_bubble" value="120万" label="评论" />
              <StatItem icon="bookmark" value="收藏" label="收藏" />
              <StatItem icon="share" value="分享" label="分享" />
            </div>
          </div>
        </section>
        
        <section className="glass-card p-6 text-white">
          <div className="flex items-center space-x-2 mb-4">
            <div className="w-1.5 h-6 bg-purple-500 rounded-full"></div>
            <h2 className="text-lg font-bold">创意核心内容</h2>
          </div>
          <h3 className="text-xl font-bold mb-3">工作日创意短片</h3>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            工作日创意短片主要以职场牛马的视角，切入一天的工作内容，在诙谐吐槽的同时，不经意间展示出企业的优秀文化或服务。这种反差萌的叙事手法极易引起年轻职场人的共鸣，从而引发大规模的二次传播。
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs">#职场吐槽</span>
            <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs">#创意剧情</span>
            <span className="bg-gray-700/50 px-3 py-1 rounded-full text-xs">#企业文化</span>
          </div>
        </section>
        
        <section className="glass-card p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <div className="w-1.5 h-6 bg-blue-500 rounded-full"></div>
              <h2 className="text-lg font-bold">7天播放量趋势</h2>
            </div>
            <button className="text-xs border border-gray-500 px-2 py-1 rounded-md text-gray-300">近7天</button>
          </div>
          <div className="h-40 relative mb-4">
            <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 50">
              <path d="M0,45 Q10,40 20,20 T40,25 T60,10 T80,15 T100,5" fill="none" stroke="#8B5CF6" strokeWidth="2"></path>
              <path d="M0,40 Q15,45 30,35 T50,30 T70,35 T90,20 T100,25" fill="none" opacity="0.8" stroke="#F97316" strokeDasharray="3,1" strokeWidth="1.5"></path>
              <path d="M0,48 Q20,48 40,45 T60,40 T80,42 T100,38" fill="none" opacity="0.6" stroke="#3B82F6" strokeWidth="1.5"></path>
            </svg>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <GridStat label="点赞量 (Likes)" value="125.8w" trend="↑ 12%" trendColor="text-green-500" />
            <GridStat label="收藏量 (Favs)" value="45.2w" trend="↑ 8%" trendColor="text-green-500" />
            <GridStat label="评论数 (Comments)" value="12.3w" trend="↓ 2%" trendColor="text-red-500" />
            <GridStat label="分享数 (Shares)" value="8.9w" trend="↑ 5%" trendColor="text-green-500" />
          </div>
        </section>
        
        <section className="glass-card p-6 text-white">
          <div className="flex items-center space-x-2 mb-6">
            <div className="w-1.5 h-6 bg-green-500 rounded-full"></div>
            <h2 className="text-lg font-bold">热门内容</h2>
          </div>
          <div className="space-y-4">
            <HotContentItem 
              platform="抖音" 
              type="短视频" 
              views="240万" 
              heat="98%" 
              title="职场人必看！真实还原工作日的一天" 
              imgSrc="https://picsum.photos/seed/douyin1/600/400" 
            />
            <HotContentItem 
              platform="小红书" 
              type="图文" 
              views="180万" 
              heat="92%" 
              title="打工人的一天，这是不是你？" 
              imgSrc="https://picsum.photos/seed/xiaohongshu1/600/400" 
            />
            <HotContentItem 
              platform="抖音" 
              type="短视频" 
              views="150万" 
              heat="85%" 
              title="办公室那些有趣的瞬间" 
              imgSrc="https://picsum.photos/seed/douyin2/600/400" 
            />
          </div>
        </section>
      </main>
      
      <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50 bg-slate-dark/80 backdrop-blur-xl px-6 py-3 border-t border-white/10 flex items-center justify-center">
        <button onClick={() => navigate('/topics')} className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-3 rounded-2xl font-bold text-lg shadow-lg shadow-purple-500/20 active:scale-95 transition-transform flex items-center justify-center gap-2">
          <span className="material-symbols-outlined">magic_button</span>
          使用这个创意，生成内容
        </button>
      </div>
    </div>
  );
}

function StatItem({ icon, value, label }: any) {
  return (
    <div>
      <div className="mb-1 material-symbols-outlined">{icon}</div>
      <div className="text-sm font-bold">{value}</div>
      <div className="text-[10px] opacity-60">{label}</div>
    </div>
  );
}

function GridStat({ label, value, trend, trendColor }: any) {
  return (
    <div className="rounded-2xl p-4 text-center bg-white/5 border border-white/10">
      <p className="text-xs mb-1 text-gray-400">{label}</p>
      <p className="text-lg font-bold text-white">{value}</p>
      <p className={`text-[10px] ${trendColor}`}>{trend}</p>
    </div>
  );
}

function HotContentItem({ platform, type, views, heat, title, imgSrc }: any) {
  return (
    <div className="flex gap-4 p-3 rounded-xl bg-white/5 border border-white/10">
      <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0">
        <img className="w-full h-full object-cover" src={imgSrc} referrerPolicy="no-referrer" />
      </div>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <span className={`text-xs px-2 py-0.5 rounded-full ${platform === '抖音' ? 'bg-blue-500/20 text-blue-400' : 'bg-red-500/20 text-red-400'}`}>
            {platform}
          </span>
          <span className="text-xs px-2 py-0.5 rounded-full bg-gray-700/50 text-gray-300">
            {type}
          </span>
        </div>
        <h3 className="text-sm font-bold mb-2 line-clamp-2">{title}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">visibility</span>
              <span className="text-xs">{views}</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="material-symbols-outlined text-xs">local_fire_department</span>
              <span className="text-xs">{heat}</span>
            </div>
          </div>
          <span className="material-symbols-outlined text-xs text-gray-400">chevron_right</span>
        </div>
      </div>
    </div>
  );
}
