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

  if (path === '/details' || path === '/topics') return null;

  return (
    <nav className="absolute bottom-4 left-6 right-6 z-50">
      <div className="glass-tabbar radius-card px-2 py-1.5 flex justify-between items-center">
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
          'flex flex-col items-center justify-center w-[70px] h-[44px] transition-transform active:scale-95',
          active
            ? 'tab-active-pill text-[#ff2d55] radius-card'
            : 'text-white/70 hover:text-white'
        )
      )}
    >
      <span className={twMerge(clsx('material-symbols-outlined text-[22px]', active && 'fill-current'))}>{icon}</span>
      <span className={twMerge(clsx('mt-0.5', active ? 'text-[10px] font-semibold' : 'text-[10px]'))}>{label}</span>
    </Link>
  );
}


