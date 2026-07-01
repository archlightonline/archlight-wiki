import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { Loading, ErrorBox } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { RichTextEditor } from '../components/RichTextEditor';
import { useAuthModal } from '../wiki-components/AuthModal';
import { NotFound } from './NotFound';

export function ContributionForm() {
  const { slug } = useParams();
  const location = useLocation();
  // Edit-and-resubmit pre-fills the editor with the contributor's prior proposed
  // content (via route state) instead of the page's current content.
  const prefillContent = (location.state as { prefillContent?: string } | null)?.prefillContent;
  const { isAuthed, isLoading } = useAuth();
  const { open: openAuth } = useAuthModal();
  const page = trpc.pages.get.useQuery({ slug: slug! }, { retry: false });
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const submit = trpc.contributions.submit.useMutation({ onSuccess: () => setDone(true) });

  // Seed the editor exactly once: from the resubmit prefill if present, otherwise
  // from the page's current content (the normal "start fresh from current" flow).
  const seeded = useRef(false);
  useEffect(() => {
    if (seeded.current) return;
    if (prefillContent !== undefined) {
      setContent(prefillContent);
      seeded.current = true;
    } else if (page.data) {
      setContent(page.data.content);
      seeded.current = true;
    }
  }, [page.data?.slug, prefillContent]);

  if (isLoading || page.isLoading) return <Loading />;
  if (!page.data) return <NotFound />;

  if (!isAuthed) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <h2>Sign in to contribute</h2>
          <p className="muted">You need an account to suggest edits.</p>
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
          <p className="muted">An editor will approve or decline your suggestion.</p>
          <div className="toolbar" style={{ justifyContent: 'center' }}>
            <Link className="btn" to={`/wiki/${slug}`}>
              Back to page
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
          { label: page.data.title, to: `/wiki/${slug}` },
          { label: 'Suggest an edit' },
        ]}
      />
      <h1 className="page-title">Suggest an edit</h1>
      <p className="lead">Your proposed version goes to the review queue — nothing changes live until an editor approves.</p>

      <div className="split">
        <div>
          <h2>Current</h2>
          <div className="card" style={{ maxHeight: 480, overflow: 'auto' }}>
            <Markdown content={page.data.content} />
          </div>
        </div>
        <div>
          <h2>Your proposed version</h2>
          <RichTextEditor
            value={content}
            onChange={setContent}
            placeholder="Edit the page content — use the toolbar for headings, lists, tables, callouts, and images…"
          />
          <label className="field">
            <span style={{ display: 'block', fontFamily: 'var(--font-label)', fontSize: 10.5, letterSpacing: '.12em', color: 'var(--g2)', textTransform: 'uppercase', margin: '8px 0' }}>
              Note (optional)
            </span>
            <input className="input" value={note} maxLength={500} onChange={(e) => setNote(e.target.value)} placeholder="What did you change and why?" />
          </label>
          {submit.error && <ErrorBox error={submit.error} />}
          <button
            className="btn primary"
            disabled={submit.isPending || !content.trim()}
            onClick={() => submit.mutate({ slug: slug!, proposedContent: content, note: note || undefined })}
          >
            {submit.isPending ? 'Submitting…' : 'Submit for review'}
          </button>
        </div>
      </div>
    </div>
  );
}
