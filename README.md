# heybui.github.io

My personal site. Live at <https://heybui.github.io/>

Static HTML, CSS and one JS file. No build step, no dependencies.

## Files

```
index.html          the page
404.html            not-found page
.nojekyll           tells Pages to publish files as-is
favicon.ico         16/32/48 multi-size icon, generated from profile.png
robots.txt
sitemap.xml
llms.txt            plain-text summary of the page, for LLMs/AI crawlers
assets/
  css/site.css      all styles
  js/site.js        content + behaviour
  certs/            CV and scanned certificates/awards
  img/og.svg        social card source
  img/og.png        social card, 1200x630
  img/profile.png   portrait — source for the profile tile and og.svg photo
  img/favicon-*.png, apple-touch-icon.png   generated from profile.png
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
- `llms.txt` is a hand-maintained summary for LLMs/AI crawlers. Update it when
  `PROJECTS`, `EXP`, `STACK` or `CREDENTIALS` in `site.js` change meaningfully.

To re-render the social card after editing `og.svg`:

```sh
google-chrome \
  --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
  --window-size=1200,630 --screenshot="$PWD/assets/img/og.png" \
  "file://$PWD/assets/img/og.svg"
```

On macOS, `google-chrome` is the `Google Chrome.app` binary — either put it on
your `PATH` or replace it with the full path into `Google Chrome.app/Contents/MacOS/`.

To regenerate the favicons after replacing `assets/img/profile.png`:

```sh
magick assets/img/profile.png -resize 180x180 assets/img/apple-touch-icon.png
magick assets/img/profile.png -resize 32x32 -unsharp 0x1+0.8+0 assets/img/favicon-32.png
magick assets/img/profile.png -resize 16x16 -unsharp 0x1.2+1.2+0 assets/img/favicon-16.png
magick assets/img/profile.png -resize 48x48 /tmp/favicon-48.png
magick assets/img/favicon-16.png assets/img/favicon-32.png /tmp/favicon-48.png favicon.ico
```
