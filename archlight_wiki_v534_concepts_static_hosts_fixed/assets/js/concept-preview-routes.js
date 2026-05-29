(function(){
  function normalize(id){
    if(window.ArchlightPages && typeof window.ArchlightPages.normalizeRouteId==='function') return window.ArchlightPages.normalizeRouteId(id);
    return String(id||'home').trim().replace(/^#/,'').replace(/^pg-/,'') || 'home';
  }
  function esc(value){
    return String(value == null ? '' : value).replace(/[&<>"']/g, function(ch){
      return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch] || ch;
    });
  }
  function routeById(id){
    var key = normalize(id);
    return (window.ARCHLIGHT_CONCEPT_ROUTES || []).find(function(route){
      if(normalize(route.id) === key) return true;
      return (route.aliases || []).some(function(alias){ return normalize(alias) === key; });
    }) || null;
  }
  function ensureHost(route){
    var key = normalize(route.id);
    var host = document.getElementById('pg-' + key);
    if(!host){
      host = document.createElement('div');
      host.id = 'pg-' + key;
      var main = document.getElementById('main') || document.querySelector('main');
      if(main) main.appendChild(host);
    }
    host.className = 'pg concept-preview-route concept-static-route';
    host.setAttribute('data-concept-preview-route','true');
    host.setAttribute('data-concept-static-host','true');
    host.setAttribute('data-concept-src', route.src || '');
    return host;
  }
  function setFrameHeight(frame){
    if(!frame) return;
    try{
      var doc = frame.contentDocument || frame.contentWindow.document;
      if(!doc || !doc.body) return;
      var h = Math.max(
        doc.body.scrollHeight || 0,
        doc.documentElement ? doc.documentElement.scrollHeight || 0 : 0,
        window.innerHeight - 54
      );
      frame.style.height = h + 'px';
    }catch(e){}
  }
  function bindFrame(frame){
    if(!frame || frame.__conceptFrameBound) return;
    frame.__conceptFrameBound = true;
    frame.addEventListener('load', function(){
      setFrameHeight(frame);
      setTimeout(function(){ setFrameHeight(frame); }, 250);
      setTimeout(function(){ setFrameHeight(frame); }, 1000);
    });
  }
  function renderConceptRoute(route){
    if(!route || !route.id || !route.src) return false;
    var host = ensureHost(route);
    var current = host.querySelector('iframe.concept-preview-frame');
    if(!current || current.getAttribute('src') !== route.src){
      host.innerHTML = '<div class="concept-preview-shell"><iframe class="concept-preview-frame" title="'+esc(route.title || route.id)+'" src="'+esc(route.src)+'" loading="eager" data-concept-frame="true"></iframe></div>';
      current = host.querySelector('iframe.concept-preview-frame');
    }
    bindFrame(current);
    document.body.classList.add('concept-preview-active');
    return true;
  }
  function installStaticHosts(){
    (window.ARCHLIGHT_CONCEPT_ROUTES || []).forEach(function(route){
      if(!route || !route.id || !route.src) return;
      var host = ensureHost(route);
      var frame = host.querySelector('iframe.concept-preview-frame');
      if(!frame || frame.getAttribute('src') !== route.src){
        host.innerHTML = '<div class="concept-preview-shell"><iframe class="concept-preview-frame" title="'+esc(route.title || route.id)+'" src="'+esc(route.src)+'" loading="eager" data-concept-frame="true"></iframe></div>';
        frame = host.querySelector('iframe.concept-preview-frame');
      }
      bindFrame(frame);
    });
  }
  function clearConceptPreviewFlag(activeId){
    if(!routeById(activeId)) document.body.classList.remove('concept-preview-active');
  }
  function registerConceptRoutes(){
    installStaticHosts();
    if(!window.ArchlightPages || typeof window.ArchlightPages.register !== 'function') return;
    (window.ARCHLIGHT_CONCEPT_ROUTES || []).forEach(function(route){
      window.ArchlightPages.register({
        id: route.id,
        title: route.title || route.id,
        aliases: route.aliases || [],
        showId: route.id,
        render: function(){ return renderConceptRoute(route); }
      });
    });
  }
  window.ArchlightConceptPreview = {
    register: registerConceptRoutes,
    render: renderConceptRoute,
    find: routeById,
    installStaticHosts: installStaticHosts,
    clearFlag: clearConceptPreviewFlag
  };
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', installStaticHosts, {once:true});
  else installStaticHosts();
})();
