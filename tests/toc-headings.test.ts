import { describe, it, expect } from 'vitest';
import {
  parseHeadings,
  addHeadingIdsToHtml,
  slugifyHeading,
  isHtmlContent,
} from '../client/src/lib/headings';

/**
 * The ToC must work for BOTH content formats the wiki now stores:
 *   - legacy Markdown patch notes (## / ###), and
 *   - editor-saved HTML pages (<h2> / <h3>).
 * And the parser's ids must MATCH the ids the renderer injects, or links won't
 * scroll. These tests cover both formats and that round-trip.
 */
describe('ToC heading parser — HTML and Markdown', () => {
  it('detects HTML vs Markdown content', () => {
    expect(isHtmlContent('<h2>Hi</h2>')).toBe(true);
    expect(isHtmlContent('  \n<p>x</p>')).toBe(true);
    expect(isHtmlContent('## Heading')).toBe(false);
    expect(isHtmlContent('Just text')).toBe(false);
  });

  it('parses HTML <h2>/<h3> headings into entries with slug ids', () => {
    const html =
      '<h2>Overview</h2><p>intro</p><h3>Sub Section</h3><h2>Rewards &amp; Loot</h2>';
    expect(parseHeadings(html)).toEqual([
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'sub-section', text: 'Sub Section', level: 3 },
      { id: 'rewards-loot', text: 'Rewards & Loot', level: 2 },
    ]);
  });

  it('strips inline formatting tags inside HTML headings', () => {
    const html = '<h2><strong>Bold</strong> Heading</h2><h3>Code <code>x()</code></h3>';
    expect(parseHeadings(html)).toEqual([
      { id: 'bold-heading', text: 'Bold Heading', level: 2 },
      { id: 'code-x', text: 'Code x()', level: 3 },
    ]);
  });

  it('still parses Markdown ## / ### headings', () => {
    const md = '## Overview\n\nsome text\n\n### Details\n#### too deep\n## Overview';
    expect(parseHeadings(md)).toEqual([
      { id: 'overview', text: 'Overview', level: 2 },
      { id: 'details', text: 'Details', level: 3 },
      // h4 ignored; duplicate "Overview" de-duplicates to overview-2
      { id: 'overview-2', text: 'Overview', level: 2 },
    ]);
  });

  it('de-duplicates repeated HTML headings the same way (foo, foo-2)', () => {
    const html = '<h2>Notes</h2><h2>Notes</h2><h2>Notes</h2>';
    expect(parseHeadings(html).map((e) => e.id)).toEqual(['notes', 'notes-2', 'notes-3']);
  });

  it('ROUND-TRIP: rendered heading ids match the ToC entry ids (HTML)', () => {
    const html = '<h2>Map Rarities</h2><h3>Common Map</h3><h2>Map Rarities</h2>';
    const entries = parseHeadings(html);
    const rendered = addHeadingIdsToHtml(html);
    for (const e of entries) {
      // every ToC id is present as an id="" on a rendered heading
      expect(rendered).toContain(`id="${e.id}"`);
    }
    expect(rendered).toBe(
      '<h2 id="map-rarities">Map Rarities</h2>' +
        '<h3 id="common-map">Common Map</h3>' +
        '<h2 id="map-rarities-2">Map Rarities</h2>',
    );
  });

  it('addHeadingIdsToHtml overwrites a stale id to stay aligned with the parser', () => {
    const html = '<h2 id="old">Fresh Title</h2>';
    expect(addHeadingIdsToHtml(html)).toBe('<h2 id="fresh-title">Fresh Title</h2>');
  });

  it('leaves non-heading HTML untouched and skips empty headings', () => {
    const html = '<p>para</p><h2></h2><h2>Real</h2>';
    expect(addHeadingIdsToHtml(html)).toBe('<p>para</p><h2></h2><h2 id="real">Real</h2>');
    expect(parseHeadings(html)).toEqual([{ id: 'real', text: 'Real', level: 2 }]);
  });

  it('slugifyHeading is stable and punctuation-safe', () => {
    expect(slugifyHeading('Boss Equipment Route')).toBe('boss-equipment-route');
    expect(slugifyHeading('Stats & Caps!')).toBe('stats-caps');
  });
});
