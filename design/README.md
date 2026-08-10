# design/

Source of record for the *layout*, not for the published site.

`bento-portfolio.dc.html` is the Claude design-canvas export the site was built
from. It is a `<x-dc>` template plus a logic class, compiled at runtime by
`support.js`, which pulls React 18 (and Babel, for JSX imports) from unpkg.

It stays here so the design can still be opened and edited in the canvas. It is
**not** what visitors get: `/index.html` is a hand-port of this file to static
markup + `assets/js/site.js`, with no framework and no CDN.

## Mapping back to the port

| Here | In the site |
| --- | --- |
| `<helmet>` contents | `<head>` of `index.html` |
| `<style>` block | `assets/css/site.css` |
| `<x-dc>` markup | `<body>` of `index.html` |
| `style-hover="…"` | `.hv-*` classes in `site.css` (still `!important`, as dc emitted them) |
| `ref="{{ rootRef }}"` | the `[data-page]` element |
| `onClick="{{ … }}"` | `addEventListener` calls in `app.wire()` |
| `data-props` / `this.props` | the `CONFIG` object in `site.js` |
| logic class | the `app` object in `site.js` |

Two deliberate divergences in the port: the theme defaults to `auto` (follow the
OS) instead of `light`, and the permanent `requestAnimationFrame` poll that drove
the sticky nav became a rAF-coalesced scroll listener.

If you change the design here, re-apply the change to `index.html` /
`site.css` / `site.js` by hand — nothing regenerates automatically.

`image-slot.js` was removed: it was loaded but the page never used an
`<image-slot>` element. Its `<script>` tag is gone from the `<helmet>` block. If
you add image slots in the canvas, that file comes back from the canvas itself.
