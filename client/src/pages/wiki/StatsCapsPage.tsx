import { WIKI_PAGE_DATA, WikiScaffold, SectionPanel, CardGrid, slugify } from './_shared';

/** Color accent per stat category, using existing palette variables. */
const CAT_COLOR: Record<string, string> = {
  Offensive: 'var(--red)',
  Defensive: 'var(--blue)',
  Support: 'var(--teal)',
};

export function StatsCapsPage() {
  const data = WIKI_PAGE_DATA['stats-caps'];
  const [catSection, ...rest] = data.sections;
  const firstBlock = catSection?.blocks[0];
  const categories = firstBlock && firstBlock.type === 'table' ? firstBlock.rows : [];

  return (
    <WikiScaffold data={data}>
      {/* Section 01 — stat categories as colour-coded cards */}
      {catSection && (
        <section className="wk-section" id={slugify(catSection.title)}>
          <div className="wk-section-head">
            {catSection.num && <span className="wk-num">{catSection.num}</span>}
            <div className="wk-section-titles">
              <h2 className="wk-section-title">{catSection.title}</h2>
              {catSection.subtitle && <div className="wk-section-sub">{catSection.subtitle}</div>}
            </div>
          </div>
          <CardGrid min={260}>
            {categories.map(([category, stats]) => {
              const color = CAT_COLOR[category] ?? 'var(--g2)';
              const list = stats.replace(/\.$/, '').split(/,\s*/).filter(Boolean);
              return (
                <div className="wk-card" key={category} style={{ borderLeft: `3px solid ${color}` }}>
                  <div className="wk-card-title" style={{ color }}>{category}</div>
                  <div className="wk-pill-row">
                    {list.map((s) => (
                      <span className="wk-pill" key={s}>{s}</span>
                    ))}
                  </div>
                </div>
              );
            })}
          </CardGrid>
        </section>
      )}

      {/* Remaining sections — base stat effects table, cap interface, cap sources */}
      {rest.map((s, i) => (
        <SectionPanel key={i} section={s} />
      ))}
    </WikiScaffold>
  );
}
