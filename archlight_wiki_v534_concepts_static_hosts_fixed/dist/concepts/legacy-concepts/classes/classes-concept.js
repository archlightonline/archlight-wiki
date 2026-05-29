(() => {
  const store = window.ArchlightClassesData || { intro: '', classes: [] };
  const classes = Array.isArray(store.classes) ? store.classes : [];
  const root = document.getElementById('labRoot');

  const state = {
    classId: classes[0]?.id || '',
    tab: 'overview',
    lastTab: 'overview',
    tabMotion: 'settled',
    query: '',
    goal: 'bosses',
    slots: 3,
    points: 150,
    level: 1500,
    awakened: true,
    spec: 'auto',
    snapshot: false,
    compareId: classes[1]?.id || classes[0]?.id || ''
  };

  const tabs = [
    ['overview', 'Overview', 'Identity'],
    ['specs', 'Specs', 'Paths'],
    ['spells', 'Spellbook', 'Abilities'],
    ['soul', 'Soul Rune', 'Rune + Forgotten'],
    ['artifacts', 'Artifacts', 'Tiers'],
    ['planner', 'Build Planner', 'Tool'],
    ['compare', 'Compare', 'Versus']
  ];

  const goals = {
    bosses: { title: 'Bosses', icon: '◆', note: 'Single target, uptime, safe burst windows.', bias: ['damage', 'defense'] },
    pve: { title: 'PvE Clear', icon: '✦', note: 'Pack clear, cooldown flow, comfort.', bias: ['damage', 'utility'] },
    pvp: { title: 'PvP', icon: '✧', note: 'Burst timing, control, reaction tools.', bias: ['utility', 'defense'] },
    solo: { title: 'Solo', icon: '◇', note: 'Sustain, reliability, low risk pathing.', bias: ['defense', 'damage'] },
    support: { title: 'Support', icon: '✚', note: 'Team value, safety, utility windows.', bias: ['utility', 'defense'] }
  };

  const esc = value => String(value ?? '').replace(/[&<>'"]/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;'
  }[ch]));
  const strip = value => String(value || '').replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  const clip = (value, max = 150) => {
    const text = strip(value);
    return text.length > max ? `${text.slice(0, max - 1)}…` : text;
  };
  const asset = path => {
    if (!path) return '';
    const clean = String(path).replace(/^\.\.\//, '').replace(/^\//, '');
    if (clean.startsWith('assets/media/classes/')) return `removed-live-pages-archive/${clean}`;
    return `../${clean}`;
  };
  const classPlaceholderIcon = (label = 'Class') => {
    const letters = String(label || 'Class').replace(/[^a-z0-9]/gi, '').slice(0, 2).toUpperCase() || 'CL';
    return `<span class="class-placeholder-icon" aria-hidden="true"><b>✦</b><i>${esc(letters)}</i></span>`;
  };
  const forgottenRuneIcon = () => `<span class="forgotten-rune-placeholder" aria-hidden="true"><b>◆</b><i>FR</i></span>`;
  const img = (src, alt = '') => {
    if (!src) return classPlaceholderIcon(alt);
    const fallback = classPlaceholderIcon(alt).replace(/`/g, '&#96;').replace(/"/g, '&quot;');
    return `<img src="${esc(asset(src))}" alt="${esc(alt)}" loading="lazy" onerror="this.onerror=null;this.outerHTML=\`${fallback}\`">`;
  };
  const current = () => classes.find(c => c.id === state.classId) || classes[0] || {};
  const opponent = () => classes.find(c => c.id === state.compareId && c.id !== current().id) || classes.find(c => c.id !== current().id) || current();
  const spellRows = c => (c?.spellSections || []).flatMap(group => (group.rows || []).map(row => ({ ...row, group: group.title || 'Spells' })));
  const iconFor = c => c?.icon || c?.soulRune?.image || spellRows(c).find(r => r.image)?.image || '';
  const role = c => clip(c?.roles || (c?.tags || []).join(' · ') || 'Combat class', 86);
  const spellName = row => row?.['Spell name'] || row?.name || row?.Spell || 'Spell';
  const spellDesc = row => row?.['Spell Description'] || row?.Description || row?.description || 'No description listed.';
  const rowLevel = row => {
    const raw = String(row?.Level || row?.level || row?.RequiredLevel || row?.requiredLevel || '').replace(/,/g, '').trim();
    const match = raw.match(/\d+/);
    return match ? Number(match[0]) : 0;
  };
  const playerLevel = () => Math.max(1, Number(state.level) || 1);
  const canUseSpell = row => {
    const required = rowLevel(row);
    return !required || required <= playerLevel();
  };
  const accessLine = row => {
    const required = rowLevel(row);
    return required ? `Requires Lv ${required}` : 'No level requirement listed';
  };


  const awakeningRows = c => (c?.spellSections || [])
    .filter(group => /awakening/i.test(group.title || ''))
    .flatMap(group => (group.rows || []).map(row => ({ ...row, group: group.title || 'Awakening' })));

  function normalizeEffectRow(row, fallback = 'Effect') {
    if (!row || typeof row !== 'object') return { title: fallback, effect: String(row || ''), type: 'effect' };
    const title = row['Spell name'] || row.name || row.title || row['Choose Between'] || fallback;
    const guaranteed = row['Guaranteed Effect'] || row.guaranteed || row.effect || row.description || row.Description || '';
    const choiceName = row['Choose Between'] || row.choice || '';
    const choiceEffect = row.Description || row.description || row.effectDescription || '';
    return { ...row, title, guaranteed, choiceName, choiceEffect, effect: guaranteed || choiceEffect || '', type: choiceName ? 'choice' : 'guaranteed' };
  }

  function awakeningEffects(c) {
    return awakeningRows(c).map(row => normalizeEffectRow(row, spellName(row))).filter(e => e.effect || e.guaranteed || e.choiceEffect || e.choiceName);
  }


  function effectText(effect) {
    return effect?.guaranteed || effect?.effect || effect?.choiceEffect || effect?.Description || effect?.description || '';
  }

  function spellCategoryTitle(title = '') {
    const t = String(title).toLowerCase();
    if (/attack|damage|offen|combat/.test(t)) return 'Attack Spells';
    if (/heal|recovery|restor/.test(t)) return 'Healing Spells';
    if (/support|buff|utility|defen|control/.test(t)) return 'Support Spells';
    return title || 'Class Spells';
  }

  function categoryTone(title = '') {
    const t = String(title).toLowerCase();
    if (/attack|damage|offen|combat/.test(t)) return 'attack';
    if (/heal|recovery|restor/.test(t)) return 'healing';
    if (/support|buff|utility|defen|control/.test(t)) return 'support';
    if (/awakening|awaken/.test(t)) return 'awakening';
    if (/soul|rune|forgotten/.test(t)) return 'rune';
    return 'neutral';
  }

  function awakeningBySource(c) {
    const normal = (c?.spellSections || []).filter(group => !/awakening/i.test(group.title || ''));
    const map = new Map();
    normal.forEach(group => (group.rows || []).forEach(row => map.set(String(spellName(row)).toLowerCase(), spellCategoryTitle(group.title || 'Class Spells'))));
    return awakeningEffects(c).map(effect => ({
      ...effect,
      sourceCategory: map.get(String(effect.title || '').toLowerCase()) || (/soul rune/i.test(effect.title || '') ? 'Soul Rune' : 'Awakening Spells'),
      isRune: /soul rune|forgotten/i.test(effect.title || '')
    }));
  }

  function groupBy(list, getKey) {
    return list.reduce((acc, item) => {
      const key = getKey(item) || 'Other';
      (acc[key] ||= []).push(item);
      return acc;
    }, {});
  }

  function forgottenRuneEffects(c) {
    return (c?.forgottenSoulRune || [])
      .flatMap(entry => Object.entries(entry || {}).map(([name, effect]) => ({ name, title: name, effect, guaranteed: /guaranteed/i.test(name) ? effect : '', choiceEffect: !/guaranteed/i.test(name) ? effect : '', type: /guaranteed/i.test(name) ? 'guaranteed' : 'choice' })))
      .filter(e => e.effect || e.guaranteed || e.choiceEffect);
  }

  function artifactItems(c) {
    const arts = c?.artifacts || {};
    if (Array.isArray(arts.items)) return arts.items;
    if (Array.isArray(arts)) return arts;
    const out = [];
    if (arts.heaven || arts.Heaven) out.push({ name: 'Heaven Artifact', tone: 'heaven', ...(arts.heaven || arts.Heaven) });
    if (arts.hell || arts.Hell) out.push({ name: 'Hell Artifact', tone: 'hell', ...(arts.hell || arts.Hell) });
    return out;
  }

  function artifactEffects(c) {
    return artifactItems(c).flatMap(item => (item.effects || item.tiers || []).map(effect => ({ ...effect, path: item.name || 'Artifact', tone: item.tone || '' })));
  }

  function snapshotText(c, g, split, awakening, artifact) {
    const lines = [
      `${c.name || 'Class'} ${g.title} Build Snapshot`,
      `Focus: ${g.bias.join(' + ')}`,
      `Stats: ${split.map(([label, value]) => `${label} ${value}`).join(' / ')}`,
      `Awakening: ${awakening.slice(0, 3).map(e => e.title).join(', ') || '—'}`,
      `Artifact: ${artifact.slice(0, 3).map(e => `${e.path} ${e.tier || ''} ${e.name || e.title || ''}`.replace(/\s+/g, ' ').trim()).join(' > ') || '—'}`,
      `Rotation: ${rotation(c).slice(0, 4).join(' > ')}`
    ];
    return lines.join('\n');
  }

  function score(c) {
    const text = [c?.name, c?.roles, c?.weapons, c?.scaling, c?.description, (c?.tags || []).join(' ')].join(' ').toLowerCase();
    const seed = [...String(c?.id || c?.name || 'class')].reduce((a, ch) => ((a * 31) + ch.charCodeAt(0)) >>> 0, 157);
    const clamp = v => Math.max(18, Math.min(96, Math.round(v)));
    let damage = 48 + (seed % 19);
    let defense = 42 + ((seed >> 2) % 22);
    let utility = 38 + ((seed >> 4) % 25);
    let range = 34 + ((seed >> 6) % 28);
    let complexity = 32 + ((seed >> 8) % 30);
    if (/burst|damage|dps|ranged|spell|assassin|gunslinger|sorcerer|archer|berserker|wizard/.test(text)) damage += 16;
    if (/tank|guardian|defense|sustain|shield|knight|survival|monk/.test(text)) defense += 18;
    if (/support|bard|heal|buff|control|utility|druid|summon|necromancer/.test(text)) utility += 18;
    if (/ranged|bow|gun|spell|caster|sorcerer|archer|gunslinger/.test(text)) range += 18;
    if (/combo|stance|summon|rune|hex|samurai|monk|necromancer|corsair/.test(text)) complexity += 15;
    return { damage: clamp(damage), defense: clamp(defense), utility: clamp(utility), range: clamp(range), complexity: clamp(complexity) };
  }


  const classPalette = {
    archer: ['#75c9ff', '#183448'],
    bard: ['#d8a7ff', '#3a244f'],
    berserker: ['#ff6b4a', '#4a1f18'],
    corsair: ['#53d8d3', '#153d45'],
    druid: ['#7ddf88', '#173d25'],
    guardian: ['#8fb4ff', '#1c2e55'],
    gunslinger: ['#f0c35d', '#473414'],
    knight: ['#d7dce8', '#293142'],
    monk: ['#f5d58a', '#473719'],
    necromancer: ['#b37cff', '#2f2146'],
    rogue: ['#ff8faf', '#482131'],
    samurai: ['#ff8665', '#4a2419'],
    sorcerer: ['#7fa8ff', '#1a2d55'],
    wizard: ['#9d8cff', '#2c2854']
  };

  function applyClassTheme(c = {}) {
    const key = String(c.id || c.name || '').toLowerCase().replace(/[^a-z0-9]+/g, '-');
    const [accent, soft] = classPalette[key] || classPalette[key.replace(/-.*/, '')] || ['#e4b55b', '#382b14'];
    root?.style?.setProperty('--class-accent', accent);
    root?.style?.setProperty('--class-accent-soft', soft);
    root?.setAttribute('data-class-theme', key || 'default');
  }

  function render() {
    const c = current();
    applyClassTheme(c);
    root.innerHTML = `
      <div class="codex-shell">
        ${renderStatMatrix('spotlight')}
        <div class="codex-grid">
          ${renderRoster()}
          <main class="codex-main">
            ${renderDossier(c)}
            ${renderTabs()}
            <section class="tab-panel tab-enter-${esc(state.tabMotion || 'settled')}" data-active-tab="${esc(state.tab)}">${renderTab()}</section>
          </main>
        </div>
      </div>`;
    bind();
  }

  function renderTopbar(c) { return ''; }

  const categoryByClass = {
    archer: ['ranged'],
    bard: ['caster', 'support'],
    berserker: ['melee'],
    corsair: ['hybrid'],
    'death knight': ['melee', 'tank'],
    druid: ['caster', 'support'],
    guardian: ['melee', 'tank'],
    gunslinger: ['ranged'],
    monk: ['melee'],
    necromancer: ['caster'],
    rogue: ['melee'],
    samurai: ['melee'],
    sorcerer: ['caster'],
    tamer: ['ranged'],
    hexblade: ['hybrid', 'caster']
  };

  function classCategoryIds(c) {
    const key = String(c?.name || c?.id || '').toLowerCase().trim();
    if (categoryByClass[key]) return categoryByClass[key];
    const roleText = [c?.roles, c?.weapons, c?.scaling, (c?.tags || []).join(' ')].join(' ').toLowerCase();
    const ids = [];
    if (/ranged|bow|pistol|gun/.test(roleText)) ids.push('ranged');
    if (/melee|dagger|katana|claw|two-handed|dual wielder/.test(roleText) && !/hybrid/.test(roleText)) ids.push('melee');
    if (/caster|staff|spell|magic|intelligence/.test(roleText)) ids.push('caster');
    if (/healer|support|heal|buff|utility/.test(roleText)) ids.push('support');
    if (/(tank)|guardian|shield/.test(roleText) && !/off-tank/.test(roleText)) ids.push('tank');
    if (/hybrid/.test(roleText)) ids.push('hybrid');
    return ids.length ? [...new Set(ids)] : ['hybrid'];
  }

  function renderRoster() {
    const q = state.query.toLowerCase().trim();
    const filter = state.rosterFilter || 'all';
    const filterDefs = [
      ['all', 'All'], ['ranged', 'Ranged'], ['melee', 'Melee'], ['caster', 'Caster'], ['support', 'Support'], ['tank', 'Tank'], ['hybrid', 'Hybrid']
    ];
    const matchesFilter = c => filter === 'all' || classCategoryIds(c).includes(filter);
    const filtered = classes.filter(c => {
      const text = [c.name, c.roles, c.weapons, c.scaling, c.description, (c.tags || []).join(' ')].join(' ').toLowerCase();
      return (!q || text.includes(q)) && matchesFilter(c);
    });
    return `<aside class="class-roster-panel">
      <header class="roster-head"><span>Roster</span><strong>${filtered.length || 0} Classes</strong></header>
      <label class="roster-search-box"><span>Find class</span><input id="classSearch" type="search" value="${esc(state.query)}" placeholder="Search role, class, weapon…"></label>
      <div class="roster-filters">${filterDefs.map(([id, label]) => `<button class="roster-filter ${filter === id ? 'active' : ''}" data-roster-filter="${id}">${label}</button>`).join('')}</div>
      <div class="roster-scroll">
        ${filtered.length ? filtered.map(renderClassPick).join('') : `<div class="empty-state">No classes found.</div>`}
      </div>
    </aside>`;
  }

  function rosterTone(c) {
    const ids = classCategoryIds(c);
    if (ids.includes('tank')) return 'tank';
    if (ids.includes('support')) return 'support';
    if (ids.includes('caster')) return 'caster';
    if (ids.includes('ranged')) return 'ranged';
    if (ids.includes('melee')) return 'melee';
    return 'hybrid';
  }

  function renderClassPick(c) {
    const tone = rosterTone(c);
    const meta = [c.roles, c.weapons, c.scaling].filter(Boolean).slice(0, 2);
    return `<button class="roster-pick tone-${tone} ${c.id === state.classId ? 'active' : ''}" data-class="${esc(c.id)}">
      <span class="roster-icon">${img(iconFor(c), c.name || 'Class')}</span>
      <span class="roster-copy"><b>${esc(c.name)}</b><em>${esc(role(c))}</em><span class="roster-meta">${meta.map(m => `<i>${esc(clip(m, 18))}</i>`).join('')}</span></span>
      <span class="roster-chip">${esc(tone)}</span>
    </button>`;
  }

  function renderDossier(c) {
    const s = score(c);
    return `<section class="class-dossier-card">
      <div class="dossier-left">
        <span class="dossier-icon">${img(iconFor(c), c.name || 'Class')}</span>
        <div class="dossier-title"><span class="eyebrow">Selected class</span><h2>${esc(c.name || 'Class')}</h2><p>${esc(clip(c.description || store.intro || '', 260))}</p></div>
      </div>
      <div class="dossier-metrics">
        ${miniMetric('Role', c.roles || 'Combat')}
        ${miniMetric('Weapons', c.weapons || '—')}
        ${miniMetric('Scaling', c.scaling || '—')}
        ${miniMetric('Damage', s.damage)}
        ${miniMetric('Defense', s.defense)}
        ${miniMetric('Utility', s.utility)}
      </div>
    </section>`;
  }

  function miniMetric(label, value) {
    return `<article class="mini-metric"><span>${esc(label)}</span><strong>${esc(value || '—')}</strong></article>`;
  }


  function tabMeta(id) {
    return ({
      overview: { icon: 'OV', label: 'Class read' },
      specs: { icon: 'SP', label: 'Spec paths' },
      spells: { icon: 'BK', label: 'Spellbook' },
      soul: { icon: 'RN', label: 'Soul runes' },
      artifacts: { icon: 'AR', label: 'Artifacts' },
      planner: { icon: '⚒', label: 'Build tool' },
      compare: { icon: 'VS', label: 'Versus' }
    }[id] || { icon: '•', label: 'Section' });
  }

  function moduleMeta(title) {
    const t = String(title || '').toLowerCase();
    if (/overview|combat/.test(t)) return { eyebrow: 'Class read' };
    if (/spec/.test(t)) return { eyebrow: 'Paths' };
    if (/spell/.test(t)) return { eyebrow: 'Abilities' };
    if (/soul|rune/.test(t)) return { eyebrow: 'Rune system' };
    if (/artifact/.test(t)) return { eyebrow: 'Relics' };
    if (/planner|build/.test(t)) return { eyebrow: 'Build tool' };
    if (/compare|versus/.test(t)) return { eyebrow: 'Matchup' };
    return { eyebrow: title?.split(' ')?.[0] || 'Section' };
  }

  function renderTabs() {
    return `<nav class="codex-tabs" aria-label="Class tabs">
      ${tabs.map(([id, label, note]) => {
        const meta = tabMeta(id);
        return `<button class="codex-tab ${state.tab === id ? 'active' : ''} ${id === 'planner' ? 'is-planner' : ''}" data-tab="${id}"><span class="tab-glyph" aria-hidden="true">${esc(meta.icon)}</span><span class="tab-copy"><strong>${esc(label)}</strong><small>${esc(note || meta.label)}</small></span></button>`;
      }).join('')}
    </nav>`;
  }

  function renderTab() {
    const map = { overview, specs, spells, soul, artifacts, planner, compare };
    return (map[state.tab] || overview)();
  }

  function module(title, desc, body, modifier = '') {
    const meta = moduleMeta(title);
    return `<section class="module ${modifier}">
      <header class="module-head"><div><span class="eyebrow">${esc(meta.eyebrow)}</span><h3>${esc(title)}</h3><p>${esc(desc)}</p></div></header>
      <div class="module-body">${body}</div>
    </section>`;
  }

  function card(title, body, note = '') {
    return `<article class="info-card"><header><h4>${esc(title)}</h4>${note ? `<p>${esc(note)}</p>` : ''}</header><div>${body}</div></article>`;
  }

  function bar(label, value, note = '') {
    const v = Math.max(0, Math.min(100, Number(value) || 0));
    return `<article class="stat-line"><header><b>${esc(label)}</b><strong>${esc(v)}</strong></header><span><i style="width:${v}%"></i></span>${note ? `<p>${esc(note)}</p>` : ''}</article>`;
  }

  function grade(value) {
    const v = Math.max(0, Math.min(100, Number(value) || 0));
    if (v >= 88) return 'S';
    if (v >= 74) return 'A';
    if (v >= 60) return 'B';
    if (v >= 46) return 'C';
    if (v >= 32) return 'D';
    return 'E';
  }

  function topStatLabel(s) {
    const labels = { damage: 'Damage', defense: 'Defense', utility: 'Utility', range: 'Range', complexity: 'Advanced' };
    const [key] = Object.entries(s).sort((a, b) => b[1] - a[1])[0] || ['damage', 0];
    return labels[key] || 'Flexible';
  }

  function radarPoint(value, index, total = 5, size = 120, center = 60, maxRadius = 43) {
    const radius = (Math.max(0, Math.min(100, Number(value) || 0)) / 100) * maxRadius;
    const angle = (-90 + (360 / total) * index) * Math.PI / 180;
    return `${(center + Math.cos(angle) * radius).toFixed(1)},${(center + Math.sin(angle) * radius).toFixed(1)}`;
  }

  function radarRing(radius, total = 5, center = 60) {
    return Array.from({ length: total }, (_, index) => {
      const angle = (-90 + (360 / total) * index) * Math.PI / 180;
      return `${(center + Math.cos(angle) * radius).toFixed(1)},${(center + Math.sin(angle) * radius).toFixed(1)}`;
    }).join(' ');
  }

  function classRadar(s, label = 'Class') {
    const keys = ['damage', 'defense', 'utility', 'range', 'complexity'];
    const points = keys.map((key, index) => radarPoint(s[key], index)).join(' ');
    const rings = [15, 25, 35, 43].map((r, i) => `<polygon points="${radarRing(r)}" class="radar-ring radar-ring-${i + 1}"></polygon>`).join('');
    const spokes = keys.map((key, index) => {
      const end = radarPoint(100, index);
      return `<line x1="60" y1="60" x2="${end.split(',')[0]}" y2="${end.split(',')[1]}" class="radar-spoke"></line>`;
    }).join('');
    const dots = keys.map((key, index) => {
      const [x, y] = radarPoint(s[key], index).split(',');
      return `<circle cx="${x}" cy="${y}" r="2.4" class="radar-dot"></circle>`;
    }).join('');
    const labels = keys.map((key, index) => {
      const [x, y] = radarPoint(116, index, 5, 120, 60, 43).split(',');
      const short = key === 'complexity' ? 'SKL' : key.slice(0, 3).toUpperCase();
      return `<text x="${x}" y="${y}" class="radar-label">${short}</text>`;
    }).join('');
    return `<svg class="class-radar" viewBox="0 0 120 120" role="img" aria-label="${esc(label)} stat radar"><defs><radialGradient id="radarGlow" cx="50%" cy="48%" r="58%"><stop offset="0%" stop-color="currentColor" stop-opacity=".22"/><stop offset="65%" stop-color="currentColor" stop-opacity=".08"/><stop offset="100%" stop-color="currentColor" stop-opacity="0"/></radialGradient></defs><circle cx="60" cy="60" r="50" class="radar-aura"></circle>${rings}${spokes}<polygon points="${points}" class="radar-fill"></polygon><polygon points="${points}" class="radar-line"></polygon>${dots}${labels}</svg>`;
  }

  function statMatrixRows(limit = 18) {
    const keys = [
      ['damage', 'DMG'],
      ['defense', 'DEF'],
      ['utility', 'UTIL'],
      ['range', 'RNG'],
      ['complexity', 'SKL']
    ];
    return classes.slice(0, limit).map(c => {
      const s = score(c);
      const active = c.id === state.classId ? ' active' : '';
      const grades = keys.map(([key, label]) => `<span class="matrix-grade grade-${grade(s[key]).toLowerCase()}"><em>${label}</em><strong>${grade(s[key])}</strong></span>`).join('');
      return `<button class="class-stat-card${active}" data-class="${esc(c.id)}">
        <span class="class-stat-card-head">${img(iconFor(c), c.name || 'Class')}<span><b>${esc(c.name || 'Class')}</b><small>${esc(topStatLabel(s))}</small></span></span>
        <span class="class-stat-card-radar">${classRadar(s, c.name || 'Class')}</span>
        <span class="class-stat-card-grades">${grades}</span>
      </button>`;
    }).join('');
  }

  function renderStatMatrix(mode = '') {
    const className = `stat-matrix-panel stat-matrix-visual ${mode ? `stat-matrix-${mode}` : ''}`.trim();
    return `<section class="${className}">
      <header>
        <span>Stat Matrix</span>
        <strong>Scan class strengths visually</strong>
        <p>Radar cards give a quick class identity read for comparison and planning.</p>
      </header>
      <div class="stat-matrix-legend"><b>DMG</b><span>Damage</span><b>DEF</b><span>Defense</span><b>UTIL</b><span>Utility</span><b>RNG</b><span>Range</span><b>SKL</b><span>Skill curve</span></div>
      <div class="stat-matrix-list stat-matrix-card-grid">${statMatrixRows()}</div>
    </section>`;
  }

  function overview() {
    const c = current();
    const s = score(c);
    const quick = [
      ['HP / MP', c.hpMp || '—'],
      ['Attack Cap', c.attackSpeedCap || '—'],
      ['Base Weapon', c.baseWeaponDamage || '—'],
      ['Spell Count', spellRows(c).length]
    ];
    const tags = (c.tags || []).slice(0, 10);
    const body = `<div class="overview-board overview-compact">
      <section class="overview-panel overview-read">
        <header><span>Class Read</span><strong>${esc(c.name || 'Class')} identity</strong></header>
        <p>${esc(clip(c.description || store.intro || 'This class has no description yet.', 420))}</p>
        <div class="overview-cards">${quick.map(([k,v]) => miniMetric(k, v)).join('')}</div>
      </section>
      <section class="overview-panel overview-stats">
        <header><span>Power Profile</span><strong>Combat shape</strong></header>
        <div class="stat-board">${Object.entries(s).map(([k, v]) => bar(k, v)).join('')}</div>
      </section>
      <section class="overview-panel overview-tags">
        <header><span>Metadata</span><strong>Tags & search identity</strong></header>
        <div class="tag-cloud">${tags.map(t => `<span>${esc(t)}</span>`).join('') || '<em>No tags listed.</em>'}</div>
      </section>
    </div>`;
    return module('Combat Snapshot', 'Class identity, quick values, stat shape, and tags in one readable snapshot.', body);
  }

  function specs() {
    const c = current();
    const list = (c.specializations || []).map(sp => `<article class="spec-tile">
      ${img(sp.image || iconFor(c), sp.name || c.name || 'Specialization')}<div><h4>${esc(sp.name || 'Specialization')}</h4><p>${esc(clip(sp.description, 220))}</p></div>
    </article>`).join('') || '<div class="empty-state">No specialization data found.</div>';
    return module('Specialization Paths', 'Each path is shown as a short identity card for fast scanning.', `<div class="spec-list">${list}</div>`);
  }

  function classifySpellGroupTitle(title = '') {
    const t = String(title).toLowerCase();
    if (/awakening|awaken/.test(t)) return 'awakening';
    if (/heal|recovery|restor/.test(t)) return 'healing';
    if (/support|buff|utility|defen|control/.test(t)) return 'support';
    return 'attack';
  }

  function groupedBaseSpellSections(c) {
    const buckets = {
      attack: { title: 'Attack', note: 'Damage, pressure, clearspeed, and offensive rotation tools.', rows: [] },
      healing: { title: 'Healing', note: 'Direct heals, recovery spells, and sustain windows.', rows: [] },
      support: { title: 'Support', note: 'Buffs, control, utility, protection, and team value.', rows: [] }
    };
    (c.spellSections || []).forEach(group => {
      const key = classifySpellGroupTitle(group.title || '');
      if (key === 'awakening') return;
      (group.rows || []).forEach(row => buckets[key].rows.push({ ...row, groupTitle: group.title || buckets[key].title }));
    });
    return Object.entries(buckets).map(([key, value]) => ({ key, ...value }));
  }

  function specNames(c) {
    return (c?.specializations || []).map(sp => sp?.name).filter(Boolean);
  }

  function specLabelForTree(c, tree) {
    const specs = specNames(c);
    const spell = String(tree?.spell || '').toLowerCase();
    const matched = specs.filter(name => spell.includes(String(name).toLowerCase()));
    if (matched.length) return matched.join(' / ');
    return specs.length ? specs.join(' / ') : 'Specialization path';
  }

  function awakeningSpellTrees(c) {
    const rows = awakeningRows(c);
    const trees = [];
    let active = null;
    rows.forEach((row) => {
      const hasRootVisual = !!row.image;
      const hasRootChoice = !!row['Choose Between'];
      const startsSpell = !active || hasRootVisual || hasRootChoice;
      if (startsSpell) {
        active = {
          spell: spellName(row),
          image: row.image || '',
          guaranteed: row['Guaranteed Effect'] || row.guaranteed || '',
          choice: row['Choose Between'] || '',
          choiceEffect: row.Description || row.description || '',
          branches: []
        };
        if (active.choice || active.choiceEffect) {
          active.branches.push({
            name: active.choice || 'Choice Effect',
            effect: active.choiceEffect || 'No effect description listed.',
            kind: 'Choice'
          });
        }
        trees.push(active);
      } else {
        active.branches.push({
          name: spellName(row),
          effect: row['Guaranteed Effect'] || row.Description || row.description || row.effect || '',
          kind: 'Branch'
        });
      }
    });
    return trees.filter(tree => tree.spell || tree.guaranteed || tree.branches.length);
  }

  function runeAwakeningTree(c, runeName = 'Soul Rune') {
    return awakeningSpellTrees(c).find(tree => String(tree.spell || '').toLowerCase() === String(runeName).toLowerCase()) || null;
  }

  function spells() {
    const c = current();
    const baseGroups = groupedBaseSpellSections(c);
    const awakeningTrees = awakeningSpellTrees(c).filter(tree => !/soul rune/i.test(tree.spell || ''));
    const body = `<div class="spellbook-list spellbook-stable">
      ${baseGroups.map(group => `<section class="spell-group-block spell-purpose-${esc(group.key)}">
        <header>
          <div><span>${esc(group.title)} Spells</span><h4>${esc(group.note)}</h4></div>
          <em>${esc(group.rows.length)} abilities</em>
        </header>
        <div>${group.rows.map(row => spellRow(row)).join('') || '<div class="empty-state">No spells in this category.</div>'}</div>
      </section>`).join('')}

      <section class="spell-group-block awakening-spellbook-block">
        <header>
          <div><span>Awakening Spells</span><h4>Specialization spell paths with expandable effect branches.</h4></div>
          <em>${esc(awakeningTrees.length)} paths</em>
        </header>
        <div class="awakening-spell-grid">
          ${awakeningTrees.map((tree, i) => awakeningTreeCard(tree, i, c)).join('') || '<div class="empty-state">No awakening spell rows found for this class.</div>'}
        </div>
      </section>
    </div>`;
    return module('Spellbook', 'Base spells are grouped by purpose. Awakening spells are separated into expandable paths with their listed effects.', body);
  }

  function awakeningTreeCard(tree, i, c = current()) {
    const branches = tree.branches || [];
    const specLabel = specLabelForTree(c, tree);
    const totalEffects = branches.length + (tree.guaranteed ? 1 : 0);
    const chipNumber = totalEffects || 1;
    const chipLabel = chipNumber === 1 ? 'effect' : 'effects';
    const chipNote = branches.length ? `${branches.length} branch${branches.length === 1 ? '' : 'es'}` : 'listed';
    const preview = tree.guaranteed || branches[0]?.effect || 'Click to reveal the unlocked awakening effects for this spell.';
    const limitedClass = totalEffects > 0 && totalEffects <= 2 ? ' compact-effect-path' : '';
    return `<details class="awakening-tree-card stable-awakening-card intuitive-awakening-card${limitedClass}">
      <summary>
        <span class="awakening-tree-icon">${tree.image ? img(tree.image, tree.spell) : '✦'}</span>
        <span class="awakening-tree-title">
          <b>${esc(tree.spell || 'Awakening Spell')}</b>
          <em>Specialization: ${esc(specLabel)}</em>
          <small>${esc(clip(preview, 112))}</small>
        </span>
        <span class="awakening-expand-chip awakening-tree-count"><strong>${esc(chipNumber)}</strong><em>${esc(chipLabel)}</em><i>${esc(chipNote)}</i></span>
      </summary>
      <div class="awakening-tree-body">
        ${tree.guaranteed ? `<article class="awakening-node guaranteed"><b>Guaranteed Effect</b><p>${esc(clip(tree.guaranteed, 300))}</p></article>` : ''}
        ${branches.map((branch, idx) => `<article class="awakening-node branch"><b>Branch ${idx + 1}: ${esc(branch.name || `Effect ${idx + 1}`)}</b><p>${esc(clip(branch.effect || 'No effect description listed.', 300))}</p></article>`).join('')}
        ${totalEffects > 0 && totalEffects <= 2 ? `<article class="awakening-node source-note"><b>Source Listed Path</b><p>This spell currently has ${esc(totalEffects)} listed awakening effect${totalEffects === 1 ? '' : 's'} in the class data. No extra effects were invented.</p></article>` : ''}
      </div>
    </details>`;
  }

  function spellRow(row, awakened = null) {
    return `<article class="spell-line ${awakened ? 'has-awakening' : ''}">
      <span class="spell-badge">${row.image ? `${img(row.image, spellName(row))}` : '✦'}</span>
      <div class="spell-text"><h5>${esc(spellName(row))}</h5><p>${esc(clip(spellDesc(row), 190))}</p></div>
      <div class="spell-facts"><span><b>Level</b><em>${esc(row.Level || row.level || '—')}</em></span><span><b>CD</b><em>${esc(row.Cooldown || row.cooldown || '—')}</em></span><span class="spell-fact-output"><b>Dmg/Heal</b><em>${esc(row['Base Damage'] || row['Base Healing'] || row.damage || '—')}</em></span></div>
    </article>`;
  }

  function awakeningMiniRow(effect) {
    return `<article class="awakening-mini-row"><b>✦</b><div><strong>${esc(effect.title || 'Awakening Effect')}</strong><p>${esc(clip(effect.guaranteed || effect.effect || effect.choiceEffect, 180))}</p>${effect.choiceName ? `<em>${esc(effect.choiceName)}</em>` : ''}</div></article>`;
  }

  function runeEffectCard(title, effect, tone = '') {
    return `<article class="rune-effect-card ${esc(tone)}"><strong>${esc(title || 'Rune Effect')}</strong><p>${esc(clip(effect || 'No effect listed.', 360))}</p></article>`;
  }

  function runeBranchList(tree, emptyText) {
    if (!tree) return `<div class="empty-state">${esc(emptyText)}</div>`;
    const branches = tree.branches || [];
    const rows = [
      ...(tree.guaranteed ? [{ name: 'Guaranteed Awakening', effect: tree.guaranteed, tone: 'is-guaranteed' }] : []),
      ...branches.map(branch => ({ name: branch.name || 'Rune Branch', effect: branch.effect || 'No effect listed.', tone: '' }))
    ];
    return `<div class="rune-effect-list">${rows.map(row => runeEffectCard(row.name, row.effect, row.tone)).join('') || `<div class="empty-state">${esc(emptyText)}</div>`}</div>`;
  }

  function soul() {
    const c = current();
    const rune = c.soulRune || {};
    const classicTree = runeAwakeningTree(c, 'Soul Rune');
    const forgottenRows = forgottenRuneEffects(c).map(e => ({
      name: e.name || e.title,
      effect: e.effect || e.guaranteed || e.choiceEffect,
      type: e.type || (/guaranteed/i.test(e.name || e.title || '') ? 'guaranteed' : 'choice')
    }));
    const classicBaseEffect = rune.description || rune.effect || 'Soul Rune base effect data is not listed for this class.';
    const classicAwakeningRows = [
      ...(classicTree?.guaranteed ? [{ name: 'Guaranteed Effect', effect: classicTree.guaranteed, type: 'guaranteed' }] : []),
      ...((classicTree?.branches || []).map(branch => ({ name: branch.name || 'Awakening Branch', effect: branch.effect || 'No effect listed.', type: 'choice' })))
    ];
    const forgottenBaseRow = forgottenRows.find(row => row.type === 'guaranteed' || /guaranteed/i.test(row.name || ''));
    const forgottenChoiceRows = forgottenRows.filter(row => row !== forgottenBaseRow);
    const forgottenBaseEffect = forgottenBaseRow?.effect || 'Forgotten Soul Rune base effect data is not listed for this class.';
    const forgottenAwakeningRows = [
      ...(forgottenBaseRow ? [{ name: 'Guaranteed Effect', effect: forgottenBaseRow.effect, type: 'guaranteed' }] : []),
      ...forgottenChoiceRows.map(row => ({ name: row.name || 'Forgotten Branch', effect: row.effect || 'No effect listed.', type: 'choice' }))
    ];

    const effectList = rows => `<div class="rune-matched-effect-list">
      ${rows.map((row, index) => `<article class="rune-matched-effect ${row.type === 'guaranteed' ? 'is-guaranteed' : ''}">
        <span>${String(index + 1).padStart(2, '0')}</span>
        <div><strong>${esc(row.name || 'Rune Effect')}</strong><p>${esc(clip(row.effect || 'No effect listed.', 360))}</p></div>
      </article>`).join('') || '<div class="empty-state">No awakening branch data found for this rune.</div>'}
    </div>`;

    const familyCard = ({ family, title, kicker, icon, baseEffect, rows, toneClass }) => {
      const awakeningCount = rows.length;
      const totalCount = awakeningCount + 1;
      return `<article class="rune-family-panel rune-family-even ${esc(toneClass)}">
        <header class="rune-family-top rune-even-top">
          <span class="rune-family-badge">${esc(family)}</span>
          <div class="rune-family-title"><small>${esc(kicker)}</small><h4>${esc(title)}</h4></div>
          <div class="rune-family-counts"><b>${esc(totalCount)}</b><span>Total effects</span><small>Base + ${esc(awakeningCount)} awakening</small></div>
        </header>
        <section class="rune-base-panel rune-even-base">
          <div class="rune-base-icon">${icon}</div>
          <article>
            <strong>Base Rune Effect</strong>
            <p>${esc(clip(baseEffect, 520))}</p>
          </article>
        </section>
        <section class="rune-awakening-panel rune-even-branch-panel">
          <header><div><span>${esc(family)} Awakening Path</span><h5>${esc(awakeningCount)} awakening ${awakeningCount === 1 ? 'effect' : 'effects'}</h5></div><em>Guaranteed + choices</em></header>
          ${effectList(rows)}
        </section>
      </article>`;
    };

    const body = `<div class="soul-rune-clean soul-rune-polished soul-rune-even-layout">
      <section class="rune-route-card rune-clean-intro">
        <span>Rune System</span>
        <h4>Classic Rune / Forgotten Rune</h4>
        <p>Classic and Forgotten now use the same structure: base rune effect first, then the awakening path below it. The Forgotten guaranteed effect is included in the awakening list, so it no longer appears to have one effect missing.</p>
      </section>
      <div class="rune-polished-grid rune-polished-grid-even">
        ${familyCard({
          family: 'Classic',
          kicker: 'Base Soul Rune',
          title: rune.name || `${c.name} Soul Rune`,
          icon: img(rune.image || iconFor(c), rune.name || 'Soul Rune'),
          baseEffect: classicBaseEffect,
          rows: classicAwakeningRows,
          toneClass: 'classic-rune'
        })}
        ${familyCard({
          family: 'Forgotten',
          kicker: 'Base Forgotten Soul Rune',
          title: 'Forgotten Soul Rune',
          icon: forgottenRuneIcon(),
          baseEffect: forgottenBaseEffect,
          rows: forgottenAwakeningRows,
          toneClass: 'forgotten-rune'
        })}
      </div>
    </div>`;
    return module('Soul Rune', 'Base rune effects, Forgotten Rune bonuses, and branch choices displayed with matching structure and calmer readability.', body);
  }

  function artifacts() {
    const body = `<div class="artifact-board">${artifactPaths(current()).map(renderTierPath).join('')}</div>`;
    return module('Artifact Routes', 'Heaven and Hell paths are compact tier progressions with no stretched empty containers.', body);
  }

  function artifactPaths(c) {
    const items = artifactItems(c);
    if (items.length) return items.map(item => ({
      name: item.name || 'Artifact Route',
      tone: item.tone || (/hell/i.test(item.name || '') ? 'hell' : 'heaven'),
      icon: item.image || iconFor(c),
      tiers: Array.isArray(item.effects || item.tiers) ? (item.effects || item.tiers) : []
    }));
    if (Array.isArray(c.artifactEffects)) {
      return [
        { name: 'Heaven Artifact', tone: 'heaven', icon: iconFor(c), tiers: c.artifactEffects.slice(0, 3) },
        { name: 'Hell Artifact', tone: 'hell', icon: iconFor(c), tiers: c.artifactEffects.slice(3, 6) }
      ];
    }
    return [
      { name: 'Heaven Artifact', tone: 'heaven', icon: iconFor(c), tiers: [] },
      { name: 'Hell Artifact', tone: 'hell', icon: iconFor(c), tiers: [] }
    ];
  }

  function renderTierPath(path) {
    return `<article class="artifact-path ${esc(path.tone || '')}"><header>${img(path.icon, path.name || 'Artifact')}<div><span class="card-kicker">${esc(path.tone || 'route')}</span><h4>${esc(path.name)}</h4><p>${path.tiers.length} real artifact effects loaded</p></div></header><div>${path.tiers.length ? path.tiers.map((tier, i) => {
      const label = tier?.tier || `T${i + 1}`;
      const title = tier?.name || tier?.title || `Tier ${i + 1}`;
      const desc = tier?.description || tier?.effect || tier;
      const icon = tier?.image || path.icon;
      return `<article class="artifact-tier"><span>${esc(label)}</span>${img(icon, title || label)}<div><h5>${esc(title)}</h5><p>${esc(clip(desc, 190))}</p></div></article>`;
    }).join('') : '<div class="empty-state">No artifact effect data found for this path.</div>'}</div></article>`;
  }

  function planner() {
    const c = current();
    const g = goals[state.goal] || goals.bosses;
    const specs = specOptions(c);
    if (state.spec !== 'auto' && !specs.some(s => s.name === state.spec)) state.spec = 'auto';
    const spec = activeSpec(c);
    const split = statSplit(g);
    const awakening = recommendAwakening(c, Math.min(Number(state.slots) || 3, 6), g);
    const artifacts = artifactAdvice(c, g);
    const wizardPlan = wizardSpellPlan(c, g);
    const rotationQueue = rotationPriorityQueue(c, g).slice(0, 7);
    const level = Number(state.level) || 0;
    const isAwakened = state.awakened !== false;
    const specSummary = spec ? `${spec.name}: ${clip(spec.description || 'Selected specialization.', 140)}` : 'No specialization data found for this class.';

    const panel = (num, title, note, content, extra = '') => `<section class="bp-panel ${extra}">
      <header><span>${esc(num)}</span><div><h4>${esc(title)}</h4><p>${esc(note)}</p></div></header>
      <div class="bp-panel-body">${content}</div>
    </section>`;

    const body = `<div class="bp-dashboard">
      <section class="bp-hero">
        <div class="bp-hero-copy">
          <span>Build Planner</span>
          <h3>${esc(c.name || 'Class')} ${esc(g.title)} Build</h3>
          <p>${esc(g.note)} Recommendations use level, awakening status, specialization, exact stat names, rotation priority, awakening effects, artifact route, and wizard spell tiers.</p>
        </div>
        <button class="bp-snapshot-cta" data-open-snapshot type="button">
          <b>Open Premium Snapshot</b>
          <small>Dark screenshot window</small>
        </button>
      </section>

      <section class="bp-setup">
        <header><span>01</span><div><h4>Build Setup</h4><p>Set the player state before reading recommendations.</p></div></header>
        <div class="bp-goals">
          ${Object.entries(goals).map(([id, goal]) => `<button class="bp-goal ${state.goal === id ? 'active' : ''}" data-goal="${id}" type="button"><b>${esc(goal.icon)}</b><span>${esc(goal.title)}</span></button>`).join('')}
        </div>
        <div class="bp-inputs">
          <label><span>Player Level</span><input data-planner="level" type="number" min="1" max="5000" step="1" value="${esc(state.level)}"></label>
          <label><span>Awakening Slots</span><input data-planner="slots" type="number" min="1" max="12" value="${esc(state.slots)}"></label>
          <label><span>Stat Points</span><input data-planner="points" type="number" min="0" step="10" value="${esc(state.points)}"></label>
          <label><span>Awakened?</span><select data-planner-select="awakened"><option value="yes" ${isAwakened ? 'selected' : ''}>Yes, awakened</option><option value="no" ${!isAwakened ? 'selected' : ''}>Not awakened yet</option></select></label>
          <label><span>Specialization</span><select data-planner-select="spec"><option value="auto" ${state.spec === 'auto' ? 'selected' : ''}>Auto recommend</option>${specs.map(s => `<option value="${esc(s.name)}" ${state.spec === s.name ? 'selected' : ''}>${esc(s.name)}</option>`).join('')}</select></label>
        </div>
        <div class="bp-readout">
          <article><span>Class</span><b>${esc(c.name)}</b></article>
          <article><span>Goal</span><b>${esc(g.title)}</b></article>
          <article><span>Level</span><b>${esc(level || '—')}</b></article>
          <article><span>Spec</span><b>${esc(spec?.name || 'Auto')}</b></article>
          <article><span>Status</span><b>${esc(isAwakened ? 'Awakened' : 'Pre-awakening')}</b></article>
        </div>
        <p class="bp-context">${esc(specSummary)}</p>
      </section>

      <div class="bp-grid">
        ${panel('02', 'Recommended Stats', 'Exact stat names instead of broad categories.', `<div class="bp-list bp-stat-list">${split.map(([name, value, reason], i) => `<article><b>${String(i + 1).padStart(2, '0')}</b><div><strong>${esc(name)}</strong><p>${esc(reason)}</p><em>${esc(value)} suggested points</em></div></article>`).join('')}</div>`, 'bp-stat-panel')}

        ${panel('03', 'Accessible Bot Rotation', 'Only spells the player can actually use at the selected level are recommended.', `<div class="bp-list bp-rotation-list">${rotationQueue.map(item => `<article><b>${esc(item.priority)}</b><div><strong>${esc(item.name)}</strong><p>${esc(item.reason)}</p><em>${esc(item.access)} · CD ${esc(item.cooldown)} · Delay ${esc(item.delay)}</em></div></article>`).join('') || '<div class="empty-state">No accessible spell rows found for this level. Raise Player Level to unlock more rotation options.</div>'}</div>`, 'bp-rotation-panel')}

        ${panel('04', 'Awakening Spell Recommendations', 'Spell name plus the exact awakening effect suitable for this build.', `<div class="bp-list">${isAwakened ? (awakening.map((p, i) => `<article><b>${String(i + 1).padStart(2, '0')}</b><div><strong>${esc(awakeningDisplayName(p))}</strong><p>${esc(clip(p.guaranteed || p.effect || p.choiceEffect, 210))}</p><em>${esc(p.sourceCategory || 'Awakening Spells')}</em></div></article>`).join('') || '<div class="empty-state">No awakening effect data found.</div>') : '<div class="empty-state">This player is marked as not awakened yet. Set Awakened to Yes to show awakening spell recommendations.</div>'}</div>`, 'bp-awakening-panel')}

        ${panel('05', 'Artifact Route', 'Only shown when the selected player state can access artifacts.', `<div class="bp-list">${artifacts.map((p, i) => `<article><b>${esc(p.tier || i + 1)}</b><div><strong>${esc(`${p.path}: ${p.name || p.title || 'Effect'}`)}</strong><p>${esc(clip(p.effect || p.description, 185))}</p><em>Awakened Lv 1500+ route</em></div></article>`).join('') || `<div class="empty-state">Artifact recommendations are hidden because this setup is ${state.awakened === false ? 'not awakened' : `level ${esc(playerLevel())}`}. Set Awakened to Yes and level 1500+ to show artifact routes.</div>`}</div>`, 'bp-artifact-panel')}

        ${panel('06', 'Wizard Spell Choice', 'Players can equip only one wizard spell. This recommends one spell and its three tier effects.', renderWizardPlan(wizardPlan), 'bp-wizard-panel')}
      </div>

      <section class="bp-snapshot-panel">
        <div>
          <span>Share Card</span>
          <h4>Premium Build Snapshot</h4>
          <p>Opens a separate dark preview window made for player screenshots. No cramped embedded card, no vertical text, no broken export layout.</p>
        </div>
        <button data-open-snapshot type="button"><b>Open Premium Snapshot</b><small>Screenshot-ready dark window</small></button>
      </section>
    </div>`;
    return module('Build Planner', 'A stable build planner for level, awakening state, specialization, stat names, rotation, awakenings, artifacts, and wizard spell tiers.', body, 'planner-module');
  }

  function renderSnapshotCard(c, g, split, awakening, artifacts, rotationList, spells) {
    const topArtifact = artifacts[0] ? `${artifacts[0].path} ${artifacts[0].tier || ''}`.replace(/\s+/g, ' ').trim() : 'Artifact Route';
    const mainEffect = artifacts[0] ? (artifacts[0].effect || artifacts[0].description || artifacts[0].name || artifacts[0].title || 'Recommended artifact effect') : 'No artifact data found.';
    const featuredAwake = awakening[0]?.title || 'Awakening Path';
    const spellFocus = spells[0]?.name || 'Spell Direction';
    const rotationPreview = rotationList.slice(0, 4).join(' → ') || 'No rotation loaded';
    const buildTag = `${g.title} · ${state.points} pts · ${state.slots} slots`;
    return `<section class="share-snapshot html-snapshot-stage" id="buildSnapshotCard" aria-label="HTML build snapshot">
      <div class="snapshot-stage-toolbar">
        <div><span>HTML Snapshot Mode</span><strong>Screenshot-ready build presentation</strong></div>
        <p>No canvas export. This is a real responsive HTML card, so players can screenshot the actual design.</p>
      </div>
      <article class="snapshot-showcase-card">
        <div class="snapshot-showcase-bg">${esc(String(c.name || 'A').slice(0, 1).toUpperCase())}</div>
        <header class="snapshot-showcase-hero">
          <div class="snapshot-class-mark">${img(iconFor(c), c.name || 'Class')}</div>
          <div class="snapshot-class-copy">
            <span>Archlight Build Blueprint</span>
            <h4>${esc(c.name)}</h4>
            <p>${esc(buildTag)} · ${esc(g.bias.join(' + '))}</p>
          </div>
          <div class="snapshot-slots-emblem"><b>${esc(state.slots)}</b><span>Awakening Slots</span></div>
        </header>

        <div class="snapshot-showcase-focus">
          <article><span>Goal</span><strong>${esc(g.title)}</strong><p>${esc(g.note)}</p></article>
          <article><span>Featured Route</span><strong>${esc(clip(topArtifact, 36))}</strong><p>${esc(clip(mainEffect, 110))}</p></article>
          <article><span>Primary Spell</span><strong>${esc(clip(spellFocus, 34))}</strong><p>${esc(clip(featuredAwake, 66))}</p></article>
        </div>

        <div class="snapshot-showcase-body">
          <section class="snapshot-stat-suite">
            <div class="snapshot-suite-title"><span>Stat Direction</span><strong>${esc(g.title)} Spread</strong></div>
            ${split.map(([label, value]) => `<article class="snapshot-stat-chip"><b>${esc(value)}</b><div><strong>${esc(label)}</strong><i><u style="width:${Math.max(8, Math.min(100, Number(value) || 0))}%"></u></i></div></article>`).join('')}
          </section>

          <section class="snapshot-route-suite">
            <div class="snapshot-suite-title"><span>Build Route</span><strong>${esc(clip(topArtifact, 42))}</strong></div>
            <p>${esc(clip(mainEffect, 170))}</p>
            <div class="snapshot-mini-chain">
              ${artifacts.slice(0, 3).map((e, i) => `<span><b>${i + 1}</b>${esc(clip(`${e.path} ${e.tier || ''}: ${e.name || e.title || 'Effect'}`.replace(/\s+/g, ' ').trim(), 34))}</span>`).join('') || '<span>No artifact route found.</span>'}
            </div>
          </section>
        </div>

        <div class="snapshot-showcase-grid">
          <section>
            <span>Awakening Picks</span>
            ${awakening.slice(0, 3).map((e, i) => `<article><b>${i + 1}</b><strong>${esc(clip(e.title, 38))}</strong></article>`).join('') || '<article><strong>No awakening data found.</strong></article>'}
          </section>
          <section>
            <span>Bot Rotation</span>
            <p>${esc(clip(rotationPreview, 120))}</p>
          </section>
          <section>
            <span>Spell Direction</span>
            ${spells.slice(0, 2).map((spell, i) => `<article><b>${i + 1}</b><strong>${esc(clip(spell.name || spell.title || 'Spell Direction', 38))}</strong></article>`).join('') || '<article><strong>No spell focus loaded.</strong></article>'}
          </section>
        </div>

        <footer class="snapshot-showcase-footer">
          <span>${esc(c.name)} · ${esc(g.title)} Build</span>
          <b>Archlight Flagship Snapshot</b>
        </footer>
      </article>
    </section>`;
  }

  function primaryStatName(c = current()) {
    const scaling = String(c.scaling || '').toLowerCase();
    if (/strength/.test(scaling)) return 'Strength';
    if (/dexterity|distance|ranged|bow|gun/.test(scaling)) return 'Dexterity';
    if (/intelligence|spell|magic|caster/.test(scaling)) return 'Intelligence';
    if (/wisdom|support|healing/.test(scaling)) return 'Wisdom';
    return 'Primary Damage Stat';
  }

  function specOptions(c = current()) {
    return Array.isArray(c.specializations) ? c.specializations.filter(s => s && s.name) : [];
  }

  function activeSpec(c = current()) {
    const specs = specOptions(c);
    if (!specs.length) return null;
    if (state.spec && state.spec !== 'auto') return specs.find(s => s.name === state.spec) || specs[0];
    const goalText = `${goals[state.goal]?.title || ''} ${goals[state.goal]?.note || ''}`.toLowerCase();
    return specs.find(s => new RegExp(String(s.name || '').toLowerCase()).test(goalText)) || specs[0];
  }

  function statSplit(goal) {
    const c = current();
    const points = Number(state.points) || Math.max(0, Math.round((Number(state.level) || 0) / 10));
    const roleText = `${c.roles || ''} ${c.tags ? c.tags.join(' ') : ''}`.toLowerCase();
    const spec = activeSpec(c);
    const specText = `${spec?.name || ''} ${spec?.description || ''}`.toLowerCase();
    const isTank = /tank|off-tank|guardian|death knight/.test(roleText + ' ' + specText);
    const isSupport = /support|healer|heal|bard|druid/.test(roleText + ' ' + specText);
    const isRanged = /ranged|bow|gun|archer|gunslinger/.test(roleText + ' ' + specText);
    const isCaster = /caster|spell|magic|mage|wizard|necromancer/.test(roleText + ' ' + specText);
    const main = primaryStatName(c);
    const survival = isTank ? 'Vitality' : isSupport ? 'Vitality' : 'Vitality';
    const tempo = isSupport ? 'Cooldown Reduction' : isRanged ? 'Haste' : isCaster ? 'Cooldown Reduction' : 'Haste';

    let damageShare = goal.bias.includes('damage') ? 0.48 : 0.36;
    let survivalShare = goal.bias.includes('defense') ? 0.42 : 0.26;
    let utilityShare = 1 - damageShare - survivalShare;
    if (isTank) {
      survivalShare += 0.10;
      damageShare -= 0.06;
      utilityShare -= 0.04;
    }
    if (isSupport) {
      utilityShare += 0.08;
      damageShare -= 0.04;
      survivalShare -= 0.04;
    }
    if (goal.bias.includes('utility')) {
      utilityShare += 0.08;
      damageShare -= 0.04;
      survivalShare -= 0.04;
    }

    damageShare = Math.max(0.25, Math.min(0.62, damageShare));
    survivalShare = Math.max(0.18, Math.min(0.52, survivalShare));
    utilityShare = Math.max(0.14, 1 - damageShare - survivalShare);
    const damagePts = Math.max(0, Math.round(points * damageShare));
    const survivalPts = Math.max(0, Math.round(points * survivalShare));
    const utilityPts = Math.max(0, points - damagePts - survivalPts);

    return [
      [main, damagePts, `Damage category pick. ${main} matches this class scaling and ${goal.title.toLowerCase()} pressure.`],
      [survival, survivalPts, `Defense category pick. ${survival} keeps the build stable for ${isTank ? 'frontline/tank pressure' : 'bosses, solo play, and mistakes'}.`],
      [tempo, utilityPts, `Utility category pick. ${tempo} improves rotation flow, uptime windows, and bot priority comfort.`]
    ];
  }

  function recommendAwakening(c, count, goal = goals[state.goal] || goals.bosses) {
    if (state.awakened === false) return [];
    const effects = awakeningBySource(c).slice();
    const spec = activeSpec(c);
    const specText = `${spec?.name || ''} ${spec?.description || ''}`.toLowerCase();
    const rotationNames = new Set(rotationPriorityQueue(c, goal).slice(0, 7).map(item => item.name.toLowerCase()));
    const ranked = effects.sort((a, b) => awakeningWeight(b, goal, specText, rotationNames) - awakeningWeight(a, goal, specText, rotationNames));
    return ranked.slice(0, Math.max(1, Number(count) || 3));
  }

  function awakeningWeight(effect, goal, specText = '', rotationNames = new Set()) {
    const text = `${effect.title || ''} ${effect.guaranteed || ''} ${effect.effect || ''} ${effect.choiceName || ''} ${effect.choiceEffect || ''}`.toLowerCase();
    let n = 0;
    if (goal.bias.includes('damage') && /damage|hit|attack|critical|burst|bleed|proc|projectile|area|aoe|cast/.test(text)) n += 6;
    if (goal.bias.includes('defense') && /heal|shield|protect|resistance|sustain|cleanse|absorb|armor|reduce|immortal/.test(text)) n += 6;
    if (goal.bias.includes('utility') && /speed|cooldown|slow|paraly|stun|control|buff|summon|range|follow|split/.test(text)) n += 6;
    if (specText && text.split(/\W+/).some(word => word.length > 4 && specText.includes(word))) n += 2;
    if (rotationNames.has(String(effect.title || '').toLowerCase())) n += 3;
    if (/guaranteed|always/.test(text)) n += 1;
    if (effect.choiceName || effect.choiceEffect) n += 1;
    return n;
  }

  function artifactAdvice(c, goal) {
    if (state.awakened === false || playerLevel() < 1500) return [];
    const effects = artifactEffects(c).slice();
    const ranked = effects.sort((a, b) => {
      const wa = artifactWeight(a, goal);
      const wb = artifactWeight(b, goal);
      return wb - wa;
    });
    return ranked.slice(0, 5);
  }

  function artifactWeight(effect, goal) {
    const text = `${effect.name || ''} ${effect.effect || effect.description || ''} ${effect.path || ''}`.toLowerCase();
    let n = 0;
    if (goal.bias.includes('damage') && /damage|cast|critical|attack|bleed|proc|cooldown|heaven/.test(text)) n += 4;
    if (goal.bias.includes('defense') && /heal|shield|resistance|protect|surviv|cleanse|hell/.test(text)) n += 4;
    if (goal.bias.includes('utility') && /speed|area|summon|control|stun|paraly|cooldown|buff/.test(text)) n += 4;
    if (/t3|t4|t5/.test(String(effect.tier || '').toLowerCase())) n += 1;
    return n;
  }

  function wizardSpellPlan(c, goal) {
    const list = Array.isArray(c.wizardSpells) ? c.wizardSpells : [];
    const roleText = `${c.roles || ''} ${c.tags ? c.tags.join(' ') : ''}`.toLowerCase();
    const spec = activeSpec(c);
    const specText = `${spec?.name || ''} ${spec?.description || ''}`.toLowerCase();
    const rotationText = rotationPriorityQueue(c, goal).slice(0, 5).map(item => `${item.name} ${item.reason}`).join(' ').toLowerCase();
    const normalized = list.map(spell => ({ ...spell, _key: wizardKey(spell?.name), score: wizardWeight(spell, goal, roleText, specText, rotationText) }));
    const fallback = fallbackWizardSpell(goal, roleText, specText);
    const chosen = normalized.length ? normalized.sort((a, b) => b.score - a.score)[0] : fallback;
    const clean = chosen || fallback;
    const tiers = wizardTierEffects(clean, goal, roleText, specText);
    const reason = wizardReason(clean, goal, roleText, specText);
    return { ...clean, use: reason || clean.use || fallback.use, tiers };
  }

  function wizardKey(name) {
    const text = String(name || '').toLowerCase();
    if (/minerva|corruption/.test(text)) return 'minerva';
    if (/oxon|loyalty/.test(text)) return 'oxon';
    if (/azax|seal/.test(text)) return 'azax';
    if (/zaqor|wisdom/.test(text)) return 'zaqor';
    return text.replace(/[^a-z0-9]+/g, ' ').trim();
  }

  function wizardWeight(spell, goal, roleText, specText, rotationText) {
    const key = wizardKey(spell?.name);
    const text = `${spell?.name || ''} ${spell?.role || ''} ${spell?.use || ''}`.toLowerCase();
    const selectedGoal = String(state.goal || '').toLowerCase();
    const buildText = `${roleText} ${specText}`;
    let score = 0;

    // One spell only: choose by the actual build goal first, then role/spec as a tiebreaker.
    if (selectedGoal === 'bosses') {
      if (key === 'oxon') score += 100;
      if (key === 'minerva') score += 74;
      if (key === 'azax') score += 28;
      if (key === 'zaqor') score += 20;
    } else if (selectedGoal === 'pve') {
      if (key === 'minerva') score += 100;
      if (key === 'oxon') score += 56;
      if (key === 'azax') score += 34;
      if (key === 'zaqor') score += 18;
    } else if (selectedGoal === 'pvp') {
      if (key === 'azax') score += 100;
      if (key === 'minerva') score += 70;
      if (key === 'oxon') score += 46;
      if (key === 'zaqor') score += 30;
    } else if (selectedGoal === 'support') {
      if (key === 'zaqor') score += 100;
      if (key === 'azax') score += 52;
      if (key === 'oxon') score += 36;
      if (key === 'minerva') score += 22;
    } else if (selectedGoal === 'solo') {
      if (key === 'oxon') score += 92;
      if (key === 'minerva') score += 76;
      if (key === 'azax') score += 42;
      if (key === 'zaqor') score += 32;
    }

    if (/tank|guardian|death knight|off-tank/.test(buildText) && key === 'oxon') score += 22;
    if (/support|healer|bard|druid/.test(buildText) && selectedGoal === 'support' && key === 'zaqor') score += 28;
    if (/support|healer|bard|druid/.test(buildText) && selectedGoal !== 'support' && key === 'zaqor') score -= 30;
    if (/ranged|caster|damage|archer|gunslinger|sorcerer|berserker/.test(buildText) && (key === 'minerva' || key === 'oxon')) score += 12;
    if (/control|paraly|stun|slow|interrupt/.test(rotationText) && key === 'azax') score += 10;

    if (/burst|damage|offensive|pressure/.test(text) && key === 'minerva') score += 3;
    if (/single-target|boss|uptime/.test(text) && key === 'oxon') score += 3;
    if (/control|pvp|interrupt/.test(text) && key === 'azax') score += 3;
    if (/support|defensive/.test(text) && key === 'zaqor') score += 3;
    return score;
  }

  function fallbackWizardSpell(goal, roleText, specText) {
    const selectedGoal = String(state.goal || '').toLowerCase();
    if (selectedGoal === 'support') return { name: 'Zaqor\'s Wisdom', role: 'support', use: 'Selected because the build goal is Support, where team value and safer uptime matter most.' };
    if (selectedGoal === 'pvp') return { name: 'Azax\'s Seal', role: 'control', use: 'Selected because the build goal is PvP, where control windows and setup pressure matter most.' };
    if (selectedGoal === 'pve') return { name: 'Minerva\'s Corruption', role: 'burst', use: 'Selected because the build goal is PvE clear, where offensive pressure and fast pack cleanup matter most.' };
    if (selectedGoal === 'solo' || goal.bias.includes('defense') || /tank|off-tank/.test(roleText + ' ' + specText)) return { name: 'Oxon\'s Loyalty', role: 'single-target', use: 'Selected because this build values reliable bossing, uptime, and safer solo pressure.' };
    return { name: 'Oxon\'s Loyalty', role: 'single-target', use: 'Selected as the safest default wizard spell for reliable single-target value.' };
  }

  function wizardReason(spell, goal, roleText, specText) {
    const key = wizardKey(spell?.name);
    const selectedGoal = String(state.goal || '').toLowerCase();
    if (key === 'minerva') return selectedGoal === 'pve'
      ? 'Selected for PvE clear because it gives the build the most direct offensive pressure.'
      : 'Selected when the build wants aggressive burst windows and raw damage pressure.';
    if (key === 'oxon') return selectedGoal === 'bosses'
      ? 'Selected for bosses because reliable single-target value and uptime matter more than random utility.'
      : 'Selected for safer solo/boss pressure when the build needs consistency.';
    if (key === 'azax') return selectedGoal === 'pvp'
      ? 'Selected for PvP because control and setup windows are usually stronger than raw uptime.'
      : 'Selected when the build benefits from extra control and safer engage windows.';
    if (key === 'zaqor') return selectedGoal === 'support'
      ? 'Selected for Support because this is the team-value wizard spell path.'
      : 'Selected only when the build is intentionally leaning into support/defensive utility.';
    return spell?.use || 'Selected from the current build goal and role profile.';
  }

  function wizardTierEffects(spell, goal, roleText, specText) {
    const key = wizardKey(spell?.name);
    const selectedGoal = String(state.goal || '').toLowerCase();
    const sets = {
      minerva: [
        ['Tier 1', 'Unlock Minerva\'s Corruption as the selected wizard spell and use it as your offensive pressure button.'],
        ['Tier 2', selectedGoal === 'pve' ? 'Upgrade the spell toward faster pack cleanup and smoother damage uptime.' : 'Upgrade the spell toward stronger burst windows against priority targets.'],
        ['Tier 3', 'Finish the path with the highest damage-pressure modifier for boss burns, PvE clears, and kill windows.']
      ],
      oxon: [
        ['Tier 1', 'Unlock Oxon\'s Loyalty as the selected wizard spell and use it for reliable single-target pressure.'],
        ['Tier 2', 'Upgrade the spell for better uptime and safer boss/solo consistency.'],
        ['Tier 3', 'Finish the path with the strongest loyalty modifier for long fights and priority-target pressure.']
      ],
      azax: [
        ['Tier 1', 'Unlock Azax\'s Seal as the selected wizard spell and use it to create control/setup windows.'],
        ['Tier 2', 'Upgrade the seal for better reliability so your main rotation connects more often.'],
        ['Tier 3', 'Finish the path with the strongest control-pressure modifier for PvP and dangerous pulls.']
      ],
      zaqor: [
        ['Tier 1', 'Unlock Zaqor\'s Wisdom as the selected wizard spell and use it for support/defensive value.'],
        ['Tier 2', 'Upgrade the spell toward better survival, utility, and team uptime.'],
        ['Tier 3', 'Finish the path with the strongest wisdom modifier for sustained support fights.']
      ]
    };
    return (sets[key] || sets.oxon).map(([tier, effect]) => ({ tier, effect }));
  }

  function wizardChoices(c, goal) {
    const plan = wizardSpellPlan(c, goal);
    return [{ name: plan.name, note: plan.use, tiers: plan.tiers, effect: (plan.tiers || []).map(t => `${t.tier}: ${t.effect}`).join(' ') }];
  }

  function renderWizardPlan(plan) {
    const tiers = Array.isArray(plan?.tiers) ? plan.tiers : [];
    return `<div class="bp-wizard-choice">
      <article class="bp-wizard-selected">
        <span>One Wizard Spell Equipped</span>
        <h5>${esc(plan?.name || 'Recommended Wizard Spell')}</h5>
        <p>${esc(plan?.use || 'Recommended based on class role, selected goal, specialization, and rotation needs.')}</p>
      </article>
      <div class="bp-wizard-tier-list">
        ${tiers.map((tier, i) => `<article class="bp-wizard-tier"><b>${esc(tier.tier || `Tier ${i + 1}`)}</b><div><strong>${esc(tier.tier || `Tier ${i + 1}`)} Effect</strong><p>${esc(tier.effect || 'Recommended wizard spell effect for this tier.')}</p></div></article>`).join('')}
      </div>
    </div>`;
  }

  function awakeningDisplayName(effect) {
    const branch = effect.choiceName || (/guaranteed/i.test(effect.type || '') ? 'Guaranteed Effect' : 'Recommended Effect');
    return `${effect.title || 'Awakening Spell'} — ${branch}`;
  }

  function cooldownParts(row) {
    const raw = String(row?.Cooldown || row?.cooldown || '').trim();
    const parts = raw.split('/').map(v => v.trim()).filter(Boolean);
    return { raw: raw || '—', cooldown: parts[0] || raw || '—', delay: parts[1] || '—' };
  }

  function spellPurpose(row) {
    const group = `${row.group || row.groupTitle || ''}`.toLowerCase();
    const text = `${spellName(row)} ${spellDesc(row)}`.toLowerCase();
    if (/heal|healing|recovery|restore|regeneration/.test(group + ' ' + text)) return 'heal';
    if (/support|buff|speed|control|protection|defen|cleanse/.test(group + ' ' + text)) return 'support';
    return 'attack';
  }

  function rotationPriorityQueue(c, goal = goals[state.goal] || goals.bosses) {
    const level = playerLevel();
    const rows = spellRows(c)
      .filter(row => !/awakening/i.test(row.group || '') && spellName(row))
      .filter(canUseSpell);
    const roleText = `${c?.roles || ''} ${c?.tags ? c.tags.join(' ') : ''} ${c?.description || ''}`.toLowerCase();
    const selectedGoal = String(goal?.title || '').toLowerCase();
    const scored = rows.map(row => {
      const parts = cooldownParts(row);
      const purpose = spellPurpose(row);
      const name = spellName(row);
      const text = `${name} ${spellDesc(row)} ${row.group || ''}`.toLowerCase();
      const groupBuff = /party|team|ally|allies|group|nearby players|members|buff/.test(text) && !/damage to enemies|hit|attack|strike/.test(text);
      const aoe = /area|aoe|around|nearby enemies|all enemies|wave|cone|line|explosion|rain/.test(text);
      const sustain = /heal|recover|restore|shield|protect|cleanse|resistance/.test(text);
      const lowLevelComfort = level < 1500;
      let score = 10;

      if (goal.bias.includes('damage') && purpose === 'attack') score += 18;
      if (goal.bias.includes('damage') && aoe && /pve|clear/.test(selectedGoal)) score += 8;
      if (goal.bias.includes('defense') && (purpose === 'heal' || sustain)) score += 13;
      if (goal.bias.includes('utility') && purpose === 'support' && !groupBuff) score += 7;
      if (/support/i.test(selectedGoal) && groupBuff) score += 18;
      if (!/support/i.test(selectedGoal) && groupBuff) score -= 16;
      if (/pve|clear/.test(selectedGoal) && groupBuff) score -= 10;
      if (/bard/.test(roleText) && /pve|clear/.test(selectedGoal) && purpose === 'attack') score += 8;
      if (/bard/.test(roleText) && !/support/i.test(selectedGoal) && /buff party|party buff|allies|ally|team/.test(text)) score -= 12;
      if (lowLevelComfort && rowLevel(row) > 0) score += Math.max(0, 6 - Math.floor(rowLevel(row) / 50));
      if (/increase|damage of|speed|shield|protect/.test(text) && !groupBuff) score += 4;
      if (/mega|strong|burst|focused|grace|blessing/.test(text) && !groupBuff) score += 3;
      const cd = Number((parts.cooldown.match(/[\d.]+/) || [0])[0]);
      if (cd && cd <= 2) score += 2;
      if (cd && cd >= 30 && !sustain) score -= 1;
      const reason = groupBuff
        ? (/support/i.test(selectedGoal) ? 'Team buff window. Recommended because Support is the selected goal.' : 'Team buff. Kept lower for this goal because solo/PvE clear usually needs direct output first.')
        : purpose === 'heal'
          ? 'Recovery/sustain trigger. Keep high if survival is the goal.'
          : purpose === 'support'
            ? 'Utility/control tool. Use when it improves the pull or setup window.'
            : 'Accessible damage spell. Use by priority while respecting cooldown and delay.';
      return { row, score, purpose, parts, reason, required: rowLevel(row) };
    }).sort((a, b) => b.score - a.score || a.required - b.required);

    return scored.map((item, index) => ({
      priority: index + 1,
      name: spellName(item.row),
      cooldown: item.parts.cooldown,
      delay: item.parts.delay,
      level: item.required,
      access: accessLine(item.row),
      reason: item.reason,
      tone: item.purpose
    }));
  }

  const rotation = c => rotationPriorityQueue(c, goals[state.goal] || goals.bosses).slice(0, 6).map(item => item.name).concat(['Maintain buffs', 'Save defensive cooldown']).slice(0, 6);

  function compare() {
    const a = current(), b = opponent();
    const sa = score(a), sb = score(b);
    const keys = ['damage', 'defense', 'utility', 'range', 'complexity'];
    const body = `<div class="compare-board">
      <div class="opponent-chips">${classes.filter(c => c.id !== a.id).map(c => `<button class="compare-chip ${c.id === b.id ? 'active' : ''}" data-compare="${esc(c.id)}">${img(iconFor(c), c.name || 'Class')}<span><b>${esc(c.name)}</b><small>${esc(role(c))}</small></span></button>`).join('')}</div>
      <div class="versus-header"><article>${img(iconFor(a), a.name || 'Class')}<div><b>${esc(a.name)}</b><span>${esc(role(a))}</span></div></article><strong>VS</strong><article>${img(iconFor(b), b.name || 'Class')}<div><b>${esc(b.name)}</b><span>${esc(role(b))}</span></div></article></div>
      <div class="matrix-table">${keys.map(key => compareRow(key, sa[key], sb[key], a.name, b.name)).join('')}</div>
      ${renderStatMatrix('compare')}
      <footer class="verdict"><b>${esc(sa.damage + sa.utility >= sb.damage + sb.utility ? a.name : b.name)} has the stronger pressure profile.</b><span>Directional playstyle read, not a final balance score.</span></footer>
    </div>`;
    return module('Class Comparison', 'Pick an opponent and scan the difference through compact metric rows.', body);
  }

  function compareRow(key, a, b, an, bn) {
    const leader = a === b ? 'Even' : a > b ? an : bn;
    return `<article class="matrix-row matrix-row-v2">
      <header><b>${esc(key)}</b><span>${esc(leader)}</span></header>
      <div class="matrix-bars matrix-bars-v2">
        <div class="matrix-side"><span>${esc(an)}</span><strong>${esc(a)}</strong><i><u style="width:${a}%"></u></i></div>
        <div class="matrix-side"><span>${esc(bn)}</span><strong>${esc(b)}</strong><i><u style="width:${b}%"></u></i></div>
      </div>
    </article>`;
  }

  function bind() {
    document.getElementById('classSearch')?.addEventListener('input', e => { state.query = e.target.value; render(); });
    root.querySelectorAll('[data-roster-filter]').forEach(btn => btn.addEventListener('click', () => { state.rosterFilter = btn.dataset.rosterFilter; render(); }));
    root.querySelectorAll('[data-class]').forEach(btn => btn.addEventListener('click', () => { state.classId = btn.dataset.class; if (state.compareId === state.classId) state.compareId = classes.find(c => c.id !== state.classId)?.id || state.classId; render(); }));
    root.querySelectorAll('[data-tab]').forEach(btn => btn.addEventListener('click', () => {
      const nextTab = btn.dataset.tab;
      if (!nextTab || nextTab === state.tab) return;
      const currentIndex = tabs.findIndex(([id]) => id === state.tab);
      const nextIndex = tabs.findIndex(([id]) => id === nextTab);
      state.lastTab = state.tab;
      state.tabMotion = nextIndex >= currentIndex ? 'forward' : 'backward';
      state.tab = nextTab;
      render();
    }));
    root.querySelectorAll('[data-goal]').forEach(btn => btn.addEventListener('click', event => { event.preventDefault(); state.goal = btn.dataset.goal; render(); }));
    root.querySelectorAll('[data-goal-select]').forEach(select => select.addEventListener('change', event => { state.goal = event.target.value; render(); }));
    root.querySelectorAll('[data-compare]').forEach(btn => btn.addEventListener('click', () => { state.compareId = btn.dataset.compare; render(); }));
    root.querySelectorAll('[data-planner]').forEach(input => input.addEventListener('change', e => { state[e.target.dataset.planner] = Math.max(0, Number(e.target.value) || 0); render(); }));
    root.querySelectorAll('[data-planner-select]').forEach(input => input.addEventListener('change', e => {
      const key = e.target.dataset.plannerSelect;
      if (key === 'awakened') state.awakened = e.target.value !== 'no';
      else state[key] = e.target.value;
      render();
    }));
    root.querySelectorAll('[data-open-snapshot]').forEach(btn => btn.addEventListener('click', event => { event.preventDefault(); openSnapshotWindow(); }));
  }


  function openSnapshotWindow() {
    const c = current();
    const g = goals[state.goal] || goals.bosses;
    const split = statSplit(g);
    const awakening = recommendAwakening(c, state.slots, g).slice(0, 4);
    const artifacts = artifactAdvice(c, g).slice(0, 4);
    const spells = wizardChoices(c, g).slice(0, 3);
    const rotationList = rotation(c).slice(0, 5);
    const topArtifact = artifacts[0] ? `${artifacts[0].path} ${artifacts[0].tier || ''}`.replace(/\s+/g, ' ').trim() : 'Artifact Route';
    const mainEffect = artifacts[0] ? (artifacts[0].effect || artifacts[0].description || artifacts[0].name || artifacts[0].title || 'Recommended artifact effect') : 'No artifact data found.';
    const classIcon = asset(iconFor(c));
    const baseHref = `${window.location.href.split('#')[0].replace(/[^/]*$/, '')}`;
    const listRows = (items, fallback = 'No data loaded.') => (items.length ? items.slice(0, 4).map((item, i) => `<article><b>${i + 1}</b><span>${esc(clip(item, 105))}</span></article>`).join('') : `<p>${esc(fallback)}</p>`);
    const html = `<!doctype html><html><head><meta charset="utf-8"><base href="${esc(baseHref)}"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${esc(c.name)} Build Snapshot</title><style>
      :root{--bg:#050b13;--panel:#081522;--panel2:#0d1d30;--gold:#e4b55b;--gold2:#ffe0a0;--text:#e0ebf5;--muted:#9eb0c2;--line:rgba(228,181,91,.28);--cyan:#79d8ee;--ember:#ff855f}
      *{box-sizing:border-box}html,body{margin:0;min-height:100%;background:#050b13;color:var(--text);font-family:Inter,Segoe UI,Arial,sans-serif}body{padding:26px;background:radial-gradient(circle at 14% 0%,rgba(228,181,91,.18),transparent 24rem),radial-gradient(circle at 92% 100%,rgba(121,216,238,.10),transparent 30rem),linear-gradient(155deg,#091929 0%,#050b13 58%,#160f08 100%)}
      .snap-shell{max-width:1240px;margin:0 auto;display:grid;gap:16px}.snap-toolbar{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:12px 14px;border:1px solid rgba(228,181,91,.22);background:rgba(3,8,18,.64);box-shadow:0 14px 40px rgba(0,0,0,.28)}.snap-toolbar b{color:var(--gold2);letter-spacing:.13em;text-transform:uppercase}.snap-toolbar span{color:var(--muted);font-size:13px}.snap-toolbar button{border:1px solid rgba(228,181,91,.52);background:linear-gradient(90deg,rgba(228,181,91,.18),rgba(121,216,238,.08));color:var(--gold2);padding:10px 14px;font-weight:950;cursor:pointer;text-transform:uppercase;letter-spacing:.08em}
      .snap-card{position:relative;overflow:hidden;border:1px solid rgba(228,181,91,.58);background:linear-gradient(135deg,rgba(255,255,255,.055),transparent 18rem),linear-gradient(165deg,rgba(13,29,48,.96),rgba(4,10,18,.99) 60%,rgba(28,17,8,.96));box-shadow:0 32px 86px rgba(0,0,0,.46),inset 0 1px 0 rgba(255,255,255,.04);padding:22px}.snap-card:before{content:"";position:absolute;inset:12px;border:1px solid rgba(255,224,160,.14);pointer-events:none}.snap-card:after{content:"${esc(String(c.name||'A').slice(0,1).toUpperCase())}";position:absolute;right:30px;top:28px;font-size:310px;line-height:.8;font-weight:950;color:rgba(255,255,255,.030);pointer-events:none}.snap-content{position:relative;z-index:1;display:grid;gap:14px}
      .snap-hero{display:grid;grid-template-columns:82px minmax(0,1fr) 170px;gap:16px;align-items:center;padding:18px;border:1px solid rgba(228,181,91,.30);background:linear-gradient(90deg,rgba(228,181,91,.08),rgba(3,8,18,.52))}.snap-icon{width:82px;height:82px;display:grid;place-items:center;border:1px solid rgba(228,181,91,.34);background:rgba(0,0,0,.24)}.snap-icon img{width:66px;height:66px;object-fit:contain}.snap-title span,.kicker{color:var(--gold2);font-size:11px;font-weight:950;letter-spacing:.15em;text-transform:uppercase}.snap-title h1{margin:5px 0 7px;color:#fff2d6;font-size:56px;line-height:.92;letter-spacing:-.05em}.snap-title p{margin:0;color:#d7e4ef;font-size:17px;font-weight:800}.snap-slots{display:grid;place-items:center;gap:3px;min-height:100px;border:1px solid rgba(228,181,91,.36);background:rgba(4,10,18,.58);text-align:center}.snap-slots b{color:#fff2d6;font-size:42px}.snap-slots span{color:var(--gold);font-size:11px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}
      .snap-focus{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.snap-focus article,.snap-panel,.snap-route,.snap-stat-suite{border:1px solid rgba(132,164,197,.16);background:rgba(3,8,18,.44);padding:13px}.snap-focus span{display:block;color:var(--gold);font-size:10px;font-weight:950;letter-spacing:.12em;text-transform:uppercase}.snap-focus strong{display:block;margin-top:6px;color:#fff2d6;font-size:16px;line-height:1.16}.snap-main{display:grid;grid-template-columns:330px minmax(0,1fr);gap:12px}.snap-stat-suite{display:grid;gap:10px}.snap-stat-suite h3,.snap-panel h3,.snap-route h3{margin:0 0 10px;color:var(--gold2);font-size:14px;letter-spacing:.08em;text-transform:uppercase}.snap-stat{display:grid;grid-template-columns:60px minmax(0,1fr);gap:12px;align-items:center}.snap-stat b{color:#fff2d6;font-size:32px}.snap-stat strong{color:#fff2d6}.snap-stat i{display:block;height:7px;margin-top:6px;background:rgba(255,255,255,.08);overflow:hidden}.snap-stat u{display:block;height:100%;background:linear-gradient(90deg,var(--ember),var(--gold2))}.snap-route{min-height:100%;display:grid;align-content:start}.snap-route strong{color:#fff2d6;font-size:30px;line-height:1.05}.snap-route p{max-width:720px;color:#dce8f2;font-size:16px;line-height:1.48}.snap-note{margin-top:10px;padding:12px;border-left:4px solid var(--gold);background:rgba(228,181,91,.08);color:#fff2d6;font-weight:800;line-height:1.35}.snap-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.snap-list{display:grid;gap:8px}.snap-list article{display:grid;grid-template-columns:26px minmax(0,1fr);gap:9px;align-items:start}.snap-list b{display:grid;place-items:center;height:24px;background:rgba(228,181,91,.16);color:#fff2d6;font-size:12px}.snap-list span{color:#e7f0f7;font-weight:750;line-height:1.32}.snap-footer{display:flex;justify-content:space-between;gap:14px;align-items:center;padding:12px 14px;border:1px solid rgba(228,181,91,.20);background:rgba(0,0,0,.24);color:var(--muted);font-size:13px}.snap-footer b{color:var(--gold2)}@media(max-width:900px){body{padding:14px}.snap-hero,.snap-main,.snap-grid,.snap-focus{grid-template-columns:1fr}.snap-card{padding:14px}.snap-title h1{font-size:42px}.snap-card:after{display:none}.snap-toolbar{align-items:flex-start;flex-direction:column}}@media print{body{padding:0;background:#07111d}.snap-toolbar{display:none}.snap-card{box-shadow:none}}
    </style></head><body><main class="snap-shell"><div class="snap-toolbar"><b>Archlight Snapshot Preview</b><span>Dark screenshot window. Use browser screenshot or Print / Save.</span><button onclick="window.print()">Print / Save</button></div><article class="snap-card"><div class="snap-content"><section class="snap-hero"><div class="snap-icon"><img src="${esc(classIcon)}" alt="${esc(c.name)}"></div><div class="snap-title"><span>Archlight Class Build</span><h1>${esc(c.name || 'Class')}</h1><p>${esc(g.title)} build · ${esc(g.bias.join(' + '))}</p></div><div class="snap-slots"><b>${esc(state.slots)}</b><span>Awakening Slots</span></div></section><section class="snap-focus"><article><span>Goal</span><strong>${esc(g.title)}</strong></article><article><span>Featured Route</span><strong>${esc(clip(topArtifact,42))}</strong></article><article><span>Primary Spell</span><strong>${esc(clip(spells[0]?.name || 'Spell Direction',42))}</strong></article><article><span>Signature Awakening</span><strong>${esc(clip(awakening[0]?.title || 'Awakening Path',42))}</strong></article></section><section class="snap-main"><div class="snap-stat-suite"><h3>Stat Direction</h3>${split.map(([label,value])=>`<article class="snap-stat"><b>${esc(value)}</b><div><strong>${esc(label)}</strong><i><u style="width:${Math.max(8,Math.min(100,Number(value)||0))}%"></u></i></div></article>`).join('')}</div><div class="snap-route"><h3>Route Spotlight</h3><strong>${esc(topArtifact)}</strong><p>${esc(clip(mainEffect,230))}</p><div class="snap-note">${esc(g.note)} Current build uses ${esc(state.points)} stat points and ${esc(state.slots)} awakening slots.</div></div></section><section class="snap-grid"><section class="snap-panel"><h3>Awakening Picks</h3><div class="snap-list">${listRows(awakening.map(e=>e.title||'Awakening effect'))}</div></section><section class="snap-panel"><h3>Artifact Chain</h3><div class="snap-list">${listRows(artifacts.map(e=>`${e.path} ${e.tier||''}: ${e.name||e.title||'Effect'}`.replace(/\s+/g,' ').trim()))}</div></section><section class="snap-panel"><h3>Bot Rotation</h3><div class="snap-list">${listRows(rotationList)}</div></section><section class="snap-panel"><h3>Spell Direction</h3><div class="snap-list">${listRows(spells.map(s=>`${s.name||s.title||'Spell'} — ${s.note||s.description||'Recommended focus'}`))}</div></section></section><footer class="snap-footer"><span>${esc(c.name)} · ${esc(g.title)} · ${esc(state.points)} pts · ${esc(state.slots)} slots</span><b>ARCHLIGHT FLAGSHIP BUILD SNAPSHOT</b></footer></div></article></main></body></html>`;
    const popup = window.open('', 'archlightBuildSnapshot', 'width=1320,height=920,scrollbars=yes,resizable=yes');
    if (!popup) {
      alert('Snapshot popup was blocked. Please allow popups for this page and click the snapshot button again.');
      return;
    }
    popup.document.open();
    popup.document.write(html);
    popup.document.close();
    popup.focus();
  }

  function loadAssetImage(src) {
    return new Promise(resolve => {
      if (!src) return resolve(null);
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.onload = () => resolve(image);
      image.onerror = () => resolve(null);
      image.src = asset(src);
    });
  }

  async function exportSnapshotImage() {
    const c = current();
    const g = goals[state.goal] || goals.bosses;
    const split = statSplit(g);
    const awakening = recommendAwakening(c, state.slots, g).slice(0, 3);
    const artifacts = artifactAdvice(c, g).slice(0, 3);
    const spells = wizardChoices(c, g).slice(0, 2);
    const rot = rotation(c).slice(0, 4);
    const mainRoute = artifacts[0] ? `${artifacts[0].path} ${artifacts[0].tier || ''}`.replace(/\s+/g, ' ').trim() : 'Artifact Route';
    const mainEffect = artifacts[0] ? (artifacts[0].effect || artifacts[0].description || artifacts[0].name || artifacts[0].title || 'Recommended artifact effect') : 'No artifact data found.';

    const canvas = document.createElement('canvas');
    canvas.width = 1600;
    canvas.height = 900;
    const ctx = canvas.getContext('2d');
    ctx.textBaseline = 'alphabetic';
    ctx.textAlign = 'left';

    const bg = ctx.createLinearGradient(0, 0, 1600, 900);
    bg.addColorStop(0, '#10243a');
    bg.addColorStop(.48, '#07111d');
    bg.addColorStop(1, '#1b1108');
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, 1600, 900);
    radial(ctx, 230, 150, 430, 'rgba(255,217,138,.23)');
    radial(ctx, 1270, 730, 420, 'rgba(255,133,95,.16)');
    radial(ctx, 880, 110, 420, 'rgba(121,216,238,.08)');

    // Outer premium frame with safe inset so nothing clips.
    roundedPanel(ctx, 56, 56, 1488, 788, 0, 'rgba(255,255,255,.026)', 'rgba(255,217,138,.72)');
    ctx.strokeStyle = 'rgba(255,242,214,.16)';
    ctx.lineWidth = 1.5;
    ctx.strokeRect(80, 80, 1440, 740);
    ctx.fillStyle = 'rgba(255,217,138,.12)';
    ctx.fillRect(104, 102, 8, 168);

    // Hero block: no right-side collision, no giant overlapping watermark.
    roundedPanel(ctx, 104, 100, 1392, 170, 28, 'rgba(5,14,26,.72)', 'rgba(255,217,138,.24)');
    drawText(ctx, 'ARCHLIGHT CLASS BLUEPRINT', 142, 144, 22, '#ffd98a', '900', 620);
    fitText(ctx, c.name || 'Class', 142, 218, 70, '#fff2d6', '900', 640);
    wrapText(ctx, `${g.title} Build · ${g.bias.join(' + ')}`, 146, 256, 650, 22, 26, '#dceaf5', '800', 1);
    drawText(ctx, `${state.points} Stat Points`, 146, 288, 16, '#bdd1e2', '800', 360);

    roundedPanel(ctx, 1084, 122, 270, 112, 22, 'rgba(3,8,18,.58)', 'rgba(255,217,138,.30)');
    drawText(ctx, 'SELECTED CLASS', 1112, 156, 12, '#bdd1e2', '900');
    drawText(ctx, 'FLAGSHIP BUILD', 1112, 192, 27, '#fff2d6', '900', 210);
    wrapText(ctx, role(c), 1112, 222, 214, 14, 17, '#ffd98a', '850', 1);

    roundedPanel(ctx, 1380, 122, 92, 112, 22, 'rgba(3,8,18,.58)', 'rgba(255,217,138,.34)');
    ctx.textAlign = 'center';
    drawText(ctx, String(state.slots), 1426, 178, 42, '#fff2d6', '900');
    drawText(ctx, 'SLOTS', 1426, 214, 13, '#e4b55b', '900');
    ctx.textAlign = 'left';

    // Clear meta strip.
    drawPill(ctx, 104, 302, 248, 70, 'GOAL', g.title);
    drawPill(ctx, 370, 302, 410, 70, 'FEATURED ROUTE', mainRoute);
    drawPill(ctx, 798, 302, 318, 70, 'PRIMARY SPELL', spells[0]?.name || 'Spell Direction');
    drawPill(ctx, 1134, 302, 362, 70, 'SIGNATURE AWAKENING', awakening[0]?.title || 'Awakening Path');

    // Middle row: stats and route content aligned to fixed safe zones.
    split.forEach(([label, value], i) => {
      const x = 104 + i * 172;
      roundedPanel(ctx, x, 402, 152, 144, 20, 'rgba(3,8,18,.58)', 'rgba(255,217,138,.24)');
      drawText(ctx, String(value), x + 18, 459, 39, '#fff2d6', '900');
      drawText(ctx, label.toUpperCase(), x + 18, 490, 14, '#ffd98a', '900');
      ctx.fillStyle = 'rgba(255,255,255,.07)'; roundRect(ctx, x + 18, 512, 116, 10, 5); ctx.fill();
      ctx.fillStyle = i === 0 ? '#ff855f' : i === 1 ? '#79d8ee' : '#e4b55b';
      roundRect(ctx, x + 18, 512, Math.max(18, Math.min(116, Number(value) || 0)), 10, 5); ctx.fill();
    });

    roundedPanel(ctx, 634, 402, 862, 144, 22, 'rgba(10,20,34,.70)', 'rgba(255,217,138,.22)');
    drawText(ctx, 'ROUTE SPOTLIGHT', 660, 438, 18, '#ffd98a', '900');
    fitText(ctx, mainRoute, 660, 482, 32, '#fff2d6', '900', 560);
    wrapText(ctx, mainEffect, 660, 520, 590, 17, 22, '#dceaf5', '700', 1);
    drawText(ctx, 'PLANNER INTENT', 1250, 438, 14, '#ffd98a', '900');
    wrapText(ctx, g.note || 'Focused planner setup.', 1250, 468, 218, 17, 22, '#fff2d6', '850', 2);
    wrapText(ctx, 'Share-ready card with clean goal, route, stats, and spell focus.', 1250, 520, 220, 13, 16, '#cbd8e5', '700', 1);

    // Bottom grid leaves 58px footer clearance; no clipping.
    panel(ctx, 104, 584, 448, 210, 'AWAKENING PICKS', awakening.map(e => e.title || 'Awakening effect'), 3);
    panel(ctx, 576, 584, 448, 210, 'ARTIFACT CHAIN', artifacts.map(e => `${e.path} ${e.tier || ''}: ${e.name || e.title || 'Effect'}`.replace(/\s+/g, ' ').trim()), 3);
    panel(ctx, 1048, 584, 448, 96, 'BOT ROTATION', [rot.join(' › ')], 1);
    panel(ctx, 1048, 698, 448, 96, 'SPELL DIRECTION', spells.map(s => `${s.name || s.title || 'Spell'} — ${s.note || s.description || 'Recommended focus'}`), 1);

    roundedPanel(ctx, 104, 812, 1392, 26, 0, 'rgba(3,8,18,.58)', 'rgba(255,217,138,.16)');
    wrapText(ctx, `${c.name} · ${g.title} · ${state.points} pts · ${state.slots} slots`, 120, 830, 760, 13, 15, '#dceaf5', '700', 1);
    ctx.textAlign = 'right';
    drawText(ctx, 'ARCHLIGHT FLAGSHIP BUILD SNAPSHOT', 1480, 830, 13, '#e4b55b', '900');
    ctx.textAlign = 'left';

    const link = document.createElement('a');
    link.download = `${(c.name || 'archlight-build').toLowerCase().replace(/[^a-z0-9]+/g, '-')}-flagship-build-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  }

  function radial(ctx, x, y, radius, color) {
    const g = ctx.createRadialGradient(x, y, 0, x, y, radius);
    g.addColorStop(0, color);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g;
    ctx.fillRect(Math.max(0, x - radius), Math.max(0, y - radius), radius * 2, radius * 2);
  }

  function panel(ctx, x, y, w, h, title, rows, maxRows = 3) {
    roundedPanel(ctx, x, y, w, h, 20, 'rgba(3,8,18,.58)', 'rgba(255,217,138,.30)');
    drawText(ctx, title, x + 24, y + 35, 18, '#e4b55b', '900');
    let yCursor = y + 68;
    rows.slice(0, maxRows).forEach((row, i) => {
      ctx.fillStyle = 'rgba(228,181,91,.16)'; roundRect(ctx, x + 24, yCursor - 17, 24, 24, 7); ctx.fill();
      ctx.fillStyle = '#fff2d6'; ctx.font = '900 12px Inter, Segoe UI, Arial, sans-serif'; ctx.fillText(String(i + 1), x + 33, yCursor);
      const used = wrapText(ctx, String(row || '—'), x + 60, yCursor, w - 88, h > 120 ? 18 : 17, h > 120 ? 24 : 21, '#eef6fb', '700', h > 120 ? 2 : 1);
      yCursor += used + (h > 120 ? 12 : 0);
    });
  }

  function fillPanel(ctx, x, y, w, h, fill, stroke) {
    ctx.fillStyle = fill;
    ctx.fillRect(x, y, w, h);
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.strokeRect(x, y, w, h);
  }

  function roundRect(ctx, x, y, w, h, r) {
    const radius = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + w, y, x + w, y + h, radius);
    ctx.arcTo(x + w, y + h, x, y + h, radius);
    ctx.arcTo(x, y + h, x, y, radius);
    ctx.arcTo(x, y, x + w, y, radius);
    ctx.closePath();
  }

  function clipRoundRect(ctx, x, y, w, h, r) {
    roundRect(ctx, x, y, w, h, r);
    ctx.clip();
  }

  function roundedPanel(ctx, x, y, w, h, r, fill, stroke) {
    roundRect(ctx, x, y, w, h, r);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.strokeStyle = stroke;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  function drawPill(ctx, x, y, w, h, label, value) {
    roundedPanel(ctx, x, y, w, h, 16, 'rgba(3,8,18,.50)', 'rgba(132,164,197,.18)');
    drawText(ctx, label, x + 16, y + 23, 12, '#ffd98a', '900', w - 32);
    wrapText(ctx, value, x + 16, y + 50, w - 32, 18, 21, '#fff2d6', '820', 1);
  }

  function drawText(ctx, text, x, y, size, color, weight = '600', maxWidth) {
    ctx.textAlign = ctx.textAlign || 'left';
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px Inter, Segoe UI, Arial, sans-serif`;
    const raw = String(text || '');
    if (!maxWidth) return ctx.fillText(raw, x, y);
    if (ctx.measureText(raw).width <= maxWidth) return ctx.fillText(raw, x, y);
    let clipped = raw;
    while (clipped.length > 1 && ctx.measureText(`${clipped}…`).width > maxWidth) clipped = clipped.slice(0, -1);
    ctx.fillText(`${clipped}…`, x, y);
  }

  function fitText(ctx, text, x, y, size, color, weight, maxWidth) {
    let finalSize = size;
    ctx.font = `${weight} ${finalSize}px Inter, Segoe UI, Arial, sans-serif`;
    while (finalSize > 44 && ctx.measureText(String(text || '')).width > maxWidth) {
      finalSize -= 3;
      ctx.font = `${weight} ${finalSize}px Inter, Segoe UI, Arial, sans-serif`;
    }
    drawText(ctx, text, x, y, finalSize, color, weight, maxWidth);
  }

  function wrapText(ctx, text, x, y, maxWidth, size, lineHeight, color, weight = '600', maxLines = 2) {
    ctx.textAlign = 'left';
    ctx.fillStyle = color;
    ctx.font = `${weight} ${size}px Inter, Segoe UI, Arial, sans-serif`;
    const words = String(text || '').replace(/\s+/g, ' ').trim().split(' ').filter(Boolean);
    const lines = [];
    let current = '';
    words.forEach(word => {
      const test = current ? `${current} ${word}` : word;
      if (ctx.measureText(test).width <= maxWidth || !current) current = test;
      else { lines.push(current); current = word; }
    });
    if (current) lines.push(current);
    const visible = lines.slice(0, maxLines);
    if (lines.length > maxLines && visible.length) {
      let last = visible[visible.length - 1];
      while (last.length > 1 && ctx.measureText(`${last}…`).width > maxWidth) last = last.slice(0, -1);
      visible[visible.length - 1] = `${last}…`;
    }
    visible.forEach((line, i) => ctx.fillText(line, x, y + i * lineHeight));
    return Math.max(lineHeight, visible.length * lineHeight);
  }


  render();
})();
