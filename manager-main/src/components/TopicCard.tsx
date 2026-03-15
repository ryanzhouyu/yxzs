import type { TopicCardData } from '../data/topicCards';

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
    : 'glass-card radius-panel p-4 text-white min-w-[280px] max-w-[280px] flex-shrink-0';
  const imageClassName = compact ? 'w-24 h-24' : 'w-20 h-20';
  const layoutClassName = compact ? 'flex gap-4' : 'flex gap-3 mb-3';
  const titleClassName = compact ? 'title-3 mb-2' : 'title-3 mb-1 text-sm';
  const buttonLabel = '生成内容';

  return (
    <div className={`${cardClassName} ${isFirst ? 'ring-2 ring-green-500/50' : ''}`}>
      <div className={layoutClassName}>
        <div className={`${imageClassName} radius-control overflow-hidden shrink-0`}>
          <img
            alt={title}
            className="w-full h-full object-cover"
            src={imgSrc}
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="flex-1">
          {isFirst && (
            <div className="inline-block mb-2 bg-green-500/20 text-green-400 text-xs px-2 py-0.5 radius-control">
              推荐
            </div>
          )}
          <h3 className={titleClassName}>{title}</h3>
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
      <div className={`${compact ? 'mt-4' : 'mt-0'} flex gap-2`}>
        <button
          type="button"
          className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-2 radius-control font-semibold text-sm active:scale-95 transition-transform flex items-center justify-center gap-1"
        >
          <span className="material-symbols-outlined text-base">play_circle</span>
          {buttonLabel}
        </button>
        <button
          type="button"
          className="w-10 h-10 flex items-center justify-center radius-control bg-white/10 active:scale-95 transition-transform"
          aria-label="收藏"
        >
          <span className="material-symbols-outlined text-white">bookmark_border</span>
        </button>
      </div>
    </div>
  );
}
