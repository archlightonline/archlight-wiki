(function(){
  'use strict';
  const core = window.ContributorsCore;
  const sections = window.ContributorSections;
  if(!core || !sections) return;
  function bindRows(lb){
    const rows=[...lb.querySelectorAll('.contrib-row')];
    if(!rows.length) return;
    let current=0;
    function focusRow(index){
      current=Math.max(0, Math.min(rows.length-1, index));
      rows.forEach(r=>r.classList.remove('is-focused'));
      rows[current].classList.add('is-focused');
      rows[current].scrollIntoView({behavior:'smooth', block:'center'});
      setTimeout(()=>rows[current]&&rows[current].classList.remove('is-focused'),1200);
    }
    const prev=lb.querySelector('.contrib-nav-btn.prev');
    const next=lb.querySelector('.contrib-nav-btn.next');
    if(prev) prev.onclick=()=>focusRow(current-1);
    if(next) next.onclick=()=>focusRow(current+1);
  }
  function bindContributorHints(root){
    if(!root || root.dataset.contribHintBound === '1') return;
    root.dataset.contribHintBound = '1';
    let tip = document.getElementById('contrib-floating-hint');
    if(!tip){
      tip = document.createElement('div');
      tip.id = 'contrib-floating-hint';
      tip.setAttribute('role','tooltip');
      document.body.appendChild(tip);
    }
    function hintTarget(ev){
      return ev.target.closest([
        '.contrib-hint-value[data-hint]',
        '.role-chip[data-role-help]',
        '.rank-stars-badge[data-role-help]',
        '.placing-chip[data-hint]',
        '.focus-rank[data-hint]',
        '.focus-reward[data-hint]',
        '.focus-chip[data-hint]',
        '.metric-pill [data-hint]',
        '.con-live-value-hint[data-hint]'
      ].join(','));
    }
    function hintText(target){
      if(!target) return '';
      return target.getAttribute('data-role-help') || target.getAttribute('data-hint') || target.getAttribute('aria-label') || target.getAttribute('title') || '';
    }
    function place(target){
      if(!target) return;
      const text = hintText(target).trim();
      if(!text) return;
      tip.textContent = text;
      tip.classList.add('is-visible');
      tip.style.left = '-9999px';
      tip.style.top = '-9999px';
      const rect = target.getBoundingClientRect();
      const margin = 14;
      const width = Math.min(360, Math.max(240, window.innerWidth - margin * 2));
      tip.style.maxWidth = width + 'px';
      const tipRect = tip.getBoundingClientRect();
      let left = rect.left + rect.width / 2 - tipRect.width / 2;
      left = Math.max(margin, Math.min(left, window.innerWidth - tipRect.width - margin));
      let top = rect.top - tipRect.height - 12;
      if(top < margin) top = rect.bottom + 12;
      top = Math.max(margin, Math.min(top, window.innerHeight - tipRect.height - margin));
      tip.style.left = Math.round(left) + 'px';
      tip.style.top = Math.round(top) + 'px';
    }
    function hide(){ tip.classList.remove('is-visible'); }
    root.addEventListener('mouseover', ev => { const target = hintTarget(ev); if(target && root.contains(target)) place(target); });
    root.addEventListener('mousemove', ev => { const target = hintTarget(ev); if(target && root.contains(target)) place(target); });
    root.addEventListener('mouseout', ev => { const target = hintTarget(ev); if(target && root.contains(target) && (!ev.relatedTarget || !target.contains(ev.relatedTarget))) hide(); });
    root.addEventListener('focusin', ev => { const target = hintTarget(ev); if(target && root.contains(target)) place(target); });
    root.addEventListener('focusout', ev => { if(hintTarget(ev)) hide(); });
    window.addEventListener('scroll', hide, {passive:true});
    window.addEventListener('resize', hide);
  }

  function render(){
    const blocks=[...document.querySelectorAll('#contrib-sec, .home-contrib-summary, .con-live-leaderboard')].filter(block => !block.closest('#pg-contribute'));
    const targets=blocks.length ? blocks : [];
    if(!targets.length) return;
    const sorted=core.sorted();
    targets.forEach(sec => {
      const pod=sec.querySelector('#podium, .podium');
      const lb=sec.querySelector('#lb-list, .lb');
      if(!pod || !lb) return;
      sec.classList.add('contrib-true-reset');
      ['stable-contrib','contrib-hard-reset','contrib-polished-separated','contrib-overhaul','contrib-spotlight-reset'].forEach(cls=>sec.classList.remove(cls));
      pod.innerHTML = sections.criteriaPanel() + sections.topPodium(sorted);
      lb.innerHTML = sections.rows(sorted);
      const meta=sec.querySelector('#season-meta, .season-meta');
      if(meta) meta.innerHTML = sections.seasonMeta();
      const hist=sec.querySelector('#season-history, .season-history');
      if(hist) hist.innerHTML = sections.historyPanel();
      const rewardGrid=sec.querySelector('.season-reward-grid');
      if(rewardGrid && sections.seasonRewardsPanel) rewardGrid.innerHTML = sections.seasonRewardsPanel();
      const rewardNote=sec.querySelector('.season-reward-note');
      if(rewardNote && sections.seasonRewardsNote) rewardNote.textContent = sections.seasonRewardsNote();
      bindRows(lb);
      bindContributorHints(sec);
    });
  }
  window.Contributors={render, data:core.contributors(), core, sections};
  window.renderContribs=render;
  document.addEventListener('DOMContentLoaded', render);
})();


(function(){
  'use strict';
  if(window.__archlightRoleTooltipBridge) return;
  window.__archlightRoleTooltipBridge = true;

  function ensureTip(){
    var tip = document.getElementById('contrib-floating-hint');
    if(!tip){
      tip = document.createElement('div');
      tip.id = 'contrib-floating-hint';
      tip.setAttribute('role','tooltip');
      document.body.appendChild(tip);
    }
    return tip;
  }

  var selector = [
    '.profile-page .role-chip[data-role-help]',
    '.profile-page .rank-stars-badge[data-role-help]',
    '.profile-page .profile-main-role[data-role-help]',
    '.profile-page .profile-earned-role[data-role-help]',
    '.profile-page .placing-chip[data-hint]',
    '#contrib-sec .role-chip[data-role-help]',
    '#contrib-sec .rank-stars-badge[data-role-help]',
    '#contrib-sec .contrib-hint-value[data-hint]',
    '#contrib-sec .placing-chip[data-hint]',
    '#contrib-sec .focus-rank[data-hint]',
    '#contrib-sec .focus-reward[data-hint]',
    '#contrib-sec .focus-chip[data-hint]',
    '.con-live-leaderboard .con-live-value-hint[data-hint]',
    '.metric-pill [data-hint]'
  ].join(',');

  function targetFrom(ev){
    return ev && ev.target && ev.target.closest ? ev.target.closest(selector) : null;
  }
  function textFor(target){
    if(!target) return '';
    return (target.getAttribute('data-role-help') || target.getAttribute('data-hint') || target.getAttribute('aria-label') || '').trim();
  }
  function show(target){
    var text = textFor(target);
    if(!text) return hide();
    var tip = ensureTip();
    tip.textContent = text;
    tip.classList.add('is-visible');
    tip.style.left = '-9999px';
    tip.style.top = '-9999px';
    tip.style.maxWidth = Math.min(360, Math.max(230, window.innerWidth - 28)) + 'px';

    var rect = target.getBoundingClientRect();
    var tipRect = tip.getBoundingClientRect();
    var gap = 12;
    var margin = 14;
    var left = rect.left + rect.width / 2 - tipRect.width / 2;
    left = Math.max(margin, Math.min(left, window.innerWidth - tipRect.width - margin));

    var top = rect.top - tipRect.height - gap;
    if(top < margin) top = rect.bottom + gap;
    top = Math.max(margin, Math.min(top, window.innerHeight - tipRect.height - margin));

    tip.style.left = Math.round(left) + 'px';
    tip.style.top = Math.round(top) + 'px';
  }
  function hide(){
    var tip = document.getElementById('contrib-floating-hint');
    if(tip) tip.classList.remove('is-visible');
  }

  document.addEventListener('mouseover', function(ev){ var t = targetFrom(ev); if(t) show(t); }, true);
  document.addEventListener('mousemove', function(ev){ var t = targetFrom(ev); if(t) show(t); }, true);
  document.addEventListener('mouseout', function(ev){
    var t = targetFrom(ev);
    if(t && (!ev.relatedTarget || !t.contains(ev.relatedTarget))) hide();
  }, true);
  document.addEventListener('focusin', function(ev){ var t = targetFrom(ev); if(t) show(t); }, true);
  document.addEventListener('focusout', function(ev){ if(targetFrom(ev)) hide(); }, true);
  window.addEventListener('scroll', hide, {passive:true});
  window.addEventListener('resize', hide);
})();
