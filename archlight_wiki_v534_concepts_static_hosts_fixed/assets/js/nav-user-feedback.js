(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const esc = value => String(value == null ? '' : value).replace(/[&<>"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[ch]));

  function chip(){ return $('nav-user-chip'); }

  function ensureChipAccessibility(){
    const el = chip();
    if(!el) return;
    el.setAttribute('role','button');
    el.setAttribute('tabindex','0');
    el.setAttribute('aria-label','Open profile menu');
    const copy = el.querySelector('#nuc-name') && el.querySelector('#nuc-name').parentElement;
    if(copy && !copy.classList.contains('nuc-copy')) copy.classList.add('nuc-copy');
  }

  function toast(stars, source){
    const old = document.querySelector('.arch-star-toast');
    if(old) old.remove();
    const node = document.createElement('div');
    node.className = 'arch-star-toast';
    node.innerHTML = '<span class="arch-star-toast__mark">★</span><span class="arch-star-toast__copy"><b>Contribution stars earned</b><span>+'+esc(stars)+' stars added for '+esc(source || 'helping the wiki')+'.</span></span>';
    document.body.appendChild(node);
    window.setTimeout(() => node.remove(), 6800);
  }

  function parsePointsText(node){
    if(!node) return 0;
    const match = String(node.textContent || '').replace(/,/g,'').match(/(\d+)/);
    return match ? Math.max(0, Number(match[1] || 0)) : 0;
  }

  function pointIcon(node){
    const icon = node && node.querySelector('i');
    return icon ? icon.textContent || '★' : '★';
  }

  function writePoints(node, value){
    if(!node) return;
    const icon = pointIcon(node);
    node.innerHTML = '<i aria-hidden="true">'+esc(icon)+'</i><span class="nuc-points-value">'+Number(value || 0).toLocaleString()+'</span><span class="nuc-points-label"> stars</span>';
  }

  function pulsePoints(node, strong){
    if(!node) return;
    node.classList.remove('is-star-impact','is-star-impact-strong');
    void node.offsetWidth;
    node.classList.add(strong ? 'is-star-impact-strong' : 'is-star-impact');
    window.setTimeout(() => node.classList.remove('is-star-impact','is-star-impact-strong'), strong ? 720 : 460);
  }

  function animatePointLanding(target, stars, count){
    const points = target && target.querySelector('.nuc-points');
    if(!points) return;
    const gained = Math.max(1, Number(stars || 1));
    const capturedStart = parsePointsText(points);
    const capturedTarget = capturedStart + gained;
    const steps = Math.min(7, Math.max(3, Math.min(gained, count || 4)));
    let lastValue = capturedStart;

    for(let i = 1; i <= steps; i++){
      const delay = 2920 + (i - 1) * 170;
      window.setTimeout(() => {
        const visibleNow = parsePointsText(points);
        const likelyTargetAlreadyShown = visibleNow >= capturedTarget;
        const base = likelyTargetAlreadyShown && i === 1 ? capturedStart : lastValue;
        const nextValue = i === steps ? capturedTarget : Math.min(capturedTarget, base + Math.max(1, Math.round(gained / steps)));
        lastValue = Math.max(lastValue, nextValue);
        writePoints(points, lastValue);
        pulsePoints(points, i === steps);
      }, delay);
    }

    window.setTimeout(() => {
      writePoints(points, capturedTarget);
      pulsePoints(points, true);
      target.classList.remove('is-star-number-awarded');
      void target.offsetWidth;
      target.classList.add('is-star-number-awarded');
      window.setTimeout(() => target.classList.remove('is-star-number-awarded'), 950);
    }, 2920 + steps * 170 + 120);
  }

  function flyStars(stars, sourceEl){
    const target = chip();
    if(!target) return;
    const targetRect = target.getBoundingClientRect();
    const pointsTarget = target.querySelector('.nuc-points');
    const pointsRect = pointsTarget ? pointsTarget.getBoundingClientRect() : targetRect;
    const srcRect = sourceEl && sourceEl.getBoundingClientRect ? sourceEl.getBoundingClientRect() : null;
    const startX = srcRect ? srcRect.left + srcRect.width / 2 : window.innerWidth - 120;
    const startY = srcRect ? srcRect.top + srcRect.height / 2 : 120;
    const endX = pointsRect.left + pointsRect.width * .50;
    const endY = pointsRect.top + pointsRect.height * .50;
    const count = Math.min(18, Math.max(9, Math.round(Number(stars || 1) * 1.3)));
    animatePointLanding(target, stars, count);
    for(let i=0;i<count;i++){
      const star = document.createElement('span');
      star.className = 'arch-star-flyer';
      star.textContent = '★';
      const spreadX = (Math.random() * 56) - 28;
      const spreadY = (Math.random() * 36) - 18;
      star.style.left = '0px';
      star.style.top = '0px';
      star.style.setProperty('--sx', (startX + spreadX) + 'px');
      star.style.setProperty('--sy', (startY + spreadY) + 'px');
      star.style.setProperty('--dx', (endX - 6) + 'px');
      star.style.setProperty('--dy', (endY - 6) + 'px');
      star.style.animationDelay = (i * 150) + 'ms';
      document.body.appendChild(star);
      window.setTimeout(() => star.remove(), 3400 + i * 150);
    }
    target.classList.remove('is-star-awarded');
    void target.offsetWidth;
    target.classList.add('is-star-awarded');
    window.setTimeout(() => target.classList.remove('is-star-awarded'), 3600);
  }

  function award(detail){
    ensureChipAccessibility();
    const stars = Math.max(1, Number(detail && detail.stars || 1));
    const source = (detail && detail.source) || 'a useful contribution';
    toast(stars, source);
    flyStars(stars, detail && detail.sourceElement);
  }

  document.addEventListener('archlight:tip-stars-awarded', event => {
    award(Object.assign({source:'sharing a player tip'}, event.detail || {}));
  });
  document.addEventListener('archlight:contribution-stars-awarded', event => award(event.detail || {}));
  document.addEventListener('DOMContentLoaded', ensureChipAccessibility);
  document.addEventListener('archlight:session-change', ensureChipAccessibility);

  window.ArchlightStarFeedback = { award, refresh: ensureChipAccessibility };
})();
