import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { trpc } from '../lib/trpc';
import { useAuth } from '../lib/auth';
import { Breadcrumb } from '../components/Breadcrumb';
import { Loading, ErrorBox } from '../components/ui';
import { Markdown } from '../components/Markdown';
import { NotFound } from './NotFound';

export function ContributionForm() {
  const { slug } = useParams();
  const { isAuthed, isLoading } = useAuth();
  const page = trpc.pages.get.useQuery({ slug: slug! }, { retry: false });
  const [content, setContent] = useState('');
  const [note, setNote] = useState('');
  const [done, setDone] = useState(false);
  const submit = trpc.contributions.submit.useMutation({ onSuccess: () => setDone(true) });

  useEffect(() => {
    if (page.data) setContent(page.data.content);
  }, [page.data?.slug]);

  if (isLoading || page.isLoading) return <Loading />;
  if (!page.data) return <NotFound />;

  if (!isAuthed) {
    return (
      <div className="container narrow">
        <div className="empty-state">
          <h2>Sign in to contribute</h2>
          <p className="muted">You need an account to suggest edits.</p>
          <Link className="btn primary" to={`/login?next=/contribute/${slug}`}>
            Sign in
          </Link>
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
          <textarea className="textarea" value={content} onChange={(e) => setContent(e.target.value)} />
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
