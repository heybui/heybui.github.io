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
design/             original design file, git-ignored (see below)
```

## Deploy

Push to `main`. Pages serves the repo root — nothing builds.

Asset paths start with `/`, which works because the site is at the domain root.

## Run locally

Opening `index.html` as a file breaks the `/assets/...` paths, so serve the folder:

```sh
python3 -m http.server 8000
# http://localhost:8000/
```

## Edit

Content lives in `assets/js/site.js`:

- `PROJECTS`, `EXP`, `STACK`, `CREDENTIALS` — the four lists, English and Vietnamese
- `DICT.vi` — Vietnamese labels. The English is in `index.html` on the `data-i18n` elements
- `CONFIG` — theme, language and layout options. First-visit defaults only; once a
  visitor picks a language or theme it's saved in `localStorage` as `hb.prefs`

Notes:

- Leave a project's `url` empty to hide its link button.
- Copy comes from a resume source file kept outside this repo. The phone number
  there is left off the page on purpose.
- The CV is a real file. Both buttons are plain links to it, so they work without
  JS. To replace it, drop in the new file and update the two `href`s in
  `index.html`. Its header includes a phone number.
- Without JS you get the page but not the four lists — those are drawn by `site.js`.
- No favicon, so browsers ask for `/favicon.ico` and get a harmless 404.
- The portrait and project screenshots are still placeholder tiles.

To re-render the social card after editing `og.svg`:

```sh
google-chrome \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="$PWD/assets/img/og.png" \
  "file://$PWD/assets/img/og.svg"
```

On macOS, `google-chrome` is the `Google Chrome.app` binary — either put it on
your `PATH` or replace it with the full path into `Google Chrome.app/Contents/MacOS/`.
