(function(){
  if(window.__archlightCleanLoginLive) return;
  window.__archlightCleanLoginLive = true;

  function E(id){ return document.getElementById(id); }
  function qs(sel, root){ return (root||document).querySelector(sel); }
  function esc(s){ return String(s || '').replace(/[&<>"']/g, function(ch){ return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]; }); }

  var USERS = Object.assign({}, window.ARCHLIGHT_ADMIN_USERS || {
    'fluffydrakoz': { name:'Fluffydrakoz', password:'archlight2025', role:'wiki_admin', emoji:'⚡' }
  });
  // Preview tester account for Netlify/team review. Staff/admin accounts also log in through the same normal login form.
  USERS.tester = USERS.tester || { name:'Tester', password:'archlight', role:'contributor', emoji:'✦' };

  window.currentRole = window.currentRole || '';
  window.currentUser = window.currentUser || '';
  window.adminOn = !!window.adminOn;
  window.adminUser = window.adminUser || '';

  function ensureModal(){
    if(E('unified-login')) return;
    var modal = document.createElement('div');
    modal.id = 'unified-login';
    modal.setAttribute('role','dialog');
    modal.setAttribute('aria-modal','true');
    modal.innerHTML = ''
      + '<div id="ulc">'
      +   '<div class="ulc-stripe"></div>'
      +   '<button aria-label="Close" class="ulc-x" type="button" data-login-close>×</button>'
      +   '<div class="ulc-hero">'
      +     '<div class="ulc-logo-wrap">'
      +       '<div class="ulc-logo-glow"></div><div class="ulc-ring-2"></div><div class="ulc-ring"></div>'
      +       '<canvas height="104" id="ulc-logo-canvas" width="104"></canvas>'
      +     '</div>'
      +     '<div class="ulc-title">Archlight</div>'
      +     '<div class="ulc-sub">Community Wiki</div>'
      +   '</div>'
      +   '<div class="ulc-tabs">'
      +     '<button class="ulc-tab on" id="uTab-p" type="button" data-login-tab="p">⚔️ &nbsp;Login</button>'
      +     '<button class="ulc-tab ulc-tab-create" id="uTab-r" type="button" data-login-tab="r">✦ &nbsp;Create Account</button>'
      +   '</div>'
      +   '<div class="ulc-body">'
      +     '<div class="ulc-panel on" id="uPanel-p">'
      +       '<div class="ulc-form-title"><span>Welcome back</span><h3>Sign in to the wiki</h3></div>'
      +       '<div class="ulc-test-login"><b>Preview tester login</b><span>Username: <strong>tester</strong></span><span>Password: <strong>archlight</strong></span><button type="button" data-fill-tester>Fill tester login</button></div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-u">Username</label><input autocomplete="username" class="ulc-inp" id="ul-u" placeholder="Your wiki username…"/></div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-p">Password</label><input autocomplete="current-password" class="ulc-inp" id="ul-p" placeholder="Password…" type="password"/></div>'
      +       '<div class="ulc-err" id="ul-err">Incorrect username or password. Please try again.</div>'
      +       '<button class="ulc-btn" type="button" data-login-submit="p" style="margin-top:6px">Sign In</button>'
      +       '<div class="ulc-divider">New to the wiki?</div>'
      +       '<div class="ulc-signup-link">Don’t have an account? &nbsp;<a data-login-tab="r">Create an account →</a></div>'
      +     '</div>'
      +     '<div class="ulc-panel" id="uPanel-r">'
      +       '<div class="ulc-form-title"><span>New account</span><h3>Create your wiki profile</h3></div>'
      +       '<div class="ulc-success">Account created. You are now signed in.</div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-rname">Username</label><input class="ulc-inp" id="ul-rname" placeholder="Choose a username…"/></div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-rdiscord">Discord</label><input class="ulc-inp" id="ul-rdiscord" placeholder="Discord name, optional…"/></div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-rpass">Password</label><input autocomplete="new-password" class="ulc-inp" id="ul-rpass" placeholder="Create a password…" type="password"/></div>'
      +       '<div class="ulc-field"><label class="ulc-lbl" for="ul-rpass2">Confirm Password</label><input autocomplete="new-password" class="ulc-inp" id="ul-rpass2" placeholder="Repeat password…" type="password"/></div>'
      +       '<div class="ulc-err" id="ul-rerr">Please fill username and password.</div>'
      +       '<button class="ulc-btn" type="button" data-login-register style="margin-top:6px">Create Account</button>'
      +       '<div class="ulc-back-link"><a data-login-tab="p">← Back to login</a></div>'
      +     '</div>'
      +   '</div>'
      + '</div>';
    document.body.appendChild(modal);
  }

  function drawLogo(){
    var cv = E('ulc-logo-canvas');
    if(!cv || !cv.getContext) return;
    if(typeof window.renderLogo === 'function'){
      try { window.renderLogo('ulc-logo-canvas', 104); return; } catch(e){}
    }
    var ctx = cv.getContext('2d'), S = cv.width || 88, cx = S/2, cy = S/2;
    ctx.clearRect(0,0,S,S);
    ctx.beginPath(); ctx.arc(cx,cy,S/2-3,0,Math.PI*2); ctx.fillStyle='rgba(8,12,24,.96)'; ctx.fill();
    ctx.beginPath(); ctx.arc(cx,cy,S/2-4,0,Math.PI*2);
    var rg=ctx.createLinearGradient(0,0,S,S);
    rg.addColorStop(0,'rgba(140,90,10,.65)'); rg.addColorStop(.35,'rgba(220,165,30,.95)'); rg.addColorStop(.5,'rgba(245,210,70,1)'); rg.addColorStop(1,'rgba(140,90,10,.65)');
    ctx.strokeStyle=rg; ctx.lineWidth=2; ctx.stroke();
    ctx.font='bold 42px "Cinzel Decorative", serif'; ctx.textAlign='center'; ctx.textBaseline='middle';
    var tg=ctx.createLinearGradient(S*.1,S*.15,S*.9,S*.88);
    tg.addColorStop(0,'#8a6010'); tg.addColorStop(.25,'#d4a020'); tg.addColorStop(.45,'#fff4a0'); tg.addColorStop(.65,'#f5cc50'); tg.addColorStop(1,'#8a6010');
    ctx.fillStyle=tg; ctx.fillText('A',cx,cy+2);
  }

  function hideErrors(){ ['ul-err','ul-rerr'].forEach(function(id){ var el=E(id); if(el) el.style.display='none'; }); }
  function uLT(tab){
    ensureModal();
    tab = tab || 'p';
    ['p','r'].forEach(function(k){
      var tb=E('uTab-'+k), pn=E('uPanel-'+k);
      if(tb) tb.classList.toggle('on', k===tab);
      if(pn) pn.classList.toggle('on', k===tab);
    });
    hideErrors();
    setTimeout(function(){
      var focusId = tab==='r' ? 'ul-rname' : 'ul-u';
      var i=E(focusId); if(i) i.focus();
    }, 40);
  }
  function uLO(tab){
    ensureModal();
    var ov=E('unified-login');
    if(!ov) return;
    ov.classList.remove('closing');
    ov.classList.add('open');
    uLT(tab || 'p');
    setTimeout(drawLogo, 30);
  }
  function uLC(){
    var ov=E('unified-login'); if(!ov) return;
    ov.classList.add('closing');
    setTimeout(function(){
      ov.classList.remove('open','closing');
      ['ul-u','ul-p','ul-rname','ul-rdiscord','ul-rpass','ul-rpass2'].forEach(function(id){ var i=E(id); if(i) i.value=''; });
      var rp=E('uPanel-r'); if(rp) rp.classList.remove('req-ok');
      hideErrors();
      uLT('p');
    }, 180);
  }

  function localAccountKey(){ return 'archlight_player_accounts'; }
  function readLocalAccounts(){
    try { return JSON.parse(localStorage.getItem(localAccountKey()) || '{}') || {}; }
    catch(e){ return {}; }
  }
  function writeLocalAccounts(accounts){
    try { localStorage.setItem(localAccountKey(), JSON.stringify(accounts || {})); } catch(e){}
  }
  function normalizeLoginKey(username){ return String(username || '').trim().toLowerCase(); }
  function findUser(username){
    var key=normalizeLoginKey(username);
    var local = readLocalAccounts();
    return USERS[key] || local[key] || null;
  }
  function usernameExists(username){
    var key=normalizeLoginKey(username);
    return !!(USERS[key] || readLocalAccounts()[key]);
  }
  function roleLabel(role){
    return ({wiki_admin:'Wiki Admin', admin:'Admin', community_manager:'CM',  contributor:'Contributor', player:'Player'}[role] || role || 'Player');
  }

  function slugValue(value){ return String(value || '').toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, ''); }
  function currentContributorRecord(name){
    var core = window.ContributorsCore;
    if(!core || !name) return null;
    var key = slugValue(name);
    try { return (core.contributors() || []).find(function(item){ return slugValue(item.name) === key || slugValue(item._baseName) === key; }) || null; }
    catch(e){ return null; }
  }
  function localTipStars(name){
    try{
      var data = JSON.parse(localStorage.getItem('archlight_tip_stars_v1') || '{}') || {};
      return Math.max(0, Math.round(Number(data[slugValue(name)] || 0)));
    }catch(e){ return 0; }
  }
  function contributorSummary(name, role){
    var core = window.ContributorsCore;
    var person = currentContributorRecord(name);
    var staffColor = role === 'wiki_admin' || role === 'admin' ? '#ffd36a' : '#65eadc';
    var bonusStars = localTipStars(name);
    var summary = { points:bonusStars, season:bonusStars, earned:'Helper', tier:1, color:staffColor, staffLabel:roleLabel(role), staffSlug:slugValue(role || 'player'), person:null };
    if(core && person){
      var earned = core.earnedRoleObject(person) || {};
      var staff = core.primaryStaffRole(person) || null;
      summary.points = (core.totalPts(person) || 0) + bonusStars;
      summary.season = (core.seasonPts(person) || 0) + bonusStars;
      summary.earned = earned.name || 'Helper';
      summary.tier = Number(earned.tier || 1);
      summary.staffLabel = (staff && (staff.displayName || staff.name)) || roleLabel(role);
      summary.staffSlug = slugValue((staff && (staff.id || staff.name)) || role || 'player');
      summary.color = staff ? (core.roleColor ? core.roleColor(staff, staffColor) : (staff.color || staffColor)) : staffColor;
      summary.person = person;
    }
    if(core && summary.person){
      summary.primaryRoleChip = core.primaryRoleChip ? core.primaryRoleChip(summary.person) : '';
      summary.secondaryRoles = core.secondaryRoles ? core.secondaryRoles(summary.person) : '';
    } else if(core){
      var isIdentity = ['wiki_admin','admin'].indexOf(summary.staffSlug) !== -1;
      var fallbackRole = {id:summary.staffSlug,name:summary.staffLabel,color:summary.color,priority:isIdentity ? 300 : 0,icon:summary.staffSlug.indexOf('admin')>-1?'👑':'📜'};
      summary.primaryRoleChip = isIdentity ? core.roleChip(summary.staffLabel || roleLabel(role), 'staff', fallbackRole) : '';
      var earnedFallback = {id:slugValue(summary.earned),name:summary.earned,tier:summary.tier,color:'#aab6c8',points:0};
      var identityFallback = isIdentity ? '<span class="role-group role-group--staff">'+core.roleChip(summary.staffLabel || roleLabel(role), 'staff', fallbackRole)+'</span><span class="role-group--divider" aria-hidden="true"></span>' : '';
      summary.secondaryRoles = identityFallback + '<span class="role-group role-group--standard">'+core.roleChip('Contributor', 'standard', {id:'contributor',name:'Contributor',icon:'📜',color:'#65eadc'})+'</span><span class="role-group--divider" aria-hidden="true"></span><span class="role-group role-group--earned">'+core.roleChip(summary.earned || 'Helper', 'earned', earnedFallback)+'</span>';
    } else {
      summary.primaryRoleChip = '';
      summary.secondaryRoles = '';
    }
    return summary;
  }

  function profilePhotoKey(name){
    return 'archlight_profile_photo_' + String(name || window.currentUser || 'player').trim().toLowerCase();
  }
  function sessionPhoto(name, role){
    try{
      var key = profilePhotoKey(name);
      var direct = localStorage.getItem(key);
      if(direct) return direct;
      var generic = localStorage.getItem('archlight_profile_photo');
      if(generic) return generic;
    }catch(e){}
    return '';
  }
  function refreshProfileChip(){
    if(window.__archlightLoginSession) showNavUserChip(window.__archlightLoginSession.name, window.__archlightLoginSession.role, window.__archlightLoginSession.emoji);
  }
  function saveProfilePhoto(value){
    if(!window.currentUser) return;
    try{
      if(value) localStorage.setItem(profilePhotoKey(window.currentUser), value);
      else localStorage.removeItem(profilePhotoKey(window.currentUser));
    }catch(e){ alert('Profile image is too large for this browser storage. Try a smaller image or use an image URL.'); return; }
    refreshProfileChip();
    drawProfilePopover();
  }
  function isStaffRole(role){
    return ['wiki_admin','admin'].indexOf(role || window.currentRole) !== -1;
  }
  function ensureProfilePopover(){
    var pop = E('profile-popover');
    if(pop) return pop;
    pop = document.createElement('div');
    pop.id = 'profile-popover';
    pop.setAttribute('role','dialog');
    pop.setAttribute('aria-label','Profile menu');
    pop.innerHTML = '<div class="profile-popover-inner"></div>';
    document.body.appendChild(pop);
    return pop;
  }
  function drawProfilePopover(){
    var pop = ensureProfilePopover();
    var inner = pop.querySelector('.profile-popover-inner');
    if(!inner) return;
    var nameRaw = window.currentUser || 'Player';
    var name = esc(nameRaw);
    var summary = contributorSummary(nameRaw, window.currentRole);
    var role = esc(summary.staffLabel || roleLabel(window.currentRole));
    var photo = sessionPhoto(window.currentUser, window.currentRole);
    var avatar = photo ? '<img alt="" src="'+esc(photo)+'"/>' : '<span>'+(window.__archlightLoginSession && window.__archlightLoginSession.emoji ? esc(window.__archlightLoginSession.emoji) : '👤')+'</span>';
    var popAvatarRank = summary.staffSlug.indexOf('admin') > -1 ? 'royal' : (summary.staffSlug.indexOf('editor') > -1 ? 'crafted' : (Number(summary.tier||1) >= 5 ? 'mythic' : (Number(summary.tier||1) >= 3 ? 'seasoned' : 'starter')));
    var isStaff = isStaffRole();
    inner.style.setProperty('--profile-role-color', summary.color || '#65eadc');
    inner.innerHTML = ''
      + '<div class="profile-pop-head"><div class="profile-pop-avatar profile-pop-avatar--'+esc(summary.staffSlug)+' profile-pop-avatar-rank-'+esc(popAvatarRank)+' profile-pop-avatar-tier-'+esc(summary.tier)+'" data-avatar-tier="'+esc(summary.tier)+'">'+avatar+'<i aria-hidden="true">♛</i></div><div class="profile-pop-main"><div class="profile-pop-name-row"><b>'+name+'</b>'+ (summary.primaryRoleChip || '') +'</div><div class="profile-pop-starline"><span aria-hidden="true">★</span><strong>'+Number(summary.points||0).toLocaleString()+'</strong><em>lifetime contribution stars</em></div><div class="profile-pop-roleline">'+(summary.secondaryRoles || '')+'</div></div></div>'
      + '<div class="profile-pop-stats"><span><b>'+Number(summary.season||0).toLocaleString()+'</b><em>season contribution stars</em></span><span><b>'+Number(summary.points||0).toLocaleString()+'</b><em>lifetime contribution stars</em></span><span><b>Tier '+esc(summary.tier)+'</b><em>contributor stars</em></span></div>'
      + '<div class="profile-pop-section"><strong>Profile picture</strong><p>Upload an image, including GIFs, or paste an image URL. Your avatar and staff styling update across the wiki.</p></div>'
      + '<label class="profile-upload-btn">Upload image<input id="profile-photo-file" type="file" accept="image/png,image/jpeg,image/webp,image/gif"/></label>'
      + '<div class="profile-url-row"><input id="profile-photo-url" placeholder="Paste image URL…"/><button type="button" data-profile-url-save>Use URL</button></div>'
      + '<div class="profile-pop-actions">'
      +   '<button class="profile-view-special" type="button" data-profile-open>View Full Profile</button>'
      +   '<button type="button" data-profile-remove>Remove picture</button>'
      +   (isStaff ? '<button type="button" data-profile-admin>Admin Panel</button>' : '')
      + '</div>';
  }
  function positionProfilePopover(){
    var pop = ensureProfilePopover();
    var chip = E('nav-user-chip');
    if(!chip) return;
    var r = chip.getBoundingClientRect();
    pop.style.top = Math.round(r.bottom + 10) + 'px';
    pop.style.right = Math.max(12, Math.round(window.innerWidth - r.right)) + 'px';
  }
  function openProfilePopover(){
    if(!window.currentUser) return;
    drawProfilePopover();
    positionProfilePopover();
    ensureProfilePopover().classList.add('open');
  }
  function closeProfilePopover(){ var pop = E('profile-popover'); if(pop) pop.classList.remove('open'); }
  function toggleProfilePopover(){ var pop = ensureProfilePopover(); if(pop.classList.contains('open')) closeProfilePopover(); else openProfilePopover(); }
  function showNavUserChip(name, role, emoji){
    var chip=E('nav-user-chip'); if(!chip) return;
    var summary = contributorSummary(name, role);
    chip.style.display='flex';
    chip.className = '';
    chip.classList.add('show');
    chip.classList.add('role-' + (role === 'wiki_admin' ? 'admin' : role || 'player'));
    chip.classList.add('staff-' + (summary.staffSlug || 'player'));
    chip.classList.add('tier-' + Math.max(1, Math.min(6, Number(summary.tier || 1))));
    chip.classList.toggle('max-stars', Number(summary.tier || 1) >= 6);
    chip.classList.toggle('role-wiki_admin', role === 'wiki_admin');
    chip.style.setProperty('--profile-role-color', summary.color || '#65eadc');
    var avi=E('nuc-avi'), nm=E('nuc-name'), rl=E('nuc-role');
    if(avi){
      avi.classList.remove('has-photo','aw-admin-photo');
      avi.innerHTML = '';
      var photo = sessionPhoto(name, role);
      if(photo){
        avi.classList.add('has-photo','aw-admin-photo');
        avi.innerHTML = '<img alt="" src="' + esc(photo) + '"/>';
      } else {
        avi.textContent = emoji || '👤';
      }
    }
    if(nm) nm.textContent = name || 'Player';
    if(rl){
      var staffSlug = summary.staffSlug || slugValue(role || 'player');
      var isKing = staffSlug === 'wiki_admin' || staffSlug === 'admin' || role === 'wiki_admin' || role === 'admin';
      var roleIcon = isKing ? '♛' : '✦';
      var statIcon = isKing ? '✦' : '★';
      var identity = Number(summary.tier || 1) >= 6 ? 'MAX' : '';
      rl.innerHTML = '<span class="nuc-role-main"><i aria-hidden="true">'+roleIcon+'</i>'+esc(summary.staffLabel || roleLabel(role))+'</span>' + (identity ? '<span class="nuc-identity">'+identity+'</span>' : '') + '<span class="nuc-points"><i aria-hidden="true">'+statIcon+'</i>'+Number(summary.points||0).toLocaleString()+' stars</span>';
    }
  }
  function clearNavUserChip(){
    var chip=E('nav-user-chip'); if(chip){ chip.style.display='none'; chip.className=''; chip.classList.remove('show'); }
    var avi=E('nuc-avi'), nm=E('nuc-name'), rl=E('nuc-role');
    if(avi) avi.textContent='👤'; if(nm) nm.textContent='—'; if(rl) rl.textContent='—';
  }
  function applySession(session){
    var isStaff = session && isStaffRole(session.role);
    window.__archlightLoginSession = session || null;
    window.currentUser = session ? session.name : '';
    window.currentRole = session ? session.role : '';
    window.adminUser = isStaff ? session.name : '';
    window.adminOn = !!isStaff;
    document.body.classList.toggle('admin-on', !!isStaff);
    var badge=E('adm-nm'); if(badge) badge.textContent = session ? String(session.name).toUpperCase() : 'ADMIN';
    var login=E('login-nav-btn'), logout=E('logout-nav-btn');
    if(login) login.style.display = session ? 'none' : '';
    if(logout) logout.style.display = session ? '' : 'none';
    if(session) showNavUserChip(session.name, session.role, session.emoji); else clearNavUserChip();
    var onAdminPage = document.getElementById('pg-admin') && document.getElementById('pg-admin').classList.contains('on');
    if(session && !isStaff && ((location.hash && location.hash.replace('#','') === 'admin') || onAdminPage)) {
      setTimeout(function(){
        if(typeof window.go === 'function') window.go('profile');
        if(window.renderProfilePage) window.renderProfilePage();
      }, 0);
    }
    if(window.ArchlightRenderSidebar) window.ArchlightRenderSidebar();
    try { document.dispatchEvent(new CustomEvent('archlight:session-change')); } catch(e){}
  }
  function saveSession(session){
    try { localStorage.setItem('archlight_clean_login_session', JSON.stringify(session)); } catch(e){}
    applySession(session);
  }
  function loadSession(){
    try {
      var raw=localStorage.getItem('archlight_clean_login_session');
      if(raw) applySession(JSON.parse(raw));
      else applySession(null);
    }
    catch(e){ applySession(null); }
  }
  function uLS(tab){
    tab = tab || 'p';
    var username = (E('ul-u') || {}).value || '';
    var password = (E('ul-p') || {}).value || '';
    var err=E('ul-err');
    var user=findUser(username);
    if(!username.trim() || !password){ if(err){ err.textContent='Please enter credentials.'; err.style.display='block'; } return; }
    if(user && user.password === password){
      if(err) err.style.display='none';
      saveSession({ name:user.name, role:user.role, emoji:user.emoji });
      uLC();
      if(['wiki_admin','admin'].indexOf(user.role) !== -1 && typeof window.go === 'function') window.go('admin');
      else if(location.hash && location.hash.replace('#','') === 'admin') { setTimeout(function(){ if(typeof window.go === 'function') window.go('profile'); if(window.renderProfilePage) window.renderProfilePage(); }, 0); }
      return;
    }
    if(err){ err.textContent = 'Incorrect username or password.'; err.style.display='block'; }
    var card=E('ulc'); if(card){ card.classList.add('ulc-shake'); setTimeout(function(){ card.classList.remove('ulc-shake'); }, 340); }
  }
  function submitRegister(){
    var name=(E('ul-rname')||{}).value||'';
    var discord=(E('ul-rdiscord')||{}).value||'';
    var pass=(E('ul-rpass')||{}).value||'';
    var pass2=(E('ul-rpass2')||{}).value||'';
    var err=E('ul-rerr');
    var cleanName = name.trim();
    var key = normalizeLoginKey(cleanName);

    if(!cleanName || !pass){ if(err){ err.textContent='Please fill username and password.'; err.style.display='block'; } return; }
    if(cleanName.length < 3){ if(err){ err.textContent='Username must be at least 3 characters.'; err.style.display='block'; } return; }
    if(!/^[a-z0-9 _.-]+$/i.test(cleanName)){ if(err){ err.textContent='Use only letters, numbers, spaces, dots, dashes, or underscores.'; err.style.display='block'; } return; }
    if(pass.length < 4){ if(err){ err.textContent='Password must be at least 4 characters.'; err.style.display='block'; } return; }
    if(pass !== pass2){ if(err){ err.textContent='Passwords do not match.'; err.style.display='block'; } return; }
    if(usernameExists(cleanName)){ if(err){ err.textContent='That username already exists. Please choose another name.'; err.style.display='block'; } return; }

    var accounts = readLocalAccounts();
    var account = {
      name: cleanName,
      password: pass,
      role: 'contributor',
      emoji: '✦',
      discord: discord.trim(),
      createdAt: new Date().toISOString(),
      source: 'player_signup'
    };
    accounts[key] = account;
    writeLocalAccounts(accounts);

    if(err) err.style.display='none';
    var panel=E('uPanel-r'); if(panel) panel.classList.add('req-ok');
    saveSession({ name: account.name, role: account.role, emoji: account.emoji });
    if(location.hash && location.hash.replace('#','') === 'admin'){
      setTimeout(function(){ if(typeof window.go === 'function') window.go('profile'); if(window.renderProfilePage) window.renderProfilePage(); }, 0);
    }
    setTimeout(function(){ uLC(); }, 650);
  }
  function doLogoutAll(){
    try{ localStorage.removeItem('archlight_clean_login_session'); }catch(e){}
    closeProfilePopover();
    applySession(null);
    if(typeof window.go === 'function') window.go('home');
  }

  function bind(){
    ensureModal();
    var navChip = E('nav-user-chip');
    if(navChip){
      navChip.removeAttribute('onclick');
      navChip.title = 'Open profile menu';
      navChip.setAttribute('role','button');
      navChip.setAttribute('tabindex','0');
    }
    document.addEventListener('click', function(e){
      var profileChip = e.target.closest('#nav-user-chip');
      if(profileChip){ e.preventDefault(); e.stopPropagation(); toggleProfilePopover(); return; }
      if(!e.target.closest('#profile-popover')) closeProfilePopover();
      var openProfileBtn = e.target.closest('[data-profile-open]');
      if(openProfileBtn){ e.preventDefault(); closeProfilePopover(); if(typeof window.go === 'function') window.go('profile'); if(window.renderProfilePage) window.renderProfilePage(); return; }
      var adminBtn = e.target.closest('[data-profile-admin]');
      if(adminBtn){ e.preventDefault(); closeProfilePopover(); if(typeof window.go === 'function') window.go('admin'); return; }
      if(e.target.closest('[data-profile-remove]')){ e.preventDefault(); saveProfilePhoto(''); return; }
      if(e.target.closest('[data-profile-url-save]')){
        e.preventDefault();
        var inp = E('profile-photo-url');
        var url = inp ? inp.value.trim() : '';
        if(!url){ alert('Paste an image URL first.'); return; }
        saveProfilePhoto(url);
        return;
      }
      var close=e.target.closest('[data-login-close]'); if(close){ e.preventDefault(); uLC(); return; }
      var tab=e.target.closest('[data-login-tab]'); if(tab){ e.preventDefault(); uLT(tab.getAttribute('data-login-tab')); return; }
      if(e.target.closest('[data-fill-tester]')){ e.preventDefault(); var tu=E('ul-u'), tp=E('ul-p'); if(tu) tu.value='tester'; if(tp) tp.value='archlight'; if(tu) tu.focus(); return; }
      var submit=e.target.closest('[data-login-submit]'); if(submit){ e.preventDefault(); uLS(submit.getAttribute('data-login-submit')); return; }
      if(e.target.closest('[data-login-register]')){ e.preventDefault(); submitRegister(); return; }
      var ov=E('unified-login'); if(ov && e.target === ov) uLC();
    });
    document.addEventListener('change', function(e){
      if(e.target && e.target.id === 'profile-photo-file'){
        var file = e.target.files && e.target.files[0];
        if(!file) return;
        if(!/^image\//.test(file.type || '')){ alert('Please choose an image file.'); return; }
        var maxProfileImageSize = /^image\/gif$/i.test(file.type || '') ? 5200 * 1024 : 1800 * 1024;
        if(file.size > maxProfileImageSize){ alert('Please choose a smaller image. GIFs can be up to 5 MB, normal images up to 1.8 MB, or use an image URL.'); return; }
        var reader = new FileReader();
        reader.onload = function(){ saveProfilePhoto(String(reader.result || '')); };
        reader.readAsDataURL(file);
      }
    });
    window.addEventListener('resize', function(){ var pop=E('profile-popover'); if(pop && pop.classList.contains('open')) positionProfilePopover(); });
    document.addEventListener('keydown', function(e){
      var chip=E('nav-user-chip');
      if((e.key === 'Enter' || e.key === ' ') && document.activeElement === chip){ e.preventDefault(); toggleProfilePopover(); return; }
      if(e.key === 'Escape') closeProfilePopover();
      var ov=E('unified-login'); if(!ov || !ov.classList.contains('open')) return;
      if(e.key === 'Escape'){ uLC(); return; }
      if(e.key === 'Enter'){
        if(E('uPanel-r') && E('uPanel-r').classList.contains('on')) submitRegister();
        else uLS('p');
      }
    });
    loadSession();
    setTimeout(drawLogo, 60);
  }

  window.uLO = uLO;
  window.uLC = uLC;
  window.uLT = uLT;
  window.uLS = uLS;
  window.openLoginModal = function(tab){ uLO(tab || 'p'); };
  window.closeLoginModal = uLC;
  window.doModalLogin = function(){ uLS('p'); };
  window.doLogoutAll = doLogoutAll;
  window.doLogout = doLogoutAll;
  window.showNavUserChip = showNavUserChip;
  window.openProfilePopover = openProfilePopover;
  window.refreshProfileChip = refreshProfileChip;

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', bind);
  else bind();
})();
