import { useEffect, useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { SearchBar } from '../components/SearchBar';
import { NavItem } from '../components/NavItem';
import { BrandLogo } from '../components/BrandLogo';
import { WorldsSelector } from '../components/WorldsSelector';
import { SIDEBAR_GROUPS, navRoute } from '../lib/nav';
import { useAuthModal } from '../wiki-components/AuthModal';

export function WikiLayout() {
  const { user, isAdmin } = useAuth();
  const { open: openAuth } = useAuthModal();
  const [mobOpen, setMobOpen] = useState(false);
  const location = useLocation();

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

  return (
    <div className="app">
      <header className="topbar">
        <button
          className="mob-menu-btn"
          onClick={() => setMobOpen((o) => !o)}
          aria-label="Toggle navigation menu"
          aria-controls="wiki-sidebar"
          aria-expanded={mobOpen}
        >
          ☰
        </button>

        <Link to="/" className="logo-zone" style={{ textDecoration: 'none' }}>
          <BrandLogo size={40} />
          <div>
            <div className="logo-name">Archlight</div>
            <div className="logo-sub">Online Wiki</div>
          </div>
        </Link>

        <div className="top-social">
          <a
            className="top-social-link discord-btn"
            href="https://discord.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open Archlight Discord"
          >
            <span className="top-social-icon" aria-hidden="true">💬</span>
            <span className="top-social-copy">
              <b>Discord</b>
              <small>Community Hub</small>
            </span>
          </a>
          <a className="top-social-link mini" href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
            <span className="top-social-icon" aria-hidden="true">▶</span>
          </a>
          <a className="top-social-link mini" href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <span className="top-social-icon" aria-hidden="true">f</span>
          </a>
        </div>

        {user ? (
          <Link className="top-contribute" to="/browse">
            <span aria-hidden="true">✦</span>
            <span>Contribute</span>
          </Link>
        ) : (
          <button type="button" className="top-contribute" onClick={() => openAuth('login')}>
            <span aria-hidden="true">✦</span>
            <span>Contribute</span>
          </button>
        )}

        <SearchBar />
        <WorldsSelector />

        <div className="tb-right">
          <Link className="tbtn play-btn top-play" to="/browse" aria-label="Play Archlight">
            ▶ Play
          </Link>
          {user ? (
            <Link className="user-chip" to="/profile">
              <span
                className="uc-avi"
                style={user.avatarUrl ? { backgroundImage: `url(${user.avatarUrl})` } : undefined}
              >
                {user.avatarUrl ? '' : '👤'}
              </span>
              <span className="uc-copy" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1.15 }}>
                <span className="uc-name">{user.displayName || user.username}</span>
                <span className="uc-role">{user.role}</span>
              </span>
            </Link>
          ) : (
            <button type="button" className="tbtn top-login" onClick={() => openAuth('login')}>
              🔐 Login
            </button>
          )}
          <Link className="tbtn top-updates" to="/category/Updates">
            🧾 Updates
          </Link>
        </div>
      </header>

      <aside id="wiki-sidebar" className={`sidebar${mobOpen ? ' open' : ''}`} onClick={() => setMobOpen(false)}>
        {SIDEBAR_GROUPS.filter((g) => !g.adminOnly || isAdmin).map((group) => (
          <div key={group.label}>
            <div className="group-label">{group.label}</div>
            {group.items.map((item) => (
              <NavItem key={item.id} to={navRoute(item.id)} icon={item.icon} label={item.title} />
            ))}
          </div>
        ))}
      </aside>
      <button
        className={`sidebar-backdrop${mobOpen ? ' open' : ''}`}
        type="button"
        aria-label="Close navigation menu"
        onClick={() => setMobOpen(false)}
      />

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
