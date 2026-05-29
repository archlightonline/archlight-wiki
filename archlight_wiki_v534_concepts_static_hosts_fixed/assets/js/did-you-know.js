(function(){
  'use strict';
  const STORAGE_KEY = 'archlight_clean_dyk_submissions';
  const ADMIN_TIPS_KEY = 'archlight_admin_tips';
  const BUILTIN_TIPS = [
    {ico:'🗡️', text:'<strong>Rogues</strong> have the highest attack speed cap at <strong>10/10</strong>. Stack Dexterity to reach it early.', source:'Classes'},
    {ico:'⚡', text:'Your <strong>Energy</strong> caps at 1000 and regenerates every few hours. Do not let it sit capped; keep a profession task moving.', source:'Beginner\'s Guide'},
    {ico:'💡', text:'<strong>Rifts</strong> are one of the strongest progression loops before and after Awakening. Check the teleporter rotation often.', source:'Beginner\'s Guide'},
    {ico:'💎', text:'You can <strong>combine 3 gems</strong> of the same type and tier into one gem of the next tier using the combine UI.', source:'Gems'},
    {ico:'🔁', text:'On <strong>Prestige</strong>, you keep gear, professions, mounts, gold, and recipes. Your character level is what resets.', source:'Prestige'},
    {ico:'⚔️', text:'<strong>Specializations</strong> unlock after all three Promotions and Awakening at level 1500.', source:'Awakening'},
    {ico:'🛡️', text:'<strong>Guardians</strong> are the only class that can use shields, giving them unique defensive gearing options.', source:'Classes'},
    {ico:'📜', text:'The <strong>third Promotion</strong> is earned through the Warlords side quest at level 900.', source:'Quests'},
    {ico:'🧪', text:'<strong>Gem Removers</strong> let you pull socketed gems without destroying them. Use them before replacing valuable gems.', source:'Gems'},
    {ico:'🏆', text:'<strong>Feats</strong> track passively as you play and show veteran progression across the server.', source:'Feats'},
    {ico:'⏰', text:'Daily tasks reset at server midnight. Build streak habits early so rewards do not fall behind.', source:'Dailies'},
    {ico:'🏺', text:'Unwanted <strong>Relics</strong> can be salvaged into shards used to upgrade better relics later.', source:'Relics'},
    {ico:'🐲', text:'<strong>Dragonkin</strong> are valuable farming targets when you need crafting materials from volcanic zones.', source:'Monsters'},
    {ico:'💰', text:'Many monsters can drop <strong>Gold Nuggets and Archlight Tokens</strong>, so routine farming can still produce useful currency.', source:'Monsters'},
    {ico:'🧿', text:'A <strong>Tamer</strong> relies heavily on its companion beast. Judge the vocation by total output, not the player auto-attack alone.', source:'Classes'}
  ];

  let index = 0;
  let timer = null;
  let animating = false;

  function $(id){return document.getElementById(id);}
  function readAdminTips(){
    try{
      const parsed = JSON.parse(localStorage.getItem(ADMIN_TIPS_KEY) || 'null');
      return Array.isArray(parsed) ? parsed.filter(t => t && t.text) : null;
    }catch(e){ return null; }
  }
  function saveAdminTips(tips){
    try{ localStorage.setItem(ADMIN_TIPS_KEY, JSON.stringify((tips||[]).filter(t=>t&&t.text))); }catch(e){}
  }
  function readSubmittedTips(){
    try{
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter(t => t && t.text) : [];
    }catch(e){ return []; }
  }
  function saveSubmittedTips(tips){
    try{ localStorage.setItem(STORAGE_KEY, JSON.stringify(tips.slice(-40))); }catch(e){}
  }
  function allTips(){ return readAdminTips() || BUILTIN_TIPS.concat(readSubmittedTips()); }
  function getTips(){ return allTips().map(t => Object.assign({}, t)); }
  function setTips(tips){ saveAdminTips(tips); show(Math.min(index, Math.max(0, allTips().length-1)), false); start(); }
  function addTip(tip){ const tips=getTips(); tips.push(tip); setTips(tips); }
  function updateTip(i, tip){ const tips=getTips(); if(tips[i]){ tips[i]=Object.assign({}, tips[i], tip); setTips(tips); } }
  function removeTip(i){ const tips=getTips(); if(tips[i]){ tips.splice(i,1); setTips(tips); } }
  function formatTipText(text){ return sanitizeText(text); }
  function resetProgress(){ const bar=$('dyk-bar'); if(bar){ bar.style.animation='none'; void bar.offsetHeight; bar.style.animation=''; } }
  function dotButton(i, active){ return '<button type="button" class="dyk-dot'+(active?' on':'')+'" aria-label="Show tip '+(i+1)+'" data-dyk-dot="'+i+'"></button>'; }
  function show(nextIndex, animate){
    const tips = allTips();
    if(!tips.length) return;
    index = ((nextIndex % tips.length) + tips.length) % tips.length;
    const tip = tips[index];
    const text=$('dyk-text'), ico=$('dyk-ico'), source=$('dyk-source'), counter=$('dyk-counter'), dots=$('dyk-dots');
    function apply(){
      if(ico) ico.textContent = tip.ico || '✨';
      if(text) text.innerHTML = tip.text || '';
      if(source) source.textContent = tip.source ? '— ' + tip.source : '';
      if(counter) counter.textContent = (index + 1) + ' / ' + tips.length;
      if(dots){
        const visible = Math.min(tips.length, 8);
        let html = '';
        for(let i=0;i<visible;i++) html += dotButton(i, i === index);
        if(tips.length > 8) html += '<span class="dyk-more">+'+(tips.length-visible)+'</span>';
        dots.innerHTML = html;
      }
      resetProgress();
      if(text) text.classList.remove('fading');
      animating = false;
    }
    if(animate && text && !animating){
      animating = true;
      text.classList.add('fading');
      window.setTimeout(apply, 240);
    }else{
      apply();
    }
  }
  function start(){
    window.clearTimeout(timer);
    timer = window.setTimeout(function(){ show(index + 1, true); start(); }, 8000);
  }
  function nav(dir){ window.clearTimeout(timer); show(index + dir, true); start(); }
  function ensureModal(){
    let modal = document.querySelector('.dyk-submit-modal');
    if(modal) return modal;
    modal = document.createElement('div');
    modal.className = 'dyk-submit-modal';
    modal.innerHTML = '<div class="dyk-submit-panel" role="dialog" aria-modal="true" aria-labelledby="dyk-submit-title">'
      + '<div class="dyk-submit-title" id="dyk-submit-title">Submit an Archlight Tip</div>'
      + '<div class="dyk-submit-copy">Share a useful player tip while signed in. Approved preview submissions instantly add <strong>5 contribution stars</strong> to your local wiki profile.</div>'
      + '<div class="dyk-submit-signer" id="dyk-submit-signer">Signed in as contributor</div>'
      + '<div class="dyk-submit-grid">'
      + '<label>Tip<textarea id="dyk-submit-text" placeholder="Write a useful Archlight tip..."></textarea></label>'
      + '<label>Source / page<input id="dyk-submit-source" autocomplete="off" placeholder="Optional, e.g. Gems, Rifts, Classes"></label>'
      + '</div>'
      + '<div class="dyk-submit-actions"><button type="button" class="ghost" data-dyk-close>Cancel</button><button type="button" class="primary" data-dyk-save>Submit Tip</button></div>'
      + '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', function(e){ if(e.target === modal || e.target.closest('[data-dyk-close]')) closeSubmit(); });
    modal.querySelector('[data-dyk-save]').addEventListener('click', saveTipFromModal);
    return modal;
  }
  function openSubmit(){
    if(!window.currentUser){
      alert('Please log in before submitting a tip.');
      if(typeof window.openLoginModal === 'function') window.openLoginModal();
      return;
    }
    const modal = ensureModal();
    const signer = $('dyk-submit-signer');
    if(signer) signer.innerHTML = 'Submitting as <strong>' + sanitizeText(window.currentUser || 'Contributor') + '</strong> · +5 contribution stars';
    modal.classList.add('open');
    const tipBox = $('dyk-submit-text'); if(tipBox) tipBox.focus();
  }
  function closeSubmit(){ const modal=document.querySelector('.dyk-submit-modal'); if(modal) modal.classList.remove('open'); }
  function sanitizeText(text){
    return String(text || '')
      .replace(/[&<>]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;'}[ch]))
      .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  }
  function awardTipStars(sourceElement){
    const name = String(window.currentUser || '').trim();
    if(!name) return;
    const key = 'archlight_tip_stars_v1';
    let state = {};
    try{ state = JSON.parse(localStorage.getItem(key) || '{}') || {}; }catch(e){ state = {}; }
    const id = name.toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
    state[id] = Math.max(0, Number(state[id] || 0)) + 5;
    try{ localStorage.setItem(key, JSON.stringify(state)); }catch(e){}
    document.dispatchEvent(new CustomEvent('archlight:tip-stars-awarded', {detail:{name, stars:5, sourceElement:sourceElement || null, source:'sharing a player tip'}}));
    document.dispatchEvent(new Event('archlight:session-change'));
  }
  function saveTipFromModal(){
    if(!window.currentUser){ alert('Please log in before submitting a tip.'); closeSubmit(); if(typeof window.openLoginModal === 'function') window.openLoginModal(); return; }
    const raw = ($('dyk-submit-text')?.value || '').trim();
    const source = ($('dyk-submit-source')?.value || '').trim();
    if(!raw || raw.length < 15){ alert('Write a useful tip with at least 15 characters.'); return; }
    const tips = readSubmittedTips();
    const byline = 'by ' + sanitizeText(window.currentUser);
    tips.push({ico:'⭐', text:sanitizeText(raw), source: source ? sanitizeText(source) + ' — ' + byline : byline});
    saveSubmittedTips(tips);
    awardTipStars(document.querySelector('[data-dyk-submit]') || document.querySelector('.dyk-submit-modal') || null);
    closeSubmit();
    if($('dyk-submit-text')) $('dyk-submit-text').value='';
    if($('dyk-submit-source')) $('dyk-submit-source').value='';
    show(allTips().length - 1, true);
    start();
  }
  function bind(){
    const sec = $('dyk-section');
    if(!sec || sec.dataset.cleanDykBound === '1') return;
    sec.dataset.cleanDykBound = '1';
    const prev = sec.querySelector('[data-dyk-prev]');
    const next = sec.querySelector('[data-dyk-next]');
    const submit = sec.querySelector('[data-dyk-submit]');
    if(prev) prev.addEventListener('click', () => nav(-1));
    if(next) next.addEventListener('click', () => nav(1));
    if(submit) submit.addEventListener('click', openSubmit);
    const dots = $('dyk-dots');
    if(dots) dots.addEventListener('click', function(e){ const btn=e.target.closest('[data-dyk-dot]'); if(btn){ window.clearTimeout(timer); show(Number(btn.dataset.dykDot)||0, true); start(); } });
    show(0, false);
    start();
  }

  window.ArchlightDidYouKnow = {init: bind, show, nav, openSubmit, tips: BUILTIN_TIPS, getTips, setTips, addTip, updateTip, removeTip, formatTipText};
  window.dykNav = nav;
  window.openDykSubmit = openSubmit;
  document.addEventListener('DOMContentLoaded', bind);
})();
