/**
 * Registry of dedicated wiki page components. Each entry maps one or more route
 * paths to a bespoke React page that overrides the generic Markdown renderer.
 * App.tsx renders these ABOVE the catch-all `/wiki/:slug` route so they win.
 *
 * `paths` lists every URL the page should answer to — the canonical DB slug
 * (`/wiki/<slug>`) plus any friendly aliases (`/<slug>`).
 */
import { type ReactElement } from 'react';
import { PromotionsPage } from './PromotionsPage';
import { PrestigePage } from './PrestigePage';
import { AwakeningPage } from './AwakeningPage';
import { FeatsPage } from './FeatsPage';

export interface DedicatedWikiRoute {
  paths: string[];
  element: ReactElement;
}

export const DEDICATED_WIKI_ROUTES: DedicatedWikiRoute[] = [
  { paths: ['/wiki/promotions', '/promotions'], element: <PromotionsPage /> },
  { paths: ['/wiki/prestige', '/prestige'], element: <PrestigePage /> },
  { paths: ['/wiki/awakening', '/awakening'], element: <AwakeningPage /> },
  { paths: ['/wiki/feats', '/feats'], element: <FeatsPage /> },
];
