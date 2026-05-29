(function(){
  const data = window.GUILDS_CUSTOM_PAGE_CONCEPT || window.GUILDS_INTERNAL_CONCEPT;
  const host = document.getElementById('guildsConcept');
  if(!data || !host) return;

  host.classList.add('guilds-concept-root');
  let active = data.sections[0]?.id || 'nodes';
  let sectionSpyCleanup = null;

  const esc = v => String(v ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const current = () => data.sections.find(s => s.id === active) || data.sections[0];
  const mediaPath = f => `guilds-media/${String(f||'').trim()}`;
  const laneFor = id => data.lanes.find(l => l.id === id) || data.lanes[0] || {};
  const accentFor = id => ({nodes:'#7cf3ff', islands:'#ffda68', siege:'#ff987c'}[id] || '#7cf3ff');
  const iconFor = id => {
    const paths = {
      nodes:'M12 3v18 M5 8h14 M7 16h10 M5 8l7-5 7 5 M7 16l5 5 5-5',
      islands:'M12 4l7 4v8l-7 4-7-4V8l7-4Z M12 4v16 M5 8l7 4 7-4',
      siege:'M6 19L19 6 M14 6l4 4 M10 14l4 4 M5 7l12 12'
    };
    const path = paths[id] || 'M12 4l8 8-8 8-8-8 8-8Z';
    return `<svg class="guild-side-svg" viewBox="0 0 24 24" aria-hidden="true"><path d="${path}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  };

  function bindSectionSpy(root){
    const navButtons = [...root.querySelectorAll('[data-section-target]')];
    if(!navButtons.length) return;
    const panels = navButtons.map(btn => document.getElementById(btn.dataset.sectionTarget)).filter(Boolean);
    function setActive(id){
      navButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.sectionTarget === id));
    }
    navButtons.forEach(btn => btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.sectionTarget);
      if(target) target.scrollIntoView({block:'start', behavior:'auto'});
      setActive(btn.dataset.sectionTarget);
    }));
    if('IntersectionObserver' in window){
      const io = new IntersectionObserver(entries => {
        const visible = entries.filter(e => e.isIntersecting).sort((a,b)=>b.intersectionRatio-a.intersectionRatio)[0];
        if(visible) setActive(visible.target.id);
      }, {rootMargin:'-18% 0px -64% 0px', threshold:[.12,.24,.4,.6]});
      panels.forEach(p => io.observe(p));
      sectionSpyCleanup = () => io.disconnect();
    }
  }

  function renderHero(){
    const totalBlocks = (data.sections || []).reduce((sum, section) => sum + ((section.body || []).length), 0);
    const stats = [
      ['Type', 'Guild Guide'],
      ['Use For', 'Nodes + Islands + Siege'],
      ['Sections', `${totalBlocks} guide parts`]
    ];
    return `<section class="ut-hero">
      <div>
        <div class="ut-kicker">Custom Page Template</div>
        <h1 class="ut-title">${esc(data.title || 'Guilds')}</h1>
        <p class="ut-lead">${esc(data.lead || '')}</p>
      </div>
      <div class="ut-hero-tools">
        <div class="ut-statgrid">${stats.map(([label,value]) => `<div class="ut-stat"><span>${esc(label)}</span><b>${esc(value)}</b></div>`).join('')}</div>
        <div class="ut-toolbar"><button type="button" class="ut-action primary" data-guild-scroll-top>Back to Design Lab</button><span class="ut-chip">${esc((data.sections || []).length)} guild systems</span></div>
      </div>
    </section>`;
  }

  function renderRail(){
    const systems = data.sections || [];
    return `<aside class="guild-index" aria-label="Guild index">
      <div class="guild-index-banner">
        <span>Guild Codex</span>
        <h2>Choose a guild system</h2>
        <p>${esc(systems.length)} guild systems · content opens below</p>
      </div>
      <div class="guild-system-list">
        ${systems.map(x=>`<button type="button" class="guild-system-card ${x.id===active?'is-active':''}" data-system="${esc(x.id)}" style="--guild-accent:${accentFor(x.id)}" aria-pressed="${x.id===active?'true':'false'}">
          <span class="guild-system-icon">${iconFor(x.id)}</span>
          <span class="guild-system-text"><b>${esc(x.title)}</b><small>${esc(x.subtitle)}</small></span>
          <span class="guild-system-meta"><strong>${esc((x.body || []).length)}</strong><small>parts</small></span>
        </button>`).join('')}
      </div>
    </aside>`;
  }

  function renderFacts(s){
    const lane = laneFor(s.id);
    const facts = [
      ['Type', lane.title || s.title],
      ['Focus', lane.tag || s.subtitle],
      ['Use', s.meta[0] || 'Guild guide'],
      ['Reference', 'Old wiki dump restored']
    ];
    return `<dl class="guild-facts">${facts.map(([a,b],i)=>`<div class="guild-fact-${i+1}"><dt>${esc(a)}</dt><dd>${esc(b)}</dd></div>`).join('')}</dl>`;
  }

  function blockTitle(block, i){
    if(block.type === 'lead') return 'Overview';
    return block.title || `Guide Part ${i+1}`;
  }
  function blockKind(block){
    if(block.type === 'lead') return 'overview';
    if(block.type === 'cards') return 'details';
    if(block.type === 'chips') return 'reference';
    if(block.type === 'steps') return 'steps';
    if(block.type === 'media') return 'media';
    if(block.type === 'table') return 'table';
    if(block.type === 'stats') return 'stats';
    if(block.type === 'notice') return 'notice';
    return 'guide';
  }
  function blockMeta(block){
    if(block.type === 'cards') return `${block.items?.length || 0} cards`;
    if(block.type === 'chips') return `${block.items?.length || 0} references`;
    if(block.type === 'steps') return `${block.items?.length || 0} steps`;
    if(block.type === 'media') return `${block.items?.length || 0} images`;
    if(block.type === 'table') return `${block.rows?.length || 0} rows`;
    if(block.type === 'stats') return `${block.items?.length || 0} facts`;
    if(block.type === 'notice') return 'important note';
    return 'guide note';
  }

  function renderBlockContent(block){
    if(block.type === 'lead') return `<p class="guild-lead-copy">${esc(block.text)}</p>`;
    if(block.type === 'notice') return `<aside class="guild-notice"><b>Note</b><span>${esc(block.text)}</span></aside>`;
    if(block.type === 'stats') return `<div class="guild-stat-grid">${(block.items||[]).map(([a,b])=>`<article><span>${esc(a)}</span><b>${esc(b)}</b></article>`).join('')}</div>`;
    if(block.type === 'cards') return `<div class="guild-card-grid">${(block.items||[]).map(([a,b])=>`<article class="guild-info-card"><b>${esc(a)}</b><span>${esc(b)}</span></article>`).join('')}</div>`;
    if(block.type === 'chips') return `<div class="guild-chip-board">${(block.items||[]).map(x=>`<span>${esc(x)}</span>`).join('')}</div>`;
    if(block.type === 'steps') return `<div class="guild-step-list">${(block.items||[]).map(([a,b],i)=>`<article><em>${i+1}</em><div><b>${esc(a)}</b><span>${esc(b)}</span></div></article>`).join('')}</div>`;
    if(block.type === 'table') { const cols = (block.columns || []).length; return `<div class="guild-table-frame"><table class="guild-data-table guild-table-cols-${cols}"><thead><tr>${(block.columns||[]).map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${(block.rows||[]).map(row=>`<tr>${row.map(cell=>`<td>${esc(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`; }
    if(block.type === 'media') return `<div class="guild-media-grid">${(block.items||[]).map(item=>{ const file=Array.isArray(item)?item[0]:item; const label=Array.isArray(item)?item[1]:String(file).replace(/[_-]/g,' ').replace(/\.[^.]+$/,''); return `<figure><div class="guild-media-imgbox"><img src="${esc(mediaPath(file))}" alt="${esc(label)}" loading="lazy"></div><figcaption>${esc(label)}</figcaption></figure>`; }).join('')}</div>`;
    return '';
  }

  function renderSections(s){
    const body = s.body || [];
    return `<main class="guild-actual-content ut-main">
      ${body.map((block, idx)=>`<section class="ut-panel ut-section guild-content-section guild-kind-${esc(blockKind(block))}" id="${esc(s.id)}-section-${idx}" data-ut-section>
        <header class="ut-section-head">
          <div class="ut-num">${String(idx+1).padStart(2,'0')}</div>
          <div class="ut-section-titleblock">
            <h2>${esc(blockTitle(block, idx))}</h2>
            <small class="guild-section-meta-line"><span class="guild-kind-chip guild-kind-chip-${esc(blockKind(block))}">${esc(blockKind(block))}</span><span class="guild-block-meta">${esc(blockMeta(block))}</span></small>
          </div>
        </header>
        <div class="ut-body guild-section-body">${renderBlockContent(block)}</div>
      </section>`).join('')}
    </main>`;
  }

  function renderSectionNav(s){
    const body = s.body || [];
    return `<aside class="ut-side" aria-label="On this page">
      <div class="ut-side-card guild-on-page-card">
        <h3>On this page</h3>
        <p>${esc(s.title)} guide sections.</p>
        <div class="ut-section-nav guild-section-nav">
          ${body.map((block, idx)=>`<button type="button" data-section-target="${esc(s.id)}-section-${idx}"><b>${idx+1}</b><span>${esc(blockTitle(block, idx))}</span></button>`).join('')}
        </div>
      </div>
    </aside>`;
  }

  function renderReader(){
    const s = current();
    const lane = laneFor(s.id);
    return `<main class="guild-reader" aria-label="Guild system guide" data-system="${esc(s.id)}" style="--guild-active-accent:${accentFor(s.id)}">
      <header class="guild-reader-head">
        <div class="guild-reader-mark">${iconFor(s.id)}</div>
        <div>
          <small>${esc(lane.tag || 'Guild')} System</small>
          <h2>${esc(s.title)}</h2>
          <p>${esc(lane.desc || s.subtitle)}</p>
        </div>
        <div class="guild-reader-meta" aria-label="Guild guide quick information">
          <div><span>Focus</span><b>${esc(s.subtitle)}</b></div>
          <div><span>Sections</span><b>${esc((s.body || []).length)} guide parts</b></div>
        </div>
      </header>
      ${renderFacts(s)}
      <div class="guild-guide-layout ut-board">
        ${renderSections(s)}
        ${renderSectionNav(s)}
      </div>
    </main>`;
  }

  function render(){
    if(typeof sectionSpyCleanup === 'function') sectionSpyCleanup();
    sectionSpyCleanup = null;
    host.innerHTML = `<article class="ut-page shell-matched guild-custom-page"><div class="ut-shell">${renderHero()}<div class="guild-custom-board">${renderRail()}<div>${renderReader()}</div></div></div></article>`;
    host.querySelector('[data-guild-scroll-top]')?.addEventListener('click', () => window.scrollTo({top:0, behavior:'auto'}));
    host.querySelectorAll('[data-system]').forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.system; render();}));
    bindSectionSpy(host);
  }
  render();
})();
