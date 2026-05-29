import { Link, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { Markdown } from '../components/Markdown';
import { Breadcrumb } from '../components/Breadcrumb';
import { useAuth } from '../lib/auth';
import { fmtDateTime } from '../lib/format';
import { Loading } from '../components/ui';
import { NotFound } from './NotFound';

export function WikiPage() {
  const { slug } = useParams();
  const { isEditor, isAuthed } = useAuth();
  const q = trpc.pages.get.useQuery({ slug: slug! }, { retry: false });

  if (q.isLoading) return <Loading />;
  if (q.error || !q.data) return <NotFound />;
  const page = q.data;

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: page.category || 'Wiki', to: `/category/${encodeURIComponent(page.category || '')}` },
          { label: page.title },
        ]}
      />
      <div className="eyebrow">{page.category}</div>
      <h1 className="page-title">{page.title}</h1>

      <div className="meta-row">
        <span>
          Last edited <b>{fmtDateTime(page.updatedAt)}</b>
        </span>
        <span>
          by <b>{page.lastEditor || '—'}</b>
        </span>
        <span>
          <b>{page.revisionCount}</b> revision{page.revisionCount === 1 ? '' : 's'}
        </span>
        {page.isProtected && <span className="badge">🛡️ Protected</span>}
      </div>

      <div className="toolbar">
        {isEditor && (
          <Link className="btn primary" to={`/edit/${page.slug}`}>
            ✎ Edit
          </Link>
        )}
        {isAuthed && !isEditor && (
          <Link className="btn" to={`/contribute/${page.slug}`}>
            ✦ Suggest an edit
          </Link>
        )}
        {!isAuthed && (
          <Link className="btn ghost" to="/login">
            Sign in to contribute
          </Link>
        )}
        <Link className="btn ghost" to={`/history/${page.slug}`}>
          🕑 History ({page.revisionCount})
        </Link>
        <span className="spacer" />
        {page.tags?.map((t) => (
          <Link key={t} className="badge" style={{ textDecoration: 'none' }} to={`/browse?tag=${encodeURIComponent(t)}`}>
            #{t}
          </Link>
        ))}
      </div>

      {page.content.trim() ? (
        <Markdown content={page.content} />
      ) : (
        <p className="muted">This page has no content yet.</p>
      )}
    </div>
  );
}
