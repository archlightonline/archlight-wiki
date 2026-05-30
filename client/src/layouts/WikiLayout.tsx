import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { SearchBar } from '../components/SearchBar';
import { NavItem } from '../components/NavItem';
import { BrandLogo } from '../components/BrandLogo';
import { WorldsSelector } from '../components/WorldsSelector';
import { SIDEBAR_GROUPS, navRoute } from '../lib/nav';

export function WikiLayout() {
  const { user, isAdmin } = useAuth();
  const [mobOpen, setMobOpen] = useState(false);

  return (
    <div className="app">
      <header className="topbar">
        <button className="mob-menu-btn" onClick={() => setMobOpen((o) => !o)} aria-label="Toggle menu">
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
          <a className="top-social-link discord" href="https://discord.com" target="_blank" rel="noopener noreferrer">
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

        <Link className="top-contribute" to="/browse">
          <span aria-hidden="true">✦</span>
          <span>Contribute</span>
        </Link>

        <SearchBar />
        <WorldsSelector />

        <div className="tb-right">
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
            <Link className="tbtn" to="/login">
              🔐 Login
            </Link>
          )}
          <Link className="tbtn" to="/category/Updates">
            🧾 Updates
          </Link>
          <Link className="tbtn play" to="/browse">
            ▶ Play
          </Link>
        </div>
      </header>

      <aside className={`sidebar${mobOpen ? ' open' : ''}`} onClick={() => setMobOpen(false)}>
        {SIDEBAR_GROUPS.filter((g) => !g.adminOnly || isAdmin).map((group) => (
          <div key={group.label}>
            <div className="group-label">{group.label}</div>
            {group.items.map((item) => (
              <NavItem key={item.id} to={navRoute(item.id)} icon={item.icon} label={item.title} />
            ))}
          </div>
        ))}
      </aside>

      <main className="main">
        <Outlet />
      </main>
    </div>
  );
}
