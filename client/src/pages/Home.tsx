import { useState, type CSSProperties } from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { PageLink } from '../components/ui';
import { BrandLogo } from '../components/BrandLogo';
import { iconFor } from '../components/NavItem';

const WORDMARK = 'ARCHLIGHT'.split('');

function Hero() {
  const stats = trpc.pages.siteStats.useQuery();
  const fmt = (n?: number) => (typeof n === 'number' ? n.toLocaleString() : '—');

  return (
    <section className="hero">
      <div className="hero-body">
        <div className="hero-logo">
          <div className="hero-logo-aura" aria-hidden="true" />
          <div className="hero-logo-glow" aria-hidden="true" />
          <div className="hero-logo-ring" aria-hidden="true" />
          <BrandLogo size={108} />
        </div>

        <div className="hw-eyebrow">◆&nbsp;&nbsp;&nbsp;Official Community Knowledge Hub&nbsp;&nbsp;&nbsp;◆</div>
        <div className="hw-title" aria-label="ARCHLIGHT">
          {WORDMARK.map((ch, i) => (
            <span key={i} className="hw-letter" style={{ '--i': i } as CSSProperties}>
              {ch}
            </span>
          ))}
        </div>
        <div className="hw-sub">Community Wiki</div>
        <div className="hw-divider">
          <span className="hw-divider-gem" aria-hidden="true">◆</span>
        </div>

        <p className="hero-tag">
          Eleven years of Archlight — classes, dungeons, gear systems, and player discoveries,{' '}
          <em>all in one place.</em>
        </p>

        <div className="hero-stats">
          <article className="hhs-card">
            <strong className="hhs-value">{fmt(stats.data?.pages)}</strong>
            <span className="hhs-label">Wiki Pages</span>
          </article>
          <article className="hhs-card">
            <strong className="hhs-value">{fmt(stats.data?.updates)}</strong>
            <span className="hhs-label">Patch Notes</span>
          </article>
          <article className="hhs-card">
            <strong className="hhs-value">{fmt(stats.data?.revisions)}</strong>
            <span className="hhs-label">Revisions</span>
          </article>
          <article className="hhs-anniv" aria-label="11 Years of Archlight">
            <span className="hhs-anniv-num">11</span>
            <span className="hhs-anniv-copy">
              <span className="hhs-anniv-kicker">Anniversary</span>
              <span className="hhs-anniv-main">Years of Archlight</span>
              <span className="hhs-anniv-since">Since 2015</span>
            </span>
          </article>
        </div>
      </div>
    </section>
  );
}

function Announcement() {
  const [open, setOpen] = useState(true);
  if (!open) return null;
  return (
    <div className="home-announce" role="status">
      <span className="ha-icon" aria-hidden="true">📣</span>
      <div style={{ flex: 1 }}>
        <div className="ha-eyebrow">Season Notice</div>
        <div className="ha-title">Abaldar launch information is live</div>
        <div className="ha-body">
          Launch notes, maintenance windows, and important wiki updates land here. Check the patch-note archive for the
          full changelog history.
        </div>
        <div className="ha-by">Posted by Archlight Team</div>
      </div>
      <Link className="btn sm primary" to="/category/Updates">
        Read Updates
      </Link>
      <button className="btn sm ghost" aria-label="Dismiss" onClick={() => setOpen(false)}>
        ✕
      </button>
    </div>
  );
}

export function Home() {
  const categories = trpc.pages.categories.useQuery();
  const recentUpdates = trpc.pages.recent.useQuery({ category: 'Updates', limit: 6 });
  const recentEdited = trpc.pages.recent.useQuery({ limit: 6 });

  return (
    <div>
      <Hero />

      <div className="container" style={{ paddingTop: 8 }}>
        <Announcement />

        <div className="sec-head">
          <div className="sec-ey">◆ Wiki Library ◆</div>
          <h2 className="sec-h">Find the right guide faster</h2>
          <p className="sec-s">A cleaner hub for progression, character power, gear, farming, and the reference pages players use most.</p>
        </div>

        <div className="lib-grid">
          {categories.data?.map((c) => (
            <Link key={c.category} to={`/category/${encodeURIComponent(c.category)}`} className="lib-group" style={{ textDecoration: 'none' }}>
              <div className="lib-group-title">
                <span aria-hidden="true">{iconFor(c.category)}</span>
                <b>{c.category}</b>
                <span className="ct">{c.count} page{c.count === 1 ? '' : 's'}</span>
              </div>
              <span className="lib-link">Browse {c.category} →</span>
            </Link>
          ))}
        </div>

        <div className="split" style={{ marginTop: 40 }}>
          <section>
            <h2 style={{ fontFamily: 'var(--font-label)', color: 'var(--g2)' }}>📰 Recent Updates</h2>
            {recentUpdates.data?.map((p) => <PageLink key={p.id} p={p} />)}
          </section>
          <section>
            <h2 style={{ fontFamily: 'var(--font-label)', color: 'var(--g2)' }}>🕑 Recently Edited</h2>
            {recentEdited.data?.map((p) => <PageLink key={p.id} p={p} />)}
          </section>
        </div>
      </div>
    </div>
  );
}
