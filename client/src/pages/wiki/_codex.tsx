/**
 * Shared renderer for "codex" pages (Professions, Guilds): an interactive
 * side-menu + tabbed-panel layout. Each entry shows an optional abbr badge,
 * meta grid, media note, topic chips, note cards, and reference tables.
 */
import { useState } from 'react';
import { WIKI_PAGE_DATA, WikiBreadcrumb, WikiHero, DataTable, autoCategory } from './_shared';

export interface CodexMeta {
  label: string;
  value: string;
}
export interface CodexNote {
  title: string;
  text: string;
}
export interface CodexTable {
  headers: string[];
  rows: string[][];
}
export interface CodexEntry {
  id: string;
  name: string;
  abbr: string;
  kind: string;
  group: string;
  sub: string;
  intro: string;
  meta: CodexMeta[];
  media: string;
  chips: string[];
  notes: CodexNote[];
  tables: CodexTable[];
}
export interface CodexGroup {
  name: string;
  items: string[];
}

function CodexPanel({ entry }: { entry: CodexEntry }) {
  return (
    <div className="prof-panel">
      <div className="prof-head">
        {entry.abbr && <span className="prof-abbr">{entry.abbr}</span>}
        <div>
          <h2 className="prof-name">{entry.name}</h2>
          {entry.kind && <div className="prof-kind">{entry.kind}</div>}
        </div>
      </div>

      {entry.intro && <p className="wk-p">{entry.intro}</p>}

      {entry.meta.length > 0 && (
        <div className="prof-meta">
          {entry.meta.map((m, i) => (
            <div className="prof-meta-item" key={i}>
              <span>{m.label}</span>
              <b>{m.value}</b>
            </div>
          ))}
        </div>
      )}

      {entry.media && (
        <div className="wk-media">
          <span aria-hidden="true">📷</span> <em>{entry.media} — coming soon</em>
        </div>
      )}

      {entry.chips.length > 0 && (
        <div className="wk-pill-row" style={{ margin: '4px 0 18px' }}>
          {entry.chips.map((c, i) => (
            <span className="wk-pill" key={i}>{c}</span>
          ))}
        </div>
      )}

      {entry.notes.length > 0 && (
        <div className="prof-notes">
          {entry.notes.map((n, i) => (
            <div className="wk-card" key={i}>
              <div className="wk-card-eyebrow">{n.title}</div>
              <div className="wk-card-text">{n.text}</div>
            </div>
          ))}
        </div>
      )}

      {entry.tables.map((t, i) => (
        <DataTable key={i} headers={t.headers} rows={t.rows} />
      ))}
    </div>
  );
}

export function CodexPage({
  slug,
  groups,
  entries,
  defaultId,
}: {
  slug: string;
  groups: CodexGroup[];
  entries: Record<string, CodexEntry>;
  defaultId?: string;
}) {
  const data = WIKI_PAGE_DATA[slug];
  const first = defaultId ?? groups[0]?.items[0] ?? Object.keys(entries)[0];
  const [active, setActive] = useState(first);
  const current = entries[active];

  return (
    <div className="container">
      <WikiBreadcrumb category={autoCategory(slug)} title={data.title} />
      <WikiHero data={data} />

      <div className="prof-codex">
        <nav className="prof-menu" aria-label={data.title}>
          {groups.map((g, gi) => (
            <div className="prof-group" key={gi}>
              {g.name && <div className="prof-group-label">{g.name}</div>}
              {g.items.map((id) => {
                const it = entries[id];
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

        {current && <CodexPanel entry={current} />}
      </div>
    </div>
  );
}
