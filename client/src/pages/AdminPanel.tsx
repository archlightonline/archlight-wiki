import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { inferRouterOutputs } from '@trpc/server';
import type { AppRouter } from '@server/routers';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { EmptyState, Loading, ErrorBox } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { fmtDate } from '../lib/format';
import { lineDiff } from '../lib/diff';
import { toComparableText } from '../lib/contentText';
import type { Role } from '../lib/auth';

type PageRow = inferRouterOutputs<AppRouter>['pages']['list']['items'][number];
type ContributionRow = inferRouterOutputs<AppRouter>['contributions']['list'][number];
type ReviewMutation = ReturnType<typeof trpc.contributions.review.useMutation>;

function SocialLinksAdmin() {
  const utils = trpc.useUtils();
  const links = trpc.socialLinks.list.useQuery();
  const update = trpc.socialLinks.update.useMutation({ onSuccess: () => utils.socialLinks.list.invalidate() });
  const [urls, setUrls] = useState<Record<string, string>>({});

  useEffect(() => {
    if (links.data) setUrls(Object.fromEntries(links.data.map((l) => [l.key, l.url])));
  }, [links.data]);

  return (
    <div>
      {links.isLoading && <Loading />}
      {update.error && <ErrorBox error={update.error} />}
      <p className="muted" style={{ marginBottom: 14 }}>
        URLs used by the topbar social buttons. Changes take effect immediately — no redeploy needed.
      </p>
      {links.data?.map((l) => (
        <div
          className="card"
          key={l.key}
          style={{ marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
        >
          <span aria-hidden="true" style={{ fontSize: 18, width: 26, textAlign: 'center' }}>{l.icon}</span>
          <div style={{ minWidth: 110 }}>
            <b style={{ color: 'var(--tx0)' }}>{l.label}</b>
            <div className="muted" style={{ fontSize: 11.5 }}>{l.key}</div>
          </div>
          <input
            className="input"
            style={{ flex: 1, minWidth: 220, width: 'auto' }}
            value={urls[l.key] ?? ''}
            onChange={(e) => setUrls((u) => ({ ...u, [l.key]: e.target.value }))}
            placeholder="https://…"
          />
          <button
            className="btn sm primary"
            disabled={update.isPending || !(urls[l.key] ?? '').trim() || (urls[l.key] ?? '') === l.url}
            onClick={() => update.mutate({ key: l.key, url: (urls[l.key] ?? '').trim() })}
          >
            Save
          </button>
        </div>
      ))}
    </div>
  );
}

type WorldStatusValue = 'live' | 'offline' | 'maintenance';

function WorldStatusAdmin() {
  const utils = trpc.useUtils();
  const worlds = trpc.worldStatus.list.useQuery();
  const update = trpc.worldStatus.update.useMutation({ onSuccess: () => utils.worldStatus.list.invalidate() });
  const [edits, setEdits] = useState<Record<string, { status: WorldStatusValue; displayName: string }>>({});

  useEffect(() => {
    if (worlds.data) {
      setEdits(Object.fromEntries(worlds.data.map((w) => [w.key, { status: w.status, displayName: w.displayName }])));
    }
  }, [worlds.data]);

  return (
    <div>
      {worlds.isLoading && <Loading />}
      {update.error && <ErrorBox error={update.error} />}
      <p className="muted" style={{ marginBottom: 14 }}>
        Status and display name shown in the topbar world badges. Changes take effect immediately.
      </p>
      {worlds.data?.map((w) => {
        const e = edits[w.key] ?? { status: w.status, displayName: w.displayName };
        const dirty = e.status !== w.status || e.displayName !== w.displayName;
        return (
          <div
            className="card"
            key={w.key}
            style={{ marginBottom: 10, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}
          >
            <div style={{ minWidth: 110 }}>
              <b style={{ color: 'var(--tx0)' }}>{w.name}</b>
              <div className="muted" style={{ fontSize: 11.5 }}>{w.key}</div>
            </div>
            <input
              className="input"
              style={{ flex: 1, minWidth: 180, width: 'auto' }}
              value={e.displayName}
              onChange={(ev) => setEdits((s) => ({ ...s, [w.key]: { ...e, displayName: ev.target.value } }))}
              placeholder="Display name"
            />
            <select
              className="select"
              style={{ width: 'auto' }}
              value={e.status}
              onChange={(ev) => setEdits((s) => ({ ...s, [w.key]: { ...e, status: ev.target.value as WorldStatusValue } }))}
            >
              <option value="live">live</option>
              <option value="offline">offline</option>
              <option value="maintenance">maintenance</option>
            </select>
            <button
              className="btn sm primary"
              disabled={update.isPending || !dirty || !e.displayName.trim()}
              onClick={() => update.mutate({ key: w.key, status: e.status, displayName: e.displayName.trim() })}
            >
              Save
            </button>
          </div>
        );
      })}
    </div>
  );
}

function ContributionsQueue() {
  const utils = trpc.useUtils();
  const [status, setStatus] = useState<'pending' | 'all'>('pending');
  const list = trpc.contributions.list.useQuery({ status });
  const review = trpc.contributions.review.useMutation({
    onSuccess: () => utils.contributions.list.invalidate(),
  });

  return (
    <div>
      <div className="toolbar">
        <button className={`tab${status === 'pending' ? ' active' : ''}`} onClick={() => setStatus('pending')}>
          Pending
        </button>
        <button className={`tab${status === 'all' ? ' active' : ''}`} onClick={() => setStatus('all')}>
          All
        </button>
      </div>
      {list.isLoading && <Loading />}
      {review.error && <ErrorBox error={review.error} />}
      {list.data?.length === 0 && (
        <EmptyState
          icon="✓"
          title={status === 'pending' ? 'Review queue is clear' : 'No contributions yet'}
          body={status === 'pending' ? 'New suggestions will appear here when players submit edits.' : 'Reviewed and pending suggestions will appear here.'}
        />
      )}
      {list.data?.map((c) => (
        <ContributionCard key={c.id} c={c} review={review} />
      ))}
    </div>
  );
}

/** Reuses the exact diff markup/CSS from RevisionHistory, fed normalized text. */
function ContentDiff({ current, proposed }: { current: string; proposed: string }) {
  const ops = lineDiff(toComparableText(current), toComparableText(proposed));
  if (ops.every((op) => op.type === 'ctx')) {
    return <p className="muted" style={{ margin: 0 }}>No textual changes vs the current page.</p>;
  }
  return (
    <div className="diff">
      {ops.map((op, i) => (
        <span key={i} className={op.type}>
          {op.type === 'add' ? '+ ' : op.type === 'del' ? '- ' : '  '}
          {op.text || ' '}
        </span>
      ))}
    </div>
  );
}

function ContributionCard({ c, review }: { c: ContributionRow; review: ReviewMutation }) {
  const isEdit = !!c.pageSlug;
  const [open, setOpen] = useState(false);
  // Existing-page edits default to the diff; new-page proposals only have "full".
  const [mode, setMode] = useState<'diff' | 'full'>('diff');

  // Lazily fetch the current page content (the diff baseline) only once a
  // reviewer expands the diff on an existing-page edit. No server change —
  // pages.get already returns content to editors/admins.
  const baseline = trpc.pages.get.useQuery(
    { slug: c.pageSlug ?? '' },
    { enabled: open && isEdit && mode === 'diff', retry: false, staleTime: 30_000 },
  );

  return (
    <div className="card" style={{ marginBottom: 10 }}>
      <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
        <span className={`badge ${c.status}`}>{c.status}</span>
        {c.pageSlug ? (
          <Link to={`/wiki/${c.pageSlug}`}>{c.pageTitle ?? c.pageSlug}</Link>
        ) : (
          <span style={{ color: 'var(--tx0)' }}>
            {c.proposedTitle ?? 'Untitled'} <span className="badge">New page</span>
          </span>
        )}
        <span className="muted">· by {c.contributor}</span>
        <span className="spacer" />
        <span className="muted" style={{ fontSize: 11.5 }}>{fmtDate(c.createdAt)}</span>
      </div>
      {c.contributorNote && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Contributor&apos;s note: {c.contributorNote}</div>}
      {c.reviewNote && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Reviewer&apos;s note: {c.reviewNote}</div>}
      <div className="toolbar" style={{ marginTop: 8 }}>
        <button className="btn sm ghost" onClick={() => setOpen((o) => !o)}>
          {open ? 'Hide' : isEdit ? 'View changes' : 'View proposed content'}
        </button>
        {open && isEdit && (
          <>
            <button className={`tab${mode === 'diff' ? ' active' : ''}`} onClick={() => setMode('diff')}>
              Diff
            </button>
            <button className={`tab${mode === 'full' ? ' active' : ''}`} onClick={() => setMode('full')}>
              Full proposed content
            </button>
          </>
        )}
        {c.status === 'pending' && (
          <>
            <button
              className="btn sm primary"
              disabled={review.isPending}
              onClick={() => review.mutate({ id: c.id, decision: 'approved' })}
            >
              Approve & apply
            </button>
            <button
              className="btn sm danger"
              disabled={review.isPending}
              onClick={() => {
                const note = prompt('Reason for rejection (optional):') ?? undefined;
                review.mutate({ id: c.id, decision: 'rejected', note });
              }}
            >
              Reject
            </button>
          </>
        )}
      </div>
      {open && (
        isEdit && mode === 'diff' ? (
          <div className="review-preview">
            {baseline.isLoading && <Loading />}
            {baseline.error && <ErrorBox error={baseline.error} />}
            {baseline.data && <ContentDiff current={baseline.data.content} proposed={c.proposedContent} />}
          </div>
        ) : (
          <div className="review-preview">
            <Markdown content={c.proposedContent} />
          </div>
        )
      )}
    </div>
  );
}

function UsersAdmin() {
  const utils = trpc.useUtils();
  const users = trpc.admin.listUsers.useQuery();
  const setRole = trpc.admin.updateUserRole.useMutation({ onSuccess: () => utils.admin.listUsers.invalidate() });
  const setActive = trpc.admin.deactivateUser.useMutation({ onSuccess: () => utils.admin.listUsers.invalidate() });
  const err = setRole.error || setActive.error;

  return (
    <div>
      {users.isLoading && <Loading />}
      {err && <ErrorBox error={err} />}
      {users.data?.length === 0 && <EmptyState icon="∅" title="No users found" body="Registered wiki users will appear here." />}
      {users.data && users.data.length > 0 && (
        <div className="table-wrap">
          <table className="wtbl">
            <thead>
              <tr>
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Active</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {users.data.map((u) => (
                <tr key={u.id}>
                  <td>
                    <b style={{ color: 'var(--tx0)' }}>{u.displayName || u.username}</b>
                    <div className="muted" style={{ fontSize: 11.5 }}>@{u.username}</div>
                  </td>
                  <td className="muted">{u.email}</td>
                  <td>
                    <select
                      className="select"
                      value={u.role}
                      onChange={(e) => setRole.mutate({ userId: u.id, role: e.target.value as Role })}
                    >
                      <option value="viewer">viewer</option>
                      <option value="editor">editor</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td>
                    <button
                      className={`btn sm ${u.isActive ? 'ghost' : 'danger'}`}
                      onClick={() => setActive.mutate({ userId: u.id, isActive: !u.isActive })}
                    >
                      {u.isActive ? 'Active' : 'Deactivated'}
                    </button>
                  </td>
                  <td className="muted">{fmtDate(u.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const PAGE_SIZE = 25;
type StatusFilter = 'all' | 'published' | 'archived';

function PagesAdmin() {
  const utils = trpc.useUtils();
  // The whole page set is loaded into memory (incl. archived/unpublished, via
  // includeUnpublished) so search can find ANY page — archived pages are hidden
  // from normal wiki search, so this table is the only place to restore them.
  // pages.list is server-capped at 100/req, so we page through it once.
  const [allPages, setAllPages] = useState<PageRow[] | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [page, setPage] = useState(1);

  const loadAll = useCallback(async () => {
    setLoadError(null);
    try {
      const acc: PageRow[] = [];
      let p = 1;
      // Always fetch fresh (staleTime 0) so it reflects the latest archive/restore.
      for (;;) {
        const res = await utils.pages.list.fetch({ page: p, pageSize: 100, includeUnpublished: true }, { staleTime: 0 });
        acc.push(...res.items);
        if (res.items.length === 0 || acc.length >= res.total) break;
        p++;
      }
      setAllPages(acc);
    } catch (e) {
      setLoadError(e instanceof Error ? e.message : 'Failed to load pages.');
    }
  }, [utils]);

  useEffect(() => {
    void loadAll();
  }, [loadAll]);

  const update = trpc.pages.update.useMutation({
    onSuccess: () => {
      void loadAll(); // refresh the in-memory set after archive/restore/protect
    },
  });

  // Reset to the first page when the search/filter changes.
  useEffect(() => {
    setPage(1);
  }, [query, statusFilter]);

  const q = query.trim().toLowerCase();
  const filtered = (allPages ?? []).filter((p) => {
    if (statusFilter === 'published' && !p.isPublished) return false;
    if (statusFilter === 'archived' && p.isPublished) return false;
    if (!q) return true;
    return p.title.toLowerCase().includes(q) || (p.category ?? '').toLowerCase().includes(q);
  });
  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, totalPages);
  const rows = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);
  const loading = allPages === null && !loadError;

  return (
    <div>
      <p className="muted" style={{ marginBottom: 14 }}>
        Archive hides a page from the wiki and search but keeps it and its full history — restore it any time. Pages are
        never permanently deleted here.
      </p>

      <div className="toolbar" style={{ gap: 8, flexWrap: 'wrap' }}>
        <input
          className="input"
          style={{ flex: 1, minWidth: 220, width: 'auto' }}
          value={query}
          placeholder="Search pages by title or category…"
          aria-label="Search pages"
          onChange={(e) => setQuery(e.target.value)}
        />
        <div className="toolbar" style={{ gap: 4 }}>
          {(['all', 'published', 'archived'] as StatusFilter[]).map((s) => (
            <button key={s} className={`tab${statusFilter === s ? ' active' : ''}`} onClick={() => setStatusFilter(s)}>
              {s === 'all' ? 'All' : s === 'published' ? 'Published' : 'Archived'}
            </button>
          ))}
        </div>
      </div>

      {loading && <Loading />}
      {loadError && <ErrorBox error={loadError} />}
      {update.error && <ErrorBox error={update.error} />}

      {allPages !== null && filtered.length === 0 && (
        <EmptyState
          icon="∅"
          title="No pages match"
          body={query || statusFilter !== 'all' ? 'Try a different search or filter.' : 'Wiki pages will appear here.'}
        />
      )}

      {filtered.length > 0 && (
        <>
          <p className="muted" style={{ fontSize: 12 }}>
            {filtered.length} page{filtered.length === 1 ? '' : 's'}
            {query || statusFilter !== 'all' ? ` matching${statusFilter !== 'all' ? ` ${statusFilter}` : ''}` : ''}
          </p>
          <div className="table-wrap">
            <table className="wtbl">
              <thead>
                <tr>
                  <th>Page</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Protected</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((p) => (
                  <tr key={p.id}>
                    <td>
                      <Link to={`/wiki/${p.slug}`}>{p.title}</Link>
                      {!p.isPublished && (
                        <>
                          {' '}
                          <span className="badge">🗃 Archived</span>
                        </>
                      )}
                    </td>
                    <td className="muted">{p.category}</td>
                    <td>
                      {p.isPublished ? (
                        <button
                          className="btn sm ghost"
                          title="Archive (unpublish) — hides from the wiki/search, kept & recoverable"
                          onClick={() => update.mutate({ slug: p.slug, isPublished: false })}
                        >
                          🗃 Archive
                        </button>
                      ) : (
                        <button
                          className="btn sm primary"
                          title="Restore (publish) — make this page visible again"
                          onClick={() => update.mutate({ slug: p.slug, isPublished: true })}
                        >
                          ♻ Restore
                        </button>
                      )}
                    </td>
                    <td>
                      <button className="btn sm ghost" onClick={() => update.mutate({ slug: p.slug, isProtected: true })}>
                        Protect
                      </button>{' '}
                      <button className="btn sm ghost" onClick={() => update.mutate({ slug: p.slug, isProtected: false })}>
                        Unprotect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {totalPages > 1 && (
        <div className="toolbar">
          <button className="btn sm" disabled={current <= 1} onClick={() => setPage(current - 1)}>
            ← Prev
          </button>
          <span className="muted">
            Page {current} / {totalPages}
          </span>
          <button className="btn sm" disabled={current >= totalPages} onClick={() => setPage(current + 1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export function AdminPanel({ tab }: { tab: 'contributions' | 'users' | 'pages' | 'social' | 'worlds' }) {
  const { isAdmin } = useAuth();
  return (
    <div className="container">
      <h1 className="page-title">Dashboard</h1>
      <div className="tabs">
        <Link className={`tab${tab === 'contributions' ? ' active' : ''}`} to="/admin/contributions">
          Review queue
        </Link>
        {isAdmin && (
          <Link className={`tab${tab === 'users' ? ' active' : ''}`} to="/admin/users">
            Users
          </Link>
        )}
        {isAdmin && (
          <Link className={`tab${tab === 'pages' ? ' active' : ''}`} to="/admin/pages">
            Page protection
          </Link>
        )}
        {isAdmin && (
          <Link className={`tab${tab === 'social' ? ' active' : ''}`} to="/admin/social">
            Social Links
          </Link>
        )}
        {isAdmin && (
          <Link className={`tab${tab === 'worlds' ? ' active' : ''}`} to="/admin/worlds">
            World Status
          </Link>
        )}
      </div>
      {tab === 'contributions' && <ContributionsQueue />}
      {tab === 'users' && <UsersAdmin />}
      {tab === 'pages' && <PagesAdmin />}
      {tab === 'social' && <SocialLinksAdmin />}
      {tab === 'worlds' && <WorldStatusAdmin />}
    </div>
  );
}
