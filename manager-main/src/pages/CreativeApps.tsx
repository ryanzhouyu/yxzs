import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorState from '../components/ErrorState';
import LoadingSkeleton from '../components/LoadingSkeleton';
import PageHeader from '../components/PageHeader';
import Toast from '../components/Toast';
import { useApi } from '../hooks/useApi';
import { getApps, getRecentApps } from '../lib/api/apps';

export default function CreativeApps() {
  const navigate = useNavigate();
  const [toast, setToast] = useState('');
  const appsQuery = useApi(() => getApps().then((response) => response.data), []);
  const recentQuery = useApi(() => getRecentApps().then((response) => response.data), []);

  useEffect(() => {
    if (!toast) {
      return;
    }
    const id = window.setTimeout(() => setToast(''), 2000);
    return () => window.clearTimeout(id);
  }, [toast]);

  return (
    <div className="app-page relative">
      <PageHeader title="创意应用" />
      {toast ? <Toast message={toast} /> : null}

      <main className="h-full w-full overflow-y-auto hide-scrollbar px-6 pb-32 pt-20">
        {appsQuery.loading ? (
          <LoadingSkeleton lines={10} />
        ) : appsQuery.error ? (
          <ErrorState message={appsQuery.error} onRetry={appsQuery.refetch} />
        ) : (
          <div className="grid grid-cols-2 gap-4 mt-4">
            {appsQuery.data?.map((app) => (
              <button
                key={app.id}
                type="button"
                className="bg-glass radius-card p-5 border border-white/10 shadow-xl text-left"
                onClick={() => {
                  if (app.id === 'smart-topic') {
                    navigate('/details/office-worker');
                    return;
                  }
                  setToast(`${app.title} 功能已接入 API 层，页面能力待继续扩展`);
                }}
              >
                <div className="w-12 h-12 mb-4 radius-control bg-white/10 flex items-center justify-center">
                  <span className="material-symbols-outlined text-2xl text-white">{app.icon}</span>
                </div>
                <h2 className="title-2 mb-1">{app.title}</h2>
                <p className="text-[11px] text-white/60 leading-tight">{app.description}</p>
              </button>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h3 className="title-3 text-white/80 mb-4 px-1">最近使用</h3>
          {recentQuery.loading ? (
            <LoadingSkeleton lines={3} card={false} />
          ) : recentQuery.error ? (
            <ErrorState message={recentQuery.error} onRetry={recentQuery.refetch} />
          ) : (
            <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 pb-2">
              {recentQuery.data?.map((item) => (
                <div key={item.id} className="flex flex-col items-center gap-2 min-w-[72px]">
                  <div className="w-14 h-14 rounded-full bg-glass border border-white/10 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white/80">history</span>
                  </div>
                  <span className="text-[10px] text-white/60 text-center">{item.title}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
