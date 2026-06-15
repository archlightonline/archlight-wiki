import { useEffect, useState } from 'react';
import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { trpc } from '../lib/trpc';
import { SearchBar } from '../components/SearchBar';
import { NavItem } from '../components/NavItem';
import { BrandLogo } from '../components/BrandLogo';

/**
 * Authenticated shell for admin/editor tools (page editor, admin panel).
 * Enforces the role gate on the client too (the server enforces it for real).
 */
export function DashboardLayout({ require = 'editor' }: { require?: 'editor' | 'admin' }) {
  const { isLoading, isAuthed, isAdmin, isEditor, user } = useAuth();
  const location = useLocation();
  const [mobOpen, setMobOpen] = useState(false);
  const utils = trpc.useUtils();
  const logout = trpc.auth.logout.useMutation({ onSuccess: () => utils.auth.me.invalidate() });

  useEffect(() => {
    setMobOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    if (!mobOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [mobOpen]);

  if (isLoading) {
    return (
      <div className="auth-wrap">
        <div className="muted">Loading…</div>
      </div>
    );
  }
  if (!isAuthed) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  const allowed = require === 'admin' ? isAdmin : isEditor;
  if (!allowed) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <div className="big">⛔</div>
          <h2>Insufficient permissions</h2>
          <p className="muted">This area requires the {require} role.</p>
          <Link className="btn" to="/">
            Back to the wiki
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="mob-menu-btn"
          onClick={() => setMobOpen((o) => !o)}
          aria-label="Toggle dashboard menu"
          aria-controls="dashboard-sidebar"
          aria-expanded={mobOpen}
        >
          ☰
        </button>
        <Link to="/" className="logo-zone" style={{ textDecoration: 'none' }}>
          <BrandLogo size={40} />
          <div>
            <div className="logo-name">Archlight</div>
            <div className="logo-sub">Dashboard</div>
          </div>
        </Link>
        <SearchBar />
        <div className="tb-right">
          <span className={`badge role-${user?.role}`}>{user?.role}</span>
          <Link className="tbtn" to="/">
            View wiki
          </Link>
          <button type="button" className="tbtn" onClick={() => logout.mutate()} disabled={logout.isPending} title="Log out">
            ⏻ Log out
          </button>
        </div>
      </header>

      <aside id="dashboard-sidebar" className={`sidebar${mobOpen ? ' open' : ''}`} onClick={() => setMobOpen(false)}>
        <div className="group-label">Editing</div>
        <NavItem to="/new" icon="📝" label="New page" />
        <NavItem to="/admin/contributions" icon="✦" label="Review queue" />
        {isAdmin && (
          <>
            <div className="group-label">Administration</div>
            <NavItem to="/admin/users" icon="👥" label="Users" />
            <NavItem to="/admin/pages" icon="🛡️" label="Page protection" />
          </>
        )}
      </aside>
      <button
        className={`sidebar-backdrop${mobOpen ? ' open' : ''}`}
        type="button"
        aria-label="Close dashboard menu"
        onClick={() => setMobOpen(false)}
      />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
