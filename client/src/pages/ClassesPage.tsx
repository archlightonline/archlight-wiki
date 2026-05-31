/**
 * Dedicated Classes page — roster grid + interactive SVG radar chart.
 * No external charting library required: the radar is drawn with plain SVG.
 *
 * Stat values are sourced from the original classes-concept-data.js design doc.
 * Axes: Damage · Survivability · Mobility · Utility · Healing · Complexity
 */
import { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';

// ── Data ──────────────────────────────────────────────────────────────────────
type StatAxes = 'Damage' | 'Survivability' | 'Mobility' | 'Utility' | 'Healing' | 'Complexity';
const AXES: StatAxes[] = ['Damage', 'Survivability', 'Mobility', 'Utility', 'Healing', 'Complexity'];

interface ClassDef {
  id: string;
  name: string;
  role: string;
  weapons: string;
  scaling: string;
  description: string;
  stats: Record<StatAxes, number>; // 0–10
}

const CLASSES: ClassDef[] = [
  {
    id: 'archer',
    name: 'Archer',
    role: 'Ranged Damage',
    weapons: 'Bow & Grip',
    scaling: 'Strength',
    description: 'Ranged weapon specialist raining fire from afar. High damage output with decent survivability.',
    stats: { Damage: 8, Survivability: 5, Mobility: 7, Utility: 4, Healing: 3, Complexity: 5 },
  },
  {
    id: 'bard',
    name: 'Bard',
    role: 'Support / Buffer',
    weapons: 'Sword & Wand',
    scaling: 'Intelligence',
    description: 'Versatile support class empowering allies with songs and spells.',
    stats: { Damage: 4, Survivability: 5, Mobility: 6, Utility: 9, Healing: 7, Complexity: 7 },
  },
  {
    id: 'berserker',
    name: 'Berserker',
    role: 'Melee Damage',
    weapons: 'Two-Handed',
    scaling: 'Strength',
    description: 'Ferocious close-range fighter with brutal burst and reckless aggression.',
    stats: { Damage: 9, Survivability: 6, Mobility: 5, Utility: 2, Healing: 2, Complexity: 4 },
  },
  {
    id: 'corsair',
    name: 'Corsair',
    role: 'Ranged Damage',
    weapons: 'Pistol & Blade',
    scaling: 'Dexterity',
    description: 'Swashbuckling pirate combining pistols and blades in close-to-medium range combat.',
    stats: { Damage: 7, Survivability: 5, Mobility: 8, Utility: 4, Healing: 2, Complexity: 6 },
  },
  {
    id: 'death_knight',
    name: 'Death Knight',
    role: 'Tank / Melee',
    weapons: 'Sword & Shield',
    scaling: 'Strength',
    description: 'Undead warrior combining dark magic with heavy armor for exceptional durability.',
    stats: { Damage: 6, Survivability: 9, Mobility: 3, Utility: 5, Healing: 4, Complexity: 6 },
  },
  {
    id: 'druid',
    name: 'Druid',
    role: 'Healer / Nature',
    weapons: 'Staff',
    scaling: 'Intelligence',
    description: 'Nature mage capable of healing allies and summoning natural forces.',
    stats: { Damage: 5, Survivability: 6, Mobility: 4, Utility: 7, Healing: 9, Complexity: 6 },
  },
  {
    id: 'guardian',
    name: 'Guardian',
    role: 'Tank',
    weapons: 'Sword & Shield',
    scaling: 'Endurance',
    description: 'The definitive frontline tank with unmatched damage absorption and party protection.',
    stats: { Damage: 4, Survivability: 10, Mobility: 3, Utility: 6, Healing: 3, Complexity: 4 },
  },
  {
    id: 'gunslinger',
    name: 'Gunslinger',
    role: 'Ranged Damage',
    weapons: 'Dual Pistols',
    scaling: 'Dexterity',
    description: 'Fast-shooting dual pistol specialist with exceptional single-target burst.',
    stats: { Damage: 9, Survivability: 4, Mobility: 6, Utility: 3, Healing: 1, Complexity: 5 },
  },
  {
    id: 'hexblade',
    name: 'Hexblade',
    role: 'Hybrid / Curse',
    weapons: 'Sword & Wand',
    scaling: 'Intelligence',
    description: 'Dark hybrid wielding curses and melee combat in equal measure.',
    stats: { Damage: 7, Survivability: 5, Mobility: 5, Utility: 7, Healing: 3, Complexity: 8 },
  },
  {
    id: 'monk',
    name: 'Monk',
    role: 'Melee / Sustain',
    weapons: 'Fists / Staff',
    scaling: 'Strength',
    description: 'Disciplined martial artist combining powerful strikes with self-sustain.',
    stats: { Damage: 7, Survivability: 7, Mobility: 7, Utility: 4, Healing: 5, Complexity: 6 },
  },
  {
    id: 'necromancer',
    name: 'Necromancer',
    role: 'Summoner / Damage',
    weapons: 'Staff',
    scaling: 'Intelligence',
    description: 'Dark mage commanding undead armies with powerful summoning and death magic.',
    stats: { Damage: 7, Survivability: 5, Mobility: 4, Utility: 8, Healing: 2, Complexity: 9 },
  },
  {
    id: 'rogue',
    name: 'Rogue',
    role: 'Melee Burst',
    weapons: 'Daggers',
    scaling: 'Dexterity',
    description: 'Stealth-based assassin with the highest single-target burst in the game.',
    stats: { Damage: 10, Survivability: 4, Mobility: 8, Utility: 3, Healing: 1, Complexity: 7 },
  },
  {
    id: 'samurai',
    name: 'Samurai',
    role: 'Melee / Counter',
    weapons: 'Katana',
    scaling: 'Strength',
    description: 'Honorable swordsman with precise counter-attack timing and deadly iaijutsu.',
    stats: { Damage: 8, Survivability: 6, Mobility: 6, Utility: 4, Healing: 2, Complexity: 7 },
  },
  {
    id: 'sorcerer',
    name: 'Sorcerer',
    role: 'AoE Damage',
    weapons: 'Wand',
    scaling: 'Intelligence',
    description: 'Pure magic dealer unleashing devastating area spells at the cost of survivability.',
    stats: { Damage: 10, Survivability: 3, Mobility: 4, Utility: 5, Healing: 1, Complexity: 6 },
  },
  {
    id: 'tamer',
    name: 'Tamer',
    role: 'Pet / Utility',
    weapons: 'Bow / Wand',
    scaling: 'Intelligence',
    description: 'Beast master commanding a companion to fight alongside them with unique synergies.',
    stats: { Damage: 6, Survivability: 5, Mobility: 5, Utility: 8, Healing: 3, Complexity: 8 },
  },
];

// ── SVG Radar Chart ───────────────────────────────────────────────────────────
const R = 100;
const CX = 130;
const CY = 130;
const CHART_SIZE = 260;

function polarToXY(angle: number, radius: number) {
  const rad = (angle - 90) * (Math.PI / 180);
  return { x: CX + radius * Math.cos(rad), y: CY + radius * Math.sin(rad) };
}

function statPolygon(stats: Record<StatAxes, number>, scale: number, max = 10) {
  return AXES.map((ax, i) => {
    const angle = (360 / AXES.length) * i;
    const r = (stats[ax] / max) * R * scale;
    const { x, y } = polarToXY(angle, r);
    return `${x},${y}`;
  }).join(' ');
}

function RadarChart({ cls }: { cls: ClassDef }) {
  const n = AXES.length;
  // Grid rings at 25%, 50%, 75%, 100%
  const rings = [0.25, 0.5, 0.75, 1];
  return (
    <svg
      viewBox={`0 0 ${CHART_SIZE} ${CHART_SIZE}`}
      aria-label={`${cls.name} stat radar chart`}
      role="img"
      style={{ width: '100%', maxWidth: 260, display: 'block', margin: '0 auto' }}
    >
      {/* Grid rings */}
      {rings.map((pct) => (
        <polygon
          key={pct}
          points={AXES.map((_, i) => {
            const { x, y } = polarToXY((360 / n) * i, R * pct);
            return `${x},${y}`;
          }).join(' ')}
          fill="none"
          stroke={pct === 1 ? 'rgba(200,160,50,0.25)' : 'rgba(200,160,50,0.1)'}
          strokeWidth={pct === 1 ? 1.2 : 0.8}
        />
      ))}
      {/* Axis lines */}
      {AXES.map((_, i) => {
        const { x, y } = polarToXY((360 / n) * i, R);
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke="rgba(200,160,50,0.15)" strokeWidth={0.8} />;
      })}
      {/* Stat polygon */}
      <polygon
        points={statPolygon(cls.stats, 1)}
        fill="rgba(200,160,50,0.18)"
        stroke="rgba(245,204,80,0.85)"
        strokeWidth={1.8}
        strokeLinejoin="round"
      />
      {/* Data point dots */}
      {AXES.map((ax, i) => {
        const { x, y } = polarToXY((360 / n) * i, (cls.stats[ax] / 10) * R);
        return <circle key={ax} cx={x} cy={y} r={3} fill="#f5cc50" stroke="rgba(0,0,0,0.4)" strokeWidth={1} />;
      })}
      {/* Axis labels */}
      {AXES.map((ax, i) => {
        const { x, y } = polarToXY((360 / n) * i, R + 18);
        const anchor = x < CX - 4 ? 'end' : x > CX + 4 ? 'start' : 'middle';
        return (
          <text
            key={ax}
            x={x}
            y={y + 3}
            textAnchor={anchor}
            fontSize={9}
            fontFamily="'Cinzel', serif"
            letterSpacing="0.05em"
            fill="rgba(200,160,50,0.85)"
          >
            {ax}
          </text>
        );
      })}
      {/* Stat value labels */}
      {AXES.map((ax, i) => {
        const v = cls.stats[ax];
        const { x, y } = polarToXY((360 / n) * i, (v / 10) * R - 8);
        return v >= 7 ? (
          <text key={ax + '_v'} x={x} y={y + 4} textAnchor="middle" fontSize={8} fontFamily="'JetBrains Mono',monospace" fill="#fff0ad">
            {v}
          </text>
        ) : null;
      })}
    </svg>
  );
}

// ── Role color ────────────────────────────────────────────────────────────────
function roleColor(role: string) {
  if (/tank/i.test(role)) return { color: '#7ebcff', border: 'rgba(126,188,255,0.4)' };
  if (/heal|support|buffer/i.test(role)) return { color: '#18c0a8', border: 'rgba(24,192,168,0.4)' };
  if (/summon|pet/i.test(role)) return { color: '#a855f7', border: 'rgba(168,85,247,0.4)' };
  if (/hybrid/i.test(role)) return { color: '#f59e0b', border: 'rgba(245,158,11,0.4)' };
  return { color: '#f5cc50', border: 'rgba(245,204,80,0.4)' };
}

// ── Main component ─────────────────────────────────────────────────────────────
export function ClassesPage() {
  const [selected, setSelected] = useState<ClassDef>(CLASSES[0]);

  return (
    <div className="container">
      <Breadcrumb items={[{ label: 'Home', to: '/' }, { label: 'Classes', to: '/category/Classes' }, { label: 'Classes' }]} />
      <div className="eyebrow">Classes</div>
      <h1 className="page-title">Classes</h1>
      <p className="lead" style={{ marginBottom: 32 }}>
        There are 15 classes on Archlight — each with unique skills, strengths, and build paths. Select a class to
        compare its stats on the radar chart.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr min(340px, 38%)', gap: 32, alignItems: 'start' }}>
        {/* Left: roster grid */}
        <div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))',
              gap: 10,
            }}
          >
            {CLASSES.map((cls) => {
              const rc = roleColor(cls.role);
              const active = cls.id === selected.id;
              return (
                <button
                  key={cls.id}
                  type="button"
                  onClick={() => setSelected(cls)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 8,
                    padding: '14px 10px',
                    borderRadius: 12,
                    border: active ? `1px solid ${rc.color}` : '1px solid var(--rim)',
                    background: active ? `rgba(200,160,50,0.08)` : 'var(--bg2)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                    boxShadow: active ? `0 0 14px ${rc.border}` : 'none',
                  }}
                  aria-pressed={active}
                  aria-label={cls.name}
                >
                  <img
                    src={`/assets/media/classes/${cls.id}_icon.png`}
                    alt={cls.name}
                    width={40}
                    height={40}
                    style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 11,
                      color: active ? 'var(--tx0)' : 'var(--tx2)',
                      textAlign: 'center',
                      letterSpacing: '0.04em',
                    }}
                  >
                    {cls.name}
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-label)',
                      fontSize: 8,
                      letterSpacing: '0.06em',
                      textTransform: 'uppercase',
                      color: rc.color,
                      background: rc.border.replace('0.4)', '0.12)'),
                      border: `1px solid ${rc.border}`,
                      padding: '2px 7px',
                      borderRadius: 999,
                    }}
                  >
                    {cls.role.split(' / ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: radar chart + class detail */}
        <div
          style={{
            position: 'sticky',
            top: 'calc(var(--tb) + 20px)',
            display: 'flex',
            flexDirection: 'column',
            gap: 0,
          }}
        >
          <div
            className="card"
            style={{
              borderColor: roleColor(selected.role).border,
              boxShadow: `0 0 24px ${roleColor(selected.role).border}`,
            }}
          >
            {/* Class header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
              <img
                src={`/assets/media/classes/${selected.id}_icon.png`}
                alt={selected.name}
                width={52}
                height={52}
                style={{ imageRendering: 'pixelated', objectFit: 'contain' }}
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none';
                }}
              />
              <div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, color: 'var(--tx0)', lineHeight: 1 }}>
                  {selected.name}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-label)',
                    fontSize: 9,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: roleColor(selected.role).color,
                    marginTop: 5,
                  }}
                >
                  {selected.role}
                </div>
              </div>
            </div>

            <p style={{ fontFamily: 'var(--font-body)', fontSize: 13.5, color: 'var(--tx2)', margin: '0 0 16px', lineHeight: 1.6 }}>
              {selected.description}
            </p>

            {/* Stats summary */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '4px 12px',
                marginBottom: 18,
                fontFamily: 'var(--font-mono)',
                fontSize: 11,
              }}
            >
              <span style={{ color: 'var(--tx3)' }}>Weapons</span>
              <span style={{ color: 'var(--tx1)' }}>{selected.weapons}</span>
              <span style={{ color: 'var(--tx3)' }}>Scaling</span>
              <span style={{ color: 'var(--tx1)' }}>{selected.scaling}</span>
            </div>

            {/* Radar chart */}
            <RadarChart cls={selected} />

            {/* Stat bars */}
            <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 6 }}>
              {AXES.map((ax) => (
                <div key={ax} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <span
                    style={{
                      width: 90,
                      fontFamily: 'var(--font-label)',
                      fontSize: 9,
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--tx3)',
                      flexShrink: 0,
                    }}
                  >
                    {ax}
                  </span>
                  <div
                    style={{
                      flex: 1,
                      height: 5,
                      background: 'var(--bg4)',
                      borderRadius: 3,
                      overflow: 'hidden',
                    }}
                  >
                    <div
                      style={{
                        height: '100%',
                        width: `${selected.stats[ax] * 10}%`,
                        background:
                          selected.stats[ax] >= 8
                            ? 'linear-gradient(90deg, var(--g1), var(--g3))'
                            : selected.stats[ax] >= 5
                            ? 'rgba(200,160,50,0.55)'
                            : 'rgba(200,160,50,0.25)',
                        borderRadius: 3,
                        transition: 'width 0.3s ease',
                      }}
                    />
                  </div>
                  <span
                    style={{
                      width: 20,
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: 'var(--g2)',
                      textAlign: 'right',
                      flexShrink: 0,
                    }}
                  >
                    {selected.stats[ax]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
