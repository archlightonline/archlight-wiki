
(function(){
  const pages = window.UNLOCK_TASK_DETAIL_PAGES || [];
  const byId = new Map();
  pages.forEach(p => {
    byId.set(p.id,p);
    const legacy=(p.legacyId||'').replace(/^pg-/,'');
    if(legacy) byId.set(legacy,p);
    (p.aliases||[]).forEach(a=>byId.set(String(a),p));
  });
  const esc = s => String(s||'').replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));
  const strip = s => String(s||'').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
  const iconFor = p => (p.tags||[]).includes('Olympus') ? '⚡' : (p.tags||[]).includes('Otherworld') ? '◈' : (p.tags||[]).includes('Darkness') ? '◆' : (p.tags||[]).includes('Tasks') ? '☑' : '✦';

  function usefulStats(p, sections){
    const sectionCount = (sections || []).length;
    const raw = (p.stats || []).filter(s => s && s.label && s.value);
    const type = raw.find(s => /^(type|kind|category)$/i.test(String(s.label).trim()));
    const useFor = raw.find(s => /^(use for|used for|purpose|goal)$/i.test(String(s.label).trim()));
    const requirement = raw.find(s => /^(requires|required|required for)$/i.test(String(s.label).trim()));
    const reward = raw.find(s => /^(reward|rewards|earn|unlocks)$/i.test(String(s.label).trim()));
    const useful = [];
    if(requirement) useful.push({ label: 'Requires', value: requirement.value });
    else if(type) useful.push({ label: 'Type', value: type.value });
    if(useFor) useful.push({ label: 'Use For', value: useFor.value });
    else if(reward) useful.push({ label: reward.label, value: reward.value });
    if(sectionCount) useful.push({ label: 'Sections', value: sectionCount + ' sections' });
    if(useful.length >= 3) return useful.slice(0,3);
    const tags = (p.tags || [])
      .filter(t => !/^(access|tasks|quest|questline)$/i.test(String(t)))
      .slice(0,2)
      .join(' + ');
    if(useful.length < 3 && tags) useful.push({ label: 'Covers', value: tags });
    if(useful.length < 3 && p.category) useful.push({ label: 'Category', value: p.category });
    if(useful.length < 3 && sectionCount) useful.push({ label: 'Sections', value: sectionCount + ' sections' });
    return useful.slice(0,3);
  }

  function pageSummary(p){ const first=(p.sections||[]).find(s=>s.html&&s.html.length>30); const text=first ? strip(first.html) : (p.lead||''); return text.slice(0,150); }

  function normalizeSectionHtml(html){
    const box = document.createElement('div');
    box.innerHTML = html || '<p>No extra notes were found for this section yet.</p>';

    const cleanCell = cell => {
      let value = cell.innerHTML || '';
      value = value
        .replace(/&lt;\/?del&gt;/gi,'')
        .replace(/<\/?del>/gi,'')
        .replace(/\{\{[^}<]*(?:\}\})?/g,'')
        .replace(/\}\}/g,'')
        .replace(/&nbsp;/gi,' ')
        .replace(/\s+/g,' ')
        .trim();
      cell.innerHTML = value;
      return cell.textContent.replace(/\s+/g,' ').trim();
    };

    box.querySelectorAll('table').forEach(table => {
      table.classList.add('ut-table');
      const rows = Array.from(table.rows || []);
      rows.forEach(row => {
        Array.from(row.cells || []).forEach(cell => {
          const text = cleanCell(cell);
          const isBrokenWikiMedia = /^\{\{.*\?(?:no)?link/i.test(text) || /^\}\}$/.test(text) || /^\{\{:?[^\s]+$/i.test(text);
          if (!text || isBrokenWikiMedia) cell.remove();
        });
      });

      const headerRow = table.rows && table.rows[0];
      if (headerRow) {
        Array.from(headerRow.cells || []).forEach(cell => {
          if (!cell.textContent.replace(/\s+/g,' ').trim()) cell.remove();
        });
      }

      const headerCols = headerRow ? headerRow.cells.length : 0;
      Array.from(table.rows || []).slice(1).forEach(row => {
        if (headerCols === 5 && row.cells.length === 4 && row.cells[0] && !/^[:.…-]+$/.test(row.cells[0].textContent.trim())) {
          row.insertBefore(document.createElement('td'), row.cells[1] || null);
        }
      });

      const cols = Math.max(...Array.from(table.rows || []).map(row => row.cells.length), headerCols, 0);
      Array.from(table.rows || []).forEach(row => {
        while (row.cells.length < cols) row.appendChild(document.createElement('td'));
      });

      let carriedLabel = '';
      Array.from(table.rows || []).slice(1).forEach(row => {
        const first = row.cells[0];
        if (!first) return;
        const text = first.textContent.replace(/\s+/g,' ').trim();
        if (/^[:.…-]+$/.test(text)) {
          first.textContent = carriedLabel ? '↳ ' + carriedLabel : '↳ Continued';
          first.classList.add('ut-cell-continuation');
        } else if (text) {
          carriedLabel = text;
        }
      });

      table.dataset.columns = String(cols || 'auto');
      const wrap = table.closest('.ut-table-wrap');
      if (wrap) wrap.dataset.columns = String(cols || 'auto');
    });

    const nodes = Array.from(box.childNodes);
    let cluster = null;
    nodes.forEach(node => {
      if (node.nodeType === 1 && node.tagName === 'UL' && node.children.length === 1 && node.querySelectorAll('li').length === 1) {
        if (!cluster) {
          cluster = document.createElement('ul');
          cluster.className = 'ut-list ut-list-compact';
          node.before(cluster);
        }
        cluster.appendChild(node.querySelector('li'));
        node.remove();
      } else if (node.nodeType === 1 && node.matches && !node.matches('script,style')) {
        cluster = null;
      }
    });

    box.querySelectorAll('.ut-media, figure').forEach(media => {
      const img = media.querySelector('img[src]');
      media.classList.add('ut-media-interactive');
      if (img) {
        const caption = media.querySelector('figcaption');
        media.classList.add('ut-media-has-image');
        media.setAttribute('tabindex','0');
        media.setAttribute('role','button');
        media.setAttribute('aria-label','View image' + (caption && caption.textContent.trim() ? ': ' + caption.textContent.trim() : ''));
      } else {
        media.classList.add('ut-media-missing');
        media.removeAttribute('tabindex');
        media.removeAttribute('role');
        media.removeAttribute('aria-label');
      }
    });
    return box.innerHTML;
  }

  let mediaLightboxItems = [];
  let mediaLightboxIndex = 0;

  function ensureMediaLightbox(){
    let box = document.querySelector('.ut-media-lightbox');
    if (box) return box;
    box = document.createElement('div');
    box.className = 'ut-media-lightbox';
    box.setAttribute('aria-hidden','true');
    box.innerHTML = '<div class="ut-media-lightbox-backdrop" data-media-close></div><div class="ut-media-lightbox-panel" role="dialog" aria-modal="true" aria-label="Image preview"><button type="button" class="ut-media-lightbox-close" data-media-close>Close</button><button type="button" class="ut-media-lightbox-nav prev" data-media-prev aria-label="Previous image">‹</button><img alt=""><button type="button" class="ut-media-lightbox-nav next" data-media-next aria-label="Next image">›</button><p></p><div class="ut-media-lightbox-count"></div></div>';
    document.body.appendChild(box);
    box.addEventListener('click', e => {
      if (e.target.closest('[data-media-close]')) closeMediaLightbox();
      if (e.target.closest('[data-media-prev]')) showMediaLightbox(mediaLightboxIndex - 1);
      if (e.target.closest('[data-media-next]')) showMediaLightbox(mediaLightboxIndex + 1);
    });
    let touchStart = null;
    box.addEventListener('touchstart', e => { touchStart = e.touches[0]?.clientX ?? null; }, { passive:true });
    box.addEventListener('touchend', e => {
      if (touchStart === null) return;
      const end = e.changedTouches[0]?.clientX ?? touchStart;
      const delta = end - touchStart;
      if (Math.abs(delta) > 44) showMediaLightbox(mediaLightboxIndex + (delta < 0 ? 1 : -1));
      touchStart = null;
    }, { passive:true });
    document.addEventListener('keydown', e => {
      if (!box.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeMediaLightbox();
      if (e.key === 'ArrowLeft') showMediaLightbox(mediaLightboxIndex - 1);
      if (e.key === 'ArrowRight') showMediaLightbox(mediaLightboxIndex + 1);
    });
    return box;
  }

  function mediaInfo(media){
    const img = media && media.querySelector('img[src]');
    if (!img) return null;
    const captionText = (media.querySelector('figcaption')?.textContent || img.alt || '').replace(/\s+/g,' ').trim();
    return {
      src: img.currentSrc || img.src || img.getAttribute('src'),
      alt: img.alt || captionText || 'Image preview',
      caption: captionText
    };
  }

  function showMediaLightbox(index){
    if (!mediaLightboxItems.length) return;
    mediaLightboxIndex = (index + mediaLightboxItems.length) % mediaLightboxItems.length;
    const item = mediaLightboxItems[mediaLightboxIndex];
    const box = ensureMediaLightbox();
    const preview = box.querySelector('img');
    const caption = box.querySelector('p');
    const count = box.querySelector('.ut-media-lightbox-count');
    const prev = box.querySelector('[data-media-prev]');
    const next = box.querySelector('[data-media-next]');
    preview.src = item.src;
    preview.alt = item.alt;
    caption.textContent = item.caption;
    caption.style.display = item.caption ? 'block' : 'none';
    count.textContent = mediaLightboxItems.length > 1 ? (mediaLightboxIndex + 1) + ' / ' + mediaLightboxItems.length : '';
    if (prev) prev.style.display = mediaLightboxItems.length > 1 ? 'grid' : 'none';
    if (next) next.style.display = mediaLightboxItems.length > 1 ? 'grid' : 'none';
  }

  function closeMediaLightbox(){
    const box = document.querySelector('.ut-media-lightbox');
    if (!box) return;
    box.classList.remove('is-open');
    box.setAttribute('aria-hidden','true');
    document.body.classList.remove('ut-media-lightbox-open');
  }

  function openMediaLightbox(media){
    const page = media.closest('.ut-page') || document;
    const medias = Array.from(page.querySelectorAll('.ut-media-has-image, figure.ut-media-has-image'));
    mediaLightboxItems = medias.map(mediaInfo).filter(Boolean);
    const index = Math.max(0, medias.indexOf(media));
    if (!mediaLightboxItems.length) return;
    const box = ensureMediaLightbox();
    box.classList.add('is-open');
    box.setAttribute('aria-hidden','false');
    document.body.classList.add('ut-media-lightbox-open');
    showMediaLightbox(index);
    const close = box.querySelector('.ut-media-lightbox-close');
    if (close) close.focus({ preventScroll: true });
  }

  function bindMediaViewer(scope){
    scope.querySelectorAll('.ut-media-has-image, figure.ut-media-has-image').forEach(media => {
      if (media.dataset.mediaViewerBound === 'true') return;
      media.dataset.mediaViewerBound = 'true';
      media.addEventListener('click', e => {
        if (e.target.closest('a,button')) return;
        openMediaLightbox(media);
      });
      media.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openMediaLightbox(media);
        }
      });
    });
  }
  function detailIdToDomId(id){ const p=byId.get(id); return p && p.legacyId ? p.legacyId : 'pg-'+id; }
  function openPageId(p){ return (p.legacyId||'').replace(/^pg-/,p.id); }
  function renderCard(p){ const sum=pageSummary(p); return `<button type="button" class="ut-card" data-open-page="${esc(openPageId(p))}" data-category="${esc(p.category)}"><div class="ut-card-top"><div class="ut-card-icon">${iconFor(p)}</div><div><h3>${esc(p.title)}</h3><p>${esc(sum)}${sum.length>=150?'…':''}</p></div></div><div class="ut-tags">${(p.tags||[]).map(t=>`<span class="ut-tag">${esc(t)}</span>`).join('')}<span class="ut-tag">${esc(p.category)}</span></div></button>`; }
  function renderCleanParent(){ const cats=['All',...Array.from(new Set(pages.map(p=>p.category)))]; return `<article class="ut-page shell-matched"><div class="ut-shell"><section class="ut-hero"><div><div class="ut-kicker">Progression Control Board</div><h1 class="ut-title">Unlocks & Tasks</h1><p class="ut-lead">Access chains, quest gates, Olympus tasks, Otherworld progression, Darkness unlocks, and daily progression checks. This section is generated from one clean data source and one clean renderer while the original wiki shell stays intact.</p></div><div class="ut-hero-tools"><div class="ut-statgrid"><div class="ut-stat"><span>Pages</span><b>${pages.length} internal routes</b></div><div class="ut-stat"><span>Shell</span><b>Original Archlight layout</b></div><div class="ut-stat"><span>Status</span><b>Clean module</b></div></div><div class="ut-filterbar" id="utFilters">${cats.map((c,i)=>`<button type="button" data-filter="${esc(c)}" class="${i===0?'active':''}">${esc(c)}</button>`).join('')}</div></div></section><section class="ut-detail-grid" id="utCardGrid">${pages.map(renderCard).join('')}</section></div></article>`; }
  function renderDetail(routeId){
    const p=byId.get(routeId)||pages[0];
    if(!p) return '<div class="ut-page"><div class="ut-empty">No Unlocks & Tasks pages were loaded.</div></div>';
    const sections=p.sections||[];
    const stats=usefulStats(p, sections);
    return `<article class="ut-page shell-matched"><div class="ut-shell"><section class="ut-hero"><div><div class="ut-kicker">${esc(p.category)}</div><h1 class="ut-title">${esc(p.title)}</h1><p class="ut-lead">${esc(p.lead)}</p></div><div class="ut-hero-tools"><div class="ut-statgrid">${stats.map(s=>`<div class="ut-stat"><span>${esc(s.label)}</span><b>${esc(s.value)}</b></div>`).join('')}</div><div class="ut-toolbar"><button class="ut-action primary" data-route="progression-gates">Back to Unlocks & Tasks</button><span class="ut-chip">${sections.length} sections</span></div></div></section><div class="ut-board"><main class="ut-main">${sections.map((s,i)=>renderSection(s,i)).join('')}</main><aside class="ut-side"><div class="ut-side-card"><h3>On this page</h3><p>Jump to the section you need. The active row follows your scroll.</p><div class="ut-section-nav">${sections.map((s,i)=>`<button type="button" data-section-target="${esc(s.id)}"><b>${String(i+1).padStart(2,'0')}</b><span>${esc(s.title)}</span></button>`).join('')}</div></div></aside></div></div></article>`;
  }
  function renderSection(s,i){
    const label = s.label && String(s.label).toLowerCase() !== 'chapter' ? `<small>${esc(s.label)}</small>` : '';
    return `<section class="ut-panel ut-section" id="${esc(s.id)}" data-ut-section><div class="ut-section-head"><div class="ut-num">${String(i+1).padStart(2,'0')}</div><div class="ut-section-titleblock"><h2>${esc(String(s.title || '').replace(/=+$/,'').trim())}</h2>${label}</div></div><div class="ut-body">${normalizeSectionHtml(s.html)}</div></section>`;
  }
  function updateActiveToc(scope, id){
    if(!id) return;
    scope.querySelectorAll('[data-section-target]').forEach(b=>{
      const active=b.dataset.sectionTarget===id;
      b.classList.toggle('active', active);
      if(active) b.setAttribute('aria-current','true'); else b.removeAttribute('aria-current');
    });
  }
  function bindSectionSpy(scope){
    const buttons=[...scope.querySelectorAll('[data-section-target]')];
    const sections=buttons.map(b=>document.getElementById(b.dataset.sectionTarget)).filter(Boolean);
    if(!sections.length) return;
    updateActiveToc(scope, sections[0].id);
    if(!('IntersectionObserver' in window)) return;
    const visible=new Map();
    const pick=()=>{
      let best=sections[0];
      let bestTop=Infinity;
      sections.forEach(section=>{
        const rect=section.getBoundingClientRect();
        const distance=Math.abs(rect.top-120);
        if(rect.bottom>100 && rect.top < window.innerHeight*.72 && distance<bestTop){ best=section; bestTop=distance; }
      });
      updateActiveToc(scope,best.id);
    };
    const observer=new IntersectionObserver(()=>requestAnimationFrame(pick), {root:null, rootMargin:'-92px 0px -58% 0px', threshold:[0,.18,.35,.6]});
    sections.forEach(s=>observer.observe(s));
    window.addEventListener('scroll', pick, {passive:true});
  }
  function bind(scope=document){
    scope.querySelectorAll('[data-open-page]').forEach(btn=>btn.addEventListener('click',()=>window.go(btn.dataset.openPage)));
    scope.querySelectorAll('[data-route]').forEach(btn=>btn.addEventListener('click',()=>window.go(btn.dataset.route)));
    scope.querySelectorAll('[data-route-link]').forEach(btn=>btn.addEventListener('click',e=>{ e.preventDefault(); const target=btn.dataset.routeLink || btn.getAttribute('href') || ''; if(target) window.go(String(target).replace(/^#/,'')); }));
    scope.querySelectorAll('[data-section-target]').forEach(btn=>btn.addEventListener('click',()=>{ const el=document.getElementById(btn.dataset.sectionTarget); if(el) el.scrollIntoView({behavior:'smooth',block:'start'}); updateActiveToc(scope, btn.dataset.sectionTarget); }));
    const filters=scope.querySelector('#utFilters'); if(filters){ filters.addEventListener('click',e=>{ const b=e.target.closest('[data-filter]'); if(!b)return; filters.querySelectorAll('button').forEach(x=>x.classList.remove('active')); b.classList.add('active'); const f=b.dataset.filter; scope.querySelectorAll('[data-open-page]').forEach(card=>{card.style.display=(f==='All'||card.dataset.category===f)?'flex':'none';});}); }
    bindSectionSpy(scope);
    bindMediaViewer(scope);
  }
  window.UnlockTasks={pages,byId,detailIdToDomId,renderCleanParent,renderDetail,bind};
})();
