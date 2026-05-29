import { Link } from 'react-router-dom';
import { iconFor } from './NavItem';
import { fmtDate } from '../lib/format';

export function Stat({ n, l }: { n?: number; l: string }) {
  return (
    <div className="card center">
      <div className="stat">
        <div className="n">{n ?? '—'}</div>
        <div className="l">{l}</div>
      </div>
    </div>
  );
}

export function Loading({ label = 'Loading…' }: { label?: string }) {
  return (
    <div className="empty-state">
      <div className="muted">{label}</div>
    </div>
  );
}

export function ErrorBox({ error }: { error: unknown }) {
  const m = error instanceof Error ? error.message : String(error);
  return (
    <div className="card" style={{ borderColor: 'rgba(200,64,64,.4)' }}>
      <div className="form-error" style={{ margin: 0 }}>
        {m}
      </div>
    </div>
  );
}

export interface PageRef {
  slug: string;
  title: string;
  category?: string | null;
  subcategory?: string | null;
  updatedAt?: string | Date;
}

export function PageLink({ p }: { p: PageRef }) {
  return (
    <Link
      to={`/wiki/${p.slug}`}
      className="card hover"
      style={{ display: 'block', marginBottom: 10, textDecoration: 'none', padding: '12px 16px' }}
    >
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span aria-hidden="true">{iconFor(p.category || '')}</span>
        <strong style={{ color: 'var(--tx0)' }}>{p.title}</strong>
        <span className="spacer" />
        {p.updatedAt && <span className="muted" style={{ fontSize: 11.5 }}>{fmtDate(p.updatedAt)}</span>}
        {p.category && <span className="badge">{p.category}</span>}
      </div>
    </Link>
  );
}
