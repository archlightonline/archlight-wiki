(function(){
  'use strict';

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const getData = () => window.ARCHLIGHT_UPDATES_DATA || { entries: [], worlds: [] };
  const visibleTypes = [
    { id:'all', name:'All Types', icon:'✦' },
    { id:'patch-notes', name:'Patch Notes', icon:'📜' },
    { id:'changelog', name:'Changelogs', icon:'🧾' }
  ];
  const state = { world:'all', type:'all', year:'all', q:'', active:null };
  const metaCache = new Map();
  const noteCache = new Map();
  const manualStorageKey = 'archlight_updates_manual_entries_v1';
  const searchCache = new Map();
  let entryListCache = { signature:'', list:null };
  let renderToken = 0;

  function cleanText(value){
    return String(value || '')
      .replace(/\ufeff|ï»¿/g, '')
      .replace(/Â/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\u3000/g, ' ')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/\[\s*\]/g, ' ')
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/[ \t]{2,}/g, ' ')
      .trim();
  }

  function escapeRegExp(value){
    return String(value || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  function monthDateRegexSource(){
    const month = '(?:Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?)';
    return `(?:${month}\\s+\\d{1,2}(?:st|nd|rd|th)?[,]?\\s+20\\d{2}|\\d{1,2}(?:st|nd|rd|th)?\\s+${month}\\s+20\\d{2})`;
  }


  function stripBrokenBracketTitleTokens(value){
    return cleanText(value || '')
      .replace(/\s*\[\s*\]\s*/g, ' ')
      .replace(/\s+\[\s*(?=\||$)/g, ' ')
      .replace(/\s+\]\s*(?=\||$)/g, ' ')
      .replace(/\s+\[\s*$/g, '')
      .replace(/\s+\]\s*$/g, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/\s+([|•◇◆:;,-])\s*/g, ' $1 ')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\s|•◇◆:;,-]+$/g, '')
      .trim();
  }

  function hasBrokenBracketArtifact(value){
    const text = String(value || '');
    return /\[\s*\]/.test(text) || /\[\s*(?:[|•◇◆:;,-]|$)/.test(text) || /(?:^|\s)\[\s*(?:$|\n)/.test(text);
  }

  function titleDateVariants(date){
    const label = formatDate(date);
    const out = new Set();
    if(label && label !== 'Date unknown'){
      out.add(label);
      out.add(label.replace(',', ''));
      out.add(label.replace(/^(\w{3})\s+0?(\d{1,2}),\s+(20\d{2})$/i, '$1 $2, $3'));
      out.add(label.replace(/^(\w{3})\s+0?(\d{1,2}),\s+(20\d{2})$/i, '$1 $2 $3'));
    }
    if(date){
      out.add(String(date));
      const parts = String(date).match(/^(20\d{2})-(\d{2})-(\d{2})$/);
      if(parts){
        out.add(`${Number(parts[2])}/${Number(parts[3])}/${parts[1]}`);
        out.add(`${Number(parts[2])}/${Number(parts[3])}`);
      }
    }
    return Array.from(out).filter(Boolean).sort((a,b) => b.length - a.length);
  }

  function normalizeImportedTitleDate(value, date){
    let title = stripBrokenBracketTitleTokens(value || '').replace(/[\s|•◇◆:;,-]+$/g, '').trim();
    if(!title) return title;
    titleDateVariants(date).forEach(variant => {
      const pattern = escapeRegExp(variant).replace(/\\,/g, ',?').replace(/\\\s\+/g, '\\s+');
      title = title.replace(new RegExp(`(${pattern})(?:\\s*[|•,;:-]?\\s*${pattern})+\\s*$`, 'i'), '$1');
    });
    title = title.replace(new RegExp(`(${monthDateRegexSource()})(?:\\s*[|•,;:-]?\\s*${monthDateRegexSource()})+\\s*$`, 'i'), '$1');
    title = title.replace(/\s{2,}/g, ' ').replace(/[\s|•◇◆:;,-]+$/g, '').trim();
    title = stripBrokenBracketTitleTokens(title);
    return title;
  }

  function hasWebsiteShellNoise(value){
    const text = String(value || '');
    return /This page was generated on|ArchLight Online\.html|Like our Facebook page|Upcoming Event|Awakening Level|Guild Rank|Power Rank|Latest Deaths|Latest Killers|Coins Resurrection/i.test(text);
  }

  function isWebsiteShellLine(value){
    const line = cleanText(decodeEntities(value || '')).replace(/^[-–—]\s*/, '').replace(/[◇◆•]+$/g, '').trim();
    if(!line) return true;
    if(/^[⚔◇◆•]+$/.test(line)) return true;
    if(/^\d{1,2}(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}(?:\s*\([^)]*\))?(?:\s+by\s+.+)?$/i.test(line)) return true;
    if(/^Copyright\s+©?\s*20\d{2}\s+Arch(?:l)?ight Online/i.test(line)) return true;
    if(/^This page was generated on/i.test(line)) return true;
    if(/^=+\s*ArchLight Online\.html\s*=+$/i.test(line)) return true;
    if(/^<!(?:doctype)|^<\/?(?:html|head|body|meta|link|script|style)\b/i.test(line)) return true;
    if(/^(?:NEWS|REGISTER|LOGIN)(?:\s*[•|]+\s*)?$/i.test(line)) return true;
    if(/^(?:ArchLight Online|Characters|Hall Of Fame|Guilds|Guild Wars|Bounty Hunters|Latest Deaths|Latest Killers|Rules|Coins Resurrection|Art Work)$/i.test(line)) return true;
    if(/^Like our Facebook page for a chance to win free points!?$/i.test(line)) return true;
    if(/^(?:⚔\s*)?Upcoming Event$/i.test(line)) return true;
    if(/^Snowball\s*-\s*\d+\s*hours?,\s*\d+\s*min/i.test(line)) return true;
    if(/^(?:Awakening Level|Guild Rank|Power Rank)$/i.test(line)) return true;
    if(/^\d+$/i.test(line)) return true;
    if(/^\d+\.\s*[^\n]{2,35}\s+\d{1,6}$/i.test(line)) return true;
    if(/^\d+\.\s*[^\n]{2,35}\.{3}$/i.test(line)) return true;
    if(/^(?:window\.|ga\(|gtag\(|function\(|document\.|var\s+|let\s+|const\s+|body\s*\{|html\s*\{)/i.test(line)) return true;
    if(/^(?:saved from url=|content-type|charset=|style>|<style|<script|script nonce)/i.test(line)) return true;
    return false;
  }

  function removeWebsiteShellLines(text, force, options){
    const shell = force || hasWebsiteShellNoise(text);
    const keepDateLines = !!(options && options.keepDateLines);
    const lines = String(text || '').split('\n').map(line => cleanText(line));
    const out = [];
    lines.forEach(line => {
      if(!line) return;
      if(shell && keepDateLines && lineHasImportDate(line)){
        out.push(line);
        return;
      }
      if(shell && (isWebsiteShellLine(line) || /^\d+\.\s+/.test(line) || /^\d+$/.test(line))) return;
      out.push(line);
    });
    return out.join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function decodeEntities(value){
    const raw = String(value || '');
    if(typeof document === 'undefined') return fastDecodeEntities(raw);
    const textarea = document.createElement('textarea');
    textarea.innerHTML = raw;
    return textarea.value;
  }

  function fastDecodeEntities(value){
    return String(value || '')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&#39;|&apos;/gi, "'")
      .replace(/&#(\d{2,5});/g, (_m, code) => {
        const value = Number(code);
        return Number.isFinite(value) ? String.fromCharCode(value) : ' ';
      });
  }

  function normalizeType(type, title){
    const value = `${type || ''} ${title || ''}`.toLowerCase();
    if(/change\s*log|changelog/.test(value)) return 'changelog';
    return 'patch-notes';
  }

  function typeMeta(id){ return visibleTypes.find(type => type.id === id) || visibleTypes[1]; }
  function worlds(){ return (getData().worlds || []).filter(world => world && world.id); }
  function worldMeta(id){ return worlds().find(world => world.id === id) || { id, name:String(id || 'World'), icon:'✦', tag:'Archive' }; }

  function normalizeUrl(url){
    let src = decodeEntities(String(url || ''))
      .replace(/<[^>]*>/g, '')
      .replace(/^['"]|['"]$/g, '')
      .replace(/[\uFEFF\u200B\s]+$/g, '')
      .replace(/[\])}>,.;]+$/g, '')
      .trim();
    if(src.startsWith('//')) src = `https:${src}`;
    if(/^http:\/\/(?:www\.)?archlightonline\.com\//i.test(src)) src = src.replace(/^http:\/\//i, 'https://');
    if(/^https?:\/\//i.test(src)) return src;
    return '';
  }

  function extractImages(raw, fallback){
    const text = decodeEntities(String(raw || ''));
    const urls = [];
    (Array.isArray(fallback) ? fallback : []).forEach(url => { const src = normalizeUrl(url); if(src) urls.push(src); });
    text.replace(/\[img\]([\s\S]*?)\[\/img\]/gi, (_, url) => { const src = normalizeUrl(url); if(src) urls.push(src); return ''; });
    text.replace(/!\[[^\]]*\]\(([^)]+)\)/g, (_, url) => { const src = normalizeUrl(url); if(src) urls.push(src); return ''; });
    text.replace(/<img\b[^>]*\bsrc\s*=\s*(?:["']([^"']+)["']|([^\s>]+))[^>]*>/gi, (_, quoted, bare) => { const src = normalizeUrl(quoted || bare); if(src) urls.push(src); return ''; });
    text.replace(/src\\?=\\?["']([^"']+)\\?["']/gi, (_, url) => { const src = normalizeUrl(url); if(src) urls.push(src); return ''; });
    return Array.from(new Set(urls));
  }

  function formatDate(date){
    if(!date) return 'Date unknown';
    const parsed = new Date(`${date}T12:00:00Z`);
    if(Number.isNaN(+parsed)) return String(date);
    return parsed.toLocaleDateString(undefined, { year:'numeric', month:'short', day:'2-digit' });
  }

  function formatDateTime(value){
    if(!value) return '';
    const parsed = new Date(value);
    if(Number.isNaN(+parsed)) return cleanText(value);
    return parsed.toLocaleString(undefined, { year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit' });
  }

  function dateParts(date){
    const label = formatDate(date).replace(',', '');
    const bits = label.split(' ');
    return { month:bits[0] || '', day:bits[1] || '', year:bits[2] || '' };
  }

  function getYears(entries){
    return Array.from(new Set(entries.map(entry => entry.year).filter(Boolean))).sort((a,b) => Number(b) - Number(a));
  }

  function isHeadingLine(value){
    const text = cleanText(value).replace(/:$/, '');
    if(!text || text.length > 130 || /^[-─═•=]+$/.test(text)) return false;
    if(/^(Added|Fixed|Changed|Removed|General|General Changes|Balance|Balance Changes|Class Changes|Bug Fixes|New Content|Training|Bestiary Tracker|Character Stash|Race Points System|Ramparts Siege|Cooldown Reduction Changes|Global Cooldown Changes|Spell Cooldown Increases|Spell Cooldown Decreases)$/i.test(text)) return true;
    if(/^[A-Z0-9 &/#'’:.(),-]{4,}$/.test(text) && /[A-Z]/.test(text) && text.split(/\s+/).length <= 13) return true;
    return /\b(Changes|Balances|Update|System|Event|Tracker|Fixes|Notes|Classes|Rewards|Shop|Patch|Changelog|Guide|Content)\b$/i.test(text) && text.split(/\s+/).length <= 11;
  }

  function headingIcon(text){
    const value = String(text || '').toLowerCase();
    if(/fix|bug|issue|resolved|correction/.test(value)) return '✚';
    if(/add|new|introduc|available|created/.test(value)) return '✦';
    if(/remove|disabled|delete/.test(value)) return '✕';
    if(/balance|buff|nerf|increase|decrease|reduced|class|vocation/.test(value)) return '⚖';
    if(/event|raid|world boss|race/.test(value)) return '⚔';
    if(/training|bestiary|stash|system/.test(value)) return '◆';
    return '◇';
  }

  function lineTone(text){
    const value = String(text || '').toLowerCase();
    if(/fix|bug|issue|resolved|correct/.test(value)) return 'fix';
    if(/add|new|created|introduced|enabled|available|re-added/.test(value)) return 'add';
    if(/remove|disabled|delete/.test(value)) return 'remove';
    if(/increase|decrease|reduced|buff|nerf|adjust|change|rework|updated|from .* to |→/.test(value)) return 'change';
    return 'note';
  }

  function highlightInline(text){
    return esc(text)
      .replace(/(\b\d+(?:\.\d+)?%?\s*(?:→|-&gt;|to|&gt;)\s*\d+(?:\.\d+)?%?\b)/g, '<span class="updates-note__value">$1</span>')
      .replace(/\b(increased|added|buffed|enabled|new|improved|created|introduced|available)\b/gi, '<span class="updates-note__positive">$1</span>')
      .replace(/\b(reduced|removed|decreased|disabled|nerfed|fixed|issue|bug)\b/gi, '<span class="updates-note__caution">$1</span>');
  }

  function splitLongLine(line){
    if(line.length <= 430 || /https?:\/\//i.test(line)) return [line];
    const parts = line.split(/(?<=[.!?])\s+(?=[A-Z0-9"'])/).map(cleanText).filter(Boolean);
    return parts.length > 1 ? parts : [line];
  }

  function pushText(blocks, value){
    cleanText(decodeEntities(value || '')).split('\n').forEach(raw => {
      const line = cleanText(raw);
      if(!line || /^[-─═=]{4,}$/.test(line)) return;
      splitLongLine(line).forEach(part => blocks.push({ type:isHeadingLine(part) ? 'heading' : 'line', value:part }));
    });
  }

  function contentBlocksFromRaw(raw, images){
    const blocks = [];
    const shellNoise = hasWebsiteShellNoise(raw);
    let text = removeWebsiteShellLines(normalizeImportedText(raw || ''), shellNoise);
    text = text
      .replace(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `${label.replace(/<[^>]+>/g, '')} (${href})`)
      .replace(/<img\b[^>]*\bsrc\s*=\s*(?:["']([^"']+)["']|([^\s>]+))[^>]*>/gi, (_, quoted, bare) => `\n[[IMAGE:${normalizeUrl(quoted || bare)}]]\n`)
      .replace(/\[img\]([\s\S]*?)\[\/img\]/gi, (_, url) => `\n[[IMAGE:${normalizeUrl(url)}]]\n`)
      .replace(/!\[[^\]]*\]\(([^)]+)\)/g, (_, url) => `\n[[IMAGE:${normalizeUrl(url)}]]\n`)
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<\/(p|div|h[1-6]|li|tr|table|figure|section|article|header|footer)>/gi, '\n')
      .replace(/<li[^>]*>/gi, '\n• ')
      .replace(/<tr[^>]*>/gi, '\n')
      .replace(/<td[^>]*>|<th[^>]*>/gi, ' | ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/`([^`]+)`/g, '$1')
      .replace(/\[url=([^\]]+)\]([^[]+)\[\/url\]/gi, '$2 ($1)')
      .replace(/\[(?:center|\/center|size=[^\]]+|\/size|color=[^\]]+|\/color|font=[^\]]+|\/font|b|\/b|strong|\/strong|i|\/i|em|\/em|u|\/u|spoiler|\/spoiler|quote|\/quote)\]/gi, '')
      .replace(/\{"br"\s*:\s*"[^"]*",?\s*"us"\s*:\s*"?/gi, '\n')
      .replace(/"?\}\s*$/g, '');

    text.split(/(\[\[IMAGE:[\s\S]*?\]\])/g).forEach(part => {
      const img = part.match(/^\[\[IMAGE:([\s\S]*?)\]\]$/);
      if(img){
        const src = normalizeUrl(img[1]);
        if(src) blocks.push({ type:'image', value:src });
      }else{
        pushText(blocks, part);
      }
    });

    (images || []).forEach(src => {
      const url = normalizeUrl(src);
      if(url && !blocks.some(block => block.type === 'image' && block.value === url)) blocks.push({ type:'image', value:url });
    });

    const output = [];
    blocks.forEach(block => {
      if(!block || !block.value) return;
      const value = block.type === 'image' ? normalizeUrl(block.value) : cleanText(block.value);
      if(!value) return;
      if(block.type !== 'image' && lineHasImportDate(value)) return;
      if(block.type !== 'image' && shellNoise && (isWebsiteShellLine(value) || /^\d+\.\s+/.test(value) || /^\d+$/.test(value))) return;
      const previous = output[output.length - 1];
      if(previous && previous.type === block.type && previous.value === value) return;
      output.push({ type:block.type, value });
    });
    return output;
  }

  function cleanedManualPayload(raw, explicitImages){
    const images = extractImages(raw || '', explicitImages || []);
    const blocks = contentBlocksFromRaw(raw || '', images);
    const content = blocks.filter(block => block.type !== 'image').map(block => block.value).join('\n').replace(/\n{3,}/g, '\n\n').trim();
    const imageList = Array.from(new Set(images.concat(blocks.filter(block => block.type === 'image').map(block => block.value)).map(normalizeUrl).filter(Boolean)));
    return { content, images:imageList };
  }

  function stripMarkup(raw){
    return contentBlocksFromRaw(raw).filter(block => block.type !== 'image').map(block => block.value).join('\n').replace(/\n{3,}/g, '\n\n').trim();
  }

  function clearUpdateRuntimeCaches(){
    metaCache.clear();
    noteCache.clear();
    searchCache.clear();
    entryListCache = { signature:'', list:null };
  }

  function cheapStripPreview(value, limit){
    let text = decodeEntities(String(value || '').slice(0, limit || 5000));
    text = text
      .replace(/<script[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style[\s\S]*?<\/style>/gi, ' ')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<\/(p|div|h[1-6]|li|tr|section|article)>/gi, '\n')
      .replace(/<li[^>]*>/gi, '\n• ')
      .replace(/<[^>]+>/g, ' ')
      .replace(/\[img\][\s\S]*?\[\/img\]/gi, ' ')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
      .replace(/\[(?:center|\/center|size=[^\]]+|\/size|color=[^\]]+|\/color|font=[^\]]+|\/font|b|\/b|strong|\/strong|i|\/i|em|\/em|u|\/u|spoiler|\/spoiler|quote|\/quote)\]/gi, '')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/`([^`]+)`/g, '$1');
    text = removeWebsiteShellLines(text, hasWebsiteShellNoise(text));
    return cleanText(text).replace(/\s+/g, ' ');
  }

  function entrySearchText(entry){
    if(searchCache.has(entry.id)) return searchCache.get(entry.id);
    const meta = entryMeta(entry);
    const value = `${entry.title || ''} ${entry.worldName || ''} ${entry.displayType || ''} ${meta.preview || ''} ${cheapStripPreview(entry.content || '', 3500)}`.toLowerCase();
    searchCache.set(entry.id, value);
    return value;
  }

  function entryMeta(entry){
    if(metaCache.has(entry.id)) return metaCache.get(entry.id);
    const type = normalizeType(entry.type, entry.title);
    const images = extractImages(entry.content || '', entry.images || []);
    const rawSummary = cleanText(decodeEntities(entry.summary || '')) || cheapStripPreview(entry.content || '', 5200);
    const compactSummary = rawSummary.replace(/\s+/g, ' ');
    const preview = compactSummary.length > 300 ? compactSummary.slice(0, 300).replace(/\s+\S*$/, '') : compactSummary;
    const length = cleanText(entry.content || entry.summary || '').length;
    const words = cleanText(entry.content || entry.summary || '').split(/\s+/).filter(Boolean).length;
    const meta = {
      type,
      images,
      preview: preview ? `${preview}${rawSummary.length > 300 ? '…' : ''}` : 'No summary available.',
      length,
      long:length > 8500,
      words
    };
    metaCache.set(entry.id, meta);
    return meta;
  }

  function note(entry){
    if(noteCache.has(entry.id)) return noteCache.get(entry.id);
    const meta = entryMeta(entry);
    const blocks = contentBlocksFromRaw(entry.content || '', meta.images);
    const sections = blocks.filter(block => block.type === 'heading');
    const clean = blocks.filter(block => block.type !== 'image').map(block => block.value).join('\n');
    const html = blocks.length ? blocks.map(block => {
      if(block.type === 'image'){
        return `<figure class="updates-note__image"><img loading="lazy" decoding="async" src="${esc(block.value)}" alt="${esc(entry.title)} image" onerror="this.closest('figure').remove()"></figure>`;
      }
      if(block.type === 'heading'){
        return `<h3 class="updates-note__heading"><span aria-hidden="true">${esc(headingIcon(block.value))}</span>${esc(block.value)}</h3>`;
      }
      const tone = lineTone(block.value);
      return `<p class="updates-note__line updates-note__line--${esc(tone)}"><span aria-hidden="true"></span>${highlightInline(block.value)}</p>`;
    }).join('') : '<p class="updates-note__line updates-note__line--note"><span aria-hidden="true"></span>No readable body content was found for this note.</p>';
    const map = sections.length >= 4 ? `<nav class="updates-reader__sections" aria-label="Patch note sections"><b>Sections</b>${sections.slice(0, 12).map(block => `<span>${esc(block.value.slice(0, 68))}</span>`).join('')}</nav>` : '';
    const result = { blocks, sections, html, map, clean };
    noteCache.set(entry.id, result);
    return result;
  }


  function sanitizeStoredManualEntry(entry){
    if(!entry || !entry.id) return entry;
    const rawContent = String(entry.content || '');
    const normalizedTitle = importedTitleWithDate(entry.title || '', entry.date);
    const titleChanged = normalizedTitle && normalizedTitle !== entry.title;
    const bracketChanged = hasBrokenBracketArtifact(entry.title || '') || hasBrokenBracketArtifact(rawContent || '') || hasBrokenBracketArtifact(entry.summary || '');
    if(!titleChanged && !bracketChanged && !hasWebsiteShellNoise(rawContent) && !/This page was generated on|ArchLight Online\.html|Awakening Level|Power Rank/i.test(String(entry.summary || '') + String(entry.title || ''))) return entry;
    const cleaned = cleanedManualPayload(rawContent, entry.images || []);
    const cleanContent = cleaned.content || rawContent;
    const titleLooksNoisy = isWebsiteShellLine(entry.title || '') || /Copyright|This page was generated|ArchLight Online/i.test(entry.title || '');
    const nextTitle = importedTitleWithDate(titleLooksNoisy ? inferTitle(cleanContent, '', entry.worldName || entry.world, entry.date) : entry.title, entry.date);
    return Object.assign({}, entry, {
      title:nextTitle,
      content:cleanContent,
      images:cleaned.images,
      fingerprint: cleanText(entry.fingerprint || contentFingerprint(cleanContent)),
      summary:buildSummary(cleanContent) || entry.summary
    });
  }

  function readManualEntries(){
    try{
      const raw = localStorage.getItem(manualStorageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      if(!Array.isArray(parsed)) return [];
      let changed = false;
      const clean = parsed.filter(entry => entry && entry.id && entry.world && entry.date).map(entry => {
        const next = sanitizeStoredManualEntry(entry);
        if(JSON.stringify(next) !== JSON.stringify(entry)) changed = true;
        return next;
      });
      if(changed){
        try{ localStorage.setItem(manualStorageKey, JSON.stringify(clean)); metaCache.clear(); noteCache.clear(); }catch(_err){}
      }
      return clean;
    }catch(err){
      console.warn('Unable to read manual update entries.', err);
      return [];
    }
  }

  function saveManualEntries(entries){
    try{
      const clean = Array.isArray(entries) ? entries.filter(entry => entry && entry.id && entry.world && entry.date) : [];
      localStorage.setItem(manualStorageKey, JSON.stringify(clean));
      clearUpdateRuntimeCaches();
      return true;
    }catch(err){
      window.alert?.('Unable to save this patch note locally. The note may be too large for browser storage. Try reducing embedded data or keeping images as URLs.');
      console.warn('Unable to save manual update entries.', err);
      return false;
    }
  }

  function slug(value){
    return cleanText(value).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 72) || 'manual-note';
  }

  function stableHash(value){
    const text = cleanText(value || '').toLowerCase();
    let hash = 2166136261;
    for(let i = 0; i < text.length; i += 1){
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return (hash >>> 0).toString(36);
  }

  function contentFingerprint(value){
    const text = stripMarkup(value || '')
      .split('\n')
      .map(cleanText)
      .filter(Boolean)
      .join(' ')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
    return text ? stableHash(text) : '';
  }

  function normalizeImportedText(value){
    let text = String(value || '');
    // Website exports often arrive as JSON-ish strings, escaped HTML, or copied table rows.
    // Normalize those forms before the note formatter touches the text.
    text = text
      .replace(/\\r\\n/g, '\n')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\"/g, '"')
      .replace(/\\'/g, "'")
      .replace(/\\\//g, '/')
      .replace(/\\u00a0/gi, ' ')
      .replace(/\\u([0-9a-f]{4})/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
    for(let i = 0; i < 3; i += 1){
      const decoded = decodeEntities(text);
      if(decoded === text) break;
      text = decoded;
    }
    return text
      .replace(/<script[\s\S]*?<\/script>/gi, '\n')
      .replace(/<style[\s\S]*?<\/style>/gi, '\n')
      .replace(/<!--[\s\S]*?-->/g, '\n')
      .replace(/\ufeff|ï»¿|�/g, '')
      .replace(/Â/g, '')
      .replace(/[\u200B-\u200D\uFEFF]/g, '')
      .replace(/\u3000/g, ' ')
      .replace(/&nbsp;|&#160;/gi, ' ')
      .replace(/[“”]/g, '"')
      .replace(/[‘’]/g, "'")
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/[ \t]+\n/g, '\n')
      .replace(/\n[ \t]+/g, '\n')
      .replace(/[ \t]{3,}/g, ' ')
      .replace(/\n{4,}/g, '\n\n\n')
      .trim();
  }

  function dateToIso(date){
    if(!date) return '';
    const parsed = new Date(date);
    if(Number.isNaN(+parsed)) return '';
    return parsed.toISOString().slice(0,10);
  }


  function extractAuthorFromImport(raw){
    const text = normalizeImportedText(raw || '');
    const line = text.split('\n').map(cleanText).find(value => /\bby\s+[A-Za-z0-9 _.\'\[\]-]{2,60}$/i.test(value) && /20\d{2}/.test(value));
    if(!line) return '';
    const match = line.match(/\bby\s+(.{2,60})$/i);
    return match ? cleanText(match[1]).replace(/[◇◆•]+$/g, '').trim() : '';
  }

  function extractDateFromImport(raw, explicit){
    if(explicit) return dateToIso(explicit) || explicit;
    const text = normalizeImportedText(raw);
    const discord = text.match(/<t:(\d{9,11})(?::[A-Za-z])?>/);
    if(discord) return dateToIso(Number(discord[1]) * 1000);
    const iso = text.match(/\b(20\d{2})[-/.](\d{1,2})[-/.](\d{1,2})\b/);
    if(iso) return `${iso[1]}-${String(iso[2]).padStart(2,'0')}-${String(iso[3]).padStart(2,'0')}`;
    const slash = text.match(/\b(\d{1,2})[\/-](\d{1,2})[\/-](20\d{2})\b/);
    if(slash){
      const a = Number(slash[1]);
      const b = Number(slash[2]);
      const month = a > 12 ? b : a;
      const day = a > 12 ? a : b;
      return `${slash[3]}-${String(month).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
    }
    const named = text.match(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(\d{1,2})(?:st|nd|rd|th)?[,]?\s+(20\d{2})\b/i);
    if(named) return dateToIso(`${named[1]} ${named[2]}, ${named[3]}`);
    const namedDayFirst = text.match(/\b(\d{1,2})(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+(20\d{2})\b/i);
    if(namedDayFirst) return dateToIso(`${namedDayFirst[2]} ${namedDayFirst[1]}, ${namedDayFirst[3]}`);
    return new Date().toISOString().slice(0,10);
  }

  function firstContentLine(raw){
    const text = removeWebsiteShellLines(normalizeImportedText(raw), hasWebsiteShellNoise(raw))
      .replace(/<t:\d{9,11}(?::[A-Za-z])?>/g, '')
      .replace(/\[img\][\s\S]*?\[\/img\]/gi, '')
      .replace(/!\[[^\]]*\]\([^)]+\)/g, '')
      .replace(/<img\b[^>]*>/gi, '')
      .replace(/<[^>]+>/g, ' ')
      .replace(/^#{1,6}\s*/gm, '')
      .replace(/\*\*([^*]+)\*\*/g, '$1')
      .replace(/__([^_]+)__/g, '$1')
      .replace(/`([^`]+)`/g, '$1');
    const lines = text.split('\n').map(cleanText).filter(line => line && !/^[-─═=]{4,}$/.test(line));
    return lines.find(line => {
      if(/^\d{4}[-/.]\d{1,2}[-/.]\d{1,2}$/.test(line)) return false;
      if(/^\d{1,2}[\/-]\d{1,2}[\/-]\d{2,4}$/.test(line)) return false;
      if(/^(?:\[?\d+\]?\s*)?(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?[,]?\s+20\d{2}$/i.test(line)) return false;
      if(/^\d{1,2}(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}(?:\s*\([^)]*\))?(?:\s+by\s+.+)?$/i.test(line)) return false;
      if(isWebsiteShellLine(line)) return false;
      return true;
    }) || '';
  }

  function titleHasVisibleDate(value){
    const text = cleanText(value || '');
    if(!text) return false;
    if(/\b20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}\b/.test(text)) return true;
    if(/\b\d{1,2}[\/-]\d{1,2}[\/-]20\d{2}\b/.test(text)) return true;
    return new RegExp(`\\b${monthDateRegexSource()}\\b`, 'i').test(text);
  }


  function shortBracketDateToIso(value, fullDate){
    const text = cleanText(value || '');
    const match = text.match(/(?:^|\s)[\[(](\d{1,2})[\/-](\d{1,2})(?:[\/-](\d{2,4}))?[\])](?:\s|$)/);
    if(!match) return '';
    const year = match[3] ? (match[3].length === 2 ? `20${match[3]}` : match[3]) : String(fullDate || '').slice(0,4);
    if(!year || year.length !== 4) return '';
    const month = String(Number(match[1])).padStart(2, '0');
    const day = String(Number(match[2])).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  function stripShortBracketDateFromTitle(value){
    return cleanText(value || '')
      .replace(/\s*[\[(]\d{1,2}[\/-]\d{1,2}(?:[\/-]\d{2,4})?[\])]\s*/g, ' ')
      .replace(/\s{2,}/g, ' ')
      .replace(/[\s|•◇◆:;,-]+$/g, '')
      .trim();
  }

  function importedTitleWithDate(value, date){
    let base = normalizeImportedTitleDate(value, date);
    const dateLabel = formatDate(date);
    const bracketDate = shortBracketDateToIso(base, date);
    if(bracketDate){
      base = stripShortBracketDateFromTitle(base);
    }
    base = stripBrokenBracketTitleTokens(normalizeImportedTitleDate(base, date));
    if(!base) return dateLabel && dateLabel !== 'Date unknown' ? `Patch Notes | ${dateLabel}` : 'Patch Notes';
    if(!date || titleHasVisibleDate(base)) return normalizeImportedTitleDate(base, date).slice(0, 180);
    if(dateLabel && dateLabel !== 'Date unknown') return normalizeImportedTitleDate(`${base} | ${dateLabel}`, date).slice(0, 180);
    return normalizeImportedTitleDate(base, date).slice(0, 180);
  }


  function inferTitle(raw, explicit, worldName, date){
    const manual = cleanText(explicit);
    if(manual) return importedTitleWithDate(manual, date);
    const line = firstContentLine(raw);
    if(line && line.length <= 180) return importedTitleWithDate(line.replace(/^\[?\d+\]?\s*/, ''), date);
    return `${worldName || 'Archlight'} Patch Notes - ${formatDate(date)}`;
  }

  function inferType(raw, explicit, title){
    if(explicit && explicit !== 'auto') return explicit;
    return /change\s*log|changelog/i.test(`${title || ''}\n${raw || ''}`) ? 'changelog' : 'patch-notes';
  }

  function buildSummary(raw){
    const clean = stripMarkup(raw).split('\n').map(cleanText).filter(Boolean).filter(line => !isHeadingLine(line));
    const summary = clean.slice(0, 3).join(' ').replace(/\s+/g, ' ');
    return summary.length > 320 ? summary.slice(0, 320).replace(/\s+\S*$/, '') : summary;
  }

  function dateFromEpoch(value){
    const n = Number(value);
    if(!Number.isFinite(n) || n <= 0) return '';
    return dateToIso(n > 9999999999 ? n : n * 1000);
  }

  function payloadText(value){
    const raw = normalizeImportedText(value || '');
    if(!raw) return '';
    try{
      const parsed = JSON.parse(raw);
      if(typeof parsed === 'string') return normalizeImportedText(parsed);
      if(parsed && typeof parsed === 'object') return normalizeImportedText(parsed.us || parsed.br || parsed.content || parsed.body || parsed.html || raw);
    }catch(_err){}
    const match = raw.match(/"(?:us|content|body|html)"\s*:\s*"([\s\S]*?)"\s*(?:,\s*"|})/i);
    if(match) return normalizeImportedText(match[1]);
    return raw;
  }


  function textFromHtmlNode(node){
    if(!node) return '';
    const clone = node.cloneNode(true);
    clone.querySelectorAll('script,style,noscript,iframe,canvas,svg,nav,header,footer,aside,form,button,input,select,textarea,.menu,.navbar,.sidebar,.ranking,.rank,.pagination,.breadcrumb').forEach(item => item.remove());
    clone.querySelectorAll('br').forEach(item => item.replaceWith('\n'));
    clone.querySelectorAll('p,div,li,tr,td,th,h1,h2,h3,h4,h5,h6,section,article,figure').forEach(item => item.appendChild(clone.ownerDocument.createTextNode('\n')));
    clone.querySelectorAll('img').forEach(img => {
      const src = normalizeUrl(img.getAttribute('src') || img.getAttribute('data-src') || '');
      if(src) img.replaceWith(clone.ownerDocument.createTextNode(`\n[img]${src}[/img]\n`));
    });
    return normalizeImportedText(clone.textContent || '');
  }

  function nodeTitle(node){
    if(!node) return '';
    const direct = node.querySelector('h1,h2,h3,h4,.title,.news-title,.post-title,.entry-title');
    if(direct){
      const title = cleanText(direct.textContent || '');
      if(title && title.length <= 180 && !lineHasImportDate(title) && !isWebsiteShellLine(title)) return title;
    }
    let prev = node.previousElementSibling;
    let hops = 0;
    while(prev && hops < 4){
      const title = cleanText(prev.textContent || '');
      if(title && title.length >= 3 && title.length <= 180 && !lineHasImportDate(title) && !isWebsiteShellLine(title)) return title;
      prev = prev.previousElementSibling;
      hops += 1;
    }
    return '';
  }

  function htmlPostContainer(node){
    if(!node) return null;
    const selector = 'article,[class*="news"],[class*="post"],[class*="entry"],[class*="article"],[id*="news"],[id*="post"],[id*="entry"],.card,.panel,.box,.container';
    let current = node;
    let fallback = node;
    let hops = 0;
    while(current && current !== (node.ownerDocument && node.ownerDocument.body) && hops < 9){
      const text = cleanText(current.textContent || '');
      if(text.length > 80 && text.length < 30000) fallback = current;
      if(current.matches && current.matches(selector) && text.length > 80 && text.length < 45000) return current;
      current = current.parentElement;
      hops += 1;
    }
    return fallback;
  }

  function extractHtmlPostContainers(raw){
    const source = String(raw || '');
    const fileMarkerCount = (source.match(/=====\s+[^\n]+?\s+=====/g) || []).length;
    if(source.length > 350000 || fileMarkerCount > 1) return [];
    if(!/<(?:html|body|article|div|section|p|span|table|h[1-6])\b/i.test(source)) return [];
    if(typeof DOMParser === 'undefined' || typeof document === 'undefined') return [];
    let doc;
    try{ doc = new DOMParser().parseFromString(source, 'text/html'); }catch(_err){ return []; }
    if(!doc || !doc.body) return [];
    doc.querySelectorAll('script,style,noscript,iframe,canvas,svg,nav,header,footer,aside,form,.menu,.navbar,.sidebar,.ranking,.rank,.pagination,.breadcrumb').forEach(item => item.remove());
    const datedNodes = Array.from(doc.body.querySelectorAll('time,h1,h2,h3,h4,h5,h6,p,span,div,td,th,li,strong,b,small')).filter(node => lineHasImportDate(node.textContent || '')).slice(0, 180);
    const containers = [];
    const seenNodes = new Set();
    datedNodes.forEach(dateNode => {
      const container = htmlPostContainer(dateNode);
      if(!container || seenNodes.has(container)) return;
      seenNodes.add(container);
      const rawText = textFromHtmlNode(container);
      const bodyLines = meaningfulImportContent(rawText);
      if(bodyLines.length < 1) return;
      if(bodyLines.join(' ').length < 35) return;
      const date = extractDateFromImport(rawText || dateNode.textContent || '');
      const title = nodeTitle(container) || importTitleBeforeDate(rawText.split('\n').map(cleanText).filter(Boolean), rawText.split('\n').map(cleanText).filter(Boolean).findIndex(lineHasImportDate));
      containers.push({ title, date, raw: rawText });
    });
    const out = [];
    const seen = new Set();
    containers.forEach(row => {
      const fp = contentFingerprint(cleanedManualPayload(row.raw || '').content || row.raw || row.title || '');
      const key = `${row.date || ''}|${slug(row.title || '')}|${fp}`;
      if(seen.has(key)) return;
      seen.add(key);
      out.push(row);
    });
    return out;
  }

  function importCoverageWarnings(raw, detectedCount){
    const source = String(raw || '');
    const warnings = [];
    const pageNumbers = Array.from(source.matchAll(/(?:[?&](?:page|p)=|\/page\/)(\d{1,2})\b/gi)).map(match => Number(match[1])).filter(Boolean);
    const visualPages = source.match(/>\s*1\s*<[^>]+>\s*2\s*<|\b(?:Next|Previous|Older|Newer)\b|class=["'][^"']*(?:pagination|pager)[^"']*["']/i);
    const maxPage = pageNumbers.length ? Math.max(...pageNumbers) : 0;
    if((maxPage > 1 || visualPages) && detectedCount < Math.max(2, maxPage)){
      warnings.push('This saved HTML appears to reference multiple archive pages. A browser-saved HTML file usually contains only the current page, not every linked page. Upload the other saved archive pages together if entries are missing.');
    }
    if(/This page was generated on|ArchLight Online\.html/i.test(source) && detectedCount <= 1){
      warnings.push('This looks like a full saved website page. The importer removed menus, rankings, login text, and shell content, but only posts actually present inside this file can be imported.');
    }
    return warnings;
  }
  function extractStructuredImports(raw){
    const source = String(raw || '');
    const rows = [];
    const lines = source.split(/\r?\n/).filter(Boolean);
    lines.forEach(line => {
      if(/^title\s+created_at\s+content/i.test(line)) return;
      const parts = line.split('\t');
      if(parts.length >= 3 && /^\d{9,13}$/.test(cleanText(parts[1]))){
        rows.push({ title:cleanText(parts[0]), date:dateFromEpoch(parts[1]), raw:payloadText(parts.slice(2).join('\t')) });
      }
    });
    if(rows.length) return rows.filter(row => row.raw || row.title);
    try{
      const parsed = JSON.parse(normalizeImportedText(source));
      const list = Array.isArray(parsed) ? parsed : Array.isArray(parsed?.entries) ? parsed.entries : [];
      return list.map(item => ({
        title:cleanText(item.title || item.name || ''),
        date:dateToIso(item.date || item.createdAt || item.created_at) || dateFromEpoch(item.created_at || item.createdAt),
        raw:payloadText(item.content || item.body || item.html || item.us || item.br || '')
      })).filter(row => row.raw || row.title);
    }catch(_err){
      return [];
    }
  }

  function lineHasImportDate(line){
    const text = cleanText(line);
    if(!text || text.length > 220) return false;
    if(/<t:\d{9,11}(?::[A-Za-z])?>/.test(text)) return true;
    if(/\b20\d{2}[-/.]\d{1,2}[-/.]\d{1,2}\b/.test(text)) return true;
    if(/\b\d{1,2}[\/-]\d{1,2}[\/-]20\d{2}\b/.test(text)) return true;
    if(/\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+\d{1,2}(?:st|nd|rd|th)?[,]?\s+20\d{2}\b/i.test(text)) return true;
    if(/\b\d{1,2}(?:st|nd|rd|th)?\s+(January|February|March|April|May|June|July|August|September|October|November|December)\s+20\d{2}\b/i.test(text)) return true;
    return false;
  }

  function markImportDateBoundaries(value){
    let text = String(value || '');
    const month = '(January|February|March|April|May|June|July|August|September|October|November|December)';
    text = text.replace(new RegExp('\\b(\\d{1,2}(?:st|nd|rd|th)?\\s+' + month + '\\s+20\\d{2}(?:\\s*\\([^)]*\\))?(?:\\s+by\\s+[^\\n<]{2,80})?)', 'gi'), '\n$1\n');
    text = text.replace(new RegExp('\\b(' + month + '\\s+\\d{1,2}(?:st|nd|rd|th)?[,]?\\s+20\\d{2}(?:\\s*\\([^)]*\\))?(?:\\s+by\\s+[^\\n<]{2,80})?)', 'gi'), '\n$1\n');
    text = text.replace(/\b(20\d{2}[-\/.]\d{1,2}[-\/.]\d{1,2}(?:\s+by\s+[^\n<]{2,80})?)\b/gi, '\n$1\n');
    text = text.replace(/\b(\d{1,2}[\/-]\d{1,2}[\/-]20\d{2}(?:\s+by\s+[^\n<]{2,80})?)\b/gi, '\n$1\n');
    return text;
  }

  function isLargeImport(raw){
    const source = String(raw || '');
    const fileMarkerCount = (source.match(/=====\s+[^\n]+?\s+=====/g) || []).length;
    return source.length > 120000 || fileMarkerCount > 1;
  }

  function fastNormalizeLargeHtmlImport(raw){
    let text = String(raw || '');
    text = text.replace(/<!-- saved from url=.*?-->/gis, '\n');
    text = text.replace(/<script\b[\s\S]*?<\/script>/gi, '\n');
    text = text.replace(/<style\b[\s\S]*?<\/style>/gi, '\n');
    text = text.replace(/<noscript\b[\s\S]*?<\/noscript>/gi, '\n');
    text = text.replace(/<svg\b[\s\S]*?<\/svg>/gi, '\n');
    text = text.replace(/<img\b[^>]*\bsrc\s*=\s*(?:["']([^"']+)["']|([^\s>]+))[^>]*>/gi, (_m, quoted, bare) => `\n[img]${normalizeUrl(quoted || bare)}[/img]\n`);
    text = text.replace(/<br\s*\/?\s*>/gi, '\n');
    text = text.replace(/<\/(?:h[1-6]|p|div|article|section|li|tr|table|header|footer|main|aside)>/gi, '\n');
    text = text.replace(/<(?:h[1-6]|p|div|article|section|li|tr|td|th|table|header|footer|main|aside)\b[^>]*>/gi, '\n');
    text = text.replace(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_m, href, label) => `${label.replace(/<[^>]+>/g, '')} (${href})`);
    text = text.replace(/<[^>]{1,1200}>/g, ' ');
    text = fastDecodeEntities(text);
    return markImportDateBoundaries(cleanText(text).replace(/\n{3,}/g, '\n\n'));
  }

  function normalizeHtmlImportSpacing(raw){
    return markImportDateBoundaries(normalizeImportedText(raw || '')
      .replace(/<br\s*\/?\s*>/gi, '\n')
      .replace(/<\/(?:h[1-6]|p|div|article|section|li|tr|table|header|footer|main|aside)>/gi, '\n')
      .replace(/<(?:h[1-6]|p|div|article|section|li|tr|td|th|table|header|footer|main|aside)\b[^>]*>/gi, '\n')
      .replace(/<img\b[^>]*\bsrc\s*=\s*(?:["']([^"']+)["']|([^\s>]+))[^>]*>/gi, (_, quoted, bare) => `\n[img]${normalizeUrl(quoted || bare)}[/img]\n`)
      .replace(/<a\b[^>]*href\s*=\s*["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => `${label.replace(/<[^>]+>/g, '')} (${href})`)
      .replace(/<[^>]+>/g, ' ')
      .replace(/\n{3,}/g, '\n\n'));
  }

  function importTitleBeforeDate(lines, start){
    for(let i = start - 1; i >= Math.max(0, start - 7); i -= 1){
      const line = cleanText(lines[i]);
      if(!line || lineHasImportDate(line) || isWebsiteShellLine(line)) continue;
      if(line.length < 3 || line.length > 170) continue;
      if(/^(?:posted|published|news|register|login|page|copyright)\b/i.test(line)) continue;
      return line.replace(/^[-•◇◆\s]+/, '').trim();
    }
    return '';
  }

  function meaningfulImportContent(raw){
    return cleanedManualPayload(raw || '').content
      .split('\n')
      .map(cleanText)
      .filter(line => line && !lineHasImportDate(line) && !isWebsiteShellLine(line));
  }

  function splitPlainImports(raw){
    const prepared = isLargeImport(raw) ? fastNormalizeLargeHtmlImport(raw) : normalizeHtmlImportSpacing(raw);
    const text = removeWebsiteShellLines(prepared, hasWebsiteShellNoise(raw), { keepDateLines:true })
      .replace(/\n{3,}/g, '\n\n');
    const lines = text.split('\n').map(cleanText).filter(Boolean);
    const starts = [];
    lines.forEach((line, index) => {
      if(!lineHasImportDate(line)) return;
      const last = starts[starts.length - 1];
      if(last !== undefined && index - last <= 2) return;
      starts.push(index);
    });
    if(starts.length < 1) return [];
    return starts.map((start, pos) => {
      const nextStart = starts[pos + 1] || lines.length;
      const nextTitle = starts[pos + 1] !== undefined ? importTitleBeforeDate(lines, starts[pos + 1]) : '';
      const end = nextTitle && cleanText(lines[nextStart - 1]) === nextTitle ? nextStart - 1 : nextStart;
      const title = importTitleBeforeDate(lines, start);
      const bodyLines = lines.slice(start, end);
      const segment = (title ? [title].concat(bodyLines) : bodyLines).join('\n').trim();
      return { title, date:extractDateFromImport(lines[start]), raw:segment };
    }).filter(row => row.raw.length > 20 && meaningfulImportContent(row.raw).length >= 1);
  }

  function ensureUniqueBatchEntries(entries){
    const seenIds = new Map();
    const seenFingerprints = new Set();
    const seenImportCopies = new Set();
    return entries.map((entry, index) => {
      if(!entry) return null;
      const fp = cleanText(entry.fingerprint || contentFingerprint(entry.content || entry.summary || entry.title || ''));
      const titleKey = compactCompareText(entry.title || '').replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/g, ' ').replace(/\b\d{1,4}\b/g, ' ').replace(/\s+/g, ' ').trim();
      const copyKey = `${entry.world}|${entry.date}|${titleKey}|${fp}`;
      if(fp && seenImportCopies.has(copyKey)) return null;
      const idBase = cleanText(entry.id) || `${entry.world}-${entry.date}-${slug(entry.title)}`;
      const alreadySameContent = fp && seenFingerprints.has(`${entry.world}|${entry.date}|${fp}`);
      let id = idBase;
      if(seenIds.has(idBase) && !alreadySameContent){
        id = `${idBase}-${fp || 'part-' + (index + 1)}`;
      }
      seenIds.set(id, true);
      if(fp){
        seenFingerprints.add(`${entry.world}|${entry.date}|${fp}`);
        seenImportCopies.add(copyKey);
      }
      return Object.assign({}, entry, { id, fingerprint:fp });
    }).filter(Boolean);
  }

  function parseManualEntries(options){
    const raw = options?.raw || options?.content || '';
    const largeImport = isLargeImport(raw);
    const structured = extractStructuredImports(raw);
    const htmlSplit = (structured.length || largeImport) ? [] : extractHtmlPostContainers(raw);
    const split = structured.length ? structured : htmlSplit.length ? htmlSplit : splitPlainImports(raw);
    let out;
    if(split.length > 1){
      out = split.map((row, index) => parseManualEntry(Object.assign({}, options, {
        id:'',
        raw:row.raw,
        content:row.raw,
        title: row.title || (options?.title ? `${options.title} ${index + 1}` : ''),
        date: row.date || options?.date
      })));
    }else if(split.length === 1){
      const row = split[0];
      out = [parseManualEntry(Object.assign({}, options, { raw:row.raw, content:row.raw, title:options?.title || row.title, date:row.date || options?.date }))];
    }else{
      out = [parseManualEntry(options)];
    }
    return ensureUniqueBatchEntries(out);
  }

  function parseManualEntry(options){
    const raw = normalizeImportedText(options?.raw || options?.content || '');
    const world = cleanText(options?.world || 'legacy');
    const worldInfo = worldMeta(world);
    const date = extractDateFromImport(raw, options?.date);
    const year = Number(String(date).slice(0,4)) || new Date().getFullYear();
    const title = stripBrokenBracketTitleTokens(inferTitle(raw, options?.title, worldInfo.name, date));
    const type = inferType(raw, options?.type, title);
    const source = cleanText(options?.source) || 'admin-manual';
    const cleaned = cleanedManualPayload(raw, options?.images || []);
    const content = cleaned.content || title;
    const fingerprint = contentFingerprint(content || title);
    const id = cleanText(options?.id) || `${world}-${date}-${slug(title)}${fingerprint ? '-' + fingerprint : ''}`;
    const importedAuthor = extractAuthorFromImport(raw);
    return {
      id,
      world,
      worldName: worldInfo.name || world,
      title,
      date,
      year,
      type,
      source,
      addedBy: cleanText(options?.addedBy || ''),
      addedAt: cleanText(options?.addedAt || options?.createdAt || ''),
      author: cleanText(options?.author || options?.postedBy || importedAuthor || ''),
      format:'admin-import',
      fingerprint,
      summary: buildSummary(content),
      images:cleaned.images,
      content,
      manual:true
    };
  }

  function entryKey(entry){
    return `${entry.world || ''}|${entry.date || ''}|${cleanText(entry.title).toLowerCase()}`;
  }

  function entryContentKey(entry){
    const fp = cleanText(entry?.fingerprint || contentFingerprint(entry?.content || entry?.summary || ''));
    return fp ? `${entry.world || ''}|${entry.date || ''}|${fp}` : '';
  }

  function compactCompareText(value){
    return stripMarkup(value || '')
      .toLowerCase()
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9\s]+/g, ' ')
      .replace(/\b(?:the|and|for|with|from|this|that|will|have|has|are|was|were|you|your|our|archlight|online|patch|notes|changelog|changelogs|latest|news|register|login)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function compareTokens(value){
    const words = compactCompareText(value).split(' ').filter(word => word.length > 2);
    return new Set(words.slice(0, 260));
  }

  function tokenOverlapScore(a, b){
    const left = compareTokens(a);
    const right = compareTokens(b);
    if(left.size < 8 || right.size < 8) return 0;
    let hits = 0;
    left.forEach(word => { if(right.has(word)) hits += 1; });
    return hits / Math.min(left.size, right.size);
  }

  function normalizedTitleForDuplicate(value){
    return compactCompareText(value || '')
      .replace(/\b(?:new|update|updates|season|server|doors|open|official|launch|addition|added|notes|note)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function sameExistingPost(existing, next){
    if(!existing || !next) return false;
    if((existing.world || '') !== (next.world || '')) return false;
    if((existing.date || '') !== (next.date || '')) return false;
    const existingText = `${existing.title || ''}\n${existing.summary || ''}\n${existing.content || ''}`;
    const nextText = `${next.title || ''}\n${next.summary || ''}\n${next.content || ''}`;
    const titleA = normalizedTitleForDuplicate(existing.title || '');
    const titleB = normalizedTitleForDuplicate(next.title || '');
    if(titleA && titleB && (titleA === titleB || titleA.includes(titleB) || titleB.includes(titleA))) return true;
    const score = tokenOverlapScore(existingText, nextText);
    if(score >= 0.52) return true;
    const shortA = compactCompareText(existing.summary || existing.content || '').slice(0, 420);
    const shortB = compactCompareText(next.summary || next.content || '').slice(0, 420);
    return !!(shortA && shortB && shortA.length > 80 && shortB.length > 80 && (shortA.includes(shortB.slice(0, 120)) || shortB.includes(shortA.slice(0, 120))));
  }

  function duplicateEntryResult(existing, next, source){
    if(!existing) return null;
    return Object.assign({}, existing, {
      _duplicate:true,
      _duplicateSource:source || (existing.manual ? 'manual' : 'archive'),
      _duplicateMessage: source === 'manual' ? 'This patch note was already added manually.' : 'This patch note already exists in the main Updates archive.',
      _attempted:next
    });
  }

  function findDuplicateEntry(entry, options){
    const next = entry && entry.id && entry.world && entry.date && entry.title ? entry : parseManualEntry(entry || {});
    const editingId = cleanText(options?.editingId || '');
    const key = entryKey(next);
    const contentKey = entryContentKey(next);
    const baseDuplicate = (getData().entries || []).find(item => {
      if(!item) return false;
      if(item.id === next.id) return true;
      const itemContentKey = entryContentKey(item);
      if(contentKey && itemContentKey && itemContentKey === contentKey) return true;
      if(entryKey(item) === key) return true;
      return sameExistingPost(item, next);
    });
    if(baseDuplicate) return duplicateEntryResult(baseDuplicate, next, 'archive');
    const manualDuplicate = readManualEntries().find(item => {
      if(!item || item.id === editingId) return false;
      if(item.id === next.id) return true;
      const itemContentKey = entryContentKey(item);
      if(contentKey && itemContentKey && itemContentKey === contentKey) return true;
      if(entryKey(item) === key && itemContentKey && contentKey && itemContentKey === contentKey) return true;
      return sameExistingPost(item, next);
    });
    if(manualDuplicate) return duplicateEntryResult(manualDuplicate, next, 'manual');
    return null;
  }

  function upsertManualEntry(entry, options){
    const next = parseManualEntry(Object.assign({}, entry, {
      addedBy: entry?.addedBy || window.currentUser || window.currentUsername || 'Admin',
      addedAt: entry?.addedAt || new Date().toISOString()
    }));
    const editingId = cleanText(options?.editingId || '');
    const duplicate = findDuplicateEntry(next, { editingId });
    if(duplicate) return duplicate;
    const entries = readManualEntries();
    const contentKey = entryContentKey(next);
    const filtered = entries.filter(item => {
      if(!item) return false;
      if(editingId && item.id === editingId) return false;
      if(item.id === next.id) return false;
      const itemContentKey = entryContentKey(item);
      return !(contentKey && itemContentKey && itemContentKey === contentKey);
    });
    filtered.unshift(next);
    if(saveManualEntries(filtered)){
      if(String(location.hash || '').replace(/^#/, '') === 'updates') render();
      return Object.assign({}, next, { _saved:true });
    }
    return null;
  }

  function removeManualEntry(id){
    const ok = saveManualEntries(readManualEntries().filter(entry => entry.id !== id));
    if(ok && String(location.hash || '').replace(/^#/, '') === 'updates') render();
    return ok;
  }

  function resetManualEntries(){
    const ok = saveManualEntries([]);
    if(ok && String(location.hash || '').replace(/^#/, '') === 'updates') render();
    return ok;
  }

  function allRawEntries(){
    const base = (getData().entries || []);
    const manual = readManualEntries();
    const out = [];
    const ids = new Set();
    const keys = new Set();
    const contentKeys = new Set();
    manual.concat(base).forEach(entry => {
      if(!entry || !entry.id) return;
      const key = entryKey(entry);
      const contentKey = entryContentKey(entry);
      if(ids.has(entry.id)) return;
      if(contentKey && contentKeys.has(contentKey)) return;
      if(!contentKey && keys.has(key)) return;
      ids.add(entry.id);
      keys.add(key);
      if(contentKey) contentKeys.add(contentKey);
      out.push(entry);
    });
    return out;
  }

  function entries(){
    const raw = allRawEntries();
    const signature = raw.map(entry => `${entry.id}:${entry.date}:${entry.fingerprint || ''}`).join('|');
    if(entryListCache.list && entryListCache.signature === signature) return entryListCache.list;
    const list = raw.map(entry => ({ ...entry, displayType: normalizeType(entry.type, entry.title) })).sort((a,b) => String(b.date || '').localeCompare(String(a.date || '')));
    entryListCache = { signature, list };
    return list;
  }

  function filteredEntries(allEntries){
    const query = state.q.toLowerCase().trim();
    const source = Array.isArray(allEntries) ? allEntries : entries();
    return source.filter(entry => {
      if(state.world !== 'all' && entry.world !== state.world) return false;
      if(state.type !== 'all' && entry.displayType !== state.type) return false;
      if(state.year !== 'all' && String(entry.year) !== String(state.year)) return false;
      if(query && !entrySearchText(entry).includes(query)) return false;
      return true;
    });
  }

  function stats(allEntries){
    const yearList = getYears(allEntries);
    const yearRange = yearList.length ? `${yearList[yearList.length - 1]}–${yearList[0]}` : '—';
    return [
      { label:'Entries', value:allEntries.length },
      { label:'Worlds', value:worlds().filter(world => world.id !== 'all').length },
      { label:'Years', value:yearRange },
      { label:'Long notes', value:allEntries.filter(entry => entryMeta(entry).long).length }
    ];
  }

  function filterButton(kind, value, label, icon){
    const active = String(state[kind]) === String(value);
    return `<button class="updates-filter${active ? ' is-active' : ''}" type="button" data-filter-kind="${esc(kind)}" data-filter-value="${esc(value)}"><span aria-hidden="true">${esc(icon || '◇')}</span>${esc(label)}</button>`;
  }

  function renderHero(allEntries){
    return `<section class="updates-hero" aria-label="Updates archive overview">
      <div class="updates-hero__content">
        <p class="updates-kicker"><span aria-hidden="true">✦</span> Archlight Chronicle</p>
        <h1>Updates Archive</h1>
        <p class="updates-hero__subtitle">Patch notes and changelogs across Archlight worlds, preserved as a readable archive for players and future wiki value updates.</p>
      </div>
      <div class="updates-hero__stats">${stats(allEntries).map(item => `<span><b>${esc(item.value)}</b><small>${esc(item.label)}</small></span>`).join('')}</div>
    </section>`;
  }

  function entriesForYearOptions(allEntries){
    return allEntries.filter(entry => {
      if(state.world !== 'all' && entry.world !== state.world) return false;
      if(state.type !== 'all' && entry.displayType !== state.type) return false;
      return true;
    });
  }

  function ensureValidYear(allEntries){
    if(state.year === 'all') return;
    const availableYears = new Set(getYears(entriesForYearOptions(allEntries)).map(String));
    if(!availableYears.has(String(state.year))) state.year = 'all';
  }

  function renderControls(allEntries, list){
    const yearSource = entriesForYearOptions(allEntries);
    const worldFilters = worlds().map(world => filterButton('world', world.id, world.name, world.icon)).join('');
    const typeFilters = visibleTypes.map(type => filterButton('type', type.id, type.name, type.icon)).join('');
    const yearFilters = filterButton('year', 'all', 'All Years', '◆') + getYears(yearSource).slice(0, 26).map(year => filterButton('year', String(year), String(year), '◇')).join('');
    return `<section class="updates-controls" aria-label="Archive filters">
      <div class="updates-controls__search">
        <label class="updates-search"><span aria-hidden="true">⌕</span><input id="updates-search-input" type="search" autocomplete="off" placeholder="Search notes, systems, classes, items, values…" value="${esc(state.q)}"></label>
        <div class="updates-results"><strong>${esc(list.length)}</strong><span>results</span></div>
        <button class="updates-reset" type="button" data-reset-updates>Clear filters</button>
      </div>
      <div class="updates-controls__filters">
        <div class="updates-filter-group"><b>World</b><div>${worldFilters}</div></div>
        <div class="updates-filter-group"><b>Type</b><div>${typeFilters}</div></div>
        <div class="updates-filter-group updates-filter-group--years"><b>Year</b><div>${yearFilters}</div></div>
      </div>
    </section>`;
  }

  function summaryStats(list){
    const worldCounts = new Map();
    const typeCounts = new Map();
    list.forEach(entry => {
      worldCounts.set(entry.world, (worldCounts.get(entry.world) || 0) + 1);
      typeCounts.set(entry.displayType, (typeCounts.get(entry.displayType) || 0) + 1);
    });
    const worldRows = Array.from(worldCounts.entries()).sort((a,b) => b[1]-a[1]).slice(0, 5).map(([id,count]) => {
      const world = worldMeta(id);
      return `<li><span>${esc(world.icon)} ${esc(world.name)}</span><b>${esc(count)}</b></li>`;
    }).join('') || '<li><span>No worlds</span><b>0</b></li>';
    const typeRows = Array.from(typeCounts.entries()).sort((a,b) => b[1]-a[1]).map(([id,count]) => {
      const type = typeMeta(id);
      return `<li><span>${esc(type.icon)} ${esc(type.name)}</span><b>${esc(count)}</b></li>`;
    }).join('') || '<li><span>No types</span><b>0</b></li>';
    return `<aside class="updates-index" aria-label="Current archive summary">
      <div class="updates-index__card"><h2>Current View</h2><p>${esc(list.length)} entries match the active filters.</p><ul>${worldRows}</ul></div>
      <div class="updates-index__card"><h2>Note Types</h2><ul>${typeRows}</ul></div>
    </aside>`;
  }

  function entryAudit(entry){
    const name = cleanText(entry?.addedBy || entry?.author || entry?.postedBy || (entry?.manual ? 'Admin' : 'Archlight Team'));
    const time = entry?.manual && entry?.addedAt ? formatDateTime(entry.addedAt) : formatDate(entry?.date);
    return { name, time, label: entry?.manual ? 'Added by' : 'Posted by', timeLabel: entry?.manual ? 'Added' : 'Published' };
  }

  function renderEntry(entry){
    const meta = entryMeta(entry);
    const world = worldMeta(entry.world);
    const type = typeMeta(meta.type);
    const parts = dateParts(entry.date);
    const audit = entryAudit(entry);
    return `<article class="updates-entry${meta.long ? ' updates-entry--long' : ''}" data-entry-id="${esc(entry.id)}">
      <div class="updates-entry__date"><b>${esc(parts.day || '--')}</b><small>${esc(parts.month)}</small><em>${esc(entry.year || parts.year)}</em></div>
      <div class="updates-entry__body">
        <div class="updates-entry__meta">
          <i class="updates-badge updates-badge--world">${esc(world.icon)} ${esc(world.name)}</i>
          <i class="updates-badge updates-badge--type">${esc(type.icon)} ${esc(type.name)}</i>
          ${meta.long ? '<i class="updates-badge updates-badge--long">Long note</i>' : ''}
          ${meta.images.length ? `<i class="updates-badge updates-badge--image">${meta.images.length} image${meta.images.length > 1 ? 's' : ''}</i>` : ''}
          <i class="updates-badge updates-badge--audit">${esc(audit.label)} ${esc(audit.name)}</i>
          <i class="updates-badge updates-badge--audit-time">${esc(audit.timeLabel)} ${esc(audit.time)}</i>
        </div>
        <h2 class="updates-entry__title">${esc(entry.title)}</h2>
        <p class="updates-entry__preview">${esc(meta.preview)}</p>
      </div>
      <div class="updates-entry__actions"><button type="button" data-open-entry="${esc(entry.id)}"><span>Open Reader</span><b aria-hidden="true">↗</b></button></div>
    </article>`;
  }

  function renderList(list){
    if(!list.length){
      return `<main class="updates-list" aria-label="Update entries"><div class="updates-empty"><b>No notes found</b><span>Try clearing filters or using a broader search term.</span><button type="button" data-reset-updates>Clear filters</button></div></main>`;
    }
    const firstCount = Math.min(list.length, 90);
    const first = list.slice(0, firstCount).map(renderEntry).join('');
    const status = list.length > firstCount ? `<div class="updates-stream-status" data-updates-stream-status>Loading remaining ${esc(list.length - firstCount)} entries without blocking the page…</div>` : '';
    return `<main class="updates-list" aria-label="Update entries" data-updates-list>${first}${status}</main>`;
  }

  function scheduleRemainingEntries(list, start, token){
    if(!Array.isArray(list) || start >= list.length) return;
    const root = document.querySelector('[data-updates-list]');
    if(!root) return;
    const run = deadline => {
      if(token !== renderToken) return;
      const status = root.querySelector('[data-updates-stream-status]');
      let index = start;
      const chunk = [];
      const max = 55;
      while(index < list.length && chunk.length < max && (!deadline || deadline.timeRemaining() > 6 || chunk.length < 12)){
        chunk.push(renderEntry(list[index]));
        index += 1;
      }
      if(chunk.length){
        const wrap = document.createElement('div');
        wrap.innerHTML = chunk.join('');
        while(wrap.firstChild) root.insertBefore(wrap.firstChild, status || null);
      }
      if(status){
        const remaining = list.length - index;
        if(remaining > 0){
          status.textContent = `Loading remaining ${remaining} entries without blocking the page…`;
        }else{
          status.remove();
        }
      }
      if(index < list.length){
        scheduleRemainingEntries(list, index, token);
      }
    };
    if(window.requestIdleCallback){
      window.requestIdleCallback(run, { timeout:180 });
    }else{
      setTimeout(() => run(null), 16);
    }
  }

  function readerRoot(){
    let root = document.getElementById('updates-reader-root');
    if(!root){
      root = document.createElement('div');
      root.id = 'updates-reader-root';
      document.body.appendChild(root);
    }
    return root;
  }

  function renderReaderShell(entry){
    const meta = entryMeta(entry);
    const world = worldMeta(entry.world);
    const type = typeMeta(meta.type);
    const audit = entryAudit(entry);
    return `<div class="updates-reader" role="dialog" aria-modal="true" aria-label="${esc(entry.title)}">
      <button class="updates-reader__backdrop" type="button" data-close-reader aria-label="Close reader"></button>
      <article class="updates-reader__panel">
        <header class="updates-reader__header">
          <div class="updates-reader__title">
            <span class="updates-reader__crest" aria-hidden="true">${esc(world.icon)}</span>
            <div>
              <div class="updates-reader__meta"><i>${esc(world.name)}</i><i>${esc(type.icon)} ${esc(type.name)}</i><i>${esc(formatDate(entry.date))}</i>${meta.long ? '<i>Long note</i>' : ''}${meta.images.length ? `<i>${meta.images.length} images</i>` : ''}<i>${esc(audit.label)} ${esc(audit.name)}</i><i>${esc(audit.timeLabel)} ${esc(audit.time)}</i></div>
              <h2>${esc(entry.title)}</h2>
            </div>
          </div>
          <div class="updates-reader__actions"><button type="button" data-copy-entry="${esc(entry.id)}">Copy text</button><button type="button" data-close-reader>Close</button></div>
        </header>
        <main class="updates-reader__body"><article class="updates-note"><p class="updates-note__loading">Opening archive note…</p></article></main>
      </article>
    </div>`;
  }

  function fillReaderBody(entry){
    const root = readerRoot();
    const body = root.querySelector('.updates-reader__body .updates-note');
    if(!body || !state.active || state.active !== entry.id) return;
    const parsed = note(entry);
    body.innerHTML = `${parsed.map}${parsed.html}`;
  }

  function openReader(id){
    const entry = allRawEntries().find(item => item.id === id);
    if(!entry) return;
    state.active = id;
    const root = readerRoot();
    root.innerHTML = renderReaderShell(entry);
    document.documentElement.classList.add('updates-reader-open');
    if(window.requestIdleCallback){
      window.requestIdleCallback(() => fillReaderBody(entry), { timeout:160 });
    }else{
      setTimeout(() => fillReaderBody(entry), 0);
    }
  }

  function closeReader(){
    state.active = null;
    readerRoot().innerHTML = '';
    document.documentElement.classList.remove('updates-reader-open');
  }

  function render(){
    const host = document.getElementById('pg-updates');
    if(!host) return false;
    const allEntries = entries();
    ensureValidYear(allEntries);
    const list = filteredEntries(allEntries);
    host.innerHTML = `<div class="updates-page" data-updates-page="canonical-updates-archive">
      ${renderHero(allEntries)}
      ${renderControls(allEntries, list)}
      <section class="updates-layout" aria-label="Updates archive content">
        ${renderList(list)}
        ${summaryStats(list)}
      </section>
    </div>`;
    bind(host);
    bindReader();
    const token = ++renderToken;
    scheduleRemainingEntries(list, 90, token);
    return true;
  }

  function resetFilters(){
    state.world = 'all'; state.type = 'all'; state.year = 'all'; state.q = '';
    closeReader(); render();
  }

  function bind(host){
    if(!host || host.__updatesDelegated) return;
    host.__updatesDelegated = true;
    host.addEventListener('click', event => {
      const filter = event.target.closest('[data-filter-kind]');
      if(filter && host.contains(filter)){
        event.preventDefault();
        const kind = filter.dataset.filterKind;
        state[kind] = filter.dataset.filterValue;
        if(kind === 'world' || kind === 'type') state.year = 'all';
        closeReader(); render(); return;
      }
      const open = event.target.closest('[data-open-entry]');
      if(open && host.contains(open)){
        event.preventDefault(); openReader(open.dataset.openEntry); return;
      }
      const reset = event.target.closest('[data-reset-updates]');
      if(reset && host.contains(reset)){ event.preventDefault(); resetFilters(); }
    });
    let searchTimer = null;
    host.addEventListener('input', event => {
      if(event.target && event.target.id === 'updates-search-input'){
        state.q = event.target.value;
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
          render();
          const input = document.getElementById('updates-search-input');
          if(input){ input.focus(); input.setSelectionRange(input.value.length, input.value.length); }
        }, 90);
      }
    });
    if(!document.__updatesEscapeBound){
      document.__updatesEscapeBound = true;
      document.addEventListener('keydown', event => { if(event.key === 'Escape' && state.active) closeReader(); });
    }
  }

  function bindReader(){
    if(document.__updatesReaderDelegated) return;
    document.__updatesReaderDelegated = true;
    document.addEventListener('click', event => {
      const close = event.target.closest('[data-close-reader]');
      if(close){ event.preventDefault(); closeReader(); return; }
      const copy = event.target.closest('[data-copy-entry]');
      if(copy){
        event.preventDefault();
        const entry = allRawEntries().find(item => item.id === copy.dataset.copyEntry);
        if(!entry) return;
        const text = `${entry.title}\n${entry.date || ''}\n${worldMeta(entry.world).name} · ${typeMeta(entryMeta(entry).type).name}\n\n${note(entry).clean || stripMarkup(entry.content || '')}`;
        if(navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(() => {});
        copy.textContent = 'Copied';
        setTimeout(() => { copy.textContent = 'Copy text'; }, 1200);
      }
    });
  }

  function boot(){
    const host = document.getElementById('pg-updates');
    if(host && !host.dataset.updatesBooted){ host.dataset.updatesBooted = 'true'; render(); }
  }

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once:true });
  else boot();
  window.addEventListener('hashchange', () => { if(String(location.hash || '').replace(/^#/, '') === 'updates') render(); });
  window.UpdatesPage = { render, state, boot, openReader, closeReader, admin:{ parseManualEntry, parseManualEntries, importCoverageWarnings, upsertManualEntry, findDuplicateEntry, removeManualEntry, resetManualEntries, getManualEntries:readManualEntries, storageKey:manualStorageKey, previewNote(entry){ const parsed = note(entry || {}); const meta = entryMeta(entry || {}); return { html:parsed.html, map:parsed.map, clean:parsed.clean, meta }; } } };
})();
