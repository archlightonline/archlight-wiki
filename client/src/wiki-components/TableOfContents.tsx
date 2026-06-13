/**
 * Sticky in-page table of contents.
 *
 * Usage: pass the page content (either legacy Markdown OR editor-saved HTML —
 * the parser handles both). The component renders nothing if fewer than 3
 * headings are found, is hidden on mobile (<900px), and uses IntersectionObserver
 * to track the active heading as the user scrolls.
 *
 * Anchor links work because lib/markdown.ts injects matching slug `id`s onto the
 * rendered <h2>/<h3> using the same logic this parser uses (lib/headings.ts).
 */
import { useEffect, useRef, useState } from 'react';
import { parseHeadings, type TocEntry } from '../lib/headings';

// Re-exported for existing importers (e.g. WikiPage). The parser now extracts
// headings from both Markdown (`## `) and editor-saved HTML (`<h2>`).
export type { TocEntry };
export const parseTocEntries = parseHeadings;

export function TableOfContents({ content }: { content: string }) {
  const entries = parseTocEntries(content);
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
  }, [content]);

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
