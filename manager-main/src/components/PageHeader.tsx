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
};

function HeaderIconButton({ icon, ariaLabel, onClick }: HeaderAction) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center"
      aria-label={ariaLabel}
    >
      <span className="material-symbols-outlined text-white">{icon}</span>
    </button>
  );
}

export default function PageHeader({
  title,
  centered = false,
  pointerEventsNone = false,
  leftAction,
  rightAction,
}: PageHeaderProps) {
  const now = new Date();
  const subtitle = `${now.toLocaleDateString('zh-CN', {
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  })} · ${now.getHours() < 12 ? '早上好' : now.getHours() < 18 ? '下午好' : '晚上好'}，创作者`;
  const headerClassName = pointerEventsNone
    ? 'absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent pointer-events-none'
    : 'absolute top-0 left-0 w-full pt-4 pb-8 px-6 z-50 bg-gradient-to-b from-black/60 to-transparent';
  const innerClassName = pointerEventsNone
    ? 'flex justify-between items-start pointer-events-auto'
    : 'flex justify-between items-start';

  return (
    <header className={headerClassName}>
      <div className={innerClassName}>
        {leftAction ? <HeaderIconButton {...leftAction} /> : <div />}
        <div className={centered ? 'text-center' : ''}>
          <h1 className="title-1 text-glow">{title}</h1>
          <div className={`flex items-center gap-2 mt-1 ${centered ? 'justify-center' : ''}`}>
            <span className="text-xs font-medium text-white/70">{subtitle}</span>
          </div>
        </div>
        {rightAction ? (
          <HeaderIconButton {...rightAction} />
        ) : (
          <button
            type="button"
            className="w-10 h-10 rounded-full glass-card icon-button flex items-center justify-center"
            aria-label="通知"
          >
            <span className="material-symbols-outlined text-xl">notifications</span>
          </button>
        )}
      </div>
    </header>
  );
}
