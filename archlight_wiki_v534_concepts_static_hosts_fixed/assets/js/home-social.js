(function(){
  'use strict';
  // Social links now live in the main navbar so they are always visible.
  // This module is intentionally kept as a safe no-op to avoid stale Home injections.
  function render(){ return; }
  window.HomeSocial = { render };
  document.addEventListener('DOMContentLoaded', render);
})();
