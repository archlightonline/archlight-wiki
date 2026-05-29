(function(){
  const STORAGE_KEY = 'archlight_clean_contribution_submissions_v3';

  const contributionPaths = [
    {
      id: 'issue',
      icon: '!',
      title: 'Report a Page Issue',
      description: 'Tell us what is wrong on an existing page: wrong value, missing requirement, broken link, unclear step, outdated note, or missing screenshot reference.',
      time: '30 sec',
      reward: '+2 contribution stars',
      tone: 'red',
      action: 'Report issue'
    },
    {
      id: 'suggest',
      icon: '?',
      title: 'Suggest Page Improvement',
      description: 'Send a useful idea for a page: a missing note, route tip, source location, example, clarification, or a better way to explain something.',
      time: '2 min',
      reward: '+5 contribution stars',
      tone: 'gold',
      action: 'Suggest content'
    },
    {
      id: 'edit',
      icon: '✎',
      title: 'Submit a Page Fix or Update',
      description: 'Give the actual fix for an existing page: replacement text, corrected number, updated list/table entry, or clear step-by-step correction.',
      time: '5–15 min',
      reward: '+15 contribution stars',
      tone: 'blue',
      action: 'Submit fix'
    },
    {
      id: 'new-page',
      icon: '+',
      title: 'Draft a Missing Page',
      description: 'Create a useful starter draft for a missing quest, system, class, dungeon, profession, item, addon, or progression guide.',
      time: '15–30 min',
      reward: '+35 contribution stars',
      tone: 'teal',
      action: 'Draft page'
    }
  ];

  const workflowSteps = [
    { number: '01', title: 'Choose the right action', text: 'Use Report for problems, Suggest for ideas or missing info, Submit a Fix when you already know the correction, and Draft a Missing Page for missing topics.' },
    { number: '02', title: 'Include the page and proof', text: 'Write the page name, the exact issue or addition, and any value, location, NPC, item, route step, or source that helps staff verify it.' },
    { number: '03', title: 'Staff reviews it', text: 'Wiki Admins check the submission before it changes the live wiki or awards contribution stars.' },
    { number: '04', title: 'Earn wiki recognition', text: 'Approved work adds monthly season contribution stars and lifetime contribution stars toward contributor stars.' }
  ];

  const guidance = [
    { icon: '✓', title: 'Good submissions', text: 'Exact numbers, quest order, screenshots, item names, NPC names, requirements, and clear corrections.' },
    { icon: '✦', title: 'Keep it simple', text: 'You do not need perfect formatting. The important part is accurate information that helps players.' },
    { icon: '⚑', title: 'Avoid duplicates', text: 'Check whether the page already exists. If it does, suggest an edit instead of creating a duplicate page.' }
  ];

  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));

  function contributionPointRules(){
    const fallback = {
      issue: 2,
      suggest: 5,
      edit: 15,
      'new-page': 35
    };
    const rules = window.ContributorsCore?.contributionPointRules?.() || window.ContributorsData?.contributionPointRules || [];
    const map = Object.assign({}, fallback);
    rules.forEach(rule => {
      if (!rule || !rule.id) return;
      const points = Number(rule.points || 0);
      map[rule.id] = Number.isFinite(points) ? Math.max(0, Math.round(points)) : (fallback[rule.id] || 0);
    });
    return map;
  }

  function pathReward(path){
    const points = contributionPointRules()[path.id];
    return '+' + Number(points ?? 0).toLocaleString() + ' contribution stars';
  }


  function pointRuleForPath(path){
    const rules = window.ContributorsCore?.contributionPointRules?.() || window.ContributorsData?.contributionPointRules || [];
    return rules.find(rule => rule && rule.id === path.id) || null;
  }

  function pathTimeHint(path){
    return 'Estimated time for this contribution type. It is only a guide, staff still reviews quality and usefulness.';
  }

  function pathRewardHint(path){
    const rule = pointRuleForPath(path);
    return rule?.description || 'Wiki contribution stars awarded after staff approves this contribution type.';
  }


  function readSubmissions(){
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); }
    catch (error) { return []; }
  }

  function writeSubmissions(items){
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); }
    catch (error) {}
  }


  function recognitionOverview(){
    const core = window.ContributorsCore;
    const data = window.ContributorsData || {};
    const settings = core?.settings?.() || data.settings || {};
    const rules = core?.contributionPointRules?.() || data.contributionPointRules || [];
    const labels = {
      issue: 'Report issue',
      suggest: 'Suggest improvement',
      edit: 'Submit fix/update',
      'new-page': 'Draft missing page'
    };
    return `
      <section class="con-live-section con-live-system" aria-labelledby="con-live-system-title">
        <div class="con-live-system-main">
          <div class="con-live-section-label con-live-section-label--gold"><span></span>Contribution stars</div>
          <h2 id="con-live-system-title">Useful wiki submissions earn season contribution stars and long-term contributor star progress.</h2>
          <p>${esc(settings.intro || 'Approved work gives season contribution stars, lifetime contribution progress, and long-term contributor recognition.')}</p>
          <div class="con-live-system-facts">
            <div><b>Season contribution stars</b><span>Monthly wiki leaderboard stars. These are not in-game Archlight Coins.</span></div>
            <div><b>Lifetime contribution stars</b><span>Permanent wiki progress that unlocks stronger contributor star ranks.</span></div>
          </div>
        </div>
        <div class="con-live-submit-note-card con-live-submit-note-card--wide">
          <h3>What should you send?</h3>
          <p>You can report a page issue, suggest missing content, submit a ready page fix, or draft a missing page. Bigger work earns more contribution stars only after staff confirms it is useful, accurate, and not a duplicate.</p>
        </div>
      </section>
    `;
  }


  function roleOverview(){
    const core = window.ContributorsCore;
    const data = window.ContributorsData || {};
    const earnedRoles = core?.earnedRoles?.() || (Array.isArray(data.earnedRoles) ? data.earnedRoles : []);
    const escRole = value => esc(value);
    if (!earnedRoles.length) return '';
    const earned = earnedRoles.map(role => {
      const tier = Math.max(1, Math.min(6, Number(role.tier || 1)));
      const sockets = Array.from({length: 6}, (_, index) => `<i class="${index < tier ? 'is-on' : ''}" aria-hidden="true">★</i>`).join('');
      return `
      <article class="con-live-role-card con-live-role-card--earned con-live-role-card--tier-${tier}" style="--role-color:${escRole(role.color || '#d8c47a')};--role-tier:${tier}">
        <div class="con-live-role-card__head">
          <span class="con-live-role-card__icon" aria-hidden="true">${escRole(role.icon || '★')}</span>
          <div>
            <span class="con-live-role-card__type">Contributor stars · Tier ${tier}</span>
            <h3>${escRole(role.name)}</h3>
          </div>
        </div>
        <strong>${Number(role.points || 0).toLocaleString()} lifetime stars</strong>
        <p>${escRole(role.description)}</p>
        <span class="rank-stars-badge rank-stars-badge--tier-${tier} con-live-role-stars" data-stars="${tier}" style="--role-color:${escRole(role.color || '#d8c47a')};--role-tier:${tier}" aria-label="${tier} contributor stars">
          <span class="rank-stars-badge__label">Tier ${tier}</span>
          <span class="rank-stars-badge__stars">${sockets}</span>
        </span>
      </article>
    `;
    }).join('');
    return `
      <section class="con-live-section con-live-section--roles" aria-labelledby="con-live-roles-title">
        <div class="con-live-section-head">
          <div class="con-live-section-label con-live-section-label--gold"><span></span>Earned wiki ranks</div>
          <h2 id="con-live-roles-title">Contributor stars show long-term wiki progress after useful work is approved.</h2>
          <p>Each tier is based on lifetime contribution stars, so small fixes still move your account toward stronger recognition over time.</p>
        </div>
        <div class="con-live-role-grid con-live-role-grid--earned-only">${earned}</div>
      </section>
    `;
  }


  function pathCards(){
    return contributionPaths.map(path => `
      <button class="con-live-card con-live-card--${path.tone}" type="button" data-contribution-type="${path.id}">
        <span class="con-live-card__icon" aria-hidden="true">${path.icon}</span>
        <span class="con-live-card__title">${esc(path.title)}</span>
        <span class="con-live-card__text">${esc(path.description)}</span>
        <span class="con-live-card__meta">
          <span class="con-live-value-hint" data-hint="${esc(pathTimeHint(path))}" title="${esc(pathTimeHint(path))}">${esc(path.time)}</span>
          <strong class="con-live-value-hint con-live-value-hint--reward" data-hint="${esc(pathRewardHint(path))}" title="${esc(pathRewardHint(path))}">${esc(pathReward(path))}</strong>
        </span>
        <span class="con-live-card__action">${esc(path.action)} <b>→</b></span>
      </button>
    `).join('');
  }

  function workflowCards(){
    return workflowSteps.map(step => `
      <article class="con-live-step">
        <span class="con-live-step__number">${esc(step.number)}</span>
        <h3>${esc(step.title)}</h3>
        <p>${esc(step.text)}</p>
      </article>
    `).join('');
  }

  function guidanceCards(){
    return guidance.map(item => `
      <article class="con-live-guide-card">
        <span aria-hidden="true">${esc(item.icon)}</span>
        <div>
          <h3>${esc(item.title)}</h3>
          <p>${esc(item.text)}</p>
        </div>
      </article>
    `).join('');
  }

  function render(){
    const host = document.getElementById('pg-contribute');
    if (!host) return;

    host.innerHTML = `
      <div class="con-live-page">
        <section class="con-live-hero" aria-labelledby="con-live-title">
          <div class="con-live-crest">✦ Archlight Online Wiki</div>
          <h1 id="con-live-title">Contribute to the<br><span>Community Wiki</span></h1>
          <p>
            Help keep Archlight information accurate by sending corrections, missing details, screenshots, routes, or new page drafts. Accepted work earns season contribution stars and lifetime contribution progress.
          </p>
          <div class="con-live-pills" aria-label="Contribution rules">
            <span class="con-live-pill con-live-pill--teal">All edits reviewed before publish</span>
            <span class="con-live-pill con-live-pill--gold">Earn wiki contribution stars</span>
            <span class="con-live-pill con-live-pill--blue">Simple fixes welcome</span>
            <span class="con-live-pill con-live-pill--red">Report broken info instantly</span>
          </div>
        </section>

        <section class="con-live-section con-live-section--paths" aria-labelledby="con-live-paths-title">
          <div class="con-live-section-head con-live-section-head--center">
            <div class="con-live-section-label"><span></span>Choose how you want to help</div>
            <h2 id="con-live-paths-title">Choose the type of wiki help you want to send.</h2>
            <p>Reports are best for quick corrections. Edits and new pages are better when you already have clear details to add.</p>
          </div>
          <div class="con-live-card-grid">
            ${pathCards()}
          </div>
        </section>

        <section id="contrib-sec" class="con-live-section con-live-leaderboard" aria-labelledby="con-live-leaderboard-title">
          <div class="contrib-lead">
            <div class="champion-sigil" aria-hidden="true"><span>🏆</span></div>
            <p class="sec-ey">◆ Wiki Contribution Hub ◆</p>
            <h2 class="sec-h" id="con-live-leaderboard-title">Rewards and Current Wiki Needs</h2>
            <p class="sec-s">Everything about how to help the wiki, earn stars, and understand current wiki priorities lives here.</p>
          </div>
          <div class="contrib-meta contrib-meta-clean">
            <div class="meta-card clean-season-card">
              <h3>Seasonal leaderboard</h3>
              <p class="season-meta-main"><strong>Each season lasts one calendar month.</strong> Season contribution stars reset on the 1st. Lifetime contribution stars, page credits, earned wiki ranks, and staff recognition stay with the contributor.</p>
              <div class="season-rules-grid" aria-label="Season leaderboard rules">
                <span><b>Monthly race</b><em>Season stars rank the current month only.</em></span>
                <span><b>Permanent profile</b><em>Lifetime stars, pages, and credits stay visible.</em></span>
                <span><b>Past placings</b><em>Archived podiums appear on contributor profiles.</em></span>
              </div>
              <button class="con-home-podium-cta" type="button" data-home-podium>
                <span class="reward-star-field" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i><i></i></span>
                <span class="con-home-podium-cta__icon" aria-hidden="true">🏆</span>
                <span class="con-home-podium-cta__copy"><b>View the Home Podium</b><em>See current top contributors</em></span>
              </button>
              <div class="mini" id="season-meta"></div>
              <div class="season-history" id="season-history"></div>
            </div>
            <div class="meta-card season-rewards-card">
              <h3>Season rewards</h3>
              <p class="season-meta-main">Season winners receive a configurable <strong>next-season kickoff bonus</strong> and permanent Hall of Champions recognition.</p>
              <div class="season-reward-grid">
                <div class="season-reward-chip top1"><span class="place"><span aria-hidden="true" class="reward-rank-icon">🏆</span><span class="place-badge">#1</span></span><span class="reward">Champion · +250 next-season wiki stars</span><span class="reward-extra">Hall of Champions</span></div>
                <div class="season-reward-chip top2"><span class="place"><span aria-hidden="true" class="reward-rank-icon">🥈</span><span class="place-badge">#2</span></span><span class="reward">Runner-up · +150 next-season wiki stars</span><span class="reward-extra">Featured placement</span></div>
                <div class="season-reward-chip top3"><span class="place"><span aria-hidden="true" class="reward-rank-icon">🥉</span><span class="place-badge">#3</span></span><span class="reward">Third place · +75 next-season wiki stars</span><span class="reward-extra">Featured placement</span></div>
              </div>
              <div class="season-reward-note">Season rewards are next-season wiki star bonuses, not Archlight Coins.</div>
            </div>
          </div>
          <div class="wiki-needs-grid" aria-label="Current wiki needs">
            <article><b>Missing pages</b><span>Draft missing quests, systems, item pages, routes, or profession notes.</span></article>
            <article><b>Outdated values</b><span>Report wrong numbers, requirements, rewards, cooldowns, or NPC details.</span></article>
            <article><b>Screenshots</b><span>Add clean screenshots for NPCs, entrances, quest rooms, and UI steps.</span></article>
            <article><b>Route clarity</b><span>Improve confusing progression order, prerequisites, or “what next?” moments.</span></article>
          </div>
        </section>

        ${recognitionOverview()}

        ${roleOverview()}

        <section class="con-live-section con-live-section--workflow" aria-labelledby="con-live-workflow-title">
          <div class="con-live-section-head">
            <div class="con-live-section-label con-live-section-label--gold"><span></span>How contributions work</div>
            <h2 id="con-live-workflow-title">Submissions are reviewed before they change the live wiki.</h2>
          </div>
          <div class="con-live-step-grid">
            ${workflowCards()}
          </div>
        </section>

        <section class="con-live-guide" aria-labelledby="con-live-guide-title">
          <div class="con-live-guide__copy">
            <div class="con-live-section-label"><span></span>Submission guidance</div>
            <h2 id="con-live-guide-title">What helps staff review faster?</h2>
            <p>Short, specific, and accurate contributions are easier to approve. Include page names, exact values, and the part that needs changing.</p>
          </div>
          <div class="con-live-guide__cards">
            ${guidanceCards()}
          </div>
        </section>
      </div>
    `;

    bind(host);
    if (window.Contributors && typeof window.Contributors.render === 'function') { window.Contributors.render(); }
  }

  function bind(root){
    const submitPanel = root.querySelector('#con-live-submit');
    const submitTitle = root.querySelector('#con-live-submit-title');
    const typeField = root.querySelector('#con-live-type');
    const topicField = root.querySelector('#con-live-topic');
    const note = root.querySelector('#con-live-note');

    const homePodiumButton = root.querySelector('[data-home-podium]');
    if (homePodiumButton && !homePodiumButton.__homePodiumBound) {
      homePodiumButton.__homePodiumBound = true;
      homePodiumButton.addEventListener('click', () => {
        if (typeof window.go === 'function') window.go('home');
        else location.hash = '#home';
        setTimeout(() => {
          const target = document.querySelector('#pg-home #contrib-sec, #pg-home #podium, #pg-home .home-contrib-summary');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 90);
      });
    }

    root.querySelectorAll('[data-contribution-type]').forEach(button => {
      button.addEventListener('click', () => {
        const type = button.getAttribute('data-contribution-type');
        const path = contributionPaths.find(item => item.id === type) || contributionPaths[3];
        if (typeField) typeField.value = path.id;
        if (submitTitle) submitTitle.textContent = path.title;
        if (topicField) topicField.placeholder = path.id === 'issue' ? 'Example: Prestige rewards table' : 'Example: Classes, Equipment, Quests';
        if (submitPanel) {
          submitPanel.hidden = false;
          submitPanel.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
      });
    });

    const close = root.querySelector('[data-contribution-close]');
    if (close) close.addEventListener('click', () => { if (submitPanel) submitPanel.hidden = true; });

    const form = root.querySelector('#con-live-form');
    if (!form || form.__contributeLiveBound) return;
    form.__contributeLiveBound = true;

    form.addEventListener('submit', event => {
      event.preventDefault();
      const path = contributionPaths.find(item => item.id === typeField.value) || contributionPaths[3];
      const item = {
        type: path.id,
        typeLabel: path.title,
        name: root.querySelector('#con-live-name').value.trim(),
        page: root.querySelector('#con-live-topic').value.trim(),
        message: root.querySelector('#con-live-message').value.trim(),
        date: new Date().toISOString()
      };
      const submissions = readSubmissions();
      submissions.unshift(item);
      writeSubmissions(submissions.slice(0, 50));
      if (note) note.textContent = 'Contribution saved locally in this browser. Review tools can be connected later.';
      if (window.ArchlightActivity) window.ArchlightActivity.add({ type: 'contribution', action: 'submitted', page: item.page || 'Contribute' });
      form.reset();
    });
  }

  window.ContributePage = { render };
  window.renderContributePage = render;
  document.addEventListener('DOMContentLoaded', render);
})();
