import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { Loading } from '../components/ui';
import { NotFound } from './NotFound';
import { fmtDateTime } from '../lib/format';
import { lineDiff } from '../lib/diff';

type Sel = number | 'current';

export function RevisionHistory() {
  const { slug } = useParams();
  const { isAdmin } = useAuth();
  const utils = trpc.useUtils();

  const page = trpc.pages.get.useQuery({ slug: slug! }, { retry: false });
  const revs = trpc.pages.getRevisions.useQuery({ slug: slug! }, { retry: false });

  const [from, setFrom] = useState<Sel | null>(null);
  const [to, setTo] = useState<Sel>('current');

  useEffect(() => {
    if (revs.data && revs.data.length && from === null) setFrom(revs.data[0].id);
  }, [revs.data]);

  const fromQ = trpc.pages.getRevision.useQuery({ id: typeof from === 'number' ? from : 0 }, { enabled: typeof from === 'number' });
  const toQ = trpc.pages.getRevision.useQuery({ id: typeof to === 'number' ? to : 0 }, { enabled: typeof to === 'number' });

  const rollback = trpc.pages.rollback.useMutation({
    onSuccess: () => {
      utils.pages.get.invalidate({ slug: slug! });
      utils.pages.getRevisions.invalidate({ slug: slug! });
    },
  });

  if (page.isLoading || revs.isLoading) return <Loading />;
  if (!page.data) return <NotFound />;

  const fromContent = from === 'current' ? page.data.content : fromQ.data?.content ?? '';
  const toContent = to === 'current' ? page.data.content : toQ.data?.content ?? '';
  const ops = lineDiff(fromContent, toContent);
  const options: { value: Sel; label: string }[] = [
    { value: 'current', label: 'Current (live)' },
    ...(revs.data ?? []).map((r) => ({ value: r.id as Sel, label: `#${r.id} · ${r.editor} · ${fmtDateTime(r.createdAt)}` })),
  ];

  return (
    <div className="container">
      <Breadcrumb
        items={[{ label: 'Home', to: '/' }, { label: page.data.title, to: `/wiki/${slug}` }, { label: 'History' }]}
      />
      <h1 className="page-title">Revision history</h1>
      <p className="lead">{page.data.title}</p>

      <div className="split">
        <div>
          <h2>Revisions ({revs.data?.length ?? 0})</h2>
          {revs.data?.length === 0 && <p className="muted">No revisions yet — the page has not been edited.</p>}
          {revs.data?.map((r) => (
            <div className="card" key={r.id} style={{ marginBottom: 8, padding: '10px 14px' }}>
              <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
                <span className="badge">#{r.id}</span>
                <span style={{ color: 'var(--tx0)' }}>{r.editor}</span>
                <span className="spacer" />
                <span className="muted" style={{ fontSize: 11.5 }}>{fmtDateTime(r.createdAt)}</span>
              </div>
              {r.editSummary && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{r.editSummary}</div>}
              <div className="toolbar" style={{ margin: '8px 0 0' }}>
                <button className="btn sm ghost" onClick={() => setFrom(r.id)}>
                  Compare from
                </button>
                <button className="btn sm ghost" onClick={() => setTo(r.id)}>
                  Compare to
                </button>
                {isAdmin && (
                  <button
                    className="btn sm danger"
                    disabled={rollback.isPending}
                    onClick={() => {
                      if (confirm(`Restore the page to revision #${r.id}?`)) rollback.mutate({ revisionId: r.id });
                    }}
                  >
                    Restore
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div>
          <h2>Diff</h2>
          <div className="toolbar">
            <select className="select" value={String(from ?? 'current')} onChange={(e) => setFrom(e.target.value === 'current' ? 'current' : Number(e.target.value))}>
              {options.map((o) => (
                <option key={String(o.value)} value={String(o.value)}>
                  {o.label}
                </option>
              ))}
            </select>
            <span aria-hidden="true">→</span>
            <select className="select" value={String(to)} onChange={(e) => setTo(e.target.value === 'current' ? 'current' : Number(e.target.value))}>
              {options.map((o) => (
                <option key={String(o.value)} value={String(o.value)}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
          <div className="diff">
            {ops.map((op, i) => (
              <span key={i} className={op.type}>
                {op.type === 'add' ? '+ ' : op.type === 'del' ? '- ' : '  '}
                {op.text || ' '}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
