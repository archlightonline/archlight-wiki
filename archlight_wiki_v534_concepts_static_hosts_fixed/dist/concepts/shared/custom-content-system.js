(() => {
  'use strict';
  function closestCaption(img){
    const figure = img.closest('figure');
    const caption = figure?.querySelector('figcaption,b')?.textContent?.trim();
    return caption || img.alt || img.getAttribute('data-title') || 'Wiki media';
  }
  function ensureLightbox(){
    let box = document.querySelector('.ccs-lightbox');
    if(box) return box;
    box = document.createElement('div');
    box.className = 'ccs-lightbox';
    box.hidden = true;
    box.innerHTML = '<div class="ccs-lightbox-head"><div class="ccs-lightbox-title"></div><button type="button" class="ccs-lightbox-close">Close</button></div><div class="ccs-lightbox-body"><img alt=""></div>';
    document.body.appendChild(box);
    const close = () => { box.hidden = true; document.documentElement.style.overflow = ''; };
    box.querySelector('.ccs-lightbox-close').addEventListener('click', close);
    box.addEventListener('click', e => { if(e.target === box || e.target.classList.contains('ccs-lightbox-body')) close(); });
    window.addEventListener('keydown', e => { if(e.key === 'Escape' && !box.hidden) close(); });
    return box;
  }
  function openImage(img){
    const src = img.currentSrc || img.src;
    if(!src) return;
    const box = ensureLightbox();
    const out = box.querySelector('img');
    box.querySelector('.ccs-lightbox-title').textContent = closestCaption(img);
    out.src = src;
    out.alt = img.alt || closestCaption(img);
    box.hidden = false;
    document.documentElement.style.overflow = 'hidden';
  }
  function shouldOpen(img){
    if(!img.closest('.ut-body')) return false;
    if(img.closest('.addon-media,.feat-media,.companion-media')) return false;
    if(img.naturalWidth && img.naturalWidth < 32 && img.naturalHeight < 32) return false;
    return true;
  }
  document.addEventListener('click', e => {
    const img = e.target.closest?.('.ut-body img');
    if(!img || !shouldOpen(img)) return;
    e.preventDefault();
    openImage(img);
  });
})();
