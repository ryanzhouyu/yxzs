import { getGreeting, getDateLabel, USER_ROLE } from '../utils/greeting';

type HeaderAction = {
  icon: string;
  ariaLabel: string;
  onClick?: () => void;
};

type PageHeaderProps = {
  title: string;
  centered?: boolean;
  pointerEventsNone?: boolean;
  leftAction?: HeaderAction;
  rightAction?: HeaderAction;
  /** 隐藏副标题（日期+问候语） */
  hideSubtitle?: boolean;
  /** 隐藏右侧按钮 */
  hideRight?: boolean;
};

function HeaderIconButton({ icon, ariaLabel, onClick }: HeaderAction) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center"
      aria-label={ariaLabel}
    >
      <span className="material-symbols-outlined text-white text-xl">{icon}</span>
    </button>
  );
}

export default function PageHeader({
  title,
  centered = false,
  pointerEventsNone = false,
  leftAction,
  rightAction,
  hideSubtitle = false,
  hideRight = false,
}: PageHeaderProps) {
  const dateLabel = getDateLabel({ year: undefined });
  const greeting = getGreeting();

  const headerClassName = pointerEventsNone
    ? 'absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-linear-to-b from-black/60 to-transparent pointer-events-none'
    : 'absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-linear-to-b from-black/60 to-transparent';
  const innerClassName = pointerEventsNone
    ? 'flex justify-between items-start pointer-events-auto'
    : 'flex justify-between items-start';

  return (
    <header className={headerClassName}>
      <div className={innerClassName}>
        {leftAction ? <HeaderIconButton {...leftAction} /> : centered ? <div className="w-10" /> : <div />}
        <div className={centered ? 'text-center flex-1' : ''}>
          <h1 className="title-1 text-glow">{title}</h1>
          {!hideSubtitle && (
            <div className={`flex items-center gap-2 mt-1 ${centered ? 'justify-center' : ''}`}>
              <span className="text-xs font-medium text-white/70">{dateLabel}</span>
              <span className="w-1 h-1 rounded-full bg-white/40"></span>
              <span className="text-xs font-medium text-white/90">{greeting}，{USER_ROLE}</span>
            </div>
          )}
        </div>
        {hideRight ? (
          centered ? <div className="w-10" /> : <div />
        ) : rightAction ? (
          <HeaderIconButton {...rightAction} />
        ) : (
          <HeaderIconButton icon="notifications" ariaLabel="通知" onClick={() => alert('暂无新通知')} />
        )}
      </div>
    </header>
  );
}
