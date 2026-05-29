(function(){
  'use strict';
  function E(id){ return document.getElementById(id); }
  function esc(s){ return String(s ?? '').replace(/[&<>"']/g,function(ch){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];}); }
  function slug(v){ return String(v||'').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,''); }
  function roleLabel(role){ return ({wiki_admin:'Wiki Admin',admin:'Admin',community_manager:'CM',contributor:'Contributor',player:'Player'}[role] || role || 'Player'); }
  function currentContributor(){
    var core=window.ContributorsCore;
    var name=String(window.currentUser || '').trim();
    if(!core || !name) return null;
    var key=slug(name);
    return (core.contributors() || []).find(function(c){ return slug(c.name)===key || slug(c._baseName)===key; }) || null;
  }
  function roleInfo(role){
    var core=window.ContributorsCore;
    var person=currentContributor();
    var fallback = role === 'wiki_admin' || role === 'admin' ? '#ffd36a' : '#65eadc';
    var fallbackName = roleLabel(role);
    var fallbackSlug = slug(role || 'player');
    if(core && person){
      var staff = core.primaryStaffRole ? core.primaryStaffRole(person) : null;
      if(staff){
        return { name: staff.displayName || staff.name || fallbackName, slug: slug(staff.id || staff.name || fallbackSlug), color: core.roleColor ? core.roleColor(staff, fallback) : (staff.color || fallback) };
      }
    }
    return { name:fallbackName, slug:fallbackSlug, color:fallback };
  }
  function sessionPhoto(name){
    try{
      var k='archlight_profile_photo_'+String(name||'player').trim().toLowerCase();
      return localStorage.getItem(k) || localStorage.getItem('archlight_profile_photo') || '';
    }catch(e){return '';}
  }
  function statsFor(){
    var core=window.ContributorsCore;
    var person=currentContributor();
    if(core && person){
      var earned=core.earnedRoleObject(person) || {};
      var next=core.nextEarnedRole(person);
      var prev=earned;
      var total=core.totalPts(person);
      var base=Number(prev.points||0), target=next?Number(next.points||0):Math.max(total,base);
      var pct=target>base?Math.max(0,Math.min(100,((total-base)/(target-base))*100)):100;
      return {person:person, earned:earned, next:next, points:total, season:core.seasonPts(person), edits:core.editsOf(person), pages:core.pagesOf(person), pct:pct};
    }
    return {person:null,earned:{name:'Helper',tier:1,points:0},next:null,points:0,season:0,edits:0,pages:0,pct:0};
  }
  function renderProfilePage(){
    var host=E('pg-profile');
    if(!host) return;
    var name=window.currentUser || 'Guest';
    var role=window.currentRole || 'player';
    var staffInfo=roleInfo(role);
    var color=staffInfo.color;
    var roleSlug=staffInfo.slug || String(role||'player').toLowerCase().replace(/[^a-z0-9]+/g,'_').replace(/^_+|_+$/g,'');
    var photo=sessionPhoto(name);
    var emoji=(window.__archlightLoginSession && window.__archlightLoginSession.emoji) || '👤';
    var data=statsFor();
    var earned=data.earned || {name:'Helper',tier:1};
    var avatar=photo?'<img src="'+esc(photo)+'" alt="'+esc(name)+' profile image">':'<span class="profile-avatar-fallback">'+esc(emoji)+'</span>';
    var roleLine = '';
    var profileNameMarkup = '<h1 class="profile-title" data-staff-role="'+esc(roleSlug)+'" data-earned-tier="'+esc(Math.max(1, Math.min(6, Number(earned.tier || 1))))+'">'+esc(name)+'</h1>';
    if(window.ContributorsCore && data.person){
      roleLine = window.ContributorsCore.secondaryRoles(data.person);
      profileNameMarkup = window.ContributorsCore.nameWithPrimaryRole(data.person, 'profile-title');
    }
    else if(window.ContributorsCore){
      var core = window.ContributorsCore;
      var staffRole = {id:roleSlug,name:staffInfo.name,color:color,priority:0,icon:roleSlug.indexOf('admin')>-1?'👑':'📜'};
      var tempPerson = {name:name, staffRoles:[staffInfo.name || roleLabel(role)], earnedRole:earned.name || 'Helper', points:data.points || 0};
      profileNameMarkup = '<div class="contributor-name-role profile-title"><span class="contributor-name-text contributor-staff-name" data-staff-role="'+esc(roleSlug)+'" data-earned-tier="'+esc(earned.tier || 1)+'" style="--staff-name-color:'+esc(color)+';--earned-tier:'+esc(earned.tier || 1)+'">'+esc(name)+'</span>'+core.roleChip(staffInfo.name || roleLabel(role),'staff',staffRole)+'</div>';
      roleLine = '<span class="role-group role-group--staff">'+core.roleChip(staffInfo.name || roleLabel(role),'staff',staffRole)+'</span><span class="role-group--divider" aria-hidden="true"></span><span class="role-group role-group--standard">'+core.roleChip('Contributor','standard',{id:'contributor',name:'Contributor',icon:'📜',color:'#65eadc'})+'</span><span class="role-group--divider" aria-hidden="true"></span><span class="role-group role-group--earned">'+core.roleChip(earned.name || 'Helper','earned',earned)+'</span>';
    } else { roleLine = '<span class="profile-earned-role">'+esc(earned.name || 'Helper')+' · Tier '+esc(earned.tier || 1)+'</span>'; }
    var isStaff=['wiki_admin','admin'].includes(role);
    var profileTier = Math.max(1, Math.min(6, Number(earned.tier || 1)));
    var avatarRank = roleSlug.indexOf('admin') > -1 ? 'royal' : (roleSlug.indexOf('editor') > -1 ? 'crafted' : (profileTier >= 5 ? 'mythic' : (profileTier >= 3 ? 'seasoned' : 'starter')));
    var maxStarsClass = profileTier >= 6 ? ' profile-max-stars' : '';
    var staffIdentityClass = isStaff ? ' profile-staff-identity' : '';
    var canAdmin=['wiki_admin','admin'].includes(role);
    var nextCopy=data.next ? (Number(data.next.points||0)-Number(data.points||0)).toLocaleString()+' stars until '+esc(data.next.name) : 'Highest contributor star rank reached';
    var allEarnedRoles = window.ContributorsCore && window.ContributorsCore.earnedRoles ? window.ContributorsCore.earnedRoles() : [
      {id:'helper',name:'Helper',tier:1,points:0,color:'#aab6c8',description:'Start helping the wiki.'},
      {id:'page_scout',name:'Page Scout',tier:2,points:250,color:'#78e6c7',description:'Early useful contributions.'},
      {id:'route_keeper',name:'Route Keeper',tier:3,points:750,color:'#8bbdff',description:'Reliable route and guide improvements.'},
      {id:'wiki_curator',name:'Wiki Curator',tier:4,points:1500,color:'#c99cff',description:'Trusted deeper guide work.'},
      {id:'realm_chronicler',name:'Realm Chronicler',tier:5,points:2500,color:'#ffe08a',description:'Major wiki section support.'},
      {id:'elder_cartographer',name:'Elder Cartographer',tier:6,points:5000,color:'#ffb36a',description:'Long-term legendary contribution.'}
    ];
    var currentPoints = Number(data.points || 0);
    var maxRolePoints = Math.max.apply(null, allEarnedRoles.map(function(r){return Number(r.points||0);}).concat([1]));
    var nextMilestone = allEarnedRoles.find(function(r){ return Number(r.points || 0) > currentPoints; }) || null;
    var milestoneHtml = allEarnedRoles.map(function(r){
      var need = Number(r.points || 0);
      var isDone = currentPoints >= need;
      var isCurrent = String(r.name||'') === String(earned.name||'') || (!nextMilestone && need === maxRolePoints) || (nextMilestone && need < Number(nextMilestone.points||0) && currentPoints >= need && !allEarnedRoles.some(function(o){ return Number(o.points||0) > need && Number(o.points||0) <= currentPoints; }));
      var left = Math.max(0, need - currentPoints);
      var tier = Number(r.tier || 1);
      return '<article class="profile-rank-node '+(isDone?'is-earned':'is-locked')+' '+(isCurrent?'is-current':'')+'" style="--rank-color:'+esc(r.color||'#ffe08a')+'">'
        + '<div class="profile-rank-node__badge"><span>'+esc(tier)+'</span></div>'
        + '<div class="profile-rank-node__body"><b>'+esc(r.name||'Contributor')+'</b><span>'+Number(need).toLocaleString()+' lifetime stars</span><small>'+esc(isDone ? 'Unlocked' : left.toLocaleString()+' stars needed')+'</small></div>'
        + '<p>'+esc(r.description || '')+'</p>'
        + '</article>';
    }).join('');
    var roleProgressPct = Math.max(0, Math.min(100, (currentPoints / maxRolePoints) * 100));
    var seasonRank = 0;
    var seasonReward = null;
    if(window.ContributorsCore && data.person){
      var board = window.ContributorsCore.sorted ? window.ContributorsCore.sorted() : [];
      var personKey = slug(data.person.name || data.person._baseName || name);
      var boardIndex = board.findIndex(function(c){ return slug(c.name || c._baseName) === personKey || slug(c._baseName || c.name) === personKey; });
      seasonRank = boardIndex >= 0 ? boardIndex + 1 : 0;
      seasonReward = window.ContributorsCore.seasonRewards ? window.ContributorsCore.seasonRewards().find(function(r){ return Number(r.rank || 0) === seasonRank; }) : null;
    }
    var seasonBonusHtml = '';
    if(data.person && seasonReward){
      seasonBonusHtml = '<section class="profile-season-bonus is-eligible"><div class="profile-season-bonus__mark">'+esc(seasonReward.icon || '🏆')+'</div><div class="profile-season-bonus__copy"><span>Season bonus active</span><b>#'+esc(seasonRank)+' contributor this month</b><p>You are currently earning <strong>+'+Number(seasonReward.bonus || 0).toLocaleString()+' next-season stars</strong>. This gives your wiki profile a head start next season. It is a wiki contribution bonus, not Archlight Coins.</p></div></section>';
    } else if(data.person){
      var rewards = window.ContributorsCore && window.ContributorsCore.seasonRewards ? window.ContributorsCore.seasonRewards() : [];
      var rewardCopy = rewards.length ? rewards.map(function(r){ return '#'+Number(r.rank||0)+': +'+Number(r.bonus||0).toLocaleString(); }).join(' · ') : 'Top seasonal contributors receive next-season stars.';
      seasonBonusHtml = '<section class="profile-season-bonus"><div class="profile-season-bonus__mark">✦</div><div class="profile-season-bonus__copy"><span>Season bonus tracker</span><b>No active top bonus yet</b><p>Finish the month in the top seasonal spots to start next season with bonus wiki contribution stars. Current rewards: <strong>'+esc(rewardCopy)+'</strong>.</p></div></section>';
    }
    var profilePlacingsHtml = '';
    if(window.ContributorsCore && data.person){
      var pastAwards = window.ContributorsCore.seasonAwards ? window.ContributorsCore.seasonAwards(data.person.name || data.person._baseName || name) : [];
      var chips = pastAwards.length
        ? pastAwards.slice(0,6).map(function(a){ return window.ContributorsCore.placementChip(a,'profile-past'); }).join('')
        : '<span class="placing-chip empty profile-past" tabindex="0" data-hint="This profile has no archived seasonal podium placing yet."><span class="placing-medal" aria-hidden="true">◇</span><span class="placing-copy"><b>No past placings</b><em>New season record</em></span></span>';
      var wins = pastAwards.filter(function(a){ return Number(a.rank || 0) === 1; }).length;
      var podiums = pastAwards.length;
      var best = pastAwards.length ? Math.min.apply(null, pastAwards.map(function(a){ return Number(a.rank || 0) || 99; })) : 0;
      var latestAward = pastAwards.length ? pastAwards[pastAwards.length - 1] : null;
      var bestAward = pastAwards.length ? pastAwards.slice().sort(function(a,b){ return (Number(a.rank||99)-Number(b.rank||99)); })[0] : null;
      var bestMedal = best === 1 ? '♛' : (best === 2 ? 'Ⅱ' : (best === 3 ? 'Ⅲ' : '◇'));
      var bestTitle = best ? '#'+best+' Best Season' : 'No Podium Yet';
      var bestSeasonCopy = bestAward ? esc(bestAward.season || 'Archived season') : 'Reach top 3 in a season';
      var latestCopy = latestAward ? '#'+Number(latestAward.rank || 0)+' · '+esc(latestAward.season || 'Latest season') : 'No archived result yet';
      var legacyScore = Math.max(0, wins * 3 + podiums);
      var legacyTier = legacyScore >= 18 ? 'Legend record' : (legacyScore >= 9 ? 'Veteran record' : (legacyScore >= 3 ? 'Rising record' : 'New record'));
      var nextLegacyGoal = legacyScore >= 18 ? 18 : (legacyScore >= 9 ? 18 : (legacyScore >= 3 ? 9 : 3));
      var legacyProgress = nextLegacyGoal ? Math.max(0, Math.min(100, (legacyScore / nextLegacyGoal) * 100)) : 100;
      var legacyHint = legacyScore >= 18 ? 'Long-term podium history is fully established.' : (nextLegacyGoal - legacyScore).toLocaleString()+' record points until the next legacy tier';
      profilePlacingsHtml = '<section class="profile-panel profile-panel--placings">'
        + '<div class="profile-panel-heading-row profile-placings-head"><div class="profile-placings-title"><h2><i aria-hidden="true">🏆</i> Best Placings</h2><p>Long-term leaderboard legacy, strongest season, and archived podium history.</p></div><div class="profile-rank-summary"><span>Best recorded rank</span><strong>'+(best ? '#'+best : 'No podium')+'</strong></div></div>'
        + '<div class="profile-placing-layout"><div class="profile-placing-feature"><div class="profile-placing-feature__medal" data-rank="'+esc(best || 0)+'">'+esc(bestMedal)+'</div><div class="profile-placing-feature__copy"><span>Highest placing</span><b>'+bestTitle+'</b><em>'+bestSeasonCopy+'</em></div></div>'
        + '<div class="profile-placing-right"><div class="profile-placing-stats"><article class="wins"><span>Wins</span><b>'+Number(wins).toLocaleString()+'</b><em>#1 finishes</em></article><article class="podiums"><span>Podiums</span><b>'+Number(podiums).toLocaleString()+'</b><em>Total top 3 seasons</em></article><article class="latest"><span>Latest</span><b>'+(latestAward ? '#'+Number(latestAward.rank || 0) : '—')+'</b><em>'+latestCopy+'</em></article></div>'
        + '<div class="profile-placing-legacy" style="--placing-legacy-progress:'+Math.round(legacyProgress)+'%"><div><span>Legacy track</span><b>'+esc(legacyTier)+'</b></div><em>'+esc(legacyHint)+'</em><i aria-hidden="true"><u></u></i></div></div>'
        + '<div class="profile-placing-timeline"><div class="profile-placing-timeline-label"><span>Season archive</span><small>Most recent records first</small></div><div class="profile-placing-list">'+chips+'</div></div></div>'
        + '</section>';
    }
    var permissions = [
      {ok:true, icon:'✦', title:'Send wiki contributions', text:'Report issues, suggest edits, or submit missing guide information from the Contribute page.'},
      {ok:true, icon:'★', title:'Track contributor progress', text:'Season contribution stars, lifetime contribution stars, accepted edits, and created pages appear on this profile.'},
      {ok:isStaff, icon:'✓', title:'Review submissions', text:isStaff?'Your staff role can access review and editing areas.':'Requires Wiki Admin access.'},
      {ok:canAdmin, icon:'🛡', title:'Manage wiki tools', text:canAdmin?'Admin panel access is enabled for your account.':'Requires Wiki Admin access.'}
    ];
    host.style.setProperty('--profile-role-color',color);
    host.innerHTML=`
      <div class="profile-page profile-role-${roleSlug} profile-tier-${profileTier}${maxStarsClass}${staffIdentityClass}" style="--profile-role-color:${color}">
        <section class="profile-hero">
          <div class="profile-avatar-large profile-avatar-evolved profile-avatar-role-${roleSlug} profile-avatar-rank-${avatarRank} profile-avatar-tier-${profileTier}" data-avatar-tier="${profileTier}" aria-label="${roleLabel(roleSlug)} avatar frame">${avatar}<span class="profile-avatar-crown" aria-hidden="true">♛</span><span class="profile-avatar-tier-mark" aria-hidden="true">T${profileTier}</span></div>
          <div class="profile-hero-copy">
            <p class="profile-kicker">Wiki Profile</p>
            ${profileNameMarkup}
            <div class="profile-role-line role-style-parity">${roleLine}</div>
          </div>
          <div class="profile-actions">
            <button type="button" onclick="go('contribute')">Contribute</button>
            ${isStaff?'<button type="button" class="profile-editing-tools" onclick="go(\'admin\')"><span aria-hidden="true">✦</span> Editing Tools</button>':''}
          </div>
        </section>
        <div class="profile-grid">
          <section class="profile-panel profile-panel--progress">
            <h2><i aria-hidden="true">✦</i> Contribution Progress</h2>
            <div class="profile-stats">
              <div class="profile-stat profile-stat--season"><i aria-hidden="true">✦</i><span>Season stars</span><b>${Number(data.season||0).toLocaleString()}</b><small>Current era progress</small></div>
              <div class="profile-stat profile-stat--lifetime"><i aria-hidden="true">★</i><span>Lifetime stars</span><b>${Number(data.points||0).toLocaleString()}</b><small>Total wiki contribution</small></div>
              <div class="profile-stat profile-stat--edits"><i aria-hidden="true">✎</i><span>Approved edits</span><b>${Number(data.edits||0).toLocaleString()}</b><small>Reviewed improvements</small></div>
              <div class="profile-stat profile-stat--pages"><i aria-hidden="true">▣</i><span>Pages started</span><b>${Number(data.pages||0).toLocaleString()}</b><small>New guide work</small></div>
            </div>
            ${seasonBonusHtml}
          </section>
          <section class="profile-panel profile-panel--rank profile-panel--rank-map">
            <div class="profile-panel-heading-row">
              <h2><i aria-hidden="true">★</i> Contributor Stars</h2>
              <div class="profile-rank-summary"><span>${Number(currentPoints||0).toLocaleString()} lifetime stars</span><strong>${esc(earned.name || 'Helper')}</strong></div>
            </div>
            <div class="profile-rank-road" style="--profile-rank-progress:${Math.round(roleProgressPct)}%">
              <div class="profile-rank-track" aria-hidden="true"><i></i></div>
              <div class="profile-rank-nodes">${milestoneHtml}</div>
            </div>
            <div class="profile-rank-foot"><span>${nextCopy}</span><strong>${nextMilestone ? 'Next milestone' : 'Final milestone reached'}</strong></div>
          </section>
          ${profilePlacingsHtml}
          <section class="profile-panel profile-panel--access" style="grid-column:1 / -1">
            <h2><i aria-hidden="true">⚒</i> Access and Wiki Tools</h2>
            <div class="profile-permission-list">${permissions.map(function(p){return '<article class="profile-permission '+(p.ok?'is-open':'is-locked')+'"><i>'+(p.ok?'✓':'•')+'</i><div><b>'+esc(p.title)+'</b><span>'+esc(p.text)+'</span></div></article>';}).join('')}</div>
          </section>
        </div>
      </div>`;
  }
  window.renderProfilePage=renderProfilePage;
  document.addEventListener('DOMContentLoaded',renderProfilePage);
  document.addEventListener('archlight:session-change',renderProfilePage);
})();
