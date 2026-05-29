(function(){
  'use strict';
  if(window.__archlightLauncherNotifications) return;
  window.__archlightLauncherNotifications = true;

  const STORAGE_KEY = 'archlight_launcher_notifications';
  const DISMISS_KEY = 'archlight_launcher_notifications_dismissed';
  const BUILTIN = Array.isArray(window.ARCHLIGHT_LAUNCHER_NOTIFICATIONS) ? window.ARCHLIGHT_LAUNCHER_NOTIFICATIONS : [];
  const POSITIONS = ['bottom-right','bottom-left','top-right','top-left'];
  let timer = null;

  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean = value => String(value || '').trim();
  const slug = value => clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'launcher-notice';

  function normalize(item, index){
    const title = clean(item && item.title) || 'Archlight Notice';
    const position = POSITIONS.includes(clean(item && item.position)) ? clean(item.position) : 'bottom-right';
    return {
      id: clean(item && item.id) || slug(title) + '-' + (index + 1),
      enabled: item && item.enabled === false ? false : true,
      eyebrow: clean(item && item.eyebrow) || 'Archlight Notice',
      title,
      body: clean(item && item.body),
      image: clean(item && item.image),
      ctaLabel: clean(item && item.ctaLabel),
      ctaRoute: clean(item && item.ctaRoute),
      ctaUrl: clean(item && item.ctaUrl),
      startsAt: clean(item && item.startsAt),
      endsAt: clean(item && item.endsAt),
      forever: item && item.forever === false ? false : true,
      dismissible: item && item.dismissible === false ? false : true,
      priority: Number.isFinite(Number(item && item.priority)) ? Number(item.priority) : 0,
      delaySeconds: Math.max(0, Number.isFinite(Number(item && item.delaySeconds)) ? Number(item.delaySeconds) : 1),
      durationSeconds: Math.max(0, Number.isFinite(Number(item && item.durationSeconds)) ? Number(item.durationSeconds) : 12),
      position
    };
  }

  function readStored(){
    try{
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
      return Array.isArray(parsed) ? parsed.map(normalize) : null;
    }catch(e){ return null; }
  }

  function save(items){
    const normalized = Array.isArray(items) ? items.map(normalize) : [];
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(normalized)); }catch(e){}
    render();
    return normalized;
  }

  function getAll(){
    const stored = readStored();
    return (stored || BUILTIN.map(normalize)).slice().sort((a,b)=>(b.priority||0)-(a.priority||0));
  }

  function reset(){
    try{ localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(DISMISS_KEY); }catch(e){}
    render();
  }

  function parseTime(value){
    if(!value) return null;
    const t = new Date(value).getTime();
    return Number.isFinite(t) ? t : null;
  }

  function getStatus(item, now){
    if(!item.enabled) return 'disabled';
    if(item.forever) return 'live';
    const start = parseTime(item.startsAt);
    const end = parseTime(item.endsAt);
    if(start && now < start) return 'scheduled';
    if(end && now > end) return 'expired';
    return 'live';
  }

  function getDismissed(){
    try{
      const parsed = JSON.parse(localStorage.getItem(DISMISS_KEY) || '[]');
      return Array.isArray(parsed) ? parsed : [];
    }catch(e){ return []; }
  }

  function dismiss(id){
    const list = getDismissed();
    if(!list.includes(id)) list.push(id);
    try{ localStorage.setItem(DISMISS_KEY, JSON.stringify(list.slice(-80))); }catch(e){}
    hide();
  }

  function activeItems(){
    const now = Date.now();
    const dismissed = getDismissed();
    return getAll().filter(item => getStatus(item, now) === 'live' && !dismissed.includes(item.id));
  }

  function ensureHost(){
    let host = document.getElementById('launcher-notification-host');
    if(!host){
      host = document.createElement('aside');
      host.id = 'launcher-notification-host';
      host.setAttribute('aria-live','polite');
      host.setAttribute('aria-label','Archlight launcher notification');
      document.body.appendChild(host);
    }
    return host;
  }

  function safeImage(src){
    if(!src) return '';
    if(/^https?:\/\//i.test(src) || /^assets\//i.test(src) || /^build\//i.test(src) || /^design-lab\//i.test(src) || /^\.\//.test(src) || /^\/[^/]/.test(src)) return src;
    return '';
  }

  function renderCard(item){
    const image = safeImage(item.image);
    const img = image ? `<div class="ln-thumb"><img src="${esc(image)}" alt="" loading="lazy" onerror="this.closest('.ln-thumb').classList.add('is-empty');this.remove();"></div>` : `<div class="ln-thumb is-empty"><span>A</span></div>`;
    const close = item.dismissible ? `<button class="ln-close" type="button" data-ln-close="${esc(item.id)}" aria-label="Dismiss notification">×</button>` : '';
    const cta = item.ctaLabel && (item.ctaRoute || item.ctaUrl) ? `<button class="ln-cta" type="button" data-ln-route="${esc(item.ctaRoute)}" data-ln-url="${esc(item.ctaUrl)}">${esc(item.ctaLabel)}</button>` : '';
    return `<article class="ln-card" data-ln-id="${esc(item.id)}">
      ${img}
      <div class="ln-copy">
        <div class="ln-eyebrow">${esc(item.eyebrow)}</div>
        <h2>${esc(item.title)}</h2>
        ${item.body ? `<p>${esc(item.body)}</p>` : ''}
        ${cta ? `<div class="ln-actions">${cta}</div>` : ''}
      </div>
      ${close}
    </article>`;
  }

  function hide(){
    const host = document.getElementById('launcher-notification-host');
    if(!host) return;
    host.classList.remove('is-visible');
    window.setTimeout(()=>{ host.innerHTML = ''; }, 260);
  }

  function renderNow(item){
    const host = ensureHost();
    host.className = 'ln-host is-' + item.position;
    host.innerHTML = renderCard(item);
    host.dataset.bound = host.dataset.bound || '0';
    if(host.dataset.bound !== '1'){
      host.dataset.bound = '1';
      host.addEventListener('click', e => {
        const close = e.target.closest('[data-ln-close]');
        if(close){ dismiss(close.dataset.lnClose); return; }
        const cta = e.target.closest('[data-ln-route],[data-ln-url]');
        if(cta){
          const route = clean(cta.dataset.lnRoute);
          const url = clean(cta.dataset.lnUrl);
          if(route && typeof window.go === 'function') window.go(route);
          else if(url) window.open(url, '_blank', 'noopener');
          hide();
        }
      });
    }
    requestAnimationFrame(()=>host.classList.add('is-visible'));
    if(item.durationSeconds > 0){
      window.setTimeout(()=>{
        const current = document.querySelector('.ln-card')?.dataset.lnId;
        if(current === item.id) hide();
      }, item.durationSeconds * 1000);
    }
  }

  function render(){
    if(timer) window.clearTimeout(timer);
    const item = activeItems()[0];
    if(!item){ hide(); return false; }
    timer = window.setTimeout(()=>renderNow(item), item.delaySeconds * 1000);
    return true;
  }

  function upsert(item){
    const all = getAll();
    const normalized = normalize(item, all.length);
    const index = all.findIndex(existing => existing.id === normalized.id);
    if(index >= 0) all[index] = normalized; else all.push(normalized);
    return save(all);
  }

  function remove(id){ return save(getAll().filter(item => item.id !== id)); }
  function statusOf(item){ return getStatus(normalize(item, 0), Date.now()); }

  window.ArchlightLauncherNotifications = {
    init: render,
    render,
    getAll,
    save,
    upsert,
    remove,
    reset,
    activeItems,
    statusOf,
    normalize,
    positions: POSITIONS.slice()
  };

  document.addEventListener('DOMContentLoaded', render);
})();
