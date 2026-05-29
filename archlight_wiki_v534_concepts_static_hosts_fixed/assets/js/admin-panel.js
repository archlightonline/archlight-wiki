(function(){
  'use strict';
  if(window.__archlightAdminPanelLive) return;
  window.__archlightAdminPanelLive = true;

  const $ = (s,r=document)=>r.querySelector(s);
  const $$ = (s,r=document)=>Array.from(r.querySelectorAll(s));
  const esc = s => String(s||'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const cleanText = s => String(s||'').trim();
  const currentAdminName = () => cleanText(window.currentUser || window.currentUsername || window.currentRole || 'Admin');
  const formatAuditTime = value => {
    const date = value ? new Date(value) : new Date();
    if(Number.isNaN(date.getTime())) return cleanText(value);
    return date.toLocaleString(undefined, {year:'numeric', month:'short', day:'2-digit', hour:'2-digit', minute:'2-digit'});
  };
  const isAdmin = () => ['wiki_admin','admin'].includes(window.currentRole);
  const tipsApi = () => window.ArchlightDidYouKnow;
  const worldsApi = () => window.ArchlightWorlds;
  const alertsApi = () => window.ArchlightHomeAnnouncements;
  const updatesApi = () => window.UpdatesPage?.admin;

  function ensureHost(){
    let host = document.getElementById('pg-admin');
    if(!host){
      host = document.createElement('div');
      host.id = 'pg-admin';
      document.getElementById('main').appendChild(host);
    }
    host.classList.add('pg');
    return host;
  }

  function siteStats(){
    const nav = window.ARCHLIGHT_NAV_PAGES || [];
    const groups = window.ARCHLIGHT_SIDEBAR_GROUPS || [];
    const unlocks = window.UnlockTasks?.pages || [];
    const updates = window.ARCHLIGHT_UPDATES_DATA?.entries || [];
    const worlds = worldsApi()?.getWorlds?.() || [];
    const tips = tipsApi()?.getTips?.() || [];
    const alerts = alertsApi()?.getAll?.() || [];
    const manualUpdates = updatesApi()?.getManualEntries?.() || [];
    const visibleWorlds = worlds.filter(w=>w.enabled !== false).length;
    return [
      {n:nav.length, l:'Sidebar Pages', d:'navigation.js'},
      {n:groups.length, l:'Nav Groups', d:'source controlled'},
      {n:unlocks.length, l:'Unlock Detail Pages', d:'shared renderer'},
      {n:updates.length + manualUpdates.length, l:'Patch Notes', d:manualUpdates.length ? `${manualUpdates.length} manual added` : 'updates archive'},
      {n:visibleWorlds, l:'World Pills', d:(worldsApi()?.isDisplayEnabled?.()===false?'navbar hidden':'navbar visible')},
      {n:alerts.filter(a=>a.enabled!==false).length, l:'Home Alerts', d:'announcements + warnings'},
      {n:tips.length, l:'Archlight Tips', d:'carousel pool'}
    ];
  }

  function statCards(){
    return siteStats().map(s=>`<article class="adp-stat"><b>${esc(s.n)}</b><span>${esc(s.l)}</span><small>${esc(s.d)}</small></article>`).join('');
  }

  function statDeepCards(){
    return siteStats().map(s=>`<article class="adp-stat-deep-card"><div class="adp-stat-deep-copy"><span>${esc(s.l)}</span><small>${esc(s.d)}</small></div><b>${esc(s.n)}</b></article>`).join('');
  }

  function statusPicker(world){
    const status = cleanText(world.status || (world.online ? 'online' : 'offline')) || 'offline';
    const options = [
      {id:'online', label:'Online', icon:'●'},
      {id:'maintenance', label:'Maintenance', icon:'◆'},
      {id:'offline', label:'Offline', icon:'○'}
    ];
    return `<div class="adp-status-picker" data-world-status="${esc(world.id)}" aria-label="World status">${options.map(opt=>`<button type="button" class="${status===opt.id?'on':''}" data-status-choice="${opt.id}"><span>${opt.icon}</span>${opt.label}</button>`).join('')}</div>`;
  }

  function worldRows(){
    const worlds = worldsApi()?.getWorlds?.() || [];
    return worlds.map(w=>{
      const status = cleanText(w.status || (w.online ? 'online' : 'offline')) || 'offline';
      return `<article class="adp-world is-${esc(status)}" data-world-row="${esc(w.id)}">
        <div class="adp-world-top">
          <div class="adp-world-identity"><span class="adp-world-rune">${esc(w.rune||'✦')}</span><div><b>${esc(w.name||w.id)}</b><small>${esc(w.tagline||'World ruleset')}</small></div></div>
          <div class="adp-status-control"><span>Status</span>${statusPicker(w)}</div>
          <label class="adp-toggle"><input type="checkbox" data-world-enabled="${esc(w.id)}" ${w.enabled!==false?'checked':''}/><span></span> Show in navbar</label>
          <button class="adp-mini danger" type="button" data-world-remove="${esc(w.id)}">Remove</button>
        </div>
        <div class="adp-grid two">
          <label>Name<input data-world-field="name" value="${esc(w.name)}"></label>
          <label>ID<input data-world-field="id" value="${esc(w.id)}" disabled></label>
          <label>Short Label<input data-world-field="short" value="${esc(w.short||'')}"></label>
          <label>Tagline<input data-world-field="tagline" value="${esc(w.tagline||'')}"></label>
        </div>
        <label class="adp-wide">Rules / Difference<textarea data-world-field="rules">${esc(w.rules||'')}</textarea></label>
        <label class="adp-wide">Best For<textarea data-world-field="bestFor">${esc(w.bestFor||'')}</textarea></label>
      </article>`;
    }).join('') || '<div class="adp-empty">No worlds configured yet.</div>';
  }

  function tipRows(){
    const tips = tipsApi()?.getTips?.() || [];
    return tips.map((t,i)=>{
      const source = esc(t.source||'Archlight');
      const text = esc(strip(t.text||''));
      const number = String(i+1).padStart(2,'0');
      return `<article class="adp-tip" data-tip-row="${i}">
        <button class="adp-tip-main" type="button" data-tip-preview="${i}" aria-expanded="false">
          <span class="adp-tip-ico">${esc(t.ico||'✨')}</span>
          <span class="adp-tip-copy"><small>Tip ${number} · ${source}</small><b>${text}</b></span>
        </button>
        <div class="adp-tip-actions">
          <button class="adp-mini icon" type="button" title="Move up" aria-label="Move tip up" data-tip-up="${i}">↑</button>
          <button class="adp-mini icon" type="button" title="Move down" aria-label="Move tip down" data-tip-down="${i}">↓</button>
          <button class="adp-mini" type="button" data-tip-edit="${i}">Edit</button>
          <button class="adp-mini danger" type="button" data-tip-remove="${i}">Remove</button>
        </div>
        <div class="adp-tip-preview"><strong>${source}</strong><span>${text}</span></div>
      </article>`;
    }).join('') || '<div class="adp-empty">No tips configured yet.</div>';
  }


  function alertStatus(alert){
    return alertsApi()?.statusOf?.(alert) || 'unknown';
  }

  function alertLevelIcon(level){
    return ({announcement:'📣', warning:'⚠', event:'✦', maintenance:'⚙'})[cleanText(level)] || '📣';
  }

  function alertRows(){
    const alerts = alertsApi()?.getAll?.() || [];
    return alerts.map((a)=>{
      const status = alertStatus(a);
      return `<article class="adp-alert is-${esc(status)}" data-alert-row="${esc(a.id)}">
        <div class="adp-alert-main">
          <div class="adp-alert-badge ${esc(a.level||'announcement')}"><i aria-hidden="true">${esc(alertLevelIcon(a.level))}</i><span>${esc(a.level||'announcement')}</span></div>
          <div><b>${esc(a.title)}</b><span>${esc(a.eyebrow||'Announcement')} · ${a.postedBy?'By '+esc(a.postedBy)+' · ':''}${a.forever?'Forever':'Timed'} · ${esc(status)}</span></div>
        </div>
        <p>${esc(a.body||'No body text.')}</p>
        <div class="adp-alert-meta">
          <span>${a.startsAt&&!a.forever?'Starts: '+esc(a.startsAt):'Starts: now'}</span>
          <span>${a.endsAt&&!a.forever?'Ends: '+esc(a.endsAt):'No end date'}</span>
          <span>Priority: ${esc(a.priority||0)}</span>
        </div>
        <div class="adp-alert-actions">
          <button class="adp-mini" type="button" data-alert-edit="${esc(a.id)}">Edit</button>
          <button class="adp-mini danger" type="button" data-alert-remove="${esc(a.id)}">Remove</button>
        </div>
      </article>`;
    }).join('') || '<div class="adp-empty">No home announcements configured yet.</div>';
  }



  function updateWorldOptions(){
    const data = window.ARCHLIGHT_UPDATES_DATA || { worlds:[], entries:[] };
    const manual = updatesApi()?.getManualEntries?.() || [];
    const known = new Map();
    const counts = new Map();
    (data.worlds || []).forEach(w => { if(w?.id) known.set(w.id, w.name || w.id); });
    (data.entries || []).concat(manual).forEach(e => {
      if(!e?.world) return;
      known.set(e.world, e.worldName || known.get(e.world) || e.world);
      counts.set(e.world, (counts.get(e.world) || 0) + 1);
    });
    return Array.from(known.entries()).sort((a,b)=>a[1].localeCompare(b[1])).map(([id,name]) => `<option value="${esc(id)}">${esc(name)}${counts.has(id) ? ' · '+counts.get(id)+' entries' : ''}</option>`).join('');
  }

  function updateRows(){
    const entries = updatesApi()?.getManualEntries?.() || [];
    return entries.map(entry => `<article class="adp-update-row" data-update-row="${esc(entry.id)}">
      <div class="adp-update-row-main"><b>${esc(entry.title)}</b><span>${esc(entry.worldName || entry.world)} · ${esc(entry.date)} · ${esc(entry.type || 'patch-notes')} · ${esc(entry.images?.length || 0)} images</span><p>${esc(entry.summary || 'No summary generated.')}</p></div>
      <div class="adp-update-row-actions"><button class="adp-mini" type="button" data-update-edit="${esc(entry.id)}">Edit</button><button class="adp-mini" type="button" data-update-copy="${esc(entry.id)}">Copy JSON</button><button class="adp-mini danger" type="button" data-update-remove="${esc(entry.id)}">Remove</button></div>
    </article>`).join('') || '<div class="adp-empty">No manual patch notes added yet. Paste a Discord changelog or upload a text/html file to begin. If the same note already exists, the importer will show an Already Entered warning and skip it.</div>';
  }

  function sampleUpdatePlaceholder(){
    return `Example:\nAbaldar Changelog [5/19/2026]\n\nAdded\n- New entry here\n\nFixed\n- Fixed issue with X\n\nChanged\n- Reduced Y from 10% to 8%\n\nImages can be pasted as URLs, [img]https://...[/img], <img src="...">, or Markdown image links.`;
  }

  function strip(html){
    const div = document.createElement('div');
    div.innerHTML = String(html||'');
    return div.textContent || div.innerText || '';
  }

  function notifyWikiActivity(data){
    if(!window.ArchlightActivity?.add) return;
    window.ArchlightActivity.add(Object.assign({
      type:'update',
      action:'updated',
      page:'Admin Panel',
      user:currentAdminName(),
      role:window.currentRole || 'wiki_admin',
      time:formatAuditTime(new Date().toISOString()),
      impact:'Wiki control room change saved'
    }, data || {}));
  }




  function contributorsApi(){ return window.ArchlightContributorsAdmin || window.ContributorsCore; }

  function contributorRoleRows(){
    const api = contributorsApi();
    if(!api) return '<div class="adp-empty">Contributor system is not loaded yet.</div>';
    const staffRoles = api.staffRoles?.() || [];
    const earnedRoles = api.earnedRoles?.() || [];
    return (api.contributors?.() || []).map(contributor => {
      const selectedStaff = new Set(api.staffRoleLabels?.(contributor) || contributor.staffRoles || ['Contributor']);
      const earned = api.earnedRoleObject?.(contributor) || {};
      const staffChecks = staffRoles.map(role => `<label class="adp-role-check" style="--role-color:${esc(role.color || '#d8c47a')}"><input type="checkbox" data-contrib-staff="${esc(role.name)}" ${selectedStaff.has(role.name) ? 'checked' : ''}><span>${esc(role.name)}</span></label>`).join('');
      const earnedOptions = earnedRoles.map(role => `<option value="${esc(role.name)}" ${role.name === earned.name ? 'selected' : ''}>${esc(role.name)} · ${Number(role.points || 0).toLocaleString()} stars</option>`).join('');
      return `<article class="adp-contrib-role-row" data-contrib-name="${esc(contributor._baseName || contributor.name)}">
        <div class="adp-contrib-id"><span>${esc(contributor.emoji || '👤')}</span><div><b>${esc(contributor.name)}</b><small>${Number(contributor.points || 0).toLocaleString()} lifetime contribution stars · ${Number(contributor.seasonPoints || 0).toLocaleString()} season contribution stars</small></div></div>
        <label class="adp-contrib-display-name">Display name<input data-contrib-display-name value="${esc(contributor.name)}"></label>
        <div class="adp-contrib-staff"><strong>Identity roles</strong><div>${staffChecks}</div></div>
        <label class="adp-contrib-earned">Earned wiki rank<select data-contrib-earned>${earnedOptions}</select></label>
      </article>`;
    }).join('') || '<div class="adp-empty">No contributors configured yet.</div>';
  }

  function contributionPointRows(){
    const api = contributorsApi();
    if(!api) return '<div class="adp-empty">Contribution star rules are not loaded yet.</div>';
    return (api.contributionPointRules?.() || []).map(rule => `<article class="adp-point-rule-row" data-point-rule="${esc(rule.id)}">
      <div><b>${esc(rule.label || rule.id)}</b><p>${esc(rule.description || 'Approved contribution type.')}</p></div>
      <label>Contribution stars<input type="number" min="0" step="1" value="${esc(rule.points || 0)}" data-point-rule-value></label>
    </article>`).join('') || '<div class="adp-empty">No star rules configured yet.</div>';
  }

  function earnedRoleRequirementRows(){
    const api = contributorsApi();
    if(!api) return '<div class="adp-empty">Earned wiki ranks are not loaded yet.</div>';
    return (api.earnedRoles?.() || []).map(role => `<article class="adp-earned-role-row" data-earned-role="${esc(role.id)}" style="--role-color:${esc(role.color || '#d8c47a')}">
      <div><b>${esc(role.name || role.id)}</b><p>${esc(role.description || 'Earned contributor rank.')}</p><small>Animation tier ${Number(role.tier || 1)}</small></div>
      <label>Required lifetime stars<input type="number" min="0" step="1" value="${esc(role.points || 0)}" data-earned-role-points></label>
    </article>`).join('') || '<div class="adp-empty">No earned wiki ranks configured yet.</div>';
  }

  function seasonRewardRows(){
    const api = contributorsApi();
    if(!api?.seasonRewards) return '<div class="adp-empty">Season rewards are not loaded yet.</div>';
    return (api.seasonRewards() || []).map(reward => `<article class="adp-season-reward-row" data-season-reward-rank="${esc(reward.rank)}">
      <div><b>${esc(reward.icon || '✦')} Rank #${esc(reward.rank)} · ${esc(reward.label || 'Season reward')}</b><p>${esc(reward.extra || 'Season leaderboard recognition.')}</p></div>
      <label>Next-season contribution stars<input type="number" min="0" step="1" value="${esc(reward.bonus || 0)}" data-season-reward-bonus></label>
    </article>`).join('') || '<div class="adp-empty">No season rewards configured yet.</div>';
  }

  const PAYOUT_STORAGE_KEY = 'archlight_wiki_archlight_coin_payouts_v1';

  function currentMonthKey(){
    const now = new Date();
    return now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  }

  function monthLabel(key){
    const match = String(key || '').match(/^(\d{4})-(\d{2})$/);
    if(!match) return String(key || 'Current month');
    const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
    return date.toLocaleString(undefined, { month:'long', year:'numeric' });
  }

  function monthOffsetKey(offset){
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + offset, 1).getFullYear() + '-' + String(new Date(now.getFullYear(), now.getMonth() + offset, 1).getMonth() + 1).padStart(2, '0');
  }

  function readPayoutState(){
    try{
      const parsed = JSON.parse(localStorage.getItem(PAYOUT_STORAGE_KEY) || '{}');
      if(parsed && typeof parsed === 'object') return Object.assign({months:{}}, parsed);
    }catch(error){}
    return {months:{}};
  }

  function writePayoutState(state){
    try{ localStorage.setItem(PAYOUT_STORAGE_KEY, JSON.stringify(Object.assign({months:{}}, state || {}))); }
    catch(error){}
  }

  function selectedPayoutMonth(){
    return cleanText($('#adp-payout-month')?.value) || currentMonthKey();
  }

  function payoutMonthOptions(selected){
    const state = readPayoutState();
    const keys = new Set(Object.keys(state.months || {}));
    for(let i = -12; i <= 1; i++) keys.add(monthOffsetKey(i));
    const current = currentMonthKey();
    keys.add(current);
    const chosen = selected || current;
    keys.add(chosen);
    return Array.from(keys).sort().reverse().map(key => `<option value="${esc(key)}" ${key === chosen ? 'selected' : ''}>${esc(monthLabel(key))}${key === current ? ' · current' : ''}</option>`).join('');
  }

  function contributorPayoutKey(contributor){
    return cleanText(contributor._baseName || contributor.name).toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'') || cleanText(contributor.name);
  }

  function buildCurrentPayoutRows(){
    const api = contributorsApi();
    if(!api?.sorted) return [];
    return api.sorted().map((c, index) => {
      const rank = index + 1;
      const seasonScore = Number(api.seasonPts?.(c) || c.seasonPoints || 0);
      const estimate = archlightCoinEstimate(seasonScore, rank);
      return {
        key: contributorPayoutKey(c),
        name: c.name,
        role: c.earnedRole || c.title || 'Contributor',
        rank,
        seasonScore,
        suggestedCoins: estimate.coins,
        coins: estimate.coins,
        tier: estimate.tier,
        reason: estimate.reason,
        granted: false,
        grantedAt: '',
        grantedBy: ''
      };
    });
  }

  function ensurePayoutMonth(month, options = {}){
    const key = month || currentMonthKey();
    const state = readPayoutState();
    state.months = state.months || {};
    if(!state.months[key] || options.refresh){
      const previous = state.months[key]?.rows || [];
      const previousByKey = new Map(previous.map(row => [row.key, row]));
      const rows = buildCurrentPayoutRows().map(row => {
        const old = previousByKey.get(row.key) || {};
        return Object.assign({}, row, {
          granted: !!old.granted,
          grantedAt: old.grantedAt || '',
          grantedBy: old.grantedBy || '',
          coins: Number(old.coins ?? row.coins ?? row.suggestedCoins ?? 0)
        });
      });
      state.months[key] = Object.assign({}, state.months[key] || {}, {
        month:key,
        label:monthLabel(key),
        updatedAt:new Date().toISOString(),
        rows
      });
      writePayoutState(state);
    }
    return state.months[key];
  }

  function savePayoutMonthFromDom(){
    const month = selectedPayoutMonth();
    const state = readPayoutState();
    state.months = state.months || {};
    const current = ensurePayoutMonth(month);
    const rows = $$('.adp-payout-row').map(row => {
      const key = row.dataset.payoutUser;
      const existing = (current.rows || []).find(item => item.key === key) || {};
      const granted = !!$('[data-payout-granted]', row)?.checked;
      const coins = Math.max(0, Math.round(Number($('[data-payout-coins]', row)?.value || existing.coins || existing.suggestedCoins || 0)));
      const score = Math.max(0, Math.round(Number($('[data-payout-score-edit]', row)?.value || existing.seasonScore || 0)));
      const rank = Math.max(1, Math.round(Number(row.dataset.payoutRank || existing.rank || 0)));
      const estimate = archlightCoinEstimate(score, rank);
      return Object.assign({}, existing, {
        key,
        rank,
        seasonScore:score,
        suggestedCoins:estimate.coins,
        coins,
        tier:estimate.tier,
        reason:estimate.reason,
        granted,
        grantedAt: granted ? (existing.grantedAt || new Date().toISOString()) : '',
        grantedBy: granted ? (existing.grantedBy || currentAdminName()) : ''
      });
    });
    state.months[month] = Object.assign({}, current, {updatedAt:new Date().toISOString(), rows});
    writePayoutState(state);
    return state.months[month];
  }

  function payoutTotalsByUser(){
    const state = readPayoutState();
    const totals = new Map();
    Object.values(state.months || {}).forEach(month => {
      (month.rows || []).forEach(row => {
        if(!row.granted) return;
        const key = row.key || cleanText(row.name).toLowerCase();
        totals.set(key, (totals.get(key) || 0) + Number(row.coins || row.suggestedCoins || 0));
      });
    });
    return totals;
  }

  function archlightCoinEstimate(score, rank){
    const s = Math.max(0, Number(score || 0));
    if(s < 40) return {coins:0, tier:'Not eligible', reason:'Below the monthly minimum'};
    let base = 25;
    let tier = 'Valid help';
    if(s >= 400){ base = 350; tier = 'Exceptional month'; }
    else if(s >= 250){ base = 220; tier = 'High impact'; }
    else if(s >= 150){ base = 120; tier = 'Strong help'; }
    else if(s >= 80){ base = 60; tier = 'Useful help'; }
    const rankBonus = rank === 1 ? 100 : rank === 2 ? 60 : rank === 3 ? 35 : 0;
    const coins = Math.min(450, base + rankBonus);
    return {coins, tier, reason: rankBonus ? `Includes top-${rank} season bonus` : 'Base monthly payout'};
  }

  function archlightCoinPayoutRows(monthKey){
    const month = ensurePayoutMonth(monthKey || currentMonthKey());
    const totals = payoutTotalsByUser();
    const rows = (month.rows || []).slice().sort((a,b)=>Number(a.rank||0)-Number(b.rank||0)).map(row => {
      const estimate = archlightCoinEstimate(row.seasonScore, row.rank);
      const suggested = Number(row.suggestedCoins ?? estimate.coins ?? 0);
      const coins = Number(row.coins ?? suggested);
      const totalGranted = totals.get(row.key) || 0;
      return `<article class="adp-payout-row ${suggested ? '' : 'is-muted'} ${row.granted ? 'is-granted' : ''}" data-payout-user="${esc(row.key)}" data-payout-rank="${esc(row.rank)}">
        <div class="adp-payout-rank">#${esc(row.rank)}</div>
        <div class="adp-payout-user"><b>${esc(row.name)}</b><span>${esc(row.role || 'Contributor')}</span></div>
        <label class="adp-payout-score adp-payout-edit"><span>Season contribution stars</span><input type="number" min="0" step="1" value="${esc(row.seasonScore || 0)}" data-payout-score-edit></label>
        <div class="adp-payout-suggested"><strong>${Number(suggested).toLocaleString()}</strong><small>suggested coins</small></div>
        <label class="adp-payout-coins adp-payout-edit"><span>Coins to grant</span><input type="number" min="0" step="1" value="${esc(coins)}" data-payout-coins></label>
        <label class="adp-payout-grant"><input type="checkbox" data-payout-granted ${row.granted ? 'checked' : ''}><span>${row.granted ? 'Granted in game' : 'Mark granted'}</span></label>
        <div class="adp-payout-note"><b>${esc(row.tier || estimate.tier)}</b><span>${esc(row.reason || estimate.reason)}</span><em>Total received: ${Number(totalGranted).toLocaleString()} Archlight Coins</em>${row.grantedAt ? `<em>Granted ${esc(formatAuditTime(row.grantedAt))}</em>` : ''}</div>
      </article>`;
    }).join('');
    return rows || '<div class="adp-empty">No contributor payout rows saved for this month yet.</div>';
  }

  function archlightCoinDashboard(selectedMonth){
    const month = selectedMonth || selectedPayoutMonth() || currentMonthKey();
    const monthData = ensurePayoutMonth(month);
    const paidRows = (monthData.rows || []).filter(row => row.granted);
    const paidTotal = paidRows.reduce((sum,row)=>sum+Number(row.coins || row.suggestedCoins || 0),0);
    const eligible = (monthData.rows || []).filter(row => Number(row.suggestedCoins || 0) > 0).length;
    return `<section class="adp-payout-dashboard" id="adp-payout-dashboard">
      <div class="adp-payout-head">
        <div><h3>Monthly Archlight Coin Payout Planner</h3><p>Calculates in-game <b>Archlight Coins</b> from approved monthly wiki contribution stars. This does not send coins automatically, it gives staff a clean checklist for manual delivery.</p></div>
        <div class="adp-payout-head-note"><b>Suggested formula</b><span>40 season contribution stars minimum · safer tier bands · top 3 bonus · 450 coin monthly cap</span></div>
      </div>
      <div class="adp-payout-toolbar">
        <label>Reward month<select id="adp-payout-month">${payoutMonthOptions(month)}</select></label>
        <button class="adp-secondary" type="button" data-payout-snapshot>Snapshot current stars</button>
        <button class="adp-primary" type="button" data-payout-save>Save payout checklist</button>
        <button class="adp-secondary" type="button" data-payout-mark-eligible>Mark eligible granted</button>
      </div>
      <div class="adp-payout-summary">
        <span><b>${esc(monthLabel(month))}</b><small>selected month</small></span>
        <span><b>${eligible}</b><small>eligible contributors</small></span>
        <span><b>${paidRows.length}</b><small>marked granted</small></span>
        <span><b>${Number(paidTotal).toLocaleString()}</b><small>Archlight Coins granted</small></span>
      </div>
      <div class="adp-payout-rules">
        <span>Use season contribution stars from approved, non-duplicate wiki work only.</span>
        <span>Keep a snapshot before monthly reset, or select an older saved month to finish missed payouts.</span>
        <span>Review suspicious farming manually. Vague repeats, duplicate reports, and low-effort spam should not earn payout credit.</span>
      </div>
      <div class="adp-payout-list">${archlightCoinPayoutRows(month)}</div>
    </section>`;
  }

  function contributorRolesPanel(){
    return `<section class="adp-panel" data-adp-panel="contributors">
      <div class="adp-panel-head"><div><h2>🧭 Contributor Role Control</h2><p>Assign Wiki Admin identity and earned contributor ranks from one place. Wiki Admin is the only staff identity badge beside contributor names.</p></div></div>
      <div class="adp-contrib-admin-note"><b>Identity rule:</b> Fluffydrakoz is the default Wiki Admin. Contributor is a standard account role, not a staff identity role, so it never becomes the badge beside the name.</div>
      <div class="adp-actions"><button class="adp-primary" type="button" data-contrib-roles-save>Save Contributor Roles</button><button class="adp-secondary" type="button" data-contrib-random>Generate Random Demo Contributors</button><button class="adp-secondary" type="button" data-contrib-roles-reset>Reset to Defaults</button></div>
      <div class="adp-contrib-role-list" id="adp-contrib-role-list">${contributorRoleRows()}</div>
    </section>`;
  }

  function contributionPointsPanel(){
    return `<section class="adp-panel adp-stars-control-room" data-adp-panel="points">
      <div class="adp-panel-head adp-stars-head">
        <div>
          <span class="adp-panel-eyebrow">Wiki Economy Control</span>
          <h2>Contribution Stars, Wiki Ranks & Coin Payouts</h2>
          <p>Control how approved wiki work becomes season stars, lifetime rank progress, next-season wiki bonuses, and manually reviewed Archlight Coin payouts.</p>
        </div>
        <div class="adp-head-actions"><button class="adp-primary" type="button" data-point-rules-save>Save Star & Reward Values</button><button class="adp-secondary" type="button" data-point-rules-reset>Reset Contributor Overrides</button></div>
      </div>
      <div class="adp-stars-brief">
        <article><b>Season Stars</b><span>Monthly leaderboard and payout review only.</span></article>
        <article><b>Lifetime Stars</b><span>Permanent earned wiki rank progression.</span></article>
        <article><b>Archlight Coins</b><span>Manual in-game reward checklist, never automatic.</span></article>
      </div>
      ${archlightCoinDashboard()}
      <div class="adp-stars-editor-grid">
        <section class="adp-editor-card adp-editor-card--wide">
          <div class="adp-editor-card-head"><span>01</span><div><h3>Contribution Star Values</h3><p>Set how much each approved wiki action is worth. Keep values simple so staff can judge reports quickly.</p></div></div>
          <div class="adp-point-rule-list" id="adp-point-rule-list">${contributionPointRows()}</div>
        </section>
        <section class="adp-editor-card">
          <div class="adp-editor-card-head"><span>02</span><div><h3>Earned Rank Requirements</h3><p>Long-term cosmetic progression for contributors.</p></div></div>
          <div class="adp-earned-role-list" id="adp-earned-role-list">${earnedRoleRequirementRows()}</div>
        </section>
        <section class="adp-editor-card">
          <div class="adp-editor-card-head"><span>03</span><div><h3>Next-Season Wiki Bonuses</h3><p>Season reset bonuses granted from wiki progress.</p></div></div>
          <div class="adp-season-reward-list" id="adp-season-reward-list">${seasonRewardRows()}</div>
        </section>
      </div>
    </section>`;
  }

  function redrawContributorAdmin(){
    const roleList = $('#adp-contrib-role-list'); if(roleList) roleList.innerHTML = contributorRoleRows();
    const pointList = $('#adp-point-rule-list'); if(pointList) pointList.innerHTML = contributionPointRows();
    const earnedList = $('#adp-earned-role-list'); if(earnedList) earnedList.innerHTML = earnedRoleRequirementRows();
    const rewardList = $('#adp-season-reward-list'); if(rewardList) rewardList.innerHTML = seasonRewardRows();
    const payout = $('#adp-payout-dashboard'); if(payout) payout.outerHTML = archlightCoinDashboard(selectedPayoutMonth());
  }

  function saveContributorRoles(){
    const api = contributorsApi();
    if(!api?.saveContributorRoles){ alert('Contributor admin controls are not loaded yet.'); return; }
    $$('.adp-contrib-role-row').forEach(row => {
      const name = row.dataset.contribName;
      const selected = $$('[data-contrib-staff]', row).filter(input => input.checked).map(input => input.dataset.contribStaff);
      const earnedRole = cleanText($('[data-contrib-earned]', row)?.value);
      const displayName = cleanText($('[data-contrib-display-name]', row)?.value) || name;
      api.saveContributorRoles(name, { baseName: name, displayName, staffRoles: selected.length ? selected : ['Contributor'], earnedRole });
    });
    api.rerender?.();
    notifyWikiActivity({type:'update', action:'updated', page:'Contributor Roles', emoji:'👥', impact:'Contributor identity roles or earned ranks were updated'});
    redrawContributorAdmin();
  }

  function saveContributionPointRules(){
    const api = contributorsApi();
    if(!api?.savePointRules){ alert('Contributor star controls are not loaded yet.'); return; }
    const rules = $$('.adp-point-rule-row').map(row => ({ id: row.dataset.pointRule, points: Number($('[data-point-rule-value]', row)?.value || 0) }));
    const earnedRequirements = $$('.adp-earned-role-row').map(row => ({ id: row.dataset.earnedRole, points: Number($('[data-earned-role-points]', row)?.value || 0) }));
    const seasonRewards = $$('.adp-season-reward-row').map(row => ({ rank: Number(row.dataset.seasonRewardRank || 0), bonus: Number($('[data-season-reward-bonus]', row)?.value || 0) }));
    api.savePointRules(rules);
    api.saveEarnedRoleRequirements?.(earnedRequirements);
    api.saveSeasonRewards?.(seasonRewards);
    api.rerender?.();
    notifyWikiActivity({type:'update', action:'updated', page:'Contribution Stars', emoji:'⚖', impact:'Contribution star values, rank requirements, and season reward settings were updated'});
    redrawContributorAdmin();
  }

  function resetContributorOverrides(){
    const api = contributorsApi();
    if(!api?.resetAdminOverrides) return;
    api.resetAdminOverrides();
    api.rerender?.();
    redrawContributorAdmin();
    notifyWikiActivity({type:'fix', action:'reset', page:'Contributor Controls', emoji:'👥', impact:'Contributor role and star overrides were reset'});
  }

  function generateRandomContributorDemo(){
    const api = contributorsApi();
    if(!api?.generateRandomContributorValues){ alert('Random contributor generator is not loaded yet.'); return; }
    api.generateRandomContributorValues();
    api.rerender?.();
    redrawContributorAdmin();
    notifyWikiActivity({type:'update', action:'generated', page:'Contributor Demo Data', emoji:'🎲', impact:'Random contributor names and values were generated for preview testing'});
  }

  function pageControlApi(){ return window.ArchlightPageControls; }
  function pageControlData(){
    return pageControlApi()?.read?.() || {locked:{}, featureMode:'recent', manualFeatured:'', showFeatured:true};
  }
  function pageOptions(selected){
    const rows = pageControlApi()?.pages?.() || (window.ARCHLIGHT_NAV_PAGES || []);
    return rows.map(p=>`<option value="${esc(p.id)}" ${String(selected||'')===String(p.id)?'selected':''}>${esc(p.title)} (${esc(p.id)})</option>`).join('');
  }
  function pageControlRows(){
    const data = pageControlData();
    const rows = pageControlApi()?.pages?.() || [];
    return rows.map(p=>{
      const key = pageControlApi()?.normalize?.(p.id) || p.id;
      const info = data.locked && data.locked[key] || {};
      const isLocked = !!info.locked;
      return `<article class="adp-page-control-row ${isLocked?'is-locked':''}" data-page-control-row="${esc(key)}">
        <div class="adp-page-control-main"><span>${esc(p.icon || '✦')}</span><div><b>${esc(p.title)}</b><small>${esc(p.cat || 'Wiki Page')} · ${esc(key)}</small>${info.reason?`<em>${esc(info.reason)}</em>`:''}</div></div>
        <div class="adp-page-control-actions">
          <label class="adp-toggle"><input type="checkbox" data-page-lock-toggle ${isLocked?'checked':''}><span></span> Locked</label>
          <label class="adp-toggle"><input type="checkbox" data-page-lock-sidebar ${info.sidebar===false?'':'checked'}><span></span> Sidebar mark</label>
          <button class="adp-secondary" type="button" data-page-feature-one="${esc(key)}">Feature</button>
        </div>
      </article>`;
    }).join('') || '<div class="adp-empty">No page registry loaded yet.</div>';
  }
  function pageControlsPanel(){
    const data = pageControlData();
    const manual = data.manualFeatured || '';
    const mode = data.featureMode || 'recent';
    return `<section class="adp-panel" data-adp-panel="pages">
      <div class="adp-panel-head"><div><h2>🔒 Page Controls</h2><p>Lock sensitive wiki pages from quick edits and control the highlighted sidebar page. Recent activity can feature pages automatically, or you can pin one manually.</p></div></div>
      <div class="adp-page-controls-shell">
        <div class="adp-page-feature-card">
          <div class="adp-feature-title"><i>⭐</i><div><b>Featured Sidebar Page</b><span>Shown above the sidebar groups with a subtle animated highlight.</span></div></div>
          <div class="adp-grid two">
            <label>Feature Mode<select id="adp-feature-mode"><option value="recent" ${mode==='recent'?'selected':''}>Most recent wiki change</option><option value="manual" ${mode==='manual'?'selected':''}>Manual page</option><option value="off" ${mode==='off'?'selected':''}>Off</option></select></label>
            <label>Manual Featured Page<select id="adp-feature-page">${pageOptions(manual)}</select></label>
          </div>
          <label class="adp-toggle adp-feature-toggle"><input id="adp-feature-show" type="checkbox" ${data.showFeatured===false?'':'checked'}><span></span> Show featured page in sidebar</label>
          <div class="adp-actions"><button class="adp-primary" type="button" data-page-controls-save>Save Page Controls</button><button class="adp-secondary" type="button" data-page-controls-reset>Reset Page Controls</button></div>
        </div>
        <div class="adp-page-lock-editor">
          <div class="adp-page-lock-head"><div><b>🛡️ Locked Pages</b><span>Locked pages show a banner on the page. Sidebar lock marks are optional per page.</span></div></div>
          <div class="adp-page-control-list" id="adp-page-control-list">${pageControlRows()}</div>
        </div>
      </div>
    </section>`;
  }
  function collectPageControls(){
    const current = pageControlData();
    const locked = Object.assign({}, current.locked || {});
    $$('.adp-page-control-row').forEach(row=>{
      const key = row.dataset.pageControlRow;
      const isLocked = !!$('[data-page-lock-toggle]', row)?.checked;
      const sidebar = !!$('[data-page-lock-sidebar]', row)?.checked;
      if(isLocked) locked[key] = Object.assign({}, locked[key] || {}, {locked:true, sidebar});
      else delete locked[key];
    });
    return {
      locked,
      featureMode: cleanText($('#adp-feature-mode')?.value) || 'recent',
      manualFeatured: cleanText($('#adp-feature-page')?.value),
      showFeatured: $('#adp-feature-show')?.checked !== false
    };
  }
  function savePageControls(){
    const api = pageControlApi();
    if(!api || !api.write){ alert('Page controls are not loaded yet.'); return; }
    api.write(collectPageControls());
    window.ArchlightRenderSidebar?.();
    api.apply?.((location.hash||'#home').replace(/^#/,''));
    notifyWikiActivity({type:'update', action:'updated', page:'Page Controls', emoji:'🔒', impact:'Page locks or featured sidebar settings were changed'});
    const list=$('#adp-page-control-list'); if(list) list.innerHTML = pageControlRows();
  }
  function resetPageControls(){
    const api = pageControlApi(); if(!api || !api.write) return;
    api.write({locked:{}, featureMode:'recent', manualFeatured:'', showFeatured:true});
    window.ArchlightRenderSidebar?.();
    api.apply?.((location.hash||'#home').replace(/^#/,''));
    const panel=$('[data-adp-panel="pages"]'); if(panel) panel.outerHTML = pageControlsPanel();
  }

  function render(){
    const host = ensureHost();
    if(!isAdmin()){
      if(window.currentUser){
        host.innerHTML = `<section class="adp-locked"><div class="adp-lock-orb">👤</div><h1>Player Profile</h1><p>You are signed in as a contributor. Opening your profile instead of the admin panel.</p></section>`;
        setTimeout(function(){
          if(typeof window.go === 'function') window.go('profile');
          if(window.renderProfilePage) window.renderProfilePage();
        }, 0);
        return true;
      }
      host.innerHTML = `<section class="adp-locked"><div class="adp-lock-orb">🛡️</div><h1>Admin Access Required</h1><p>Log in with a wiki admin account to access content controls, world status, tips, and site stats.</p><button class="adp-primary" type="button" data-admin-login>Open Login</button></section>`;
      bind(host);
      return true;
    }
    const user = window.currentUser || 'Admin';
    host.innerHTML = `<div class="adp-shell">
      <section class="adp-hero">
        <div><div class="adp-kicker">Archlight Control Room</div><h1>Admin Panel</h1><p>Manage wiki tools, page controls, world status, tips, contributor roles, and patch-note imports from one organized dashboard.</p></div>
        <div class="adp-admin-card"><span>Logged in as</span><b>${esc(user)}</b><small>${esc(window.currentRole||'wiki_admin')}</small></div>
      </section>
      <section class="adp-stats">${statCards()}</section>
      <section class="adp-tabs" role="tablist" aria-label="Admin panel sections">
        <button type="button" class="on" data-adp-tab="worlds">🌍 Worlds Navbar</button>
        <button type="button" data-adp-tab="alerts">📣 Home Alerts</button>
        <button type="button" data-adp-tab="updates">🧾 Patch Notes</button>
        <button type="button" data-adp-tab="tips">💡 Tips Controller</button>
        <button type="button" data-adp-tab="pages">🔒 Page Controls</button>
        <button type="button" data-adp-tab="contributors">👥 Contributor Roles</button>
        <button type="button" data-adp-tab="points">⚖ Contribution Stars</button>
        <button type="button" data-adp-tab="stats">📊 Site Stats</button>
      </section>
      <section class="adp-panel on" data-adp-panel="worlds">
        <div class="adp-panel-head"><div><h2>🌐 Worlds Display Navbar</h2><p>Control which world pills appear in the top navbar and whether each world is online, offline, or under maintenance.</p></div><label class="adp-master"><input type="checkbox" id="adp-worlds-visible" ${worldsApi()?.isDisplayEnabled?.()===false?'':'checked'}><span></span> Show worlds in navbar</label></div>
        <div class="adp-world-create">
          <label>New World Name<input id="adp-new-world-name" placeholder="Example: Abaldar"></label>
          <label>Short Label<input id="adp-new-world-short" placeholder="Optional navbar label"></label>
          <label>Status<select id="adp-new-world-status"><option value="online">Online</option><option value="maintenance">Maintenance</option><option value="offline" selected>Offline</option></select></label>
          <button class="adp-primary" type="button" data-world-add>Add World</button>
        </div>
        <div class="adp-actions"><button class="adp-primary" type="button" data-world-save>Save Worlds</button><button class="adp-secondary" type="button" data-world-reset>Reset Worlds</button></div>
        <div class="adp-world-list" id="adp-world-list">${worldRows()}</div>
      </section>

      <section class="adp-panel" data-adp-panel="alerts">
        <div class="adp-panel-head"><div><h2>📣 Home Announcements & Warnings</h2><p>Create player-facing notices for the home page. Each notice can stay forever, run only between two dates, be disabled, or be dismissed by players locally.</p></div></div>
        <div class="adp-alert-editor">
          <input id="adp-alert-id" type="hidden">
          <div class="adp-grid two">
            <label>Type<select id="adp-alert-level"><option value="announcement">Announcement</option><option value="warning">Warning</option><option value="event">Event</option><option value="maintenance">Maintenance</option></select></label>
            <label>Eyebrow / Label<input id="adp-alert-eyebrow" placeholder="Season Notice"></label>
            <label>Posted By<input id="adp-alert-posted-by" placeholder="Example: Fluffy, Archlight Team"></label>
            <label class="wide">Title<input id="adp-alert-title" placeholder="Example: Abaldar Launch Notice"></label>
            <label class="wide">Message<textarea id="adp-alert-body" placeholder="Write the short home-page message players should see."></textarea></label>
            <label>CTA Text<input id="adp-alert-cta-label" placeholder="Optional, e.g. Read Updates"></label>
            <label>CTA Route<input id="adp-alert-cta-route" placeholder="Optional route, e.g. updates"></label>
            <label>External CTA URL<input id="adp-alert-cta-url" placeholder="Optional external link"></label>
            <label>Priority<input id="adp-alert-priority" type="number" value="0"></label>
            <label>Start Time<input id="adp-alert-start" type="datetime-local"></label>
            <label>End Time<input id="adp-alert-end" type="datetime-local"></label>
          </div>
          <div class="adp-alert-switches">
            <label class="adp-toggle"><input id="adp-alert-enabled" type="checkbox" checked><span></span> Enabled</label>
            <label class="adp-toggle"><input id="adp-alert-forever" type="checkbox" checked><span></span> Show forever</label>
            <label class="adp-toggle"><input id="adp-alert-dismissible" type="checkbox" checked><span></span> Player can dismiss</label>
          </div>
          <div class="adp-actions"><button class="adp-primary" type="button" data-alert-save>Add Announcement</button><button class="adp-secondary" type="button" data-alert-clear>Clear</button><button class="adp-secondary" type="button" data-alert-reset>Reset Defaults</button></div>
        </div>
        <div class="adp-alert-list" id="adp-alert-list">${alertRows()}</div>
      </section>


      <section class="adp-panel" data-adp-panel="updates">
        <div class="adp-panel-head"><div><h2>📝 Patch Notes Importer</h2><p>Add changelogs with the least possible input. Choose a world, paste or upload the notes, then preview. Existing entries are detected before saving and are not added twice.</p></div></div>
        <div class="adp-update-editor">
          <input id="adp-update-id" type="hidden">
          <div class="adp-update-guidance" aria-label="Patch note import steps">
            <div><b>1</b><span>Pick World</span><small>Only required field besides the notes.</small></div>
            <div><b>2</b><span>Paste or Upload</span><small>Discord, website exports, BBCode, HTML, Markdown, or text.</small></div>
            <div><b>3</b><span>Preview & Add</span><small>Dates, titles, images, and duplicates are checked automatically.</small></div>
          </div>
          <div class="adp-update-quickbar">
            <label>World<select id="adp-update-world">${updateWorldOptions()}</select></label>
            <label>Type<select id="adp-update-type"><option value="auto">Auto Detect</option><option value="patch-notes">Patch Notes</option><option value="changelog">Changelog</option></select></label>
            <label>Date <small>auto if empty</small><input id="adp-update-date" type="date"></label>
            <label>Title <small>auto if empty</small><input id="adp-update-title" placeholder="Example: Abaldar Changelog"></label>
          </div>
          <details class="adp-update-advanced">
            <summary>Optional advanced fields</summary>
            <div class="adp-grid two adp-update-secondary">
              <label>Source Label<input id="adp-update-source" placeholder="Discord, website export, staff note..."></label>
              <label>Extra Image URLs <small>optional</small><input id="adp-update-images" placeholder="One or more URLs, comma or line separated"></label>
              <label>Added By <small>shown in Updates</small><input id="adp-update-added-by" placeholder="Admin or staff name" value="${esc(currentAdminName())}"></label>
            </div>
          </details>
          <label class="adp-update-paste"><span>Patch Notes / Changelog Text</span><textarea id="adp-update-raw" placeholder="${esc(sampleUpdatePlaceholder())}"></textarea></label>
          <div class="adp-update-file-row">
            <label class="adp-file-button"><input id="adp-update-file" type="file" accept=".txt,.md,.html,.htm,.json,.csv,text/*" multiple>Upload Files</label>
            <span id="adp-update-file-status">No file selected. You can also paste directly above.</span>
          </div>
          <div class="adp-actions adp-update-actions"><button class="adp-secondary" type="button" data-update-preview>Clean & Preview</button><button class="adp-primary" type="button" data-update-save>Add to Updates</button><button class="adp-secondary" type="button" data-update-copy-current>Copy Generated JSON</button><button class="adp-secondary" type="button" data-update-export>Export Manual Notes</button><button class="adp-secondary" type="button" data-update-clear>Clear</button><button class="adp-secondary danger" type="button" data-update-reset>Reset Manual Notes</button></div>
          <div class="adp-update-feedback" id="adp-update-feedback" role="status" aria-live="polite">Ready. Pick a world, paste notes, then click Clean & Preview.</div>
          <div class="adp-update-preview" id="adp-update-preview"><b>Preview</b><p>Paste notes or upload a file, then click Clean & Preview. If this entry already exists, it will show as Already Entered and will not be duplicated.</p></div>
        </div>
        <div class="adp-update-list-head"><div><b>Manual Patch Notes</b><span>Entries saved from this admin panel only. Existing archive entries are checked separately.</span></div><small>${(updatesApi()?.getManualEntries?.() || []).length} manual</small></div>
        <div class="adp-update-list" id="adp-update-list">${updateRows()}</div>
      </section>

      <section class="adp-panel" data-adp-panel="tips">
        <div class="adp-panel-head"><div><h2>💡 Archlight Tips Controller</h2><p>Add, edit, remove, and reorder the Did You Know tips shown on the home page carousel.</p></div></div>
        <div class="adp-tip-editor"><label>Icon<input id="adp-tip-ico" placeholder="✨"></label><label>Source<input id="adp-tip-source" placeholder="Classes, Gems, Dailies..."></label><label class="wide">Tip Text<textarea id="adp-tip-text" placeholder="Write a short player-facing tip. You can use **bold**."></textarea></label><div class="adp-tip-editor-actions"><button class="adp-primary" type="button" data-tip-save>Add Tip</button><button class="adp-secondary" type="button" data-tip-clear>Clear</button></div></div>
        <div class="adp-tip-list" id="adp-tip-list">${tipRows()}</div>
      </section>
      ${pageControlsPanel()}
      ${contributorRolesPanel()}
      ${contributionPointsPanel()}
      <section class="adp-panel" data-adp-panel="stats">
        <div class="adp-panel-head"><div><h2>📊 Site Stats</h2><p>Live counts from the current source modules. Use this to check whether systems are still connected after edits.</p></div></div>
        <div class="adp-stat-deep">${statDeepCards()}</div>
      </section>
    </div>`;
    $$('.adp-panel[data-adp-panel]',host).forEach(panel=>{ panel.hidden=!panel.classList.contains('on'); });
    bind(host);
    return true;
  }

  function readWorldRows(){
    return $$('.adp-world').map(row=>{
      const id = row.dataset.worldRow;
      const field = name => cleanText($(`[data-world-field="${name}"]`,row)?.value);
      const status = cleanText($('[data-status-choice].on',row)?.dataset.statusChoice) || 'offline';
      return { id, name:field('name')||id, short:field('short')||field('name')||id, tagline:field('tagline'), rules:field('rules'), bestFor:field('bestFor'), status, online:status==='online', enabled:!!$('[data-world-enabled]',row)?.checked };
    });
  }
  function redrawWorlds(){
    const list = $('#adp-world-list'); if(list) list.innerHTML = worldRows();
    const wrap = $('.adp-stats'); if(wrap) wrap.innerHTML = statCards();
  }
  function redrawTips(){
    const list = $('#adp-tip-list'); if(list) list.innerHTML = tipRows();
    const wrap = $('.adp-stats'); if(wrap) wrap.innerHTML = statCards();
  }

  function redrawAlerts(){
    const list = $('#adp-alert-list'); if(list) list.innerHTML = alertRows();
    const wrap = $('.adp-stats'); if(wrap) wrap.innerHTML = statCards();
  }
  function clearAlertForm(){
    ['adp-alert-id','adp-alert-eyebrow','adp-alert-posted-by','adp-alert-title','adp-alert-body','adp-alert-cta-label','adp-alert-cta-route','adp-alert-cta-url','adp-alert-start','adp-alert-end'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    const level=$('#adp-alert-level'); if(level) level.value='announcement';
    const priority=$('#adp-alert-priority'); if(priority) priority.value='0';
    const enabled=$('#adp-alert-enabled'); if(enabled) enabled.checked=true;
    const forever=$('#adp-alert-forever'); if(forever) forever.checked=true;
    const dismissible=$('#adp-alert-dismissible'); if(dismissible) dismissible.checked=true;
    const btn=$('[data-alert-save]'); if(btn) btn.textContent='Add Announcement';
  }
  function uniqueAlertId(title, existingId){
    if(existingId) return existingId;
    const base = cleanText(title).toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'home-alert';
    const taken = new Set((alertsApi()?.getAll?.() || []).map(a=>a.id));
    let id=base, n=2;
    while(taken.has(id)) id=base+'-'+n++;
    return id;
  }
  function readAlertForm(){
    const title = cleanText($('#adp-alert-title')?.value);
    return {
      id: uniqueAlertId(title, cleanText($('#adp-alert-id')?.value)),
      enabled: $('#adp-alert-enabled')?.checked !== false,
      level: cleanText($('#adp-alert-level')?.value) || 'announcement',
      eyebrow: cleanText($('#adp-alert-eyebrow')?.value) || 'Wiki Notice',
      postedBy: cleanText($('#adp-alert-posted-by')?.value),
      title,
      body: cleanText($('#adp-alert-body')?.value),
      ctaLabel: cleanText($('#adp-alert-cta-label')?.value),
      ctaRoute: cleanText($('#adp-alert-cta-route')?.value),
      ctaUrl: cleanText($('#adp-alert-cta-url')?.value),
      startsAt: cleanText($('#adp-alert-start')?.value),
      endsAt: cleanText($('#adp-alert-end')?.value),
      forever: $('#adp-alert-forever')?.checked !== false,
      dismissible: $('#adp-alert-dismissible')?.checked !== false,
      priority: Number($('#adp-alert-priority')?.value || 0)
    };
  }
  function saveAlert(){
    const item = readAlertForm();
    if(item.title.length < 4){ window.alert('Announcement title is too short.'); return; }
    if(item.body.length < 8){ window.alert('Announcement message is too short.'); return; }
    alertsApi()?.upsert?.(item);
    notifyWikiActivity({type:'publish', action:'posted', page:item.title || 'Home Announcement', emoji:'📣', impact:'Home announcement updated from the Admin Panel'});
    clearAlertForm();
    redrawAlerts();
  }
  function editAlert(id){
    const a = (alertsApi()?.getAll?.() || []).find(item=>item.id===id); if(!a) return;
    $('#adp-alert-id').value = a.id || '';
    $('#adp-alert-level').value = a.level || 'announcement';
    $('#adp-alert-eyebrow').value = a.eyebrow || '';
    $('#adp-alert-posted-by').value = a.postedBy || '';
    $('#adp-alert-title').value = a.title || '';
    $('#adp-alert-body').value = a.body || '';
    $('#adp-alert-cta-label').value = a.ctaLabel || '';
    $('#adp-alert-cta-route').value = a.ctaRoute || '';
    $('#adp-alert-cta-url').value = a.ctaUrl || '';
    $('#adp-alert-priority').value = a.priority || 0;
    $('#adp-alert-start').value = a.startsAt || '';
    $('#adp-alert-end').value = a.endsAt || '';
    $('#adp-alert-enabled').checked = a.enabled !== false;
    $('#adp-alert-forever').checked = a.forever !== false;
    $('#adp-alert-dismissible').checked = a.dismissible !== false;
    const btn=$('[data-alert-save]'); if(btn) btn.textContent='Save Announcement';
    $('#adp-alert-title').focus();
  }


  function setUpdateFeedback(type, message){
    const box = $('#adp-update-feedback');
    if(!box) return;
    box.className = 'adp-update-feedback ' + (type ? 'is-' + type : '');
    box.textContent = message || '';
  }

  function renderUpdateMessage(type, title, message){
    const box = $('#adp-update-preview');
    if(!box) return;
    box.classList.toggle('is-duplicate', type === 'warning');
    box.classList.toggle('is-ready', type === 'success');
    box.classList.toggle('is-error', type === 'error');
    box.innerHTML = `<div class="adp-update-preview-head"><b>${esc(title || 'Patch Notes Importer')}</b></div><p>${esc(message || '')}</p>`;
    setUpdateFeedback(type === 'error' ? 'error' : type === 'warning' ? 'warning' : 'info', message || title || '');
  }

  function splitImageInput(value){
    return String(value || '').split(/[\n,]+/).map(cleanText).filter(Boolean);
  }

  function activeUpdateEditingId(){
    const id = cleanText($('#adp-update-id')?.value || '');
    const saveLabel = cleanText($('[data-update-save]')?.textContent || '').toLowerCase();
    return id && saveLabel.includes('save') ? id : '';
  }

  function compactImportCompare(value){
    return String(value || '')
      .toLowerCase()
      .replace(/<[^>]+>/g, ' ')
      .replace(/https?:\/\/\S+/g, ' ')
      .replace(/[^a-z0-9]+/g, ' ')
      .replace(/\b(?:the|and|for|with|from|this|that|will|have|has|are|was|were|you|your|our|archlight|online|patch|notes|changelog|changelogs|world|abaldar|legacy)\b/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function importCandidateSignature(entry){
    const attempted = entry?._attempted || entry || {};
    const title = compactImportCompare(attempted.title || '').replace(/\b(?:jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/g, ' ').replace(/\b\d{1,4}\b/g, ' ').replace(/\s+/g, ' ').trim();
    const body = compactImportCompare((attempted.content || attempted.summary || '').slice(0, 2400));
    const bodyAnchor = body.split(' ').slice(0, 80).join(' ');
    return [attempted.world || '', attempted.date || '', title, bodyAnchor].join('|');
  }

  function collapseRepeatedImportEntries(entries){
    const seen = new Map();
    const out = [];
    (entries || []).forEach(entry => {
      const sig = importCandidateSignature(entry);
      if(!sig.replace(/\|/g, '')) return;
      if(seen.has(sig)){
        const prevIndex = seen.get(sig);
        const prev = out[prevIndex];
        if(!prev?._duplicate && entry?._duplicate) out[prevIndex] = entry;
        return;
      }
      seen.set(sig, out.length);
      out.push(entry);
    });
    return out;
  }

  function readUpdateForm(){
    return {
      id: cleanText($('#adp-update-id')?.value),
      world: cleanText($('#adp-update-world')?.value) || 'legacy',
      type: cleanText($('#adp-update-type')?.value) || 'auto',
      date: cleanText($('#adp-update-date')?.value),
      title: cleanText($('#adp-update-title')?.value),
      source: cleanText($('#adp-update-source')?.value) || 'admin-manual',
      addedBy: cleanText($('#adp-update-added-by')?.value) || currentAdminName(),
      images: splitImageInput($('#adp-update-images')?.value),
      raw: $('#adp-update-raw')?.value || ''
    };
  }

  function parsedUpdates(){
    const api = updatesApi();
    if(!api?.parseManualEntry){
      renderUpdateMessage('error', 'Importer is not loaded', 'The Updates importer API is not available yet. Refresh the page and open the Admin Panel again.');
      return [];
    }
    const data = readUpdateForm();
    if(cleanText(data.raw).length < 8){
      renderUpdateMessage('warning', 'Nothing to preview yet', 'Paste patch notes into the large text box or upload a file first. World is the only required field besides the notes.');
      const raw = $('#adp-update-raw');
      if(raw) raw.focus();
      return [];
    }
    try{
      setUpdateFeedback('info', 'Cleaning text, detecting separate dates/posts, removing markup, and checking for duplicates...');
      const entries = (api.parseManualEntries ? api.parseManualEntries(data) : [api.parseManualEntry(data)]).filter(Boolean);
      window.__adpLastImportWarnings = api.importCoverageWarnings ? api.importCoverageWarnings(data.raw, entries.length) : [];
      const valid = entries.filter(entry => entry && entry.title && entry.date);
      if(!valid.length){
        renderUpdateMessage('error', 'Could not read patch notes', 'The importer could not detect enough readable content. Add a short title or date manually, then preview again.');
        return [];
      }
      const checked = valid.map(entry => {
        const duplicate = api.findDuplicateEntry?.(entry, { editingId: activeUpdateEditingId() });
        return duplicate || entry;
      });
      return collapseRepeatedImportEntries(checked);
    }catch(err){
      console.error(err);
      renderUpdateMessage('error', 'Preview failed', err && err.message ? err.message : 'Something went wrong while cleaning these patch notes.');
      return [];
    }
  }

  function parsedUpdate(){
    return parsedUpdates()[0] || null;
  }

  function entryDuplicateInfo(entry){
    const duplicate = entry?._duplicate ? entry : updatesApi()?.findDuplicateEntry?.(entry, { editingId: activeUpdateEditingId() });
    if(!duplicate) return null;
    return { duplicate, attempted: duplicate._attempted || entry, where: duplicate._duplicateSource === 'manual' ? 'manual admin notes' : 'the main Updates archive' };
  }

  function renderUpdatePreview(entries){
    const list = Array.isArray(entries) ? entries : [entries].filter(Boolean);
    const box = $('#adp-update-preview');
    if(!box || !list.length) return;
    const dupes = list.map(entryDuplicateInfo).filter(Boolean);
    const ready = list.length - dupes.length;
    box.classList.toggle('is-duplicate', !!dupes.length && !ready);
    box.classList.toggle('is-ready', !!ready);
    box.classList.remove('is-error');
    const importWarnings = Array.isArray(window.__adpLastImportWarnings) ? window.__adpLastImportWarnings : [];
    const warningHtml = importWarnings.length ? `<div class="adp-update-import-warning"><b>Import coverage warning</b>${importWarnings.map(item => `<p>${esc(item)}</p>`).join('')}</div>` : '';
    if(list.length > 1){
      setUpdateFeedback(ready ? 'success' : 'warning', `${list.length} separate entries detected. ${ready} new, ${dupes.length} already entered. Preview opened in a window.`);
      box.innerHTML = `<div class="adp-update-preview-head"><b>${esc(list.length)} Entries Detected</b><span>${esc(ready)} new · ${esc(dupes.length)} already entered</span></div><p>The importer split this upload into separate changelogs by date/source rows. Use the preview window to add each entry separately or add all new entries.</p>${warningHtml}`;
      return;
    }
    const info = entryDuplicateInfo(list[0]);
    if(info){
      setUpdateFeedback('warning', `Already entered in ${info.where}. This note will not be duplicated.`);
      box.innerHTML = `<div class="adp-update-preview-head"><b>Already Entered</b><span>${esc(info.attempted.worldName || info.attempted.world)} · ${esc(info.attempted.date)} · ${esc(info.attempted.type || 'patch-notes')}</span></div><p>This entry already exists in ${esc(info.where)}. It will not be added again. The cleaned preview opened in a window.</p><div class="adp-update-duplicate-card"><strong>${esc(info.duplicate.title || info.attempted.title)}</strong><small>${esc(info.duplicate.worldName || info.duplicate.world)} · ${esc(info.duplicate.date)} · ${esc(info.duplicate.id)}</small></div>${warningHtml}`;
      return;
    }
    const entry = list[0];
    setUpdateFeedback('success', 'Preview ready. The cleaned notes opened in a preview window. Review it, then click Add to Updates.');
    box.innerHTML = `<div class="adp-update-preview-head"><b>${esc(entry.title)}</b><span>${esc(entry.worldName || entry.world)} · ${esc(entry.date)} · ${esc(entry.type)} · ${esc(entry.images?.length || 0)} images</span></div><p>${esc(entry.summary || 'No summary generated yet.')}</p><code>${esc(entry.id)}</code>${warningHtml}`;
  }

  function updatePreviewRoot(){
    let root = document.getElementById('adp-update-preview-modal-root');
    if(!root){
      root = document.createElement('div');
      root.id = 'adp-update-preview-modal-root';
      document.body.appendChild(root);
    }
    return root;
  }

  function closeUpdatePreviewModal(){
    const root = document.getElementById('adp-update-preview-modal-root');
    if(root) root.innerHTML = '';
    document.documentElement.classList.remove('adp-update-preview-open');
  }

  function fallbackPreviewHtml(entry){
    const lines = String(entry?.content || '').split(/\n+/).map(cleanText).filter(Boolean);
    const html = lines.map(line => {
      if(/^https?:\/\/\S+\.(?:png|jpe?g|gif|webp)(?:\?\S*)?$/i.test(line)){
        return `<figure class="updates-note__image"><img loading="lazy" decoding="async" src="${esc(line)}" alt="${esc(entry.title)} image"></figure>`;
      }
      if(line.length < 90 && /(?:added|fixed|changed|removed|balance|general|patch|changelog|update|server|world|class|vocation)/i.test(line)){
        return `<h3 class="updates-note__heading"><span aria-hidden="true">✦</span>${esc(line)}</h3>`;
      }
      return `<p class="updates-note__line updates-note__line--note"><span aria-hidden="true"></span>${esc(line)}</p>`;
    }).join('') || '<p class="updates-note__line updates-note__line--note"><span aria-hidden="true"></span>No readable body content was found.</p>';
    return { html, map:'', clean:lines.join('\n') };
  }

  function previewMarkup(entry){
    return updatesApi()?.previewNote?.(entry) || fallbackPreviewHtml(entry);
  }

  function compactPreviewLines(cleanBody){
    const lines = String(cleanBody || '').split(/\n+/).map(cleanText).filter(Boolean);
    const picked = [];
    lines.forEach(line => {
      if(picked.length >= 5) return;
      if(/^[-=*_]{3,}$/.test(line)) return;
      if(line.length > 180) picked.push(line.slice(0, 177).trim() + '…');
      else picked.push(line);
    });
    return picked;
  }

  function updatePreviewCard(entry, index, total){
    const info = entryDuplicateInfo(entry);
    const attempted = info?.attempted || entry;
    const preview = previewMarkup(attempted);
    const images = attempted.images?.length || preview.meta?.images?.length || 0;
    const cleanBody = preview.clean || attempted.content || '';
    const lineCount = cleanBody.split(/\n+/).map(cleanText).filter(Boolean).length;
    const wordCount = cleanBody.split(/\s+/).filter(Boolean).length;
    const scanLines = compactPreviewLines(cleanBody);
    const status = info ? `<strong class="adp-update-modal-card__dupe"><span aria-hidden="true">!</span>Already Entered</strong><span>Exists in ${esc(info.where)} and will not duplicate.</span>` : `<strong class="adp-update-modal-card__ready"><span aria-hidden="true">✓</span>Ready to Add</strong><span>Use View Final Entry to inspect the formatted update before adding.</span>`;
    const viewButton = `<button class="adp-update-entry-view" type="button" data-update-modal-view="${index}"><span>View Final Entry</span></button>`;
    const action = info
      ? `<div class="adp-update-entry-actions is-saved">${viewButton}<div class="adp-update-entry-saved"><span>Already Added</span></div></div><div class="adp-update-entry-feedback is-saved" data-update-modal-status="${index}">This entry is already in Updates and will not be added again.</div>`
      : `<div class="adp-update-entry-actions">${viewButton}<button class="adp-update-entry-add" type="button" data-update-modal-add="${index}"><span>Add This Entry</span></button></div><div class="adp-update-entry-feedback" data-update-modal-status="${index}" aria-live="polite"></div>`;
    const addedBy = attempted.addedBy || currentAdminName();
    const addedAt = attempted.addedAt || new Date().toISOString();
    const meta = `<div class="adp-update-modal-card__meta"><span>World: ${esc(attempted.worldName || attempted.world)}</span><span>Patch date: ${esc(attempted.date)}</span><span>Type: ${esc(attempted.type || 'patch-notes')}</span><span>${esc(lineCount)} lines</span><span>${esc(wordCount)} words</span><span>${esc(images)} image${images === 1 ? '' : 's'}</span><span>Will add as: ${esc(addedBy)}</span></div>`;
    const scan = scanLines.length
      ? `<div class="adp-update-card-scan"><b>Quick scan</b>${scanLines.map(line => `<p>${esc(line)}</p>`).join('')}</div>`
      : `<div class="adp-update-card-scan"><b>Quick scan</b><p>No readable lines detected. Use View Final Entry to inspect the cleaned result.</p></div>`;
    return `<section class="adp-update-modal-card ${info ? 'is-duplicate' : 'is-ready'}" id="adp-preview-entry-${index}">
      <header>
        <div class="adp-update-modal-card__title"><small>Entry ${index + 1}${total > 1 ? ' of '+total : ''}</small><h3>${esc(attempted.title)}</h3>${meta}</div>
        <div class="adp-update-modal-card__state">${status}${action}</div>
      </header>
      ${scan}
    </section>`;
  }


  function closeFinalEntryPreview(){
    const root = document.getElementById('adp-update-final-entry-root');
    if(root) root.innerHTML = '';
  }

  function openFinalEntryPreview(index){
    const previewRoot = document.getElementById('adp-update-preview-modal-root');
    const entries = previewRoot?.__adpPreviewEntries || [];
    const original = entries[Number(index)];
    if(!original) return;
    const info = entryDuplicateInfo(original);
    const entry = info?.attempted || original;
    const preview = previewMarkup(entry);
    const cleanBody = preview.clean || entry.content || '';
    const lineCount = cleanBody.split(/\n+/).map(cleanText).filter(Boolean).length;
    const images = entry.images?.length || preview.meta?.images?.length || 0;
    const addedBy = entry.addedBy || currentAdminName();
    const addedAt = entry.addedAt || new Date().toISOString();
    let root = document.getElementById('adp-update-final-entry-root');
    if(!root){
      root = document.createElement('div');
      root.id = 'adp-update-final-entry-root';
      document.body.appendChild(root);
    }
    root.innerHTML = `<div class="adp-final-entry-modal" role="dialog" aria-modal="true" aria-label="Final Updates entry preview">
      <button class="adp-final-entry-modal__backdrop" type="button" data-update-final-close aria-label="Close final entry preview"></button>
      <article class="adp-final-entry-modal__panel">
        <header class="adp-final-entry-modal__header">
          <div>
            <span>Final Updates Entry Preview</span>
            <h2>${esc(entry.title || 'Untitled Update')}</h2>
            <p>This is how the cleaned entry will read after it is added to the Updates page.</p>
          </div>
          <button type="button" data-update-final-close>Close</button>
        </header>
        <section class="adp-final-entry-card">
          <div class="adp-final-entry-card__top">
            <div class="adp-final-entry-card__badge">${esc(entry.type || 'patch-notes')}</div>
            <div class="adp-final-entry-card__meta"><span>${esc(entry.worldName || entry.world)}</span><span>${esc(entry.date)}</span><span>${esc(lineCount)} readable lines</span><span>${esc(images)} image${images === 1 ? '' : 's'}</span><span>Added by ${esc(addedBy)}</span><span>${esc(formatAuditTime(addedAt))}</span></div>
          </div>
          <h3>${esc(entry.title || 'Untitled Update')}</h3>
          ${entry.summary ? `<p class="adp-final-entry-card__summary">${esc(entry.summary)}</p>` : ''}
          <article class="updates-note updates-note--admin-final">${preview.map || ''}${preview.html}</article>
        </section>
      </article>
    </div>`;
  }

  function openUpdatePreviewModal(entries){
    const rawList = Array.isArray(entries) ? entries.filter(Boolean) : [entries].filter(Boolean);
    const list = rawList.slice().sort((a, b) => {
      const da = entryDuplicateInfo(a) ? 1 : 0;
      const db = entryDuplicateInfo(b) ? 1 : 0;
      if(da !== db) return da - db;
      return String((entryDuplicateInfo(b)?.attempted || b).date || '').localeCompare(String((entryDuplicateInfo(a)?.attempted || a).date || ''));
    });
    if(!list.length) return;
    const root = updatePreviewRoot();
    const newCount = list.filter(entry => !entryDuplicateInfo(entry)).length;
    const cleanTextAll = list.map(entry => {
      const attempted = entryDuplicateInfo(entry)?.attempted || entry;
      const preview = previewMarkup(attempted);
      return `${attempted.title}\n${attempted.worldName || attempted.world} · ${attempted.date} · ${attempted.type || 'patch-notes'}\n\n${preview.clean || attempted.content || ''}`;
    }).join('\n\n==============================\n\n');
    root.__adpCleanText = cleanTextAll;
    root.__adpPreviewEntries = list;
    const duplicateCount = list.length - newCount;
    const importWarnings = Array.isArray(window.__adpLastImportWarnings) ? window.__adpLastImportWarnings : [];
    const warningPanel = importWarnings.length ? `<div class="adp-update-modal__warning"><b>Import coverage warning</b>${importWarnings.map(item => `<p>${esc(item)}</p>`).join('')}</div>` : '';
    const nav = list.length > 1 ? `<nav class="adp-update-modal__entry-nav" aria-label="Detected entries">${list.map((entry,index)=>{
      const attempted = entryDuplicateInfo(entry)?.attempted || entry;
      const isDupe = !!entryDuplicateInfo(entry);
      return `<a href="#adp-preview-entry-${index}" class="${isDupe ? 'is-duplicate' : 'is-ready'}"><b>${index + 1}</b><span>${esc(attempted.date || 'No date')}</span></a>`;
    }).join('')}</nav>` : '';
    root.innerHTML = `<div class="adp-update-modal" role="dialog" aria-modal="true" aria-label="Patch note preview">
      <button class="adp-update-modal__backdrop" type="button" data-update-preview-close aria-label="Close preview"></button>
      <article class="adp-update-modal__panel">
        <header class="adp-update-modal__header">
          <div>
            <span>Cleaned Import Preview</span>
            <h2>${list.length > 1 ? `${list.length} Separate Entries Detected` : esc((entryDuplicateInfo(list[0])?.attempted || list[0]).title)}</h2>
            <p>${list.length > 1 ? `${newCount} new entries, ${duplicateCount} already entered. Each detected date/post can be reviewed and added separately.` : 'Review the cleaned patch note before adding it to Updates.'}</p>
          </div>
          <div class="adp-update-modal__actions"><button type="button" data-update-preview-copy>Copy Clean Text</button>${newCount ? '<button class="is-primary" type="button" data-update-modal-add-all>Add All New</button>' : ''}<button type="button" data-update-preview-close>Close</button></div>
        </header>
        ${warningPanel}
        ${nav}
        <main class="adp-update-modal__body adp-update-modal__body--batch">${list.map((entry,index)=>updatePreviewCard(entry,index,list.length)).join('')}</main>
      </article>
    </div>`;
    document.documentElement.classList.add('adp-update-preview-open');
    bindUpdatePreviewModalActions(root);
  }

  function previewUpdate(openWindow = true){
    setUpdateFeedback('info', 'Preview requested. Reading the current form...');
    const entries = parsedUpdates();
    if(entries.length){
      renderUpdatePreview(entries);
      if(openWindow) openUpdatePreviewModal(entries);
    }
    return entries;
  }

  function redrawUpdatesAdmin(){
    const list = $('#adp-update-list'); if(list) list.innerHTML = updateRows();
    const wrap = $('.adp-stats'); if(wrap) wrap.innerHTML = statCards();
    window.UpdatesPage?.render?.();
  }

  function saveUpdateEntries(entries, options = {}){
    const list = Array.isArray(entries) ? entries.filter(Boolean) : [entries].filter(Boolean);
    const api = updatesApi();
    if(!api?.upsertManualEntry || !list.length) return { saved:[], duplicates:list };
    const saved = [];
    const duplicates = [];
    list.forEach((entry, index) => {
      if(options.index !== undefined && Number(options.index) !== index) return;
      const prepared = Object.assign({}, entry, {
        addedBy: entry.addedBy || currentAdminName(),
        addedAt: entry.addedAt || new Date().toISOString()
      });
      if(entryDuplicateInfo(prepared)){ duplicates.push(prepared); return; }
      const editingId = activeUpdateEditingId();
      const result = api.upsertManualEntry(prepared, { editingId });
      if(result?._duplicate) duplicates.push(result);
      else if(result) saved.push(result);
    });
    redrawUpdatesAdmin();
    if(saved.length){
      saved.forEach(entry => {
        if(window.ArchlightActivity?.add){
          window.ArchlightActivity.add({
            type: entry.type === 'changelog' ? 'update' : 'publish',
            action: entry.type === 'changelog' ? 'imported' : 'published',
            page: entry.title || 'Updates Archive',
            user: entry.addedBy || currentAdminName(),
            role: window.currentRole || 'wiki_admin',
            emoji: entry.type === 'changelog' ? '🧾' : '📰',
            time: formatAuditTime(entry.addedAt || new Date().toISOString()),
            impact: `${entry.worldName || entry.world || 'World'} ${entry.type || 'update'} added to the Updates archive`
          });
        }
      });
      if(!options.silent){
        setUpdateFeedback('success', `${saved.length} entr${saved.length === 1 ? 'y was' : 'ies were'} added to Updates. ${duplicates.length ? duplicates.length+' duplicate skipped.' : ''}`);
        const box = $('#adp-update-preview');
        if(box) box.innerHTML = `<div class="adp-update-preview-head"><b>Added to Updates</b><span>${esc(saved.length)} saved · ${esc(duplicates.length)} skipped</span></div><p>New entries were added to the Updates page manual archive. Duplicate entries were not added again.</p>`;
      }
    }else if(duplicates.length){
      setUpdateFeedback('warning', 'Everything in this import already exists, so nothing was duplicated.');
      if(!options.silent) window.alert('These patch notes are already entered, so nothing was duplicated.');
    }
    return { saved, duplicates };
  }

  function setPreviewCardFeedback(index, type, message){
    const root = document.getElementById('adp-update-preview-modal-root');
    const status = root?.querySelector(`[data-update-modal-status="${Number(index)}"]`);
    if(status){
      status.className = `adp-update-entry-feedback ${type ? 'is-' + type : ''}`;
      status.textContent = message || '';
    }
  }

  function refreshPreviewCard(index){
    const root = document.getElementById('adp-update-preview-modal-root');
    const entries = root?.__adpPreviewEntries || [];
    const targetIndex = Number(index);
    const card = root?.querySelector(`#adp-preview-entry-${targetIndex}`);
    if(card && entries[targetIndex]){
      card.outerHTML = updatePreviewCard(entries[targetIndex], targetIndex, entries.length);
      bindUpdatePreviewModalActions(root);
    }
  }

  function addPreviewEntryByIndex(index, button){
    const root = document.getElementById('adp-update-preview-modal-root');
    const entries = root?.__adpPreviewEntries || [];
    const targetIndex = Number(index);
    if(!entries.length || !Number.isFinite(targetIndex) || !entries[targetIndex]){
      setUpdateFeedback('error', 'Could not find this preview entry. Re-open Clean & Preview and try again.');
      return;
    }
    if(button && button.disabled) return;
    if(entryDuplicateInfo(entries[targetIndex])){
      setPreviewCardFeedback(targetIndex, 'saved', 'Already added. This entry is already in Updates and was not duplicated.');
      refreshPreviewCard(targetIndex);
      setUpdateFeedback('warning', 'This entry is already entered, so it was not duplicated.');
      return;
    }
    if(button){
      button.disabled = true;
      button.classList.add('is-saving');
      button.innerHTML = '<span>Adding...</span>';
    }
    setPreviewCardFeedback(targetIndex, 'info', 'Adding this entry to Updates...');
    const result = saveUpdateEntries(entries, { index:targetIndex, silent:true });
    if(result?.saved?.length){
      entries[targetIndex] = Object.assign({}, result.saved[0], { _justAdded:true });
      if(root) root.__adpPreviewEntries = entries;
      setUpdateFeedback('success', 'Entry added to Updates. It is now marked as already entered.');
      setPreviewCardFeedback(targetIndex, 'saved', 'Added successfully. This button is now disabled to prevent duplicate clicks.');
      refreshPreviewCard(targetIndex);
      return;
    }
    if(result?.duplicates?.length){
      entries[targetIndex] = Object.assign({}, result.duplicates[0]);
      if(root) root.__adpPreviewEntries = entries;
      setUpdateFeedback('warning', 'This entry is already entered, so it was not duplicated.');
      setPreviewCardFeedback(targetIndex, 'saved', 'Already added. This entry was not duplicated.');
      refreshPreviewCard(targetIndex);
      return;
    }
    setUpdateFeedback('error', 'Nothing was added. Check browser storage permissions, then try again.');
    setPreviewCardFeedback(targetIndex, 'error', 'Nothing was added. Browser storage may be blocked or full.');
    if(button){
      button.disabled = false;
      button.classList.remove('is-saving');
      button.innerHTML = '<span>Add This Entry</span>';
    }
  }

  function bindUpdatePreviewModalActions(root){
    if(!root) return;
    root.querySelectorAll('[data-update-modal-add]').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        addPreviewEntryByIndex(btn.dataset.updateModalAdd, btn);
      });
    });
    root.querySelectorAll('[data-update-modal-view]').forEach(btn => {
      btn.addEventListener('click', event => {
        event.preventDefault();
        event.stopPropagation();
        openFinalEntryPreview(Number(btn.dataset.updateModalView));
      });
    });
  }

  function saveUpdate(){
    const entries = previewUpdate(false);
    if(!entries.length) return;
    const result = saveUpdateEntries(entries);
    renderUpdatePreview(entries);
    if(result.saved.length) clearUpdateForm(true);
  }

  function clearUpdateForm(keepPreview){
    ['adp-update-id','adp-update-date','adp-update-title','adp-update-source','adp-update-images','adp-update-raw'].forEach(id=>{ const el=document.getElementById(id); if(el) el.value=''; });
    const addedBy=$('#adp-update-added-by'); if(addedBy) addedBy.value=currentAdminName();
    const type=$('#adp-update-type'); if(type) type.value='auto';
    const status=$('#adp-update-file-status'); if(status) status.textContent='No file selected.';
    const file=$('#adp-update-file'); if(file) file.value='';
    const btn=$('[data-update-save]'); if(btn) btn.textContent='Add to Updates';
    if(!keepPreview){ setUpdateFeedback('info','Ready. Pick a world, paste notes, then click Clean & Preview.'); const box=$('#adp-update-preview'); if(box){ box.classList.remove('is-duplicate','is-ready','is-error'); box.innerHTML='<b>Preview</b><p>Paste notes or upload a file, then click Clean & Preview. If this entry already exists, it will show as Already Entered and will not be duplicated.</p>'; } }
  }

  function editUpdate(id){
    const entry = (updatesApi()?.getManualEntries?.() || []).find(item=>item.id===id); if(!entry) return;
    $('#adp-update-id').value = entry.id || '';
    $('#adp-update-world').value = entry.world || 'legacy';
    $('#adp-update-type').value = entry.type || 'auto';
    $('#adp-update-date').value = entry.date || '';
    $('#adp-update-title').value = entry.title || '';
    $('#adp-update-source').value = entry.source || '';
    const addedBy=$('#adp-update-added-by'); if(addedBy) addedBy.value = entry.addedBy || currentAdminName();
    $('#adp-update-images').value = (entry.images || []).join('\n');
    $('#adp-update-raw').value = entry.content || '';
    const btn=$('[data-update-save]'); if(btn) btn.textContent='Save to Updates';
    renderUpdatePreview(entry);
    $('#adp-update-raw').focus();
  }

  function copyText(value, label){
    if(navigator.clipboard?.writeText) navigator.clipboard.writeText(value).catch(()=>{});
    if(label) window.alert(label);
  }

  function copyCurrentUpdate(){
    const entries = previewUpdate(false);
    if(!entries.length) return;
    copyText(JSON.stringify(entries.length === 1 ? entries[0] : entries, null, 2), entries.length === 1 ? 'Generated update JSON copied.' : 'Generated update JSON array copied.');
  }

  function copySavedUpdate(id){
    const entry = (updatesApi()?.getManualEntries?.() || []).find(item=>item.id===id); if(!entry) return;
    copyText(JSON.stringify(entry, null, 2), 'Saved update JSON copied.');
  }

  function exportManualUpdates(){
    const entries = updatesApi()?.getManualEntries?.() || [];
    const blob = new Blob([JSON.stringify(entries, null, 2)], { type:'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'archlight-manual-updates.json';
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(()=>URL.revokeObjectURL(url), 800);
  }

  function readUpdateFiles(input){
    const files = Array.from(input.files || []);
    const status=$('#adp-update-file-status');
    if(status) status.textContent = files.length ? `Reading ${files.length} file${files.length>1?'s':''}...` : 'No file selected.';
    if(files.length) setUpdateFeedback('info', `Reading ${files.length} uploaded file${files.length>1?'s':''}...`);
    if(!files.length) return;
    Promise.all(files.map(file => file.text().then(text => ({ name:file.name, text })))).then(items => {
      const joined = items.map(item => `\n\n===== ${item.name} =====\n\n${item.text}`).join('\n');
      const raw=$('#adp-update-raw');
      if(raw) raw.value = `${raw.value ? raw.value + '\n\n' : ''}${joined}`.trim();
      if(!$('#adp-update-source')?.value && items[0]) $('#adp-update-source').value = items.map(item=>item.name).join(', ');
      const totalChars = joined.length;
      const multi = items.length > 1 || totalChars > 250000;
      if(status) status.textContent = multi
        ? `Loaded ${items.length} file${items.length>1?'s':''}. Click Clean & Preview when ready. Auto-preview was skipped to avoid browser lag.`
        : `Loaded ${items.length} file${items.length>1?'s':''}. Click Clean & Preview to scan it.`;
      setUpdateFeedback('success', multi
        ? `Loaded ${items.length} file${items.length>1?'s':''}. Auto-preview skipped to avoid browser lag. Click Clean & Preview to process them.`
        : `Loaded ${items.length} file${items.length>1?'s':''}. Click Clean & Preview to process it.`);
    }).catch(err => {
      console.warn(err);
      if(status) status.textContent = 'Could not read one of the selected files.';
      renderUpdateMessage('error','File read failed','Could not read one of the selected files. Try copying the patch notes text directly into the text box.');
    });
  }

  function saveWorlds(){
    worldsApi()?.setWorlds?.(readWorldRows());
    const show = $('#adp-worlds-visible')?.checked !== false;
    worldsApi()?.setDisplayEnabled?.(show);
    notifyWikiActivity({type:'update', action:'updated', page:'Worlds Navbar', emoji:'🌍', impact:'World display or status settings were saved'});
    redrawWorlds();
  }
  function slugifyWorldName(name, worlds){
    const base = cleanText(name || 'New World').toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'') || 'world';
    let id = base;
    let n = 2;
    const taken = new Set((worlds || []).map(w=>w.id));
    while(taken.has(id)){ id = base + '-' + n++; }
    return id;
  }
  function addWorld(){
    const worlds = readWorldRows();
    const nameInput = $('#adp-new-world-name');
    const shortInput = $('#adp-new-world-short');
    const statusInput = $('#adp-new-world-status');
    const name = cleanText(nameInput?.value) || 'New World';
    const short = cleanText(shortInput?.value) || name;
    const status = cleanText(statusInput?.value) || 'offline';
    const id = slugifyWorldName(name, worlds);
    worlds.push({ id, name, short, rune:'✦', tagline:'New world profile', rules:'Describe this world ruleset.', bestFor:'Describe who should play here.', status, online:status==='online', enabled:true });
    worldsApi()?.setWorlds?.(worlds);
    notifyWikiActivity({type:'new', action:'added', page:name, emoji:'🌍', impact:'New world profile added to the navbar controls'});
    if(nameInput) nameInput.value = '';
    if(shortInput) shortInput.value = '';
    if(statusInput) statusInput.value = 'offline';
    redrawWorlds();
  }
  function resetWorlds(){
    worldsApi()?.resetWorlds?.();
    notifyWikiActivity({type:'fix', action:'reset', page:'Worlds Navbar', emoji:'🌍', impact:'World display settings were reset'});
    redrawWorlds();
  }
  function saveTip(){
    const ico = cleanText($('#adp-tip-ico')?.value) || '✨';
    const source = cleanText($('#adp-tip-source')?.value) || 'Archlight';
    const raw = cleanText($('#adp-tip-text')?.value);
    const editIndex = $('#adp-tip-text')?.dataset.editIndex;
    if(raw.length < 8){ alert('Tip text is too short.'); return; }
    const tip = { ico, source, text: tipsApi()?.formatTipText?.(raw) || esc(raw) };
    if(editIndex !== undefined && editIndex !== '') tipsApi()?.updateTip?.(Number(editIndex), tip);
    else tipsApi()?.addTip?.(tip);
    notifyWikiActivity({type: editIndex !== undefined && editIndex !== '' ? 'update' : 'new', action: editIndex !== undefined && editIndex !== '' ? 'updated' : 'added', page:'Archlight Tips', emoji:'💡', impact:'Tip carousel content was saved'});
    clearTipForm();
    redrawTips();
  }
  function clearTipForm(){
    ['adp-tip-ico','adp-tip-source','adp-tip-text'].forEach(id=>{ const el=document.getElementById(id); if(el){ el.value=''; delete el.dataset.editIndex; } });
    const btn=$('[data-tip-save]'); if(btn) btn.textContent='Add Tip';
  }
  function editTip(index){
    const tip = tipsApi()?.getTips?.()[index]; if(!tip) return;
    $('#adp-tip-ico').value = tip.ico || '✨';
    $('#adp-tip-source').value = tip.source || '';
    $('#adp-tip-text').value = strip(tip.text || '');
    $('#adp-tip-text').dataset.editIndex = index;
    const btn=$('[data-tip-save]'); if(btn) btn.textContent='Save Tip';
    $('#adp-tip-text').focus();
  }
  function moveTip(index, direction){
    const api = tipsApi();
    const tips = api?.getTips?.() || [];
    const target = index + direction;
    if(!api?.setTips || target < 0 || target >= tips.length) return;
    const next = tips.slice();
    const item = next.splice(index,1)[0];
    next.splice(target,0,item);
    api.setTips(next);
    redrawTips();
    notifyWikiActivity({type:'update', action:'reordered', page:'Archlight Tips', emoji:'💡', impact:'Tip order was updated'});
  }
  function toggleTipPreview(index){
    const row = document.querySelector(`[data-tip-row="${index}"]`);
    if(!row) return;
    const open = row.classList.toggle('is-open');
    const btn = row.querySelector('[data-tip-preview]');
    if(btn) btn.setAttribute('aria-expanded', open ? 'true' : 'false');
  }
  function bind(host){
    if(host.__adpBound) return; host.__adpBound = true;
    host.addEventListener('click',e=>{
      if(e.target.closest('[data-admin-login]')){ window.openLoginModal?.('a'); return; }
      const tab=e.target.closest('[data-adp-tab]');
      if(tab){ const id=tab.dataset.adpTab; $$('.adp-tabs button',host).forEach(b=>{ const on=b===tab; b.classList.toggle('on',on); b.setAttribute('aria-selected', on?'true':'false'); }); $$('.adp-panel[data-adp-panel]',host).forEach(panel=>{ const on=panel.dataset.adpPanel===id; panel.classList.toggle('on',on); panel.hidden=!on; }); return; }
      const statusBtn=e.target.closest('[data-status-choice]');
      if(statusBtn){
        const row=statusBtn.closest('.adp-world');
        statusBtn.parentElement.querySelectorAll('[data-status-choice]').forEach(btn=>btn.classList.toggle('on',btn===statusBtn));
        if(row){ row.classList.remove('is-online','is-offline','is-maintenance'); row.classList.add('is-'+statusBtn.dataset.statusChoice); }
        saveWorlds();
        return;
      }
      if(e.target.closest('[data-world-save]')) saveWorlds();
      if(e.target.closest('[data-world-add]')) addWorld();
      if(e.target.closest('[data-world-reset]')) resetWorlds();
      const remWorld=e.target.closest('[data-world-remove]'); if(remWorld){ worldsApi()?.setWorlds?.(readWorldRows().filter(w=>w.id!==remWorld.dataset.worldRemove)); redrawWorlds(); }
      if(e.target.closest('[data-alert-save]')) saveAlert();
      if(e.target.closest('[data-alert-clear]')) clearAlertForm();
      if(e.target.closest('[data-alert-reset]')){ alertsApi()?.reset?.(); clearAlertForm(); redrawAlerts(); }
      if(e.target.closest('[data-page-controls-save]')){ savePageControls(); return; }
      if(e.target.closest('[data-page-controls-reset]')){ if(confirm('Reset all page locks and featured sidebar settings?')) resetPageControls(); return; }
      const lockToggle=e.target.closest('[data-page-lock-toggle],[data-page-lock-sidebar]');
      if(lockToggle){
        const row=lockToggle.closest('.adp-page-control-row');
        if(row) row.classList.toggle('is-locked', !!$('[data-page-lock-toggle]', row)?.checked);
        savePageControls();
        return;
      }
      const featureOne=e.target.closest('[data-page-feature-one]'); if(featureOne){ const mode=$('#adp-feature-mode'); const page=$('#adp-feature-page'); const show=$('#adp-feature-show'); if(mode) mode.value='manual'; if(page) page.value=featureOne.dataset.pageFeatureOne; if(show) show.checked=true; savePageControls(); return; }
      if(e.target.closest('[data-contrib-roles-save]')){ saveContributorRoles(); return; }
      if(e.target.closest('[data-contrib-random]')){ generateRandomContributorDemo(); return; }
      if(e.target.closest('[data-point-rules-save]')){ saveContributionPointRules(); return; }
      if(e.target.closest('[data-payout-save]')){ savePayoutMonthFromDom(); const dash=$('#adp-payout-dashboard'); if(dash) dash.outerHTML = archlightCoinDashboard(selectedPayoutMonth()); notifyWikiActivity({type:'update', action:'saved', page:'Archlight Coin Payout Planner', emoji:'🪙', impact:'Monthly payout checklist was saved'}); return; }
      if(e.target.closest('[data-payout-snapshot]')){ const month=selectedPayoutMonth(); ensurePayoutMonth(month,{refresh:true}); const dash=$('#adp-payout-dashboard'); if(dash) dash.outerHTML = archlightCoinDashboard(month); return; }
      if(e.target.closest('[data-payout-mark-eligible]')){ $$('.adp-payout-row').forEach(row=>{ const coins=Number($('[data-payout-coins]', row)?.value || 0); const check=$('[data-payout-granted]', row); if(check && coins>0) check.checked=true; }); savePayoutMonthFromDom(); const dash=$('#adp-payout-dashboard'); if(dash) dash.outerHTML = archlightCoinDashboard(selectedPayoutMonth()); return; }
      const payoutGrant=e.target.closest('[data-payout-granted]'); if(payoutGrant){ savePayoutMonthFromDom(); const dash=$('#adp-payout-dashboard'); if(dash) dash.outerHTML = archlightCoinDashboard(selectedPayoutMonth()); return; }
      if(e.target.closest('[data-contrib-roles-reset]') || e.target.closest('[data-point-rules-reset]')){ if(confirm('Reset contributor role and point overrides from this browser?')) resetContributorOverrides(); return; }
      if(e.target.closest('[data-update-preview]')){
        e.preventDefault();
        const btn = e.target.closest('[data-update-preview]');
        const oldText = btn ? btn.textContent : '';
        if(btn){ btn.disabled = true; btn.textContent = 'Scanning...'; }
        setUpdateFeedback('info', 'Scanning uploaded notes. Large saved HTML files now use the faster importer path...');
        window.setTimeout(() => {
          try{ previewUpdate(true); }
          finally{ if(btn){ btn.disabled = false; btn.textContent = oldText || 'Clean & Preview'; } }
        }, 30);
      }
      if(e.target.closest('[data-update-save]')) saveUpdate();
      if(e.target.closest('[data-update-clear]')) clearUpdateForm();
      if(e.target.closest('[data-update-copy-current]')) copyCurrentUpdate();
      if(e.target.closest('[data-update-export]')) exportManualUpdates();
      if(e.target.closest('[data-update-reset]')){ if(confirm('Remove all manual patch notes from this browser?')){ updatesApi()?.resetManualEntries?.(); clearUpdateForm(); redrawUpdatesAdmin(); } }
      const editUpdateBtn=e.target.closest('[data-update-edit]'); if(editUpdateBtn) editUpdate(editUpdateBtn.dataset.updateEdit);
      const copyUpdateBtn=e.target.closest('[data-update-copy]'); if(copyUpdateBtn) copySavedUpdate(copyUpdateBtn.dataset.updateCopy);
      const removeUpdateBtn=e.target.closest('[data-update-remove]'); if(removeUpdateBtn){ updatesApi()?.removeManualEntry?.(removeUpdateBtn.dataset.updateRemove); redrawUpdatesAdmin(); }
      const editAlertBtn=e.target.closest('[data-alert-edit]'); if(editAlertBtn) editAlert(editAlertBtn.dataset.alertEdit);
      const removeAlertBtn=e.target.closest('[data-alert-remove]'); if(removeAlertBtn){ alertsApi()?.remove?.(removeAlertBtn.dataset.alertRemove); redrawAlerts(); }
      if(e.target.closest('[data-tip-save]')) saveTip();
      if(e.target.closest('[data-tip-clear]')) clearTipForm();
      const preview=e.target.closest('[data-tip-preview]'); if(preview) toggleTipPreview(Number(preview.dataset.tipPreview));
      const up=e.target.closest('[data-tip-up]'); if(up) moveTip(Number(up.dataset.tipUp), -1);
      const down=e.target.closest('[data-tip-down]'); if(down) moveTip(Number(down.dataset.tipDown), 1);
      const edit=e.target.closest('[data-tip-edit]'); if(edit) editTip(Number(edit.dataset.tipEdit));
      const rem=e.target.closest('[data-tip-remove]'); if(rem){ tipsApi()?.removeTip?.(Number(rem.dataset.tipRemove)); redrawTips(); }
    });

    host.addEventListener('change', e=>{
      if(e.target && e.target.id === 'adp-payout-month'){ const dash=$('#adp-payout-dashboard'); if(dash) dash.outerHTML = archlightCoinDashboard(cleanText(e.target.value)); return; }
      if(e.target?.matches?.('[data-payout-coins],[data-payout-score-edit]')){ savePayoutMonthFromDom(); return; }
    });

    if(!document.__adpUpdatePreviewDelegated){
      document.__adpUpdatePreviewDelegated = true;
      document.addEventListener('click',event=>{
        if(event.target.closest('[data-update-preview-close]')){ event.preventDefault(); closeUpdatePreviewModal(); return; }
        if(event.target.closest('[data-update-preview-copy]')){
          event.preventDefault();
          const root = document.getElementById('adp-update-preview-modal-root');
          const text = root?.__adpCleanText || '';
          if(text && navigator.clipboard?.writeText) navigator.clipboard.writeText(text).catch(()=>{});
          const btn = event.target.closest('[data-update-preview-copy]');
          if(btn){ const old = btn.textContent; btn.textContent = 'Copied'; setTimeout(()=>{ btn.textContent = old; }, 1200); }
        }
        if(event.target.closest('[data-update-final-close]')){ event.preventDefault(); closeFinalEntryPreview(); return; }
        const viewOne = event.target.closest('[data-update-modal-view]');
        if(viewOne){
          event.preventDefault();
          openFinalEntryPreview(Number(viewOne.dataset.updateModalView));
          return;
        }
        const addOne = event.target.closest('[data-update-modal-add]');
        if(addOne){
          event.preventDefault();
          addPreviewEntryByIndex(addOne.dataset.updateModalAdd, addOne);
          return;
        }
        if(event.target.closest('[data-update-modal-add-all]')){
          event.preventDefault();
          const root = document.getElementById('adp-update-preview-modal-root');
          const entries = root?.__adpPreviewEntries || [];
          saveUpdateEntries(entries);
          if(entries.length) openUpdatePreviewModal(entries);
          return;
        }
      });
      document.addEventListener('keydown',event=>{ if(event.key === 'Escape'){ closeFinalEntryPreview(); closeUpdatePreviewModal(); } });
    }

    host.addEventListener('change',e=>{
      if(e.target && e.target.id === 'adp-worlds-visible') worldsApi()?.setDisplayEnabled?.(e.target.checked);
      if(e.target && e.target.matches('[data-world-enabled]')) saveWorlds();
      if(e.target && e.target.id && e.target.id.startsWith('adp-update-') && e.target.id !== 'adp-update-file') {
        clearTimeout(host.__adpUpdatePreviewTimer);
        host.__adpUpdatePreviewTimer = setTimeout(() => { if(cleanText($('#adp-update-raw')?.value).length >= 8) previewUpdate(false); }, 180);
      }
      if(e.target && e.target.id === 'adp-update-file') readUpdateFiles(e.target);
    });
    host.addEventListener('input',e=>{
      if(e.target && e.target.id && e.target.id.startsWith('adp-update-') && e.target.id !== 'adp-update-file') {
        clearTimeout(host.__adpUpdatePreviewTimer);
        host.__adpUpdatePreviewTimer = setTimeout(() => { if(cleanText($('#adp-update-raw')?.value).length >= 8) previewUpdate(false); }, 180);
      }
      if(e.target && e.target.id === 'adp-update-file') readUpdateFiles(e.target);
    });
  }

  document.addEventListener('archlight:session-change', function(){
    const host = document.getElementById('pg-admin');
    if(host && host.classList.contains('on')) render();
  });
  window.ArchlightAdminPanel = { render, ensureHost };
})();
