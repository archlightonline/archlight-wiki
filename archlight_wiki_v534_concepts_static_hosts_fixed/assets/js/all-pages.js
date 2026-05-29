(function(){
  function q(sel, root){ return (root || document).querySelector(sel); }
  function qa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch] || ch;
    });
  }
  function normalize(id){
    if(window.ArchlightPages && typeof window.ArchlightPages.normalizeRouteId === 'function') return window.ArchlightPages.normalizeRouteId(id);
    return String(id || 'home').trim().replace(/^#/,'').replace(/^pg-/,'') || 'home';
  }
  function titleFromId(id){
    if(window.ArchlightPages && typeof window.ArchlightPages.pageTitle === 'function') return window.ArchlightPages.pageTitle(id);
    return normalize(id).split('-').map(function(part){ return part.charAt(0).toUpperCase()+part.slice(1); }).join(' ');
  }
  function iconFor(cat){
    return ({Basics:'◆',Progression:'↟',Classes:'⚔',Power:'✦',Equipment:'◈',Content:'✧',Activities:'✧',Professions:'⚒',Guilds:'♜',Rewards:'◇',Tools:'✶',Updates:'☷',Index:'☰','Unlocks & Tasks':'↬','Hidden Pages':'◇','Static Pages':'□'})[cat] || '✦';
  }
  function collectPages(){
    var sidebar = window.ARCHLIGHT_NAV_PAGES || [];
    var sidebarIds = new Set(sidebar.map(function(p){ return normalize(p.id); }));
    var rows = [];
    function add(page, source){
      var id = normalize(page && page.id);
      if(!id || id === 'clean-placeholder') return;
      var existing = rows.find(function(r){ return r.id === id; });
      var cat = page.cat || page.category || source || 'Hidden Pages';
      if(existing){
        if(!existing.sidebar && sidebarIds.has(id)) existing.sidebar = true;
        if(existing.cat === 'Hidden Pages' && cat) existing.cat = cat;
        return;
      }
      rows.push({
        id:id,
        title:page.title || titleFromId(id),
        cat:cat,
        icon:page.icon || iconFor(cat),
        sidebar:sidebarIds.has(id),
        source:source || cat,
        available:!!q('#pg-'+id) || !!(window.ArchlightPages && window.ArchlightPages.has && window.ArchlightPages.has(id))
      });
    }
    sidebar.forEach(function(p){ add(p, p.cat || 'Sidebar'); });
    (window.UnlockTasks && window.UnlockTasks.pages || []).forEach(function(p){
      add({ id:p.id, title:p.title, cat:'Unlocks & Tasks', icon:'↬' }, 'Unlocks & Tasks');
      if(p.legacyId) add({ id:p.legacyId, title:p.title, cat:'Unlocks & Tasks', icon:'↬' }, 'Unlocks & Tasks');
    });
    qa('#main > .pg[id^="pg-"]').forEach(function(el){
      var id = normalize(el.id);
      if(id === 'all-pages') return;
      add({ id:id, title:titleFromId(id), cat: sidebarIds.has(id) ? 'Sidebar' : 'Static Pages', icon: sidebarIds.has(id) ? undefined : '□' }, 'Static Pages');
    });
    return rows.sort(function(a,b){
      var ac = String(a.cat).localeCompare(String(b.cat));
      if(ac) return ac;
      return String(a.title).localeCompare(String(b.title));
    });
  }
  function renderShell(host){
    host.innerHTML = ''+
      '<div class="wpg apx-page" data-apx-page="all-pages">'+
        '<div class="apx-shell">'+
          '<section aria-labelledby="apx-title" class="apx-hero">'+
            '<div class="apx-hero-copy">'+
              '<div class="apx-kicker">Player Codex</div>'+
              '<h1 class="apx-title" id="apx-title">All Pages <span>Complete Wiki Route Directory</span></h1>'+
              '<p class="apx-lead">Browse every player-facing wiki route from one clean index, including pages that are available through route links but not pinned to the sidebar.</p>'+
              '<div aria-hidden="true" class="apx-hero-actions"><span>Search</span><span>Filter</span><span>Open Route</span></div>'+
            '</div>'+
            '<div aria-hidden="true" class="apx-route-orb"><span></span><i></i><b>pg</b></div>'+
          '</section>'+
          '<section aria-label="How to use this directory" class="apx-use">'+
            '<h2>How to use this page</h2>'+
            '<div class="apx-use-grid">'+
              '<div class="apx-use-item"><b>01</b><span>Search by page name, sidebar collection, or exact route id.</span></div>'+
              '<div class="apx-use-item"><b>02</b><span>Use collection filters to separate sidebar pages, unlock pages, and hidden/static routes.</span></div>'+
              '<div class="apx-use-item"><b>03</b><span>Open any card through the normal wiki router, not a separate duplicate page system.</span></div>'+
            '</div>'+
          '</section>'+
          '<section aria-label="All pages filters" class="apx-toolbar">'+
            '<label class="apx-search"><span>⌕</span><input autocomplete="off" id="apx-search" placeholder="Search pages, collections, or pg-route ids…" type="search"/></label>'+
            '<div aria-label="Category filters" class="apx-filter-row" id="apx-filters"></div>'+
            '<div aria-hidden="true" class="apx-meter"></div>'+
          '</section>'+
          '<section aria-live="polite" class="apx-summary" id="apx-summary"></section>'+
          '<section aria-label="All wiki pages panel" class="apx-panel">'+
            '<div class="apx-panel-head"><span>Route Index</span><b id="apx-count-label">LIVE</b></div>'+
            '<section aria-label="All wiki pages" class="apx-grid" id="apx-grid"></section>'+
          '</section>'+
        '</div>'+
      '</div>';
  }
  function render(){
    var host = q('#pg-all-pages');
    if(!host) return false;
    renderShell(host);
    var pages = collectPages();
    var cats = ['All'].concat(Array.from(new Set(pages.map(function(p){ return p.cat; }))));
    var active = 'All';
    var search = '';
    var filters = q('#apx-filters', host);
    var grid = q('#apx-grid', host);
    var summary = q('#apx-summary', host);
    var countLabel = q('#apx-count-label', host);
    var meter = q('.apx-meter', host);
    var input = q('#apx-search', host);
    function drawFilters(){
      filters.innerHTML = cats.map(function(cat){
        return '<button class="apx-filter'+(cat===active?' on':'')+'" type="button" data-apx-cat="'+esc(cat)+'">'+esc(cat)+'</button>';
      }).join('');
    }
    function visibleRows(){
      var term = search.trim().toLowerCase();
      return pages.filter(function(p){
        var inCat = active === 'All' || p.cat === active;
        var text = (p.title+' '+p.cat+' '+p.id+' '+p.source).toLowerCase();
        return inCat && (!term || text.indexOf(term) !== -1);
      });
    }
    function drawSummary(rows){
      var sidebarCount = pages.filter(function(p){ return p.sidebar; }).length;
      var hiddenCount = pages.length - sidebarCount;
      var unlockCount = pages.filter(function(p){ return p.cat === 'Unlocks & Tasks'; }).length;
      summary.innerHTML = ''+
        '<article class="apx-stat"><b>'+pages.length+'</b><span>Total routes</span></article>'+
        '<article class="apx-stat"><b>'+sidebarCount+'</b><span>Sidebar pages</span></article>'+
        '<article class="apx-stat"><b>'+hiddenCount+'</b><span>Extra routes</span></article>'+
        '<article class="apx-stat"><b>'+unlockCount+'</b><span>Unlock pages</span></article>';
      countLabel.textContent = rows.length+' shown';
      if(meter) meter.style.setProperty('--apx-progress', pages.length ? Math.max(4, Math.round(rows.length / pages.length * 100))+'%' : '0%');
    }
    function drawGrid(){
      var rows = visibleRows();
      drawSummary(rows);
      if(!rows.length){
        grid.innerHTML = '<div class="apx-empty">No pages match this search/filter.</div>';
        return;
      }
      grid.innerHTML = rows.map(function(p, i){
        var isConcept = !!(window.ArchlightConceptPreview && window.ArchlightConceptPreview.find && window.ArchlightConceptPreview.find(p.id));
        return '<button class="apx-card" type="button" data-concept-preview="'+(isConcept?'true':'false')+'" data-apx-open="'+esc(p.id)+'">'+
          '<span class="apx-step-num">'+String(i+1).padStart(2,'0')+'</span>'+
          '<span class="apx-card-main">'+
            '<span class="apx-card-top"><span class="apx-ico">'+esc(p.icon || iconFor(p.cat))+'</span><span class="apx-name">'+esc(p.title)+'</span></span>'+
            '<span class="apx-route">#'+esc(p.id)+'</span>'+
            '<span class="apx-connect"><i></i><span>'+esc(p.cat)+'</span><i></i></span>'+
            '<span class="apx-meta"><span class="apx-chip">'+(p.sidebar?'Sidebar':'Route')+'</span><span class="apx-chip hidden">'+esc(isConcept?'Concept Preview · Full width':(p.available?'Available':'Placeholder'))+'</span></span>'+
          '</span>'+
        '</button>';
      }).join('');
    }
    drawFilters();
    drawGrid();
    filters.addEventListener('click', function(e){
      var btn = e.target.closest('[data-apx-cat]');
      if(!btn) return;
      active = btn.getAttribute('data-apx-cat') || 'All';
      drawFilters();
      drawGrid();
    });
    input.addEventListener('input', function(){
      search = input.value || '';
      drawGrid();
    });
    grid.addEventListener('click', function(e){
      var card = e.target.closest('[data-apx-open]');
      if(!card) return;
      var target = card.getAttribute('data-apx-open');
      if(target && typeof window.go === 'function') window.go(target);
      else if(target) location.hash = target;
    });
    return true;
  }
  window.AllPagesDirectory = { render: render, collectPages: collectPages };
})();
