(function(){
  function q(s,root=document){return root.querySelector(s)}
  function qa(s,root=document){return Array.from(root.querySelectorAll(s))}
  const Pages = window.ArchlightPages;
  const esc = Pages ? Pages.escapeHTML : function(s){return String(s||'').replace(/[&<>]/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]));};
  const normalizeRouteId = Pages ? Pages.normalizeRouteId : function(id){ id=String(id||'home').trim().replace(/^#/,''); if(id.startsWith('pg-')) id=id.slice(3); return id||'home'; };

  function showPage(id){
    qa('#main > .pg').forEach(pg=>pg.classList.remove('on'));
    const el=q('#pg-'+id);
    if(el) el.classList.add('on');
    setActive(id);
    applyPageControlVisual(id);
    if(window.ArchlightConceptPreview && typeof window.ArchlightConceptPreview.clearFlag==='function') window.ArchlightConceptPreview.clearFlag(id);
  }

  function setActive(id){
    const activeId=normalizeRouteId(id);
    qa('#sidebar .ni[data-p]').forEach(n=>n.classList.toggle('on',normalizeRouteId(n.dataset.p)===activeId));
  }

  function routeTitle(id){
    return Pages ? Pages.pageTitle(id) : ((window.ARCHLIGHT_NAV_PAGES||[]).find(p=>p.id===id)?.title || String(id||'').replace(/^pg-/,'').replace(/-/g,' '));
  }

  function cleanIds(){
    const ids=[];
    (window.UnlockTasks?.pages||[]).forEach(p=>{
      ids.push(p.id);
      ids.push('pg-'+p.id);
      const legacy=(p.legacyId||'').replace(/^pg-/,'');
      if(legacy){ ids.push(legacy); ids.push('pg-'+legacy); }
      (p.aliases||[]).forEach(a=>{ const v=String(a); ids.push(v); ids.push('pg-'+v.replace(/^pg-/,'')); });
    });
    return Array.from(new Set(ids));
  }

  function getUnlockDetail(id){
    if(!window.UnlockTasks || !window.UnlockTasks.byId) return null;
    const raw=String(id||'').replace(/^#/,'');
    return window.UnlockTasks.byId.get(raw) || window.UnlockTasks.byId.get(raw.replace(/^pg-/,''));
  }


  function getOrCreatePageHost(id,className){
    let host=q('#pg-'+id);
    if(!host){
      host=document.createElement('div');
      host.id='pg-'+id;
      host.className=className || 'pg';
      q('#main').appendChild(host);
    }
    return host;
  }


  const REMOVED_LIVE_PAGE_PLACEHOLDERS = {
    classes: {title:'Classes', category:'Class Codex', note:'The live Classes content was removed from the wiki shell and preserved in the design lab for redesign work.', lab:'design-lab/classes-concept.html'},
    promotions: {title:'Promotions', category:'Progression', note:'The live Promotions guide content was removed from the wiki shell and preserved in the design lab archive.'},
    prestige: {title:'Prestige', category:'Progression', note:'The live Prestige guide content was removed from the wiki shell and preserved in the design lab archive.'},
    awakening: {title:'Awakening', category:'Progression', note:'The live Awakening guide content was removed from the wiki shell and preserved in the design lab archive.'},
    addons: {title:'Addons', category:'Tools', note:'The live Addons page content was removed from the wiki shell; addon concept/media files are preserved in the design lab.'}
  };

  function renderRemovedLivePagePlaceholder(id){
    const info=REMOVED_LIVE_PAGE_PLACEHOLDERS[id] || {title:routeTitle(id), category:'Archlight Wiki', note:'This page content is currently being rebuilt.'};
    const host=getOrCreatePageHost(id,'pg removed-live-placeholder-page');
    host.innerHTML=`<div class="wpg removed-live-placeholder">
      <div class="phd">
        <div class="pbc">${esc(info.category)}</div>
        <h1 class="ptt">${esc(info.title)}</h1>
        <p class="pld">This sidebar entry is intentionally kept visible, but the old live page content has been removed while the page is redesigned cleanly.</p>
      </div>
      <div class="ibox">
        <h4>Content Removed From Live Wiki</h4>
        <p>${esc(info.note)}</p>
        ${info.lab ? `<p class="removed-live-lab-note">Design lab copy: <code>${esc(info.lab)}</code></p>` : ''}
      </div>
    </div>`;
    return true;
  }


  const PAGE_CONTROL_KEY = 'archlight_page_control_v1';
  function readPageControls(){
    try{
      const raw=JSON.parse(localStorage.getItem(PAGE_CONTROL_KEY)||'{}');
      return Object.assign({locked:{}, featureMode:'recent', manualFeatured:'', showFeatured:true}, raw||{});
    }catch(e){ return {locked:{}, featureMode:'recent', manualFeatured:'', showFeatured:true}; }
  }
  function writePageControls(data){
    try{ localStorage.setItem(PAGE_CONTROL_KEY, JSON.stringify(Object.assign({locked:{}, featureMode:'recent', manualFeatured:'', showFeatured:true}, data||{}))); }catch(e){}
  }
  function pageRowsForControls(){
    const rows=[...(window.ARCHLIGHT_NAV_PAGES||[])];
    (window.UnlockTasks?.pages||[]).forEach(p=>rows.push({id:p.id,title:p.title,cat:'Unlocks & Tasks',icon:'↬'}));
    const seen=new Set();
    return rows.filter(r=>r&&r.id&&!seen.has(normalizeRouteId(r.id))&&(seen.add(normalizeRouteId(r.id)),true));
  }
  function titleToPageId(title){
    const text=String(title||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
    if(!text) return '';
    if(/patch|changelog|updates archive|update entry/.test(text)) return 'updates';
    if(/home announcement|home alert|homepage|home/.test(text)) return 'home';
    if(/worlds navbar|world status/.test(text)) return 'home';
    if(/tip|did you know/.test(text)) return 'home';
    const rows=pageRowsForControls();
    let exact=rows.find(r=>String(r.title||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()===text);
    if(exact) return exact.id;
    let soft=rows.find(r=>{
      const t=String(r.title||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
      return t && (text.includes(t) || t.includes(text));
    });
    return soft ? soft.id : '';
  }
  function recentFeaturedPageInfo(){
    try{
      const rows=JSON.parse(localStorage.getItem('archlight_live_activity_v2')||'[]');
      for(const item of Array.isArray(rows)?rows:[]){
        const id=titleToPageId(item && item.page);
        if(id) return {id:id,user:item.user||'Archlight Team',time:item.time||'',action:item.action||'updated'};
      }
    }catch(e){}
    return null;
  }
  function getFeaturedPage(){
    const controls=readPageControls();
    if(controls.showFeatured===false || controls.featureMode==='off') return null;
    const recent=recentFeaturedPageInfo();
    const id=controls.featureMode==='manual' ? controls.manualFeatured : ((recent&&recent.id) || controls.manualFeatured);
    if(!id) return null;
    const page=pageRowsForControls().find(p=>normalizeRouteId(p.id)===normalizeRouteId(id));
    if(!page) return null;
    const isRecent=recent && normalizeRouteId(recent.id)===normalizeRouteId(page.id);
    return Object.assign({}, page, {featuredUser:isRecent?recent.user:'Admin', featuredTime:isRecent?recent.time:'Pinned manually', featuredAction:isRecent?recent.action:'featured'});
  }
  function lockInfoFor(id){
    const controls=readPageControls();
    const key=normalizeRouteId(id);
    return controls.locked && controls.locked[key] || null;
  }
  function applyPageControlVisual(id){
    const activeId=normalizeRouteId(id);
    qa('.page-lock-banner').forEach(el=>el.remove());
    qa('#main > .pg').forEach(pg=>pg.classList.remove('is-page-locked'));
    const info=lockInfoFor(activeId);
    const host=q('#pg-'+activeId);
    if(!info || !info.locked || !host) return;
    host.classList.add('is-page-locked');
    const banner=document.createElement('div');
    banner.className='page-lock-banner';
    banner.innerHTML='<div class="plb-icon">🔒</div><div><b>Locked Page</b><span>This page is protected from quick edits'+(info.reason?' · '+esc(info.reason):'')+'</span></div>';
    host.prepend(banner);
  }
  window.ArchlightPageControls={read:readPageControls,write:writePageControls,pages:pageRowsForControls,featured:getFeaturedPage,apply:applyPageControlVisual,normalize:normalizeRouteId};

  function renderSidebar(){
    const host=q('#sidebar-groups'); if(!host) return;
    const staffRoles=['wiki_admin','admin','community_manager','editor'];
    const groups=(window.ARCHLIGHT_SIDEBAR_GROUPS||[]).filter(group=>group && group.items && group.items.length && (!group.adminOnly || staffRoles.includes(window.currentRole)));
    const controls=readPageControls();
    const featured=getFeaturedPage();
    const featuredHtml=featured ? `<div class="nav-featured-page" data-featured-page>
      <div class="nav-featured-kicker">Recently Updated</div>
      <div class="ni ni-featured" role="button" tabindex="0" data-p="${esc(featured.id)}">
        <span class="ic" aria-hidden="true">${featured.icon||'✦'}</span>
        <span class="nav-text"><b>${esc(featured.title)}</b><em>Updated by ${esc(featured.featuredUser||'Archlight Team')}${featured.featuredTime?' · '+esc(featured.featuredTime):''}</em></span>
      </div>
    </div>` : '';
    host.innerHTML=featuredHtml+groups.map(group=>`
      <div class="nav-grp generated-sidebar-group" data-sidebar-group="${esc(group.label)}">
        <div class="nav-grp-lbl">${esc(group.label)}</div>
        ${group.items.map(p=>{ const key=normalizeRouteId(p.id); const locked=controls.locked && controls.locked[key] && controls.locked[key].locked && controls.locked[key].sidebar!==false; return `
          <div class="ni ${locked?'is-sidebar-locked':''}" role="button" tabindex="0" data-p="${esc(p.id)}">
            <span class="ic" aria-hidden="true">${p.icon||'✦'}</span>
            <span class="nav-text">${esc(p.title)}${locked?'<small class="nav-lock-mark">Locked</small>':''}</span>
          </div>`; }).join('')}
      </div>`).join('');
    if(!host.__sidebarDelegated){
      host.__sidebarDelegated=true;
      host.addEventListener('click',function(e){
        const item=e.target.closest('.ni[data-p]');
        if(!item || !host.contains(item)) return;
        e.preventDefault();
        go(item.dataset.p);
      });
      host.addEventListener('keydown',function(e){
        if(e.key!=='Enter' && e.key!==' ') return;
        const item=e.target.closest('.ni[data-p]');
        if(!item || !host.contains(item)) return;
        e.preventDefault();
        go(item.dataset.p);
      });
    }
  }

  window.ArchlightRenderSidebar = renderSidebar;

  function getRouteTargetFromElement(el){
    if(!el) return '';
    return el.getAttribute('data-utk-open')
      || el.getAttribute('data-open-page')
      || el.getAttribute('data-utk-page')
      || el.getAttribute('data-route')
      || el.getAttribute('data-route-link')
      || el.getAttribute('href')
      || '';
  }

  const ROUTE_CLICK_SELECTOR = '[data-utk-open], [data-open-page], [data-route], [data-route-link], a[href^="#"], .utk81-card[data-utk-page], .utk81-ledger a[data-utk-page]';

  function bindUnlockParent(root){
    root.querySelectorAll(ROUTE_CLICK_SELECTOR).forEach(el=>{
      if(el.__cleanBound) return;
      el.__cleanBound=true;
      el.addEventListener('click',e=>{
        const interactive=e.target.closest('button,a,input,textarea,select,label');
        if(interactive && interactive!==el && !interactive.hasAttribute('data-utk-open') && !interactive.hasAttribute('data-open-page') && !interactive.hasAttribute('data-route') && !interactive.hasAttribute('data-route-link')) return;
        const target=getRouteTargetFromElement(el);
        if(!target) return;
        e.preventDefault();
        go(target);
      });
      if(el.matches('[role="button"], .utk81-card')){
        el.addEventListener('keydown',e=>{
          if(e.key!=='Enter' && e.key!==' ') return;
          const target=getRouteTargetFromElement(el);
          if(!target) return;
          e.preventDefault();
          go(target);
        });
      }
    });
    root.querySelectorAll('a[href^="#"]').forEach(a=>{
      if(a.__cleanAnchorBound) return;
      a.__cleanAnchorBound=true;
      a.addEventListener('click',e=>{
        const raw=a.getAttribute('href') || '';
        const t=normalizeRouteId(raw);
        if(cleanIds().includes(raw.replace(/^#/,''))||cleanIds().includes(t)||t==='progression-gates'||q('#pg-'+t)){
          e.preventDefault();
          go(t);
        }
      });
    });
  }

  function registerCoreRoutes(){
    if(!Pages) return;
    Pages.registerStaticPages();

    Pages.register({
      id:'contributors',
      title:'Contributors',
      showId:'contribute',
      hash:'contributors',
      render:function(){
        if(window.ContributePage && typeof window.ContributePage.render==='function') window.ContributePage.render();
        if(window.Contributors && typeof window.Contributors.render==='function') window.Contributors.render();
        return true;
      },
      afterShow:function(){
        setTimeout(function(){ var sec=q('#contrib-sec'); if(sec) sec.scrollIntoView({behavior:'smooth', block:'start'}); },40);
      },
      scrollTop:false
    });

    Pages.register({
      id:'contribute',
      title:'Contribute',
      showId:'contribute',
      render:function(){
        if(window.ContributePage && typeof window.ContributePage.render==='function') window.ContributePage.render();
        return !!q('#pg-contribute');
      }
    });

    Pages.register({
      id:'progression-gates',
      title:'Unlocks & Tasks',
      aliases:['unlock-tasks','unlocks-tasks','unlocks-and-tasks'],
      showId:'progression-gates',
      render:function(){
        const host=q('#pg-progression-gates');
        if(!host) return false;
        bindUnlockParent(host);
        if(window.UnlocksBoard && typeof window.UnlocksBoard.init==='function') window.UnlocksBoard.init(host);
        return true;
      }
    });

    (window.UnlockTasks?.pages||[]).forEach(function(detail){
      const domId=(detail.legacyId||('pg-'+detail.id)).replace(/^pg-/,'');
      Pages.register({
        id:detail.id,
        title:detail.title,
        aliases:[domId].concat(detail.aliases||[]),
        showId:domId,
        render:function(){
          const host=getOrCreatePageHost(domId,'pg clean-unlock-detail-host');
          host.setAttribute('data-clean-unlock-host','true');
          host.setAttribute('data-utk-detail-page',detail.id);
          host.innerHTML=window.UnlockTasks.renderDetail(detail.id);
          window.UnlockTasks.bind(host);
          return true;
        }
      });
    });


    if(window.ArchlightConceptPreview && typeof window.ArchlightConceptPreview.register==='function'){
      window.ArchlightConceptPreview.register();
    }

    ['classes','promotions','prestige','awakening','addons'].filter(function(id){
      return !(window.ArchlightConceptPreview && window.ArchlightConceptPreview.find && window.ArchlightConceptPreview.find(id));
    }).forEach(function(id){
      const title=REMOVED_LIVE_PAGE_PLACEHOLDERS[id]?.title || routeTitle(id);
      Pages.register({
        id:id,
        title:title,
        showId:id,
        render:function(){ return renderRemovedLivePagePlaceholder(id); }
      });
    });

    Pages.register({
      id:'all-pages',
      title:'All Pages',
      aliases:['pages','page-index','wiki-index'],
      showId:'all-pages',
      render:function(){
        if(window.AllPagesDirectory && typeof window.AllPagesDirectory.render==='function') return window.AllPagesDirectory.render();
        return !!q('#pg-all-pages');
      }
    });

    Pages.register({
      id:'admin',
      title:'Admin Panel',
      aliases:['admin-tools','dashboard'],
      showId:'admin',
      render:function(){
        if(window.ArchlightAdminPanel && typeof window.ArchlightAdminPanel.render==='function') return window.ArchlightAdminPanel.render();
        const host=getOrCreatePageHost('admin','pg');
        host.innerHTML='<div class="wpg"><div class="phd"><div class="pbc">Admin</div><h1 class="ptt">Admin Panel</h1><p class="pld">Admin tools are not loaded in this build.</p></div></div>';
        return true;
      }
    });

    Pages.register({
      id:'updates',
      title:'Updates & Patch Notes',
      showId:'updates',
      render:function(){
        if(window.UpdatesPage && typeof window.UpdatesPage.render==='function') window.UpdatesPage.render();
        return !!q('#pg-updates');
      }
    });
  }

  function splitRouteTarget(raw){
    if(window.ArchlightDeepLinks && typeof window.ArchlightDeepLinks.parseHash==='function'){
      return window.ArchlightDeepLinks.parseHash('#'+String(raw||'home').replace(/^#/,''));
    }
    const text=String(raw||'home').replace(/^#/,'');
    const slash=text.indexOf('/');
    if(slash===-1) return {page:normalizeRouteId(text), section:''};
    return {page:normalizeRouteId(text.slice(0,slash)), section:decodeURIComponent(text.slice(slash+1)||'')};
  }

  function setRouteHash(pageId, sectionId, mode){
    const hash='#'+normalizeRouteId(pageId)+(sectionId?'/'+encodeURIComponent(sectionId):'');
    if(location.hash===hash) return;
    if(mode==='replace') history.replaceState(null,'',hash);
    else location.hash=hash;
  }

  function afterRouteShown(showId, sectionId){
    if(window.ArchlightDeepLinks && typeof window.ArchlightDeepLinks.afterRoute==='function'){
      window.ArchlightDeepLinks.afterRoute(showId, sectionId || '');
    }
  }

  function runRoute(id){
    const parsed=splitRouteTarget(id);
    id=normalizeRouteId(parsed.page);
    const sectionId=parsed.section || '';
    const route=Pages && Pages.get(id);
    if(route){
      const ok=typeof route.render==='function' ? route.render(id) : true;
      const showId=route.showId || route.id;
      if(ok && q('#pg-'+showId)){
        showPage(showId);
        setRouteHash(route.hash || route.id, sectionId, 'replace');
        if(route.scrollTop!==false && !sectionId) window.scrollTo({top:0,behavior:'smooth'});
        if(typeof route.afterShow==='function') route.afterShow();
        afterRouteShown(route.hash || route.id, sectionId);
        return;
      }
    }

    const directId=normalizeRouteId(id);
    if(q('#pg-'+directId)){
      showPage(directId);
      setRouteHash(directId, sectionId, 'replace');
      if(sectionId) afterRouteShown(directId, sectionId);
      return;
    }
    renderFallback(directId);
    setRouteHash(directId, '', 'replace');
  }

  window.go=function(id){ runRoute(id); };

  function bindGlobalCleanRouteClicks(){
    if(document.__archlightCleanRouteDelegated) return;
    document.__archlightCleanRouteDelegated=true;
    document.addEventListener('click',function(e){
      if(e.target.closest('.utk81-filter, [data-utk-filter]')) return;
      const trigger=e.target.closest(ROUTE_CLICK_SELECTOR);
      if(!trigger) return;
      const inUnlockParent=trigger.closest && trigger.closest('#pg-progression-gates');
      const raw=getRouteTargetFromElement(trigger);
      const id=normalizeRouteId(raw);
      if(getUnlockDetail(id) || id==='progression-gates' || (inUnlockParent && raw)){
        e.preventDefault();
        e.stopPropagation();
        go(id);
      }
    }, true);
  }

  function renderFallback(id){
    const host=getOrCreatePageHost('clean-placeholder','pg');
    if(Pages) Pages.renderPlaceholder(host,id);
    else host.innerHTML=`<div class="wpg aw-page-reset empty-page"><div class="empty-page-card"><div class="empty-page-mark" aria-hidden="true">?</div><div class="empty-page-copy"><div class="empty-breadcrumb" aria-label="Breadcrumb"><span class="crumb">Archlight Wiki</span><span class="sep" aria-hidden="true">›</span><span class="crumb-current">${esc(routeTitle(id))}</span></div><h1>Page not found</h1><p>This entry exists as a route, but no verified content has been written for it yet. The wiki is keeping this page empty instead of showing placeholder or unsupported information.</p><div class="empty-page-actions"><button type="button" onclick="go('home')">Return home</button><button type="button" onclick="go('all-pages')">Browse all pages</button></div></div></div></div>`;
    showPage('clean-placeholder');
    setActive(id);
    applyPageControlVisual(id);
  }

  function bindHomeQuickLinks(){
    qa('[onclick]').forEach(el=>{
      const val=el.getAttribute('onclick')||'';
      const m=val.match(/go\('([^']+)'\)/);
      if(m){
        el.removeAttribute('onclick');
        el.addEventListener('click',()=>go(m[1]));
      }
    });
  }

  function bindSearch(){
    const input=q('#sqi'), drop=q('#sdrop');
    if(!input||!drop) return;
    const rows=()=>[...(window.ARCHLIGHT_NAV_PAGES||[]), ...(window.UnlockTasks?.pages||[]).map(p=>({id:(p.legacyId||'').replace(/^pg-/,p.id), title:p.title, cat:'Unlocks & Tasks', icon:'✦'}))];
    input.addEventListener('input',()=>{
      const term=input.value.trim().toLowerCase();
      if(!term){drop.classList.remove('open');drop.innerHTML='';return;}
      const found=rows().filter(r=>(r.title+' '+r.cat).toLowerCase().includes(term)).slice(0,8);
      drop.innerHTML=found.map(r=>`<div class="sd-row" data-id="${esc(r.id)}"><span>${r.icon||'✦'}</span><div><div class="sd-cat">${esc(r.cat)}</div><div class="sd-nm">${esc(r.title)}</div></div></div>`).join('');
      drop.classList.toggle('open',found.length>0);
    });
    drop.addEventListener('click',e=>{
      const row=e.target.closest('[data-id]');
      if(row){ input.value=''; drop.classList.remove('open'); go(row.dataset.id); }
    });
  }

  function drawLogo(id,size){
    if(window.ArchlightLogo && typeof window.ArchlightLogo.render==='function'){
      window.ArchlightLogo.render(id,size);
      return;
    }
    if(typeof window.renderLogo==='function') window.renderLogo(id,size);
  }

  window.goUpdates=function(){go('updates')};
  window.toggleMobSidebar=function(){document.body.classList.toggle('sidebar-open')};
  window.openLoginModal=function(){alert('Login tools are not available in this build yet.')};
  window.doLogoutAll=function(){};
  window.toggleDrawer=function(e){
    if(e) e.preventDefault();
    if(window.ArchlightActivity && typeof window.ArchlightActivity.toggle==='function') window.ArchlightActivity.toggle(e);
  };

  document.addEventListener('DOMContentLoaded',()=>{
    registerCoreRoutes();
    renderSidebar();
    bindGlobalCleanRouteClicks();
    bindHomeQuickLinks();
    bindSearch();
    drawLogo('logo-canvas',42);
    drawLogo('hero-logo-cv',108);
    const initial=(location.hash||'#home').slice(1);
    go(initial||'home');
    if(window.Contributors && typeof window.Contributors.render==='function') window.Contributors.render();
  });
})();
