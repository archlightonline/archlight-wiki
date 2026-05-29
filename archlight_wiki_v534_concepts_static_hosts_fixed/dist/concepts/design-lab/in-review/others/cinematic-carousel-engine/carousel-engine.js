(function(){
  var root=document.querySelector('[data-atlas-engine]');
  if(!root) return;
  var slides=[
    {title:'The gates open',text:'Launch crowds, early routes, first tasks, and the screenshots that make an era feel alive.'},
    {title:'The room turns red',text:'Raid calls, world bosses, clutch recovery, rare drops, and the chaos players want to save.'},
    {title:'Routes worth finding',text:'Hidden paths, islands, hunting discoveries, and places players naturally want to show each other.'},
    {title:'The portal appears',text:'Seasonal bosses, event maps, limited rewards, and short event memories that deserve a spotlight.'},
    {title:'Guilds hold the line',text:'Shared wins, first clears, group screenshots, and community moments that make the world feel active.'}
  ];
  var bgs=[].slice.call(root.querySelectorAll('[data-atlas-bg]'));
  var dots=[].slice.call(root.querySelectorAll('[data-atlas-dot]'));
  var title=root.querySelector('[data-atlas-title]');
  var text=root.querySelector('[data-atlas-text]');
  var count=root.querySelector('[data-atlas-count]');
  var index=0;
  var timer=null;
  function pad(n){return String(n).padStart(2,'0');}
  function render(next){
    index=(next+slides.length)%slides.length;
    bgs.forEach(function(el,i){el.classList.toggle('is-active',i===index);});
    dots.forEach(function(el,i){el.classList.toggle('is-active',i===index);});
    if(title) title.textContent=slides[index].title;
    if(text) text.textContent=slides[index].text;
    if(count) count.textContent=pad(index+1)+' / '+pad(slides.length);
  }
  function restart(){clearInterval(timer);timer=setInterval(function(){render(index+1);},7000);}
  function move(step){render(index+step);restart();}
  dots.forEach(function(btn){btn.addEventListener('click',function(){render(Number(btn.dataset.atlasDot)||0);restart();});});
  var prev=root.querySelector('[data-atlas-prev]');
  var next=root.querySelector('[data-atlas-next]');
  if(prev) prev.addEventListener('click',function(){move(-1);});
  if(next) next.addEventListener('click',function(){move(1);});
  restart();
})();
