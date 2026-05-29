(function(){
  const data = window.PROFESSIONS_INTERNAL_CONCEPT;
  const host = document.getElementById('professionsConcept');
  if (!data || !host) return;
  host.classList.add('professions-concept-root');

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const professions = Array.isArray(data.professions) ? data.professions : [];
  const groups = Array.isArray(data.groups) ? data.groups : [];
  let activeId = 'overview';
  let filter = 'all';
  let query = '';
  let lightboxIndex = 0;
  let lightboxItems = [];
  let sectionSpyCleanup = null;

  const mediaPath = file => {
    const value = String(file || '').trim();
    if (!value) return '';
    if (/^(?:https?:|data:|blob:)/i.test(value)) return value;
    if (value.startsWith('professions-media/')) return value;
    return `professions-media/${value}`;
  };
  const activeProfession = () => professions.find(p => p.id === activeId) || professions[0];
  const groupTitle = id => groups.find(g => g.id === id)?.title || id;
  const isOverviewActive = () => activeId === 'overview';
  const textFromHtml = html => {
    const box = document.createElement('div');
    box.innerHTML = html || '';
    return box.textContent || '';
  };

  function sanitizeGuideHtml(html){
    let out = String(html || '');
    out = out
      .replace(/<script[\s\S]*?<\/script>/gi, '')
      .replace(/window\.onload\s*=\s*function\s*\([^)]*\)\s*\{[\s\S]*?(?:\};?|$)/gi, '')
      .replace(/jQuery\s*\([\s\S]*?\);?/gi, '')
      .replace(/\$\s*\([\s\S]*?\);?/gi, '')
      .replace(/<p>\s*<p>/gi, '<p>')
      .replace(/<\/p>\s*<\/p>/gi, '</p>')
      .replace(/<p>\s*<\/p>/gi, '')
      .replace(/<img[^>]+src=["'][^"']*(?:help_icon|question)[^"']*["'][^>]*>/gi, '')
      .replace(/<br\s*\/?>\s*<br\s*\/?>/gi, '</p><p>');
    const template = document.createElement('template');
    template.innerHTML = out;
    template.content.querySelectorAll('script,style,noscript,iframe,object,embed').forEach(el => el.remove());
    template.content.querySelectorAll('img[src*="help_icon" i], img[src*="question" i]').forEach(el => el.remove());
    template.content.querySelectorAll('th br').forEach(br => br.replaceWith(document.createTextNode(' '))); 
    template.content.querySelectorAll('*').forEach(el => {
      const txt = (el.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      const ident = `${el.id || ''} ${el.className || ''}`.toLowerCase();
      if (ident.includes('hide_') || ident.includes('mw-collapsible-toggle') || /\b(hide section|show section|expand section|collapse section)\b/i.test(txt) || /^\[\s*\]$/.test(txt)) { el.remove(); return; }
      if (/^window\.onload|jquery\s*\(|^\$\s*\(/i.test(txt)) { el.remove(); return; }
      ['style','width','height','onclick','onload','onerror','cellpadding','cellspacing','border','bgcolor','valign','align'].forEach(attr => el.removeAttribute(attr));
    });
    const walker = document.createTreeWalker(template.content, NodeFilter.SHOW_TEXT);
    const doomed = [];
    while (walker.nextNode()) {
      if (/window\.onload|jQuery\s*\(|\$\s*\(/i.test(walker.currentNode.textContent || '')) doomed.push(walker.currentNode);
    }
    doomed.forEach(node => node.remove());
    return template.innerHTML;
  }

  function cleanOverviewHtml(html){
    const template = document.createElement('template');
    template.innerHTML = sanitizeGuideHtml(html || '');
    Array.from(template.content.querySelectorAll('h2,h3,h4,p,a,figure,div')).forEach(el => {
      const text = (el.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
      const hasMonsterLootImage = !!el.querySelector('img[src*="monsterloot" i], img[src*="monster-loot" i]');
      if (hasMonsterLootImage || text === 'monster loot' || text === 'list loot' || text === 'loot list') {
        let next = el.nextElementSibling;
        while (next) {
          const nextText = (next.textContent || '').trim().toLowerCase().replace(/\s+/g, ' ');
          const nextHasLoot = !!next.querySelector('img[src*="monsterloot" i], img[src*="monster-loot" i]');
          if (next.matches('h2,h3,h4') && !nextText.includes('loot')) break;
          const doomed = next;
          next = next.nextElementSibling;
          if (nextHasLoot || nextText === 'list loot' || nextText === 'loot list' || !nextText) doomed.remove();
          else break;
        }
        el.remove();
      }
    });
    return template.innerHTML;
  }

  const firstTablePreview = p => {
    const section = (p.sections || []).find(s => s.tableCount > 0);
    return section ? section.title : 'Guide';
  };
  const sectionIcon = title => {
    const key = String(title || '').toLowerCase();
    if (key.includes('how')) return 'Route';
    if (key.includes('daily')) return 'Daily';
    if (key.includes('stat')) return 'Stats';
    if (key.includes('enhancement')) return 'Enhance';
    if (key.includes('tool')) return 'Tools';
    if (key.includes('recipe') || key.includes('exchange')) return 'Recipes';
    if (key.includes('location') || key.includes('spawn')) return 'Where';
    if (key.includes('fish')) return 'Fish';
    if (key.includes('overview')) return 'Intro';
    return 'Guide';
  };
  const sectionKind = title => {
    const key = String(title || '').toLowerCase();
    if (key.includes('overview')) return 'overview';
    if (key.includes('how')) return 'route';
    if (key.includes('daily')) return 'daily';
    if (key.includes('stat')) return 'stats';
    if (key.includes('tool')) return 'tools';
    if (key.includes('recipe') || key.includes('exchange') || key.includes('craft')) return 'recipes';
    if (key.includes('location') || key.includes('spawn')) return 'locations';
    if (key.includes('enhancement')) return 'enhancements';
    return 'reference';
  };

  const professionAccentMap = {
    farming:['#79f29f','#ffda68'],
    fishing:['#62cfff','#d6f7ff'],
    mining:['#d4b16d','#ffda68'],
    skinning:['#c88a66','#ffb765'],
    woodcutting:['#67d87f','#d8ff9d'],
    alchemy:['#77efe9','#b9fff8'],
    blacksmithing:['#ff9f6b','#ffd072'],
    cooking:['#ffcf75','#fff1a6'],
    jewelcrafting:['#73d8ff','#c4f7ff'],
    tanning:['#d99770','#ffd0a2'],
    woodworking:['#b9e07a','#f3ffad']
  };
  function accentStyle(p){
    const pair = professionAccentMap[p?.id] || (p?.group === 'crafting' ? ['#ffb765','#ffda68'] : ['#78f7b1','#8af4ff']);
    return `--prof-active-accent:${pair[0]};--prof-active-accent-2:${pair[1]};`;
  }


  function professionIconMarkup(p, label = 'Profession'){
    const id = String(p?.id || '').toLowerCase();
    const icons = {
      overview:'M5 4h14v16H5z M8 8h8 M8 12h8 M8 16h5',
      farming:'M12 20V9 M12 12c-5-1-6-5-6-5s5 0 6 5Zm0 0c5-1 6-5 6-5s-5 0-6 5Z',
      fishing:'M4 13c4-5 10-5 16 0-6 5-12 5-16 0Zm4 0h.01 M16 10l4-3 M16 16l4 3',
      mining:'M6 18l7-7 M10 7l7 7 M13 11l4-4 M8 20l-4-4',
      skinning:'M7 20c2-6 5-11 10-16 2 6 1 11-4 14-2 1-4 2-6 2Z M9 17l5-5',
      woodcutting:'M5 19l14-14 M12 5l7 7 M4 20l5-5',
      alchemy:'M9 3h6 M10 3v5l-4 8c-1 2 0 5 3 5h6c3 0 4-3 3-5l-4-8V3 M8 15h8',
      blacksmithing:'M5 18h14 M8 18v-4h8v4 M9 14l-2-7h10l-2 7 M6 21h12',
      cooking:'M7 20h10 M9 20V9a3 3 0 0 1 6 0v11 M6 7c3-3 9-3 12 0',
      jewelcrafting:'M12 3l7 6-7 12L5 9l7-6Z M5 9h14 M9 9l3 12 3-12',
      tanning:'M6 5c4-2 8-2 12 0l-2 14H8L6 5Z M8 9h8',
      woodworking:'M4 17c5-7 11-10 16-10-1 8-6 12-16 10Z M7 16l7-7'
    };
    const path = icons[id] || icons.overview;
    return `<svg class="prof-side-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  function filteredProfessions(){
    const q = query.trim().toLowerCase();
    return professions.filter(p => {
      const matchesFilter = filter === 'all' || p.group === filter;
      const sectionText = (p.sections || []).map(s => `${s.title} ${textFromHtml(s.html)}`).join(' ');
      const haystack = `${p.name} ${p.role} ${p.value} ${p.energy} ${p.lead} ${sectionText}`.toLowerCase();
      return matchesFilter && (!q || haystack.includes(q));
    });
  }

  function renderHero(){
    const meta = data.meta || {};
    const totalSections = professions.reduce((sum, p) => sum + (Array.isArray(p.sections) ? p.sections.length : 0), 0);
    const stats = [
      ['Type', 'Profession Guide'],
      ['Use For', 'Crafting + Gathering'],
      ['Sections', `${totalSections} sections`]
    ];
    return `<section class="ut-hero">
      <div>
        <div class="ut-kicker">${esc(meta.category || 'Custom Internal Page')}</div>
        <h1 class="ut-title">${esc(meta.title || 'Professions')}</h1>
        <p class="ut-lead">${esc(meta.lead || '')}</p>
      </div>
      <div class="ut-hero-tools">
        <div class="ut-statgrid">${stats.map(([label,value]) => `<div class="ut-stat"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div>
        <div class="ut-toolbar"><button type="button" class="ut-action primary" data-prof-scroll-top>Back to Design Lab</button><span class="ut-chip">${esc(totalSections)} sections</span></div>
      </div>
    </section>`;
  }

  function renderOverview(){ return ''; }


  function renderRail(){
    const items = filteredProfessions();
    const grouped = groups.map(group => ({...group, items: items.filter(p => p.group === group.id)})).filter(g => g.items.length);
    const totalTables = professions.reduce((sum, p) => sum + Number(p.tableCount || 0), 0);
    return `<aside class="prof-index" aria-label="Profession index">
      <div class="prof-index-banner">
        <span>Profession Codex</span>
        <h2>Choose a profession</h2>
        <p>${esc(professions.length)} professions · ${esc(totalTables)} wiki references</p>
      </div>
      <button type="button" class="prof-overview-pick ${activeId === 'overview' ? 'is-active' : ''}" data-profession="overview" aria-pressed="${activeId === 'overview' ? 'true' : 'false'}">
        <span class="prof-pick-icon prof-overview-icon">${professionIconMarkup({id:'overview', name:'Profession Overview'}, 'Overview')}</span>
        <span class="prof-pick-text"><b>Profession Overview</b><small>Revamp, categories, energy, and Achievement Points</small></span>
        <span class="prof-pick-meta"><strong>AP</strong><small>guide</small></span>
      </button>
      <div class="prof-index-top">
        <label for="profSearch">Search profession content</label>
        <input id="profSearch" type="search" value="${esc(query)}" placeholder="Search tools, recipes, bonuses, locations..." autocomplete="off" />
        <div class="prof-filter-row" aria-label="Filter professions">
          <button type="button" class="${filter === 'all' ? 'is-active' : ''}" data-filter="all">All</button>
          ${groups.map(g => `<button type="button" class="${filter === g.id ? 'is-active' : ''}" data-filter="${esc(g.id)}">${esc(g.title)}</button>`).join('')}
        </div>
      </div>
      <div class="prof-index-list">
        ${grouped.map(group => `<section class="prof-index-group" data-group="${esc(group.id)}"><h3><span>${esc(group.title)}</span><em>${esc(group.items.length)}</em></h3>${group.items.map(renderProfButton).join('')}</section>`).join('') || `<p class="prof-empty">No professions match that search.</p>`}
      </div>
    </aside>`;
  }

  function renderProfButton(p){
    const active = p.id === activeId;
    const tables = Number(p.tableCount || 0);
    return `<button type="button" class="prof-pick ${active ? 'is-active' : ''}" data-profession="${esc(p.id)}" data-group="${esc(p.group)}" aria-pressed="${active ? 'true' : 'false'}">
      <span class="prof-pick-icon">${professionIconMarkup(p, p.name)}</span>
      <span class="prof-pick-text"><b>${esc(p.name)}</b><small>${esc(p.role)}</small></span>
      <span class="prof-pick-meta"><strong>${esc(p.sections?.length || 0)}</strong><small>sections</small>${tables ? `<em>${esc(tables)} tables</em>` : ''}</span>
    </button>`;
  }

  function renderMedia(p){
    const media = (p.media || []).filter(([file]) => file && !/help_icon|question/i.test(String(file)) && professionMediaFiles.includes(String(file).replace(/^professions-media\//,'')));
    if (!media.length) return '';
    const [mainFile, mainCaption] = media[0];
    return `<section class="ut-section prof-internal-content-section prof-media-section" id="${esc(p.id)}-media" data-section-kind="media">
      <header class="ut-section-head">
        <div class="ut-num">M</div>
        <div class="ut-section-titleblock">
          <h2>Media</h2>
          <small>${esc(media.length)} restored image${media.length === 1 ? '' : 's'}</small>
        </div>
      </header>
      <div class="ut-body prof-section-body prof-media-body">
        <figure class="prof-main-media" data-prof-gallery="${esc(p.id)}" data-media-index="0" tabindex="0" role="button" aria-label="View ${esc(mainCaption || p.name)}">
          <img src="${esc(mediaPath(mainFile))}" alt="${esc(mainCaption || p.name)}" loading="lazy" />
          <figcaption>${esc(mainCaption || p.name)}</figcaption>
        </figure>
        ${media.length > 1 ? `<div class="prof-thumbs">${media.slice(1).map(([file, caption], idx) => `<button type="button" data-prof-gallery="${esc(p.id)}" data-media-index="${idx + 1}" aria-label="View ${esc(caption || p.name)}"><img src="${esc(mediaPath(file))}" alt="${esc(caption || p.name)}" loading="lazy" /></button>`).join('')}</div>` : ''}
      </div>
    </section>`;
  }

  function renderFacts(p){
    return `<dl class="prof-facts">
      <div><dt>Type</dt><dd>${esc(groupTitle(p.group))}</dd></div>
      <div><dt>Energy</dt><dd>${esc(p.energy)}</dd></div>
      <div><dt>Main value</dt><dd>${esc(p.value)}</dd></div>
      <div><dt>Reference</dt><dd>${esc(p.tableCount || 0)} table${(p.tableCount || 0) === 1 ? '' : 's'}</dd></div>
    </dl>`;
  }

  function renderSectionNav(p){
    const sections = p.sections || [];
    if (!sections.length) return '';
    return `<aside class="ut-side" aria-label="${esc(p.name)} sections">
      <div class="ut-side-card">
        <h3>On this page</h3>
        <p>Jump through the profession guide sections.</p>
        <div class="ut-section-nav">
          ${sections.map((s, idx) => `<button type="button" data-section-target="${esc(p.id)}-section-${idx}"><b>${idx + 1}</b><span>${esc(s.title)}</span></button>`).join('')}
        </div>
      </div>
    </aside>`;
  }


  const sectionMediaMap = {
    farming: {
      'How to start': ['farm_bidding.png','seed_merchant.png','planting.gif','watering.gif','harvesting.gif'],
      'Daily Task': ['daily_farming.png']
    },
    fishing: {
      'How to start': ['fishing.png','bubbles.gif','fishing_spots.png','fred_the_fisherman.png'],
      'Tools': ['clay-fishing_rod.png'],
      'Fish': ['fishing_spots.png']
    },
    mining: {
      'How to start': ['ore1.png','mining.gif'],
      'Tools': ['clay-pickaxe.png']
    },
    skinning: {
      'How to start': ['skinning.gif'],
      'Tools': ['clay-knife.png']
    },
    woodcutting: {
      'How to start': ['cutting_wood.gif','eldertree.png'],
      'Tools': ['clayhatchet.png']
    },
    alchemy: {
      'How to start': ['alchemy_npc.png','alchemystation.png']
    },
    blacksmithing: {
      'How to start': ['blacksmithing_npc.png','blacksmithing1.png']
    },
    cooking: {
      'How to start': ['cooking_npc.png','cooking.png']
    },
    jewelcrafting: {
      'How to start': ['jewelcrafting_npc.png','newstationjewelcrafting.png']
    },
    tanning: {
      'How to start': ['tanning_npc.png']
    },
    woodworking: {
      'How to start': ['woodworking_npc.png']
    }
  };

  function sectionMediaFor(p, section){
    const title = String(section?.title || '');
    const wanted = (sectionMediaMap[p.id] && sectionMediaMap[p.id][title]) || [];
    if (!wanted.length) return [];
    const media = (p.media || []).filter(([file]) => file && !String(file).includes('avatar'));
    const byFile = new Map(media.map(item => [item[0], item]));
    return wanted.map(file => byFile.get(file)).filter(Boolean);
  }

  function injectSectionMedia(html, mediaHtml){
    const source = html || '';
    if (!mediaHtml) return source;

    // Keep screenshots in the reading flow: after the intro copy, before dense reference tables.
    const tableMatch = source.match(/<div class="pg-table-wrap"|<table\b/i);
    if (tableMatch && tableMatch.index > -1) {
      const beforeTable = source.slice(0, tableMatch.index);
      const afterTable = source.slice(tableMatch.index);
      const lastParagraphBeforeTable = beforeTable.lastIndexOf('</p>');
      if (lastParagraphBeforeTable > -1) {
        const cut = lastParagraphBeforeTable + 4;
        return `${beforeTable.slice(0, cut)}${mediaHtml}${beforeTable.slice(cut)}${afterTable}`;
      }
      return `${beforeTable}${mediaHtml}${afterTable}`;
    }

    const paragraphs = Array.from(source.matchAll(/<\/p>/ig));
    if (paragraphs.length >= 2) {
      const cut = paragraphs[1].index + 4;
      return `${source.slice(0, cut)}${mediaHtml}${source.slice(cut)}`;
    }
    if (paragraphs.length === 1) {
      const cut = paragraphs[0].index + 4;
      return `${source.slice(0, cut)}${mediaHtml}${source.slice(cut)}`;
    }
    return `${source}${mediaHtml}`;
  }

  function isCompactMediaFile(file){
    return /(^|[-_])(ore|leather|gem|soup|platter|elixir|scroll|frame)|rod|knife|pickaxe|hatchet|bookstand|telescope|ballista|wall/i.test(String(file || ''));
  }

  function renderSectionMedia(p, section){
    // Prefer the actual old-wiki images already embedded in the restored section.
    // Adding another generated media strip beside those was the main cause of duplicated/forced visuals.
    if (/prof-dump-img|<img\b/i.test(String(section?.html || ''))) return '';
    const media = sectionMediaFor(p, section);
    if (!media.length) return '';
    const display = media.slice(0, 4);
    return `<div class="prof-section-media-row prof-media-embedded" aria-label="Related ${esc(section.title)} media">
      <div class="prof-section-media-grid" data-media-count="${esc(display.length)}">
        ${display.map(([file, caption]) => `<figure class="prof-section-media-card">
          <img src="${esc(mediaPath(file))}" alt="${esc(caption || p.name)}" loading="lazy" />
          <figcaption>${esc(caption || p.name)}</figcaption>
        </figure>`).join('')}
      </div>
    </div>`;
  }



  function renderSections(p){
    const sections = p.sections || [];
    return `<main class="prof-actual-content ut-main">
      ${sections.map((section, idx) => {
        const kind = sectionKind(section.title);
        const tableCount = Number(section.tableCount || 0);
        return `<section class="ut-panel ut-section prof-internal-content-section prof-section-${esc(kind)} ${tableCount ? 'prof-section-has-tables' : 'prof-section-text-only'}" id="${esc(p.id)}-section-${idx}" data-ut-section data-section-kind="${esc(kind)}">
          <header class="ut-section-head">
            <div class="ut-num">${String(idx + 1).padStart(2,'0')}</div>
            <div class="ut-section-titleblock">
              <h2>${esc(section.title)}</h2>
              <small class="prof-section-meta-line"><span class="prof-section-kind-chip prof-kind-${esc(kind)}">${esc(sectionIcon(section.title))}</span>${tableCount ? `<span class="prof-section-table-chip">${tableCount} table${tableCount === 1 ? '' : 's'}</span>` : ''}</small>
            </div>
          </header>
          <div class="ut-body prof-section-body">${injectSectionMedia(sanitizeGuideHtml(section.html || ''), renderSectionMedia(p, section))}</div>
        </section>`;
      }).join('')}
    </main>`;
  }



  function overviewMediaFor(sectionTitle){
    const key = String(sectionTitle || '').toLowerCase();
    const pool = [];
    if (key.includes('overview')) pool.push(['achievement_points.png','Achievement Points'], ['ui_auto_sort.png','Automatic material sorting']);
    if (key.includes('gathering')) pool.push(['farming_avatar.png','Farming'], ['fishing_avatar.png','Fishing'], ['mining_avatar.png','Mining'], ['skinning_avatar.png','Skinning'], ['woodcutting_avatar.png','Woodcutting']);
    if (key.includes('crafting')) pool.push(['alchemy_avatar.png','Alchemy'], ['blacksmithing_avatar.png','Blacksmithing'], ['cooking_avatar.png','Cooking'], ['jewelcrafting_avatar.png','Jewelcrafting'], ['tanning_avatar.png','Tanning'], ['woodworking_avatar.png','Woodworking']);
    return pool.filter(([file]) => professionMediaFiles.includes(file));
  }

  function renderOverviewInlineMedia(section){
    const media = overviewMediaFor(section.title);
    if (!media.length) return '';
    return `<div class="prof-overview-media-strip" aria-label="Related profession overview media">
      ${media.map(([file, caption]) => `<figure><img src="${esc(mediaPath(file))}" alt="${esc(caption)}" loading="lazy" /><figcaption>${esc(caption)}</figcaption></figure>`).join('')}
    </div>`;
  }

  function visibleOverviewSections(){
    return (data.overviewSections || []).filter(section => {
      const title = String(section?.title || '').trim().toLowerCase();
      return title !== 'gathering professions' && title !== 'crafting professions';
    });
  }

  function renderOverviewSections(){
    const sections = visibleOverviewSections();
    return `<main class="prof-actual-content ut-main">
      ${sections.map((section, idx) => `<section class="ut-panel ut-section prof-internal-content-section prof-overview-content-section" id="overview-section-${idx}" data-ut-section data-section-kind="overview">
        <header class="ut-section-head">
          <div class="ut-num">${String(idx + 1).padStart(2,'0')}</div>
          <div class="ut-section-titleblock"><h2>${esc(section.title)}</h2><small class="prof-section-meta-line"><span class="prof-section-kind-chip prof-kind-overview">${esc(sectionIcon(section.title))}</span>${Number(section.tableCount || 0) ? `<span class="prof-section-table-chip">${Number(section.tableCount || 0)} table${Number(section.tableCount || 0) === 1 ? '' : 's'}</span>` : ''}</small></div>
        </header>
        <div class="ut-body prof-section-body">${injectSectionMedia(cleanOverviewHtml(section.html || ''), renderOverviewInlineMedia(section))}</div>
      </section>`).join('')}
    </main>`;
  }

  function renderOverviewSectionNav(){
    const sections = visibleOverviewSections();
    return `<aside class="ut-side" aria-label="Profession overview sections">
      <div class="ut-side-card">
        <h3>On this page</h3>
        <p>Master profession overview and revamp notes.</p>
        <div class="ut-section-nav">
          ${sections.map((s, idx) => `<button type="button" data-section-target="overview-section-${idx}"><b>${idx + 1}</b><span>${esc(s.title)}</span></button>`).join('')}
        </div>
      </div>
    </aside>`;
  }

  function renderOverviewArticle(){
    return `<main class="prof-reader prof-overview-reader" aria-label="Profession overview" data-profession="overview" data-group="overview" style="--prof-active-accent:#ffda68;--prof-active-accent-2:#8af4ff;">
      <header class="prof-reader-head prof-overview-head">
        <div class="prof-reader-mark">📜</div>
        <div>
          <small>Master Profession Page</small>
          <h2>Professions Overview</h2>
          <p>The restored master page explains the profession revamp, gathering/crafting split, energy sources, material sorting, and Achievement Point rewards before players open a specific profession.</p>
        </div>
        <div class="prof-reader-meta" aria-label="Profession overview quick information">
          <div><span>Includes</span><b>Revamp + AP</b></div>
          <div><span>Sections</span><b>${esc(visibleOverviewSections().length)} guide parts</b></div>
        </div>
      </header>
      <dl class="prof-facts">
        <div><dt>Type</dt><dd>Master profession guide</dd></div>
        <div><dt>Energy</dt><dd>Daily sources and profession usage</dd></div>
        <div><dt>Main value</dt><dd>Achievement Points, crafting bonuses, gathering routes</dd></div>
        <div><dt>Reference</dt><dd>Old wiki overview restored</dd></div>
      </dl>
      <div class="prof-guide-layout ut-board">
        ${renderOverviewSections()}
        ${renderOverviewSectionNav()}
      </div>
    </main>`;
  }

  function renderProfessionArticle(){
    if (activeId === 'overview') return renderOverviewArticle();
    const p = activeProfession();
    if (!p) return `<main class="prof-reader"><p class="prof-empty">No profession selected.</p></main>`;
    return `<main class="prof-reader" aria-label="Selected profession" data-profession="${esc(p.id)}" data-group="${esc(p.group)}" style="${accentStyle(p)}">
      <header class="prof-reader-head">
        <div class="prof-reader-mark">${professionIconMarkup(p, p.name)}</div>
        <div>
          <small>${esc(groupTitle(p.group))} Profession</small>
          <h2>${esc(p.name)}</h2>
          <p>${esc(p.lead || p.role)}</p>
        </div>
        <div class="prof-reader-meta" aria-label="${esc(p.name)} quick information">
          <div><span>Role</span><b>${esc(p.role)}</b></div>
          <div><span>Sections</span><b>${esc(p.sections?.length || 0)} guide parts</b></div>
        </div>
      </header>
      ${renderFacts(p)}
      <div class="prof-guide-layout ut-board">
        ${renderSections(p)}
        ${renderSectionNav(p)}
      </div>
    </main>`;
  }

  function renderCompendium(){
    return `<section class="prof-compendium" aria-label="All profession summary">
      <header><span>All professions</span><h2>Quick jump</h2></header>
      <div class="prof-summary-grid">${professions.map(p => `<button type="button" class="prof-summary-card ${p.id === activeId ? 'is-active' : ''}" data-profession="${esc(p.id)}">
        <i>${professionIconMarkup(p, p.name)}</i><b>${esc(p.name)}</b><small>${esc(groupTitle(p.group))}</small><span>${esc(p.role)}</span>
      </button>`).join('')}</div>
    </section>`;
  }

  function render(){
    if (typeof sectionSpyCleanup === 'function') sectionSpyCleanup();
    sectionSpyCleanup = null;
    host.innerHTML = `<article class="ut-page shell-matched prof-custom-page"><div class="ut-shell">${renderHero()}<div class="prof-custom-board">${renderRail()}<div>${renderProfessionArticle()}</div></div></div></article>`;
    enhanceGuideContent(host);
    normalizeProfessionImages(host);
    bindMediaTriggers(host);
    bindSectionSpy(host);
  }


  const tableItemIconMap = {
    'arcane elixir':'arcane_elixir.png',
    'artisan steak platter':'artisan_steak_platter.png',
    'fish soup':'fish_soup.png',
    'bejeweled telescope':'bejeweled_telescope.png',
    'alchemy bookstand':'alchemy_bookstand.gif',
    'ballista':'ballista.png',
    'wooden wall':'wooden_wall.png',
    'woodden wall':'wooden_wall.png',
    'clay fishing rod':'clay-fishing_rod.png',
    'clay knife':'clay-knife.png',
    'clay pickaxe':'clay-pickaxe.png',
    'clay hatchet':'clayhatchet.png',
    'iron pickaxe':'clay-pickaxe.png',
    'copper pickaxe':'clay-pickaxe.png',
    'steel pickaxe':'clay-pickaxe.png',
    'gold pickaxe':'dragon-pickaxe.png',
    'mythril pickaxe':'dragon-pickaxe.png',
    'iron hatchet':'clayhatchet.png',
    'copper hatchet':'clayhatchet.png',
    'steel hatchet':'clayhatchet.png',
    'gold hatchet':'clayhatchet.png',
    'mythril hatchet':'clayhatchet.png',
    'iron knife':'clay-knife.png',
    'copper knife':'clay-knife.png',
    'steel knife':'clay-knife.png',
    'gold knife':'clay-knife.png',
    'mythril knife':'clay-knife.png',
    'iron fishing rod':'clay-fishing_rod.png',
    'copper fishing rod':'clay-fishing_rod.png',
    'steel fishing rod':'clay-fishing_rod.png',
    'gold fishing rod':'clay-fishing_rod.png',
    'mythril fishing rod':'clay-fishing_rod.png',
    'dragon pickaxe':'dragon-pickaxe.png',
    'clay ore':'clay-ore.gif',
    'dragon ore':'dragon-ore.gif',
    'light leather':'light-leather.png',
    'mythril leather':'mythril-leather.png',
    'unpolished gem':'unpolished_gem.png',
    'polished gem':'polished_gem.png',
    'charged forest gem':'charged-forest-gem.gif',
    'jewel frame':'jewel_frame.png',
    'profession bonus scroll':'profession_bonus_scroll.png',
    'aged leather':'aged-leather.png'
  };
  const normItem = value => String(value || '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const professionMediaFiles = ["10oz.png", "15oz.png", "20oz.png", "25oz.png", "2nd_anniversary_backpack.png", "30oz.png", "35oz.png", "4th_anni_backpack_610004.png", "5oz.png", "achievement_points.png", "adorned_fighter_emblem.png", "adorned_mage_emblem.png", "adorned_specialist_emblem.png", "aged-leather.png", "aged-scrap.png", "agility_elixir.png", "alchemy_avatar.png", "alchemy_bookstand.gif", "alchemy_cabinet.png", "alchemy_chair.png", "alchemy_npc.png", "alchemy_table.png", "alchemystation.png", "alelixir.png", "all-seeing_tapestry.png", "amulet_of_theurgy.png", "ancient_celestial_armor.png", "ancient_celestial_boots.png", "ancient_celestial_helmet.png", "ancient_celestial_legs.png", "ancient_shrine.png", "ancient_stat_stone.png", "anni_backpack.png", "annihilation_bear.png", "ao-logo.png", "arcane_elixir.png", "archlight_key.png", "archlight_loot_crate.png", "artisan_bass_fillet.png", "artisan_carp_platter.png", "artisan_dragon_carp_platter.png", "artisan_pork_and_corn.png", "artisan_shark_soup.png", "artisan_squid_platter.png", "artisan_steak_platter.png", "at.png", "awakened_clear_state_enchantment.png", "awakened_enflaming_enchantment.png", "awakened_enraging_enchantment.png", "awakened_grasping_enchantment.png", "awakened_hemorage_enchantment.png", "awakened_life_bloom_enchantment.png", "awakened_life_leech_enchantment.png", "awakened_ricochet_enchantment.png", "awakened_rune_stone.png", "awakened_soul_stone.png", "awakened_stone.png", "ballista.png", "bamboo_drawer.png", "bamboo_shelf.png", "bass.png", "bass_fillet.png", "bear_paw.png", "behemoth.gif", "bejeweled_telescope.png", "black_knight.gif", "black_knight_doll.png", "blacksmithing.png", "blacksmithing1.png", "blacksmithing_avatar.png", "blacksmithing_npc.png", "blister_ring.png", "blood-soakedlog.png", "blood-soakedtree.png", "blood_soaked_plank.png", "bloodquest_npc.png", "bluegem.png", "bog_raider.gif", "brocade-backpack.gif", "brocade-backpack.png", "brocade_tapestry.png", "broken_archlight_key.png", "bselixir.png", "bubbles.gif", "butterfly_ring.png", "cake_backpack_20347.png", "caltrops.png", "camouflage-backpack.gif", "camouflage-backpack.png", "carp.png", "carp_platter.png", "carrot.gif", "carrot_plant.png", "catapult.png", "cave_explorer.gif", "cc.png", "celestialingot.png", "celestialore.png", "cforest.png", "charged-cloud-gem.gif", "charged-forest-gem.gif", "charged-inferno-gem.gif", "charged-mountain-gem.gif", "charged-ocean-gem.gif", "charged-order-gem.gif", "chest_of_abundance.png", "chicken.gif", "cinnabar-leather.png", "cinnabar-scrap.png", "ckelixir.png", "clay-fishing_rod.png", "clay-knife.png", "clay-ore.gif", "clay-pickaxe.png", "clay-vein.gif", "clay-watering_can.png", "clayhatchet.png", "clayingot.png", "clayore.png", "clear_state_enchantment.png", "cliff_strider.gif", "cloud-gem.gif", "coal-ore.gif", "coal-vein.gif", "coalingot.png", "coalore.png", "cobra_amulet.png", "comfy_cabinet.png", "comfy_chair.png", "comfy_chest.png", "comfy_table.png", "cooking.png", "cooking_avatar.png", "cooking_npc.png", "cookstation1.png", "cookstation2.png", "cookstation3.png", "cookstation4.png", "cookstation5.png", "copper-fishing_rod.png", "copper-knife.png", "copper-ore.gif", "copper-pickaxe.png", "copper-vein.gif", "copper-watering_can.png", "copper_armor.png", "copper_boots.png", "copper_helmet.png", "copper_legs.png", "copperhatchet.png", "copperingot.png", "copperore.png", "corn_plant.png", "corncob.gif", "craftsman_backpack.gif", "crimson_vial.png", "crown-backpack.gif", "crown-backpack.png", "crystal-backpack.gif", "crystal-backpack.png", "crystal_regrade_key.png", "crystal_spider.gif", "cucumber.gif", "cucumber_plant.png", "cutting_wood.gif", "daily_farming.png", "daily_fishing.png", "dark_iron_armor.png", "dark_iron_boots.png", "dark_iron_helmet.png", "dark_iron_legs.png", "darksteel_bow.png", "darksteel_claw.png", "darksteel_dagger.png", "darksteel_exchange_token.png", "darksteel_grip.png", "darksteel_hammer.png", "darksteel_heavyaxe.png", "darksteel_heavysword.png", "darksteel_katana.png", "darksteel_pistol.png", "darksteel_shield.png", "darksteel_staff.png", "death_ring.png", "death_threat.png", "deepling-backpack.png", "deepsea_bass.png", "deepsea_carp.png", "deepsea_dragon_carp.png", "deepsea_shark.png", "deepsea_squid.png", "demon-backpack.gif", "demon-backpack.png", "demon.gif", "demonforged_armor.png", "demonforged_boots.png", "demonforged_helmet.png", "demonforged_legs.png", "demonic_tapestry.png", "dragon-backpack.gif", "dragon-backpack.png", "dragon-fishing_rod.png", "dragon-knife.png", "dragon-ore.gif", "dragon-pickaxe.png", "dragon-vein.gif", "dragon-watering_can.png", "dragon.gif", "dragon_carp.png", "dragon_carp_platter.png", "dragon_lord.gif", "dragon_necklace.png", "dragonhatchet.png", "dragoningot.png", "dragonling.gif", "dragonore.png", "draken_abomination.gif", "draptor.gif", "dread_doll.gif", "elder_plank.png", "elderlog.png", "eldertree.png", "elixirs1.png", "elixirs2.png", "empowered_clear_state_enchantment.png", "empowered_enflaming_enchantment.png", "empowered_enraging_enchantment.png", "empowered_grasping_enchantment.png", "empowered_hemorage_enchantment.png", "empowered_life_bloom_enchantment.png", "empowered_life_leech_enchantment.png", "empowered_ricochet_enchantment.png", "enflaming_enchantment.png", "enhanced_enhancement.png", "enhancement_buying_window.png", "enhancement_crafting_option.png", "enhancement_crafting_window.png", "enraging_enchantment.png", "exclamation_mark.png", "expedition-backpack.gif", "expedition-backpack.png", "explosive_keg.png", "extra_large_health_infusion.gif", "extra_large_vial.png", "farm_bidding.png", "farming_avatar.png", "ferocious_chair.png", "ferocious_table.png", "fire_trap.gif", "fish_soup.png", "fishing.png", "fishing_avatar.png", "fishing_lure.gif", "fishing_net.png", "fishing_spots.png", "fmelixir.png", "forest-gem.gif", "forest_fury.gif", "forgemaster_bow.gif", "forgemaster_claw.gif", "forgemaster_dagger.gif", "forgemaster_grip.png", "forgemaster_heavyaxe.gif", "forgemaster_katana.gif", "forgemaster_pistol.gif", "forgemaster_shard.png", "forgemaster_shield.gif", "forgemaster_staff.gif", "forgemaster_weapon_token.png", "forgestone-trinket.gif", "forgotten_fighter_emblem.png", "forgotten_mage_emblem.png", "forgotten_specialist_emblem.png", "forsaken_armor.png", "forsaken_boots.png", "forsaken_dragon.gif", "forsaken_helmet.png", "forsaken_legs.png", "fountain_of_life-trinket.gif", "foxtail_amulet.png", "fred_the_fisherman.png", "fselixir.png", "fur-backpack.gif", "fur-backpack.png", "gargantoise.gif", "gatherers_backpack.gif", "gem_mixer.png", "gem_remover.png", "gemerald.png", "giant_spider.gif", "glooth-backpack.png", "glowing-leather.png", "glowing-scrap.png", "glowing_plank.png", "glowingtree.png", "glowinlog.png", "gold-fishing_rod.png", "gold-knife.png", "gold-leather.png", "gold-ore.gif", "gold-pickaxe.png", "gold-scrap.png", "gold-vein.gif", "gold-watering_can.png", "gold_emblem_token.png", "gold_fighter_emblem.png", "gold_mage_emblem.png", "gold_points_doll.png", "gold_ring.png", "gold_specialist_emblem.png", "goldhatchet.png", "goldingot.png", "goldore.png", "gourmet_bass_fillet.png", "gourmet_carp_platter.png", "gourmet_dragon_carp_platter.png", "gourmet_pork_and_corn.png", "gourmet_shark_soup.png", "gourmet_squid_platter.png", "gourmet_steak_platter.png", "grasping_enchantment.png", "great_agility_elixir.png", "great_arcane_elixir.png", "great_health_elixir.png", "great_mana_elixir.png", "great_resistance_elixir.png", "great_spirit_elixir.png", "great_strenght_elixir.png", "great_swiftness_elixir.png", "green-bed.png", "green_perch.png", "greengem.png", "ham.gif", "hamster_in_a_wheel.png", "harvesting.gif", "health_elixir.png", "heart_backpack_10202.png", "heavy-leather.png", "heavy-scrap.png", "hellhound.gif", "hells_core.png", "help_icon.png", "hemorage_enchantment.png", "hornet_ring.png", "horse.png", "hunters-trinket.gif", "hydra.gif", "ice_trap.gif", "iceforged_bow.png", "iceforged_claw.png", "iceforged_dagger.png", "iceforged_exchange_token.png", "iceforged_grip.png", "iceforged_hammer.png", "iceforged_heavyaxe.png", "iceforged_heavysword.png", "iceforged_katana.png", "iceforged_pistol.png", "iceforged_shield.png", "iceforged_staff.png", "imagem_2025-03-08_120130446.png", "inferno-gem.gif", "inferno-leather.png", "inferno-scrap.png", "infestation1.png", "infestation2.png", "iron-fishing_rod.png", "iron-knife.png", "iron-ore.gif", "iron-pickaxe.png", "iron-vein.gif", "iron-watering_can.png", "ironhatchet.png", "ironingot.png", "ironore.png", "jade_amulet.png", "jewel_center.png", "jewel_crest.png", "jewel_frame.png", "jewel_mount.png", "jewelcrafting_avatar.png", "jewelcrafting_npc.png", "jewlstation1.png", "jewlstation2.png", "jewlstation3.png", "jewlstation4.png", "jewlstation5.png", "journeymans-trinket.gif", "jwelixir.png", "knife_cascade.png", "kongra.gif", "large_stat_stone.gif", "large_vial.png", "lats_npc.png", "legendary_key_fragment.png", "legendary_stone.png", "life_bloom_enchantment.png", "life_leech_enchantment.png", "light-leather.png", "light-scrap.png", "limegem.png", "little_adventurer_doll.gif", "living_archlight_token.png", "lizard_priest.gif", "lordly_tapestry.png", "magicalelixir0.png", "magicalelixir1.png", "magicalelixir2.png", "magicalelixir3.png", "magicalelixir4.png", "magicalelixir5.png", "magicalelixir6.png", "mana_elixir.png", "marijuana_plant.png", "marlin.png", "meat.gif", "medium_vial.png", "menacing_tapestry.png", "mgelixir.png", "midnight_panther_doll.png", "mining.gif", "mining_avatar.png", "minotaur-backpack.gif", "minotaur-backpack.png", "minotaur.gif", "monsterloot.png", "moon_backpack_9604.png", "mountain-gem.gif", "mushroom-backpack.png", "mythril-fishing_rod.png", "mythril-knife.png", "mythril-leather.png", "mythril-ore.gif", "mythril-pickaxe.png", "mythril-scrap.png", "mythril-vein.gif", "mythril-watering_can.png", "mythrilhatchet.png", "mythrilingot.png", "mythrilore.png", "newstationjewelcrafting.png", "nforest.png", "nightmare_doll.png", "nomad.gif", "northern_pike.png", "npc.gif", "obsidian_knife.png", "ocean-gem.gif", "ocean_bass.png", "ocean_carp.png", "ocean_dragon_carp.png", "ocean_shark.png", "ocean_squid.png", "oforest.png", "ogre.gif", "old_fake_archlight_key.png", "onion.gif", "onion_plant.png", "orc_berserker.gif", "order-gem.gif", "ore1.png", "ore2.png", "ore3.png", "ornate_cabinet.png", "ornate_chair.png", "ornate_chest.png", "ornate_table.png", "outline_shader_forest.gif", "overcharged-cloud-gem.gif", "overcharged-forest-gem.gif", "overcharged-inferno-gem.gif", "overcharged-mountain-gem.gif", "overcharged-ocean-gem.gif", "overcharged-order-gem.gif", "pannier-backpack.png", "panther.gif", "peas.gif", "pig.gif", "pinata.png", "plagued_rat.gif", "planting.gif", "plumfish.gif", "polished_gem.png", "pork_and_corn.png", "potato.gif", "potatoe_plant.png", "profession_bonus_scroll.png", "promotion_token.png", "psychedelic_tapestry.png", "purplegem.png", "rainbow_trout.png", "red-bed.png", "redgem.png", "reforged_mastercrafted_bow.png", "reforged_mastercrafted_claw.png", "reforged_mastercrafted_dagger.png", "reforged_mastercrafted_grip.png", "reforged_mastercrafted_hammer.png", "reforged_mastercrafted_heavyaxe.png", "reforged_mastercrafted_heavysword.png", "reforged_mastercrafted_katana.png", "reforged_mastercrafted_pistol.png", "reforged_mastercrafted_shield.png", "reforged_mastercrafted_staff.png", "reforged_mastercrafted_weapon_token.png", "reinforced_steel_armor.png", "reinforced_steel_boots.png", "reinforced_steel_helmet.png", "reinforced_steel_legs.png", "reinforced_wall.png", "relic_rune_stone.png", "relic_soul_stone.png", "relic_stone.png", "repolishing_oil.png", "resistance_elixir.png", "retching_horror.gif", "rhutum.gif", "ricochet_enchantment.png", "rift_knife.png", "rift_knife_chest.png", "rift_tapestry.png", "rooting_trap.png", "rots.png", "royal-bed.png", "rune_exchange_token.png", "rune_soil.png", "rustic_cabinet.png", "rustic_chair.png", "rustic_table.png", "rustic_trunk.png", "sand_dusk_scarab.gif", "sapphire_amulet.png", "savoury_bass_fillet.png", "savoury_carp_platter.png", "savoury_dragon_carp_platter.png", "savoury_pork_and_corn.png", "savoury_shark_soup.png", "savoury_squid_platter.png", "savoury_steak_platter.png", "seed_merchant.png", "serpent_spawn.gif", "seven_trials_rune_token.png", "sforest.png", "shadow_plank.png", "shadowlog.png", "shadowtree.png", "shark.png", "shark_soup.png", "sheep.gif", "shield_wall.png", "shining_oil.png", "skelixir.png", "skill_boost_potion.png", "skinning.gif", "skinning_avatar.png", "sliced_fish.gif", "small_vial.png", "snapper.png", "soul_plank.png", "soul_soil.png", "soulbound_exchange_token.png", "soulhunter_backpack.gif", "soullog.png", "soultree.png", "spartan_armor.png", "spartan_boots.png", "spartan_helmet.png", "spartan_legs.png", "spike_trap.png", "spirit_plank.png", "spiritlog.png", "spiritseer-trinket.gif", "spirittree.png", "squid.png", "squid_platter.png", "stampor.gif", "star_ring.gif", "stat_stone.gif", "stationa2.png", "stationa3.png", "stationa4.png", "stationa5.png", "stationa6.png", "steak_platter.png", "steel-fishing_rod.png", "steel-knife.png", "steel-pickaxe.png", "steel-watering_can.png", "steel_armor.png", "steel_boots.png", "steel_helmet.png", "steel_legs.png", "steelhatchet.png", "strenght_elixir.png", "strong_agility_elixir.png", "strong_arcane_elixir.png", "strong_health_elixir.png", "strong_mana_elixir.png", "strong_resistance_elixir.png", "strong_skill_boost_potion.png", "strong_strenght_elixir.png", "strong_swiftness_elixir.png", "stuffed_bear_display.png", "sturdy_wall.png", "supercharged_magnet.gif", "supreme_experience_elixir.png", "supreme_monster_essence_elixir.png", "supreme_skill_elixir.png", "supreme_stat_elixir.png", "supreme_vial_of_blood.png", "swiftness_elixir.png", "sword_tapestry.png", "t2_archer_soul_rune.png", "t2_bard_soul_rune.png", "t2_berserker_soul_rune.png", "t2_corsair_soul_rune.png", "t2_druid_soul_rune.png", "t2_gunslinger_soul_rune.png", "t2_monk_soul_rune.png", "t2_necromancer_soul_rune.png", "t2_rogue_soul_rune.png", "t2_sorcerer_soul_rune.png", "t2_tamer_soul_rune.png", "tanning_avatar.png", "tanning_npc.png", "the_lions_heart.png", "themanticore.png", "thornback_tortoise.gif", "throwing knife.png", "throwing_knife.png", "tier_2_soul_rune_token.png", "tier_4_healing_emblem_token.png", "tnelixir.png", "tomato.gif", "tomato_plant.png", "tool_merchant.png", "twilight_backpack.gif", "ui_auto_sort.png", "ultimate_agility_elixir.png", "ultimate_arcane_elixir.png", "ultimate_health_elixir.gif", "ultimate_mana_elixir.gif", "ultimate_resistance_elixir.png", "ultimate_spirit_elixir.gif", "ultimate_strenght_elixir.png", "ultimate_swiftness_elixir.png", "unpolished_gem.png", "unpolished_gem_shard.png", "upgrade_stone.png", "vanguard_backpack_new_.png", "vengothic_cabinet.png", "vengothic_chair.png", "vengothic_table.png", "vengothic_trunk.png", "venom_plank.png", "venomlog.png", "venomtree.png", "verdant_cabinet.png", "verdant_chair.png", "verdant_table.png", "verdant_trunk.png", "vial.png", "vial2.png", "vials1.png", "vials2.png", "vials3.png", "wailing_widow.gif", "watering.gif", "wcelixir.png", "weapon_exchange_token.png", "werebear.gif", "werewolf.gif", "wild_bass.png", "wild_carp.png", "wild_dragon_carp.png", "wild_shark.png", "wild_squid.png", "wolf-backpack.png", "woodcutting_avatar.png", "wooden_wall.png", "woodworking_avatar.png", "woodworking_npc.png", "wwelixir.png", "yellow-bed.png", "yellowgem.png", "yeti.gif"];
  const mediaKeyIndex = new Map(professionMediaFiles.map(file => [normItem(file.replace(/\.[^.]+$/, '')), file]));
  const iconAliasMap = {
    'clay fishing rod':'clay-fishing_rod.png',
    'clay knife':'clay-knife.png',
    'clay pickaxe':'clay-pickaxe.png',
    'clay hatchet':'clayhatchet.png',
    'iron pickaxe':'clay-pickaxe.png',
    'copper pickaxe':'clay-pickaxe.png',
    'steel pickaxe':'clay-pickaxe.png',
    'gold pickaxe':'dragon-pickaxe.png',
    'mythril pickaxe':'dragon-pickaxe.png',
    'iron hatchet':'clayhatchet.png',
    'copper hatchet':'clayhatchet.png',
    'steel hatchet':'clayhatchet.png',
    'gold hatchet':'clayhatchet.png',
    'mythril hatchet':'clayhatchet.png',
    'iron knife':'clay-knife.png',
    'copper knife':'clay-knife.png',
    'steel knife':'clay-knife.png',
    'gold knife':'clay-knife.png',
    'mythril knife':'clay-knife.png',
    'iron fishing rod':'clay-fishing_rod.png',
    'copper fishing rod':'clay-fishing_rod.png',
    'steel fishing rod':'clay-fishing_rod.png',
    'gold fishing rod':'clay-fishing_rod.png',
    'mythril fishing rod':'clay-fishing_rod.png',
    'dragon pickaxe':'dragon-pickaxe.png',
    'dragon ore':'dragon-ore.gif',
    'clay ore':'clay-ore.gif',
    'light leather':'light-leather.png',
    'mythril leather':'mythril-leather.png',
    'aged leather':'aged-leather.png',
    'unpolished gem':'unpolished_gem.png',
    'polished gem':'polished_gem.png',
    'charged forest gem':'charged-forest-gem.gif',
    'jewel frame':'jewel_frame.png',
    'profession bonus scroll':'profession_bonus_scroll.png',
    'arcane elixir':'arcane_elixir.png',
    'artisan steak platter':'artisan_steak_platter.png',
    'fish soup':'fish_soup.png',
    'bejeweled telescope':'bejeweled_telescope.png',
    'alchemy bookstand':'alchemy_bookstand.gif',
    'ballista':'ballista.png',
    'woodden wall':'wooden_wall.png',
    'wooden wall':'wooden_wall.png',
    '5oz':'5oz.png',
    'achievement points':'achievement_points.png',
    'automatic material sorting':'ui_auto_sort.png',
    'material sorting':'ui_auto_sort.png',
    'auto sort':'ui_auto_sort.png'
  };

  function findItemIconFile(label){
    let key = normItem(label).replace(/^(\d+|\d+x|x\d+)\s+/, '').trim();
    if (!key) return '';
    if (iconAliasMap[key]) return iconAliasMap[key];
    if (mediaKeyIndex.has(key)) return mediaKeyIndex.get(key);
    const compact = key.replace(/\b(rod|can|pickaxe|knife|hatchet|ore|leather|gem|platter|soup|bookstand|telescope|ballista|wall|frame|scroll)\b/g, m => m).trim();
    if (mediaKeyIndex.has(compact)) return mediaKeyIndex.get(compact);
    const entries = Array.from(mediaKeyIndex.entries()).sort((a,b)=>b[0].length-a[0].length);
    const exactContained = entries.find(([name]) => key === name || key.includes(name) || name.includes(key));
    if (exactContained) return exactContained[1];
    return '';
  }


  function enhanceDumpInlineMedia(scope){
    scope.querySelectorAll('.dump-inline-media').forEach(span => {
      if (span.querySelector('img')) return;
      const label = span.querySelector('.sr-only')?.textContent || span.textContent || '';
      const file = findItemIconFile(label);
      if (!file) return;
      span.classList.add('prof-recovered-inline-icon');
      const img = document.createElement('img');
      img.src = mediaPath(file);
      img.alt = '';
      img.loading = 'lazy';
      span.innerHTML = '';
      span.appendChild(img);
    });
  }

  function normalizeProfessionImages(scope){
    scope.querySelectorAll('img').forEach(img => {
      const raw = img.getAttribute('src') || '';
      if (!raw) return;
      // Old dump data can already include professions-media/. Keep it stable and prevent double prefixes.
      if (raw.includes('professions-media/professions-media/')) img.src = raw.replace('professions-media/professions-media/', 'professions-media/');
      img.addEventListener('error', () => {
        img.classList.add('prof-img-missing');
        img.removeAttribute('role');
        img.removeAttribute('tabindex');
      }, {once:true});
    });
  }


  function enhanceIngredientLines(scope){

  }

  function enhanceTableItemIcons(scope){

  }

  function normalizeTableWrapper(table){
    const body = table.closest('.prof-section-body');
    const selector = '.ut-table-wrap, .dump-table-wrap, .clean-table-wrap, .pg-table-wrap, .aw-table-shell';
    const ancestors = [];
    let node = table.parentElement;
    while (node && node !== body) {
      if (node.matches && node.matches(selector)) ancestors.push(node);
      node = node.parentElement;
    }
    let wrap = ancestors.length ? ancestors[ancestors.length - 1] : table.closest('.ut-table-wrap');
    if (!wrap) {
      wrap = document.createElement('div');
      table.before(wrap);
    }
    if (table.parentElement !== wrap) wrap.appendChild(table);
    // Remove empty legacy wrapper shells left by old dump markup so there is only one visible frame.
    ancestors.forEach(old => {
      if (old === wrap) return;
      if (!old.querySelector('table') && !old.textContent.trim()) old.remove();
    });
    wrap.querySelectorAll('.aw-table-shell, .dump-table-wrap, .clean-table-wrap, .pg-table-wrap, .ut-table-wrap').forEach(inner => {
      if (inner === wrap) return;
      if (inner.querySelector('table') === table || inner.contains(table)) {
        while (inner.firstChild) wrap.insertBefore(inner.firstChild, inner);
        inner.remove();
      }
    });
    // Final safety: remove visual shells accidentally nested inside table cells unless they contain another real table.
    table.querySelectorAll('.aw-table-shell, .dump-table-wrap, .clean-table-wrap, .pg-table-wrap, .ut-table-wrap').forEach(inner => {
      if (inner.querySelector('table')) return;
      const parent = inner.parentNode;
      while (inner.firstChild) parent.insertBefore(inner.firstChild, inner);
      inner.remove();
    });
    return wrap;
  }

  function splitMixedMediaParagraphs(scope){

    // Split those paragraphs into normal text + standalone media figures, but never touch tables.
    const splitNodeAroundImages = p => {
      if (p.closest('table')) return;
      const imgs = Array.from(p.querySelectorAll('img.prof-dump-img, img'))
        .filter(img => !img.closest('table') && !/help_icon|question/i.test(img.getAttribute('src') || ''));
      if (!imgs.length) return;
      const frag = document.createDocumentFragment();
      const textBefore = document.createElement('p');
      textBefore.className = p.className || '';
      const textAfter = document.createElement('p');
      textAfter.className = p.className || '';
      let seenImage = false;
      Array.from(p.childNodes).forEach(node => {
        const nodeHasImage = node.nodeType === 1 && (node.matches?.('img') || node.querySelector?.('img'));
        if (!nodeHasImage) {
          (seenImage ? textAfter : textBefore).appendChild(node.cloneNode(true));
          return;
        }
        seenImage = true;
        const found = node.nodeType === 1 && node.matches?.('img') ? [node] : Array.from(node.querySelectorAll?.('img') || []);
        found.forEach(original => {
          const img = original.cloneNode(true);
          img.classList.add('prof-dump-img');
          const fig = document.createElement('figure');
          fig.className = 'prof-media-frame prof-media-flow-frame prof-media-from-copy';
          fig.appendChild(img);
          frag.appendChild(fig);
        });
      });
      if ((textBefore.textContent || '').trim()) frag.insertBefore(textBefore, frag.firstChild);
      if ((textAfter.textContent || '').trim()) frag.appendChild(textAfter);
      if (frag.childNodes.length) p.replaceWith(frag);
    };
    Array.from(scope.querySelectorAll('.prof-section-body p')).forEach(splitNodeAroundImages);

    // Any remaining loose image becomes a stable standalone frame.
    Array.from(scope.querySelectorAll('.prof-section-body img.prof-dump-img, .prof-section-body img')).forEach(img => {
      if (img.closest('table') || img.closest('figure') || img.closest('.prof-section-media-card') || img.closest('.prof-main-media')) return;
      if (/help_icon|question/i.test(img.getAttribute('src') || '')) { img.remove(); return; }
      const fig = document.createElement('figure');
      fig.className = 'prof-media-frame prof-media-flow-frame';
      img.before(fig);
      fig.appendChild(img);
    });
  }

  function enhanceGuideContent(scope){
    scope.querySelectorAll('.prof-section-body .pg-table-wrap > .pg-table-wrap').forEach(inner => {
      const outer = inner.parentElement;
      if (!outer || !outer.classList.contains('pg-table-wrap')) return;
      while (inner.firstChild) outer.insertBefore(inner.firstChild, inner);
      inner.remove();
    });

    scope.querySelectorAll('.prof-internal-content-section').forEach(section => {
      const body = section.querySelector('.prof-section-body');
      if (!body) return;
      const tables = body.querySelectorAll('table');
      const paragraphs = Array.from(body.querySelectorAll(':scope > p')).filter(p => (p.textContent || '').trim());
      if (tables.length) section.classList.add('prof-section-has-table-content');
      if (paragraphs.length && !paragraphs[0].classList.contains('prof-step-p')) paragraphs[0].classList.add('prof-section-lead');
    });


    scope.querySelectorAll('.prof-section-body table, .prof-section-body table *').forEach(el => {
      ['style','width','height','bgcolor','align','valign','cellpadding','cellspacing','border'].forEach(attr => el.removeAttribute(attr));
    });


    // vertical text wrapping, and inconsistent before/after placement.
    scope.querySelectorAll('.prof-section-body table img').forEach(img => img.remove());
    scope.querySelectorAll('.prof-section-body table figure,.prof-section-body table .prof-media-frame,.prof-section-body table .prof-media-flow-frame').forEach(frame => { const parent = frame.parentNode; while (frame.firstChild) parent.insertBefore(frame.firstChild, frame); frame.remove(); });
    scope.querySelectorAll('.prof-section-body table br').forEach(br => br.replaceWith(document.createTextNode(' ')));
    scope.querySelectorAll('.prof-section-body table th, .prof-section-body table td').forEach(cell => {
      cell.innerHTML = cell.innerHTML
        .replace(/<br\s*\/?>(\s*)/gi, ' ')
        .replace(/\s{2,}/g, ' ')
        .replace(/^\s*[•·*-]\s*/, '')
        .trim();
      if (!(cell.textContent || '').trim()) cell.classList.add('prof-empty-cell');
      cell.querySelectorAll('.prof-inline-heading,.prof-step-p,.prof-section-lead').forEach(el => el.classList.remove('prof-inline-heading','prof-step-p','prof-section-lead'));
    });
    scope.querySelectorAll('.prof-section-body > p, .prof-section-body > div').forEach(node => {
      const clean = (node.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (clean === 'reference table') node.remove();
    });

    scope.querySelectorAll('.prof-section-body table').forEach(table => {
      table.classList.add('ut-table');
      table.classList.remove('prof-polished-table');
      const colCount = table.querySelector('thead tr')?.children.length || table.querySelector('tr')?.children.length || 0;
      if (colCount) table.dataset.columns = String(colCount);
      if (colCount <= 3) table.classList.add('prof-table-compact');
      if (colCount >= 6) table.classList.add('prof-table-wide');
      if (colCount >= 7) table.classList.add('prof-table-xwide');
      const firstHeaderText = (table.querySelector('tr > th:first-child, tr > td:first-child')?.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase();
      if (firstHeaderText.includes('profession level') || (firstHeaderText === 'level' && colCount >= 8)) {
        table.classList.add('prof-level-reward-table');
      }

      let wrap = normalizeTableWrapper(table);
      wrap.classList.add('ut-table-wrap', 'prof-table-shell');
      wrap.classList.remove('dump-table-wrap', 'clean-table-wrap', 'pg-table-wrap');
      if (colCount) wrap.dataset.columns = String(colCount);
      if (colCount >= 5) wrap.classList.add('prof-table-shell-wide');

      table.querySelectorAll('tbody tr').forEach(row => {
        const cells = Array.from(row.children);
        if (!cells.length) return;
        const first = (cells[0].textContent || '').replace(/\s+/g, ' ').trim();
        if (/^reference table$/i.test(first)) { row.remove(); return; }
        const hasColspanDivider = cells.length === 1 && Number(cells[0].getAttribute('colspan') || 1) > 1 && first.length <= 80;
        const restEmpty = cells.length > 1 && cells.slice(1).every(cell => !(cell.textContent || '').trim());
        if (first && (hasColspanDivider || restEmpty)) row.classList.add('prof-table-divider');
      });
    });

    scope.querySelectorAll('.prof-section-body p').forEach(p => {
      if (p.closest('table')) { p.classList.remove('prof-inline-heading','prof-step-p','prof-section-lead'); return; }
      const text = (p.textContent || '').trim();
      const match = text.match(/^(\d+)\.\s*/);
      if (match) {
        p.classList.add('prof-step-p');
        p.dataset.step = match[1];
      }
      const looksLikeHeading = text.length > 2 && text.length <= 46 && !/[.!?]$/.test(text) && !match && !text.includes(':') && !/^[-+]/.test(text);
      if (looksLikeHeading) p.classList.add('prof-inline-heading');
      const energyMatches = text.match(/\+\s?\d[\d,]*\s+Energy/g);
      if (energyMatches && energyMatches.length >= 2) {
        const parts = text.split(/(?=\+\s?\d[\d,]*\s+Energy)/).map(part => part.trim()).filter(Boolean);
        if (parts.length >= 2) {
          const ul = document.createElement('ul');
          ul.className = 'prof-clean-list prof-energy-list';
          parts.forEach(part => {
            const li = document.createElement('li');
            li.textContent = part;
            ul.appendChild(li);
          });
          p.replaceWith(ul);
        }
      }
    });

    splitMixedMediaParagraphs(scope);
    enhanceDumpInlineMedia(scope);
    enhanceTableItemIcons(scope);
    enhanceIngredientLines(scope);
    normalizeStepParagraphs(scope);
    enhancePlainLists(scope);
    classifyDumpMedia(scope);
  }


  function classifyDumpMedia(scope){
    const classify = img => {
      const naturalW = img.naturalWidth || 0;
      const naturalH = img.naturalHeight || 0;
      const maxDim = Math.max(naturalW, naturalH);
      img.classList.remove('prof-media-token','prof-media-small','prof-media-large');
      if (img.closest('table')) return;
      const frame = img.closest('figure,.prof-media-frame,.prof-section-media-card,.prof-main-media');
      if (frame && frame.closest('.prof-section-body')) {
        frame.classList.add('prof-media-frame');
        frame.classList.remove('prof-media-frame-token','prof-media-frame-small','prof-media-frame-large');
      }
      if (maxDim && maxDim <= 96) { img.classList.add('prof-media-token'); if (frame) frame.classList.add('prof-media-frame-token'); }
      else if (maxDim && maxDim <= 220) { img.classList.add('prof-media-small'); if (frame) frame.classList.add('prof-media-frame-small'); }
      else { img.classList.add('prof-media-large'); if (frame) frame.classList.add('prof-media-frame-large'); }
    };
    scope.querySelectorAll('.prof-section-body img.prof-dump-img, .prof-section-body figure img').forEach(img => {
      if (img.complete) classify(img);
      else img.addEventListener('load', () => classify(img), {once:true});
    });
  }

  function normalizeStepParagraphs(scope){
    scope.querySelectorAll('.prof-section-body').forEach(body => {
      let steps = [];
      let current = null;
      const isPlainContinuation = node => {
        if (!current || !node || node.tagName !== 'P') return false;
        if (node.classList.contains('prof-step-p')) return false;
        if (node.classList.contains('prof-inline-heading')) return false;
        if (node.classList.contains('prof-section-lead')) return false;
        const text = (node.textContent || '').trim();
        if (!text || /^[-+]/.test(text)) return false;
        return text.length < 360;
      };
      const flush = () => {
        if (!steps.length) return;
        const ol = document.createElement('ol');
        ol.className = 'prof-numbered-list';
        const firstStep = Number(steps[0].step || 1);
        if (firstStep > 1) ol.start = firstStep;
        steps.forEach((step, stepIndex) => {
          const li = document.createElement('li');
          const baseStep = Number(step.step || (stepIndex + 1));
          li.dataset.step = String(Number.isFinite(baseStep) ? baseStep : (stepIndex + 1)).padStart(2, '0');
          step.nodes.forEach((node, idx) => {
            const block = document.createElement(idx === 0 ? 'div' : 'p');
            block.className = idx === 0 ? 'prof-step-main' : 'prof-step-cont';
            block.innerHTML = idx === 0 ? node.innerHTML.replace(/^\s*\d+\.\s*/, '') : node.innerHTML;
            li.appendChild(block);
          });
          ol.appendChild(li);
        });
        steps[0].nodes[0].before(ol);
        steps.forEach(step => step.nodes.forEach(node => node.remove()));
        steps = [];
        current = null;
      };
      Array.from(body.children).forEach(node => {
        if (node.matches && node.matches('p.prof-step-p')) {
          current = {step: node.dataset.step || '1', nodes: [node]};
          steps.push(current);
          return;
        }
        if (isPlainContinuation(node)) {
          current.nodes.push(node);
          return;
        }
        flush();
      });
      flush();
    });
  }

  function enhancePlainLists(scope){
    scope.querySelectorAll('.prof-section-body').forEach(body => {
      Array.from(body.querySelectorAll(':scope > p')).forEach(p => {
        const text = (p.textContent || '').trim();
        const parts = text.split(/\s{2,}|\s*•\s*/).map(x => x.trim()).filter(Boolean);
        if (parts.length >= 3 && text.length < 220) {
          const ul = document.createElement('ul');
          ul.className = 'prof-clean-list';
          parts.forEach(part => {
            const li = document.createElement('li');
            li.textContent = part;
            ul.appendChild(li);
          });
          p.replaceWith(ul);
        }
      });
    });
  }

  function galleryFor(id){
    const p = professions.find(item => item.id === id);
    return (p?.media || []).map(([file, caption]) => ({src: mediaPath(file), caption: caption || p.name, alt: caption || p.name}));
  }

  function ensureLightbox(){
    let box = document.querySelector('.prof-lightbox');
    if (box) return box;
    box = document.createElement('div');
    box.className = 'prof-lightbox';
    box.setAttribute('aria-hidden','true');
    box.innerHTML = `<div class="prof-lightbox-backdrop" data-prof-close></div>
      <div class="prof-lightbox-panel" role="dialog" aria-modal="true" aria-label="Profession media preview">
        <div class="prof-lightbox-top"><p></p><button type="button" data-prof-close>Close</button></div>
        <button type="button" class="prof-lightbox-nav prev" data-prof-prev aria-label="Previous image">‹</button>
        <img alt="" />
        <button type="button" class="prof-lightbox-nav next" data-prof-next aria-label="Next image">›</button>
        <div class="prof-lightbox-count"></div>
      </div>`;
    document.body.appendChild(box);
    box.addEventListener('click', e => {
      if (e.target.closest('[data-prof-close]')) closeLightbox();
      if (e.target.closest('[data-prof-prev]')) showLightbox(lightboxIndex - 1);
      if (e.target.closest('[data-prof-next]')) showLightbox(lightboxIndex + 1);
    });
    let touchStart = null;
    box.addEventListener('touchstart', e => { touchStart = e.touches[0]?.clientX ?? null; }, {passive:true});
    box.addEventListener('touchend', e => {
      if (touchStart === null) return;
      const end = e.changedTouches[0]?.clientX ?? touchStart;
      const delta = end - touchStart;
      if (Math.abs(delta) > 45) showLightbox(lightboxIndex + (delta < 0 ? 1 : -1));
      touchStart = null;
    }, {passive:true});
    document.addEventListener('keydown', e => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') showLightbox(lightboxIndex - 1);
      if (e.key === 'ArrowRight') showLightbox(lightboxIndex + 1);
    });
    return box;
  }

  function openLightbox(items, index){
    lightboxItems = items || [];
    if (!lightboxItems.length) return;
    const box = ensureLightbox();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden','false');
    document.body.classList.add('prof-lightbox-open');
    showLightbox(index || 0);
    const close = box.querySelector('[data-prof-close]');
    if (close) close.focus({preventScroll:true});
  }

  function showLightbox(index){
    if (!lightboxItems.length) return;
    lightboxIndex = (index + lightboxItems.length) % lightboxItems.length;
    const item = lightboxItems[lightboxIndex];
    const box = ensureLightbox();
    box.querySelector('img').src = item.src;
    box.querySelector('img').alt = item.alt || item.caption || 'Profession media';
    box.querySelector('.prof-lightbox-top p').textContent = item.caption || '';
    box.querySelector('.prof-lightbox-count').textContent = lightboxItems.length > 1 ? `${lightboxIndex + 1} / ${lightboxItems.length}` : '';
    box.querySelector('[data-prof-prev]').style.display = lightboxItems.length > 1 ? 'grid' : 'none';
    box.querySelector('[data-prof-next]').style.display = lightboxItems.length > 1 ? 'grid' : 'none';
  }

  function closeLightbox(){
    const box = document.querySelector('.prof-lightbox');
    if (!box) return;
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden','true');
    document.body.classList.remove('prof-lightbox-open');
  }

  function galleryForImage(img){
    const src = img.getAttribute('src') || '';
    const caption = img.getAttribute('alt') || img.closest('figure')?.querySelector('figcaption')?.textContent || 'Profession media';
    const section = img.closest('.prof-section-body');
    const images = section ? Array.from(section.querySelectorAll('img.prof-dump-img:not(.prof-media-token), .prof-section-media-card img, .prof-overview-media-strip img')) : [img];
    const items = images.map(item => ({src:item.getAttribute('src'), caption:item.getAttribute('alt') || item.closest('figure')?.querySelector('figcaption')?.textContent || 'Profession media', alt:item.getAttribute('alt') || 'Profession media'})).filter(item => item.src);
    const index = Math.max(0, images.indexOf(img));
    return {items: items.length ? items : [{src, caption, alt:caption}], index};
  }

  function bindMediaTriggers(scope){
    scope.querySelectorAll('[data-prof-gallery]').forEach(el => {
      el.addEventListener('click', () => openLightbox(galleryFor(el.dataset.profGallery), Number(el.dataset.mediaIndex || 0)));
      el.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openLightbox(galleryFor(el.dataset.profGallery), Number(el.dataset.mediaIndex || 0));
        }
      });
    });
    scope.querySelectorAll('.prof-section-body img.prof-dump-img:not(.prof-media-token), .prof-section-media-card img, .prof-overview-media-strip img').forEach(img => {
      img.setAttribute('tabindex','0');
      img.setAttribute('role','button');
      img.addEventListener('click', () => { const gallery = galleryForImage(img); openLightbox(gallery.items, gallery.index); });
      img.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); const gallery = galleryForImage(img); openLightbox(gallery.items, gallery.index); }
      });
    });
  }

  function updateActiveToc(scope, id){
    if (!id) return;
    scope.querySelectorAll('[data-section-target]').forEach(btn => {
      const active = btn.dataset.sectionTarget === id;
      btn.classList.toggle('active', active);
      if (active) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function bindSectionSpy(scope){
    const buttons = Array.from(scope.querySelectorAll('[data-section-target]'));
    const sections = buttons.map(btn => document.getElementById(btn.dataset.sectionTarget)).filter(Boolean);
    if (!sections.length) return;
    updateActiveToc(scope, sections[0].id);
    let raf = 0;
    const pickNow = () => {
      raf = 0;
      let best = sections[0];
      let bestDistance = Infinity;
      sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const distance = Math.abs(rect.top - 126);
        if (rect.bottom > 110 && rect.top < window.innerHeight * .74 && distance < bestDistance) {
          best = section;
          bestDistance = distance;
        }
      });
      updateActiveToc(scope, best.id);
    };
    const pick = () => { if (!raf) raf = requestAnimationFrame(pickNow); };
    let observer = null;
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(pick, {root:null, rootMargin:'-92px 0px -58% 0px', threshold:[0,.18,.35,.6]});
      sections.forEach(section => observer.observe(section));
    }
    window.addEventListener('scroll', pick, {passive:true});
    sectionSpyCleanup = () => {
      window.removeEventListener('scroll', pick);
      if (observer) observer.disconnect();
      if (raf) cancelAnimationFrame(raf);
    };
  }

  host.addEventListener('input', e => {
    if (e.target && e.target.id === 'profSearch') {
      query = e.target.value || '';
      render();
      const input = host.querySelector('#profSearch');
      if (input) { input.focus(); input.setSelectionRange(query.length, query.length); }
    }
  });

  host.addEventListener('click', e => {
    const sectionButton = e.target.closest('[data-section-target]');
    if (sectionButton) {
      e.preventDefault();
      const target = document.getElementById(sectionButton.dataset.sectionTarget || '');
      if (target) target.scrollIntoView({behavior:'auto', block:'start'});
      updateActiveToc(host, sectionButton.dataset.sectionTarget);
      return;
    }
    const filterButton = e.target.closest('[data-filter]');
    if (filterButton) {
      filter = filterButton.dataset.filter || 'all';
      const list = filteredProfessions();
      if (activeId !== 'overview' && list.length && !list.some(p => p.id === activeId)) activeId = list[0].id;
      render();
      return;
    }
    const pick = e.target.closest('[data-profession]');
    if (pick) {
      e.preventDefault();
      const nextId = pick.dataset.profession;
      if (nextId === activeId) return;
      activeId = nextId;
      render();
      // Keep profession selection stable; rerendering the reader should not also force a scroll jump.
    }
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render); else render();
})();
