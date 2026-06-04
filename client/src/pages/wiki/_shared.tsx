/**
 * Shared layout primitives for the dedicated wiki pages. Reproduces the
 * original design-lab `.ut-shell` look — hero with stat chips, numbered section
 * panels, styled tables, and a sticky section-nav — using only the existing
 * dark-fantasy CSS variables and classes.
 */
import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { WIKI_PAGE_DATA, type WikiPageData, type WikiBlock, type WikiSection } from './wiki-data';

export { WIKI_PAGE_DATA };
export type { WikiPageData, WikiBlock, WikiSection };

export const slugify = (s: string) =>
  s.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');

// slug -> sidebar category (matches navigation groups)
const CATEGORY: Record<string, string> = {};
const addCat = (cat: string, ids: string[]) => ids.forEach((id) => (CATEGORY[id] = cat));
addCat('Classes', ['classes', 'promotions', 'prestige', 'awakening', 'feats', 'companions']);
addCat('Power', ['stats-caps', 'talent-tree', 'vocation-traits', 'stat-nodes', 'glyphs', 'artifacts', 'soul-shards', 'training', 'bestiary']);
addCat('Equipment', ['equipment-index', 'gear-enhancements']);
addCat('Content', ['events-hub', 'hunting-zones', 'dailies', 'endless-abyss', 'dimensions', 'rifts', 'wargates', 'dungeons', 'secret-maps', 'bounties', 'monsters', 'bosses', 'prisons', 'ramparts', 'zaqors-tower']);
addCat('Professions', ['professions']);
addCat('Guilds', ['guilds']);
addCat('Rewards', ['archpass-rewards', 'challenges-pass', 'achievements', 'race-points', 'roulette', 'living-token-trader', 'cosmetic-bonus-sharing', 'boosts-blessing']);
addCat('Tools', ['addons', 'heirloom-cross-linking']);
export const autoCategory = (slug: string) => CATEGORY[slug] ?? 'Reference';

export function WikiBreadcrumb({ category, title }: { category: string; title: string }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      <Link to="/">Home</Link>
      <span className="sep" aria-hidden="true">›</span>
      <Link to={`/category/${encodeURIComponent(category)}`}>{category}</Link>
      <span className="sep" aria-hidden="true">›</span>
      <span className="current">{title}</span>
    </nav>
  );
}

export function WikiHero({ data }: { data: WikiPageData }) {
  return (
    <header className="wk-hero">
      {data.kicker && <div className="eyebrow">{data.kicker}</div>}
      <h1 className="page-title">{data.title}</h1>
      {data.lead && <p className="lead">{data.lead}</p>}
      {data.stats.length > 0 && (
        <div className="wk-statgrid">
          {data.stats.map((s, i) => (
            <div className="wk-stat" key={i}>
              <span>{s.label}</span>
              <b>{s.value}</b>
            </div>
          ))}
        </div>
      )}
    </header>
  );
}

export function DataTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  return (
    <div className="table-wrap">
      <table className="wtbl">
        {headers.length > 0 && (
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i}>{h}</th>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => (
                <td key={j}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Blocks({ blocks }: { blocks: WikiBlock[] }) {
  return (
    <>
      {blocks.map((b, i) => {
        if (b.type === 'p') return <p className="wk-p" key={i}>{b.text}</p>;
        if (b.type === 'table') return <DataTable key={i} headers={b.headers} rows={b.rows} />;
        if (b.type === 'list')
          return (
            <ul className="wk-list" key={i}>
              {b.items.map((it, j) => (
                <li key={j}>{it}</li>
              ))}
            </ul>
          );
        if (b.type === 'media')
          return (
            <div className="wk-media" key={i}>
              <span aria-hidden="true">📷</span> <em>{b.caption || 'Image'} — coming soon</em>
            </div>
          );
        return null;
      })}
    </>
  );
}

export function SectionPanel({ section }: { section: WikiSection }) {
  return (
    <section className="wk-section" id={slugify(section.title)}>
      <div className="wk-section-head">
        {section.num && <span className="wk-num">{section.num}</span>}
        <div className="wk-section-titles">
          <h2 className="wk-section-title">{section.title}</h2>
          {section.subtitle && <div className="wk-section-sub">{section.subtitle}</div>}
        </div>
      </div>
      <div className="wk-body">
        <Blocks blocks={section.blocks} />
      </div>
    </section>
  );
}

export function SectionNav({ sections }: { sections: WikiSection[] }) {
  if (sections.length < 3) return null;
  const go = (title: string) => {
    const el = document.getElementById(slugify(title));
    if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 90, behavior: 'smooth' });
  };
  return (
    <nav className="toc-sidebar" aria-label="Sections">
      <div className="toc-label">Sections</div>
      <ol className="toc-list">
        {sections.map((s, i) => (
          <li className="toc-item" key={i}>
            <button type="button" className="toc-link" onClick={() => go(s.title)}>
              {s.num && <b style={{ color: 'var(--g2)', marginRight: 6 }}>{s.num}</b>}
              {s.title}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export function CardGrid({ children, min = 230 }: { children: ReactNode; min?: number }) {
  return (
    <div className="wk-card-grid" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${min}px, 1fr))` }}>
      {children}
    </div>
  );
}

/** Page scaffold: breadcrumb + hero + (custom children OR default section panels) + section nav. */
export function WikiScaffold({
  data,
  category,
  children,
}: {
  data: WikiPageData;
  category?: string;
  children?: ReactNode;
}) {
  const cat = category ?? autoCategory(data.slug);
  const useToc = !children && data.sections.length >= 3;
  return (
    <div className="container">
      <WikiBreadcrumb category={cat} title={data.title} />
      <WikiHero data={data} />
      <div className={useToc ? 'wiki-page-body wiki-page-body--toc' : 'wiki-page-body'}>
        <div className="wiki-page-content">
          {children ?? data.sections.map((s, i) => <SectionPanel key={i} section={s} />)}
        </div>
        {useToc && <SectionNav sections={data.sections} />}
      </div>
    </div>
  );
}

/** The simplest dedicated page: faithful hero + numbered sections + tables + nav. */
export function DefaultWikiPage({ slug }: { slug: string }) {
  const data = WIKI_PAGE_DATA[slug];
  if (!data) return null;
  return <WikiScaffold data={data} />;
}
