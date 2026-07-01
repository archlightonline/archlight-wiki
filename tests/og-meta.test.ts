import { describe, it, expect } from 'vitest';
import { metaDescription } from '../server/lib/metaDescription';
import { escapeHtml, firstImageUrl, absoluteUrl, buildMetaTags, injectMeta } from '../server/lib/ogMeta';

describe('metaDescription', () => {
  it('strips Markdown to a clean plain-text snippet', () => {
    const md = '# Heading\n\nSome **bold** and _italic_ and a [link](https://x.test) and `code`.';
    const out = metaDescription(md);
    expect(out).toBe('Heading Some bold and italic and a link and code.');
    expect(out).not.toMatch(/[#*_`[\]]/);
  });

  it('strips HTML tags and images', () => {
    const html = '<h2>Title</h2><p>First para with an <img src="/a.png"> image and <a href="/x">a link</a>.</p>';
    expect(metaDescription(html)).toBe('Title First para with an image and a link.');
  });

  it('truncates to ~160 chars at a word boundary with an ellipsis', () => {
    const long = 'word '.repeat(80).trim(); // 400 chars of "word word …"
    const out = metaDescription(long);
    expect(out.length).toBeLessThanOrEqual(161); // 160 + ellipsis, boundary-trimmed
    expect(out.endsWith('…')).toBe(true);
    expect(out).not.toMatch(/\s…$/); // trailing space trimmed before ellipsis
  });

  it('returns short content unchanged (no ellipsis)', () => {
    expect(metaDescription('Just a short line.')).toBe('Just a short line.');
  });
});

describe('escapeHtml', () => {
  it('escapes the five attribute-breaking characters', () => {
    expect(escapeHtml(`Tom & "Jerry" <b>'x'</b>`)).toBe('Tom &amp; &quot;Jerry&quot; &lt;b&gt;&#39;x&#39;&lt;/b&gt;');
  });
});

describe('firstImageUrl', () => {
  it('finds an HTML <img src>', () => {
    expect(firstImageUrl('<p>hi</p><img src="https://cdn.test/a.png"> more')).toBe('https://cdn.test/a.png');
  });
  it('finds a Markdown image', () => {
    expect(firstImageUrl('text ![alt](/media/b.jpg) text')).toBe('/media/b.jpg');
  });
  it('returns null when there is no image', () => {
    expect(firstImageUrl('just words, no images')).toBeNull();
  });
});

describe('absoluteUrl', () => {
  it('passes through absolute URLs and resolves relative ones', () => {
    expect(absoluteUrl('https://s.test', 'https://cdn.test/a.png')).toBe('https://cdn.test/a.png');
    expect(absoluteUrl('https://s.test', '/media/b.png')).toBe('https://s.test/media/b.png');
    expect(absoluteUrl('https://s.test', 'media/b.png')).toBe('https://s.test/media/b.png');
  });
});

describe('buildMetaTags', () => {
  it('includes og:type=article and twitter summary_large_image', () => {
    const tags = buildMetaTags({ title: 'T', description: 'D', url: 'https://s.test/wiki/t', image: 'https://s.test/og-default.png' });
    expect(tags).toContain('property="og:type" content="article"');
    expect(tags).toContain('name="twitter:card" content="summary_large_image"');
    expect(tags).toContain('property="og:title" content="T"');
  });
});

describe('injectMeta — escaping a hostile title (the critical security point)', () => {
  const TEMPLATE = `<!doctype html><html><head>
    <meta name="description" content="Archlight Wiki — generic." />
    <title>Archlight Wiki</title>
  </head><body><div id="root"></div></body></html>`;

  it('escapes a title containing "><script> so it cannot break out or inject markup', () => {
    const evil = '"><script>alert(document.cookie)</script>';
    const html = injectMeta(TEMPLATE, {
      title: evil,
      description: evil,
      url: 'https://s.test/wiki/x',
      image: 'https://s.test/og-default.png',
    });

    // No raw <script> anywhere in the output — the payload is fully escaped.
    expect(html).not.toContain('<script>');
    expect(html).toContain('&lt;script&gt;');
    // The attribute-breaking quote is escaped, so it can't close the content="" .
    expect(html).toContain('&quot;&gt;&lt;script&gt;');
    // og:title carries the escaped value.
    expect(html).toContain('property="og:title" content="&quot;&gt;&lt;script&gt;');
  });

  it('rewrites <title> and removes the default description (no duplicate)', () => {
    const html = injectMeta(TEMPLATE, { title: 'My Page', description: 'A snippet.', url: 'https://s.test/wiki/my', image: 'https://s.test/og-default.png' });
    expect(html).toContain('<title>My Page — Archlight Wiki</title>');
    expect(html).not.toContain('Archlight Wiki — generic.'); // old default description gone
    expect(html).toContain('property="og:url" content="https://s.test/wiki/my"');
    // Exactly one description meta remains.
    expect(html.match(/name="description"/g)?.length).toBe(1);
  });
});
