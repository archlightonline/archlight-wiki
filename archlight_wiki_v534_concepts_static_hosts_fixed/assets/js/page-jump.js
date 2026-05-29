(function(){
  function ready(fn){ if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',fn); else fn(); }
  ready(function(){
    if(document.querySelector('.page-jump-rail')) return;
    var rail=document.createElement('div');
    rail.className='page-jump-rail';
    rail.setAttribute('aria-label','Page jump controls');
    rail.innerHTML='<button class="page-jump-btn" type="button" data-jump="top" aria-label="Jump to top"><span>▲</span><em class="page-jump-tip">Top of page</em></button><div class="page-jump-orb" aria-hidden="true"><i></i></div><button class="page-jump-btn" type="button" data-jump="bottom" aria-label="Jump to bottom"><span>▼</span><em class="page-jump-tip">Bottom of page</em></button>';
    document.body.appendChild(rail);
    function maxScroll(){return Math.max(1,document.documentElement.scrollHeight-window.innerHeight)}
    function refresh(){
      var y=window.scrollY || document.documentElement.scrollTop || 0;
      rail.classList.toggle('is-visible', maxScroll()>900 && y>120);
      rail.style.setProperty('--jump-progress', Math.max(0,Math.min(1,y/maxScroll())).toFixed(3));
    }
    rail.addEventListener('click',function(e){
      var btn=e.target.closest('[data-jump]'); if(!btn) return;
      var target=btn.getAttribute('data-jump')==='top'?0:maxScroll()+80;
      window.scrollTo({top:target,behavior:'smooth'});
      btn.animate([{transform:'scale(1)'},{transform:'scale(.92)'},{transform:'scale(1.04)'},{transform:'scale(1)'}],{duration:420,easing:'cubic-bezier(.2,.8,.2,1)'});
    });
    window.addEventListener('scroll',refresh,{passive:true});
    window.addEventListener('resize',refresh);
    document.addEventListener('archlight:navigation',function(){setTimeout(refresh,80)});
    setTimeout(refresh,100);
  });
})();
