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
import { CompanionsPage } from './CompanionsPage';
import { StatsCapsPage } from './StatsCapsPage';
import { TalentTreePage } from './TalentTreePage';
import { VocationTraitsPage } from './VocationTraitsPage';
import { GlyphsPage } from './GlyphsPage';
import { ArtifactsPage } from './ArtifactsPage';
import { SoulShardsPage } from './SoulShardsPage';
import { EquipmentPage } from './EquipmentPage';
import { EquipmentEnhancementPage } from './EquipmentEnhancementPage';
import { DungeonsPage } from './DungeonsPage';
import { HuntingZonesPage } from './HuntingZonesPage';
import { ProfessionsPage } from './ProfessionsPage';

export interface DedicatedWikiRoute {
  paths: string[];
  element: ReactElement;
}

export const DEDICATED_WIKI_ROUTES: DedicatedWikiRoute[] = [
  { paths: ['/wiki/promotions', '/promotions'], element: <PromotionsPage /> },
  { paths: ['/wiki/prestige', '/prestige'], element: <PrestigePage /> },
  { paths: ['/wiki/awakening', '/awakening'], element: <AwakeningPage /> },
  { paths: ['/wiki/feats', '/feats'], element: <FeatsPage /> },
  { paths: ['/wiki/companions', '/companions'], element: <CompanionsPage /> },
  { paths: ['/wiki/stats-caps', '/stats-caps'], element: <StatsCapsPage /> },
  { paths: ['/wiki/talent-tree', '/talent-tree'], element: <TalentTreePage /> },
  { paths: ['/wiki/vocation-traits', '/vocation-traits'], element: <VocationTraitsPage /> },
  { paths: ['/wiki/glyphs', '/glyphs'], element: <GlyphsPage /> },
  { paths: ['/wiki/artifacts', '/artifacts'], element: <ArtifactsPage /> },
  { paths: ['/wiki/soul-shards', '/soul-shards'], element: <SoulShardsPage /> },
  { paths: ['/wiki/equipment-index', '/wiki/equipment', '/equipment'], element: <EquipmentPage /> },
  { paths: ['/wiki/gear-enhancements', '/wiki/equipment-enhancement', '/equipment-enhancement'], element: <EquipmentEnhancementPage /> },
  { paths: ['/wiki/dungeons', '/dungeons'], element: <DungeonsPage /> },
  { paths: ['/wiki/hunting-zones', '/hunting-zones'], element: <HuntingZonesPage /> },
  { paths: ['/wiki/professions', '/professions'], element: <ProfessionsPage /> },
];
