# mlyamanaka.com

The portfolio site of Mark Lorenz Yamanaka, PRC Professional Aeronautical
Engineer: four stress and CFD analyses, three hand builds, two internships.
Plain HTML, CSS and JavaScript, with no build step.

Live at **https://www.mlyamanaka.com** (Vercel, from `master`). The GitHub
Pages copy at dmmarkwork-cloud.github.io/portfolio redirects there.

## Where things are

| Path | What it is |
|---|---|
| `project/` | The site. Everything in it is published. |
| `project/portfolio-light.html` | Home (served at `/`) |
| `project/projects.html`, `internships.html`, `about.html` | The other pages (served at `/projects` etc.) |
| `project/404.html` | The page for any address the site does not have |
| `project/site.css`, `site-mobile.css`, `site.js` | Shared by every page. Project data (`PROJECTS`) lives in `site.js`. `site-mobile.css` must stay the last stylesheet. |
| `project/holo-bay.js`, `vendor/` | The home page's 3D turntable and the three.js it loads |
| `project/figures/<project>/` | Pictures, one folder per project. A few older ones sit in `fea/`, `dfm/`, `images/` and `analysis/`. |
| `project/thumbs/`, `project/cards/` | Small copies made by `tools/make-images.py` |
| `project/vercel.json` | Clean URLs, redirects and the security headers (CSP and others) |
| `sources/` | Camera originals behind the `-1800.jpg` photo copies. Not published. |
| `tools/` | `check-mobile.mjs` (mobile guardrails), `make-images.py` (photo copies), `mobile-harness.html` |
| `.github/workflows/` | GitHub Pages deploy, and the mobile checks on every push to `master` |

## Changing the site

1. Edit the files in `project/`. Preview with `python -m http.server` in
   `project/` and open the `.html` files directly (the local server has no
   clean URLs).
2. Added or replaced a photo? Run `python tools/make-images.py`; its header
   says how to point the page at the new copy and where the original goes.
3. Run `node tools/check-mobile.mjs`.
4. Push to `master`. Vercel and GitHub Pages both redeploy in about a minute.

Released versions are tagged `live/…` (for example `live/v3.1-polish`); each
tag message holds the deployment it was served from.

## Never commit

Anything from the Obsidian vault's `artifacts\` folder. The repository is
public, and its history was rewritten on 2026-10-17 to purge photos that
carried GPS data.
