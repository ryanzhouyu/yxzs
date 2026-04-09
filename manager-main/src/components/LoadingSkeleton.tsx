import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type LoadingSkeletonProps = {
  lines?: number;
  card?: boolean;
  className?: string;
};

export default function LoadingSkeleton({ lines = 4, card = true, className }: LoadingSkeletonProps) {
  return (
    <div className={twMerge(clsx(card && 'glass-card radius-card p-5', className))}>
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className="h-4 rounded-full bg-white/10"
            style={{ width: `${100 - index * 8}%` }}
          />
        ))}
      </div>
    </div>
  );
}
