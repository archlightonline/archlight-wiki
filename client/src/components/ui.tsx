import { Link } from 'react-router-dom';
import type { ReactNode } from 'react';
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

export function Loading({ label = 'Loading...' }: { label?: string }) {
  return (
    <div className="loading-state" role="status" aria-live="polite" aria-busy="true">
      <span className="loading-spinner" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export function EmptyState({
  icon = '?',
  title,
  body,
  children,
}: {
  icon?: string;
  title: string;
  body?: string;
  children?: ReactNode;
}) {
  return (
    <div className="empty-state">
      <div className="big" aria-hidden="true">
        {icon}
      </div>
      <h2>{title}</h2>
      {body && <p className="muted">{body}</p>}
      {children && <div className="toolbar empty-actions">{children}</div>}
    </div>
  );
}

export function PageListSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="skeleton-list" role="status" aria-label="Loading pages" aria-busy="true">
      {Array.from({ length: count }).map((_, index) => (
        <div className="skeleton-card" key={index}>
          <span className="skeleton-dot" />
          <span className="skeleton-line wide" />
          <span className="skeleton-line short" />
        </div>
      ))}
    </div>
  );
}

export function PageDetailSkeleton() {
  return (
    <div className="container" role="status" aria-label="Loading page" aria-busy="true">
      <div className="skeleton-line crumb" />
      <div className="skeleton-line title" />
      <div className="skeleton-meta">
        <span className="skeleton-line short" />
        <span className="skeleton-line short" />
        <span className="skeleton-line short" />
      </div>
      <div className="skeleton-article">
        <span className="skeleton-line" />
        <span className="skeleton-line" />
        <span className="skeleton-line medium" />
        <span className="skeleton-line" />
        <span className="skeleton-line wide" />
      </div>
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
      className="card hover page-link"
    >
      <div className="page-link-main">
        <span aria-hidden="true">{iconFor(p.category || '')}</span>
        <strong>{p.title}</strong>
      </div>
      <div className="page-link-meta">
        {p.updatedAt && <span className="muted" style={{ fontSize: 11.5 }}>{fmtDate(p.updatedAt)}</span>}
        {p.category && <span className="badge">{p.category}</span>}
      </div>
    </Link>
  );
}
