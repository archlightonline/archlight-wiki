import { describe, it, expect } from 'vitest';
import { cleanPastedHtml } from '../client/src/components/pasteCleanup';

/**
 * transformPastedHTML cleanup: strip inline styles + empty <span>/<p> wrappers,
 * but preserve real content and structural tags. Conservative — pasted images
 * are untouched (R2-routing for pastes is a separate, deferred item).
 */
describe('cleanPastedHtml', () => {
  it('strips inline style attributes but keeps the tag and content', () => {
    expect(cleanPastedHtml('<p style="margin:0 0 10px;color:red">Hello</p>')).toBe('<p>Hello</p>');
    expect(cleanPastedHtml('<strong style="font-weight:700">Bold</strong>')).toBe('<strong>Bold</strong>');
  });

  it('handles single-quoted style attributes', () => {
    expect(cleanPastedHtml(`<span style='color:blue'>x</span>`)).toBe('<span>x</span>');
  });

  it('removes empty <span>/<p> wrappers (whitespace / nbsp / br only)', () => {
    expect(cleanPastedHtml('<p>real</p><p> </p>')).toBe('<p>real</p>'); // nbsp character
    expect(cleanPastedHtml('<p>real</p><p>&nbsp;</p>')).toBe('<p>real</p>'); // nbsp entity
    expect(cleanPastedHtml('<span>  </span><span>keep</span>')).toBe('<span>keep</span>');
    expect(cleanPastedHtml('<p><br></p>')).toBe('');
  });

  it('handles nested empty wrappers (after styles are stripped)', () => {
    expect(cleanPastedHtml('<p style="x"><span style="y">  </span></p>')).toBe('');
  });

  it('preserves real content and structural tags', () => {
    const html = '<h2 style="font-size:20px">Title</h2><ul><li>one</li><li>two</li></ul>';
    expect(cleanPastedHtml(html)).toBe('<h2>Title</h2><ul><li>one</li><li>two</li></ul>');
  });

  it('does not strip or alter pasted external images', () => {
    const img = '<img src="https://example.com/a.png" alt="a">';
    expect(cleanPastedHtml(img)).toBe(img);
  });

  it('keeps non-empty spans/paragraphs (only empties are removed)', () => {
    expect(cleanPastedHtml('<p>kept</p>')).toBe('<p>kept</p>');
    expect(cleanPastedHtml('<span>kept</span>')).toBe('<span>kept</span>');
  });
});
