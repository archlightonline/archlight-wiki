(function(){
  const COPY_CLASS = 'section-copy-link';
  const FOCUS_CLASS = 'section-deep-focus';
  const SECTION_SELECTOR = '[data-ut-section], .ut-panel, .aw-section, .wiki-content section, section[id]';

  function qs(sel, root){ return (root || document).querySelector(sel); }
  function qsa(sel, root){ return Array.from((root || document).querySelectorAll(sel)); }

  function cleanRoute(id){
    id = String(id || 'home').trim().replace(/^#/, '');
    if(id.startsWith('pg-')) id = id.slice(3);
    return id || 'home';
  }

  function decodePart(value){
    try{ return decodeURIComponent(String(value || '').trim()); }
    catch(e){ return String(value || '').trim(); }
  }

  function slug(text){
    return String(text || '')
      .toLowerCase()
      .replace(/&amp;/g, 'and')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 72) || 'section';
  }

  function parseHash(value){
    let raw = String(value || location.hash || '#home').replace(/^#/, '').trim();
    if(!raw) raw = 'home';
    raw = raw.replace(/^pg-/, '');
    const slash = raw.indexOf('/');
    if(slash === -1) return { page: cleanRoute(raw), section: '' };
    return {
      page: cleanRoute(raw.slice(0, slash)),
      section: decodePart(raw.slice(slash + 1).replace(/^section\//, ''))
    };
  }

  function activePage(pageId){
    return qs('#pg-' + cleanRoute(pageId)) || qs('#main > .pg.on');
  }

  function sectionTitle(section){
    const heading = qs('.ut-section-titleblock h2, .ut-section-head h2, h2, h3, h4, .dump-h', section);
    return heading ? heading.textContent.trim() : (section.getAttribute('aria-label') || section.id || 'Section');
  }

  function pageSections(pageId){
    const page = activePage(pageId);
    if(!page) return [];
    return qsa(SECTION_SELECTOR, page).filter(section => {
      if(section.closest('.ut-side, aside, nav')) return false;
      if(isUtilityOrAnnouncementSection(section)) return false;
      const title = sectionTitle(section);
      return title && section.getBoundingClientRect;
    });
  }

  function isUtilityOrAnnouncementSection(section){
    if(!section) return true;
    /* Home and Contribute contain interactive cards, podiums, forms, and injected widgets.
       Do not add section-copy controls there, because they break hero/title composition. */
    if(section.closest && section.closest('#pg-home, #pg-contribute')) return true;
    if(section.id === 'home-announcements') return true;
    if(section.classList && (section.classList.contains('home-alerts') || section.classList.contains('ha-card'))) return true;
    if(section.closest && section.closest('#home-announcements, .home-alerts, .ha-card, .section-action-tools, .profile-popover')) return true;
    return false;
  }

  function uniqueKey(base, used){
    let key = base || 'section';
    let out = key;
    let i = 2;
    while(used.has(out)){ out = key + '-' + i; i += 1; }
    used.add(out);
    return out;
  }

  function ensureSectionMap(pageId){
    const route = cleanRoute(pageId);
    const sections = pageSections(route).filter(section => !isUtilityOrAnnouncementSection(section));
    const used = new Set();
    sections.forEach((section, index) => {
      const existing = section.getAttribute('data-deeplink-section') || section.id || '';
      const title = sectionTitle(section);
      const key = uniqueKey(slug(existing && !/^pg-/.test(existing) ? existing : title), used);
      section.setAttribute('data-deeplink-section', key);
      section.setAttribute('data-deeplink-page', route);
      section.classList.add('deep-linkable-section');
      if(!section.id){ section.id = route + '--' + key; }
      addCopyButton(section, route, key, index);
    });
    syncTocTargets(route);
    return sections;
  }

  function sectionUrl(pageId, sectionKey){
    const page = cleanRoute(pageId);
    const key = encodeURIComponent(String(sectionKey || '').trim());
    return location.origin + location.pathname + location.search + '#' + page + (key ? '/' + key : '');
  }

  function writeClipboard(text){
    if(navigator.clipboard && navigator.clipboard.writeText){ return navigator.clipboard.writeText(text); }
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try{ ok = document.execCommand('copy'); }catch(e){ ok = false; }
    ta.remove();
    return ok ? Promise.resolve() : Promise.reject(new Error('copy failed'));
  }

  function showToast(text){
    let toast = qs('.section-link-toast');
    if(!toast){
      toast = document.createElement('div');
      toast.className = 'section-link-toast';
      document.body.appendChild(toast);
    }
    toast.innerHTML = '<b>Direct section link</b><span>' + String(text || '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch])) + '</span>';
    toast.classList.remove('show');
    void toast.offsetWidth;
    toast.classList.add('show');
    clearTimeout(toast.__t);
    toast.__t = setTimeout(() => toast.classList.remove('show'), 2100);
  }

  function ensureSectionTools(section, pageId, key, index){
    if(qs(':scope > .section-action-tools', section) || qs('.section-action-tools', section)) return;
    const titleBlock = qs('.ut-section-titleblock, .ut-section-head, h2, h3, h4, .dump-h', section);
    if(!titleBlock) return;
    const tools = document.createElement('div');
    tools.className = 'section-action-tools';
    tools.setAttribute('aria-label', 'Section actions');

    const copyBtn = document.createElement('button');
    copyBtn.type = 'button';
    copyBtn.className = COPY_CLASS;
    copyBtn.setAttribute('aria-label', 'Copy a player-ready link to this exact section');
    copyBtn.dataset.sectionLink = key;
    copyBtn.dataset.sectionPage = cleanRoute(pageId);
    copyBtn.innerHTML = '<span aria-hidden="true">⛓</span><b>Copy section link</b><small>Direct link</small>';
    tools.appendChild(copyBtn);

    const head = titleBlock.closest && titleBlock.closest('.ut-section-head');
    if(head) head.insertAdjacentElement('afterend', tools);
    else titleBlock.insertAdjacentElement('afterend', tools);
  }

  function addCopyButton(section, pageId, key, index){
    ensureSectionTools(section, pageId, key, index);
  }

  function findSection(pageId, key){
    const route = cleanRoute(pageId);
    const wanted = slug(decodePart(key));
    const sections = ensureSectionMap(route);
    return sections.find(section => {
      const sectionKey = section.getAttribute('data-deeplink-section');
      return sectionKey === wanted || slug(section.id) === wanted || slug(sectionTitle(section)) === wanted;
    }) || null;
  }

  function focusSection(section, behavior){
    if(!section) return false;
    section.scrollIntoView({ behavior: behavior || 'smooth', block: 'start' });
    section.classList.remove(FOCUS_CLASS);
    const oldBadge = section.querySelector(':scope > .section-arrival-badge');
    if(oldBadge) oldBadge.remove();
    const badge = document.createElement('div');
    badge.className = 'section-arrival-badge';
    badge.innerHTML = '<span aria-hidden="true">✦</span><b>Linked section</b>';
    section.appendChild(badge);
    void section.offsetWidth;
    section.classList.add(FOCUS_CLASS);
    clearTimeout(section.__deepFocusTimer);
    section.__deepFocusTimer = setTimeout(() => {
      section.classList.remove(FOCUS_CLASS);
      badge.remove();
    }, 4300);
    const key = section.getAttribute('data-deeplink-section');
    const page = section.getAttribute('data-deeplink-page');
    updateActiveToc(page, key);
    return true;
  }

  function updateHash(pageId, sectionKey, mode){
    const page = cleanRoute(pageId);
    const target = '#' + page + (sectionKey ? '/' + encodeURIComponent(sectionKey) : '');
    if(location.hash === target) return;
    if(mode === 'replace') history.replaceState(null, '', target);
    else history.pushState(null, '', target);
  }

  function syncTocTargets(pageId){
    const page = activePage(pageId);
    if(!page) return;
    qsa('[data-section-target]', page).forEach(btn => {
      const raw = btn.getAttribute('data-section-target') || '';
      let target = page.querySelector('#' + CSS.escape(raw));
      if(!target) target = findByDeepKey(page, raw);
      if(target){
        const key = target.getAttribute('data-deeplink-section') || slug(sectionTitle(target));
        btn.setAttribute('data-section-link-key', key);
        btn.setAttribute('data-section-link-page', cleanRoute(pageId));
        btn.title = 'Jump to this section and update the direct link';
      }
    });
  }

  function findByDeepKey(page, raw){
    const wanted = slug(raw);
    return qsa(SECTION_SELECTOR, page).find(section => {
      return section.getAttribute('data-deeplink-section') === wanted || slug(section.id) === wanted || slug(sectionTitle(section)) === wanted;
    }) || null;
  }

  function updateActiveToc(pageId, sectionKey){
    const page = activePage(pageId);
    if(!page || !sectionKey) return;
    qsa('[data-section-target]', page).forEach(btn => {
      const active = btn.getAttribute('data-section-link-key') === sectionKey || slug(btn.getAttribute('data-section-target')) === sectionKey;
      btn.classList.toggle('deep-link-active', active);
      if(active) btn.setAttribute('aria-current', 'true');
      else btn.removeAttribute('aria-current');
    });
  }

  function afterRoute(pageId, sectionKey){
    const page = cleanRoute(pageId);
    ensureSectionMap(page);
    if(sectionKey){
      requestAnimationFrame(() => {
        const section = findSection(page, sectionKey);
        if(section) focusSection(section, 'smooth');
      });
    }
  }

  document.addEventListener('click', function(e){
    const copy = e.target.closest('.' + COPY_CLASS);
    if(copy){
      e.preventDefault();
      e.stopPropagation();
      const page = copy.dataset.sectionPage || cleanRoute((qs('#main > .pg.on') || {}).id || '').replace(/^pg-/, '');
      const key = copy.dataset.sectionLink || '';
      const url = sectionUrl(page, key);
      writeClipboard(url).then(() => { copy.classList.add('is-copied'); setTimeout(() => copy.classList.remove('is-copied'), 1500); showToast('Copied section link. This link opens directly to this exact section.'); }).catch(() => showToast('Could not copy automatically. The URL now points to this section.'));
      updateHash(page, key, 'push');
      const section = findSection(page, key);
      if(section) focusSection(section, 'smooth');
      return;
    }


    const targetBtn = e.target.closest('[data-section-target]');
    if(targetBtn){
      const page = targetBtn.getAttribute('data-section-link-page') || cleanRoute((qs('#main > .pg.on') || {}).id || '').replace(/^pg-/, '');
      ensureSectionMap(page);
      const key = targetBtn.getAttribute('data-section-link-key') || slug(targetBtn.getAttribute('data-section-target'));
      const section = findSection(page, key) || qs('#' + CSS.escape(targetBtn.getAttribute('data-section-target') || ''));
      if(section){
        updateHash(page, section.getAttribute('data-deeplink-section') || key, 'push');
        setTimeout(() => focusSection(section, 'smooth'), 0);
      }
    }
  }, true);

  window.ArchlightDeepLinks = {
    parseHash,
    afterRoute,
    ensureSectionMap,
    sectionUrl,
    focusSection,
    updateHash
  };
})();
