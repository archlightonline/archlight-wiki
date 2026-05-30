import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { EmptyState, Loading, ErrorBox } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { fmtDate } from '../lib/format';
import type { Role } from '../lib/auth';

function ContributionsQueue() {
  const utils = trpc.useUtils();
  const [status, setStatus] = useState<'pending' | 'all'>('pending');
  const list = trpc.contributions.list.useQuery({ status });
  const review = trpc.contributions.review.useMutation({
    onSuccess: () => utils.contributions.list.invalidate(),
  });
  const [open, setOpen] = useState<number | null>(null);

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
        <div className="card" key={c.id} style={{ marginBottom: 10 }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <span className={`badge ${c.status}`}>{c.status}</span>
            <Link to={`/wiki/${c.pageSlug}`}>{c.pageTitle ?? c.pageSlug}</Link>
            <span className="muted">· by {c.contributor}</span>
            <span className="spacer" />
            <span className="muted" style={{ fontSize: 11.5 }}>{fmtDate(c.createdAt)}</span>
          </div>
          {c.reviewNote && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Note: {c.reviewNote}</div>}
          <div className="toolbar" style={{ marginTop: 8 }}>
            <button className="btn sm ghost" onClick={() => setOpen(open === c.id ? null : c.id)}>
              {open === c.id ? 'Hide proposed content' : 'View proposed content'}
            </button>
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
          {open === c.id && (
            <div className="review-preview">
              <Markdown content={c.proposedContent} />
            </div>
          )}
        </div>
      ))}
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

function PagesAdmin() {
  const utils = trpc.useUtils();
  const [page, setPage] = useState(1);
  const list = trpc.pages.list.useQuery({ page, pageSize: 25, includeUnpublished: true });
  const update = trpc.pages.update.useMutation({ onSuccess: () => utils.pages.list.invalidate() });
  const totalPages = list.data ? Math.max(1, Math.ceil(list.data.total / list.data.pageSize)) : 1;

  return (
    <div>
      {list.isLoading && <Loading />}
      {update.error && <ErrorBox error={update.error} />}
      {list.data?.items.length === 0 && <EmptyState icon="∅" title="No pages found" body="Published and unpublished wiki pages will appear here." />}
      {list.data && list.data.items.length > 0 && (
        <div className="table-wrap">
          <table className="wtbl">
            <thead>
              <tr>
                <th>Page</th>
                <th>Category</th>
                <th>Published</th>
                <th>Protected</th>
              </tr>
            </thead>
            <tbody>
              {list.data.items.map((p) => (
                <tr key={p.id}>
                  <td>
                    <Link to={`/wiki/${p.slug}`}>{p.title}</Link>
                  </td>
                  <td className="muted">{p.category}</td>
                  <td>
                    <button
                      className={`btn sm ${p.isPublished ? 'ghost' : 'danger'}`}
                      onClick={() => update.mutate({ slug: p.slug, isPublished: !p.isPublished })}
                    >
                      {p.isPublished ? 'Published' : 'Unpublished'}
                    </button>
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
      )}
      {totalPages > 1 && (
        <div className="toolbar">
          <button className="btn sm" disabled={page <= 1} onClick={() => setPage((x) => x - 1)}>
            ← Prev
          </button>
          <span className="muted">
            Page {page} / {totalPages}
          </span>
          <button className="btn sm" disabled={page >= totalPages} onClick={() => setPage((x) => x + 1)}>
            Next →
          </button>
        </div>
      )}
    </div>
  );
}

export function AdminPanel({ tab }: { tab: 'contributions' | 'users' | 'pages' }) {
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
      </div>
      {tab === 'contributions' && <ContributionsQueue />}
      {tab === 'users' && <UsersAdmin />}
      {tab === 'pages' && <PagesAdmin />}
    </div>
  );
}
