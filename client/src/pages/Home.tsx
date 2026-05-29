import { Link } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { Stat, PageLink } from '../components/ui';
import { SearchBar } from '../components/SearchBar';
import { iconFor } from '../components/NavItem';

export function Home() {
  const stats = trpc.pages.siteStats.useQuery();
  const recentUpdates = trpc.pages.recent.useQuery({ category: 'Updates', limit: 6 });
  const recentEdited = trpc.pages.recent.useQuery({ limit: 6 });
  const categories = trpc.pages.categories.useQuery();

  return (
    <div className="container">
      <div className="eyebrow">Archlight Codex</div>
      <h1 className="page-title">The Community Wiki</h1>
      <p className="lead">
        Guides, progression, professions and the full patch-note archive — now editable, versioned and searchable.
      </p>

      <div style={{ maxWidth: 560, margin: '20px 0 8px' }}>
        <SearchBar />
      </div>

      <div className="grid cols-3" style={{ margin: '24px 0' }}>
        <Stat n={stats.data?.pages} l="Pages" />
        <Stat n={stats.data?.updates} l="Patch notes" />
        <Stat n={stats.data?.revisions} l="Revisions" />
        <Stat n={stats.data?.contributors} l="Contributors" />
      </div>

      <div className="split">
        <section>
          <h2>📰 Recent updates</h2>
          {recentUpdates.data?.map((p) => <PageLink key={p.id} p={p} />)}
          {recentUpdates.data?.length === 0 && <p className="muted">No updates yet.</p>}
        </section>
        <section>
          <h2>🕑 Recently edited</h2>
          {recentEdited.data?.map((p) => <PageLink key={p.id} p={p} />)}
        </section>
      </div>

      <h2 style={{ marginTop: 36 }}>🗂️ Browse by category</h2>
      <div className="grid cols-3">
        {categories.data?.map((c) => (
          <Link
            key={c.category}
            to={`/category/${encodeURIComponent(c.category)}`}
            className="card hover"
            style={{ textDecoration: 'none' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ fontSize: 22 }} aria-hidden="true">
                {iconFor(c.category)}
              </span>
              <div>
                <div style={{ color: 'var(--tx0)', fontFamily: 'var(--font-label)' }}>{c.category}</div>
                <div className="muted" style={{ fontSize: 12 }}>
                  {c.count} page{c.count === 1 ? '' : 's'}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
