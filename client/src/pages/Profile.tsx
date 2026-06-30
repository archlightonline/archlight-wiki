import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Loading, ErrorBox } from '../components/ui';
import { fmtDate } from '../lib/format';

const statusLabel = (s: string) =>
  s === 'approved' ? 'Approved' : s === 'rejected' ? 'Rejected' : 'Pending review';

export function Profile() {
  const { user, isLoading, isAuthed, refetch } = useAuth();
  const utils = trpc.useUtils();
  const mine = trpc.contributions.mine.useQuery(undefined, { enabled: isAuthed });

  // Mark contribution feedback as seen once the list has loaded (so the `isNew`
  // flags reflect pre-seen state), then clear the topbar unread badge. We don't
  // re-fetch `mine` here, so the "New" highlights persist for this visit.
  const markSeen = trpc.contributions.markContributionsSeen.useMutation({
    onSuccess: () => utils.contributions.unreadCount.invalidate(),
  });
  const markedRef = useRef(false);
  useEffect(() => {
    if (mine.isSuccess && !markedRef.current) {
      markedRef.current = true;
      markSeen.mutate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mine.isSuccess]);

  const [displayName, setDisplayName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const update = trpc.auth.updateProfile.useMutation({
    onSuccess: () => {
      utils.auth.me.invalidate();
      refetch();
    },
  });

  useEffect(() => {
    if (user) {
      setDisplayName(user.displayName ?? '');
      setAvatarUrl(user.avatarUrl ?? '');
    }
  }, [user?.id]);

  if (isLoading) return <Loading />;
  if (!isAuthed || !user) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <h2>Not signed in</h2>
          <Link className="btn primary" to="/login">
            Sign in
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container narrow">
      <h1 className="page-title">Profile</h1>

      <div className="card" style={{ display: 'flex', gap: 16, alignItems: 'center', marginBottom: 20 }}>
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--bg4)',
            border: '1px solid var(--rim2)',
            backgroundImage: user.avatarUrl ? `url(${user.avatarUrl})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'grid',
            placeItems: 'center',
            fontSize: 26,
          }}
        >
          {!user.avatarUrl && '👤'}
        </div>
        <div>
          <div style={{ color: 'var(--tx0)', fontFamily: 'var(--font-label)', fontSize: 18 }}>
            {user.displayName || user.username}
          </div>
          <div className="muted">@{user.username}</div>
          <span className={`badge role-${user.role}`} style={{ marginTop: 6 }}>
            {user.role}
          </span>
        </div>
      </div>

      <div className="card" style={{ marginBottom: 20 }}>
        <h2>Edit profile</h2>
        <label className="field">
          <span>Display name</span>
          <input className="input" value={displayName} maxLength={60} onChange={(e) => setDisplayName(e.target.value)} />
        </label>
        <label className="field">
          <span>Avatar URL (https only)</span>
          <input
            className="input"
            value={avatarUrl}
            placeholder="https://…"
            onChange={(e) => setAvatarUrl(e.target.value)}
          />
          <span className="form-hint">Must start with https:// — other schemes are rejected.</span>
        </label>
        {update.error && <ErrorBox error={update.error} />}
        {update.isSuccess && <p className="muted">Saved.</p>}
        <button
          className="btn primary"
          disabled={update.isPending}
          onClick={() => update.mutate({ displayName, avatarUrl: avatarUrl || undefined })}
        >
          {update.isPending ? 'Saving…' : 'Save profile'}
        </button>
      </div>

      <h2>My contributions</h2>
      {mine.isLoading && <Loading />}
      {mine.data?.length === 0 && <p className="muted">No contributions yet. Find a page and suggest an edit!</p>}
      {mine.data?.map((c) => (
        <div className={`card${c.isNew ? ' contribution-new' : ''}`} key={c.id} style={{ marginBottom: 8, padding: '10px 14px' }}>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            {c.pageSlug ? (
              <Link to={`/wiki/${c.pageSlug}`}>{c.pageTitle ?? c.pageSlug}</Link>
            ) : (
              <span style={{ color: 'var(--tx0)' }}>
                {c.proposedTitle ?? 'Untitled'} <span className="badge">New page</span>
              </span>
            )}
            {c.isNew && <span className="badge unread-badge">New</span>}
            <span className="spacer" />
            <span className={`badge ${c.status}`}>{statusLabel(c.status)}</span>
            <span className="muted" style={{ fontSize: 11.5 }}>{fmtDate(c.createdAt)}</span>
          </div>
          {c.reviewedAt && (
            <div className="muted" style={{ fontSize: 12, marginTop: 4 }}>
              {c.status === 'approved' ? 'Approved' : 'Reviewed'} {fmtDate(c.reviewedAt)}
            </div>
          )}
          {c.contributorNote && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Your note: {c.contributorNote}</div>}
          {c.reviewNote && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>Reviewer&apos;s note: {c.reviewNote}</div>}
        </div>
      ))}
    </div>
  );
}
