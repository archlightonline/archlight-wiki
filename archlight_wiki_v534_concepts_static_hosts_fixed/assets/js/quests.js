(function(){
  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const FILTER_COPY = {
    all: '<strong>All quests shown.</strong> Story quests stay visually dominant; side quests remain marked as optional / usually easier.',
    story: '<strong>Story path shown.</strong> Showing the main progression route quests first.',
    side: '<strong>Side board shown.</strong> Showing optional / usually easier side quests for bonus rewards and unlocks.'
  };
  function visibleByFilter(el, filter){
    if(!el) return false;
    if(filter === 'all') return true;
    return String(el.dataset.kind || '').toLowerCase() === filter;
  }
  function setGuide(page, trigger){
    if(!page || !trigger) return;
    const title = trigger.dataset.title || 'Quest Guide';
    const video = trigger.dataset.video || '';
    const kind = trigger.dataset.kind || trigger.closest('[data-kind]')?.dataset.kind || 'story';
    const guide = $('#qst81Guide', page);
    const titleEl = $('#qst81VideoTitle', page);
    const frame = $('#qst81VideoFrame', page);
    const link = $('#qst81YoutubeLink', page);
    const copy = $('#qst81VideoCopy', page);
    const badge = $('.qst81-video-badge', page);
    if(!guide) return;
    guide.dataset.kind = kind;
    guide.classList.toggle('no-video', !video);
    if(titleEl) titleEl.textContent = title;
    if(frame){
      if(video){
        frame.src = 'https://www.youtube-nocookie.com/embed/' + encodeURIComponent(video);
        frame.title = title + ' quest guide';
      } else {
        frame.removeAttribute('src');
        frame.title = title + ' quest guide pending';
      }
    }
    if(link){
      if(video){
        link.href = 'https://www.youtube.com/watch?v=' + encodeURIComponent(video);
        link.textContent = 'Open on YouTube';
        link.removeAttribute('aria-disabled');
      } else {
        link.href = '#';
        link.textContent = 'Guide pending';
        link.setAttribute('aria-disabled', 'true');
      }
    }
    if(copy){
      copy.textContent = video ? title + ' guide is loaded. Use the quest board or route list to switch guides.' : title + ' does not have a guide video attached yet.';
    }
    if(badge){
      badge.textContent = video ? 'VISIBLE' : 'PENDING';
    }
    $$('.qst81-card, .qst81-map a', page).forEach(el => el.classList.remove('active'));
    const titleKey = String(title).toLowerCase();
    $$('.qst81-card, .qst81-map a', page).forEach(el => {
      if(String(el.dataset.title || '').toLowerCase() === titleKey) el.classList.add('active');
    });
  }
  function firstVisibleQuest(page, filter){
    return $('.qst81-card' + (filter === 'all' ? '' : '[data-kind="' + filter + '"]'), page) || $('.qst81-card', page);
  }
  function applyFilter(page, filter){
    if(!page) return;
    const next = ['all','story','side'].includes(filter) ? filter : 'all';
    page.dataset.qfilter = next;
    $$('.qst81-sigil[data-qfilter]', page).forEach(btn => {
      const on = btn.dataset.qfilter === next;
      btn.classList.toggle('is-active', on);
      btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    });
    const status = $('#qst81FilterStatus', page);
    if(status) status.innerHTML = FILTER_COPY[next] || FILTER_COPY.all;
    const activeCard = $('.qst81-card.active', page);
    if(!visibleByFilter(activeCard, next)){
      const first = firstVisibleQuest(page, next);
      if(first) setGuide(page, first);
    }
  }
  function bind(page){
    if(!page || page.__qst81Bound) return;
    page.__qst81Bound = true;
    $$('.qst81-sigil[data-qfilter]', page).forEach(btn => btn.setAttribute('aria-pressed', btn.classList.contains('is-active') ? 'true' : 'false'));
    page.addEventListener('click', function(e){
      const filterBtn = e.target.closest('.qst81-sigil[data-qfilter]');
      if(filterBtn && page.contains(filterBtn)){
        e.preventDefault();
        applyFilter(page, filterBtn.dataset.qfilter || 'all');
        return;
      }
      const routeLink = e.target.closest('.qst81-map a[data-title], .qst81-title[data-title], .qst81-watch[data-title]');
      if(routeLink && page.contains(routeLink)){
        e.preventDefault();
        setGuide(page, routeLink);
        return;
      }
      const playerGo = e.target.closest('[data-player-go]');
      if(playerGo && page.contains(playerGo) && typeof window.go === 'function'){
        e.preventDefault();
        window.go(playerGo.dataset.playerGo);
      }
    });
    page.addEventListener('keydown', function(e){
      if(e.key !== 'Enter' && e.key !== ' ') return;
      const btn = e.target.closest('.qst81-sigil[data-qfilter], .qst81-title[data-title], .qst81-watch[data-title]');
      if(!btn || !page.contains(btn)) return;
      e.preventDefault();
      btn.click();
    });
    applyFilter(page, page.dataset.qfilter || 'all');
    const first = $('.qst81-card.has-video', page) || $('.qst81-card', page);
    if(first) setGuide(page, first);
  }
  function init(){ bind(document.getElementById('pg-quests')); }
  window.ArchlightQuests = { init, applyFilter: function(filter){ applyFilter(document.getElementById('pg-quests'), filter); } };
  document.addEventListener('DOMContentLoaded', init);
})();
