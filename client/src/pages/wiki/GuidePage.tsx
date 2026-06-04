import { Link } from 'react-router-dom';
import { WikiBreadcrumb, autoCategory } from './_shared';
import { GUIDES } from './guides-data';

export function GuidePage({ slug }: { slug: string }) {
  const guide = GUIDES[slug];
  if (!guide) return null;

  return (
    <div className="container">
      <WikiBreadcrumb category={autoCategory(slug) === 'Reference' ? 'Guides' : autoCategory(slug)} title={guide.title} />

      <header className="wk-hero">
        <div className="eyebrow">{guide.eyebrow}</div>
        <h1 className="page-title">{guide.title}</h1>
        <p className="lead">{guide.lead}</p>
        {guide.stats.length > 0 && (
          <div className="wk-statgrid">
            {guide.stats.map((s, i) => (
              <div className="wk-stat" key={i}>
                <span>{s.label}</span>
                <b>{s.value}</b>
              </div>
            ))}
          </div>
        )}
      </header>

      {guide.stages.map((stage, si) => (
        <section className="wk-section" key={si}>
          <div className="wk-section-head">
            <span className="wk-num">{stage.num}</span>
            <div className="wk-section-titles">
              <h2 className="wk-section-title">{stage.title}</h2>
            </div>
          </div>
          <div className="wk-body">
            {stage.blurb && <p className="wk-p">{stage.blurb}</p>}
            <div className="wk-card-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
              {stage.links.map((l) => (
                <Link className="wk-card hover guide-link" to={l.to} key={l.to}>
                  <div className="wk-card-title">{l.label}</div>
                  <div className="wk-card-text">{l.hint}</div>
                  <span className="guide-link-cta">Open →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
