# Archlight Wiki

Static wiki source for the Archlight website.

Open `index.html` from the root folder to preview the wiki shell locally.

## Project structure

```txt
index.html          Main wiki shell entry point
assets/css/         Active CSS modules
assets/js/          Active JavaScript modules
assets/images/      Image assets
assets/media/       Media assets
data/               Page and system data
concepts/           Concept and design-lab pages
scripts/            Build utilities
dist/               Generated standalone build
```

## Build

```bash
python scripts/build-standalone.py
```

Output:

```txt
dist/archlight_wiki_standalone.html
```

Develop against the source files. Rebuild the standalone file after source changes.
