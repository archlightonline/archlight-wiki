import { WIKI_PAGE_DATA, WikiScaffold, SectionPanel, Blocks, slugify, type WikiBlock } from './_shared';

/** Map an equipment tier (1-8) to a palette colour: common → legendary. */
function tierColor(tier: string): string {
  const t = parseInt(tier, 10);
  if (Number.isNaN(t)) return 'var(--tx2)';
  if (t >= 8) return 'var(--amber)';
  if (t >= 7) return 'var(--plum)';
  if (t >= 5) return 'var(--blue)';
  if (t >= 3) return 'var(--teal)';
  return 'var(--tx3)';
}

/** Weapon reference table with colour-coded tier badges and bold item names. */
function WeaponTable({ headers, rows }: { headers: string[]; rows: string[][] }) {
  const tierIdx = headers.findIndex((h) => /^tier$/i.test(h));
  return (
    <div className="table-wrap">
      <table className="wtbl">
        <thead>
          <tr>{headers.map((h, i) => <th key={i}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              {r.map((c, j) => {
                if (j === tierIdx) {
                  return (
                    <td key={j}>
                      <span className="wk-tier" style={{ color: tierColor(c) }}>T{c}</span>
                    </td>
                  );
                }
                return (
                  <td key={j} style={j === 0 ? { fontWeight: 600, color: 'var(--tx0)' } : undefined}>
                    {c}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EquipmentPage() {
  const data = WIKI_PAGE_DATA['equipment-index'];

  return (
    <WikiScaffold data={data}>
      {data.sections.map((section, si) => {
        // The Weapon Families section gets the tier-coloured custom table.
        const weaponTable =
          /weapon/i.test(section.title) ? section.blocks.find((b) => b.type === 'table') : undefined;

        if (weaponTable && weaponTable.type === 'table') {
          const intro = section.blocks.filter((b: WikiBlock) => b !== weaponTable);
          return (
            <section className="wk-section" id={slugify(section.title)} key={si}>
              <div className="wk-section-head">
                {section.num && <span className="wk-num">{section.num}</span>}
                <div className="wk-section-titles">
                  <h2 className="wk-section-title">{section.title}</h2>
                  {section.subtitle && <div className="wk-section-sub">{section.subtitle}</div>}
                </div>
              </div>
              <div className="wk-body">
                <Blocks blocks={intro} />
                <WeaponTable headers={weaponTable.headers} rows={weaponTable.rows} />
              </div>
            </section>
          );
        }

        return <SectionPanel key={si} section={section} />;
      })}
    </WikiScaffold>
  );
}
