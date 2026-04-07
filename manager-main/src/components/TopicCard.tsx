import type { TopicCardData } from '../data/topicCards';
import SafeImage from './SafeImage';

type TopicCardProps = TopicCardData & {
  compact?: boolean;
};

export default function TopicCard({
  title,
  type,
  duration,
  description,
  imgSrc,
  isFirst,
  compact = false,
}: TopicCardProps) {
  const cardClassName = compact
    ? 'glass-card radius-panel p-4 text-white'
    : 'glass-card radius-panel p-4 text-white min-w-[272px] w-[calc(100vw-104px)] max-w-[304px] shrink-0 snap-start';
  const imageClassName = compact ? 'w-24 h-24' : 'w-20 h-20';
  const layoutClassName = compact ? 'flex items-start gap-4' : 'flex items-start gap-3 mb-3';
  const titleClassName = compact ? 'title-3 mb-2 line-clamp-2' : 'title-3 mb-1 text-sm line-clamp-2';
  const buttonLabel = '生成内容';

  return (
    <div className={`${cardClassName} ${isFirst ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className={layoutClassName}>
        <div className={`${imageClassName} radius-control overflow-hidden shrink-0`}>
          <SafeImage
            alt={title}
            className="w-full h-full object-cover"
            src={imgSrc}
          />
        </div>
        <div className="min-w-0 flex-1">
          {isFirst && (
            <div className="mb-2 inline-block radius-control bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
              推荐
            </div>
          )}
          <h3 className={titleClassName}>{title}</h3>
          <div className="mb-2 flex flex-wrap items-center gap-2">
            <span className="radius-control bg-purple-500/20 px-2 py-0.5 text-xs text-purple-400">
              {type}
            </span>
            <span className="radius-control bg-gray-700/50 px-2 py-0.5 text-xs text-gray-300">
              {duration}
            </span>
          </div>
          <p className="line-clamp-2 text-xs leading-6 text-gray-400">{description}</p>
        </div>
      </div>
      <div className={`${compact ? 'mt-4' : 'mt-0'} flex items-center gap-2`}>
        <button
          type="button"
          className="flex min-w-0 flex-1 items-center justify-center gap-2 radius-control bg-gradient-to-r from-purple-600 to-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition-transform active:scale-95"
        >
          <span className="material-symbols-outlined shrink-0 text-base">play_circle</span>
          <span className="truncate">{buttonLabel}</span>
        </button>
        <button
          type="button"
          className="flex h-11 w-11 shrink-0 items-center justify-center radius-control bg-white/10 transition-transform active:scale-95"
          aria-label="收藏"
        >
          <span className="material-symbols-outlined text-white">bookmark_border</span>
        </button>
      </div>
    </div>
  );
}
