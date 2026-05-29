(function(){
  function esc(s){
    return String(s||'').replace(/[&<>\"]/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','\"':'&quot;'}[ch];
    });
  }
  function normalizeRouteId(id){
    id=String(id||'home').trim().replace(/^#/,'');
    if(id==='unlock-tasks' || id==='unlocks-tasks' || id==='unlocks-and-tasks') return 'progression-gates';
    if(id.startsWith('pg-')) id=id.slice(3);
    return id || 'home';
  }
  const routes = new Map();
  const aliases = new Map();
  function register(def){
    if(!def || !def.id) return null;
    const id=normalizeRouteId(def.id);
    const route=Object.assign({id, aliases:[], scrollTop:true}, def, {id});
    routes.set(id, route);
    aliases.set(id, id);
    (route.aliases||[]).forEach(function(alias){ aliases.set(normalizeRouteId(alias), id); });
    return route;
  }
  function resolve(id){
    const raw=normalizeRouteId(id);
    return aliases.get(raw) || raw;
  }
  function get(id){
    return routes.get(resolve(id)) || null;
  }
  function has(id){
    return !!get(id);
  }
  function pageTitle(id){
    const resolved=resolve(id);
    const route=routes.get(resolved);
    if(route && route.title) return route.title;
    return (window.ARCHLIGHT_NAV_PAGES||[]).find(function(p){return p.id===resolved;})?.title || String(resolved||'').replace(/^pg-/,'').replace(/-/g,' ');
  }
  function registerStaticPages(){
    document.querySelectorAll('#main > .pg[id^="pg-"]').forEach(function(el){
      const id=normalizeRouteId(el.id);
      if(routes.has(id)) return;
      register({
        id:id,
        title:pageTitle(id),
        type:'static',
        showId:id,
        render:function(){ return true; }
      });
    });
  }
  function renderPlaceholder(host,id){
    host.innerHTML='<div class="wpg aw-page-reset empty-page"><div class="empty-page-card"><div class="empty-page-mark" aria-hidden="true">?</div><div class="empty-page-copy"><div class="empty-breadcrumb" aria-label="Breadcrumb"><span class="crumb">Archlight Wiki</span><span class="sep" aria-hidden="true">›</span><span class="crumb-current">'+esc(pageTitle(id))+'</span></div><h1>Page not found</h1><p>This entry exists as a route, but no verified content has been written for it yet. The wiki is keeping this page empty instead of showing placeholder or unsupported information.</p><div class="empty-page-actions"><button type="button" onclick="go('home')">Return home</button><button type="button" onclick="go('all-pages')">Browse all pages</button></div></div></div></div>';
  }
  window.ArchlightPages={
    register:register,
    registerStaticPages:registerStaticPages,
    resolve:resolve,
    get:get,
    has:has,
    pageTitle:pageTitle,
    renderPlaceholder:renderPlaceholder,
    normalizeRouteId:normalizeRouteId,
    escapeHTML:esc
  };
})();
