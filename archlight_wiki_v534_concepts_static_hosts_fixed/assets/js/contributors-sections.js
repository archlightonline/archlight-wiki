(function(){
  'use strict';
  const c = window.ContributorsCore;
  if(!c) return;

  function criteriaPanel(){
    const settings=c.settings();
    const criteria=c.criteria().map((item,idx)=>'<article class="contrib-rule-card"><span class="contrib-rule-step">0'+(idx+1)+'</span><span class="contrib-rule-icon">'+c.esc(item.icon)+'</span><div><strong>'+c.esc(item.label)+'</strong><p>'+c.esc(item.text)+'</p></div></article>').join('');
    const earned=c.earnedRoles().map(t=>{
      const tier = Math.max(1,Math.min(6,c.n(t.tier)||1));
      const stars = Array.from({length:6},(_,i)=>'<i class="'+(i < tier ? 'is-on' : '')+'" aria-hidden="true">★</i>').join('');
      const req = c.n(t.points).toLocaleString()+' lifetime stars';
      const color = c.esc(t.color || '#d8c47a');
      return '<article class="contrib-tier-card role-card role-card--earned role-tier-'+tier+'" style="--role-color:'+color+'"><div class="role-card-head"><div class="role-card-titlewrap"><div class="contrib-tier-name">'+c.esc(t.name)+'</div><div class="contrib-tier-range">'+req+'</div></div><span class="rank-stars-badge rank-stars-badge--tier-'+tier+' role-card-stars" data-stars="'+tier+'" style="--role-color:'+color+'" aria-label="'+c.esc(t.name)+' rank, '+tier+' stars"><span class="rank-stars-badge__label">Tier '+tier+'</span><span class="rank-stars-badge__stars">'+stars+'</span></span></div><div class="role-card-body"><p>'+c.esc(t.description)+'</p></div></article>';
    }).join('');

    return '<section class="contrib-system-panel" aria-label="Contributor system criteria"><div class="contrib-system-head"><div><span>Contributor System</span><h3>How contributor stars work</h3></div><p>'+c.esc(settings.intro || settings.rankingRule || '')+'</p></div><div class="contrib-rule-grid">'+criteria+'</div><div class="contrib-role-columns contrib-role-columns--earned-only"><div class="contrib-role-block"><div class="contrib-role-title contrib-role-title--earned">Contributor Stars</div><div class="contrib-tier-grid contrib-tier-grid--earned">'+earned+'</div></div></div></section>';
  }

  function seasonMeta(){
    const settings=c.settings();
    const now = new Date();
    const month = now.toLocaleString(undefined,{month:'long',year:'numeric'});
    return '<div class="season-meta-main"><strong>'+c.esc(month)+' season.</strong> '+c.esc(settings.resetRule||'Season contribution stars reset monthly.')+'</div>';
  }

  function historyPanel(){
    return c.archive().slice(0,3).map(s=>'<div class="hist-row"><div class="hist-top"><span class="hist-badge">'+c.esc(s.season)+'</span></div><div class="hist-copy">'+(s.winners||[]).map(w=>'#'+w.rank+' '+c.esc(w.name)).join(' · ')+'</div></div>').join('');
  }

  function topPodium(sorted){
    const top=sorted.slice(0,3);
    const note='<div class="hall-note"><div><div class="hall-note-title">Wiki contribution progress</div><div class="hall-note-copy"><strong>Season contribution stars</strong> rank the current month. <strong>Lifetime stars</strong> unlock contributor stars that stay with your profile. Approved reports, suggestions, fixes, and missing-page drafts all help your wiki progress.</div></div><div class="hall-legend"><div class="hall-legend-item"><div class="hall-legend-k">Contributor ranks</div><div class="hall-legend-v">Unlocked through approved wiki work.</div></div><div class="hall-legend-item"><div class="hall-legend-k">Season contribution stars</div><div class="hall-legend-v">Current monthly wiki leaderboard total.</div></div><div class="hall-legend-item"><div class="hall-legend-k">Lifetime stars</div><div class="hall-legend-v">Long-term star progression.</div></div></div></div>';
    const cards='<div class="contrib-showcase">'+top.map((p,idx)=>{const rank=idx+1; const contributorName=c.nameWithPrimaryRole(p,'focus-name'); const earnedTitle=(c.earnedRoleObject(p)||{}).name||p.title||'Contributor'; return '<article class="contrib-focus rank-'+rank+'"><div class="focus-top"><div class="focus-rank" tabindex="0" aria-label="Season rank '+rank+'" data-hint="Current monthly wiki leaderboard placement."><span class="focus-rank-icon" aria-hidden="true">'+c.esc(c.placementIcon(rank))+'</span><span class="focus-rank-num">#'+rank+'</span></div><div class="focus-reward" tabindex="0" data-hint="Next-season contribution stars granted for this podium placement.">'+c.rewardForRank(rank)+'</div></div><div class="focus-head"><div class="focus-title-block">'+contributorName+'<div class="focus-earned-title">'+c.esc(earnedTitle)+'</div></div><div class="focus-identity-main">'+c.avatar(p,'focus-avi')+'<div class="focus-roleline">'+c.roles(p,{excludePrimaryStaff:false})+'</div></div></div><div class="focus-strip"><div class="focus-stat"><div class="focus-stat-k">Season stars</div><div class="focus-stat-v focus-stat-v-score">'+c.statValue(c.seasonPts(p).toLocaleString(),'Season contribution stars are the active wiki leaderboard total for this month. They are not in-game Archlight Coins.','score-hint')+'</div><div class="focus-stat-s">Monthly wiki total</div></div><div class="focus-stat"><div class="focus-stat-k">Lifetime stars</div><div class="focus-stat-v">'+c.statValue(c.totalPts(p).toLocaleString(),'Lifetime stars are permanent contribution progress. They unlock earned wiki ranks.','')+'</div><div class="focus-stat-s">Earned rank progress</div></div><div class="focus-stat"><div class="focus-stat-k">Approved edits</div><div class="focus-stat-v compact">'+c.statValue(c.editsOf(p).toLocaleString(),'Approved edits are accepted changes to existing wiki pages, values, text, tables, or structure.','')+'</div><div class="focus-stat-s">Accepted wiki changes</div></div><div class="focus-stat"><div class="focus-stat-k">Pages started</div><div class="focus-stat-v">'+c.statValue(c.pagesOf(p).toLocaleString(),'Pages started counts accepted new pages or missing guides created by this contributor.','')+'</div><div class="focus-stat-s">Missing pages created</div></div></div><div class="focus-summary">'+c.metaSummary(p)+'</div><div class="focus-progress">'+c.progressLabel(p)+'</div><div class="focus-history"><div class="focus-history-label">Past placings</div><div class="focus-history-row">'+c.historyChips(p.name)+'</div></div></article>';}).join('')+'</div>';
    return note + cards;
  }

  function rows(sorted){
    const rest=sorted.slice(3);
    return '<div class="contrib-rows-toolbar"><div class="contrib-rows-toolbar-copy">Browse contributors</div><div class="contrib-rows-nav"><button type="button" class="contrib-nav-btn prev" aria-label="Previous contributor">‹</button><button type="button" class="contrib-nav-btn next" aria-label="Next contributor">›</button></div></div><div class="contrib-rows">'+rest.map((p,idx)=>{const awards=c.seasonAwards(p.name).slice(0,3); const history=awards.length?awards.map(a=>c.placementChip(a,'row-past')).join(''):'<span class="placing-chip empty row-past" tabindex="0" data-hint="This contributor has no archived podium placing yet."><span class="placing-medal" aria-hidden="true">◇</span><span class="placing-copy"><b>No past placings</b><em>New season record</em></span></span>'; return '<article class="contrib-row"><div class="contrib-row-left"><div class="contrib-row-rank">#'+(idx+4)+'</div>'+c.avatar(p,'contrib-row-avi')+'</div><div class="contrib-row-main"><div class="contrib-row-head">'+c.nameWithPrimaryRole(p,'contrib-row-name')+'</div><div class="contrib-row-meta"><div class="contrib-row-summary"><span class="role-wrap">'+c.secondaryRoles(p)+'</span><span class="sep">•</span><span class="summary-stats"><span class="meta-item">'+c.editsOf(p)+' approved edits</span><span class="sep inner">•</span><span class="meta-item">'+c.pagesOf(p)+' pages started</span><span class="sep inner">•</span><span class="meta-item">'+c.totalPts(p).toLocaleString()+' lifetime stars</span></span></div></div><div class="contrib-row-history"><strong>Past placings</strong><span class="placings-wrap">'+history+'</span></div></div><div class="contrib-row-right"><div class="contrib-row-score"><span class="score-v">'+c.statValue(c.seasonPts(p).toLocaleString(),'Season contribution stars rank contributors for the monthly wiki leaderboard.','score-hint')+'</span><small>season stars</small></div><div class="contrib-row-tags"><span class="metric-pill lifetime-pill"><em>Lifetime</em><strong>'+c.statValue(c.totalPts(p).toLocaleString(),'Lifetime stars unlock earned wiki ranks and stay as long-term recognition.','')+'</strong></span><span class="metric-pill edits-pill"><em>Edits</em><strong>'+c.statValue(c.editsOf(p).toLocaleString(),'Accepted wiki edits after review.','')+'</strong></span><span class="metric-pill pages-pill"><em>Pages</em><strong>'+c.statValue(c.pagesOf(p).toLocaleString(),'Accepted new pages started by this contributor.','')+'</strong></span></div></div></article>';}).join('')+'</div>';
  }
  function seasonRewardsPanel(){
    const rewards = c.seasonRewards ? c.seasonRewards() : [];
    const icons = {1:'🏆',2:'🥈',3:'🥉'};
    const html = rewards.slice(0,3).map(reward => {
      const rank = c.n(reward.rank);
      const cls = rank === 1 ? 'top1' : rank === 2 ? 'top2' : rank === 3 ? 'top3' : '';
      const icon = reward.icon || icons[rank] || '✦';
      const label = reward.label || ('Rank #'+rank);
      const extra = reward.extra || 'Season recognition';
      return '<article class="season-reward-chip '+cls+'"><span class="place"><span aria-hidden="true" class="reward-rank-icon">'+c.esc(icon)+'</span><span class="place-badge">#'+rank+'</span></span><span class="reward-copy"><strong>'+c.esc(label)+'</strong><span class="reward-boost"><b>+'+c.n(reward.bonus).toLocaleString()+'</b><i>next-season stars</i></span><small>'+c.esc(extra)+'</small></span></article>';
    }).join('');
    return html || '<article class="season-reward-chip"><span class="place">#</span><span class="reward-copy"><strong>No season rewards configured yet</strong></span></article>';
  }

  function seasonRewardsNote(){
    return 'Season rewards are editable in the Admin Panel. They give top seasonal contributors a small next-season kickoff bonus, while contributor stars still depend on lifetime contribution stars.';
  }

  window.ContributorSections = { criteriaPanel, seasonMeta, historyPanel, topPodium, rows, seasonRewardsPanel, seasonRewardsNote };
})();
