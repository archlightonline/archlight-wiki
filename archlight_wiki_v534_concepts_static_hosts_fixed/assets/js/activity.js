(function(){
  'use strict';
  if(window.__archlightLiveActivityV205) return;
  window.__archlightLiveActivityV205 = true;

  var STORAGE_KEY = 'archlight_live_activity_v2';
  var isOpen = false;
  var lastToggle = 0;
  var state = { filter:'all', query:'', compact:false, activeId:'' };
  var toastTimers = new Map();
  var TOAST_LIMIT = 4;

  var BASE_ACTIVITY = [
    {user:'Archlight Team',role:'admin',emoji:'📰',type:'publish',action:'published',page:'Abaldar Patch Notes',time:'Today',impact:'New update entry added to the archive'},
    {user:'Fluffydrakoz',role:'Wiki Admin',emoji:'🦊',type:'review',action:'reviewed',page:'Updates Archive',time:'Today',impact:'Checked formatting, dates, and duplicate imports'},
    {user:'Wrath',role:'Contributor',emoji:'⚒️',type:'fix',action:'corrected',page:'Unlocks & Tasks',time:'Yesterday',impact:'Cleaned guide flow and access notes'},
    {user:'Crystalweave',role:'Contributor',emoji:'💎',type:'fix',action:'polished',page:'Gems',time:'3 days ago',impact:'Improved item clarity and table notes'},
    {user:'Stormhawk',role:'Contributor',emoji:'🦅',type:'new',action:'created',page:'Rogue PvP Build',time:'This week',impact:'Community build page prepared'},
    {user:'Nightblade',role:'Contributor',emoji:'🌙',type:'update',action:'expanded',page:'Dungeons',time:'This week',impact:'Added activity details and rewards'},
    {user:'Ironveil',role:'Contributor',emoji:'🛡️',type:'new',action:'added',page:'Armor Sets',time:'This week',impact:'New equipment reference table'}
  ];

  var TYPE_META = {
    publish:{label:'Published', short:'Post', cls:'is-publish', tone:'gold'},
    new:{label:'New', short:'New', cls:'is-new', tone:'green'},
    update:{label:'Updated', short:'Update', cls:'is-update', tone:'blue'},
    edit:{label:'Updated', short:'Update', cls:'is-update', tone:'blue'},
    fix:{label:'Fixed', short:'Fix', cls:'is-fix', tone:'orange'},
    review:{label:'Reviewed', short:'Review', cls:'is-review', tone:'violet'},
    contribution:{label:'New', short:'New', cls:'is-new', tone:'green'}
  };

  function E(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? '' : s).replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]; }); }
  function nowLabel(){
    try{ return new Date().toLocaleString(undefined,{month:'short',day:'numeric',hour:'2-digit',minute:'2-digit'}); }
    catch(e){ return 'just now'; }
  }
  function readLocal(){
    try{
      var parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter(Boolean) : [];
    }catch(e){ return []; }
  }
  function writeLocal(items){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(items.slice(0,80))); }catch(e){}
  }
  function normalizeType(type){
    type = String(type || 'update').toLowerCase();
    if(type === 'edit') return 'update';
    if(type === 'contribution') return 'new';
    return TYPE_META[type] ? type : 'update';
  }
  function makeId(entry, idx){
    return entry.id || ('activity-'+idx+'-'+String(entry.page || 'wiki').toLowerCase().replace(/[^a-z0-9]+/g,'-'));
  }
  function normalizeEntry(entry, idx){
    entry = entry || {};
    var type = normalizeType(entry.type);
    return {
      id: makeId(entry, idx),
      user: entry.user || 'Archlight Team',
      role: entry.role || '',
      emoji: entry.emoji || (type === 'publish' ? '📰' : type === 'fix' ? '⚒️' : type === 'new' ? '✦' : '✧'),
      type:type,
      action: entry.action || (type === 'publish' ? 'published' : type === 'fix' ? 'fixed' : type === 'new' ? 'added' : 'updated'),
      page: entry.page || 'Wiki page',
      time: entry.time || 'Recently',
      impact: entry.impact || entry.note || 'Wiki activity recorded'
    };
  }
  function entries(){ return readLocal().concat(BASE_ACTIVITY).slice(0,80).map(normalizeEntry); }
  function core(){ return window.ContributorsCore || null; }
  function slug(value){
    var c = core();
    if(c && c.slug) return c.slug(value);
    return String(value || '').toLowerCase().trim().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
  }
  function contributorFor(entry){
    var c = core();
    if(!c || !c.contributors) return null;
    var wanted = slug(entry && entry.user);
    return (c.contributors() || []).find(function(person){ return slug(person.name) === wanted || slug(person._baseName) === wanted; }) || null;
  }
  function staffRoleObjects(entry){
    var c = core();
    var person = contributorFor(entry);
    if(c && person && c.staffRoleObjects) return c.staffRoleObjects(person);
    var role = String((entry && entry.role) || '').trim();
    if(!role && String(entry && entry.user || '').toLowerCase().indexOf('archlight') !== -1) role = 'Admin';
    if(!role) return [];
    var normalized = slug(role);
    if(normalized === 'contributor' || normalized === 'contributor_staff' || normalized === 'player') return [];
    var label = normalized === 'wiki_admin' ? 'Wiki Admin' : normalized === 'admin' ? 'Wiki Admin' : role;
    var id = normalized === 'admin' ? 'wiki_admin' : normalized;
    var priority = id === 'wiki_admin' ? 300 : 0;
    var color = id === 'wiki_admin' ? '#ffd36a' : '#65eadc';
    return [{id:id,name:label,displayName:label,priority:priority,color:color}];
  }
  function primaryStaffRole(entry){
    var roles = staffRoleObjects(entry).slice();
    roles.sort(function(a,b){ return Number(b.priority || 0) - Number(a.priority || 0); });
    return roles[0] || null;
  }
  function earnedRoleObject(entry){
    var c = core();
    var person = contributorFor(entry);
    if(c && person && c.earnedRoleObject) return c.earnedRoleObject(person);
    return null;
  }
  function roleFor(entry){
    var role = primaryStaffRole(entry);
    return role ? slug(role.id || role.name) : '';
  }
  function starBadge(role){
    if(!role) return '';
    var tier = Math.max(1, Math.min(6, Number(role.tier || 1)));
    var stars = Array.from({length:6}, function(_,i){ return '<i class="'+(i < tier ? 'is-on' : '')+'" aria-hidden="true">★</i>'; }).join('');
    var color = /^#[0-9a-fA-F]{3,8}$/.test(String(role.color || '')) ? role.color : '#d8c47a';
    return '<span class="lad-earned-badge lad-earned-badge--tier-'+tier+'" style="--role-color:'+esc(color)+'" title="Contributor stars, tier '+tier+'"><span>'+esc(role.name || 'Contributor Stars')+'</span><span class="lad-mini-stars">'+stars+'</span></span>';
  }
  function userBadges(entry){
    var c = core();
    var staff = primaryStaffRole(entry);
    var earned = earnedRoleObject(entry);
    var out = '';
    if(staff){
      var id = slug(staff.id || staff.name);
      var cls = id === 'wiki_admin' || id === 'admin' ? 'is-admin' : 'is-contributor';
      var color = c && c.roleColor ? c.roleColor(staff, '#65eadc') : (staff.color || '#65eadc');
      out += '<span class="lad-role '+cls+'" style="--role-color:'+esc(color)+'">'+esc(staff.displayName || staff.name || 'Contributor')+'</span>';
    }
    out += starBadge(earned);
    return out;
  }
  function userClass(entry){
    var role = roleFor(entry);
    if(role === 'wiki_admin' || role === 'admin') return 'is-admin';
    if(role === 'contributor' || role === 'contributor_staff') return 'is-contributor';
    return '';
  }
  function updateBell(count){
    var badge = E('bell-badge');
    if(!badge) return;
    badge.textContent = String(Math.min(count,99));
    badge.style.display = count > 0 ? 'flex' : 'none';
  }
  function toastHost(){
    var host = E('live-pulse-toasts');
    if(!host){
      host = document.createElement('div');
      host.id = 'live-pulse-toasts';
      host.setAttribute('aria-live','polite');
      host.setAttribute('aria-label','Live wiki update notifications');
      document.body.appendChild(host);
    }
    return host;
  }
  function toastIcon(type){
    if(type === 'publish') return '📰';
    if(type === 'fix') return '⚒';
    if(type === 'new') return '✦';
    if(type === 'review') return '◆';
    return '✧';
  }
  function removeToast(id){
    var node = E(id);
    if(!node) return;
    node.classList.add('is-leaving');
    var timer = toastTimers.get(id);
    if(timer) window.clearTimeout(timer);
    toastTimers.delete(id);
    window.setTimeout(function(){ if(node && node.parentNode) node.parentNode.removeChild(node); }, 650);
  }
  function showToast(entry){
    if(!entry) return;
    var host = toastHost();
    var type = normalizeType(entry.type);
    var meta = TYPE_META[type] || TYPE_META.update;
    var role = roleFor(entry);
    var isStaffToast = role === 'admin' || role === 'wiki_admin' || String(entry.user || '').toLowerCase().indexOf('archlight') !== -1;
    var id = 'live-pulse-toast-' + Date.now() + '-' + Math.random().toString(16).slice(2);
    while(host.children.length >= TOAST_LIMIT){
      removeToast(host.firstElementChild && host.firstElementChild.id);
    }
    var node = document.createElement('article');
    node.id = id;
    node.className = 'live-pulse-toast ' + meta.cls + (isStaffToast ? ' is-staff-toast' : ' is-player-toast');
    node.innerHTML = ''+
      '<div class="lpt-rune">'+esc(entry.emoji || toastIcon(type))+'</div>'+
      '<div class="lpt-copy">'+
        '<div class="lpt-kicker"><span>Wiki Update</span><em>'+esc(meta.label)+'</em></div>'+
        '<b>'+esc(entry.page || 'Wiki page')+'</b>'+
        '<p>'+esc(entry.impact || entry.note || 'A wiki change was recorded.')+'</p>'+
        '<div class="lpt-meta"><span>'+esc(entry.user || 'Archlight Team')+'</span><span>'+esc(entry.time || nowLabel())+'</span><button type="button" data-live-toast-open>Open Activity</button></div>'+
      '</div>'+
      '<button class="lpt-close" type="button" data-live-toast-close aria-label="Dismiss notification">×</button>';
    host.prepend(node);
    node.classList.add('is-entering');
    node.getBoundingClientRect();
    window.requestAnimationFrame(function(){
      window.requestAnimationFrame(function(){
        node.classList.remove('is-entering');
        node.classList.add('is-visible');
      });
    });
    node.addEventListener('click', function(ev){
      if(ev.target.closest('[data-live-toast-close]')){ ev.preventDefault(); removeToast(id); return; }
      if(ev.target.closest('[data-live-toast-open]')){ ev.preventDefault(); open(); removeToast(id); return; }
    });
    toastTimers.set(id, window.setTimeout(function(){ removeToast(id); }, 9000));
  }
  function tally(data, key){ return data.filter(function(item){ return item.type === key; }).length; }
  function searchable(item){ var staff = primaryStaffRole(item); var earned = earnedRoleObject(item); return [item.user,item.role,staff && staff.name,earned && earned.name,item.type,item.action,item.page,item.time,item.impact].join(' ').toLowerCase(); }
  function filteredEntries(data){
    var query = String(state.query || '').trim().toLowerCase();
    return data.filter(function(item){
      if(state.filter !== 'all' && item.type !== state.filter) return false;
      if(query && searchable(item).indexOf(query) === -1) return false;
      return true;
    });
  }
  function renderLegend(data){
    var legend = E('activity-legend');
    if(!legend) return;
    var blocks = [
      {key:'all', label:'All', count:data.length, cls:'is-all'},
      {key:'publish', label:'Posts', count:tally(data,'publish')},
      {key:'update', label:'Updates', count:tally(data,'update')},
      {key:'fix', label:'Fixes', count:tally(data,'fix')},
      {key:'new', label:'New', count:tally(data,'new')},
      {key:'review', label:'Reviews', count:tally(data,'review')}
    ];
    legend.innerHTML = blocks.map(function(item){
      var meta = item.key === 'all' ? {cls:'is-all'} : TYPE_META[item.key];
      var active = state.filter === item.key ? ' is-active' : '';
      return '<button type="button" class="lad-pill '+meta.cls+active+'" data-activity-filter="'+esc(item.key)+'"><span class="lad-dot"></span><span>'+esc(item.label)+'</span><strong>'+esc(item.count)+'</strong></button>';
    }).join('');
  }
  function renderControls(total, shown){
    return ''+
      '<div class="lad-tools">'+
        '<label class="lad-search"><span>Search activity</span><input type="search" value="'+esc(state.query)+'" placeholder="Filter by page, user, fix, update..." data-activity-search></label>'+
        '<button type="button" class="lad-mode'+(state.compact ? ' is-active' : '')+'" data-activity-compact><span>'+ (state.compact ? 'Detailed view' : 'Compact view') +'</span></button>'+
      '</div>'+
      '<div class="lad-feed-status"><span>'+esc(shown)+' visible</span><span>'+esc(total)+' recent</span><span>'+esc(state.filter === 'all' ? 'all types' : (TYPE_META[state.filter] && TYPE_META[state.filter].label || state.filter))+'</span></div>';
  }
  function renderEmpty(){
    return '<div class="lad-empty"><div class="lad-empty-mark">✦</div><div class="lad-empty-title">No matching activity</div><div class="lad-empty-copy">Try another type filter or search term. Published notes, page edits, and contribution events appear here once recorded.</div></div>';
  }
  function renderItem(item, idx, total){
    var meta = TYPE_META[item.type] || TYPE_META.update;
    var active = state.activeId === item.id ? ' is-focused' : '';
    var role = roleFor(item);
    var isAdminChange = role === 'admin' || role === 'wiki_admin' || String(item.user || '').toLowerCase().indexOf('archlight') !== -1;
    var isEditorChange = false;
    var adminClass = isAdminChange ? ' is-admin-change' : (isEditorChange ? ' is-editor-change' : ' is-contributor-change');
    return ''+
      '<article class="lad-item '+meta.cls+active+adminClass+'" data-activity-id="'+esc(item.id)+'" data-activity-type="'+esc(item.type)+'" tabindex="0">'+
        '<div class="lad-rune"><span>'+esc(item.emoji)+'</span></div>'+
        '<div class="lad-body">'+
          '<div class="lad-top">'+
            '<div class="lad-who"><span class="lad-user '+userClass(item)+'">'+esc(item.user)+'</span>'+userBadges(item)+'</div>'+
            '<span class="lad-type '+meta.cls+'">'+esc(meta.short)+'</span>'+
          '</div>'+
          '<div class="lad-action"><strong>'+esc(item.action)+'</strong> <span>'+esc(item.page)+'</span></div>'+
          '<div class="lad-impact">'+esc(item.impact)+'</div>'+
          '<div class="lad-meta">'+(isAdminChange ? '<span class="lad-staff-signal">Wiki Admin update</span>' : '<span class="lad-player-signal">Contributor activity</span>')+'<span>'+esc(item.time)+'</span><span>'+esc(meta.label)+'</span></div>'+
        '</div>'+ 
      '</article>';
  }
  function renderSection(title, rows, offset, total){
    if(!rows.length) return '';
    return '<section class="lad-section"><div class="lad-section-title"><span></span>'+esc(title)+'<em>'+rows.length+'</em></div>'+rows.map(function(item,idx){ return renderItem(item,idx+offset,total); }).join('')+'</section>';
  }
  function render(){
    var body = E('adrb');
    var count = E('adrct');
    var data = entries();
    var visible = filteredEntries(data);
    if(count) count.textContent = String(data.length);
    updateBell(data.length);
    renderLegend(data);
    if(!body) return;
    var latest = visible.slice(0,4);
    var older = visible.slice(4);
    body.classList.toggle('is-compact', !!state.compact);
    body.innerHTML = renderControls(data.length, visible.length) + (visible.length ?
      renderSection('Latest activity', latest, 0, data.length) + renderSection('Earlier activity', older, 4, data.length) :
      renderEmpty());
  }
  function sync(){
    var drawer = E('adwr');
    var bell = E('bell-btn');
    if(drawer){
      drawer.classList.toggle('open', isOpen);
      drawer.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    }
    if(bell) bell.classList.toggle('open', isOpen);
  }
  function open(){ isOpen = true; lastToggle = Date.now(); render(); sync(); }
  function close(){ isOpen = false; sync(); }
  function toggle(ev){ if(ev){ ev.preventDefault(); ev.stopPropagation(); } isOpen ? close() : open(); }
  function add(entry){
    var type = normalizeType(entry && entry.type || 'update');
    var rows = readLocal();
    var nextEntry = {
      id: 'manual-'+Date.now()+'-'+Math.random().toString(16).slice(2),
      user: entry && entry.user || window.currentUser || 'Archlight Team',
      emoji: entry && entry.emoji || (type === 'publish' ? '📰' : '✧'),
      type:type,
      action: entry && entry.action || (type === 'publish' ? 'published' : type === 'fix' ? 'fixed' : type === 'new' ? 'added' : 'updated'),
      page: entry && entry.page || 'Wiki page',
      time: entry && entry.time || nowLabel(),
      impact: entry && (entry.impact || entry.note) || 'Activity added from the wiki tools',
      role: entry && entry.role || window.currentRole || ''
    };
    rows.unshift(nextEntry);
    writeLocal(rows);
    render();
    updateBell(entries().length);
    if(window.ArchlightRenderSidebar) window.ArchlightRenderSidebar();
    if(!(entry && entry.silentToast)) showToast(nextEntry);
  }
  function clear(){
    try{ localStorage.removeItem(STORAGE_KEY); }catch(e){}
    render();
  }
  function bind(){
    var drawer = E('adwr');
    var bell = E('bell-btn');
    if(bell && bell.dataset.liveActivityBound !== '1'){
      bell.dataset.liveActivityBound = '1';
      bell.setAttribute('aria-label','Open live activity');
      bell.addEventListener('click', toggle);
    }
    if(drawer && drawer.dataset.liveActivityBound !== '1'){
      drawer.dataset.liveActivityBound = '1';
      drawer.addEventListener('click', function(ev){
        ev.stopPropagation();
        var filter = ev.target.closest('[data-activity-filter]');
        if(filter){ ev.preventDefault(); state.filter = filter.dataset.activityFilter || 'all'; render(); return; }
        var compact = ev.target.closest('[data-activity-compact]');
        if(compact){ ev.preventDefault(); state.compact = !state.compact; render(); return; }
        var item = ev.target.closest('[data-activity-id]');
        if(item){ ev.preventDefault(); state.activeId = state.activeId === item.dataset.activityId ? '' : item.dataset.activityId; render(); return; }
        if(ev.target.closest('[data-live-edits-close]')){ ev.preventDefault(); close(); }
      });
      drawer.addEventListener('input', function(ev){
        if(ev.target && ev.target.matches('[data-activity-search]')){ state.query = ev.target.value || ''; render(); }
      });
      drawer.addEventListener('keydown', function(ev){
        var item = ev.target.closest('[data-activity-id]');
        if(item && (ev.key === 'Enter' || ev.key === ' ')){ ev.preventDefault(); state.activeId = state.activeId === item.dataset.activityId ? '' : item.dataset.activityId; render(); }
      });
    }
    document.addEventListener('click', function(ev){
      if(!isOpen || Date.now() - lastToggle < 160) return;
      var drawer = E('adwr');
      var bell = E('bell-btn');
      var path = typeof ev.composedPath === 'function' ? ev.composedPath() : [];
      var insideDrawer = drawer && (drawer.contains(ev.target) || path.indexOf(drawer) !== -1);
      var insideBell = bell && (bell.contains(ev.target) || path.indexOf(bell) !== -1);
      if(drawer && !insideDrawer && !insideBell) close();
    });
    document.addEventListener('keydown', function(ev){ if(ev.key === 'Escape' && isOpen) close(); });
    render();
    sync();
  }
  window.ArchlightActivity = { render:render, open:open, close:close, toggle:toggle, add:add, clear:clear, entries:entries, notify:showToast };
  window.renderActivity = render;
  window.toggleDrawer = toggle;
  window.closeDrawer = close;
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
