import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import SafeImage from '../components/SafeImage';
import { useApi } from '../hooks/useApi';
import { getVideos, toggleVideoLike, type VideoListItem } from '../lib/api/videos';

export default function Discover() {
  const navigate = useNavigate();
  const { data, loading, error, refetch } = useApi(
    () => getVideos().then((response) => response.data),
    [],
  );
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-page vibrant-gradient-1 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-70"></div>
      <PageHeader 
        title="发现创意灵感" 
        pointerEventsNone 
        className={`transition-all duration-300 ${scrollY > 100 ? 'opacity-80 scale-95' : 'opacity-100 scale-100'}`}
      />
      <main className="h-full w-full overflow-y-auto snap-y snap-mandatory hide-scrollbar">
        {loading ? (
          <div className="px-6 pt-24 space-y-6">
            <LoadingSkeleton lines={8} className="animate-pulse" />
            <LoadingSkeleton lines={8} className="animate-pulse" />
            <LoadingSkeleton lines={8} className="animate-pulse" />
          </div>
        ) : error ? (
          <div className="px-6 pt-24">
            <ErrorState message={error} onRetry={refetch} />
          </div>
        ) : (
          <div className="space-y-1">
            {data?.map((card, index) => (
              <VideoCard 
                key={card.slug} 
                card={card} 
                onOpen={() => navigate(`/details/${card.slug}`)}
                delay={index * 0.1}
              />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function VideoCard({ card, onOpen, delay }: { card: VideoListItem; onOpen: () => void; delay: number }) {
  const [liked, setLiked] = useState(card.liked);
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  async function handleLike(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    try {
      const result = await toggleVideoLike(card.slug);
      setLiked(result.liked);
    } catch {
      setLiked(card.liked);
    }
  }

  return (
    <section
      ref={cardRef}
      className="relative h-[70vh] w-full snap-start overflow-hidden cursor-pointer group"
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          onOpen();
        }
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animation: `fadeInUp 0.8s ease-out ${delay}s both`,
      }}
    >
      <SafeImage 
        alt={card.title} 
        className={`absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out ${isHovered ? 'scale-110' : 'scale-105'}`} 
        src={card.imgSrc} 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full px-6 py-12 flex flex-col gap-6">
        <div className="flex items-end justify-between">
          <div className="flex-1 space-y-4">
            <span className="inline-block px-4 py-1.5 radius-control bg-white/20 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest border border-white/30 transform transition-transform duration-300 group-hover:scale-105">
              {card.tag}
            </span>
            <h2 className="display-1 drop-shadow-xl transition-all duration-300 group-hover:translate-y-[-2px]">{card.title}</h2>
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black italic tracking-tighter">{card.views}</span>
                  <span className="text-lg font-bold opacity-80">万</span>
                </div>
                <span className="text-[10px] tracking-widest uppercase opacity-60">总播放量</span>
              </div>
              <div className="h-8 w-px bg-white/20"></div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium opacity-80">{card.rating || '热门创意'}</span>
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-[12px]">auto_awesome</span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-4 items-center">
            <MetricButton icon="favorite" value={card.likes} active={liked} onClick={handleLike} />
            <MetricButton icon="chat_bubble" value={card.comments} />
            <MetricButton icon="share" value={card.shares} />
          </div>
        </div>
        <div className="w-full h-1 bg-gradient-to-r from-primary via-accent-blue to-accent-purple rounded-full opacity-60 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      </div>
    </section>
  );
}

function MetricButton({
  icon,
  value,
  active = false,
  onClick,
}: {
  icon: string;
  value: string;
  active?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 group">
      <button
        type="button"
        className="w-12 h-12 rounded-full glass-card icon-button flex items-center justify-center active:scale-90 transition-all duration-300 group-hover:scale-105 group-hover:bg-white/12"
        onClick={onClick}
      >
        <span className={`material-symbols-outlined ${active ? 'text-red-500 scale-110' : 'text-white'} transition-all duration-300`}>{icon}</span>
      </button>
      <span className="text-[10px] font-bold opacity-80 transition-opacity duration-300 group-hover:opacity-100">{value}</span>
    </div>
  );
}
