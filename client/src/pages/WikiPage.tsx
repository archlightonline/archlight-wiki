import { Link, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { Markdown } from '../components/Markdown';
import { Breadcrumb } from '../components/Breadcrumb';
import { useAuth } from '../lib/auth';
import { fmtDateTime } from '../lib/format';
import { EmptyState, PageDetailSkeleton } from '../components/ui';
import { NotFound } from './NotFound';
import { TableOfContents, parseTocEntries } from '../wiki-components/TableOfContents';

export function WikiPage() {
  const { slug } = useParams();
  const { isEditor, isAuthed } = useAuth();
  const q = trpc.pages.get.useQuery({ slug: slug! }, { retry: false });

  if (q.isLoading) return <PageDetailSkeleton />;
  if (q.error || !q.data) return <NotFound />;
  const page = q.data;

  const tocEntries = parseTocEntries(page.content);
  const hasToc = tocEntries.length >= 3;

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

      {/* Two-column layout when a TOC is present */}
      <div className={hasToc ? 'wiki-page-body wiki-page-body--toc' : 'wiki-page-body'}>
        <div className="wiki-page-content">
          {page.content.trim() ? (
            <Markdown content={page.content} />
          ) : (
            <EmptyState
              icon="✦"
              title="This page is waiting for content"
              body="The entry exists, but no published guide text has been added yet."
            />
          )}
        </div>
        {hasToc && <TableOfContents markdown={page.content} />}
      </div>
    </div>
  );
}
