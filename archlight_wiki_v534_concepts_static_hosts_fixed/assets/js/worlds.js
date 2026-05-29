(function(){
  const DEFAULT_WORLDS = [
    {
      id:'abaldar',
      name:'Abaldar',
      online:true,
      status:'online',
      rune:'⚔',
      tagline:'Fresh world · visual cosmetics',
      difference:'Abaldar is mainly for players who want a fresh world without years of accumulated seasonal power. Cosmetics can exist in-game, but they are primarily visual and do not provide bonuses.',
      bestFor:'Players who want a fresh race, cleaner progression, and a world where cosmetic power is mostly removed from the seasonal economy.',
      rules:'Fresh seasonal progression · cosmetic bonuses disabled · heirlooms do not provide bonuses, except Olympus accessories when applicable.',
      chips:['Fresh world','No cosmetic bonuses','Visual cosmetics','Olympus exception']
    },
    {
      id:'legacy',
      name:'Legacy',
      online:false,
      status:'offline',
      rune:'♜',
      tagline:'Merged legacy power world',
      difference:'Legacy is the long-term merged world created from Dracona and other previous worlds. This is where accumulated progress, cosmetics, and heirloom bonuses keep their power identity.',
      bestFor:'Players who value long-term collections, older characters, cosmetic bonuses, heirlooms, and the preserved power from previous worlds.',
      rules:'Merged world history · cosmetics provide bonuses · heirlooms provide bonuses · long-term economy and collection value.',
      chips:['Merged worlds','Cosmetic bonuses','Heirloom bonuses','Long-term power']
    },
    {
      id:'hardcore',
      name:'Hardcore',
      online:false,
      status:'maintenance',
      rune:'☠',
      tagline:'High-risk challenge ruleset',
      difference:'A harsher world identity built around risk, tighter survival decisions, and more punishing progression.',
      bestFor:'Veterans who want pressure, danger, and a more demanding Archlight route.',
      rules:'Challenge ruleset · higher consequence gameplay · not recommended as the first world for casual players.',
      chips:['Hardcore','Risk-focused','Veteran','Punishing']
    }
  ];
  const STORAGE_KEY = 'archlight_clean_world_status';
  const DISPLAY_KEY = 'archlight_world_nav_visible';
  let activeWorldId = null;

  function escapeHtml(value){
    return String(value || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function canonicalWorldIcon(id, value){
    const icons = { abaldar:'⚔', legacy:'♜', hardcore:'☠' };
    const raw = String(value || '').trim();
    if (icons[id]) return icons[id];
    return raw && raw !== '✦' && raw !== '★' && raw !== '*' ? raw : '◆';
  }

  function defaultWorld(id){ return DEFAULT_WORLDS.find(world => world.id === id) || DEFAULT_WORLDS[0]; }

  function normalizeWorld(world){
    const id = String((world && world.id) || (world && world.name) || 'world').toLowerCase().replace(/[^a-z0-9_-]+/g,'-');
    const base = defaultWorld(id) || {};
    const rawStatus = String((world && (world.status || world.state)) || '').toLowerCase();
    const status = ['online','offline','maintenance'].includes(rawStatus) ? rawStatus : ((world && world.online === true) ? 'online' : (base.status || (base.online ? 'online' : 'offline')));
    return Object.assign({}, base, {
      id,
      name: String((world && world.name) || base.name || id || 'World'),
      short: String((world && world.short) || (world && world.name) || base.short || base.name || id || 'World'),
      status,
      online: status === 'online',
      enabled: world && world.enabled === false ? false : true,
      rune: canonicalWorldIcon(id, (world && world.rune) || base.rune),
      tagline: String((world && world.tagline) || base.tagline || 'World ruleset'),
      difference: String((world && world.difference) || base.difference || 'World details are being updated.'),
      bestFor: String((world && world.bestFor) || base.bestFor || 'Players comparing available worlds.'),
      rules: String((world && world.rules) || base.rules || 'Rules are being updated.'),
      chips: Array.isArray(world && world.chips) && world.chips.length ? world.chips : (base.chips || [])
    });
  }

  function defaultMap(){
    return DEFAULT_WORLDS.reduce((acc, world) => {
      acc[world.id] = normalizeWorld(world);
      return acc;
    }, {});
  }

  function readWorlds(){
    const base = defaultMap();
    try{
      const raw = localStorage.getItem(STORAGE_KEY);
      if(raw){
        const parsed = JSON.parse(raw);
        const list = Array.isArray(parsed) ? parsed : Object.keys(parsed || {}).map(id => Object.assign({ id }, parsed[id]));
        const normalized = list.map(normalizeWorld);
        normalized.forEach(world => {
          const merged = Object.assign({}, base[world.id] || {}, world);
          if (world.id === 'abaldar' || world.id === 'legacy') {
            const canonical = defaultWorld(world.id) || {};
            ['tagline','difference','bestFor','rules','chips'].forEach(key => { if (canonical[key] !== undefined) merged[key] = canonical[key]; });
          }
          base[world.id] = merged;
        });
        return normalized.length ? normalized : DEFAULT_WORLDS.map(world => base[world.id] || normalizeWorld(world));
      }
    }catch(e){}
    return DEFAULT_WORLDS.map(world => base[world.id] || normalizeWorld(world));
  }

  function worldPanel(world){
    if(!world) return '';
    const status = normalizeWorld(world).status;
    const state = status === 'maintenance' ? 'MAINTENANCE' : (status === 'online' ? 'LIVE' : 'OFFLINE');
    const stateClass = status === 'maintenance' ? 'is-maintenance' : (status === 'online' ? 'is-live' : 'is-offline');
    return '<div class="wc-detail" role="region" aria-live="polite">'
      + '<div class="wc-detail-top"><span class="wc-detail-rune">'+escapeHtml(world.rune)+'</span><div><strong>'+escapeHtml(world.name)+'</strong><em>'+escapeHtml(world.tagline)+'</em></div><b class="'+stateClass+'">'+state+'</b></div>'
      + '<p class="wc-main-difference"><span>Main difference</span>'+escapeHtml(world.difference)+'</p>'
      + '<div class="wc-detail-grid"><div><span>Best for</span><p>'+escapeHtml(world.bestFor)+'</p></div><div><span>Rules / progression</span><p>'+escapeHtml(world.rules)+'</p></div></div>'
      + '<div class="wc-chip-row">'+(world.chips||[]).map(chip => '<span>'+escapeHtml(chip)+'</span>').join('')+'</div>'
    + '</div>';
  }

  function worldMarkup(){
    const worlds = readWorlds().filter(world => world.enabled !== false);
    const active = worlds.find(world => world.id === activeWorldId) || null;
    const bits = ['<span class="wc-label">Worlds</span>'];
    worlds.forEach(world => {
      const status = normalizeWorld(world).status;
      const cls = status === 'maintenance' ? 'wc-maintenance' : (status === 'online' ? 'wc-online' : 'wc-offline');
      const badge = status === 'maintenance' ? 'MAINT' : (status === 'online' ? 'LIVE' : 'OFFLINE');
      const selected = activeWorldId === world.id;
      bits.push(
        '<button type="button" class="wc-pill '+cls+(selected?' is-selected':'')+'" data-world="'+escapeHtml(world.id)+'" aria-expanded="'+(selected?'true':'false')+'" aria-controls="worlds-navbar-detail" title="'+escapeHtml(world.name)+' — '+escapeHtml(world.tagline)+'">'
          + '<span class="wc-pulse-ring" aria-hidden="true"></span>'
          + '<span class="wc-world-icon" aria-hidden="true">'+escapeHtml(world.rune || '◆')+'</span>'
          + '<span class="wc-dot" aria-hidden="true"></span>'
          + '<span class="wc-name">'+escapeHtml(world.short || world.name)+'</span>'
          + '<span class="wc-badge">'+badge+'</span>'
        + '</button>'
      );
    });
    bits.push('<div id="worlds-navbar-detail" class="wc-detail-wrap '+(active?'is-open':'')+'">'+worldPanel(active)+'</div>');
    return bits.join('');
  }

  function bind(cluster){
    cluster.querySelectorAll('[data-world]').forEach(btn => btn.addEventListener('click', event => {
      event.stopPropagation();
      const id = btn.dataset.world || '';
      activeWorldId = activeWorldId === id ? null : id;
      render();
    }));
  }

  function isDisplayEnabled(){
    try{ return localStorage.getItem(DISPLAY_KEY) !== '0'; }catch(e){ return true; }
  }
  function setDisplayEnabled(enabled){
    try{ localStorage.setItem(DISPLAY_KEY, enabled ? '1' : '0'); }catch(e){}
    render();
  }
  function resetWorlds(){
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    render();
  }

  function render(){
    const topbar = document.getElementById('topbar');
    if(!topbar) return;
    let cluster = topbar.querySelector('.worlds-navbar-cluster');
    if(!cluster){
      const right = document.getElementById('tb-right');
      cluster = document.createElement('div');
      cluster.className = 'worlds-navbar-cluster';
      cluster.id = 'worlds-navbar-cluster';
      cluster.setAttribute('aria-label','Archlight world status and ruleset differences');
      if(right && right.parentNode === topbar) topbar.insertBefore(cluster, right);
      else topbar.appendChild(cluster);
    }
    if(!isDisplayEnabled()){ cluster.innerHTML=''; cluster.style.display='none'; return; }
    cluster.style.display='';
    cluster.innerHTML = worldMarkup();
    bind(cluster);
  }

  function setWorlds(worlds){
    if(!Array.isArray(worlds)) return;
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(worlds.map(normalizeWorld))); }catch(e){}
    render();
  }

  function setWorldOnline(id, online){
    const worlds = readWorlds().map(world => world.id === id ? Object.assign({}, world, { status: online ? 'online' : 'offline', online: !!online }) : world);
    setWorlds(worlds);
  }

  document.addEventListener('click', e => {
    const cluster = document.getElementById('worlds-navbar-cluster');
    if(cluster && activeWorldId && !cluster.contains(e.target)){
      activeWorldId = null;
      render();
    }
  });
  document.addEventListener('keydown', e => {
    if(e.key === 'Escape' && activeWorldId){ activeWorldId = null; render(); }
  });

  window.ArchlightWorlds = { render, getWorlds: readWorlds, setWorlds, setWorldOnline, isDisplayEnabled, setDisplayEnabled, resetWorlds, defaultWorlds:function(){ return DEFAULT_WORLDS.map(normalizeWorld); } };
  document.addEventListener('DOMContentLoaded', render);
})();
