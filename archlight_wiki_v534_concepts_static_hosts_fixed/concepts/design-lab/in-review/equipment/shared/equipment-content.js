
(function(){
  function setActive(group, index){
    var root = group.closest('.eq-forge-layout');
    if(!root) return;
    root.querySelectorAll('[data-eq-family-button]').forEach(function(btn){ btn.classList.toggle('is-active', btn.getAttribute('data-eq-family-button') === index); });
    root.querySelectorAll('[data-eq-family-panel]').forEach(function(panel){ panel.classList.toggle('is-active', panel.getAttribute('data-eq-family-panel') === index); });
  }
  document.addEventListener('click', function(e){
    var card = e.target.closest('[data-eq-family-button]');
    if(!card) return;
    setActive(card, card.getAttribute('data-eq-family-button'));
  });
})();
