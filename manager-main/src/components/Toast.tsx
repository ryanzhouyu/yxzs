type ToastProps = {
  message: string;
};

export default function Toast({ message }: ToastProps) {
  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] glass-card px-5 py-2.5 radius-control text-sm text-white/90 shadow-lg animate-pulse">
      {message}
    </div>
  );
}
