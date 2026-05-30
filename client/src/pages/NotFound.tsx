import { Link, useNavigate } from 'react-router-dom';

// Ported from the original static 404 (empty-page card), restyled with tokens.
export function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container narrow">
      <div className="empty-state">
        <div className="big" aria-hidden="true">
          ?
        </div>
        <div className="breadcrumb" style={{ justifyContent: 'center' }}>
          <span>Archlight Wiki</span>
          <span className="sep">›</span>
          <span className="current">Not found</span>
        </div>
        <h1 className="page-title">Page not found</h1>
        <p className="muted">
          This entry doesn’t exist yet, or it hasn’t been published. The wiki keeps unknown routes empty rather than
          showing placeholder information.
        </p>
        <div className="toolbar" style={{ justifyContent: 'center' }}>
          <button className="btn primary" type="button" onClick={() => navigate(-1)}>
            Go back
          </button>
          <Link className="btn" to="/browse">
            Browse all pages
          </Link>
        </div>
      </div>
    </div>
  );
}
