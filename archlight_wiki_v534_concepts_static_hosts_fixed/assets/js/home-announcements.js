(function(){
  'use strict';
  if(window.__archlightHomeAnnouncements) return;
  window.__archlightHomeAnnouncements = true;

  const STORAGE_KEY = 'archlight_home_announcements';
  const DISMISS_KEY = 'archlight_home_announcements_dismissed';
  const BUILTIN = Array.isArray(window.ARCHLIGHT_HOME_ANNOUNCEMENTS) ? window.ARCHLIGHT_HOME_ANNOUNCEMENTS : [];
  const LEVELS = ['announcement','warning','event','maintenance'];

  const esc = value => String(value == null ? '' : value).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const clean = value => String(value || '').trim();
  const slug = value => clean(value).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'announcement';

  function normalize(item, index){
    const level = LEVELS.includes(clean(item && item.level)) ? clean(item.level) : 'announcement';
    const title = clean(item && item.title) || 'Wiki Announcement';
    return {
      id: clean(item && item.id) || slug(title) + '-' + (index + 1),
      enabled: item && item.enabled === false ? false : true,
      level,
      eyebrow: clean(item && item.eyebrow) || level,
      postedBy: clean(item && (item.postedBy || item.author || item.posted_by)),
      title,
      body: clean(item && item.body),
      ctaLabel: clean(item && item.ctaLabel),
      ctaRoute: clean(item && item.ctaRoute),
      ctaUrl: clean(item && item.ctaUrl),
      startsAt: clean(item && item.startsAt),
      endsAt: clean(item && item.endsAt),
      forever: item && item.forever === false ? false : true,
      dismissible: item && item.dismissible === false ? false : true,
      priority: Number.isFinite(Number(item && item.priority)) ? Number(item.priority) : 0
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

  function activeItems(){
    const now = Date.now();
    const dismissed = getDismissed();
    return getAll().filter(item => getStatus(item, now) === 'live' && !dismissed.includes(item.id));
  }

  function ensureHost(){
    const hero = document.querySelector('#pg-home #hero');
    const heroBody = hero && hero.querySelector('.hero-body');
    if(!hero || !heroBody) return null;

    let host = document.getElementById('home-announcements');
    if(!host){
      host = document.createElement('section');
      host.id = 'home-announcements';
      host.setAttribute('aria-label','Important Archlight announcements');
    }

    host.className = 'home-alerts hero-mounted';

    const wordmark = heroBody.querySelector('.hero-wordmark');
    const tag = heroBody.querySelector('.hero-tag');
    const anchor = wordmark || tag || heroBody.firstElementChild;

    if(anchor && anchor.nextElementSibling !== host){
      anchor.insertAdjacentElement('afterend', host);
    }else if(!anchor && host.parentElement !== heroBody){
      heroBody.prepend(host);
    }

    return host;
  }

  function levelIcon(level){
    return ({announcement:'📣', warning:'⚠', event:'◆', maintenance:'⚙'})[level] || '📣';
  }

  function labelIcon(level){
    return ({announcement:'📣', warning:'⚠', event:'✦', maintenance:'⚙'})[level] || '📣';
  }

  function levelLabel(level){
    return ({announcement:'Site Announcement', warning:'Important Warning', event:'Event Notice', maintenance:'Maintenance Notice'})[level] || 'Site Announcement';
  }

  function renderItem(item){
    const cta = item.ctaLabel && (item.ctaRoute || item.ctaUrl)
      ? `<button class="ha-cta" type="button" data-ha-route="${esc(item.ctaRoute)}" data-ha-url="${esc(item.ctaUrl)}"><span>${esc(item.ctaLabel)}</span><b>→</b></button>`
      : '';
    const close = item.dismissible ? `<button class="ha-close" type="button" data-ha-dismiss="${esc(item.id)}" aria-label="Dismiss announcement">×</button>` : '';
    return `<article class="ha-card ha-${esc(item.level)}" data-ha-id="${esc(item.id)}">
      <div class="ha-frame" aria-hidden="true"><span></span><span></span><span></span><span></span></div>
      <div class="ha-sigil" aria-hidden="true"><i>${esc(levelIcon(item.level))}</i></div>
      <div class="ha-copy">
        <div class="ha-topline">
          <span class="ha-broadcast"><i aria-hidden="true">${esc(labelIcon(item.level))}</i><span>${esc(levelLabel(item.level))}</span></span>
          <span class="ha-schedule"><i aria-hidden="true">${item.forever ? '∞' : '⏱'}</i><span>${esc(item.forever ? 'Permanent' : 'Timed')}</span></span>
          ${item.postedBy ? `<span class="ha-author"><i aria-hidden="true">✍</i><span>Posted by ${esc(item.postedBy)}</span></span>` : ''}
        </div>
        <h2>${esc(item.title)}</h2>
        ${item.body ? `<p>${esc(item.body)}</p>` : ''}
        
      </div>
      <div class="ha-actions">${cta}${close}</div>
    </article>`;
  }

  function render(){
    const host = ensureHost();
    if(!host) return false;
    const items = activeItems();
    host.innerHTML = items.length ? items.map(renderItem).join('') : '';
    host.classList.toggle('is-empty', !items.length);
    if(host.dataset.bound === '1') return true;
    host.dataset.bound = '1';
    host.addEventListener('click', e => {
      const dismissBtn = e.target.closest('[data-ha-dismiss]');
      if(dismissBtn){ dismiss(dismissBtn.dataset.haDismiss); return; }
      const cta = e.target.closest('[data-ha-route],[data-ha-url]');
      if(cta){
        const route = clean(cta.dataset.haRoute);
        const url = clean(cta.dataset.haUrl);
        if(route && typeof window.go === 'function') window.go(route);
        else if(url) window.open(url, '_blank', 'noopener');
      }
    });
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

  window.ArchlightHomeAnnouncements = {
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
    levels: LEVELS.slice()
  };

  document.addEventListener('DOMContentLoaded', render);
})();
