
(function(){
  function qsa(sel,root){return Array.prototype.slice.call((root||document).querySelectorAll(sel));}
  function norm(v){return (v||'').toLowerCase();}
  qsa('[data-pg-filter-group]').forEach(function(group){
    var scope=group.getAttribute('data-pg-filter-group');
    qsa('[data-pg-filter]',group).forEach(function(btn){
      btn.addEventListener('click',function(){
        var val=btn.getAttribute('data-pg-filter');
        qsa('[data-pg-filter]',group).forEach(function(x){x.classList.remove('is-active')});
        btn.classList.add('is-active');
        qsa('[data-pg-item="'+scope+'"]').forEach(function(item){
          var cat=item.getAttribute('data-category')||'';
          var show=val==='all'||cat===val;
          item.hidden=!show;
        });
      });
    });
  });
  qsa('[data-pg-search]').forEach(function(input){
    input.addEventListener('input',function(){
      var scope=input.getAttribute('data-pg-search');
      var v=norm(input.value.trim());
      qsa('[data-pg-item="'+scope+'"]').forEach(function(item){
        var text=norm(item.getAttribute('data-search')||item.textContent);
        item.hidden=!!v && text.indexOf(v)===-1;
      });
    });
  });
  qsa('[data-class-pick]').forEach(function(btn){
    btn.addEventListener('click',function(){
      var id=btn.getAttribute('data-class-pick');
      qsa('[data-class-pick]').forEach(function(x){x.classList.toggle('is-active',x===btn)});
      qsa('[data-class-panel]').forEach(function(panel){panel.hidden=panel.getAttribute('data-class-panel')!==id;});
    });
  });
})();
