import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';
import SafeImage from '../components/SafeImage';
import HeatIcon from '../assets/heat-icon.svg';
import { videoCards } from '../data/videoCards';

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

export default function Discover() {
  const navigate = useNavigate();

  return (
    <div className="app-page vibrant-gradient-1 relative">
      <PageHeader title="发现创意灵感" pointerEventsNone />

      <main className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
        {videoCards.map((card) => (
          <VideoCard key={card.id} {...card} onClick={() => navigate(`/details/${card.id}`)} />
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
  onClick,
}: VideoCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <section
      className="relative h-full w-full snap-start overflow-hidden cursor-pointer"
      role="button"
      tabIndex={0}
      aria-label={`查看「${title}」详情`}
      onClick={onClick}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') onClick(); }}
    >
      <SafeImage alt={title} className="absolute inset-0 w-full h-full object-cover scale-105" src={imgSrc} />
      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent"></div>
      <div className="absolute bottom-32 left-0 w-full px-6 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="flex-1">
            <span className="inline-block px-3 py-1 radius-control bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-white/30 mb-3">
              {tag}
            </span>
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
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                aria-label={liked ? '取消点赞' : '点赞'}
                className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center active:scale-90 transition-transform"
                onClick={(e) => { e.stopPropagation(); setLiked(!liked); }}
              >
                <span className={`material-symbols-outlined fill-current transition-colors ${liked ? 'text-red-500' : 'text-white'}`}>favorite</span>
              </button>
              <span className="text-[10px] font-bold">{likes}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                aria-label="评论"
                className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center active:scale-90 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="material-symbols-outlined">chat_bubble</span>
              </button>
              <span className="text-[10px] font-bold">{comments}</span>
            </div>
            <div className="flex flex-col items-center gap-1">
              <button
                type="button"
                aria-label="分享"
                className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center active:scale-90 transition-transform"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="material-symbols-outlined">share</span>
              </button>
              <span className="text-[10px] font-bold">{shares}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
