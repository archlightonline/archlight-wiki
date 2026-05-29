(function(){
  'use strict';

  const STORAGE_PREFIX = 'archlight_page_edit_v2:';
  const HIDDEN_PAGE_IDS = new Set(['home','profile','contribute','all-pages','updates','login','admin']);
  const HIDDEN_BODY_CLASSES = ['login-open','admin-open','profile-open','modal-open'];

  const MODES = {
    edit:{icon:'✎', title:'Edit text', hint:'Update the current page text and copy it for review.'},
    issue:{icon:'!', title:'Report issue', hint:'Flag wrong, missing, outdated, or broken content.'},
    idea:{icon:'+', title:'Suggest content', hint:'Propose a section, tip, image, location, or table.'}
  };

  const $ = (sel, root=document) => root.querySelector(sel);
  const $$ = (sel, root=document) => Array.from(root.querySelectorAll(sel));
  const esc = s => String(s || '').replace(/[&<>'"]/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[ch]));
  const norm = id => String(id || 'home').replace(/^#/, '').replace(/^pg-/, '') || 'home';

  function pageEl(){ return $('#main > .pg.on') || $('#pg-home'); }
  function currentId(){ const el = pageEl(); return norm(el && el.id); }
  function titleFromPage(){
    const id = currentId();
    if (window.ArchlightPages && window.ArchlightPages.pageTitle) return window.ArchlightPages.pageTitle(id);
    const el = pageEl();
    return (($('h1,.ptt,.hw-title,.page-title', el) || {}).textContent || id.replace(/-/g, ' ')).trim();
  }
  function cleanLine(s){ return String(s || '').replace(/\s+/g,' ').trim(); }
  function textToHtml(text){
    const blocks = String(text || '').split(/\n{2,}/).map(x => cleanLine(x)).filter(Boolean);
    return blocks.length ? blocks.map(x => '<p>' + esc(x) + '</p>').join('') : '<p></p>';
  }
  function htmlToCleanText(html){
    const tmp = document.createElement('div');
    tmp.innerHTML = html || '';
    tmp.querySelectorAll('br').forEach(br => br.replaceWith('\n'));
    tmp.querySelectorAll('h1,h2,h3,h4,p,li,blockquote,div').forEach(el => {
      if (el.nextSibling) el.appendChild(document.createTextNode('\n'));
    });
    return tmp.textContent.replace(/\n{3,}/g,'\n\n').trim();
  }
  function currentEditor(root){ return $('[data-we-rich-editor]', root || document); }
  function extractPageText(){
    const src = pageEl();
    if (!src) return '';
    const clone = src.cloneNode(true);
    $$('script,style,svg,canvas,button,input,select,textarea,.wiki-edit-trigger,.scroll-cue,.page-jump,.site-footer,.modal,.tooltip,.deeplink-anchor', clone).forEach(n => n.remove());
    const chunks = [];
    $$('h1,h2,h3,h4,p,li,th,td,figcaption,.section-title,.card-title,.ptt,.ut-title,.quest-title', clone).forEach(el => {
      const t = cleanLine(el.textContent);
      if (!t || t.length < 2) return;
      if (/^(copy|open|close|search|filter|next|previous)$/i.test(t)) return;
      chunks.push(t);
    });
    const deduped = [];
    const seen = new Set();
    chunks.forEach(t => {
      const key = t.toLowerCase();
      if (seen.has(key)) return;
      seen.add(key);
      deduped.push(t);
    });
    return deduped.slice(0, 140).join('\n\n');
  }
  function isEditorAllowed(){
    const id = currentId();
    if (HIDDEN_PAGE_IDS.has(id)) return false;
    if (id.startsWith('admin') || id.includes('profile')) return false;
    return !HIDDEN_BODY_CLASSES.some(cls => document.body.classList.contains(cls));
  }
  function defaultState(){
    const original = extractPageText();
    return {
      route: currentId(),
      page: titleFromPage(),
      mode: 'edit',
      original,
      edited: original,
      editedHtml: textToHtml(original),
      issue: '',
      suggestion: '',
      source: ''
    };
  }
  let state = defaultState();
  function key(){ return STORAGE_PREFIX + currentId(); }
  function save(){ try{ localStorage.setItem(key(), JSON.stringify(state)); }catch(e){} }
  function loadForPage(){
    const fresh = defaultState();
    state = fresh;
    try{
      const saved = JSON.parse(localStorage.getItem(key()) || 'null');
      if (saved) state = Object.assign(fresh, saved, {route:currentId(), page:titleFromPage(), original:fresh.original || saved.original || ''});
      if (!state.edited) state.edited = state.original;
      if (!state.editedHtml) state.editedHtml = textToHtml(state.edited || state.original);
    }catch(e){}
  }
  function reportText(){
    const mode = MODES[state.mode] || MODES.edit;
    const lines = [
      'Page: ' + state.page + ' (#' + state.route + ')',
      'Submission type: ' + mode.title,
      ''
    ];
    if (state.mode === 'edit'){
      lines.push('Edited page text:', state.edited || 'Not provided.');
      if (state.editedHtml && state.editedHtml.replace(/<[^>]+>/g,'').trim()) lines.push('', 'Formatted draft HTML:', state.editedHtml);
    } else if (state.mode === 'issue'){
      lines.push('Issue report:', state.issue || 'Not provided.');
    } else {
      lines.push('Suggestion:', state.suggestion || 'Not provided.');
    }
    lines.push('', 'Source / proof:', state.source || 'Not provided.');
    return lines.join('\n');
  }
  function previewHtml(){
    const mode = MODES[state.mode] || MODES.edit;
    const body = state.mode === 'edit' ? (state.edited || 'No edited text yet.') : state.mode === 'issue' ? (state.issue || 'No issue written yet.') : (state.suggestion || 'No suggestion written yet.');
    const draft = state.mode === 'edit' && state.editedHtml ? '<div class="we-preview-draft">' + state.editedHtml + '</div>' : '<pre>' + esc(body) + '</pre>';
    return '<div class="we-preview-head"><span>' + esc(mode.icon) + '</span><div><b>' + esc(mode.title) + '</b><small>' + esc(state.page) + '</small></div></div>' +
      draft +
      (state.source ? '<p><strong>Source:</strong> ' + esc(state.source) + '</p>' : '');
  }
  function shell(){ return '' +
    '<button class="wiki-edit-trigger" type="button" data-we-open><span>✎</span><b>Edit Page</b></button>' +
    '<div class="wiki-edit-backdrop" data-we-close></div>' +
    '<aside class="wiki-edit-panel" aria-hidden="true">' +
      '<header class="we-head"><div><span class="we-kicker">Wiki contribution</span><h2>Suggest a page update</h2><p>Pick one action, write the change, then copy or download a clean report for review.</p></div><button type="button" data-we-close aria-label="Close editor">×</button></header>' +
      '<div class="we-page"><span>📜</span><div><small>Editing</small><strong data-we-page>Page</strong></div></div>' +
      '<main class="we-body">' +
        '<nav class="we-modes" data-we-modes></nav>' +
        '<section class="we-workspace">' +
          '<div class="we-edit-area" data-we-area="edit">' +
            '<div class="we-note"><b>Current page text is loaded here.</b><span>Use the toolbar to format headings, paragraphs, lists, links, and callouts. Nothing is published automatically.</span></div>' +
            '<div class="we-formatbar" aria-label="Formatting tools">' +
              '<button type="button" data-we-format="h2">Heading</button>' +
              '<button type="button" data-we-format="h3">Subheading</button>' +
              '<button type="button" data-we-format="p">Paragraph</button>' +
              '<button type="button" data-we-format="bold"><b>B</b></button>' +
              '<button type="button" data-we-format="ul">Bullets</button>' +
              '<button type="button" data-we-format="ol">Numbers</button>' +
              '<button type="button" data-we-format="link">Link</button>' +
              '<button type="button" data-we-format="callout">Callout</button>' +
              '<button type="button" data-we-format="table">Table</button>' +
            '</div>' +
            '<label class="we-rich-label"><span>Page draft</span><div class="we-rich-editor" data-we-rich-editor contenteditable="true" spellcheck="true"></div></label>' +
            '<textarea class="we-hidden-text" data-we-field="edited" rows="1" aria-hidden="true" tabindex="-1"></textarea>' +
          '</div>' +
          '<div class="we-edit-area" data-we-area="issue">' +
            '<label><span>What is wrong?</span><textarea data-we-field="issue" rows="12" placeholder="Example: The requirement is outdated, the NPC name is wrong, the image is missing, or a link is broken."></textarea></label>' +
          '</div>' +
          '<div class="we-edit-area" data-we-area="idea">' +
            '<label><span>What should be added?</span><textarea data-we-field="suggestion" rows="12" placeholder="Example: Add the NPC location, a missing step, a reward table, or a clearer beginner tip."></textarea></label>' +
          '</div>' +
          '<label class="we-source"><span>Source or proof, optional</span><input data-we-field="source" placeholder="Patch note, screenshot, NPC name, in-game test, or who confirmed it."></label>' +
        '</section>' +
        '<aside class="we-preview-box"><h3>Review copy</h3><div class="we-preview" data-we-preview></div><textarea class="we-copybox" data-we-copybox readonly></textarea><div class="we-actions"><button class="primary" type="button" data-we-copy>Copy update</button><button type="button" data-we-download>Download .txt</button><button class="danger" type="button" data-we-reset>Reset</button></div></aside>' +
      '</main>' +
    '</aside>';
  }
  function updateVisibility(){
    const root = $('.wiki-editor-root'); if (!root) return;
    const allowed = isEditorAllowed();
    root.classList.toggle('is-hidden-page', !allowed);
    if (!allowed) closePanel();
  }
  function render(){
    const root = $('.wiki-editor-root'); if (!root) return;
    updateVisibility();
    const page = $('[data-we-page]', root); if (page) page.textContent = state.page + ' · #' + state.route;
    const modes = $('[data-we-modes]', root);
    if (modes) modes.innerHTML = Object.entries(MODES).map(([id,m]) => '<button type="button" class="' + (state.mode === id ? 'on' : '') + '" data-we-mode="' + id + '"><span>' + esc(m.icon) + '</span><b>' + esc(m.title) + '</b><small>' + esc(m.hint) + '</small></button>').join('');
    $$('[data-we-area]', root).forEach(el => el.hidden = el.getAttribute('data-we-area') !== state.mode);
    ['edited','issue','suggestion','source'].forEach(f => { const el = $('[data-we-field="' + f + '"]', root); if (el && el.value !== (state[f] || '')) el.value = state[f] || ''; });
    const rich = currentEditor(root);
    if (rich && rich.innerHTML !== (state.editedHtml || '')) rich.innerHTML = state.editedHtml || textToHtml(state.edited || state.original);
    const preview = $('[data-we-preview]', root); if (preview) preview.innerHTML = previewHtml();
    const copybox = $('[data-we-copybox]', root); if (copybox) copybox.value = reportText();
    save();
  }
  function openPanel(){
    const root = $('.wiki-editor-root'); if (!root || !isEditorAllowed()) return;
    loadForPage();
    root.classList.add('is-open');
    const panel = $('.wiki-edit-panel', root); if (panel) panel.setAttribute('aria-hidden','false');
    render();
  }
  function closePanel(){
    const root = $('.wiki-editor-root'); if (!root) return;
    root.classList.remove('is-open');
    const panel = $('.wiki-edit-panel', root); if (panel) panel.setAttribute('aria-hidden','true');
  }

  function syncRich(root){
    const rich = currentEditor(root);
    if (!rich) return;
    state.editedHtml = rich.innerHTML;
    state.edited = htmlToCleanText(state.editedHtml);
    const hidden = $('[data-we-field="edited"]', root);
    if (hidden) hidden.value = state.edited;
  }
  function formatBlock(tag){
    document.execCommand('formatBlock', false, tag);
  }
  function insertHtml(html){
    document.execCommand('insertHTML', false, html);
  }
  function applyFormat(action, root){
    const rich = currentEditor(root);
    if (!rich) return;
    rich.focus();
    if (action === 'h2') formatBlock('h2');
    else if (action === 'h3') formatBlock('h3');
    else if (action === 'p') formatBlock('p');
    else if (action === 'bold') document.execCommand('bold', false, null);
    else if (action === 'ul') document.execCommand('insertUnorderedList', false, null);
    else if (action === 'ol') document.execCommand('insertOrderedList', false, null);
    else if (action === 'link'){
      const url = prompt('Paste the link URL');
      if (url) document.execCommand('createLink', false, url);
    } else if (action === 'callout') insertHtml('<blockquote><strong>Note:</strong> Write the important warning or tip here.</blockquote><p></p>');
    else if (action === 'table') insertHtml('<table><tbody><tr><th>Column</th><th>Value</th></tr><tr><td>Example</td><td>Replace this text</td></tr></tbody></table><p></p>');
    syncRich(root);
    render();
  }
  function bind(root){
    root.addEventListener('click', e => {
      if (e.target.closest('[data-we-open]')){ openPanel(); return; }
      if (e.target.closest('[data-we-close]')){ closePanel(); return; }
      const mode = e.target.closest('[data-we-mode]'); if (mode){ state.mode = mode.dataset.weMode; render(); return; }
      const fmt = e.target.closest('[data-we-format]'); if (fmt){ applyFormat(fmt.dataset.weFormat, root); return; }
      if (e.target.closest('[data-we-copy]')){ const text = reportText(); navigator.clipboard && navigator.clipboard.writeText(text); const b=e.target.closest('button'); const old=b.textContent; b.textContent='Copied'; setTimeout(()=>b.textContent=old,1100); return; }
      if (e.target.closest('[data-we-download]')){ const blob = new Blob([reportText()], {type:'text/plain'}); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = (state.route || 'wiki-page') + '-wiki-edit.txt'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),500); return; }
      if (e.target.closest('[data-we-reset]')){ localStorage.removeItem(key()); loadForPage(); render(); return; }
    });
    root.addEventListener('input', e => {
      if (e.target.closest('[data-we-rich-editor]')){ syncRich(root); render(); return; }
      const f = e.target.getAttribute('data-we-field'); if (f){ state[f] = e.target.value; if (f === 'edited') state.editedHtml = textToHtml(state.edited); render(); }
    });
    const retarget = () => { updateVisibility(); if (root.classList.contains('is-open')){ loadForPage(); render(); } };
    window.addEventListener('hashchange', retarget);
    document.addEventListener('archlight:navigate', retarget);
    document.addEventListener('click', () => setTimeout(retarget, 60), true);
    setInterval(updateVisibility, 700);
  }
  function init(){
    if ($('.wiki-editor-root')) return;
    const root = document.createElement('div');
    root.className = 'wiki-editor-root';
    root.innerHTML = shell();
    document.body.appendChild(root);
    bind(root);
    loadForPage();
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
  window.WikiEditor = {open:openPanel, close:closePanel, refresh:function(){loadForPage();render();}};
})();
