import { Link, Outlet } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { SearchBar } from '../components/SearchBar';
import { NavItem, iconFor } from '../components/NavItem';

export function WikiLayout() {
  const categories = trpc.pages.categories.useQuery();
  const { user, isEditor } = useAuth();

  return (
    <div className="app">
      <div className="brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="mark">⚜ Archlight</div>
          <div className="sub">Community Wiki</div>
        </Link>
      </div>

      <header className="topbar">
        <SearchBar />
        <div className="spacer" />
        {isEditor && (
          <Link className="btn sm" to="/new">
            + New page
          </Link>
        )}
        {isEditor && (
          <Link className="btn sm ghost" to="/admin">
            Admin
          </Link>
        )}
        {user ? (
          <Link className="btn sm ghost" to="/profile">
            {user.displayName || user.username}
          </Link>
        ) : (
          <Link className="btn sm primary" to="/login">
            Sign in
          </Link>
        )}
      </header>

      <aside className="sidebar">
        <NavItem to="/" icon="🏠" label="Home" />
        <NavItem to="/browse" icon="🗂️" label="All Categories" />
        <div className="group-label">Categories</div>
        {categories.data?.map((c) => (
          <NavItem
            key={c.category}
            to={`/category/${encodeURIComponent(c.category)}`}
            icon={iconFor(c.category)}
            label={c.category}
            count={c.count}
          />
        ))}
        {categories.isLoading && <div className="muted" style={{ padding: '8px 12px' }}>Loading…</div>}
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
