import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import HeatIcon from '../assets/heat-icon.svg';

type VideoCardProps = {
  imgSrc: string;
  tag: string;
  title: string;
  views: string;
  rating?: string;
  likes: string;
  comments: string;
  shares: string;
  onClick: () => void;
};

type VideoCardData = Omit<VideoCardProps, 'onClick'>;

const videoCards: VideoCardData[] = [
  {
    imgSrc: 'https://picsum.photos/seed/office-worker/1080/1920',
    tag: '创意视频',
    title: '工作日创意短片',
    views: '420',
    rating: '5.0',
    likes: '120万',
    comments: '120万',
    shares: '120万'
  },
  {
    imgSrc: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDFWSuSmsTUBDdsBbET-ifFsYiBp0Jh_up0CLozdG6CEke5qTEZ3Gm8pSBGWYzPvgI_LPr2jolz9ky9DO_t3emfLn0hEATHQe_c_-c1YNjc8sS46FceTS5ZV3xpqLcSyLSLcDnwgN2mS8yLMgYuQLicU9zBGYf7o-aBtkc31UOsWrOAy7yFSNKSrO1gT-82lQTSOcQFGKZcPwt038HoWxBeY5nj7H6QoELV7TY8Sqg-K1nfKdqv0y_WiqUQhWSOcdQK5qdCFBStCf7V',
    tag: '专业设备',
    title: '打造你的专业工作室',
    views: '10',
    rating: '4.8',
    likes: '8.5万',
    comments: '1.2万',
    shares: '3.4万'
  },
  {
    imgSrc: 'https://picsum.photos/seed/creative-idea/1080/1920',
    tag: '创意教程',
    title: '如何拍摄创意短视频',
    views: '89',
    rating: '4.9',
    likes: '45万',
    comments: '3.2万',
    shares: '12.5万'
  },
  {
    imgSrc: 'https://picsum.photos/seed/marketing/1080/1920',
    tag: '营销技巧',
    title: '社交媒体营销新趋势',
    views: '67',
    rating: '4.7',
    likes: '32万',
    comments: '2.8万',
    shares: '9.6万'
  },
  {
    imgSrc: 'https://picsum.photos/seed/animation/1080/1920',
    tag: '动画制作',
    title: '零基础学动画制作',
    views: '34',
    rating: '4.6',
    likes: '18万',
    comments: '1.5万',
    shares: '6.2万'
  }
];

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="app-page vibrant-gradient-1 relative">
      <header className="absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent pointer-events-none">
        <div className="flex justify-between items-start pointer-events-auto">
          <div>
            <h1 className="title-1 text-glow">发现创意灵感</h1>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs font-medium text-white/70">10月6日 星期一</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">早上好，创作者</span>
            </div>
          </div>
          <button type="button" className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center" aria-label="通知">
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        </div>
      </header>

      <main className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
        {videoCards.map((card) => (
          <Fragment key={`${card.tag}-${card.title}`}>
            <VideoCard {...card} onClick={() => navigate('/details')} />
          </Fragment>
        ))}
      </main>
    </div>
  );
}

function VideoCard({
  imgSrc,
  tag,
  title,
  views,
  rating,
  likes,
  comments,
  shares,
  onClick
}: VideoCardProps) {
  return (
    <section className="relative h-full w-full snap-start overflow-hidden cursor-pointer" onClick={onClick}>
      <img alt={title} className="absolute inset-0 w-full h-full object-cover scale-105" src={imgSrc} referrerPolicy="no-referrer" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
      <div className="absolute bottom-32 left-0 w-full px-6 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 radius-control bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-white/30 mb-3">{tag}</span>
            <h2 className="display-1 mb-4 drop-shadow-xl">{title}</h2>
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black italic tracking-tighter">{views}</span>
                  <span className="text-lg font-bold opacity-80">万</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase opacity-60">总播放量</span>
              </div>
              {rating && (
                <>
                  <div className="h-10 w-px bg-white/20 mx-2"></div>
                  <div className="flex items-center gap-1 glass-card px-3 py-1.5 radius-control">
                    <img src={HeatIcon} alt="star" className="w-4 h-4" />
                    <span className="text-sm font-bold">{rating}</span>
                  </div>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="flex flex-col items-center gap-1 group">
              <div className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center group-active:scale-90 transition-transform">
                <span className="material-symbols-outlined fill-current text-white">favorite</span>
              </div>
              <span className="text-[10px] font-bold">{likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center">
                <span className="material-symbols-outlined">chat_bubble</span>
              </div>
              <span className="text-[10px] font-bold">{comments}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <div className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center">
                <span className="material-symbols-outlined">share</span>
              </div>
              <span className="text-[10px] font-bold">{shares}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

