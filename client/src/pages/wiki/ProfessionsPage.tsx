import { useState } from 'react';
import { WIKI_PAGE_DATA, WikiBreadcrumb, WikiHero, DataTable, autoCategory } from './_shared';
import { PROFESSIONS, PROFESSION_GROUPS, type Profession } from './professions-data';

function ProfPanel({ p }: { p: Profession }) {
  return (
    <div className="prof-panel">
      <div className="prof-head">
        {p.abbr && <span className="prof-abbr">{p.abbr}</span>}
        <div>
          <h2 className="prof-name">{p.name}</h2>
          {p.kind && <div className="prof-kind">{p.kind}</div>}
        </div>
      </div>

      {p.intro && <p className="wk-p">{p.intro}</p>}

      {p.meta.length > 0 && (
        <div className="prof-meta">
          {p.meta.map((m, i) => (
            <div className="prof-meta-item" key={i}>
              <span>{m.label}</span>
              <b>{m.value}</b>
            </div>
          ))}
        </div>
      )}

      {p.media && (
        <div className="wk-media">
          <span aria-hidden="true">📷</span> <em>{p.media} — coming soon</em>
        </div>
      )}

      {p.chips.length > 0 && (
        <div className="wk-pill-row" style={{ margin: '4px 0 18px' }}>
          {p.chips.map((c) => (
            <span className="wk-pill" key={c}>{c}</span>
          ))}
        </div>
      )}

      {p.notes.length > 0 && (
        <div className="prof-notes">
          {p.notes.map((n, i) => (
            <div className="wk-card" key={i}>
              <div className="wk-card-eyebrow">{n.title}</div>
              <div className="wk-card-text">{n.text}</div>
            </div>
          ))}
        </div>
      )}

      {p.tables.map((t, i) => (
        <DataTable key={i} headers={t.headers} rows={t.rows} />
      ))}
    </div>
  );
}

export function ProfessionsPage() {
  const data = WIKI_PAGE_DATA['professions'];
  const [active, setActive] = useState('system');
  const current = PROFESSIONS[active];

  return (
    <div className="container">
      <WikiBreadcrumb category={autoCategory('professions')} title={data.title} />
      <WikiHero data={data} />

      <div className="prof-codex">
        <nav className="prof-menu" aria-label="Professions">
          {PROFESSION_GROUPS.map((g) => (
            <div className="prof-group" key={g.name}>
              <div className="prof-group-label">{g.name}</div>
              {g.items.map((id) => {
                const it = PROFESSIONS[id];
                if (!it) return null;
                return (
                  <button
                    key={id}
                    type="button"
                    className={'prof-menu-item' + (id === active ? ' is-active' : '')}
                    aria-pressed={id === active}
                    onClick={() => setActive(id)}
                  >
                    <b>{it.name}</b>
                    {it.sub && <small>{it.sub}</small>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {current && <ProfPanel p={current} />}
      </div>
    </div>
  );
}
