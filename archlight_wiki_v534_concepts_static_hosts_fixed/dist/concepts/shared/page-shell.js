(function(){
  function qs(sel,root){return (root||document).querySelector(sel)}
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel))}

  function getTargetId(link){
    return link.getAttribute('data-section-target') || link.getAttribute('data-target') || '';
  }

  function sectionLinks(){
    return qsa('.ut-section-nav button[data-section-target], .ut-section-nav button[data-target], .ut-section-nav a[data-section-target], .ut-section-nav a[data-target]');
  }

  function setActiveNav(id){
    if(!id)return;
    sectionLinks().forEach(function(x){
      var isActive=getTargetId(x)===id;
      x.classList.toggle('active',isActive);
      x.classList.toggle('is-active',isActive);
      if(isActive){x.setAttribute('aria-current','true')}else{x.removeAttribute('aria-current')}
    });
  }

  sectionLinks().forEach(function(link){
    link.addEventListener('click',function(e){
      var id=getTargetId(link);
      var target=id&&document.getElementById(id);
      if(!target)return;
      e.preventDefault();
      setActiveNav(id);
      target.scrollIntoView({behavior:'smooth',block:'start'});
      if(history && history.replaceState){history.replaceState(null,'','#'+id)}
    });
  });

  var sections=sectionLinks().map(function(link){return document.getElementById(getTargetId(link))}).filter(Boolean);
  if(sections.length && 'IntersectionObserver' in window){
    var observer=new IntersectionObserver(function(entries){
      var visible=entries.filter(function(entry){return entry.isIntersecting}).sort(function(a,b){return b.intersectionRatio-a.intersectionRatio})[0];
      if(visible && visible.target && visible.target.id){setActiveNav(visible.target.id)}
    },{root:null,rootMargin:'-18% 0px -64% 0px',threshold:[0.12,0.24,0.4,0.6]});
    sections.forEach(function(section){observer.observe(section)});
  }

  if(location.hash){
    var initial=location.hash.slice(1);
    if(document.getElementById(initial)){setActiveNav(initial)}
  }

  qsa('[data-filter-value]').forEach(function(button){
    button.addEventListener('click',function(){
      var group=button.closest('[data-custom-filter-group]');
      if(!group)return;
      var value=button.getAttribute('data-filter-value');
      qsa('[data-filter-value]',group).forEach(function(x){x.classList.remove('is-active')});
      button.classList.add('is-active');
      var scope=group.getAttribute('data-custom-filter-group');
      qsa('[data-custom-item="'+scope+'"]').forEach(function(item){
        var match=value==='all'||item.getAttribute('data-category')===value;
        item.hidden=!match;
      });
    });
  });
  qsa('[data-custom-search]').forEach(function(input){
    input.addEventListener('input',function(){
      var scope=input.getAttribute('data-custom-search');
      var q=input.value.trim().toLowerCase();
      qsa('[data-custom-item="'+scope+'"]').forEach(function(item){
        var text=(item.getAttribute('data-search')||item.textContent||'').toLowerCase();
        item.hidden=q && text.indexOf(q)===-1;
      });
    });
  });
  var lightbox=qs('.aw-lightbox');
  if(lightbox){
    var img=qs('img',lightbox), caption=qs('.aw-lightbox-caption',lightbox), close=qs('.aw-lightbox-close',lightbox);
    qsa('[data-lightbox-src]').forEach(function(btn){
      btn.addEventListener('click',function(){
        img.src=btn.getAttribute('data-lightbox-src');
        img.alt=btn.getAttribute('data-lightbox-alt')||'';
        caption.textContent=btn.getAttribute('data-lightbox-caption')||'';
        lightbox.classList.add('is-open');
      });
    });
    function hide(){lightbox.classList.remove('is-open');img.removeAttribute('src')}
    close&&close.addEventListener('click',hide);
    lightbox.addEventListener('click',function(e){if(e.target===lightbox)hide()});
    document.addEventListener('keydown',function(e){if(e.key==='Escape')hide()});
  }
})();
