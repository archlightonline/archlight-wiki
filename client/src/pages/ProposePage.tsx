import { useState } from 'react';
import { Link } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { ErrorBox, Loading } from '../components/ui';
import { RichTextEditor } from '../components/RichTextEditor';
import { useAuthModal } from '../wiki-components/AuthModal';

/**
 * Viewer-accessible "propose a new page" flow. Creates a contribution with a
 * null pageId + proposedTitle (status pending) via contributions.submitNewPage.
 * An editor creates the actual page when they approve it. Same review workflow,
 * same content sanitization as an existing-page edit — viewers never edit live.
 */
export function ProposePage() {
  const { isAuthed, isLoading } = useAuth();
  const { open: openAuth } = useAuthModal();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const submit = trpc.contributions.submitNewPage.useMutation({ onSuccess: () => setDone(true) });

  if (isLoading) return <Loading />;

  if (!isAuthed) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <h2>Sign in to propose a page</h2>
          <p className="muted">You need an account to propose a new wiki page for review.</p>
          <button className="btn primary" onClick={() => openAuth('login')}>
            Sign in
          </button>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <div className="big" aria-hidden="true">
            ✓
          </div>
          <h2>Thanks — submitted for review</h2>
          <p className="muted">An editor will review your proposed page. If approved, it’s published to the wiki.</p>
          <div className="toolbar" style={{ justifyContent: 'center' }}>
            <Link className="btn" to="/contribute">
              Back to Contribute
            </Link>
            <Link className="btn ghost" to="/profile">
              My contributions
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <Breadcrumb
        items={[
          { label: 'Home', to: '/' },
          { label: 'Contribute', to: '/contribute' },
          { label: 'Propose a new page' },
        ]}
      />
      <h1 className="page-title">Propose a new page</h1>
      <p className="lead">Draft a brand-new page. It goes to the review queue — nothing is published until an editor approves it.</p>

      <label className="field">
        <span>Page title</span>
        <input
          className="input"
          value={title}
          maxLength={200}
          placeholder="e.g. Olympus Weapon Upgrade Guide"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>

      <h2 style={{ marginTop: 18 }}>Page content</h2>
      <RichTextEditor
        value={content}
        onChange={setContent}
        placeholder="Write the page — use the toolbar for headings, lists, tables, callouts, and images…"
      />

      <label className="field" style={{ marginTop: 16 }}>
        <span>Note (optional)</span>
        <input
          className="input"
          value={note}
          maxLength={500}
          placeholder="Anything the reviewer should know?"
          onChange={(e) => setNote(e.target.value)}
        />
      </label>

      {submit.error && <ErrorBox error={submit.error} />}
      <div className="toolbar" style={{ marginTop: 12 }}>
        <button
          className="btn primary"
          disabled={submit.isPending || !title.trim() || !content.trim()}
          onClick={() => submit.mutate({ title: title.trim(), proposedContent: content, note: note || undefined })}
        >
          {submit.isPending ? 'Submitting…' : 'Submit for review'}
        </button>
        <Link className="btn ghost" to="/contribute">
          Cancel
        </Link>
      </div>
    </div>
  );
}
