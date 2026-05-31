/**
 * Sticky in-page table of contents — parsed from the Markdown source.
 *
 * Usage: pass the raw Markdown string. The component renders nothing if fewer
 * than 3 headings are found, is hidden on mobile (<900px), and uses
 * IntersectionObserver to track the active heading as the user scrolls.
 *
 * Important: to make anchor links work, heading elements need matching `id`
 * attributes. Call `addHeadingIds(markdown)` before passing content to the
 * `<Markdown>` renderer (see WikiPage.tsx), or use the patched renderer in
 * `lib/markdown.ts`.
 */
import { useEffect, useRef, useState } from 'react';

export interface TocEntry {
  id: string;
  text: string;
  level: 2 | 3;
}

/** Parse ## and ### headings from raw Markdown. */
export function parseTocEntries(markdown: string): TocEntry[] {
  const entries: TocEntry[] = [];
  const seen = new Map<string, number>();
  for (const line of markdown.split('\n')) {
    const m = line.match(/^(#{2,3})\s+(.+)/);
    if (!m) continue;
    const level = m[1].length as 2 | 3;
    const text = m[2].trim().replace(/\*\*?|__?|`/g, '');
    const base = text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '');
    const count = (seen.get(base) ?? 0) + 1;
    seen.set(base, count);
    const id = count > 1 ? `${base}-${count}` : base;
    entries.push({ id, text, level });
  }
  return entries;
}

export function TableOfContents({ markdown }: { markdown: string }) {
  const entries = parseTocEntries(markdown);
  const [activeId, setActiveId] = useState<string>('');
  const observerRef = useRef<IntersectionObserver | null>(null);

  // Fewer than 3 headings → don't render.
  if (entries.length < 3) return null;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // IntersectionObserver to highlight the top-most visible heading.
    const headings = document.querySelectorAll<HTMLElement>('.prose h2[id], .prose h3[id]');
    if (!headings.length) return;

    const map = new Map<string, number>();
    observerRef.current?.disconnect();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          map.set(e.target.id, e.intersectionRatio);
        }
        // Pick the heading with the highest intersection ratio that's in view
        let best = '';
        let bestRatio = -1;
        for (const [id, ratio] of map) {
          if (ratio > bestRatio) { bestRatio = ratio; best = id; }
        }
        // If nothing is intersecting, pick the last heading scrolled past
        if (!best) {
          const scrollY = window.scrollY;
          let closest = '';
          let closestDist = Infinity;
          headings.forEach((h) => {
            const d = Math.abs(h.getBoundingClientRect().top);
            if (d < closestDist) { closestDist = d; closest = h.id; }
          });
          best = closest;
        }
        if (best) setActiveId(best);
      },
      { rootMargin: '-10% 0px -75% 0px', threshold: [0, 0.25, 0.5, 1] },
    );
    headings.forEach((h) => observerRef.current!.observe(h));
    return () => observerRef.current?.disconnect();
  }, [markdown]);

  const scroll = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 90; // topbar offset
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  return (
    <nav className="toc-sidebar" aria-label="Table of contents">
      <div className="toc-label">On this page</div>
      <ol className="toc-list">
        {entries.map((e) => (
          <li key={e.id} className={`toc-item${e.level === 3 ? ' toc-sub' : ''}${activeId === e.id ? ' toc-active' : ''}`}>
            <button type="button" className="toc-link" onClick={() => scroll(e.id)}>
              {e.text}
            </button>
          </li>
        ))}
      </ol>
    </nav>
  );
}
