(function(){
  function init(root){
    root = root || document.getElementById('pg-progression-gates');
    if(!root || root.__unlocksBoardReady) return false;
    const filterBar = root.querySelector('.utk81-filter');
    if(!filterBar) return false;
    root.__unlocksBoardReady = true;

    function applyFilter(value){
      const filter = String(value || 'all').toLowerCase();
      root.setAttribute('data-utk-filter', filter);
      filterBar.querySelectorAll('.utk81-sigil[data-utk-filter]').forEach(btn => {
        btn.classList.toggle('active', String(btn.dataset.utkFilter || 'all').toLowerCase() === filter);
        btn.setAttribute('aria-pressed', String(String(btn.dataset.utkFilter || 'all').toLowerCase() === filter));
      });
      let shown = 0;
      root.querySelectorAll('.utk81-card[data-utk-type]').forEach(card => {
        const type = String(card.dataset.utkType || '').toLowerCase();
        const hidden = filter !== 'all' && type !== filter;
        card.classList.toggle('utk81-hidden', hidden);
        card.hidden = hidden;
        if(!hidden) shown += 1;
      });
      root.querySelectorAll('.utk81-ledger [data-utk-type]').forEach(row => {
        const type = String(row.dataset.utkType || '').toLowerCase();
        row.hidden = filter !== 'all' && type !== filter;
      });
      const count = root.querySelector('#utk81Count');
      if(count) count.textContent = shown + ' shown';
    }

    filterBar.addEventListener('click', function(e){
      const btn = e.target.closest('.utk81-sigil[data-utk-filter]');
      if(!btn || !filterBar.contains(btn)) return;
      e.preventDefault();
      e.stopPropagation();
      applyFilter(btn.dataset.utkFilter || 'all');
    });

    applyFilter(root.getAttribute('data-utk-filter') || 'all');
    return true;
  }

  window.UnlocksBoard = { init };
})();
