(function(){
  'use strict';
  const Data = window.ContributorsData || {};
  const STORAGE_KEY = 'archlight_contributors_admin_v1';

  function normalizeId(value){
    return String(value || '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/^_+|_+$/g, '');
  }

  function clone(value){
    try { return JSON.parse(JSON.stringify(value)); }
    catch (error) { return value; }
  }

  function readAdminState(){
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
      return parsed && typeof parsed === 'object' ? migrateAdminState(parsed) : {};
    } catch (error) {
      return {};
    }
  }

  function writeAdminState(state){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state || {})); }
    catch (error) {}
  }

  const ROLE_SCHEMA_VERSION = 'earned-stars-v12-force-wiki-editor-identity';
  const POINT_RULE_SCHEMA_VERSION = 'wiki-contribution-stars-v6-safe-scenarios';
  function migrateAdminState(state){
    if(!state || typeof state !== 'object') return {};
    if(state.roleSchemaVersion === ROLE_SCHEMA_VERSION) return state;
    const legacyToCurrent = {
      archive_warden:'Realm Chronicler',
      relic_scholar:'Realm Chronicler',
      dungeon_scholar:'Realm Chronicler',
      elder_sage:'Elder Cartographer',
      rune_guide:'Wiki Curator',
      pathfinder:'Route Keeper'
    };
    function scrubLegacyValues(value){
      if(Array.isArray(value)) return value.map(scrubLegacyValues);
      if(value && typeof value === 'object'){
        Object.keys(value).forEach(k => { value[k] = scrubLegacyValues(value[k]); });
        return value;
      }
      if(typeof value === 'string'){
        const mapped = legacyToCurrent[normalizeId(value)];
        return mapped || value;
      }
      return value;
    }
    state = scrubLegacyValues(state);
    if(state.contributors && typeof state.contributors === 'object'){
      Object.keys(state.contributors).forEach(key => {
        const item = state.contributors[key];
        if(!item || typeof item !== 'object') return;
        const earnedKey = normalizeId(item.earnedRole);
        const titleKey = normalizeId(item.title);
        if(legacyToCurrent[earnedKey]) item.earnedRole = legacyToCurrent[earnedKey];
        if(legacyToCurrent[titleKey]) item.title = legacyToCurrent[titleKey];
        if(Array.isArray(item.staffRoles)){
          item.staffRoles = item.staffRoles.map(function(role){
            var roleKey = normalizeId(role);
            if(roleKey === 'editor') return 'Wiki Editor';
            if(roleKey === 'admin') return 'Wiki Admin';
            return role;
          }).filter(Boolean);
          if(!item.staffRoles.length) item.staffRoles = ['Contributor'];
        }
      });
    }
    if(state.earnedRoleRequirements && typeof state.earnedRoleRequirements === 'object'){
      if(state.earnedRoleRequirements.archive_warden && !state.earnedRoleRequirements.realm_chronicler){
        state.earnedRoleRequirements.realm_chronicler = state.earnedRoleRequirements.archive_warden;
      }
      delete state.earnedRoleRequirements.archive_warden;
      delete state.earnedRoleRequirements.relic_scholar;
      delete state.earnedRoleRequirements.dungeon_scholar;
      delete state.earnedRoleRequirements.elder_sage;
      delete state.earnedRoleRequirements.rune_guide;
      delete state.earnedRoleRequirements.pathfinder;
    }
    if(state.pointRuleSchemaVersion !== POINT_RULE_SCHEMA_VERSION){
      delete state.pointRules;
      state.pointRuleSchemaVersion = POINT_RULE_SCHEMA_VERSION;
    }
    state.roleSchemaVersion = ROLE_SCHEMA_VERSION;
    writeAdminState(state);
    return state;
  }

  function baseContributorList(){
    return clone(Data.contributors || []);
  }

  function basePointRules(){
    return clone(Data.contributionPointRules || [
      { id: 'issue', label: 'Report a Page Issue', points: 2, description: 'Valid bug-style report for an existing wiki page, such as wrong value, broken link, outdated requirement, missing step, or confusing instruction. Duplicate reports, vague complaints, or already-known issues should not be rewarded again.' },
      { id: 'suggest', label: 'Suggest Page Improvement', points: 5, description: 'Useful suggestion for what a page should add or clarify, such as a missing note, route tip, requirement reminder, source detail, or better explanation. Award only if it helps staff improve the page.' },
      { id: 'edit', label: 'Submit a Page Fix or Update', points: 15, description: 'Ready-to-apply correction for an existing page, such as exact replacement text, corrected number, updated table entry, cleaner step order, or verified mechanic update.' },
      { id: 'new-page', label: 'Draft a Missing Page', points: 35, description: 'Useful starter draft for a missing page, with enough accurate structure and content for staff to review, polish, and publish. Large or exceptional work can be manually adjusted by staff.' }
    ]);
  }

  function baseSeasonRewards(){
    return clone(Data.seasonRewards || [
      { rank: 1, icon: '🏆', label: 'Champion', bonus: 250, extra: 'Hall of Champions' },
      { rank: 2, icon: '🥈', label: 'Runner-up', bonus: 150, extra: 'Featured placement' },
      { rank: 3, icon: '🥉', label: 'Third place', bonus: 75, extra: 'Featured placement' }
    ]);
  }


  const LEGACY_EARNED_ROLE_NAMES = {
    scout: 'Page Scout',
    pathfinder: 'Route Keeper',
    rune_guide: 'Wiki Curator',
    rune_keeper: 'Wiki Curator',
    relic_scholar: 'Realm Chronicler',
    dungeon_scholar: 'Realm Chronicler',
    elder_sage: 'Elder Cartographer',
    archivist: 'Wiki Curator',
    lorekeeper: 'Wiki Curator',
    guide: 'Wiki Curator',
    page_keeper: 'Route Keeper',
    chronicler: 'Realm Chronicler',
    atlas_warden: 'Realm Chronicler',
    cartographer: 'Realm Chronicler',
    guide_cartographer: 'Realm Chronicler',
    master_cartographer: 'Elder Cartographer',
    elder_cartographer: 'Elder Cartographer'
    ,archive_warden: 'Realm Chronicler'
  };

  function cleanEarnedRoleName(value){
    const raw = String(value || '').trim();
    const key = normalizeId(raw);
    return LEGACY_EARNED_ROLE_NAMES[key] || raw;
  }

  function isLegacyEarnedTitle(value){
    return Object.prototype.hasOwnProperty.call(LEGACY_EARNED_ROLE_NAMES, normalizeId(value));
  }

  function contributorKey(name){
    return normalizeId(name);
  }

  function applyContributorOverrides(contributor){
    const state = readAdminState();
    const overrides = state.contributors || {};
    const baseKey = contributorKey(contributor.name);
    const override = overrides[baseKey] || overrides[String(contributor.name || '')];
    const merged = override ? Object.assign({}, contributor, override) : Object.assign({}, contributor);
    // Keep canonical identity roles from data even when older browser/admin storage had removed them.
    const baseRoles = Array.isArray(contributor.staffRoles) ? contributor.staffRoles : [];
    const mergedRoles = Array.isArray(merged.staffRoles) ? merged.staffRoles : [];
    const restoredRoles = [];
    ['Wiki Admin','Wiki Editor'].forEach(function(roleName){
      const hasBase = baseRoles.some(function(role){ return normalizeId(role) === normalizeId(roleName); });
      const hasMerged = mergedRoles.some(function(role){ return normalizeId(role) === normalizeId(roleName); });
      if(hasBase && !hasMerged) restoredRoles.push(roleName);
    });
    if(restoredRoles.length){
      const standard = mergedRoles.filter(function(role){ return normalizeId(role) === 'contributor'; });
      const rest = mergedRoles.filter(function(role){ return normalizeId(role) !== 'contributor'; });
      merged.staffRoles = rest.concat(restoredRoles, standard.length ? standard : ['Contributor']);
    }
    merged.earnedRole = cleanEarnedRoleName(merged.earnedRole || contributor.earnedRole || 'Helper');
    if(isLegacyEarnedTitle(merged.title)){ merged.title = merged.earnedRole; }
    merged._baseName = contributor.name;
    merged._baseKey = baseKey;
    return merged;
  }

  function mergedPointRules(){
    const state = readAdminState();
    const saved = state.pointRules || {};
    return basePointRules().map(rule => {
      const override = saved[rule.id] || {};
      const points = Number(override.points ?? rule.points ?? 0);
      return Object.assign({}, rule, override, { points: Number.isFinite(points) ? Math.max(0, Math.round(points)) : Number(rule.points || 0) });
    });
  }

  function mergedSeasonRewards(){
    const state = readAdminState();
    const saved = state.seasonRewards || {};
    return baseSeasonRewards().map(reward => {
      const key = String(reward.rank || '');
      const override = saved[key] || {};
      const bonus = Number(override.bonus ?? reward.bonus ?? 0);
      return Object.assign({}, reward, override, {
        bonus: Number.isFinite(bonus) ? Math.max(0, Math.round(bonus)) : Number(reward.bonus || 0),
        rank: Number(reward.rank || 0)
      });
    }).sort((a,b)=>Number(a.rank||0)-Number(b.rank||0));
  }

  const core = {
    esc(s){return String(s ?? '').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));},
    n(v){return Number(v||0);},
    slug(value){return normalizeId(value);},
    contributors(){return baseContributorList().map(applyContributorOverrides).filter(c=>!this.staffRoleLabels(c).some(label=>this.slug(label)==='wiki_editor') || this.staffRoleLabels(c).some(label=>this.slug(label)==='wiki_admin'));},
    archive(){return (Data.seasonArchive||[]).slice();},
    criteria(){return (Data.criteria||[]).slice();},
    staffRoles(){return (Data.staffRoles||[]).slice();},
    earnedRoles(){
      const state = readAdminState();
      const saved = state.earnedRoleRequirements || {};
      return (Data.earnedRoles || []).map(role => {
        const override = saved[role.id] || saved[normalizeId(role.name)] || {};
        const points = Number(override.points ?? role.points ?? 0);
        const mergedRole = Object.assign({}, role, override, { points: Number.isFinite(points) ? Math.max(0, Math.round(points)) : Number(role.points || 0) });
        mergedRole.name = cleanEarnedRoleName(mergedRole.name || role.name);
        mergedRole.id = role.id;
        return mergedRole;
      }).sort((a,b)=>this.n(a.points)-this.n(b.points));
    },
    contributionPointRules(){return mergedPointRules();},
    pointRule(id){return this.contributionPointRules().find(rule => rule.id === id) || null;},
    settings(){return Data.settings || {};},
    seasonPts(c){return this.n(c.seasonPoints)||Math.round(this.n(c.points)*0.28);},
    totalPts(c){return this.n(c.points);},
    editsOf(c){return this.n(c.edits);},
    pagesOf(c){return this.n(c.pagesCreated);},
    sorted(){return this.contributors().sort((a,b)=>{const sp=this.seasonPts(b)-this.seasonPts(a); if(sp) return sp; return this.totalPts(b)-this.totalPts(a);});},
    seasonRewards(){return mergedSeasonRewards();},
    rewardForRank(rank){const reward=this.seasonRewards().find(item=>this.n(item.rank)===this.n(rank)); return reward ? '<span class="focus-reward-num">+'+this.n(reward.bonus).toLocaleString()+'</span><span class="focus-reward-copy">next-season stars</span>' : '<span class="focus-reward-copy">Recognition</span>';},
    roleAlias(name){
      const key=this.slug(name);
      const aliases={
        scribe:'helper', initiate_scribe:'helper', wiki_helper:'helper', helper:'helper',
        scout:'scout', pathfinder:'pathfinder',
        guide:'rune_guide', rune_guide:'rune_guide', archivist:'rune_guide', page_keeper:'rune_guide', lorekeeper:'rune_guide',
        chronicler:'realm_chronicler', atlas_warden:'realm_chronicler', cartographer:'realm_chronicler', guide_cartographer:'realm_chronicler', relic_scholar:'realm_chronicler', archive_warden:'realm_chronicler', realm_chronicler:'realm_chronicler',
        master_cartographer:'elder_sage', elder_cartographer:'elder_sage', elder_sage:'elder_sage'
      };
      return aliases[key] || key;
    },
    findRole(source, name){
      const wanted=String(name || '').toLowerCase();
      const wantedSlug=this.slug(name);
      const alias=this.roleAlias(name);
      return source.find(role=>String(role.name || '').toLowerCase()===wanted || String(role.id || '').toLowerCase()===wanted || this.slug(role.name)===wantedSlug || this.slug(role.id)===wantedSlug || this.slug(role.id)===alias || this.roleAlias(role.name)===alias) || null;
    },
    normalizeStaffRoleLabel(label){
      const key=this.slug(label);
      if(!key) return '';
      if(key === 'staff' || key === 'team' || key === 'wiki_staff') return '';
      if(key === 'admin') return 'Wiki Admin';
      if(key === 'editor' || key === 'wiki_editor') return 'Wiki Editor';
      if(key === 'contributor' || key === 'contributor_staff') return 'Contributor';
      return label;
    },
    staffRoleLabels(c){
      const raw=Array.isArray(c.staffRoles) ? c.staffRoles : (Array.isArray(c.roles) ? c.roles : [c.staffRole || c.role || 'Contributor']);
      const seen=new Set();
      const labels=[];
      raw.forEach(label=>{
        const clean=this.normalizeStaffRoleLabel(label);
        if(!clean) return;
        const role=this.findRole(this.staffRoles(), clean) || this.findRole(this.staffRoles(), this.slug(clean));
        const key=this.slug((role && (role.id || role.name)) || clean);
        if(seen.has(key)) return;
        seen.add(key);
        labels.push(role ? role.name : clean);
      });
      return labels;
    },
    identityRoleLabels(c){
      return this.staffRoleLabels(c).filter(label => {
        const key=this.slug(label);
        return key === 'wiki_admin' || key === 'wiki_editor';
      });
    },
    standardRoleObject(){
      return {id:'contributor', name:'Contributor', displayName:'Contributor', priority:0, icon:'📜', color:'#65eadc', description:'Standard wiki account role for players who can contribute.'};
    },
    staffRoleObjects(c){
      return this.identityRoleLabels(c).map(label=>{
        const role=this.findRole(this.staffRoles(), label) || this.findRole(this.staffRoles(), this.slug(label));
        return role ? Object.assign({}, role, {displayName:role.name}) : {id:this.slug(label), name:label, displayName:label, priority:0, color:'#65eadc'};
      });
    },
    primaryStaffRole(c){
      const roles=this.staffRoleObjects(c);
      return roles.sort((a,b)=>this.n(b.priority)-this.n(a.priority))[0] || null;
    },
    roleColor(role, fallback){
      const color=(role && role.color) || fallback || '#d8c47a';
      return /^#[0-9a-fA-F]{3,8}$/.test(color) ? color : (fallback || '#d8c47a');
    },
    roleIcon(roleData, type){
      if(roleData && roleData.icon) return roleData.icon;
      const id=this.slug((roleData && (roleData.id || roleData.name)) || '');
      const map={
        wiki_admin:'👑', admin:'👑', wiki_editor:'✒️', editor:'✒️', contributor:'📜', contributor_staff:'📜',
        helper:'✦', wiki_helper:'✦', scribe:'✦', initiate_scribe:'✦', scout:'✦', pathfinder:'✦', keeper:'✦', page_keeper:'✦', archivist:'✦', lorekeeper:'✦', relic_scholar:'✦', archive_warden:'✦', realm_chronicler:'✦', chronicler:'✦', cartographer:'✦', guide_cartographer:'✦', atlas_warden:'✦', master_cartographer:'✦', elder_cartographer:'✦', elder_sage:'✦'
      };
      if(map[id]) return map[id];
      return type === 'earned' ? '✦' : (type === 'staff' ? '◆' : '◇');
    },
    nameStyle(c){
      const role=this.primaryStaffRole(c);
      const earned=this.earnedRoleObject(c) || {};
      const staffId=this.slug((role && (role.id || role.name)) || 'contributor');
      const tier=Math.max(1, Math.min(6, this.n(earned.tier) || 1));
      return ' data-staff-role="'+this.esc(staffId)+'" data-earned-tier="'+this.esc(tier)+'" style="--staff-name-color:'+this.roleColor(role, '#65eadc')+';--earned-tier:'+tier+'"';
    },
    earnedRoleForPoints(points){
      const roles=this.earnedRoles().sort((a,b)=>this.n(a.points)-this.n(b.points));
      let current=roles[0] || null;
      roles.forEach(role=>{ if(this.n(points) >= this.n(role.points)) current=role; });
      return current;
    },
    avatar(c, cls){
      let src = c && c.avatar ? String(c.avatar) : '';
      const name = c && c.name ? String(c.name) : 'Contributor';
      const fallback = c && c.emoji ? String(c.emoji) : '👤';
      const staff = this.primaryStaffRole(c || {});
      const staffId = this.slug((staff && (staff.id || staff.name)) || 'contributor');
      const earned = this.earnedRoleObject(c || {}) || {};
      const tier = Math.max(1, Math.min(6, this.n(earned.tier) || 1));
      const color = this.roleColor(staff, this.roleColor(earned, '#65eadc'));
      const classes = [String(cls || 'contrib-avatar'), 'staff-avatar', 'staff-avatar--' + staffId, 'avatar-tier-' + tier];
      try {
        if(this.slug(name) === 'fluffydrakoz'){
          const saved = localStorage.getItem('archlight_profile_photo_fluffydrakoz') || localStorage.getItem('archlight_profile_photo');
          if(saved) src = saved;
        }
      } catch(error) {}
      const style = ' style="--staff-name-color:'+color+';--avatar-role-color:'+color+';--avatar-tier:'+tier+';--earned-role-color:'+this.roleColor(earned, '#65eadc')+'" data-avatar-tier="'+tier+'"';
      if(src){ classes.push('has-profile'); return '<div class="'+this.esc(classes.join(' '))+'"'+style+'><img src="'+this.esc(src)+'" alt="" loading="lazy" onerror="this.classList.add(\'is-broken\')"/><span class="staff-avatar__fallback" aria-label="'+this.esc(name)+' profile fallback">'+this.esc(fallback)+'</span></div>'; }
      return '<div class="'+this.esc(classes.join(' '))+'"'+style+'><span class="staff-avatar__fallback" style="display:grid">'+this.esc(fallback)+'</span></div>';
    },
    earnedRoleObject(c){
      const label = c.earnedRole || (this.earnedRoleForPoints(this.totalPts(c)) || {}).name || 'Helper';
      return this.findRole(this.earnedRoles(), label) || this.earnedRoleForPoints(this.totalPts(c)) || {id:'helper', name:label, tier:1, color:'#aab6c8', points:0};
    },
    nextEarnedRole(c){
      const total=this.totalPts(c);
      return this.earnedRoles().sort((a,b)=>this.n(a.points)-this.n(b.points)).find(role=>this.n(role.points)>total) || null;
    },
    roleChip(label, type, roleData){
      const id=this.slug((roleData && roleData.id) || label);
      const tier = Math.max(1, Math.min(6, this.n(roleData && roleData.tier) || 1));
      const safeColor=this.roleColor(roleData, '#d8c47a');
      const icon=this.roleIcon(roleData, type);
      const tierClass = type === 'earned' ? ' role-tier-'+tier : '';
      const title = type === 'earned' ? 'Contributor star rank, '+tier+' of 6 stars' : (type === 'staff' ? 'Assigned wiki identity role' : (type === 'standard' ? 'Standard wiki account role' : 'Specialty recognition'));
      const help = type === 'earned' ? 'Earned through lifetime contribution stars. Tier '+tier+' of 6.' : (type === 'staff' ? 'Assigned identity role, used to show wiki team responsibility.' : (type === 'standard' ? 'Standard role for contributors with a wiki account.' : 'Special recognition role.')); 
      if(type === 'earned'){
        const stars = Array.from({length:6},(_,i)=>'<i class="'+(i < tier ? 'is-on' : '')+'" aria-hidden="true">★</i>').join('');
        return '<span class="rank-stars-badge rank-stars-badge--tier-'+tier+' rank-'+this.esc(id)+'" tabindex="0" data-stars="'+tier+'" data-role-help="'+this.esc(help)+'" style="--role-color:'+safeColor+'" title="'+this.esc(title)+'"><span class="rank-stars-badge__label">'+this.esc(label)+'</span><span class="rank-stars-badge__stars" aria-label="'+this.esc(label)+' rank, '+tier+' stars">'+stars+'</span></span>';
      }
      return '<span class="role-chip role-chip--'+this.esc(type)+' role-'+this.esc(id)+'" tabindex="0" data-role-help="'+this.esc(help)+'" style="--role-color:'+safeColor+'" title="'+this.esc(title)+'"><span class="role-chip__frame" aria-hidden="true"><span class="role-chip__icon">'+this.esc(icon)+'</span></span><span class="role-chip__label">'+this.esc(label)+'</span></span>';
    },
    statValue(value, hint, extraClass){
      const cls = String(extraClass || '');
      const scoreAttr = cls.indexOf('score-hint') !== -1 ? ' data-score="'+this.esc(value)+'"' : '';
      return '<span class="contrib-hint-value '+this.esc(cls)+'" tabindex="0" title="'+this.esc(hint || '')+'" data-hint="'+this.esc(hint || '')+'"'+scoreAttr+'>'+this.esc(value)+'</span>';
    },
    primaryRoleChip(c){
      const role=this.primaryStaffRole(c);
      return role ? this.roleChip(role.displayName || role.name, 'staff', role) : '';
    },
    nameWithPrimaryRole(c, nameClass){
      const role=this.primaryStaffRole(c);
      const name=this.esc((c && c.name) || 'Contributor');
      const cls=nameClass ? ' '+this.esc(nameClass) : '';
      return '<div class="contributor-name-role'+cls+'"><span class="contributor-name-text contributor-staff-name"'+this.nameStyle(c)+'>'+name+'</span>'+this.primaryRoleChip(c)+'</div>';
    },
    roles(c, options){
      options=options || {};
      const primary=this.primaryStaffRole(c);
      const primaryKey=this.slug((primary && (primary.id || primary.name)) || '');
      const identity=this.staffRoleObjects(c).sort((a,b)=>this.n(b.priority)-this.n(a.priority)).filter(role=>{
        return !options.excludePrimaryStaff || this.slug(role.id || role.name) !== primaryKey;
      }).map(role=>this.roleChip(role.displayName || role.name, 'staff', role)).join('');
      const standard=this.roleChip('Contributor', 'standard', this.standardRoleObject());
      const earnedRole=this.earnedRoleObject(c);
      const earned=this.roleChip(earnedRole.name, 'earned', earnedRole);
      const identityGroup=identity ? '<span class="role-group role-group--staff">'+identity+'</span><span class="role-group--divider" aria-hidden="true"></span>' : '';
      return identityGroup+'<span class="role-group role-group--standard">'+standard+'</span><span class="role-group--divider" aria-hidden="true"></span><span class="role-group role-group--earned">'+earned+'</span>';
    },
    secondaryRoles(c){
      return this.roles(c, {excludePrimaryStaff:false});
    },
    seasonAwards(name){return this.archive().flatMap(season=>(season.winners||[]).filter(w=>String(w.name).toLowerCase()===String(name).toLowerCase()).map(w=>({season:season.season, rank:w.rank})));},
    placementClass(rank){const r=Number(rank||0); return r===1?'top1':r===2?'top2':r===3?'top3':'';},
    placementIcon(rank){const r=Number(rank||0); if(r===1) return '🏆'; if(r===2) return '🥈'; if(r===3) return '🥉'; return '✦';},
    placementLabel(rank){const r=Number(rank||0); if(r===1) return 'Champion'; if(r===2) return 'Runner-up'; if(r===3) return 'Third place'; return 'Placed';},
    placementChip(award, extraClass){
      const r=Number((award && award.rank) || 0);
      const cls=this.placementClass(r);
      const hint=this.placementLabel(r)+' in '+(award && award.season ? award.season : 'a previous season');
      return '<span class="placing-chip '+this.esc(cls)+' '+this.esc(extraClass || '')+'" tabindex="0" title="'+this.esc(hint)+'" data-hint="'+this.esc(hint)+'"><span class="placing-medal" aria-hidden="true">'+this.esc(this.placementIcon(r))+'</span><span class="placing-copy"><b>'+this.esc((award && award.season) || 'Past season')+'</b><em>#'+this.esc(r || '?')+'</em></span></span>';
    },
    historyChips(name){const awards=this.seasonAwards(name).slice(0,3); const chips=awards.map(a=>this.placementChip(a,'focus-past')); while(chips.length<3){chips.push('<span class="placing-chip empty focus-past is-filler" tabindex="0" data-hint="No archived placing is recorded for this season slot yet."><span class="placing-medal" aria-hidden="true">◇</span><span class="placing-copy"><b>Open record</b><em>Season slot</em></span></span>');} return chips.join('');},
    metaSummary(c){return ['<span class="focus-chip" tabindex="0" data-hint="Accepted wiki edits after review.">'+this.editsOf(c)+' approved edits</span>','<span class="focus-chip" tabindex="0" data-hint="Accepted new pages or missing guides started by this contributor.">'+this.pagesOf(c)+' pages started</span>','<span class="focus-chip" tabindex="0" data-hint="Lifetime stars are permanent contribution progress.">'+this.totalPts(c).toLocaleString()+' lifetime stars</span>'].join('');},
    progressLabel(c){
      const next=this.nextEarnedRole(c);
      if(!next) return 'Highest contribution path rank unlocked';
      return (this.n(next.points)-this.totalPts(c)).toLocaleString()+' stars until '+this.esc(next.name);
    },
    adminState(){ return clone(readAdminState()); },
    saveContributorRoles(name, data){
      const key = contributorKey((data && data.baseName) || name);
      const state = readAdminState();
      state.contributors = state.contributors || {};
      const next = Object.assign({}, state.contributors[key] || {}, {
        staffRoles: Array.isArray(data.staffRoles) && data.staffRoles.length ? data.staffRoles : ['Contributor'],
        earnedRole: data.earnedRole || ''
      });
      if(data && data.displayName) next.name = String(data.displayName).trim();
      state.contributors[key] = next;
      writeAdminState(state);
      return this.contributors();
    },
    generateRandomContributorValues(){
      const namePool = ['Aetherfox','Runehart','Ashen Quill','Duskbinder','Emberlane','Iron Scribe','Moonrift','Oakshield','Relicborn','Stormscript','Valefox','Wyrmnote'];
      const emojiPool = ['🦊','⚔️','📜','💠','🔥','🛡️','🌙','🧭','🔮','⚡','🦉','🏹'];
      const state = readAdminState();
      state.contributors = state.contributors || {};
      baseContributorList().forEach((base, index) => {
        const seed = Math.floor(Math.random() * 999);
        const points = Math.floor(120 + Math.random() * 3200);
        const seasonPoints = Math.floor(35 + Math.random() * 820);
        const edits = Math.floor(4 + Math.random() * 150);
        const pagesCreated = Math.floor(Math.random() * 22);
        const earned = this.earnedRoleForPoints(points) || this.earnedRoles()[0];
        const keepAdmin = String(base.name).toLowerCase() === 'fluffydrakoz';
        const pickedName = keepAdmin ? 'Fluffydrakoz' : namePool[(index + seed) % namePool.length] + ' ' + String(seed).padStart(3,'0');
        state.contributors[contributorKey(base.name)] = Object.assign({}, state.contributors[contributorKey(base.name)] || {}, {
          name: pickedName,
          emoji: keepAdmin ? (base.emoji || '🦊') : emojiPool[(index + seed) % emojiPool.length],
          points,
          seasonPoints,
          edits,
          pagesCreated,
          earnedRole: earned ? earned.name : base.earnedRole,
          staffRoles: keepAdmin ? ['Wiki Admin','Wiki Editor','Contributor'] : ['Contributor']
        });
      });
      writeAdminState(state);
      return this.contributors();
    },
    savePointRules(rules){
      const state = readAdminState();
      state.pointRules = state.pointRules || {};
      (rules || []).forEach(rule => {
        if(!rule || !rule.id) return;
        const points = Math.max(0, Math.round(Number(rule.points || 0)));
        state.pointRules[rule.id] = Object.assign({}, state.pointRules[rule.id] || {}, { points });
      });
      state.pointRuleSchemaVersion = POINT_RULE_SCHEMA_VERSION;
      writeAdminState(state);
      return this.contributionPointRules();
    },
    saveEarnedRoleRequirements(roles){
      const state = readAdminState();
      state.earnedRoleRequirements = state.earnedRoleRequirements || {};
      (roles || []).forEach(role => {
        if(!role || !role.id) return;
        const points = Math.max(0, Math.round(Number(role.points || 0)));
        state.earnedRoleRequirements[role.id] = Object.assign({}, state.earnedRoleRequirements[role.id] || {}, { points });
      });
      writeAdminState(state);
      return this.earnedRoles();
    },
    saveSeasonRewards(rewards){
      const state = readAdminState();
      state.seasonRewards = state.seasonRewards || {};
      (rewards || []).forEach(reward => {
        const rank = Math.max(1, Math.round(Number(reward.rank || 0)));
        if(!rank) return;
        const bonus = Math.max(0, Math.round(Number(reward.bonus || 0)));
        state.seasonRewards[String(rank)] = Object.assign({}, state.seasonRewards[String(rank)] || {}, { bonus });
      });
      writeAdminState(state);
      return this.seasonRewards();
    },
    resetAdminOverrides(){
      writeAdminState({});
      return true;
    },
    rerender(){
      window.Contributors?.render?.();
      window.renderContributePage?.();
    }
  };
  window.ContributorsCore = core;
  window.ArchlightContributorsAdmin = core;
})();
