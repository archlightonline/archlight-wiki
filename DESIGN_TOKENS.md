# Design Tokens — Archlight Wiki

Extracted from `archlight_wiki_v534_concepts_static_hosts_fixed/assets/css/wiki-shell.css`
(`:root` block) and companion stylesheets. These are the canonical values ported
into `client/src/index.css` for the rebuilt platform so the new UI keeps the
original **dark cyberpunk / high-fantasy** aesthetic.

## Color palette

### Backgrounds (deep navy-black, layered)
| Token | Value | Use |
| --- | --- | --- |
| `--bg`  | `#070b16` | page background (darkest) |
| `--bg1` | `#0c1020` | raised surface |
| `--bg2` | `#101528` | cards / panels |
| `--bg3` | `#151c30` | popovers / toasts |
| `--bg4` | `#1c2438` | hover / active surface |

### Gold scale (primary accent — runes, headings, highlights)
| Token | Value |
| --- | --- |
| `--g0` | `#c08010` |
| `--g1` | `#d49820` |
| `--g2` | `#e8b030` |
| `--g3` | `#f5cc50` |
| `--g4` | `#fff080` |

### Text
| Token | Value | Use |
| --- | --- | --- |
| `--tx0` | `#f0ecd8` | primary (warm parchment) |
| `--tx1` | `#d0dcea` | body |
| `--tx2` | `#b3c6dd` | secondary |
| `--tx3` | `#7f96b1` | muted / captions |

### Secondary accents
| Token | Value | Use |
| --- | --- | --- |
| `--teal`  | `#18c0a8` | success / data |
| `--blue`  | `#3878d8` | links / info |
| `--red`   | `#c84040` | danger / errors |
| `--amber` | `#e07020` | warnings / login |
| `--plum`  | `#7040c0` | rare / special |

### Rims & glows (gold at low alpha — borders and ambient light)
| Token | Value |
| --- | --- |
| `--rim`   | `rgba(200,160,50,.10)` |
| `--rim2`  | `rgba(200,160,50,.22)` |
| `--rim3`  | `rgba(200,160,50,.45)` |
| `--glow`  | `rgba(200,160,50,.14)` |
| `--glow2` | `rgba(200,160,50,.06)` |

### Per-page accent pattern
Each page sets local accent vars, e.g. home:
`--page-accent:#d49820; --page-accent-2:#fff080; --page-accent-soft:rgba(212,152,32,.16); --page-accent-glow:rgba(212,152,32,.28)`.

## Typography

Loaded from Google Fonts (Cinzel, Cinzel Decorative, Lora, JetBrains Mono).

| Role | Family | Notes |
| --- | --- | --- |
| Body / prose | `"Lora","Georgia",serif` | base size ~15.5–16.5px, line-height ~1.8 |
| Display headings | `"Cinzel Decorative",serif` | weights 700–900, tight line-height (.88–1.15) |
| Labels / eyebrows / nav | `"Cinzel",serif` | UPPERCASE, heavy letter-spacing (.1em–.55em) |
| Numbers / meta / code | `"JetBrains Mono",monospace` | counts, timestamps, stats |

Heading scale (approx): hero `Cinzel Decorative` clamp; section heading `--sec-h` 32px;
page title `.ptt` ~28–34px; eyebrow `.sec-ey` 9.5px tracked .5em.

## Spacing & layout

| Token | Value | Meaning |
| --- | --- | --- |
| `--sb` | `280px` | sidebar width |
| `--tb` | `58px`  | topbar height |
| `--rr` | `10px`  | default border-radius |
| `--rr2`| `16px`  | large border-radius (cards) |

Common patterns: cards use `--bg2` fill + `1px solid var(--rim)`/`--rim2` border +
`--rr2` radius; tables (`.wtbl`) use gold uppercase `Cinzel` headers on
`rgba(200,160,50,.06)` with hairline row separators; badges/pills use `Cinzel`
8–9px uppercase on low-alpha gold.

## Iconography

Sidebar/nav items use emoji glyphs (🏠 🧭 ⚔️ 🔮 …) — preserved in the new nav model.

## Porting notes

- All tokens above are declared on `:root` in `client/src/index.css`.
- Fonts are loaded via the same Google Fonts families.
- The new components (`.wiki-card`, `.wtbl`, `.btn`, `.sidebar`, `.topbar`,
  `.badge`, prose styling) consume these variables so theming stays centralized —
  fixing AUDIT §7's "inline color literals / duplicated values" complaint.
