(function(){
  'use strict';
  if(window.__archlightScrollProgressV392) return;
  window.__archlightScrollProgressV392 = true;
  function activePage(){ return (location.hash||'#home').replace(/^#/,'') || 'home'; }
  function allowed(){ const p=activePage(); return !['admin','profile'].includes(p); }
  function ensure(){
    let bar=document.getElementById('wiki-scroll-progress'); if(bar) return bar;
    bar=document.createElement('div'); bar.id='wiki-scroll-progress'; bar.innerHTML='<span></span>';
    const top=document.getElementById('topbar'); if(top) top.appendChild(bar); else document.body.appendChild(bar);
    return bar;
  }
  function update(){
    const wrap=ensure(); const bar=wrap.firstElementChild;
    const scrollTop=window.scrollY||document.documentElement.scrollTop||0;
    const max=Math.max(1,(document.documentElement.scrollHeight||document.body.scrollHeight)-window.innerHeight);
    const pct=Math.max(0,Math.min(1,scrollTop/max));
    bar.style.transform='scaleX('+pct+')';
    wrap.classList.toggle('is-visible', allowed() && scrollTop > 140 && max > 500 && pct > .02);
  }
  document.addEventListener('DOMContentLoaded',update);
  window.addEventListener('scroll',update,{passive:true}); window.addEventListener('resize',update); window.addEventListener('hashchange',()=>setTimeout(update,60)); document.addEventListener('click',()=>setTimeout(update,80));
})();
