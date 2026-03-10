import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  if (path === '/details' || path === '/hotspots' || path === '/topics') return null;

  return (
    <nav className="absolute bottom-6 left-6 right-6 z-50">
      <div className="glass-card rounded-[2.5rem] p-2 flex justify-between items-center bg-white/5 backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-white/10">
        <NavItem to="/" icon="home" label="首页" active={path === '/'} />
        <NavItem to="/marketing" icon="bar_chart" label="营销助手" active={path === '/marketing'} />
        <NavItem to="/apps" icon="grid_view" label="创意应用" active={path === '/apps'} />
        <NavItem to="/creations" icon="person" label="我的创意" active={path === '/creations'} />
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label, active }: { to: string, icon: string, label: string, active: boolean }) {
  return (
    <Link to={to} className={twMerge(clsx(
      "flex flex-col items-center justify-center w-16 h-14 transition-transform active:scale-95",
      active ? "bg-white text-black rounded-full shadow-lg w-20" : "text-white/60 hover:text-white"
    ))}>
      <span className={twMerge(clsx("material-symbols-outlined text-xl", active && "fill-current"))}>{icon}</span>
      <span className={twMerge(clsx("mt-0.5", active ? "text-[10px] font-bold" : "text-[10px]"))}>{label}</span>
    </Link>
  );
}
