import { useState } from 'react';

type SafeImageProps = React.ImgHTMLAttributes<HTMLImageElement>;

// Lightweight inline SVG placeholder shown when an image fails to load
const FALLBACK_SRC =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25' height='100%25' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' fill='%23ffffff10'/%3E%3Ctext x='50' y='54' font-size='28' text-anchor='middle' fill='%23ffffff30' font-family='sans-serif'%3E%3F%3C/text%3E%3C/svg%3E";

export default function SafeImage({ src, onError, ...props }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setFailed(true);
    onError?.(e);
  };

  return (
    <img
      {...props}
      src={failed ? FALLBACK_SRC : src}
      onError={handleError}
      referrerPolicy="no-referrer"
    />
  );
}
