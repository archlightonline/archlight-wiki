/**
 * The original Archlight sidebar navigation model (ported verbatim from
 * assets/js/navigation.js) — same groups, labels, icons and order. Many items
 * point to concept/design-lab pages that are Phase-2; those routes 404
 * gracefully (the themed 404 offers Browse + Search), matching Phase-1 behavior.
 */
export interface NavItemDef {
  id: string;
  icon: string;
  title: string;
}
export interface NavGroup {
  label: string;
  adminOnly?: boolean;
  items: NavItemDef[];
}

export const SIDEBAR_GROUPS: NavGroup[] = [
  { label: 'Basics', items: [{ id: 'home', icon: '🏠', title: 'Home' }] },
  {
    label: 'Guides',
    items: [
      { id: 'new-player-guide', icon: '🧭', title: 'New Player Guide' },
      { id: 'advanced-player-guide', icon: '📘', title: 'Advanced Player Guide' },
      { id: 'endgame-guide', icon: '⚔️', title: 'Endgame Guide' },
    ],
  },
  { label: 'Community', items: [{ id: 'contribute', icon: '✦', title: 'Contribute' }] },
  {
    label: 'Progression',
    items: [
      { id: 'progression-gates', icon: '🚪', title: 'Unlocks & Tasks' },
      { id: 'quests', icon: '📜', title: 'Quests' },
    ],
  },
  {
    label: 'Classes',
    items: [
      { id: 'classes', icon: '⚔️', title: 'Classes' },
      { id: 'promotions', icon: '⬆️', title: 'Promotions' },
      { id: 'prestige', icon: '🌟', title: 'Prestige' },
      { id: 'awakening', icon: '🔥', title: 'Awakening' },
      { id: 'feats', icon: '🏅', title: 'Feats' },
      { id: 'companions', icon: '🐾', title: 'Companions' },
    ],
  },
  {
    label: 'Power',
    items: [
      { id: 'stats-caps', icon: '📊', title: 'Stats & Caps' },
      { id: 'talent-tree', icon: '🌳', title: 'Talent Tree' },
      { id: 'vocation-traits', icon: '🧬', title: 'Vocation Traits' },
      { id: 'stat-nodes', icon: '🔹', title: 'Stat Nodes' },
      { id: 'glyphs', icon: '🔮', title: 'Glyphs' },
      { id: 'artifacts', icon: '🏺', title: 'Artifacts' },
      { id: 'soul-shards', icon: '💠', title: 'Soul Shards' },
      { id: 'training', icon: '🥋', title: 'Training' },
      { id: 'bestiary', icon: '🐉', title: 'Bestiary' },
    ],
  },
  {
    label: 'Equipment',
    items: [
      { id: 'equipment-index', icon: '🎒', title: 'Equipment' },
      { id: 'gear-enhancements', icon: '🛠️', title: 'Equipment Enhancement' },
    ],
  },
  {
    label: 'Content',
    items: [
      { id: 'events-hub', icon: '🎉', title: 'Events Hub' },
      { id: 'hunting-zones', icon: '🗺️', title: 'Hunting Zones' },
      { id: 'dailies', icon: '☀️', title: 'Dailies' },
      { id: 'endless-abyss', icon: '🕳️', title: 'Endless Abyss' },
      { id: 'dimensions', icon: '🌀', title: 'Dimensions' },
      { id: 'rifts', icon: '🌫️', title: 'Rifts' },
      { id: 'wargates', icon: '🚪', title: 'Wargates' },
      { id: 'dungeons', icon: '🏰', title: 'Dungeons & Ramparts' },
      { id: 'secret-maps', icon: '🗺️', title: 'Secret Maps' },
      { id: 'bounties', icon: '🎯', title: 'Bounties' },
      { id: 'monsters', icon: '👹', title: 'Monsters & Loot' },
      { id: 'bosses', icon: '☠️', title: 'Bosses' },
      { id: 'prisons', icon: '⛓️', title: 'Prisons' },
      { id: 'ramparts', icon: '🧱', title: 'Ramparts' },
      { id: 'zaqors-tower', icon: '🗼', title: 'Zaqor’s Tower' },
    ],
  },
  { label: 'Professions', items: [{ id: 'professions', icon: '🛠️', title: 'Professions' }] },
  { label: 'Guilds', items: [{ id: 'guilds', icon: '🏯', title: 'Guilds' }] },
  {
    label: 'Rewards',
    items: [
      { id: 'archpass-rewards', icon: '🎫', title: 'ArchPass' },
      { id: 'challenges-pass', icon: '🎟️', title: 'Challenges Pass' },
      { id: 'achievements', icon: '🏆', title: 'Achievements' },
      { id: 'race-points', icon: '🏁', title: 'Race Points' },
      { id: 'roulette', icon: '🎰', title: 'Roulette & Loot Crates' },
      { id: 'living-token-trader', icon: '🪙', title: 'Living Token Trader' },
      { id: 'cosmetic-bonus-sharing', icon: '🪞', title: 'Cosmetic Bonus Sharing' },
      { id: 'boosts-blessing', icon: '🙏', title: 'Blessings & Boosts' },
    ],
  },
  {
    label: 'Tools',
    items: [
      { id: 'addons', icon: '🎨', title: 'Addons' },
      { id: 'heirloom-cross-linking', icon: '🔗', title: 'Heirloom / Cross Linking' },
      { id: 'cinematic-carousel-engine', icon: '🎞️', title: 'Cinematic Carousel Engine' },
    ],
  },
  { label: 'Updates', items: [{ id: 'updates', icon: '📰', title: 'Updates & Patch Notes' }] },
  { label: 'Index', items: [{ id: 'all-pages', icon: '🗂️', title: 'All Pages' }] },
  { label: 'Admin Tools', adminOnly: true, items: [{ id: 'admin', icon: '🛡️', title: 'Admin Panel' }] },
];

/** Map a nav id to a real route. Special-cases the hubs; content pages -> /wiki/<id>. */
export function navRoute(id: string): string {
  switch (id) {
    case 'home':
      return '/';
    case 'all-pages':
      return '/browse';
    case 'updates':
      return '/category/Updates';
    case 'admin':
      return '/admin';
    case 'contribute':
      return '/contribute';
    default:
      return `/wiki/${id}`;
  }
}

/** The live worlds shown in the topbar selector (from updates-data worlds). */
export const WORLDS = [
  { id: 'abaldar', name: 'Abaldar', icon: '⚔️', status: 'LIVE', tone: 'live' as const },
  { id: 'legacy', name: 'Legacy', icon: '🕯️', status: 'OFFLINE', tone: 'offline' as const },
  { id: 'hardcore', name: 'Hardcore', icon: '🔥', status: 'MAINT', tone: 'maint' as const },
];
