import { Fragment } from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  to?: string;
}

export function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((it, i) => (
        <Fragment key={i}>
          {i > 0 && (
            <span className="sep" aria-hidden="true">
              ›
            </span>
          )}
          {it.to ? <Link to={it.to}>{it.label}</Link> : <span className="current">{it.label}</span>}
        </Fragment>
      ))}
    </nav>
  );
}
