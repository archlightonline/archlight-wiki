/**
 * Curated orientation guides. Unlike the other wiki pages these have no single
 * source document — they are navigational roadmaps that point players at the
 * dedicated system pages in the right order. Every link target is a real page
 * in this wiki; the blurbs only summarise what those pages already document.
 */
export interface GuideLink {
  to: string;
  label: string;
  hint: string;
}
export interface GuideStage {
  num: string;
  title: string;
  blurb: string;
  links: GuideLink[];
}
export interface GuideConfig {
  slug: string;
  title: string;
  eyebrow: string;
  lead: string;
  stats: { label: string; value: string }[];
  stages: GuideStage[];
}

export const GUIDES: Record<string, GuideConfig> = {
  'new-player-guide': {
    slug: 'new-player-guide',
    title: 'New Player Guide',
    eyebrow: 'Guides',
    lead: 'A starting roadmap for Archlight — pick a class, start leveling, gear up, and plug into the daily systems that drive early progression.',
    stats: [
      { label: 'Audience', value: 'New players' },
      { label: 'Format', value: 'Orientation' },
      { label: 'Stages', value: '5' },
    ],
    stages: [
      {
        num: '01',
        title: 'Pick Your Path',
        blurb: 'Choose a class that fits how you like to play, then learn what your core stats actually do.',
        links: [
          { to: '/wiki/classes', label: 'Classes', hint: '15 classes across damage, healing, and support roles' },
          { to: '/wiki/stats-caps', label: 'Stats & Caps', hint: 'What each offensive, defensive, and support stat does' },
        ],
      },
      {
        num: '02',
        title: 'Start Leveling',
        blurb: 'Build a steady hunting loop and stack tasks while you run dungeons for boxes and points.',
        links: [
          { to: '/wiki/hunting-zones', label: 'Hunting Zones', hint: 'Portal hunting and stacking monster-hunter tasks' },
          { to: '/wiki/dungeons', label: 'Dungeons', hint: 'Solo, greater, and golden instances with daily resets' },
        ],
      },
      {
        num: '03',
        title: 'Gear Up',
        blurb: 'Equip weapons and accessories for your vocation, then start upgrading them with stones and gems.',
        links: [
          { to: '/wiki/equipment', label: 'Equipment', hint: 'Weapon families, accessories, relics, and Olympus gear' },
          { to: '/wiki/equipment-enhancement', label: 'Equipment Enhancements', hint: 'Upgrade stones, soul runes, enchantments, and gems' },
        ],
      },
      {
        num: '04',
        title: 'Daily Progress',
        blurb: 'Lock in the recurring reward tracks and start a profession for passive value.',
        links: [
          { to: '/wiki/archpass', label: 'Archpass', hint: 'Seasonal mission reward track with premium lanes' },
          { to: '/wiki/professions', label: 'Professions', hint: 'Gather and craft across 11 profession paths' },
        ],
      },
      {
        num: '05',
        title: 'Play Together',
        blurb: 'Join a guild for group content and collect companions along the way.',
        links: [
          { to: '/wiki/guilds', label: 'Guilds', hint: 'Nodes, guild islands, and siege' },
          { to: '/wiki/companions', label: 'Companions', hint: 'Collectible reward and utility companions' },
        ],
      },
    ],
  },

  'advanced-player-guide': {
    slug: 'advanced-player-guide',
    title: 'Advanced Player Guide',
    eyebrow: 'Guides',
    lead: 'Once the basics click, power comes from deepening your build, optimising every gear layer, and hitting the progression milestones that gate late content.',
    stats: [
      { label: 'Audience', value: 'Mid-game' },
      { label: 'Format', value: 'Optimisation' },
      { label: 'Stages', value: '4' },
    ],
    stages: [
      {
        num: '01',
        title: 'Deepen Your Build',
        blurb: 'Spend talent points, lean into your vocation identity, and socket glyphs for extra power.',
        links: [
          { to: '/wiki/talent-tree', label: 'Talent Tree', hint: 'Shared tree with notable slots and vocation depth' },
          { to: '/wiki/vocation-traits', label: 'Vocation Traits', hint: 'Always-active passives that define each role' },
          { to: '/wiki/glyphs', label: 'Glyphs', hint: 'Power sockets connected to character builds' },
        ],
      },
      {
        num: '02',
        title: 'Optimise Your Gear',
        blurb: 'Layer soul shards, push enhancement tiers, and start your artifact unlocks.',
        links: [
          { to: '/wiki/soul-shards', label: 'Soul Shards', hint: 'Equip up to 3, combine duplicates for higher tiers' },
          { to: '/wiki/equipment-enhancement', label: 'Equipment Enhancements', hint: 'Gems, regrades, and diminishing returns' },
          { to: '/wiki/artifacts', label: 'Artifacts', hint: 'Power layer tied to feats and raid bosses' },
        ],
      },
      {
        num: '03',
        title: 'Hit Milestones',
        blurb: 'Awakening, feats, and promotions are the long-term progression gates worth planning around.',
        links: [
          { to: '/wiki/awakening', label: 'Awakening', hint: 'Core post-level progression layer' },
          { to: '/wiki/feats', label: 'Feats', hint: 'Complete feats to unlock artifacts' },
          { to: '/wiki/promotions', label: 'Promotions', hint: 'Promotion-token advancement path' },
        ],
      },
      {
        num: '04',
        title: 'Farm Efficiently',
        blurb: 'Tighten your hunting routes and use professions to fund the rest of your progression.',
        links: [
          { to: '/wiki/hunting-zones', label: 'Hunting Zones', hint: 'Tier 1-3 task lists and portal routes' },
          { to: '/wiki/professions', label: 'Professions', hint: 'Gathering and crafting income loops' },
        ],
      },
    ],
  },

  'endgame-guide': {
    slug: 'endgame-guide',
    title: 'Endgame Guide',
    eyebrow: 'Guides',
    lead: 'Endgame is about prestige scaling, raid bosses, and chasing best-in-slot gear. These are the systems that keep mattering after the main grind.',
    stats: [
      { label: 'Audience', value: 'Endgame' },
      { label: 'Format', value: 'Roadmap' },
      { label: 'Stages', value: '4' },
    ],
    stages: [
      {
        num: '01',
        title: 'Prestige Path',
        blurb: 'Prestige and awakening drive the long tail of character power past the level grind.',
        links: [
          { to: '/wiki/prestige', label: 'Prestige', hint: 'Optional milestone every 500 levels' },
          { to: '/wiki/awakening', label: 'Awakening', hint: 'The main level reference for prestige' },
        ],
      },
      {
        num: '02',
        title: 'Raid & Artifacts',
        blurb: 'Raid boss dungeons feed raid points and the artifact level path.',
        links: [
          { to: '/wiki/dungeons', label: 'Raid Boss Dungeons', hint: 'Kraken, Sarandiel, Forgemaster, and raid points' },
          { to: '/wiki/artifacts', label: 'Artifacts', hint: 'Level up through feats and raid boss kills' },
          { to: '/wiki/feats', label: 'Feats', hint: 'Every 5 feats unlocks an artifact choice' },
        ],
      },
      {
        num: '03',
        title: 'Best-in-Slot Gear',
        blurb: 'Chase Olympus weapons and max out every enhancement layer on top of them.',
        links: [
          { to: '/wiki/equipment', label: 'Equipment', hint: 'Olympus weapons ~15% stronger, soulbound' },
          { to: '/wiki/soul-shards', label: 'Soul Shards', hint: 'Highest-tier shard bonuses and enchantments' },
          { to: '/wiki/glyphs', label: 'Glyphs', hint: 'Two active glyphs with rarity rolling' },
        ],
      },
      {
        num: '04',
        title: 'Long-Term Goals',
        blurb: 'Promotions and guild siege are the prestige goals that keep going.',
        links: [
          { to: '/wiki/promotions', label: 'Promotions', hint: 'Promotion-token advancement milestones' },
          { to: '/wiki/guilds', label: 'Guild Siege', hint: '13 statues and the 12-hour claim lock' },
        ],
      },
    ],
  },
};
