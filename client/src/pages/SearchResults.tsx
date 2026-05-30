import { Link, useSearchParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { Breadcrumb } from '../components/Breadcrumb';
import { EmptyState, PageListSkeleton } from '../components/ui';

export function SearchResults() {
  const [params, setParams] = useSearchParams();
  const q = params.get('q') ?? '';
  const category = params.get('category') ?? undefined;

  const results = trpc.pages.search.useQuery({ q, category, limit: 40 }, { enabled: q.trim().length > 0 });
  const categories = trpc.pages.categories.useQuery();

  const setCategory = (c?: string) => {
    const next = new URLSearchParams(params);
    if (c) next.set('category', c);
    else next.delete('category');
    setParams(next);
  };

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Search' }]} />
      <h1 className="page-title">Search</h1>
      <p className="lead">
        {q ? (
          <>
            Results for “<b>{q}</b>”
          </>
        ) : (
          'Type a query in the search bar above.'
        )}
      </p>

      {q && (
        <div className="toolbar">
          <button type="button" className={`tab${!category ? ' active' : ''}`} onClick={() => setCategory(undefined)}>
            All
          </button>
          {categories.data?.map((c) => (
            <button
              type="button"
              key={c.category}
              className={`tab${category === c.category ? ' active' : ''}`}
              onClick={() => setCategory(c.category)}
            >
              {c.category}
            </button>
          ))}
        </div>
      )}

      {!q && (
        <EmptyState
          icon="⌕"
          title="Search the wiki"
          body="Enter a page title, system, quest, item, or patch note in the search field above."
        />
      )}
      {results.isLoading && <PageListSkeleton count={5} />}
      {results.data && results.data.length === 0 && q && (
        <EmptyState
          icon="∅"
          title="No matching pages"
          body={`Nothing matched "${q}". Try a shorter phrase or browse by category.`}
        >
          <Link className="btn" to="/browse">
            Browse all pages
          </Link>
        </EmptyState>
      )}

      {results.data?.map((r) => (
        <div className="result" key={r.id}>
          <h3>
            <Link to={`/wiki/${r.slug}`}>{r.title}</Link> {r.category && <span className="badge">{r.category}</span>}
          </h3>
          {/* snippet HTML is server-built with <mark> tags only */}
          <div className="snippet" dangerouslySetInnerHTML={{ __html: r.snippet }} />
        </div>
      ))}
    </div>
  );
}
