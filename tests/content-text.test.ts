import { describe, it, expect } from 'vitest';
import { toComparableText } from '../client/src/lib/contentText';
import { lineDiff } from '../client/src/lib/diff';

/**
 * The review-queue diff hinges on this normalizer: a contribution's HTML and a
 * legacy page's Markdown must collapse to the SAME comparable plain text, so a
 * small edit yields a clean add/del — not whole-document churn over markup.
 */
describe('toComparableText', () => {
  it('normalizes HTML to per-block plain text (one line per block)', () => {
    expect(toComparableText('<h2>Title</h2><p>Hello world</p>')).toBe('Title\nHello world');
  });

  it('normalizes Markdown to the SAME plain text as the equivalent HTML', () => {
    const fromHtml = toComparableText('<h2>Title</h2><p>Hello world</p>');
    const fromMarkdown = toComparableText('## Title\n\nHello world');
    expect(fromMarkdown).toBe(fromHtml); // HTML/Markdown mismatch resolved
    expect(fromMarkdown).toBe('Title\nHello world');
  });

  it('splits list items onto their own lines for both formats', () => {
    expect(toComparableText('<ul><li>one</li><li>two</li></ul>')).toBe('one\ntwo');
    expect(toComparableText('- one\n- two')).toBe('one\ntwo');
  });

  it('decodes entities and drops tag noise / blank lines', () => {
    expect(toComparableText('<p>Tom &amp; Jerry</p>')).toBe('Tom & Jerry');
    expect(toComparableText('<p></p><p>Real</p><p>  </p>')).toBe('Real');
  });

  it('a small edit (current Markdown vs proposed HTML) diffs cleanly, not whole-doc churn', () => {
    const current = '## Guide\n\nStep one\n\nStep two';
    const proposed = '<h2>Guide</h2><p>Step one</p><p>Step two updated</p>';

    const ops = lineDiff(toComparableText(current), toComparableText(proposed));
    const dels = ops.filter((o) => o.type === 'del');
    const adds = ops.filter((o) => o.type === 'add');
    const ctx = ops.filter((o) => o.type === 'ctx');

    // Only the changed line is added/removed; the rest is unchanged context.
    expect(dels).toEqual([{ type: 'del', text: 'Step two' }]);
    expect(adds).toEqual([{ type: 'add', text: 'Step two updated' }]);
    expect(ctx.map((o) => o.text)).toEqual(['Guide', 'Step one']);
  });

  it('identical content (Markdown current vs HTML proposed) yields a churn-free diff', () => {
    const current = '## A\n\nB';
    const proposed = '<h2>A</h2><p>B</p>';
    const ops = lineDiff(toComparableText(current), toComparableText(proposed));
    expect(ops.every((o) => o.type === 'ctx')).toBe(true);
  });
});
