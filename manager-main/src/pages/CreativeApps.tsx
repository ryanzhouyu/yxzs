import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PageHeader from '../components/PageHeader';

type AppCardProps = {
  title: string;
  desc: string;
  icon: string;
  colorFrom: string;
  colorTo: string;
  glowFrom: string;
  glowTo: string;
  onClick?: () => void;
};

type RecentAppProps = {
  icon: string;
  label: string;
};

export default function CreativeApps() {
  const navigate = useNavigate();
  const [toast, setToast] = useState('');

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(''), 2000);
  };

  return (
    <div className="app-page relative">
      <PageHeader title="创意应用" />

      {toast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-[100] glass-card px-5 py-2.5 radius-control text-sm text-white/90 shadow-lg animate-pulse">
          {toast}
        </div>
      )}

      <main className="h-full w-full overflow-y-auto hide-scrollbar px-6 pb-32 pt-20">
        <div className="grid grid-cols-2 gap-4 mt-4">
          <AppCard
            title="AI 产品图生成"
            desc="一键生成高质量商业产品图"
            icon="camera"
            colorFrom="#ff3366"
            colorTo="#ec4899"
            glowFrom="#ec4899"
            glowTo="#8b5cf6"
            onClick={() => showToast('AI 产品图生成功能即将上线')}
          />
          <AppCard
            title="素材优化"
            desc="智能提升画质，修复瑕疵"
            icon="auto_fix_high"
            colorFrom="#00f2ff"
            colorTo="#3b82f6"
            glowFrom="#0ea5e9"
            glowTo="#3b82f6"
            onClick={() => showToast('素材优化功能即将上线')}
          />
          <AppCard
            title="智能选题"
            desc="深度分析热点，提供创作方向"
            icon="lightbulb"
            colorFrom="#7000ff"
            colorTo="#d946ef"
            glowFrom="#8b5cf6"
            glowTo="#d946ef"
            onClick={() => navigate('/details/office-worker')}
          />
          <AppCard
            title="AI 文案优化"
            desc="一键润色、扩写、改写文案"
            icon="edit"
            colorFrom="#2dd4bf"
            colorTo="#10b981"
            glowFrom="#2dd4bf"
            glowTo="#10b981"
            onClick={() => showToast('AI 文案优化功能即将上线')}
          />
        </div>

        <div className="mt-8">
          <h3 className="title-3 text-white/80 mb-4 px-1">最近使用</h3>
          <div className="flex gap-4 overflow-x-auto hide-scrollbar px-1 pb-2">
            <RecentApp icon="camera" label="产品图" />
            <RecentApp icon="edit" label="文案优化" />
            <RecentApp icon="auto_fix_high" label="画质提升" />
          </div>
        </div>
      </main>
    </div>
  );
}

function AppCard({ title, desc, icon, colorFrom, colorTo, glowFrom, glowTo, onClick }: AppCardProps) {
  return (
    <div
      className="bg-glass radius-card p-5 border border-white/10 shadow-xl relative overflow-hidden group cursor-pointer active:scale-95 transition-transform"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => { if ((e.key === 'Enter' || e.key === ' ') && onClick) onClick(); }}
    >
      <div
        className="absolute -right-6 -top-6 w-24 h-24 rounded-full blur-2xl opacity-40"
        style={{ background: `linear-gradient(to bottom right, ${glowFrom}, ${glowTo})` }}
      ></div>
      <div
        className="w-12 h-12 mb-4 radius-control p-[1.5px] relative z-10"
        style={{ background: `linear-gradient(to bottom right, ${colorFrom}, ${colorTo})` }}
      >
        <div className="w-full h-full bg-black/60 backdrop-blur-md radius-control flex items-center justify-center">
          <span className="material-symbols-outlined text-2xl text-white">{icon}</span>
        </div>
      </div>
      <div className="relative z-10">
        <h2 className="title-2 mb-1">{title}</h2>
        <p className="text-[11px] text-white/60 leading-tight">{desc}</p>
      </div>
    </div>
  );
}

function RecentApp({ icon, label }: RecentAppProps) {
  return (
    <div className="flex flex-col items-center gap-2 min-w-[64px]">
      <div className="w-14 h-14 rounded-full bg-glass border border-white/10 flex items-center justify-center">
        <span className="material-symbols-outlined text-white/80">{icon}</span>
      </div>
      <span className="text-[10px] text-white/60">{label}</span>
    </div>
  );
}
