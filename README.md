# heybui.github.io

My personal site. Live at <https://heybui.github.io/>

Static HTML, CSS and one JS file. No build step, no dependencies.

## Files

```
index.html          the page
404.html            not-found page
.nojekyll           tells Pages to publish files as-is
robots.txt
sitemap.xml
assets/
  css/site.css      all styles
  js/site.js        content + behaviour
  huy-bui-cv.pdf    the CV
  img/og.svg        social card source
  img/og.png        social card, 1200x630
design/             original design file — local only, git-ignored
```

## Deploy

Push to `main`. Pages serves the repo root — nothing builds.

Asset paths start with `/`, which works because the site sits at the domain root.
They would need to become relative if this moved into a project repo.

## Run locally

Opening `index.html` as a file breaks the `/assets/...` paths, so serve the folder:

```sh
python3 -m http.server 8000
# http://localhost:8000/
```

## Edit the content

It's all in `assets/js/site.js`:

- `PROJECTS`, `EXP`, `STACK`, `CREDENTIALS` — the four lists, English and Vietnamese
- `DICT.vi` — Vietnamese for the labels. The English lives in `index.html`, on the
  `data-i18n` elements
- `CONFIG` — theme, language, and alternative layouts for the nav, experience and
  stack panels. These are **first-visit defaults only**: once a visitor uses the
  language or theme button, their choice is saved in `localStorage` under
  `hb.prefs` and wins on every later visit. A small inline script in the `<head>`
  of both HTML files applies the saved theme before first paint, so a saved dark
  theme doesn't flash light

Leave a project's `url` empty to hide its link button.

The copy comes from `~/Documents/resume/dev.md`, and every number on the page is
from there. The phone number is left off on purpose — public pages get scraped.
Add it to Contact if you want it.

## What needs JavaScript

In the HTML: name, role, location, bio, headings, contact details, first project.

Drawn by JS: the project list, education list, stack rows, experience entries.

So with JS off you get the page but not those four lists. If that matters, paste
the rendered English into the four containers — JS overwrites them on load — but
then you have to redo it whenever a list changes.

## The CV

`assets/huy-bui-cv.pdf`. Both buttons are ordinary links to it, so they work
without JS; JS only adds the preview popup.

To replace it: drop in the new file, then update the two `href`s in `index.html`
and the filename shown in the popup. Note the PDF header includes a phone number.

## Social card

Edit `assets/img/og.svg`, then re-render the PNG:

```sh
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="$PWD/assets/img/og.png" \
  "file://$PWD/assets/img/og.svg"
```

## Not done yet

- **Portrait** — the profile photo is a placeholder tile
- **Project screenshots** — same, in the project detail pane
- **Favicon** — there is none, so browsers show their default and ask for
  `/favicon.ico` (a harmless 404). To add one, put `assets/img/favicon.svg` back
  and add a `<link rel="icon">` to both HTML files

## design/

`design/bento-portfolio.dc.html` is the Claude design-canvas file this site came
from, kept in case the layout needs editing there again. It needs `support.js`
beside it and loads React from a CDN, so it's slow and shows nothing without JS —
which is why the live site is a hand-written static copy instead. See
`design/README.md` for how it maps to the files here.

**This folder is git-ignored on purpose.** GitHub Pages serves every file in the
published branch, and there is no way to deny access to one — no auth, no deny
rules, and `robots.txt` only asks crawlers not to index (it does not stop anyone,
and it names the path to whoever reads it). Keeping the folder out of git is what
keeps it off the site. The trade-off: it lives only on this machine, so back it up
elsewhere. If you'd rather have it version-controlled but unpublished, put it on a
separate branch instead of `main`.
