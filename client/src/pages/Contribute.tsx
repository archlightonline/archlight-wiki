import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth';
import { useAuthModal } from '../wiki-components/AuthModal';

const PILLS = [
  'All edits reviewed before publish',
  'Simple fixes welcome',
  'Report broken info instantly',
];

const TYPES = [
  {
    type: 'report',
    icon: '🐛',
    title: 'Report a Page Issue',
    desc: 'Tell us what is wrong on an existing page: wrong value, missing requirement, broken link, unclear step, outdated note, or missing screenshot reference.',
    meta: 'A few minutes',
    kind: 'edit' as const,
  },
  {
    type: 'improvement',
    icon: '💡',
    title: 'Suggest Page Improvement',
    desc: 'Send a useful idea for a page: a missing note, route tip, source location, example, clarification, or a better way to explain something.',
    meta: 'A few minutes',
    kind: 'edit' as const,
  },
  {
    type: 'fix',
    icon: '✏️',
    title: 'Submit a Page Fix or Update',
    desc: 'Give the actual fix for an existing page: replacement text, corrected number, updated list/table entry, or clear step-by-step correction.',
    meta: '5–15 minutes',
    kind: 'edit' as const,
  },
  {
    type: 'draft',
    icon: '📄',
    title: 'Draft a Missing Page',
    desc: 'Create a useful starter draft for a missing quest, system, class, dungeon, profession, item, addon, or progression guide.',
    meta: '15–30 minutes',
    kind: 'new' as const,
  },
];

const STEPS = [
  { n: 1, title: 'Choose the right action', desc: 'Pick report, suggest, fix, or draft based on what you have.' },
  { n: 2, title: 'Write it in the editor', desc: 'For a fix, open the page and Suggest an edit. For a new page, propose a draft.' },
  { n: 3, title: 'An editor reviews it', desc: 'A wiki editor checks the submission before it affects the live wiki.' },
  { n: 4, title: 'Your change goes live', desc: 'Approved edits are published to the wiki and become part of the page history.' },
];

export function Contribute() {
  const { isAuthed, isEditor } = useAuth();
  const { open: openAuth } = useAuthModal();

  // Where each card leads for the CURRENT user — never an editor-only wall.
  //  • edit types  → browse to a page, then "Suggest an edit" (viewers) / "Edit" (editors)
  //  • new page    → propose a draft (viewers) or create directly (editors)
  const hrefFor = (kind: 'edit' | 'new') => (kind === 'new' ? (isEditor ? '/new' : '/propose') : '/browse');
  const ctaLabel = (kind: 'edit' | 'new') =>
    kind === 'new' ? (isEditor ? 'Create a page →' : 'Propose a page →') : 'Find a page →';

  return (
    <div className="container">
      {/* Hero */}
      <div className="sec-head" style={{ marginTop: 18 }}>
        <div className="sec-ey">◆ Community ◆</div>
        <h1 className="contrib-title">Contribute to the Community Wiki</h1>
        <p className="sec-s">
          Help keep Archlight information accurate by sending corrections, missing details, screenshots, routes, or new
          page drafts. Every submission is reviewed by an editor, and approved changes are published to the live wiki.
        </p>
      </div>
      <div className="contrib-pills">
        {PILLS.map((p) => (
          <span key={p} className="contrib-pill">
            ✦ {p}
          </span>
        ))}
      </div>

      {/* Editor/admin shortcut to the review queue */}
      {isEditor && (
        <div className="card" style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', marginTop: 12 }}>
          <span className="badge">Editor</span>
          <span className="muted" style={{ flex: 1, minWidth: 180 }}>
            You can edit pages directly and review submitted contributions.
          </span>
          <Link className="btn sm primary" to="/admin/contributions">
            ✦ Review queue
          </Link>
          <Link className="btn sm" to="/new">
            📝 New page
          </Link>
        </div>
      )}

      {/* Contribution types */}
      <div className="sec-head">
        <h2 className="sec-h">Choose how you want to help</h2>
        {!isAuthed && <p className="sec-s">Sign in to start — every action below opens once you have an account.</p>}
      </div>
      <div className="grid cols-2">
        {TYPES.map((t) => (
          <div key={t.type} className="card type-card">
            <div className="type-head">
              <span className="type-ico" aria-hidden="true">
                {t.icon}
              </span>
              <h3>{t.title}</h3>
            </div>
            <p className="muted">{t.desc}</p>
            <div className="type-meta">{t.meta}</div>
            {isAuthed ? (
              <Link className="btn primary" to={hrefFor(t.kind)}>
                {ctaLabel(t.kind)}
              </Link>
            ) : (
              <button className="btn primary" onClick={() => openAuth('login')}>
                Sign in to start →
              </button>
            )}
          </div>
        ))}
      </div>

      {/* How it works */}
      <div className="sec-head">
        <h2 className="sec-h">How it works</h2>
      </div>
      <div className="grid cols-2">
        {STEPS.map((s) => (
          <div key={s.n} className="card step-card">
            <span className="step-num">{s.n}</span>
            <div>
              <strong style={{ color: 'var(--tx0)' }}>{s.title}</strong>
              <p className="muted" style={{ margin: '4px 0 0' }}>
                {s.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
