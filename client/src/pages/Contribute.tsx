import { Link } from 'react-router-dom';

const PILLS = [
  'All edits reviewed before publish',
  'Earn wiki contribution stars',
  'Simple fixes welcome',
  'Report broken info instantly',
];

const TYPES = [
  {
    type: 'report',
    icon: '🐛',
    title: 'Report a Page Issue',
    desc: 'Tell us what is wrong on an existing page: wrong value, missing requirement, broken link, unclear step, outdated note, or missing screenshot reference.',
    meta: '30 sec · +2 contribution stars',
  },
  {
    type: 'suggest',
    icon: '💡',
    title: 'Suggest Page Improvement',
    desc: 'Send a useful idea for a page: a missing note, route tip, source location, example, clarification, or a better way to explain something.',
    meta: '2 min · +5 contribution stars',
  },
  {
    type: 'fix',
    icon: '✏️',
    title: 'Submit a Page Fix or Update',
    desc: 'Give the actual fix for an existing page: replacement text, corrected number, updated list/table entry, or clear step-by-step correction.',
    meta: '5–15 min · +15 contribution stars',
  },
  {
    type: 'draft',
    icon: '📄',
    title: 'Draft a Missing Page',
    desc: 'Create a useful starter draft for a missing quest, system, class, dungeon, profession, item, addon, or progression guide.',
    meta: '15–30 min · +35 contribution stars',
  },
];

const RANKS = [
  { name: 'Helper', stars: 0, desc: 'First recognition for useful fixes, screenshots, and clear notes.' },
  { name: 'Page Scout', stars: 250, desc: 'Early contributor helping with requirements, routes, and practical notes.' },
  { name: 'Route Keeper', stars: 750, desc: 'Reliable contributor for consistent page fixes and guide improvements.' },
  { name: 'Wiki Curator', stars: 1500, desc: 'Trusted contributor improving deeper guides, tables, and references.' },
  { name: 'Realm Chronicler', stars: 2500, desc: 'High-tier contributor shaping important wiki areas.' },
  { name: 'Elder Cartographer', stars: 5000, desc: 'Legendary long-term work that defines major wiki sections.' },
];

const STEPS = [
  { n: 1, title: 'Choose the right action', desc: 'Pick report, suggest, fix, or draft based on what you have.' },
  { n: 2, title: 'Include the page and proof', desc: 'Name the page and attach values, screenshots, or routes.' },
  { n: 3, title: 'Staff reviews it', desc: 'A wiki admin checks the submission before it affects the live wiki.' },
  { n: 4, title: 'Earn wiki recognition', desc: 'Approved work earns season and lifetime contribution stars.' },
];

export function Contribute() {
  return (
    <div className="container">
      {/* Hero */}
      <div className="sec-head" style={{ marginTop: 18 }}>
        <div className="sec-ey">◆ Community ◆</div>
        <h1 className="contrib-title">Contribute to the Community Wiki</h1>
        <p className="sec-s">
          Help keep Archlight information accurate by sending corrections, missing details, screenshots, routes, or new
          page drafts. Accepted work earns season contribution stars and lifetime contribution progress.
        </p>
      </div>
      <div className="contrib-pills">
        {PILLS.map((p) => (
          <span key={p} className="contrib-pill">
            ✦ {p}
          </span>
        ))}
      </div>

      {/* Contribution types */}
      <div className="sec-head">
        <h2 className="sec-h">Choose how you want to help</h2>
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
            <Link className="btn primary" to={`/new?type=${t.type}`}>
              Start →
            </Link>
          </div>
        ))}
      </div>

      {/* Contributor ranks */}
      <div className="sec-head">
        <h2 className="sec-h">Earned wiki ranks</h2>
        <p className="sec-s">Lifetime contribution stars unlock contributor ranks over time.</p>
      </div>
      <div className="grid cols-3">
        {RANKS.map((r) => (
          <div key={r.name} className="card rank-card">
            <div className="rank-top">
              <span className="rank-ico" aria-hidden="true">
                ★
              </span>
              <span className="rank-name">{r.name}</span>
              <span className="rank-stars">{r.stars.toLocaleString()}★</span>
            </div>
            <p className="muted">{r.desc}</p>
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

      {/* Top contributors */}
      <div className="sec-head">
        <h2 className="sec-h">Top contributors</h2>
      </div>
      <div className="card center muted" style={{ padding: 32 }}>
        🏆 Leaderboard coming soon — approved contributions will rank here by season stars.
      </div>
    </div>
  );
}
