import { Link, useLocation } from 'react-router-dom';

export function NavItem({
  to,
  icon,
  label,
  count,
  match,
}: {
  to: string;
  icon: string;
  label: string;
  count?: number;
  match?: (path: string) => boolean;
}) {
  const { pathname, search } = useLocation();
  const here = pathname + search;
  const active = match ? match(here) : here === to;
  return (
    <Link to={to} className={`nav-item${active ? ' active' : ''}`}>
      <span aria-hidden="true">{icon}</span>
      <span>{label}</span>
      {typeof count === 'number' && <span className="ct">{count}</span>}
    </Link>
  );
}

export const CATEGORY_ICONS: Record<string, string> = {
  Activities: '🛠️',
  Updates: '📰',
  Questline: '📜',
  'Mission Unlock': '🚪',
  'Daily Checks': '☀️',
  'Weapon Task': '⚔️',
  'Unlock Chain': '🔗',
  Checklist: '✅',
};

export function iconFor(category: string): string {
  return CATEGORY_ICONS[category] ?? '📄';
}
