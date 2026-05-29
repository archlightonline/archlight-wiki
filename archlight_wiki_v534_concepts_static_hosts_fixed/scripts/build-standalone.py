import shutil
from pathlib import Path

root = Path(__file__).resolve().parents[1]
source = root / 'index.html'
html = source.read_text(encoding='utf-8')

css_order = [
    'assets/css/wiki-shell.css', 'assets/css/page-template-core.css', 'assets/css/live-activity.css',
    'assets/css/logo.css', 'assets/css/worlds.css', 'assets/css/home-social.css',
    'assets/css/home-announcements.css', 'assets/css/all-pages.css', 'assets/css/concept-preview-routes.css',
    'assets/css/contribute-page.css', 'assets/css/contributors.css', 'assets/css/home.css', 'assets/css/home-browse-clean.css', 'assets/css/play-choice.css', 'assets/css/scroll-progress.css',
    'assets/css/unlocks-tasks.css', 'assets/css/unlocks-board.css', 'assets/css/quests.css',
    'assets/css/updates.css', 'assets/css/login.css', 'assets/css/nav-user.css', 'assets/css/topbar-community.css', 'assets/css/profile.css', 'assets/css/profile-best-placings.css', 'assets/css/role-interactions.css', 'assets/css/section-deeplinks.css', 'assets/css/admin-panel.css',
    'assets/css/launcher-notification.css',
    'assets/css/home-polish.css',
    'assets/css/home-root-final.css', 'assets/css/home-hero-stats.css', 'assets/css/site-footer.css',
    'assets/css/wiki-editor.css', 'assets/css/page-jump.css',
    'assets/css/targeted-polish.css',
]

script_order = [
    'data/unlocks-tasks-pages.js', 'data/updates-data.js',
    'data/admin-users.js', 'data/home-announcements-data.js', 'data/launcher-notifications-data.js', 'data/concept-routes.js',
    'assets/js/navigation.js', 'assets/js/page-registry.js', 'assets/js/concept-preview-routes.js',
    'assets/js/all-pages.js', 'data/contributors-data.js', 'assets/js/contributors-core.js',
    'assets/js/contributors-sections.js', 'assets/js/contribute-page.js', 'assets/js/home-social.js', 'assets/js/play-choice.js', 'assets/js/scroll-progress.js',
    'assets/js/home-announcements.js', 'assets/js/unlocks-tasks.js', 'assets/js/unlocks-board.js',
    'assets/js/contributors.js', 'assets/js/did-you-know.js', 'assets/js/logo.js',
    'assets/js/updates.js', 'assets/js/quests.js', 'assets/js/admin-panel.js',
    'assets/js/section-deeplinks.js', 'assets/js/app.js', 'assets/js/activity.js', 'assets/js/worlds.js', 'assets/js/login.js', 'assets/js/nav-user-feedback.js', 'assets/js/profile.js',
    'assets/js/wiki-editor.js', 'assets/js/page-jump.js',
    'assets/js/launcher-notification.js',
]

for rel in css_order:
    path = root / rel
    if path.exists():
        css = path.read_text(encoding='utf-8')
        inline = '<style data-inline-source="'+rel+'">\n' + css + '\n</style>'
        variants = [
            f'<link href="{rel}" rel="stylesheet"/>',
            f'<link rel="stylesheet" href="{rel}"/>',
            f'<link href="{rel}" rel="stylesheet">',
            f'<link rel="stylesheet" href="{rel}">',
        ]
        for variant in variants:
            html = html.replace(variant, inline)

for rel in script_order:
    path = root / rel
    if path.exists():
        js = path.read_text(encoding='utf-8').replace('</script', '<\\/script')
        inline = '<script data-inline-source="'+rel+'">\n' + js + '\n</script>'
        html = html.replace(f'<script src="{rel}"></script>', inline)

out = root / 'dist' / 'archlight_wiki_standalone.html'
out.parent.mkdir(exist_ok=True)
out.write_text(html, encoding='utf-8')

for asset_dir in ('media', 'images'):
    asset_src = root / 'assets' / asset_dir
    asset_out = out.parent / 'assets' / asset_dir
    if asset_src.exists():
        if asset_out.exists():
            shutil.rmtree(asset_out)
        shutil.copytree(asset_src, asset_out)

print(out)


concept_src = root / 'concepts'
concept_out = out.parent / 'concepts'
if concept_src.exists():
    if concept_out.exists():
        shutil.rmtree(concept_out)
    shutil.copytree(concept_src, concept_out)
