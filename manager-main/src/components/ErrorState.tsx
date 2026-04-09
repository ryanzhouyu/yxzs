import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type ErrorStateProps = {
  title?: string;
  message: string;
  onRetry?: () => void;
  className?: string;
};

export default function ErrorState({
  title = '加载失败',
  message,
  onRetry,
  className,
}: ErrorStateProps) {
  return (
    <div className={twMerge(clsx('glass-card radius-card p-6 text-center text-slate-100', className))}>
      <span className="material-symbols-outlined text-4xl text-red-400">error</span>
      <h2 className="title-2 mt-3">{title}</h2>
      <p className="text-sm text-slate-400 mt-2">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-5 px-5 py-2 bg-primary-orange text-white rounded-full font-semibold"
        >
          重试
        </button>
      )}
    </div>
  );
}
