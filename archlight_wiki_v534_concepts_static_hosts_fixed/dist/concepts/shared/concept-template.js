(() => {
  'use strict';
  const esc = (v='') => String(v ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const slug = (v='section') => String(v || 'section').toLowerCase().replace(/&/g,'and').replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'') || 'section';
  const strip = (html='') => { const d=document.createElement('div'); d.innerHTML=html; return d.textContent.replace(/\s+/g,' ').trim(); };
  const stat = (label, value) => `<div class="ut-stat"><span>${esc(label)}</span><b>${esc(value)}</b></div>`;
  function shell(page){
    const sections = page.sections.filter(Boolean).map((s,i)=>({ ...s, id:s.id || slug(s.title || `section-${i+1}`)}));
    return `<article class="ut-page shell-matched ${esc(page.templateClass||'')}"><div class="ut-shell"><section class="ut-hero" id="top"><div><div class="ut-kicker">${esc(page.kicker||page.category||'Wiki Guide')}</div><h1 class="ut-title">${esc(page.title||'Wiki Page')}</h1><p class="ut-lead">${esc(page.lead||'')}</p></div><div class="ut-hero-tools"><div class="ut-statgrid">${(page.stats||[]).slice(0,3).map(x=>stat(x[0]||x.label,x[1]||x.value)).join('')}</div><div class="ut-toolbar"><span class="ut-chip">${sections.length} sections</span>${page.action ? `<button class="ut-action primary" type="button" data-section-target="${esc(sections[0]?.id||'top')}">${esc(page.action)}</button>`:''}</div></div></section><div class="ut-board"><main class="ut-main">${sections.map((s,i)=>section(s,i)).join('')}</main><aside class="ut-side"><div class="ut-side-card"><h3>On this page</h3><p>Jump to the section you need. The active row follows your scroll.</p><div class="ut-section-nav">${sections.map((s,i)=>`<button type="button" data-section-target="${esc(s.id)}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(s.title)}</span></button>`).join('')}</div></div></aside></div></div></article>`;
  }
  function section(s,i){ const label=s.label||s.kicker||s.subtitle||''; return `<section class="ut-panel ut-section" id="${esc(s.id)}" data-ut-section><div class="ut-section-head"><div class="ut-num">${String(i+1).padStart(2,'0')}</div><div class="ut-section-titleblock"><h2>${esc(String(s.title||'Section').replace(/=+$/,'').trim())}</h2>${label?`<small>${esc(label)}</small>`:''}</div></div><div class="ut-body">${s.html||''}</div></section>`; }
  const cards = arr => `<div class="ct-grid">${(arr||[]).map(c=>{
    const title=c.title||c.name||c.label||'Entry';
    const main=c.text||c.desc||c.description||c.note||c.effect||'';
    const image=c.image||c.preview||'';
    const facts=[
      c.tier&&['Tier',c.tier], c.power&&['Power',c.power], c.attack_power&&['Attack Power',c.attack_power], c.hp_mp&&['HP/MP',c.hp_mp],
      c.bonus&&['Bonus',c.bonus], c.cost&&['Cost',c.cost], c.source&&['Source',c.source], c.acquisition&&['Acquisition',c.acquisition], c.group&&['Group',c.group], c.family&&['Family',c.family]
    ].filter(Boolean);
    return `<article class="ct-card">${image?`<img class="ct-card-img" src="${esc(image)}" alt="${esc(title)}" loading="lazy">`:''}<h3>${esc(title)}</h3>${main?`<p>${esc(main)}</p>`:''}${facts.map(f=>`<small><b>${esc(f[0])}</b> ${esc(f[1])}</small>`).join('')}${c.task?`<p><strong>Task:</strong> ${esc(c.task)}</p>`:''}${c.how_to_obtain?`<p><strong>How to obtain:</strong> ${esc(c.how_to_obtain)}</p>`:''}</article>`
  }).join('')}</div>`;
  const table = (columns=[], rows=[]) => `<div class="ct-table-wrap"><table class="ct-table"><thead><tr>${columns.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${(rows||[]).map(r=>`<tr>${(Array.isArray(r)?r:Object.values(r)).map(v=>`<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  const chips = items => `<p>${(items||[]).map(x=>`<span class="ct-chip">${esc(x)}</span>`).join('')}</p>`;

  function patchSyncSection(data){
    const sync=data.patchSync;
    if(!sync) return null;
    const items=sync.items||[];
    return {id:'patch-sync', title:sync.title||'Patch Note Sync', label:sync.label||'Current archive check', html:`<div class="ct-leadbox ct-sync-box"><p>${esc(sync.intro||'This page was checked against the Updates archive.')}</p></div>${cards(items.map(x=>({title:x.title||x[0],text:x.text||x[1],accent:x.accent||''})))}`};
  }

  function initials(value, fallback='??'){
    return String(value || fallback).replace(/[^a-z0-9 ]/gi,'').split(/\s+/).filter(Boolean).map(part=>part[0]).join('').slice(0,3).toUpperCase() || fallback;
  }
  function objectValue(row, key){
    if(!row) return '';
    if(Array.isArray(row)) return row[key] || '';
    return row[key] ?? row[String(key).toLowerCase().replace(/\s+/g,'_')] ?? '';
  }
  function renderCustomIntro(cardsData=[]){
    return `<div class="custom-intro-grid">${(cardsData||[]).map(c=>`<article class="custom-callout"><small>${esc(c.accent||c.label||'Note')}</small><h3>${esc(c.title||c.label||'Entry')}</h3><p>${esc(c.text||c.description||'')}</p></article>`).join('')}</div>`;
  }
  function customControls(kind, groups, placeholder){
    return `<div class="custom-controls" data-custom-controls="${esc(kind)}">
      <label class="custom-search"><span>⌕</span><input type="search" placeholder="${esc(placeholder)}" aria-label="Search ${esc(kind)}" data-custom-search="${esc(kind)}"></label>
      <div class="custom-filterbar" aria-label="${esc(kind)} filters">
        ${(groups||[]).map((g,i)=>`<button type="button" class="custom-filter ${i===0?'is-active':''}" data-custom-filter="${esc(kind)}" data-filter-value="${esc(g.value)}"><span>${esc(g.short||initials(g.label))}</span><b>${esc(g.label)}</b><em>${esc(g.count)}</em></button>`).join('')}
      </div>
    </div>`;
  }
  function addonTable(block){
    const headers=block.headers||[];
    return `<div class="addon-table-wrap"><table class="addon-table"><thead><tr>${headers.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${(block.rows||[]).map(row=>`<tr>${headers.map(h=>`<td>${esc(objectValue(row,h))}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
  }
  function addonItemCard(item, index){
    const title=item.name||item.title||item.label||'Addon';
    const type=item.type||item.category||item.kind||item.source||'Cosmetic';
    const image=item.image||item.preview||item.icon||'';
    const note=item.note||item.description||item.text||item.obtain||'';
    const tier=item.tier||item.power||item.attack_power||item.hp_mp||item.bonus||'';
    return `<article class="addon-card" data-custom-item="addons" data-category="${esc(type)}" data-search="${esc(`${title} ${type} ${note} ${tier}`.toLowerCase())}">
      <div class="addon-media">${image?`<img src="${esc(image)}" alt="${esc(title)}" loading="lazy" onerror="this.remove();">`:`<span>${esc(initials(title,'AD'))}</span>`}</div>
      <div class="addon-copy"><small>${esc(type)}</small><h3>${esc(title)}</h3>${note?`<p>${esc(note)}</p>`:''}${tier?`<dl><div><dt>Bonus</dt><dd>${esc(tier)}</dd></div></dl>`:''}</div>
    </article>`;
  }
  function renderAddons(data){
    const collections=(data.collections||[]).flatMap(g=>(g.rows||[]).map(r=>({ ...r, source:g.title, type:g.title })));
    const profGroups=[...(data.profession||[]),...(data.other||[])];
    const profItems=profGroups.flatMap(g=>(g.rows||[]).map(r=>({ ...r, source:g.title, type:g.title })));
    const allItems=[...collections,...profItems];
    const categories=['All',...Array.from(new Set(allItems.map(i=>i.type||i.source||'Cosmetic')))].map(label=>({value:label,label:label==='All'?'All Cosmetics':label,count:label==='All'?allItems.length:allItems.filter(i=>(i.type||i.source)===label).length}));
    const sections=[
      {id:'overview', title:'Overview', label:'Collector system', html:`<div class="addon-note">${(data.intro||[]).map(t=>esc(t)).join('<br><br>')}</div><div class="addon-category-strip">${(data.sources||[]).map(s=>`<article class="addon-source-card"><h3>${esc(s.label||s.title)}</h3><p>${esc(s.text||s.description||'')}</p></article>`).join('')}</div>`},
      {id:'boosts', title:'Permanent Bonus Tiers', label:'Collector power', html:`<div class="addon-boost-grid">${(data.boosts||[]).map(b=>`<article class="addon-boost-card"><h3>${esc(b.title)}</h3>${addonTable(b)}</article>`).join('')}</div>`},
      {id:'collection', title:'Addon Collection', label:`${allItems.length} restored entries`, html:`${customControls('addons',categories,'Search addon names, sources, bonuses...')}<div class="custom-count" data-custom-count="addons"><span>Showing</span><b>${allItems.length}</b><em>all cosmetics</em></div><div class="addon-grid">${allItems.map(addonItemCard).join('')}</div>`}
    ];
    return {templateClass:'custom-display-page custom-addons-display',title:'Addons', kicker:'Cosmetic Collection', lead:(data.intro||[])[0]||'Addon collection and permanent cosmetic bonuses.', stats:[['Sources',(data.sources||[]).length],['Categories',categories.length-1],['Entries',allItems.length]], action:'Browse collection', sections: sections.concat([patchSyncSection(data)].filter(Boolean))};
  }
  function featCard(item,index){
    const family=item.family||item.category||'Feat';
    const title=item.name||item.title||'Feat';
    const effect=item.effect||item.description||'Permanent reward';
    const image=item.image||'';
    return `<article class="feat-card" data-custom-item="feats" data-category="${esc(family)}" data-search="${esc(`${title} ${family} ${effect} ${item.task||''} ${item.cost||''}`.toLowerCase())}">
      <div class="feat-media">${image?`<img src="${esc(image)}" alt="${esc(title)}" loading="lazy" onerror="this.closest('.feat-media').classList.add('is-missing');this.remove();">`:`<span>${esc(initials(title,'FT'))}</span>`}</div>
      <div class="feat-content"><div class="feat-top"><small>${esc(family)}</small><h3>${esc(title)}</h3></div><p class="feat-effect">${esc(effect)}</p><div class="feat-meta">${item.task?`<div><span>Task</span><strong>${esc(item.task)}</strong></div>`:''}${item.cost?`<div><span>Cost</span><strong>${esc(item.cost)}</strong></div>`:''}</div></div>
    </article>`;
  }
  function renderFeats(data){
    const sourceSections=(data.sections||[]);
    const collection=sourceSections.find(s=>Array.isArray(s.feats)) || {feats:[]};
    const overview=sourceSections.find(s=>s.id==='overview') || sourceSections[0] || {};
    const feats=collection.feats || [];
    const families=['All',...Array.from(new Set(feats.map(f=>f.family||f.category||'Feat'))).sort()].map(label=>({value:label,label:label==='All'?'All Feats':label,count:label==='All'?feats.length:feats.filter(f=>(f.family||f.category||'Feat')===label).length}));
    return {templateClass:'custom-display-page custom-feats-display', title:data.title||'Feats', kicker:data.eyebrow||'Character Progression', lead:data.lead||'', stats:data.heroStats||[['Entries',feats.length],['Focus','Permanent bonuses'],['Template','Custom']], action:data.action||'Browse feats', sections:[
      {id:'overview', title:'Overview', label:overview.kicker||'System basics', html:`<p>${esc(overview.intro||'')}</p>${renderCustomIntro(overview.cards||[])}`},
      {id:'feat-collection', title:collection.title||'Feat Collection', label:`${feats.length} feats`, html:`${customControls('feats',families,'Search feats, tasks, costs, bonuses...')}<div class="custom-count" data-custom-count="feats"><span>Showing</span><b>${feats.length}</b><em>all feat entries</em></div><div class="feat-grid">${feats.map(featCard).join('')}</div>`}
    ].concat([patchSyncSection(data)].filter(Boolean))};
  }
  function companionCard(item,index){
    const group=item.group||'Companions';
    const title=item.name||item.title||'Companion';
    const bonus=item.bonus||item.effect||item.description||'Passive bonus';
    const source=item.source||item.acquisition||'Source not listed';
    const image=item.image||'';
    return `<article class="companion-card" data-custom-item="companions" data-category="${esc(group)}" data-search="${esc(`${title} ${group} ${bonus} ${source}`.toLowerCase())}">
      <div class="companion-media">${image?`<img src="${esc(image)}" alt="${esc(title)}" loading="lazy" onerror="this.closest('.companion-media').classList.add('is-missing');this.remove();">`:`<span>${esc(initials(title,'CMP'))}</span>`}</div>
      <div class="companion-content"><div class="companion-top"><small>${esc(group)}</small><h3>${esc(title)}</h3></div><div class="companion-meta"><div><span>Bonus</span><strong>${esc(bonus)}</strong></div><div><span>Source</span><strong>${esc(source)}</strong></div></div></div>
    </article>`;
  }
  function renderCompanions(data){
    const sourceSections=(data.sections||[]);
    const collection=sourceSections.find(s=>Array.isArray(s.companions)||Array.isArray(s.items)) || {companions:[]};
    const entries=collection.companions || collection.items || [];
    const overview=sourceSections.find(s=>s.id==='overview') || sourceSections[0] || {};
    const groups=['All',...Array.from(new Set(entries.map(f=>f.group||'Companions'))).sort()].map(label=>({value:label,label:label==='All'?'All Companions':label,count:label==='All'?entries.length:entries.filter(f=>(f.group||'Companions')===label).length}));
    return {templateClass:'custom-display-page custom-companions-display', title:data.title||'Companions', kicker:data.eyebrow||'Character Utility', lead:data.lead||'', stats:data.heroStats||[['Entries',entries.length],['Bonus','Always active'],['Template','Custom']], action:data.action||'Browse companions', sections:[
      {id:'overview', title:'Overview', label:overview.kicker||'System basics', html:`<p>${esc(overview.intro||'')}</p>${renderCustomIntro(overview.cards||[])}`},
      {id:'companion-list', title:collection.title||'Companion Collection', label:`${entries.length} companions`, html:`${customControls('companions',groups,'Search companions, bonuses, sources...')}<div class="custom-count" data-custom-count="companions"><span>Showing</span><b>${entries.length}</b><em>all companion entries</em></div><div class="companion-grid">${entries.map(companionCard).join('')}</div>`}
    ].concat([patchSyncSection(data)].filter(Boolean))};
  }
  function renderGuildBlock(block){
    if(block.type==='lead') return `<div class="ct-leadbox"><p>${esc(block.text)}</p></div>`;
    if(block.type==='notice') return `<div class="ct-leadbox ct-warning"><p>${esc(block.text)}</p></div>`;
    if(block.type==='stats') return `<h3>${esc(block.title)}</h3>${cards((block.items||[]).map(x=>({title:x[0], text:x[1]})))}`;
    if(block.type==='table') return `<h3>${esc(block.title)}</h3>${table(block.columns, block.rows)}`;
    if(block.type==='chips') return `<h3>${esc(block.title)}</h3>${chips(block.items)}`;
    if(block.type==='steps') return `<h3>${esc(block.title)}</h3>${cards((block.items||[]).map(x=>({title:x[0], text:x[1]})))}`;
    if(block.type==='media') return `<h3>${esc(block.title)}</h3><div class="ct-media-grid">${(block.items||[]).map(x=>`<figure class="ct-media"><img src="guilds-media/${esc(x[0])}" alt="${esc(x[1])}" loading="lazy"><b>${esc(x[1])}</b></figure>`).join('')}</div>`;
    return block.text ? `<p>${esc(block.text)}</p>` : '';
  }
  function renderGuilds(data){return {title:data.title||'Guilds', kicker:data.kicker||'Guild War Room', lead:data.lead||'', stats:data.facts||[['Systems',(data.sections||[]).length],['Template','Custom'],['Content','Restored']], action:'Browse systems', sections:[{id:'overview', title:'Overview', label:'System map', html:`${cards(data.lanes||[])}<h3>Core Flow</h3>${cards((data.flow||[]).map(x=>({title:x[0],text:x[1]})))}`}, ...(data.sections||[]).map(s=>({id:s.id, title:s.title, label:s.subtitle, html:`${s.meta?chips(s.meta):''}${(s.body||[]).map(renderGuildBlock).join('')}`})), ...[patchSyncSection(data)].filter(Boolean)]};}
  function renderProfessions(data){
    const meta=data.meta||{}; const profs=data.professions||[];
    const overview=(data.overviewSections||[]).map(s=>`<div class="ct-leadbox">${s.html||''}</div>`).join('');
    return {title:meta.title||'Professions', kicker:meta.category||'Custom Page Template', lead:meta.lead||'', stats:meta.stats||[['Professions',profs.length],['Template','Custom'],['Content','Old wiki']], action:'Browse professions', sections:[
      {id:'overview', title:'Overview', label:'System basics', html:`${overview}<h3>Profession Types</h3>${cards(data.groups||[])}`},
      ...profs.map(p=>({id:p.id||slug(p.name), title:p.name, label:p.group||p.role, html:`<div class="ct-leadbox"><p>${esc(p.lead||'')}</p>${chips([p.role,p.energy,p.value].filter(Boolean))}</div>${(p.media&&p.media.length)?`<div class="ct-media-grid">${p.media.slice(0,18).map(m=>`<figure class="ct-media"><img src="professions-media/${esc(m[0])}" alt="${esc(m[1]||m[0])}" loading="lazy"><b>${esc(m[1]||m[0])}</b></figure>`).join('')}</div>`:''}${(p.sections||[]).map(s=>`<h3>${esc(s.title)}</h3>${s.html||''}`).join('')}`})), ...[patchSyncSection(data)].filter(Boolean)
    ]};
  }
  function bind(scope=document){
    scope.querySelectorAll('[data-section-target]').forEach(btn=>btn.addEventListener('click',()=>{const el=scope.querySelector('#'+CSS.escape(btn.dataset.sectionTarget)); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); scope.querySelectorAll('[data-section-target]').forEach(b=>b.classList.toggle('active', b===btn));}));
    const buttons=[...scope.querySelectorAll('[data-section-target]')]; const sections=buttons.map(b=>scope.querySelector('#'+CSS.escape(b.dataset.sectionTarget))).filter(Boolean); if(buttons[0]) buttons[0].classList.add('active');
    if('IntersectionObserver' in window && sections.length){ const obs=new IntersectionObserver(()=>{let best=sections[0],dist=1e9; sections.forEach(s=>{const r=s.getBoundingClientRect(),d=Math.abs(r.top-120); if(r.bottom>100&&r.top<innerHeight*.75&&d<dist){best=s;dist=d;}}); buttons.forEach(b=>b.classList.toggle('active',b.dataset.sectionTarget===best.id));},{rootMargin:'-92px 0px -58% 0px',threshold:[0,.18,.35,.6]}); sections.forEach(s=>obs.observe(s)); }
    scope.querySelectorAll('[data-custom-controls]').forEach(control=>{
      const kind=control.dataset.customControls;
      const input=control.querySelector(`[data-custom-search="${kind}"]`);
      const filters=[...control.querySelectorAll(`[data-custom-filter="${kind}"]`)];
      const items=[...scope.querySelectorAll(`[data-custom-item="${kind}"]`)];
      const count=scope.querySelector(`[data-custom-count="${kind}"]`);
      let active='All';
      const apply=()=>{
        const term=(input?.value||'').trim().toLowerCase();
        let visible=0;
        items.forEach(item=>{
          const category=item.dataset.category || '';
          const hay=item.dataset.search || item.textContent.toLowerCase();
          const okCategory=active==='All' || category===active;
          const okSearch=!term || hay.includes(term);
          item.hidden=!(okCategory && okSearch);
          if(!item.hidden) visible++;
        });
        if(count){
          const b=count.querySelector('b'); const em=count.querySelector('em');
          if(b) b.textContent=String(visible);
          if(em) em.textContent=(active==='All' ? `all ${kind.replace(/-/g,' ')} entries` : active);
        }
      };
      filters.forEach(btn=>btn.addEventListener('click',()=>{active=btn.dataset.filterValue || 'All'; filters.forEach(b=>b.classList.toggle('is-active', b===btn)); apply();}));
      if(input) input.addEventListener('input', apply);
    });
  }
  function getPage(){ const key=document.body.dataset.page; if(key==='addons') return renderAddons(window.ADDONS_CONCEPT_DATA||{}); if(key==='feats') return renderFeats(window.FEATS_CONCEPT_DATA||{}); if(key==='companions') return renderCompanions(window.COMPANION_CONCEPT_DATA||{}); if(key==='professions') return renderProfessions(window.PROFESSIONS_INTERNAL_CONCEPT||{}); if(key==='guilds') return renderGuilds(window.GUILDS_CUSTOM_PAGE_CONCEPT||{}); return {title:'Concept Page',lead:'',stats:[],sections:[]}; }
  document.addEventListener('DOMContentLoaded',()=>{ const root=document.querySelector('[data-template-root]'); if(!root) return; root.innerHTML=shell(getPage()); bind(root); });
})();
