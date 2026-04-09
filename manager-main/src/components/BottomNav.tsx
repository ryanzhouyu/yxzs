import { Link, useLocation } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

type NavItemProps = {
  to: string;
  icon: string;
  label: string;
  active: boolean;
};

export default function BottomNav() {
  const location = useLocation();
  const path = location.pathname;

  if (
    path.startsWith('/details') ||
    path.startsWith('/topics') ||
    path === '/login' ||
    path === '/register'
  ) return null;

  return (
    <nav className="absolute bottom-4 left-6 right-6 z-50 animate-slide-in-right">
      <div className="glass-tabbar radius-card px-2 py-1.5 flex justify-between items-center shadow-lg">
        <NavItem to="/" icon="home" label="首页" active={path === '/'} />
        <NavItem to="/hotspots" icon="local_fire_department" label="热点" active={path === '/hotspots'} />
        <NavItem to="/marketing" icon="bar_chart" label="营销" active={path === '/marketing'} />
        <NavItem to="/apps" icon="grid_view" label="应用" active={path === '/apps'} />
        <NavItem to="/creations" icon="person" label="我的" active={path === '/creations'} />
      </div>
    </nav>
  );
}

function NavItem({ to, icon, label, active }: NavItemProps) {
  return (
    <Link
      to={to}
      aria-current={active ? 'page' : undefined}
      className={twMerge(
        clsx(
          'flex flex-col items-center justify-center w-[70px] h-[44px] transition-all duration-300 ease-in-out group',
          active
            ? 'tab-active-pill text-primary radius-card scale-105'
            : 'text-white/70 hover:text-white hover:scale-105'
        )
      )}
    >
      <span className={twMerge(clsx('material-symbols-outlined text-[22px] transition-all duration-300', active && 'fill-current scale-110'))}>{icon}</span>
      <span className={twMerge(clsx('mt-0.5 transition-all duration-300', active ? 'text-[10px] font-semibold text-primary' : 'text-[10px]'))}>{label}</span>
      {active && (
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-primary rounded-full animate-pulse"></div>
      )}
    </Link>
  );
}


