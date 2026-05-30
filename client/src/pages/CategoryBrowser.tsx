import { useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { Breadcrumb } from '../components/Breadcrumb';
import { EmptyState, PageLink, PageListSkeleton } from '../components/ui';
import { iconFor } from '../components/NavItem';

function CategoryPages({ category }: { category: string }) {
  const q = trpc.pages.list.useQuery({ category, pageSize: 50 });
  return (
    <section style={{ marginBottom: 28 }}>
      <h2>
        {iconFor(category)} {category}
        {q.data && (
          <span className="muted" style={{ fontSize: 13 }}>
            {' '}
            ({q.data.total})
          </span>
        )}
      </h2>
      {q.isLoading && <PageListSkeleton count={3} />}
      {q.data?.total === 0 && (
        <EmptyState
          icon="∅"
          title={`No ${category} pages yet`}
          body="This category is ready for the first published guide."
        />
      )}
      {q.data?.items.map((p) => <PageLink key={p.id} p={p} />)}
      {q.data && q.data.total > q.data.items.length && (
        <Link className="btn ghost sm" to={`/category/${encodeURIComponent(category)}`}>
          View all {q.data.total} →
        </Link>
      )}
    </section>
  );
}

function SingleCategory({ category }: { category: string }) {
  const [page, setPage] = useState(1);
  const q = trpc.pages.list.useQuery({ category, page, pageSize: 25 });
  const totalPages = q.data ? Math.max(1, Math.ceil(q.data.total / q.data.pageSize)) : 1;
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Browse', to: '/browse' }, { label: category }]} />
      <h1 className="page-title">
        {iconFor(category)} {category}
      </h1>
      <p className="muted">{q.isLoading ? 'Loading pages...' : `${q.data?.total ?? 0} pages`}</p>
      {q.isLoading && <PageListSkeleton count={6} />}
      {q.data?.total === 0 && (
        <EmptyState
          icon="∅"
          title="No pages in this category yet"
          body="Try another category, or check back after more guides are published."
        >
          <Link className="btn" to="/browse">
            Browse all categories
          </Link>
        </EmptyState>
      )}
      {q.data?.items.map((p) => <PageLink key={p.id} p={p} />)}
      {totalPages > 1 && (
        <div className="toolbar">
          <button className="btn sm" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            ← Prev
          </button>
          <span className="muted">
            Page {page} / {totalPages}
          </span>
          <button className="btn sm" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

function TagResults({ tag }: { tag: string }) {
  const q = trpc.pages.list.useQuery({ tag, pageSize: 100 });
  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Browse', to: '/browse' }, { label: `#${tag}` }]} />
      <h1 className="page-title">Tagged “{tag}”</h1>
      <p className="muted">{q.isLoading ? 'Loading pages...' : `${q.data?.total ?? 0} pages`}</p>
      {q.isLoading && <PageListSkeleton count={5} />}
      {q.data?.items.map((p) => <PageLink key={p.id} p={p} />)}
      {q.data?.total === 0 && (
        <EmptyState
          icon="#"
          title="No pages with this tag"
          body="Tags appear here once published pages use them."
        >
          <Link className="btn" to="/browse">
            Browse all pages
          </Link>
        </EmptyState>
      )}
    </div>
  );
}

export function CategoryBrowser() {
  const { category } = useParams();
  const [params] = useSearchParams();
  const tag = params.get('tag');
  const categories = trpc.pages.categories.useQuery();

  if (tag) return <TagResults tag={tag} />;
  if (category) return <SingleCategory category={category} />;

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Browse' }]} />
      <h1 className="page-title">Browse all pages</h1>
      <p className="lead">Everything in the wiki, grouped by category.</p>
      {categories.isLoading && <PageListSkeleton count={6} />}
      {categories.data?.length === 0 && (
        <EmptyState
          icon="∅"
          title="No published pages yet"
          body="Once guides are published, this browse index will group them by category."
        />
      )}
      {categories.data?.map((c) => <CategoryPages key={c.category} category={c.category} />)}
    </div>
  );
}
