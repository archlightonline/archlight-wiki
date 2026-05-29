(function(){
  'use strict';
  window.ContributorsData = {
    settings: {
      seasonLength: 'One calendar month',
      resetRule: 'Season contribution stars reset on the 1st. Lifetime contribution stars, page credits, contributor stars, and staff recognition stay with the contributor.',
      rankingRule: 'Season contribution stars decide the current leaderboard. Lifetime contribution stars unlock contributor stars over time.',
      rewardRule: 'Top seasonal contributors receive a next-season kickoff wiki contribution-point bonus and Hall of Champions recognition. Lifetime star progress still depends on total approved work.',
      intro: 'Approved wiki work gives season contribution stars for the current month and lifetime contribution stars toward contributor stars. Small fixes, screenshots, route notes, page starts, and clear corrections all count after review.'
    },
    criteria: [
      { key: 'submit', label: 'Submit useful work', icon: '✦', text: 'Send fixes, missing values, screenshots, page starts, route notes, or clear suggestions through the Contribute page.' },
      { key: 'review', label: 'Admin review', icon: '✓', text: 'Wiki Admins review the submission before it affects the live wiki or the contributor record.' },
      { key: 'points', label: 'Earn stars', icon: '+', text: 'Approved work gives season contribution stars for the monthly board and lifetime contribution stars for the contributor path.' },
      { key: 'recognition', label: 'Show progress', icon: '★', text: 'Contributor stars appear on cards and activity entries so helpful players are easy to recognize across the wiki.' }
    ],
    staffRoles: [
      { id: 'wiki_admin', name: 'Wiki Admin', priority: 300, icon: '👑', color: '#ffd36a', range: 'Assigned by Wiki Admin', description: 'Assigned identity for the people trusted to control standards, approvals, role assignment, and leaderboard integrity.' },
      { id: 'wiki_editor', name: 'Wiki Editor', priority: 200, icon: '✒️', color: '#7ebcff', range: 'Assigned by Wiki Admin', description: 'Assigned identity for trusted wiki editors who help review, clean, and prepare player-facing wiki content.' }
    ],
    earnedRoles: [
      { id: 'helper', name: 'Helper', tier: 1, icon: '★', color: '#aab6c8', points: 0, description: 'First visible recognition for useful fixes, screenshots, small corrections, and clear notes.' },
      { id: 'page_scout', name: 'Page Scout', tier: 2, icon: '★', color: '#78e6c7', points: 250, description: 'Early contributor rank for players who help with requirements, routes, and practical notes.' },
      { id: 'route_keeper', name: 'Route Keeper', tier: 3, icon: '★', color: '#8bbdff', points: 750, description: 'Reliable contributor rank for consistent page fixes, route checks, and guide improvements.' },
      { id: 'wiki_curator', name: 'Wiki Curator', tier: 4, icon: '★', color: '#c99cff', points: 1500, description: 'Trusted contributor rank for players who improve deeper guides, tables, and system references.' },
      { id: 'realm_chronicler', name: 'Realm Chronicler', tier: 5, icon: '★', color: '#ffe08a', points: 2500, description: 'High contributor rank for players who shape important wiki areas and keep major pages useful.' },
      { id: 'elder_cartographer', name: 'Elder Cartographer', tier: 6, icon: '★', color: '#ffb36a', points: 5000, description: 'Legendary contributor rank for long-term work that defines major wiki sections.' }
    ],
    seasonRewards: [
      { rank: 1, icon: '🏆', label: 'Season Champion Boost', bonus: 250, extra: 'Starts next season with the largest contribution-point bonus and Hall of Champions spotlight' },
      { rank: 2, icon: '🥈', label: 'Runner-Up Boost', bonus: 150, extra: 'Starts next season with a strong contribution-point bonus and top contributor spotlight' },
      { rank: 3, icon: '🥉', label: 'Third Place Boost', bonus: 75, extra: 'Starts next season with a small contribution-point bonus and leaderboard recognition' }
    ],
    contributionPointRules: [
      { id: 'issue', label: 'Report a Page Issue', points: 2, description: 'Valid bug-style report for an existing wiki page, such as wrong value, broken link, outdated requirement, missing step, or confusing instruction. Duplicate reports, vague complaints, or already-known issues should not be rewarded again.' },
      { id: 'suggest', label: 'Suggest Page Improvement', points: 5, description: 'Useful suggestion for what a page should add or clarify, such as a missing note, route tip, requirement reminder, source detail, or better explanation. Award only if it helps staff improve the page.' },
      { id: 'edit', label: 'Submit a Page Fix or Update', points: 15, description: 'Ready-to-apply correction for an existing page, such as exact replacement text, corrected number, updated table entry, cleaner step order, or verified mechanic update.' },
      { id: 'new-page', label: 'Draft a Missing Page', points: 35, description: 'Useful starter draft for a missing page, with enough accurate structure and content for staff to review, polish, and publish. Large or exceptional work can be manually adjusted by staff.' }
    ],
    contributors: [
      {name:'Fluffydrakoz', avatar:'assets/media/contributors/fluffydrakoz.svg', emoji:'🦊', title:'Realm Chronicler', points:2840, edits:143, staffRoles:['Wiki Admin','Wiki Editor','Contributor'], earnedRole:'Realm Chronicler', specialtyRoles:[], pagesCreated:18, seasonPoints:146},
      {name:'Vapore', avatar:'assets/media/contributors/vapore.svg', emoji:'⚡', title:'Wiki Curator', points:1620, edits:87, staffRoles:['Wiki Editor','Contributor'], earnedRole:'Wiki Curator', specialtyRoles:[], pagesCreated:11, seasonPoints:122},
      {name:'Rodrak', avatar:'assets/media/contributors/rodrak.svg', emoji:'🗡️', title:'Route Keeper', points:1180, edits:64, staffRoles:['Contributor'], earnedRole:'Route Keeper', specialtyRoles:[], pagesCreated:8, seasonPoints:95},
      {name:'Stormhawk', avatar:'assets/media/contributors/stormhawk.svg', emoji:'🦅', title:'Route Keeper', points:890, edits:52, staffRoles:['Contributor'], earnedRole:'Route Keeper', specialtyRoles:[], pagesCreated:6, seasonPoints:72},
      {name:'Nightblade', avatar:'assets/media/contributors/nightblade.svg', emoji:'🌙', title:'Page Scout', points:640, edits:38, staffRoles:['Contributor'], earnedRole:'Page Scout', specialtyRoles:[], pagesCreated:4, seasonPoints:48},
      {name:'Crystalweave', avatar:'assets/media/contributors/crystalweave.svg', emoji:'💎', title:'Page Scout', points:510, edits:29, staffRoles:['Contributor'], earnedRole:'Page Scout', specialtyRoles:[], pagesCreated:3, seasonPoints:38},
      {name:'ShadowRun', avatar:'assets/media/contributors/shadowrun.svg', emoji:'👥', title:'Page Scout', points:320, edits:18, staffRoles:['Contributor'], earnedRole:'Page Scout', specialtyRoles:[], pagesCreated:2, seasonPoints:26},
      {name:'Ironveil', avatar:'assets/media/contributors/ironveil.svg', emoji:'🛡️', title:'Helper', points:210, edits:11, staffRoles:['Contributor'], earnedRole:'Helper', specialtyRoles:[], pagesCreated:1, seasonPoints:18}
    ],
    seasonArchive: [
      {season:'January 2026', winners:[{name:'Fluffydrakoz', rank:1},{name:'Vapore', rank:2},{name:'Rodrak', rank:3}]},
      {season:'February 2026', winners:[{name:'Vapore', rank:1},{name:'Fluffydrakoz', rank:2},{name:'Stormhawk', rank:3}]},
      {season:'March 2026', winners:[{name:'Fluffydrakoz', rank:1},{name:'Rodrak', rank:2},{name:'Crystalweave', rank:3}]}
    ]
  };
})();
