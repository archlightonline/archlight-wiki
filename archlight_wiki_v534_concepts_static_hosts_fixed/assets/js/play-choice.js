(function(){
  'use strict';
  if(window.ArchlightPlayChoice) return;
  const worlds = [
    {id:'abaldar', name:'Abaldar', tag:'Seasonal World', desc:'Fresh era progression, launch focus, and current seasonal activity.', url:'https://archlightonline.com'},
    {id:'legacy', name:'Legacy', tag:'Persistent World', desc:'Long-term account, older progression, and existing character power.', url:'https://archlightonline.com'}
  ];
  function esc(s){return String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));}
  function ensure(){
    let modal=document.getElementById('play-choice-modal');
    if(modal) return modal;
    modal=document.createElement('div');
    modal.id='play-choice-modal';
    modal.innerHTML='<div class="pcm-panel" role="dialog" aria-modal="true" aria-labelledby="pcm-title">'
      + '<button class="pcm-close" type="button" data-pcm-close aria-label="Close">×</button>'
      + '<div class="pcm-head"><span>Choose your realm</span><h2 id="pcm-title">Where do you want to play?</h2><p>Pick the world site you want to open.</p></div>'
      + '<div class="pcm-worlds">'+worlds.map(w=>'<button type="button" class="pcm-world pcm-'+w.id+'" data-pcm-world="'+w.id+'"><strong>'+esc(w.name)+'</strong><span>'+esc(w.tag)+'</span><p>'+esc(w.desc)+'</p><em>Open site →</em></button>').join('')+'</div>'
      + '</div>';
    document.body.appendChild(modal);
    modal.addEventListener('click', e=>{
      if(e.target===modal || e.target.closest('[data-pcm-close]')) close();
      const btn=e.target.closest('[data-pcm-world]');
      if(btn){ const w=worlds.find(x=>x.id===btn.dataset.pcmWorld) || worlds[0]; window.open(w.url,'_blank'); close(); }
    });
    return modal;
  }
  function open(){ ensure().classList.add('open'); }
  function close(){ const m=document.getElementById('play-choice-modal'); if(m) m.classList.remove('open'); }
  window.ArchlightPlayChoice={open, close};
})();
