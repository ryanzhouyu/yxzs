import { useEffect, useState } from 'react';

export function useApi<T>(factory: (signal: AbortSignal) => Promise<T>, deps: unknown[] = []) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    let active = true;

    setLoading(true);
    setError(null);

    factory(controller.signal)
      .then((result) => {
        if (active) {
          setData(result);
        }
      })
      .catch((err: unknown) => {
        if (!active) {
          return;
        }
        if (err instanceof DOMException && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : '加载失败');
      })
      .finally(() => {
        if (active) {
          setLoading(false);
        }
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [...deps, reloadKey]);

  return {
    data,
    loading,
    error,
    refetch: () => setReloadKey((value) => value + 1),
  };
}
