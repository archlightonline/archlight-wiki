import { Link, Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { SearchBar } from '../components/SearchBar';
import { NavItem } from '../components/NavItem';

/**
 * Authenticated shell for admin/editor tools (page editor, admin panel).
 * Enforces the role gate on the client too (the server enforces it for real).
 */
export function DashboardLayout({ require = 'editor' }: { require?: 'editor' | 'admin' }) {
  const { isLoading, isAuthed, isAdmin, isEditor, user } = useAuth();
  const location = useLocation();

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
      <div className="brand">
        <Link to="/" style={{ textDecoration: 'none' }}>
          <div className="mark">⚜ Archlight</div>
          <div className="sub">Dashboard</div>
        </Link>
      </div>

      <header className="topbar">
        <SearchBar />
        <div className="spacer" />
        <span className={`badge role-${user?.role}`}>{user?.role}</span>
        <Link className="btn sm ghost" to="/">
          View wiki
        </Link>
      </header>

      <aside className="sidebar">
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

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
