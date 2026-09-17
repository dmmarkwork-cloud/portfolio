repo: dmmarkwork-cloud/aeronautics
branch: main

Portfolio sources (five project repos, all `main`, owner dmmarkwork-cloud):
- ss316-cd-nozzle-feasibility
- gas-vessel-fea
- mk10-aircraft-design
- pano-vista-uav
- rotor-blade-helicopter-design

## Last sync
date: 2026-09-16T00:00:00Z

### Updated in this project
- Added Portfolio Spotlight v2 — dark instrument theme, pointer-tracked 3D tilt on every project figure, IntersectionObserver nav, Escape-to-close lightbox.
- Added the three CDN drawing sheets (Rev C) as raster figures under the nozzle DFM views plus a dedicated drawing-set row.
- Added a Background section (PRC licence, education, maintenance internship) from the user's resume.
- Built an interactive scrolling portfolio page with a per-project spotlight (figure switcher, live metric sets, lightbox).
- Built a 10-slide 16:9 portfolio deck, one slide per project plus the nozzle v1.0 → v2.0 correction.
- Imported 15 figures (Mach contour, von Mises fields, meshes, three-view, V-n, exploded views) from the five repos.
- All headline values taken verbatim from repo READMEs — no invented numbers.

## Screen map
| Screen | Built from |
|---|---|
| Portfolio Spotlight.dc.html — 01 Nozzle | ss316-cd-nozzle-feasibility/README.md; cfd/figures/mach-contour.png; fea/mesh3/*.png; cad/cad_dimensions.png; dfm/images/exploded-view.png |
| Portfolio Spotlight.dc.html — 02 Tank | gas-vessel-fea/README.md; images/gas-vessel-geometry-image.png; images/mesh_coarse.png; images/mesh_fine.png |
| Portfolio Spotlight.dc.html — 03 MK-10 | mk10-aircraft-design/README.md; drawings/3d-view.png; analysis/plots/{vn-diagram,naca-2415-selected,pa-pr}.png |
| Portfolio Spotlight.dc.html — 04 UAV | pano-vista-uav/README.md; docs/exploded-view.png |
| Portfolio Spotlight.dc.html — 05 Rotor | rotor-blade-helicopter-design/README.md; iso.png |
| Portfolio Spotlight.dc.html — header / skills / contact | aeronautics/README.md (profile) |
| Portfolio Deck.dc.html — all slides | same five READMEs + the imported figures above |

| Portfolio Spotlight v2.dc.html — 01 Nozzle DFM views + drawing set | uploads/CDN-000.pdf, CDN-001.pdf, CDN-002.pdf → figures/sheet-cdn-*.png |
| Portfolio Spotlight v2.dc.html — Background | uploads/Resume - Airbus Helicopters Malaysia (PRC licence, HAU BSc, Dornier internship) |
