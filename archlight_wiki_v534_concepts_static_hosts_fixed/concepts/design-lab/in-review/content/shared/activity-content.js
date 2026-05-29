
(function(){
  const pages=document.querySelectorAll('.activity-page');
  if(!pages.length) return;
  document.querySelectorAll('.activity-page .ut-section-nav [data-section-target]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const id=btn.getAttribute('data-section-target');
      const target=document.getElementById(id);
      if(!target) return;
      document.querySelectorAll('.activity-page .ut-section-nav [data-section-target]').forEach(b=>b.classList.remove('active','is-active'));
      btn.classList.add('active','is-active');
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
})();
