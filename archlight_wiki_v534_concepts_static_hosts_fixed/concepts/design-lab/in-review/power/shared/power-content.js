document.addEventListener('DOMContentLoaded',()=>{
  document.querySelectorAll('.pw-table-wrap').forEach(w=>{ if(w.scrollWidth>w.clientWidth) w.dataset.scroll='x'; });
});
