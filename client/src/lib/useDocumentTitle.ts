import { useEffect } from 'react';

const SITE = 'Archlight Wiki';

/**
 * Set the browser-tab title for the current page while mounted, restoring the
 * site title on unmount. This is the client-side, human-facing complement to the
 * server-side OG injection: server tags are for crawlers on the initial HTML;
 * this updates the tab as users navigate the SPA (no server round-trip).
 *
 * Pass a falsy title to keep the plain site title (sensible default).
 */
export function useDocumentTitle(title?: string | null): void {
  useEffect(() => {
    document.title = title ? `${title} — ${SITE}` : SITE;
    return () => {
      document.title = SITE;
    };
  }, [title]);
}
