(function () {
  function setupCodex(layout) {
    var menu = layout.querySelector('.codex-menu');
    var content = layout.querySelector('.codex-content');
    if (!menu || !content) return;

    var links = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
    var panels = Array.prototype.slice.call(content.querySelectorAll('.codex-panel[id]'));
    if (!links.length || !panels.length) return;

    var panelIds = panels.map(function (panel) { return panel.id; });

    function chooseInitialId() {
      var hashId = window.location.hash ? window.location.hash.slice(1) : '';
      if (hashId && panelIds.indexOf(hashId) !== -1) return hashId;
      var activeLink = links.find(function (link) { return link.classList.contains('is-active'); });
      if (activeLink && activeLink.hash && panelIds.indexOf(activeLink.hash.slice(1)) !== -1) return activeLink.hash.slice(1);
      return panels[0].id;
    }

    function activate(id, updateHash) {
      if (panelIds.indexOf(id) === -1) id = panels[0].id;

      panels.forEach(function (panel) {
        var active = panel.id === id;
        panel.classList.toggle('is-active', active);
        panel.hidden = !active;
        panel.setAttribute('aria-hidden', active ? 'false' : 'true');
      });

      links.forEach(function (link) {
        var active = link.hash === '#' + id;
        link.classList.toggle('is-active', active);
        if (active) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      });

      if (updateHash && window.history && window.history.replaceState) {
        window.history.replaceState(null, '', '#' + id);
      }
    }

    links.forEach(function (link) {
      link.addEventListener('click', function (event) {
        var id = link.hash ? link.hash.slice(1) : '';
        if (panelIds.indexOf(id) === -1) return;
        event.preventDefault();
        activate(id, true);
      });
    });

    window.addEventListener('hashchange', function () {
      var id = window.location.hash ? window.location.hash.slice(1) : '';
      if (panelIds.indexOf(id) !== -1) activate(id, false);
    });

    activate(chooseInitialId(), false);
  }

  document.addEventListener('DOMContentLoaded', function () {
    Array.prototype.slice.call(document.querySelectorAll('.codex-layout')).forEach(setupCodex);
  });
})();
