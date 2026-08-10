# heybui.github.io

Personal site, served by GitHub Pages at <https://heybui.github.io/>.

Plain static HTML, CSS and one JS file. No build step, no dependencies, no
package manager — what's in the repo is what the browser gets.

## Layout

```
.
├── index.html            # the site; markup is the source of truth
├── 404.html              # custom not-found page (Pages serves this automatically)
├── .nojekyll             # skip the Jekyll build; publish files verbatim
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── css/site.css      # tokens, base, hover states, responsive rules
│   ├── js/site.js        # lists, filters, i18n, theme, CV modal
│   ├── huy-bui-cv.pdf    # the résumé, linked from Contact
│   └── img/
│       ├── og.svg        # source for the social card
│       └── og.png        # 1200×630 og:image
└── design/               # design-canvas source, not part of the site
```

## Deploying

Pages is configured as **deploy from branch `main`, folder `/` (root)**. Push to
`main` and the live site updates — there's no workflow to run and nothing to
build. `.nojekyll` is what keeps Pages from running the content through Jekyll.

Because this is a *user* site served from the domain root, absolute paths like
`/assets/css/site.css` are correct. They would need to become relative if this
content ever moved into a project repo served from `/<repo>/`.

## Local preview

Open `index.html` directly and the root-absolute asset paths won't resolve, so
serve the directory instead:

```sh
python3 -m http.server 8000
# then http://localhost:8000/
```

## What needs JavaScript

Static in the HTML, so crawlers and no-JS visitors get it: the name, role,
location, bio, every section heading, the contact email and links, and the
first project's detail pane.

Rendered by `site.js` from the arrays, so it is absent without JS: the project
list rows, the writing list, the stack items, and the experience entries.

That's a deliberate trade — one source of truth per list, in `site.js`. If those
lists ever need to be in the HTML too (for no-JS readers, or a crawler that
doesn't execute scripts), pre-render the English pass into the four containers
and let `site.js` overwrite them on load; the cost is that the markup then has
to be regenerated whenever an array changes.

## Editing

- **Copy, projects, jobs, stack, credentials** — English copy for the labelled
  bits lives in `index.html` on the `[data-i18n]` elements; `site.js` reads it at
  startup and `DICT.vi` holds the Vietnamese. The `PROJECTS`, `EXP`, `STACK` and
  `CREDENTIALS` arrays at the top of `site.js` are rendered in both languages.
- **A project's link button** — set `url` on the project. An empty `url` hides
  the button, so unreleased or internal work simply has no link.
- **Look and behaviour** — the `CONFIG` object at the top of `site.js` holds
  what used to be design-canvas props: theme, language, and the alternative
  `navStyle` / `expLayout` / `stackStyle` layouts, all still implemented.
- **Social card** — edit `assets/img/og.svg`, then re-render:

  ```sh
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
    --headless --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1200,630 --screenshot="$PWD/assets/img/og.png" \
    "file://$PWD/assets/img/og.svg"
  ```

## Content

All copy comes from `~/Documents/resume/dev.md`. Every figure on the page is one
that appears there — nothing is estimated or extrapolated.

- **Projects** — 6 entries: two product, two platform, two consulting. Five have
  public URLs; Dental AI Imaging has none, so it renders without a link button.
- **Experience** — the seven full-time roles, 2015 to now. The contract and
  founding work (Hanoi Convention, Kasha.io, Breezing.In) sits under Projects
  rather than Experience, matching how `dev.md` splits them.
- **Education & Awards** — the panel that was "Writing" in the design template,
  since there's no blog to list. Two degrees, two awards, linking out to the
  certificates folder.
- **Stack** — the nine skill groups in `dev.md`, folded into seven rows that fit
  the panel.

Deliberately left out: the phone number from `dev.md`. Publishing a mobile number
on a public page invites scrapers — add it to the contact card if you want it
there.

### The CV

`assets/huy-bui-cv.pdf` is the real file. Both controls — "CV / PDF" in Contact
and "Download" in the modal — are plain `<a href>` links to it, so they work with
JavaScript off; `site.js` only intercepts the first one to show the preview, and
reads the path off that link rather than hardcoding it. To swap the résumé, drop
a new file in and update the two `href`s plus the filename shown in the modal.

Note it carries a phone number in its header, which the page itself does not.

### Still to add

- **Portrait** — the profile tile is a hatched placeholder (`[data-portrait]`).
- **Project screenshots** — same, `[data-d-media]` in the detail pane.
- **A favicon** — deliberately none, so browsers fall back to their default icon
  and request `/favicon.ico` (a harmless 404). Add `assets/img/favicon.svg` and a
  `<link rel="icon">` in `index.html` and `404.html` to bring one back.

## design/

`design/bento-portfolio.dc.html` is the original Claude design-canvas export
that this site was built from, kept so the layout can still be edited there and
re-ported. It needs its sibling `support.js`, boots React 18 from unpkg at
runtime, and renders nothing until it arrives — which is exactly why the
published site is the hand-ported static version instead. It is not linked from
the site and is excluded in `robots.txt`.
