const PROJECTS = [
  {
    anchor: 'p-nozzle', group: 'flagship', short: 'Nozzle',
    kicker: ['Propulsion', 'Multiphysics', 'DFM'],
    title: 'Uncooled SS316 C-D Nozzle',
    result: 'Stress governs at the chamber junction: a factor of safety of 7.12.',
    key: { v: '7.12', k: 'factor of safety; v1.0 said 42.70' },
    check: 'Hand calcs and 17 FEA validation gates',
    layers: [
      ['Problem', 'Can an uncooled SS316 nozzle hold 2\u00a0MPa and 800\u00a0K at the design point, and can it be made and inspected?'],
      ['Approach', 'Hand calculations first, then 2D axisymmetric CFD in Fluent, mapped one-way onto a thermal and structural model in Mechanical. The result is carried into a GD&T drawing set to ASME Y14.5-2018.'],
      ['Verification', 'Exit Mach 2.85 against 2.94 by hand, within 3.1\u00a0%. Seventeen FEA validation gates, including thrust equilibrium within 0.20\u00a0%; the two that failed are bounded in the report. A three-mesh ladder gives the factor of safety as a band, 7.02 to 7.12.'],
      ['Lesson', 'v1.0 read the throat and reported 42.70, about six times too high. Yield is also the wrong limit to stop at: the wall runs at 527\u00a0°C, above the creep onset of SS316, so the design holds for short ground-test firings only.']
    ],
    story: 'An uncooled SS316 converging–diverging nozzle running at <span class="data">2\u00a0MPa</span> and <span class="data">800\u00a0K</span>, carried from CFD through thermal-structural analysis into a full GD&T drawing set. Governing stress falls at the chamber-to-converging junction, not the throat. The v1.0 release missed this and reported a factor of safety of <span class="data">42.70</span>; the corrected v2.0 is <span class="data">7.12</span>, and both are published.',
    repo: 'https://github.com/dmmarkwork-cloud/ss316-cd-nozzle-feasibility',
    values: [
      { k: 'Load case', v: '2\u00a0MPa, 800\u00a0K' },
      { k: 'Governing stress', v: '29.6\u00a0MPa' },
      { k: 'Allowable, yield at 527\u00a0°C', v: '210.7\u00a0MPa' },
      { k: 'Factor of safety', v: '7.12' },
      { k: 'Exit Mach, checked by hand', v: '2.85' }
    ],
    // From the repository's README, "What changed in v2.0": v1.0 reported
    // 42.70 at the throat, on an assessed quantity that was not a classified
    // stress; v2.0 reads linearised membrane plus bending at the junction.
    revisions: {
      title: 'Revision record',
      initial: 'v2.0',
      releases: [
        { id: 'v2.0', tab: 'v2.0 · current',
          note: 'Read on a through-wall path at the chamber-to-converging junction, where the stress governs.',
          values: [
            { k: 'Factor of safety', v: '7.12' },
            { k: 'Assessed at', v: 'Junction' },
            { k: 'Stress quantity', v: 'Membrane + bending' }
          ] },
        { id: 'v1.0', tab: 'v1.0 · superseded', superseded: true,
          note: 'Read at the throat, on a quantity that is not a classified stress: about six times too high.',
          values: [
            { k: 'Factor of safety', v: '42.70' },
            { k: 'Assessed at', v: 'Throat' },
            { k: 'Stress quantity', v: 'Not classified' }
          ] }
      ]
    },
    views: [
      { label: 'FEA · von Mises', src: 'fea/mesh3/von-mises-global.png', size: [1632, 582],
        caption: 'Governing stress at the chamber-to-converging junction: 29.6\u00a0MPa membrane plus bending on mesh J3. The 82.3\u00a0MPa peak at the sharp corner is singular and excluded.',
        callouts: [
          { x: 843, y: 113, bx: 700, by: 34, key: 'Chamber-to-converging junction. v2.0 reads it here: <span class="data">7.12</span>' },
          { x: 1121, y: 329, bx: 1000, by: 440, key: 'Throat. v1.0 read it here: <s class="data">42.70</s>, withdrawn' }
        ] },
      { label: 'FEA · Junction path', src: 'fea/mesh3/von-mises-junction-converging.png', caption: 'The through-wall path at the junction. The linearised membrane plus bending stress read along it is the governing 29.6\u00a0MPa.' },
      { label: 'CFD · Mach contour', src: 'figures/nozzle/cfd-figures-mach-contour.png', caption: 'Exit Mach 2.85 against 2.94 by hand, within 3.1\u00a0%, from a converged Fluent solution on an 88,800-cell structured mesh.' },
      { label: 'CAD · Dimensioned profile', src: 'figures/nozzle/cad-cad_dimensions.png', caption: 'Half-section contour sketch — 90\u00a0mm chamber, R22.50 converging fillet into an R5.73 throat, 183.44\u00a0mm overall' },
      { label: 'CFD · Mesh & BCs', src: 'figures/nozzle/mesh-with-bc.png', caption: 'Structured axisymmetric mesh — pressure inlet at the chamber, pressure outlet at the exit plane, clustered through the throat' },
      { label: 'CFD · Residuals', src: 'figures/nozzle/residuals.png', caption: 'Scaled residuals, k-omega SST — continuity and momentum flatten below 1e-3 by iteration 300' },
      { label: 'CFD · Mass flow convergence', src: 'figures/nozzle/mass-flow-vs-residuals.png', caption: 'Mass flow imbalance monitor — settles to zero by iteration 250, confirming a converged solution' },
      { label: 'CFD · Wall y+', src: 'figures/nozzle/y-plus-wall.png', caption: 'Wall y+ along the contour — under 1 through the chamber and diverging section, peaking near 1.75 at the throat' },
      { label: 'Exploded assembly', src: 'dfm/images/exploded-view.png', caption: 'Exploded assembly — body, flange, graphite gasket, 8\u00a0×\u00a0M8 A286 bolts, 4.531\u00a0kg' },
      { label: 'DFM · Clash check', src: 'figures/nozzle/clash-check-result.png', caption: 'Interference check on the flange-to-body register — the highlighted contact ring confirmed a clean fit before releasing the drawing set' },
      { label: 'DFM · Gasket engagement', src: 'figures/nozzle/gasket-compressed-register-engagement.png', caption: '3\u00a0mm of spigot engagement remains after full gasket compression, keeping the flange self-aligning under bolt preload' },
      { label: 'Drawing · CDN-000', src: 'figures/nozzle/sheet-cdn-000.png', caption: 'CDN-000 Rev C — inlet joint assembly, nozzle body to mounting flange, 8\u00a0×\u00a0M8 A286 bolts' },
      { label: 'Drawing · CDN-001', src: 'figures/nozzle/sheet-cdn-001.png', caption: 'CDN-001 Rev C — nozzle body detail, profile 0.2 A|B on the aerodynamic contour' },
      { label: 'Drawing · CDN-002', src: 'figures/nozzle/sheet-cdn-002.png', caption: 'CDN-002 Rev C — mounting flange, 8 × Ø9 holes positioned Ø0.9 Ⓜ A B' }
    ]
  },
  {
    anchor: 'p-tank', group: 'flagship', short: 'Tank',
    kicker: ['Pressure Vessel', 'FEA'],
    title: 'Al6061 Propellant Tank',
    result: 'Short of its 2.00 target at 1.91; 0.2\u00a0mm more wall clears it.',
    key: { v: '1.91', k: 'factor of safety, 2.00 required' },
    check: 'Hand calc within 1.0\u00a0%, mesh converged to 0.62\u00a0%',
    layers: [
      ['Problem', 'Does a 3\u00a0mm Al 6061-T6 tank with hemispherical caps keep a factor of safety of 2.00 against yield at 32.5\u00a0bar?'],
      ['Approach', 'Thin-wall hand calculations set the baseline. The solid model runs in CalculiX through PrePoMax, restrained only at the two cap tips, so no restraint stiffens the junction.'],
      ['Verification', 'FEA lands within 1.0\u00a0% of the hand calc mid-cylinder and 2.3\u00a0% on the cap. Three meshes, from 22,131 to 132,628 elements, converge to 0.62\u00a0%.'],
      ['Lesson', 'An earlier model fixed the junction edge and read 204.1\u00a0MPa there. Moving the restraint gave 144.5\u00a0MPa, which still misses the target by 4.8\u00a0%. About 0.2\u00a0mm more wall clears it.']
    ],
    story: 'A <span class="data">3\u00a0mm</span> aluminum tank with hemispherical caps at <span class="data">32.5\u00a0bar</span>. Hand calculation set the baseline, a three-level mesh study proved convergence, and the governing stress sits at the cylinder-to-cap junction: a factor of safety of <span class="data">1.91</span> against a <span class="data">2.00</span> target. The record includes a documented boundary-condition correction and sizes the next revision: about <span class="data">0.2\u00a0mm</span> of extra wall brings it to target.',
    repo: 'https://github.com/dmmarkwork-cloud/gas-vessel-fea',
    values: [
      { k: 'Load case, internal pressure', v: '3.25\u00a0MPa' },
      { k: 'Critical location', v: 'Cylinder-to-cap junction' },
      { k: 'Governing stress, von Mises', v: '144.5\u00a0MPa' },
      { k: 'Allowable, Al 6061-T6 yield', v: '276\u00a0MPa' },
      { k: 'Factor of safety, 2.00 required', v: '1.91' },
      { k: 'Margin of safety', v: '−0.05' }
    ],
    views: [
      { label: 'Mesh · fine', src: 'images/mesh_fine.png', caption: 'The cylinder-to-cap junction peaks at 144.5\u00a0MPa on the fine mesh of 132,628 elements: a factor of safety of 1.91. Mid-cylinder, 136.6\u00a0MPa sits within 1.0\u00a0% of the hand calc.' },
      { label: 'Geometry & load', src: 'figures/images-gas-vessel-geometry-image.png', caption: 'Tank geometry and pressure load: R\u00a0147\u00a0mm, 3\u00a0mm wall, 700\u00a0mm overall, 3.25\u00a0MPa inside.' },
      { label: 'Mesh · coarse', src: 'images/mesh_coarse.png', caption: 'Coarse mesh of 22,131 C3D10 elements, the start of the convergence study.' }
    ]
  },
  {
    anchor: 'p-mk10', group: 'flagship', short: 'MK-10',
    kicker: ['Aircraft Design', 'Loads', 'Structures'],
    title: 'MK-10: Part 23 Light Aircraft',
    result: 'One weight baseline carried from the mission to the spar sizing.',
    key: { v: '1,649\u00a0lb', k: 'gross weight, carried to the spars' },
    check: 'FAR Part 23 loads, spars sized per Bruhn',
    layers: [
      ['Problem', 'Size a two-seat, single-engine FAR Part 23 light aircraft from its mission, and keep one design baseline all the way to the spars.'],
      ['Approach', 'Weight and CG, airfoil selection, drag buildup and performance, then the V-n envelope, gust and maneuver load distributions, ten spanwise wing strips, and front and rear spar shear and moment, sized per Bruhn.'],
      ['Lesson', 'A weight change only counts once it reaches the shear-moment diagrams, so every one here was carried through to them.']
    ],
    story: 'The MK-10: one design baseline held all the way from mission definition through weight and CG, drag buildup and the V-n envelope into front and rear spar sizing. Every weight change had to be carried through to the shear-moment diagrams, which is the whole point.',
    repo: 'https://github.com/dmmarkwork-cloud/mk10-aircraft-design',
    values: [
      { k: 'Gross weight', v: '1,649\u00a0lb' },
      { k: 'Front spar depth', v: '188.7\u00a0mm' },
      { k: 'Range', v: '459\u00a0nmi' },
      { k: 'Service ceiling', v: '9,536\u00a0ft' }
    ],
    views: [
      { label: 'Final configuration concept', src: 'figures/mk10/concept-render.jpg', caption: 'MK-10 Wooden Aircraft Model: Final Configuration Concept' },
      { label: 'Carved airframe', src: 'figures/mk10/carved-airframe.jpg', caption: 'MK-10 Wooden Aircraft Model: Carved and Sanded Airframe' },
      { label: 'Three-view', src: 'figures/drawings-3d-view.png', caption: 'Final three-view — low straight-tapered wing, fixed tricycle gear, 1,649\u00a0lb gross' },
      { label: 'V-n envelope', src: 'analysis/plots/vn-diagram.png', caption: 'V-n envelope — maneuver and gust cases, design limit load 4.936' },
      { label: 'Airfoil selection', src: 'analysis/plots/naca-2415-selected.png', caption: 'Drag polar across candidate sections — NACA 2415 selected on corrected characteristics' },
      { label: 'Performance', src: 'figures/analysis-plots-pa-pr.png', caption: 'Power available against power required — sets climb, both ceilings, range and endurance' }
    ]
  },
  {
    anchor: 'p-bracket', group: 'flagship', short: 'Bracket', wip: true,
    kicker: ['Structures', 'Dynamics', 'Fatigue'],
    title: 'Ti-6Al-4V Engine Bracket',
    result: 'Static and fatigue checks are still open: no factor of safety yet.',
    key: { v: '9,500\u00a0lbf', k: 'peak load case' },
    check: 'Allowables from MIL-HDBK-5J',
    layers: [
      ['Problem', 'A Ti-6Al-4V clevis lifting bracket, redesigned to the GrabCAD GE bracket challenge interfaces and load cases. It hoists the engine on the ground and stays bolted to it in flight.'],
      ['Approach', 'Static strength first, against the A-basis allowables in MIL-HDBK-5J Table 5.4.1.0(b), then engine vibration over its service life. Modelled in CATIA 3DEXPERIENCE.'],
      ['Status', 'No factor of safety yet. The two modal runs shown are sandbox runs, made to learn the interface and check the rigid-body count.']
    ],
    story: 'A Ti-6Al-4V clevis lifting bracket, redesigned in CATIA 3DEXPERIENCE to the GrabCAD GE bracket challenge interfaces and load cases. It hoists the engine on the ground and stays bolted to it in flight, so it has to clear static strength and then survive engine vibration for its service life. Allowables trace to MIL-HDBK-5J Table 5.4.1.0(b). No factor of safety yet; the analysis is still open.',
    repoNote: 'Repository on release, once the analysis closes.',
    values: [
      { k: 'Peak load case', v: '9,500\u00a0lbf' },
      { k: 'Allowable, Ftu (A-basis)', v: '896.3\u00a0MPa' },
      { k: 'Minimum wall', v: '0.060\u00a0in' },
      { k: 'Factor of safety', v: 'Not yet' }
    ],
    views: [
      { label: 'CAD \u00b7 Isometric', src: 'figures/bracket/cad-iso.png', caption: 'Twin clevis lugs rising from a waisted four-bolt baseplate, tapered web carrying the lug loads back into the plate' },
      { label: 'CAD \u00b7 Side elevation', src: 'figures/bracket/cad-right.png', caption: 'Side elevation \u2014 the 0.75\u00a0in pin bore cantilevered off a swept web, lightened through the center and flared into the mounting plate' },
      { label: 'CAD \u00b7 Plan', src: 'figures/bracket/cad-top.png', caption: 'Plan view \u2014 four 0.375\u00a0in bolt holes on the corners, clevis centered between them' },
      { label: 'Sandbox \u00b7 Free-free modal', video: 'figures/bracket/sandbox-free-free.mp4', poster: 'figures/bracket/sandbox-free-free-poster.jpg', caption: 'Workbench sandbox \u2014 free-free modal at 1999.2\u00a0Hz. Arbitrary material and damping, run to learn the interface and check the rigid-body count.' },
      { label: 'Sandbox \u00b7 Constrained modal', video: 'figures/bracket/sandbox-modal.mp4', poster: 'figures/bracket/sandbox-modal-poster.jpg', caption: 'Workbench sandbox \u2014 constrained modal at 3307\u00a0Hz. Minimum deformation falls to zero at the restraints, against 0.043\u00a0mm free-free.' }
    ]
  },
  {
    anchor: 'p-uav', group: 'built', short: 'PANO-VISTA',
    result: 'A foam-board UAV wired with the hardware its CAD specifies.',
    kicker: ['UAV', 'Systems Integration'],
    title: 'PANO-VISTA: UAV Fixed-Wing',
    story: 'PANO-VISTA is a tractor-configuration fixed-wing UAV, modeled part by part in one master assembly, then cut from foam board and wired up for real with brushless power, an eight-channel receiver, and four micro servos, one per surface. The hardware in the CAD is the hardware on the bench. Team project with four classmates.',
    repo: 'https://github.com/dmmarkwork-cloud/pano-vista-uav',
    values: [
      { k: 'Configuration', v: 'Tractor fixed-wing' },
      { k: 'Control axes', v: '3' },
      { k: 'Actuation', v: '4 micro servos' }
    ],
    views: [
      { label: 'Built airframe · side', src: 'figures/uav/build-side.jpg', caption: 'The finished airframe — foam board over a spar, tricycle gear, pull-pull rudder cable' },
      { label: 'Built airframe · top', src: 'figures/uav/build-top.jpg', caption: 'Plan view of the completed aircraft — constant-chord wing, taped center section' },
      { label: 'Built airframe · front', src: 'figures/uav/build-front.jpg', caption: 'Head-on with the motor and prop fitted, gear down' },
      { label: 'Exploded CAD', src: 'figures/docs-exploded-view.png', caption: 'Exploded isometric of the master assembly — airframe, propulsion, avionics, linkages' },
      { label: 'Hardware laid out', src: 'figures/uav/hardware-layout.jpg', caption: 'The full hardware set before install — 4 micro servos, 2200 KV brushless motor, 40 A ESC, Li-Po packs, prop, pushrods and horns' },
      { label: 'Servo install', src: 'figures/uav/tail-servos.jpg', caption: 'Elevator and rudder servos bedded into the rear fuselage, leads run forward' },
      { label: 'Linkage detail', src: 'figures/uav/servo-linkage.jpg', caption: 'Servo horn and pushrod as built — the linkage that was modeled in CAD' },
      { label: 'Receiver', src: 'figures/uav/receiver-r88.jpg', caption: 'RadioMaster R88 eight-channel receiver — the radio link for all three axes plus throttle' },
      { label: 'Landing gear', src: 'figures/uav/wheels.jpg', caption: 'Main wheels and the sprung tail wheel assembly' },
      { label: 'On the bench', src: 'figures/uav/build-bench.jpg', caption: 'Build night — servo bays cut and glued by hand' }
    ]
  },
  {
    anchor: 'p-rotor', group: 'built', short: 'Rotor',
    result: 'A two-blade rotor drawn by hand, twisted from 78° to 24°.',
    kicker: ['Rotorcraft', 'Drafting', 'CAD'],
    title: 'Wooden Rotor Blade',
    story: 'A <span class="data">Ø71.10\u00a0in</span> two-blade rotor traced in orthographic projection on tracing paper before it was ever parametric. The twist falls from <span class="data">78°</span> inboard to <span class="data">24°</span> at the tip because blade element theory asks for it, so that angle of attack stays roughly constant as local velocity climbs with radius.',
    repo: 'https://github.com/dmmarkwork-cloud/rotor-blade-helicopter-design',
    // Overview card crops the portrait lead photo to landscape; aim the crop
    // at the hub and blade roots instead of the paper above them.
    gridFocus: '50% 62%',
    values: [
      { k: 'Rotor diameter', v: 'Ø\u00a071.10\u00a0in' },
      { k: 'Solidity', v: '0.095' },
      { k: 'Twist, root to tip', v: '78°\u00a0→\u00a024°' }
    ],
    views: [
      { label: 'Carved rotor', src: 'figures/rotor/carved-rotor.jpg', caption: 'The finished two-blade rotor, carved and sanded, held over the drafting table and the orthographic sheets it was drawn on' },
      { label: 'Prop on drawing', src: 'figures/rotor/prop-on-drawing.jpg', caption: 'Carved wooden two-blade rotor laid on the printed orthographic drawing sheet — front and top views' },
      { label: 'CAD four-view', src: 'figures/rotor/cad-four-view.jpg', caption: 'SolidWorks four-view drawing — top, front, isometric and right views with key dimensions' },
      { label: 'Planform detail', src: 'figures/rotor/planform-detail.jpg', caption: 'Chord station table — blade width at each radial station from root to tip' },
      { label: 'Drawing layout', src: 'figures/rotor/drawing-layout.jpg', caption: 'CAD drawing sheet layout — all four standard projection views on one sheet' },
      { label: '3D model', src: 'figures/rotor/cad-3d.jpg', caption: 'SolidWorks 3D shaded view — hub and blade assembly' },
      { label: 'Blade section sketch', src: 'figures/rotor/blade-section.jpg', caption: 'Airfoil section profile modeled in sketch — camber and twist geometry driving the 3D blade' }
    ]
  },
  {
    anchor: 'p-wing', group: 'built', short: 'Wing rig',
    result: 'Servo-driven slats and ailerons you can watch deploy.',
    kicker: ['Mechatronics', 'High-Lift Devices', 'Arduino'],
    title: 'High-Lift Wing Rig',
    story: 'A sectioned wing built in cardboard and skinned in aluminum foil, mounted on its own stand so it can be demonstrated at eye level. Servos embedded in the section drive the ailerons and leading-edge slats from an Arduino Uno sketch, with a dedicated control interface on the base, so these are high-lift devices you can watch deploy instead of read about.',
    repo: null,
    gridThumb: 'figures/wing/servo-bay.jpg',
    values: [
      { k: 'Moving surfaces', v: 'Ailerons + slats' },
      { k: 'Controller', v: 'Arduino Uno' },
      { k: 'Written in', v: 'C++' }
    ],
    views: [
      { label: 'Slats & ailerons moving', video: 'figures/wing/demo.mp4', poster: 'figures/wing/demo-poster.jpg', caption: 'The rig running — slats and ailerons driven from the control interface on the stand' },
      { label: 'Section on its stand', src: 'figures/wing/section-profile.jpg', caption: 'The finished section in profile, mounted on its presentation stand' },
      { label: 'Servo bay open', src: 'figures/wing/servo-bay.jpg', caption: 'Upper surface opened up — servo and linkage bedded between the ribs, foil skin peeled back' },
      { label: 'Servo control bench', src: 'figures/wing/arduino-bench.jpg', caption: 'Bench setup — Arduino Uno, breadboard and a servo under test before it went into the section' }
    ]
  }
];

// Derived, never literal. This was six hardcoded zeros, so adding a seventh
// project left viewIndex[6] undefined; renderGallery then handed
// leadMediaMarkup an undefined view and threw inside the forEach that
// builds every gallery. That aborted the rest of buildProjects, which is
// where the thumbnail-rail fades, the hover previews and the gallery swipe
// are wired — so one stale array length silently disabled all three and
// left the last project with no lead image.
const viewIndex = PROJECTS.map(() => 0);
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function mediaTag(view, styleStr, opts) {
  opts = opts || {};
  // Always contain, never crop. A type-based cover/contain split was tried
  // here and reverted: several source photos are portrait shots of a full
  // drawing sheet or document (figures/rotor/prop-on-drawing.jpg is
  // 3024x4032, figures/wing/section-profile.jpg is 1341x1839) where the
  // top/bottom margin is real content — cover forced them into this wide
  // box and cropped most of the frame away. The overview grid's cards
  // (buildProjectGrid) are a separate function with their own fit logic
  // and pick cover/contain per file type; that one is unaffected.
  const fit = 'object-fit:contain;';
  if (view.video) {
    const autoplay = (opts.autoplay === false || reducedMotion) ? '' : 'autoplay';
    const preload = opts.autoplay === false ? ' preload="metadata"' : '';
    const poster = view.poster ? ` poster="${view.poster}"` : '';
    return `<video src="${view.video}"${poster} ${autoplay}${preload} loop muted playsinline style="${fit}${styleStr}"></video>`;
  }
  const alt = (view.caption || view.label || '').replace(/"/g, '&quot;');
  // Safari has a known bug where loading="lazy" on an <img> inserted via
  // innerHTML (not present in the parsed HTML) can simply never fire its
  // load — Chrome doesn't have this problem, so it only shows up here.
  // The lead/highlight image (opts.eager) needs to always actually load;
  // thumbnails and the lightbox stay lazy since those are genuinely
  // numerous/off-screen.
  const loading = opts.eager ? 'eager' : 'lazy';
  return `<img src="${view.src}" alt="${alt}" loading="${loading}" decoding="async" style="${fit}${styleStr}">`;
}

// Lead display only: a blurred, cover-fit backdrop behind the sharp
// contained media, so projects whose sources don't match the lead box's
// ~2.4:1 shape (portrait/4:3 photos in Pano-Vista, Rotor, Wing; the Wing
// rig's own demo video) don't show bare surface-color pillars. The real
// media is untouched — still full `contain` via mediaTag(), unmodified —
// this only adds a decorative, cropped, blurred copy behind it. For video
// this means two muted <video> elements playing in sync (backdrop + sharp
// foreground); there's only ever one lead video on screen at a time, so
// the extra decode cost is small.
function leadMediaMarkup(view) {
  const pad = 'clamp(14px,2.4vw,30px)';
  const fgStyle = `position:absolute;inset:0;width:100%;height:100%;box-sizing:border-box;padding:${pad};display:block;filter:drop-shadow(0 3px 10px rgba(0,0,0,0.28));`;
  // Blur radius has to be strong enough to erase recognisable shape, not
  // just soften it — a source whose subject already fills most of its own
  // frame (a CFD mesh, a CAD render) will otherwise show a legible cropped
  // duplicate of itself behind the sharp image, reading as a ghosted
  // second copy rather than ambient colour. 64px reduces even hard-edged
  // content (mesh gridlines, machined edges) to a colour wash.
  // Painted as a background rather than an <img> scaled past its own box.
  // `object-fit:cover` + `transform:scale(1.2)` gave the element a bounding
  // box 20% wider than the frame that clips it: invisible on the page, but
  // a real box reaching ~56px outside the page's 1240px column, which any
  // measurement of the page's margins reads as content sitting off-centre.
  // `background-size:120%` overscans the painting by the same amount and
  // leaves the box exactly on its parent. The aspect distortion that costs
  // is undetectable under a 64px blur, which is a colour wash by design.
  const backdropStyle = 'position:absolute;inset:0;display:block;background-position:center;background-repeat:no-repeat;background-size:120% 120%;filter:blur(64px) brightness(0.8);';
  const backdropDiv = (src) => `<div aria-hidden="true" style="${backdropStyle}background-image:url('${src}');"></div>`;
  if (view.video) {
    // A still frame is enough under a 64px blur, and it spares a second
    // full download of the clip. Falls back to the clip if no poster.
    const backdrop = view.poster
      ? backdropDiv(view.poster)
      : `<video src="${view.video}" ${reducedMotion ? '' : 'autoplay'} loop muted playsinline aria-hidden="true" style="position:absolute;inset:0;width:100%;height:100%;display:block;object-fit:cover;filter:blur(64px) brightness(0.8);"></video>`;
    return backdrop + mediaTag(view, fgStyle, { eager: true });
  }
  return backdropDiv(view.src) + mediaTag(view, fgStyle, { eager: true });
}

// ── Drawing callouts ───────────────────────────────────
// A leader and a numbered balloon, as on a drawing sheet, pointing at the
// place a result was read, with the balloons explained in a key under the
// figure. Coordinates are in the figure's own pixels, so the overlay only
// has to be laid over the image at whatever size it is shown.
function calloutMarkup(view) {
  const [w, h] = view.size;
  const pct = (v, d) => (v / d * 100).toFixed(3) + '%';
  const lines = view.callouts.map(c =>
    `<line x1="${c.x}" y1="${c.y}" x2="${c.bx}" y2="${c.by}" vector-effect="non-scaling-stroke"/>`).join('');
  const marks = view.callouts.map((c, i) =>
    `<span class="callout-dot" style="left:${pct(c.x, w)};top:${pct(c.y, h)};"></span>`
    + `<span class="callout-balloon" style="left:${pct(c.bx, w)};top:${pct(c.by, h)};">${i + 1}</span>`).join('');
  return `<div class="callouts" data-w="${w}" data-h="${h}" aria-hidden="true">`
    + `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${lines}</svg>${marks}</div>`;
}
function calloutKey(view) {
  return view.callouts.map((c, i) =>
    `<li><span class="callout-balloon">${i + 1}</span><span>${c.key}</span></li>`).join('');
}
// The lead box shows its figure whole inside a padded frame, so the image's
// own rectangle is worked out from that padding and the figure's shape.
function fitCallouts(area) {
  const layer = area.querySelector('.callouts');
  const img = area.querySelector('img');
  if (!layer || !img) return;
  const cs = getComputedStyle(img);
  const pl = parseFloat(cs.paddingLeft), pt = parseFloat(cs.paddingTop);
  const W = area.clientWidth - pl - parseFloat(cs.paddingRight);
  const H = area.clientHeight - pt - parseFloat(cs.paddingBottom);
  if (W <= 0 || H <= 0) return;
  const r = +layer.dataset.w / +layer.dataset.h;
  const w = Math.min(W, H * r), h = w / r;
  layer.style.cssText = `left:${pl + (W - w) / 2}px;top:${pt + (H - h) / 2}px;width:${w}px;height:${h}px;`;
}

// Update gallery state in-place — no innerHTML rebuild on thumb strip
function renderGallery(pi) {
  const p = PROJECTS[pi];
  const vi = viewIndex[pi];
  const lead = p.views[vi];

  const leadArea = document.getElementById(`lead-img-${pi}`);
  if (leadArea) {
    leadArea.innerHTML = leadMediaMarkup(lead) + (lead.callouts ? calloutMarkup(lead) : '');
    if (lead.callouts) fitCallouts(leadArea);
  }

  const captionEl = document.getElementById(`lead-cap-${pi}`);
  if (captionEl) captionEl.textContent = lead.caption;
  const keyEl = document.getElementById(`lead-key-${pi}`);
  if (keyEl) {
    keyEl.innerHTML = lead.callouts ? calloutKey(lead) : '';
    keyEl.hidden = !lead.callouts;
  }

  // Update thumb borders and opacity in-place (no rebuild)
  const thumbsEl = document.getElementById(`thumbs-${pi}`);
  if (thumbsEl) {
    let activeBtn = null;
    thumbsEl.querySelectorAll('.thumb-btn').forEach((btn, i) => {
      const active = i === vi;
      if (active) activeBtn = btn;
      btn.style.borderColor = active ? 'var(--rust)' : 'var(--border)';
      const media = btn.querySelector('img, video');
      if (media) media.style.opacity = active ? '1' : '0.62';
    });
    // Below 640px the rail runs horizontally, so the selected thumbnail can
    // sit off the right edge after a swipe — the highlight would be real and
    // invisible. Nudged by hand rather than with scrollIntoView, which would
    // also scroll the page vertically to reach it.
    if (activeBtn && thumbsEl.scrollWidth > thumbsEl.clientWidth + 1) {
      const c = thumbsEl.getBoundingClientRect();
      const r = activeBtn.getBoundingClientRect();
      if (r.left < c.left + 8) thumbsEl.scrollLeft -= (c.left + 8 - r.left);
      else if (r.right > c.right - 8) thumbsEl.scrollLeft += (r.right - (c.right - 8));
    }
  }
}

// Crossfade lead image: ease-in on exit, ease-out on entry
function selectView(pi, vi) {
  viewIndex[pi] = vi;
  const leadArea = document.getElementById(`lead-img-${pi}`);
  if (leadArea && !reducedMotion) {
    leadArea.style.transition = 'opacity 70ms cubic-bezier(0.4, 0, 1, 1)';
    leadArea.style.opacity = '0';
    setTimeout(() => {
      renderGallery(pi);
      leadArea.style.transition = 'opacity 100ms cubic-bezier(0.23, 1, 0.32, 1)';
      leadArea.style.opacity = '1';
    }, 70);
  } else {
    renderGallery(pi);
  }
}

// While the viewer is open the page behind it is frozen (html.lb-open), the
// dialog takes focus, and Tab cannot leave it; closing hands focus back to
// the figure that opened it. When closed it is `inert`, so screen readers
// and Tab skip the invisible overlay. Focus goes to the dialog itself, not
// the close button, which is hidden on desktop (click anywhere closes).
let lbReturnFocus = null;
// Which project the overlay is showing, so the arrows and the arrow keys
// know what they are stepping through. null when closed.
let lbProject = null;

// Repaints the stage, caption, counter and arrows from viewIndex. Separate
// from openLightbox so stepping does not re-run the focus and inert handling.
function lbRender() {
  if (lbProject === null) return;
  const p = PROJECTS[lbProject];
  const i = viewIndex[lbProject];
  const v = p.views[i];
  const stage = document.getElementById('lightbox-media');
  stage.innerHTML = mediaTag(v, '', { eager: true });
  const el = stage.firstElementChild;
  if (el) el.classList.add('lb-media-el');
  lbResetZoom(false);
  document.getElementById('lightbox-caption').textContent = v.caption;
  const many = p.views.length > 1;
  document.getElementById('lb-count').textContent = many ? `${i + 1} / ${p.views.length}` : '';
  document.getElementById('lb-prev').hidden = !many;
  document.getElementById('lb-next').hidden = !many;
}

// Wraps, so holding one arrow cycles rather than dead-ending. Also moves the
// gallery underneath, so closing leaves the page on the figure last looked at
// instead of snapping back to wherever it was opened from.
function lbStep(d) {
  if (lbProject === null) return;
  const p = PROJECTS[lbProject];
  if (p.views.length < 2) return;
  viewIndex[lbProject] = (viewIndex[lbProject] + d + p.views.length) % p.views.length;
  lbRender();
  renderGallery(lbProject);
}

// Only the backdrop closes. The frame itself used to close on any click, which
// was fine when there was nothing in here to press; with arrows over the image
// a near-miss would have thrown away your place in a 13-figure set.
function lbBackdrop(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

function openLightbox(pi) {
  lbProject = pi;
  const stage = document.getElementById('lightbox-media');
  // Sizing moved to .lb-media-el so the mobile stage can take a definite
  // height (panning needs somewhere to pan to) without touching the desktop
  // layout, where the container still hugs the image. eager, because this
  // element is inserted at the exact moment it is needed.
  lbRender();
  const lb = document.getElementById('lightbox');
  lbReturnFocus = document.activeElement;
  lb.inert = false;
  lb.classList.add('open');
  document.documentElement.classList.add('lb-open');
  lb.focus({ preventScroll: true });
  document.addEventListener('keydown', onLbKey);
}

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  lb.classList.remove('open');
  lb.classList.remove('is-zoomed');
  lb.inert = true;
  document.documentElement.classList.remove('lb-open');
  lbZoom.scale = 1; lbZoom.tx = 0; lbZoom.ty = 0;
  document.removeEventListener('keydown', onLbKey);
  lbProject = null;
  if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus({ preventScroll: true });
  lbReturnFocus = null;
}

function onLbKey(e) {
  if (e.key === 'Escape') closeLightbox();
  // No animation on the step. A visitor comparing figures presses these
  // dozens of times in one sitting, and anything that takes time to settle
  // would be felt on every press.
  else if (e.key === 'ArrowLeft') { e.preventDefault(); lbStep(-1); }
  else if (e.key === 'ArrowRight') { e.preventDefault(); lbStep(1); }
  else if (e.key === 'Tab') {
    // Keep focus inside: the close button when shown (touch), else the dialog.
    e.preventDefault();
    const btn = document.getElementById('lb-close');
    (btn && btn.offsetParent ? btn : document.getElementById('lightbox')).focus({ preventScroll: true });
  }
}

// A value is data (mono) when it is a number with an optional unit, e.g.
// "896.3 MPa", "Ø 71.10 in", "78° → 24°". Text values such as
// "Tractor fixed-wing" or "C++" stay in the sans.
const NUMERIC_VALUE = /^[Ø−±~]?\s?\d[\d,.]*(\s?(°C|°|%|[A-Za-z]{1,4}))?(\s?→\s?\d[\d,.]*°?)?$/;
function dataValue(v) {
  return NUMERIC_VALUE.test(v) ? `<span class="data">${v}</span>` : v;
}

// ── A backdrop where a contained image leaves a gap ─────
// The cards show renders whole (object-fit: contain), so a render whose
// shape is not the frame's 3:2 leaves bands of bare card colour: the Mach
// contour, at 2.4:1, sat on a cream strip above and below. Those frames get
// the blurred, cover-fit copy of the image behind them that the project
// figures use; a render that already fills its frame gets nothing, so the
// effect never appears where there is no gap to fill. The test is in
// pixels, not ratios, and re-runs whenever the frame resizes: the same
// render can fill a card on a desktop and leave a band in the phone rail.
function fitBackdrop(img) {
  const frame = img.parentElement;
  const sync = () => {
    if (!img.naturalWidth || !frame.clientWidth) return;
    const cs = getComputedStyle(img);
    const fw = frame.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    const fh = frame.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    const r = img.naturalWidth / img.naturalHeight;
    // Empty space the contained image leaves, across its short axis.
    const gap = Math.max(fw - Math.min(fw, fh * r), fh - Math.min(fh, fw / r));
    const needs = gap > 6;
    let bd = frame.querySelector(':scope > .thumb-backdrop');
    if (needs && !bd) {
      bd = document.createElement('div');
      bd.className = 'thumb-backdrop';
      bd.setAttribute('aria-hidden', 'true');
      bd.style.backgroundImage = `url("${img.getAttribute('src')}")`;
      frame.prepend(bd);
    } else if (!needs && bd) {
      bd.remove();
    }
    frame.classList.toggle('is-letterboxed', needs);
  };
  if (img.complete) sync(); else img.addEventListener('load', sync, { once: true });
  new ResizeObserver(sync).observe(frame);
}

function buildProjectGrid() {
  const container = document.getElementById('project-grid-container');
  if (!container) return;

  function firstImage(p) {
    if (p.gridThumb) return { type: 'img', src: p.gridThumb };
    for (const v of p.views) {
      if (v.src) return { type: 'img', src: v.src };
      if (v.video) return { type: 'video', src: v.video };
    }
    return null;
  }


  // A card is the back of a trading card: the project's name, its result
  // in one sentence, the one number to remember and how it was checked.
  // Discipline tags and a sequence number used to fill this space; a
  // reviewer comparing candidates side by side reads results, not tags.
  const flagships = PROJECTS.filter(p => p.group === 'flagship');
  // The chapters live on the projects page; from anywhere else, link there.
  const chapterPage = document.getElementById('projects-container') ? '' : 'projects.html';
  container.innerHTML = flagships.map((p, ci) => {
    const media = firstImage(p);
    const isPng = media && media.src && media.src.toLowerCase().endsWith('.png');
    const imgStyle = isPng
      ? 'width:100%;height:100%;object-fit:contain;object-position:center center;display:block;padding:10px;'
      : `width:100%;height:100%;object-fit:cover;object-position:${p.gridFocus || 'center'};display:block;`;
    const thumb = media
      ? (media.type === 'video'
          ? `<video src="${media.src}" muted loop playsinline preload="metadata" style="width:100%;height:100%;object-fit:cover;display:block;"></video>`
          : `<img src="${media.src}" alt="" loading="lazy"${isPng ? ' data-fit="contain"' : ''} style="${imgStyle}">`)
      : '';
    return `
      <a class="proj-card" href="${chapterPage}#${p.anchor}" style="--ci:${ci}">
        <div class="proj-card-thumb">${thumb}</div>
        <div class="proj-card-body">
          <h3 class="proj-card-title">${p.title}</h3>
          <p class="proj-card-result">${p.result}</p>
          <div class="proj-card-key">${p.wip ? '<span class="proj-card-status">Analysis in progress</span>' : ''}<span class="proj-card-num">${dataValue(p.key.v)}</span> ${p.key.k}</div>
          <div class="proj-card-check">${p.check}</div>
        </div>
      </a>`;
  }).join('');

  const built = document.getElementById('built-list');
  if (built) {
    built.innerHTML = PROJECTS.filter(p => p.group === 'built').map(p => {
      const media = firstImage(p);
      const thumb = media && media.type === 'img'
        ? `<img src="${media.src}" alt="" loading="lazy" style="object-position:${p.gridFocus || 'center'};">`
        : '<span></span>';
      return `
        <a class="built-row" href="${chapterPage}#${p.anchor}">
          ${thumb}
          <span><strong>${p.title}</strong><span>${p.result}</span></span>
        </a>`;
    }).join('');
  }

  container.querySelectorAll('.proj-card-thumb img[data-fit="contain"]').forEach(fitBackdrop);

  if (!reducedMotion) {
    const cardEls = [...container.querySelectorAll('.proj-card')];
    cardEls.forEach((card, i) => { card.style.transitionDelay = `${i * 35 + 60}ms`; });
    const last = cardEls[cardEls.length - 1];
    last.addEventListener('transitionend', function clearStagger(e) {
      if (e.propertyName !== 'opacity') return;
      cardEls.forEach(c => c.style.transitionDelay = '');
      last.removeEventListener('transitionend', clearStagger);
    });
  }

  container.querySelectorAll('.proj-card video').forEach(v => {
    const card = v.closest('.proj-card');
    card.addEventListener('mouseenter', () => v.play().catch(() => {}));
    card.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });

  // On a phone the cards become a snap rail, and a rail needs to say how
  // far along it you are. On a desktop all four are in view and the hint
  // has nothing to report, so it stays empty.
  const hint = document.getElementById('grid-hint');
  if (hint) {
    const total = flagships.length;
    const syncHint = () => {
      if (container.scrollWidth <= container.clientWidth + 1) {
        hint.textContent = '';
        return;
      }
      const max = container.scrollWidth - container.clientWidth;
      const i = max > 0
        ? Math.min(total - 1, Math.round((container.scrollLeft / max) * (total - 1)))
        : 0;
      hint.textContent = `${i + 1} of ${total}, swipe for more`;
    };
    container.addEventListener('scroll', syncHint, { passive: true });
    window.addEventListener('resize', syncHint);
    syncHint();
  }
}

// ── Wheel on a sideways strip ──────────────────────────
// A mouse wheel only scrolls vertically, so a thumbnail strip was reachable
// only by shift+wheel, a trackpad swipe or its scrollbar, and an ordinary
// mouse over it did nothing. Over a strip, vertical wheel travel now moves
// it sideways. Three rules keep that from becoming a trap:
//  - Whatever was under the cursor when a spin began owns the whole spin
//    (see wheelGesture below). A spin that starts at a strip's end, or
//    anywhere off a strip, scrolls the page.
//  - Sideways input (trackpad swipe, shift+wheel, tilt wheel) is already
//    native, so it is left to the browser.
//  - Small deltas (trackpads, free-spinning wheels) move the strip 1:1:
//    that input is already continuous, and any easing laid over it lags the
//    finger. A notched wheel sends ~100px jumps that read as teleporting, so
//    those glide instead, with an exponential approach that retargets on
//    each notch, so a fast spin adds up rather than queueing.
// ── Who owns a spin ────────────────────────────────────
// A wheel spin is a stream of events, and deciding each one on its own let
// one spin do two things. Spun over a strip, it ran the strip to its end and
// the rest of the same spin then scrolled the page (measured: 1000px of
// unwanted page travel from one spin). Spun on the page, it scrolled until a
// strip came under the cursor, and the strip then took the wheel and
// stalled the page mid-scroll. The project figure is pinned, so the strip
// stays under the cursor while the page moves, which made both common.
//
// Nested scroll areas on macOS and iOS settle this one way, and so does
// this: whatever is under the cursor when a spin starts owns the whole
// spin. A pause of WHEEL_GAP ends the spin. Recorded on window in the
// capture phase, which runs before any strip's own listener.
const WHEEL_GAP = 300;
const wheelGesture = { t: -Infinity, owner: 'page' };
window.addEventListener('wheel', (e) => {
  if (e.timeStamp - wheelGesture.t > WHEEL_GAP) {
    // A new spin. Over a strip, the strip decides whether it wants it;
    // anywhere else the page has it.
    const onStrip = e.target instanceof Element && e.target.closest('.thumb-rail');
    wheelGesture.owner = onStrip ? 'pending' : 'page';
  }
  wheelGesture.t = e.timeStamp;
}, { capture: true, passive: true });

function wheelToHorizontal(el) {
  let target = null, raf = 0, last = 0;
  const max = () => el.scrollWidth - el.clientWidth;
  const glide = (t) => {
    const dt = last ? Math.min(64, t - last) : 16.7;
    last = t;
    const d = target - el.scrollLeft;
    const stop = () => { target = null; raf = 0; last = 0; };
    if (Math.abs(d) < 1.5) { el.scrollLeft = target; stop(); return; }
    // 24% of the gap per 60Hz frame, scaled for the real frame time, so a
    // 120Hz screen does not glide twice as fast. Settles in about 250ms.
    const before = el.scrollLeft;
    el.scrollLeft += d * (1 - Math.pow(0.76, dt / 16.7));
    // A frame that moved nothing means the strip is pinned at a limit the
    // target cannot reach: its real maximum is fractional and the target
    // was rounded. Without this the loop ran forever and dragged the strip
    // back to its end whenever anything else scrolled it.
    if (Math.abs(el.scrollLeft - before) < 0.25) { stop(); return; }
    raf = requestAnimationFrame(glide);
  };
  el.addEventListener('wheel', (e) => {
    if (e.ctrlKey) return;                                   // pinch-zoom
    if (Math.abs(e.deltaX) >= Math.abs(e.deltaY)) return;    // already sideways
    const m = max();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? el.clientWidth : 1;
    const dy = e.deltaY * unit;
    const from = target ?? el.scrollLeft;
    if (wheelGesture.owner === 'pending') {
      // First event of a spin that began on this strip: claim it only if
      // the strip can move that way. A strip that fits, or one already at
      // the end the wheel points to, hands this spin to the page.
      const canMove = m > 1 && (dy < 0 ? from > 2 : from < m - 2);
      wheelGesture.owner = canMove ? el : 'page';
    }
    if (wheelGesture.owner !== el || !e.cancelable) return;
    // Owned: every event of this spin stays on the strip, including those
    // that arrive once it has reached its end. Those do nothing, and the
    // page waits for the next spin.
    e.preventDefault();
    const next = Math.max(0, Math.min(m, from + dy));
    if (reducedMotion || Math.abs(dy) < 40) {
      if (raf) { cancelAnimationFrame(raf); raf = 0; last = 0; }
      target = null;
      el.scrollLeft = next;
      return;
    }
    target = next;
    if (!raf) raf = requestAnimationFrame(glide);
  }, { passive: false });
}

// One project's metric table. Shared by the build and by the revision
// toggle, which re-renders its own table in place.
function metricRows(values) {
  return values.map((v, ri) => `
    <div class="metric-row" style="--ri:${ri};">
      <span class="metric-k">${v.k}</span>
      <span class="metric-v${NUMERIC_VALUE.test(v.v) ? ' is-num' : ''}">${dataValue(v.v)}</span>
    </div>`).join('');
}

// The main table, minus any row the revision record carries: otherwise the
// nozzle's factor of safety appears twice, a few lines apart.
function tableValues(p) {
  if (!p.revisions) return p.values;
  const own = new Set(p.revisions.releases.flatMap(r => r.values.map(v => v.k)));
  return p.values.filter(v => !own.has(v.k));
}

// ── The revision record ────────────────────────────────
// The page's thesis is that results get revised and both versions stay on
// the record. Where a project carries a revision, the reader can switch the
// three values that changed between releases and read why. Only values the
// project actually published for each release appear; nothing is carried
// across from the other release to fill a row. Without script the project's
// own prose already states both numbers, so nothing is lost.
function revisionMarkup(p, pi) {
  const r = p.revisions;
  if (!r) return '';
  const first = r.releases.find(x => x.id === r.initial) || r.releases[0];
  return `
    <div class="rev" id="rev-${pi}">
      <div class="rev-head">
        <span class="rev-title">${r.title}</span>
        <div class="rev-toggle" role="group" aria-label="${r.title}: choose a release">
          ${r.releases.map(x => `<button type="button" data-rev="${x.id}" aria-pressed="${x.id === first.id}" onclick="setRevision(${pi},'${x.id}')">${x.tab}</button>`).join('')}
        </div>
      </div>
      <div class="rev-table" id="rev-table-${pi}" aria-live="polite">${metricRows(first.values)}</div>
      <p class="rev-note" id="rev-note-${pi}">${first.note}</p>
    </div>`;
}

function setRevision(pi, id) {
  const r = PROJECTS[pi] && PROJECTS[pi].revisions;
  const rel = r && r.releases.find(x => x.id === id);
  if (!rel) return;
  document.getElementById(`rev-table-${pi}`).innerHTML = metricRows(rel.values);
  document.getElementById(`rev-note-${pi}`).textContent = rel.note;
  document.querySelectorAll(`#rev-${pi} .rev-toggle button`).forEach(b =>
    b.setAttribute('aria-pressed', b.dataset.rev === id ? 'true' : 'false'));
  document.getElementById(`rev-${pi}`).classList.toggle('is-superseded', !!rel.superseded);
}

// Discipline tags as one plain line: "Propulsion, multiphysics and DFM".
// Acronyms and proper names keep their capitals.
// The hero figure carries the same callouts as the project it comes from.
function initCalloutFigures() {
  document.querySelectorAll('[data-callouts]').forEach(el => {
    const p = PROJECTS.find(x => x.anchor === el.dataset.callouts);
    const v = p && p.views.find(x => x.callouts);
    if (v) el.insertAdjacentHTML('beforeend', calloutMarkup(v));
  });
}

function tagLine(tags) {
  const keep = (w) => /^[A-Z0-9-]{2,}$/.test(w) || w === 'Arduino';
  const words = tags.map((t, i) => t.split(' ')
    .map((w, j) => keep(w) || (i === 0 && j === 0) ? w : w.toLowerCase()).join(' '));
  return words.length > 1 ? words.slice(0, -1).join(', ') + ' and ' + words[words.length - 1] : words[0];
}

function buildProjects() {
  const container = document.getElementById('projects-container');
  if (!container) return;
  container.innerHTML = PROJECTS.map((p, pi) => {
    const hasThumbs = p.views.length > 1;
    const splitClass = hasThumbs ? 'gallery-split' : 'gallery-split no-thumbs';
    const thumbsHtml = hasThumbs ? `
      <div id="thumbs-${pi}" class="thumb-rail">
        ${p.views.map((v, i) => `
          <button type="button" class="thumb-btn" onclick="selectView(${pi},${i})">
            <div style="height:62px;display:grid;place-items:center;overflow:hidden;">
              ${mediaTag(v, `width:100%;height:62px;opacity:${i === 0 ? 1 : 0.62};`, { autoplay: false })}
            </div>
            <span style="font-family:var(--font-sans);font-size:var(--fs-micro);color:var(--muted-2);line-height:1.3;">${v.label}</span>
          </button>`).join('')}
      </div>` : '';

    // The stage: the figure and its thumbnails, held in place on a desktop
    // while the reading column beside it carries the heading, the prose and
    // the numbers. Before, the figure sat under the text and the two scrolled
    // apart, so the contour plot had left the screen by the time a reader
    // reached the factor of safety it supports. It comes first in source so
    // it takes the left column; on a phone the reading column is moved above
    // it with `order`, which keeps the stacked layout that was already there.
    // The three hand builds sit under their own heading after the four
    // analyses, and all three light the one "Built by hand" link in the nav.
    const isBuilt = p.group === 'built';
    const groupHead = isBuilt && PROJECTS[pi - 1] && PROJECTS[pi - 1].group !== 'built' ? `
    <div id="built" data-section="built" class="built-head section-reveal">
      <h2 class="section-title">Built by hand</h2>
      <p class="section-lede">Three projects where the drawing became a thing on a bench: a foam-board UAV, a carved rotor and a servo-driven wing section.</p>
    </div>` : '';
    const repoHtml = p.repo
      ? `<a href="${p.repo}" class="proj-repo">Full working on GitHub</a>`
      : `<p class="proj-repo-note">${p.repoNote || 'A hardware build, so there is no repository.'}</p>`;
    // Answer first: the name, the result in a sentence, the numbers that
    // prove it, then the story in four labelled parts a skimmer can read by
    // their labels alone. The hand builds keep their single paragraph.
    const readHtml = p.group === 'flagship' ? `
          <div class="proj-metrics">${metricRows(tableValues(p))}</div>
          ${revisionMarkup(p, pi)}
          <dl class="proj-layers">${p.layers.map(([h, t]) => `<dt>${h}</dt><dd>${t}</dd>`).join('')}</dl>` : `
          <p class="proj-story">${p.story}</p>
          <div class="proj-metrics">${metricRows(tableValues(p))}</div>`;
    return groupHead + `
    <section id="${p.anchor}" data-section="${isBuilt ? 'built' : p.anchor}" class="section-reveal proj-section">
      <div class="proj-split">

        <div class="proj-stage">
          <div class="${splitClass}">
            <button type="button" class="lead-btn" onclick="openLightbox(${pi})" title="Click to enlarge">
              <div id="lead-img-${pi}" class="lead-media-area" style="display:block;background:var(--surface);min-height:0;overflow:hidden;box-sizing:border-box;"></div>
              <div class="lead-cap-row">
                <span id="lead-cap-${pi}" class="lead-cap"></span>
                <span class="lead-enlarge">⤢ Enlarge${p.views.length > 1 ? `, ${p.views.length} figures` : ''}</span>
              </div>
            </button>
            <ol id="lead-key-${pi}" class="callout-key" hidden></ol>
            ${thumbsHtml}
          </div>
        </div>

        <div class="proj-read">
          <p class="proj-tags">${p.wip ? '<span class="proj-status">Analysis in progress.</span> ' : ''}${tagLine(p.kicker)}</p>
          <h2 class="proj-title">${p.title}</h2>
          <p class="proj-result">${p.result}</p>
          ${readHtml}
          ${repoHtml}
        </div>

      </div>
    </section>`;
  }).join('');

  PROJECTS.forEach((_, pi) => renderGallery(pi));

  // A lead box letterboxes its figure, so callouts are re-laid whenever the
  // box changes size.
  PROJECTS.forEach((p, pi) => {
    if (!p.views.some(v => v.callouts)) return;
    const area = document.getElementById(`lead-img-${pi}`);
    if (area && 'ResizeObserver' in window) new ResizeObserver(() => fitCallouts(area)).observe(area);
  });

  // Same edge-fade language as the nav strip, so a horizontally scrollable
  // row always looks like one.
  container.querySelectorAll('.thumb-rail').forEach(rail => {
    const sync = () => {
      const max = rail.scrollWidth - rail.clientWidth;
      rail.classList.toggle('fade-l', max > 1 && rail.scrollLeft > 4);
      rail.classList.toggle('fade-r', max > 1 && rail.scrollLeft < max - 4);
    };
    rail.addEventListener('scroll', sync, { passive: true });
    window.addEventListener('resize', sync);
    sync();
    wheelToHorizontal(rail);
  });

  // Thumbnail-strip videos are muted previews, not the active view — play only
  // on intent (hover), same pattern already used for the overview-grid cards.
  container.querySelectorAll('.thumb-btn video').forEach(v => {
    const btn = v.closest('.thumb-btn');
    btn.addEventListener('mouseenter', () => v.play().catch(() => {}));
    btn.addEventListener('mouseleave', () => { v.pause(); v.currentTime = 0; });
  });

  // Swipe the lead image between views. The arrows-and-thumbnails model is
  // intact; this is the gesture a thumb reaches for first.
  PROJECTS.forEach((p, pi) => {
    if (p.views.length < 2) return;
    const area = document.getElementById(`lead-img-${pi}`);
    const btn = area && area.closest('.lead-btn');
    if (!btn) return;
    const step = (d) => selectView(pi, (viewIndex[pi] + d + p.views.length) % p.views.length);
    attachSwipe(btn, () => step(-1), () => step(1));
  });
}

// Hand-drawn brand marks for tools simple/iconic enough to reproduce
// accurately from memory (see RASTER_LOGOS below for real vendor artwork,
// and toolChip() for the plain monogram badge used when neither exists).
const TOOL_ICONS = {
  python: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#3776AB" d="M11.9 1.5c-1 0-1.9.1-2.7.3-2.4.4-2.8 1.3-2.8 3v2.2h5.6v.7H4.3c-1.7 0-3.2 1-3.7 3-.6 2.2-.6 3.6 0 5.9.5 1.7 1.4 3 3.1 3h2v-2.6c0-1.9 1.7-3.6 3.7-3.6h5.6c1.6 0 2.9-1.3 2.9-3V4.8c0-1.6-1.4-2.8-2.9-3.1-1-.2-2-.3-2.9-.2z"/><path fill="#FFD43B" d="M12.1 22.5c1 0 1.9-.1 2.7-.3 2.4-.4 2.8-1.3 2.8-3v-2.2h-5.6v-.7h7.7c1.7 0 3.2-1 3.7-3 .6-2.2.6-3.6 0-5.9-.5-1.7-1.4-3-3.1-3h-2v2.6c0 1.9-1.7 3.6-3.7 3.6H9c-1.6 0-2.9 1.3-2.9 3v5.1c0 1.6 1.4 2.8 2.9 3.1 1 .2 2 .3 2.9.2z"/></svg>`,
  git: `<svg viewBox="0 0 24 24" width="16" height="16"><path fill="#F05133" d="M21.7 11.1L12.9 2.3a1.1 1.1 0 0 0-1.6 0L9.4 4.2l2.4 2.4a1.3 1.3 0 0 1 1.6 1.6l2.3 2.3a1.3 1.3 0 1 1-.8.8L12.6 9v6a1.3 1.3 0 1 1-1.1 0V8.9a1.3 1.3 0 0 1-.7-1.7L8.4 4.8 2.3 10.9a1.1 1.1 0 0 0 0 1.6l8.8 8.8a1.1 1.1 0 0 0 1.6 0l8.9-8.9a1.1 1.1 0 0 0 .1-1.3z"/></svg>`,
  jupyter: `<svg viewBox="0 0 24 24" width="16" height="16"><circle cx="12" cy="5" r="3" fill="#F37626"/><circle cx="5" cy="17" r="3" fill="#9E9E9E"/><circle cx="19" cy="17" r="3" fill="#616161"/></svg>`,
  cpp: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="5" fill="#00599C"/><text x="12" y="16" font-family="Arial,sans-serif" font-size="9" font-weight="700" fill="#fff" text-anchor="middle">C++</text></svg>`,
  excel: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="5" fill="#217346"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">X</text></svg>`,
  powerbi: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="5" fill="#F2C811"/><rect x="6" y="13" width="3" height="6" fill="#000"/><rect x="10.5" y="9" width="3" height="10" fill="#000"/><rect x="15" y="5" width="3" height="14" fill="#000"/></svg>`,
  msproject: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="5" fill="#31752F"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">P</text></svg>`,
  m365: `<svg viewBox="0 0 24 24" width="16" height="16"><rect width="24" height="24" rx="5" fill="#D83B01"/><text x="12" y="17" font-family="Arial,sans-serif" font-size="12" font-weight="700" fill="#fff" text-anchor="middle">M</text></svg>`,
};

// User-supplied vendor logo images (project/logos/*). Sized to a fixed
// height with auto width via object-fit:contain, not forced into the same
// 18x18 square as the hand-drawn icons above — a wordmark logo (CATIA,
// XFOIL) would be squashed illegible in a tiny square. `bg` matches each
// file's own flattened background (white for most, native black for
// XFOIL's banner, transparent for OpenFOAM's real alpha PNG) so none of
// them show a mismatched box in dark mode — checked each file's actual
// corner pixel before choosing.
const RASTER_LOGOS = {
  solidworks: { src: 'logos/solidworks.jpg', bg: '#fff' },
  catia:      { src: 'logos/catia.png',      bg: '#fff' },
  ansys:      { src: 'logos/ansys.png',      bg: '#fff' },
  openfoam:   { src: 'logos/open-foam.png',  bg: 'transparent' },
  xfoil:      { src: 'logos/xfoil.gif',      bg: '#000' },
  originlab:  { src: 'logos/origin-lab.jpg', bg: '#fff' },
  matlab:     { src: 'logos/matlab.png',     bg: 'transparent' },
};

// Grouped by the stage of the work a tool serves, in the order a project
// moves through them: geometry, analysis, computation, then reporting.
const TOOL_GROUPS = [
  { id: 'cad',  label: 'CAD & drafting' },
  { id: 'sim',  label: 'Simulation (CFD & FEA)' },
  { id: 'code', label: 'Programming & data' },
  { id: 'pm',   label: 'Planning & reporting' },
];

const TOOLS = [
  { name: 'SolidWorks', cat: 'cad', raster: 'solidworks' },
  { name: 'CATIA V6', cat: 'cad', raster: 'catia' },
  { name: 'ANSYS Fluent', cat: 'sim', raster: 'ansys' },
  { name: 'ANSYS Mechanical', cat: 'sim', raster: 'ansys' },
  { name: 'CalculiX / PrePoMax', cat: 'sim', initials: 'CX' },
  { name: 'OpenFOAM', cat: 'sim', raster: 'openfoam' },
  { name: 'XFOIL', cat: 'sim', raster: 'xfoil' },
  { name: 'SpaceClaim', cat: 'cad', raster: 'ansys' },
  { name: 'DFM', cat: 'cad', initials: 'DFM' },
  { name: 'Python', cat: 'code', icon: 'python' },
  { name: 'MATLAB', cat: 'code', raster: 'matlab' },
  { name: 'C++', cat: 'code', icon: 'cpp' },
  { name: 'Jupyter', cat: 'code', icon: 'jupyter' },
  { name: 'OriginLab', cat: 'code', raster: 'originlab' },
  { name: 'Git', cat: 'code', icon: 'git' },
  { name: 'MS Project', cat: 'pm', icon: 'msproject' },
  { name: 'Microsoft 365', cat: 'pm', icon: 'm365' },
  { name: 'Excel', cat: 'pm', icon: 'excel' },
  { name: 'Power BI', cat: 'pm', icon: 'powerbi' },
];

function toolChip(t) {
  let icon;
  if (t.raster) {
    const { src, bg } = RASTER_LOGOS[t.raster];
    icon = `<span style="display:inline-flex;align-items:center;justify-content:center;height:20px;padding:2px 4px;border-radius:4px;background:${bg};border:1px solid var(--border);flex-shrink:0;"><img src="${src}" alt="" loading="lazy" style="height:100%;width:auto;max-width:56px;object-fit:contain;display:block;"></span>`;
  } else if (t.icon) {
    icon = TOOL_ICONS[t.icon];
  } else {
    icon = `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:18px;height:18px;padding:0 3px;border-radius:4px;background:var(--bg);border:1px solid var(--border);font-family:var(--font-sans);font-size:var(--fs-micro);font-weight:600;letter-spacing:0.02em;color:var(--muted-2);flex-shrink:0;">${t.initials}</span>`;
  }
  return `<span class="tool-pill">${icon}${t.name}</span>`;
}

function buildSoftware() {
  const list = document.getElementById('software-list');
  if (!list) return;
  list.innerHTML = TOOL_GROUPS.map(g => `
    <div class="tool-group">
      <div class="tool-group-label">${g.label}</div>
      <div class="tool-group-pills">${TOOLS.filter(t => t.cat === g.id).map(toolChip).join('')}</div>
    </div>`).join('');
}

function initNav() {
  const navScroll = document.getElementById('nav-scroll');

  // ── The phone's section menu ───────────────────────────
  // The button is built here rather than written into the markup so a page
  // whose script never runs keeps the horizontal strip it has always had,
  // rather than a dead control over a hidden panel.
  const nav = navScroll ? navScroll.closest('nav') : null;
  let menuBtn = null, menuLabel = null;
  const closeMenu = () => {
    if (!nav) return;
    nav.classList.remove('nav-open');
    if (menuBtn) menuBtn.setAttribute('aria-expanded', 'false');
  };
  if (nav && navScroll) {
    menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'nav-menu-btn';
    menuBtn.setAttribute('aria-controls', 'nav-scroll');
    menuBtn.setAttribute('aria-expanded', 'false');
    menuBtn.innerHTML = '<span class="nav-menu-label">Jump to a section</span>'
      + '<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor"'
      + ' stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">'
      + '<path d="m6 9 6 6 6-6"/></svg>';
    navScroll.parentNode.insertBefore(menuBtn, navScroll);
    menuLabel = menuBtn.querySelector('.nav-menu-label');
    nav.classList.add('nav-collapsed');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    // Closed by choosing a destination, tapping away, or Escape.
    navScroll.addEventListener('click', (e) => { if (e.target.closest('a')) closeMenu(); });
    document.addEventListener('click', (e) => {
      if (nav.classList.contains('nav-open') && !nav.contains(e.target)) closeMenu();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('nav-open')) { closeMenu(); menuBtn.focus(); }
    });
  }

  // Fade only the side that actually has more content. A permanent right-hand
  // fade dims a fully-visible last link, and keeps promising more once you
  // have already reached the end.
  const syncNavScrollHint = () => {
    if (!navScroll) return;
    const max = navScroll.scrollWidth - navScroll.clientWidth;
    navScroll.classList.toggle('fade-l', max > 1 && navScroll.scrollLeft > 4);
    navScroll.classList.toggle('fade-r', max > 1 && navScroll.scrollLeft < max - 4);
  };

  // The strip is 853px of links inside a 339px window on a phone, so the
  // active chip — the nav's only state indicator — was usually off-screen.
  // Nudge it back into view, but only when it has actually moved out: never
  // fight a visitor who is scrolling the strip themselves. scrollIntoView is
  // deliberately avoided here, since it walks every scrollable ancestor and
  // would yank the page vertically as a side effect.
  const revealActive = (el) => {
    if (!navScroll || !el) return;
    const pad = 20;
    const c = navScroll.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    if (r.left < c.left + pad) navScroll.scrollLeft -= (c.left + pad - r.left);
    else if (r.right > c.right - pad) navScroll.scrollLeft += (r.right - (c.right - pad));
  };

  let lastActive = null;
  let raf = null;
  const syncNav = () => {
    const mid = window.innerHeight * 0.42;
    let best = null, bestScore = -Infinity, firstTop = Infinity;
    document.querySelectorAll('[data-section]').forEach(s => {
      const r = s.getBoundingClientRect();
      firstTop = Math.min(firstTop, r.top);
      const score = (r.top <= mid && r.bottom >= mid) ? Infinity : -Math.abs(r.top - mid);
      if (score > bestScore) { bestScore = score; best = s.getAttribute('data-section'); }
    });
    // Above the first section (the hero and the project grid, which is where
    // the home button lands) nothing is current, so no chip is lit. Without
    // this the nearest section, 01 Bracket, stayed highlighted on the hero.
    if (mid < firstTop) best = null;
    // A short last section never reaches the trigger line, because the page
    // ends first: the home page's contact footer stayed unlit at the bottom.
    // Scrolled to the end, the last section is the current one.
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      best = sections[sections.length - 1].getAttribute('data-section');
    }
    let activeEl = null;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const on = a.getAttribute('data-nav') === best;
      a.classList.toggle('active', on);
      if (on) activeEl = a;
    });
    // On a phone the bar is the only thing naming where you are, so it says so
    // in words instead of relying on a chip that may be off-screen.
    if (menuLabel) {
      const here = document.querySelector('.nav-page[aria-current="page"]');
      const next = activeEl ? activeEl.textContent.trim()
        : (document.querySelector('[data-nav]') ? 'Jump to a section' : (here ? here.textContent.trim() : 'Menu'));
      if (menuLabel.textContent !== next) menuLabel.textContent = next;
    }
    if (best !== lastActive) {
      lastActive = best;
      // Back on the hero: return the strip to its start so 01 is in view.
      if (best === null && navScroll) navScroll.scrollLeft = 0;
      else revealActive(activeEl);
    }
  };
  const onScroll = () => {
    if (raf) return;
    raf = requestAnimationFrame(() => { raf = null; syncNav(); });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => { onScroll(); syncNavScrollHint(); });
  if (navScroll) navScroll.addEventListener('scroll', syncNavScrollHint, { passive: true });
  syncNav();
  syncNavScrollHint();
}

// ── Horizontal swipe ───────────────────────────────────
// Every stepper on this page (both carousels, the project gallery) was
// arrows-and-dots only: correct with a mouse, and nothing a thumb would ever
// try. Distance OR velocity decides, so a quick flick does not have to cross
// half the element. The axis is locked on the first 10px of travel and pan-y
// leaves vertical scrolling to the browser, so the page never feels sticky.
function attachSwipe(el, onPrev, onNext) {
  if (!el) return;
  el.classList.add('swipe-x');
  let id = null, x0 = 0, y0 = 0, t0 = 0, axis = null, swiped = false;

  el.addEventListener('pointerdown', (e) => {
    if (id !== null) return;                // a second finger mid-swipe would jump
    if (e.pointerType === 'mouse') return;  // a mouse has the arrows
    id = e.pointerId; x0 = e.clientX; y0 = e.clientY; t0 = e.timeStamp; axis = null;
  }, { passive: true });

  el.addEventListener('pointermove', (e) => {
    if (e.pointerId !== id || axis === 'y') return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (axis === null && Math.abs(dx) + Math.abs(dy) > 10) {
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x') { try { el.setPointerCapture(id); } catch (_) {} }
    }
  }, { passive: true });

  const end = (e) => {
    if (e.pointerId !== id) return;
    const dx = e.clientX - x0;
    const v = Math.abs(dx) / Math.max(1, e.timeStamp - t0);
    if (axis === 'x' && (Math.abs(dx) > 45 || v > 0.11)) {
      swiped = true;
      (dx < 0 ? onNext : onPrev)();
    }
    id = null; axis = null;
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', () => { id = null; axis = null; });

  // A swipe that started on a button (the gallery lead opens the lightbox)
  // still ends in a click. Swallow exactly that one.
  el.addEventListener('click', (e) => {
    if (!swiped) return;
    swiped = false;
    e.preventDefault();
    e.stopPropagation();
  }, true);
}

// ── Lightbox pan and zoom ──────────────────────────────
// Enlarge gave the image 329px on a 390px phone where the inline figure
// already had 337px — a gain factor of 0.98. Contours and GD&T callouts are
// the whole point of the page, so on a touch device the lightbox is now a
// real viewer: pinch, double-tap and drag. Fine pointers keep the existing
// click-anywhere-to-close behaviour untouched.
const lbZoom = { scale: 1, tx: 0, ty: 0 };

function lbEl() {
  const stage = document.getElementById('lightbox-media');
  return stage ? stage.firstElementChild : null;
}

function lbApply(settle) {
  const el = lbEl();
  if (!el) return;
  el.classList.toggle('settling', !!settle);
  el.style.transform = (lbZoom.scale === 1 && !lbZoom.tx && !lbZoom.ty)
    ? ''
    : 'translate(' + lbZoom.tx + 'px, ' + lbZoom.ty + 'px) scale(' + lbZoom.scale + ')';
  document.getElementById('lightbox').classList.toggle('is-zoomed', lbZoom.scale > 1.01);
}

function lbClamp() {
  const el = lbEl();
  if (!el) return;
  const s = lbZoom.scale;
  // transform-origin is 0 0 and the element fills the stage at scale 1, so the
  // pan range is exactly the overhang the scale created.
  lbZoom.tx = Math.min(0, Math.max(el.offsetWidth * (1 - s), lbZoom.tx));
  lbZoom.ty = Math.min(0, Math.max(el.offsetHeight * (1 - s), lbZoom.ty));
}

function lbSetScale(next, px, py) {
  const el = lbEl();
  if (!el) return;
  const s0 = lbZoom.scale;
  const s1 = Math.min(5, Math.max(1, next));
  // Keep the point under the fingers pinned: content coord c = (p - t) / s.
  lbZoom.tx = px - ((px - lbZoom.tx) / s0) * s1;
  lbZoom.ty = py - ((py - lbZoom.ty) / s0) * s1;
  lbZoom.scale = s1;
  lbClamp();
}

function lbResetZoom(settle) {
  lbZoom.scale = 1; lbZoom.tx = 0; lbZoom.ty = 0;
  lbApply(settle);
}

function initLightboxZoom() {
  const stage = document.getElementById('lightbox-media');
  const closeBtn = document.getElementById('lb-close');
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  [['lb-prev', -1], ['lb-next', 1]].forEach(([id, d]) => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); lbStep(d); });
  });
  if (!stage || !window.PointerEvent) return;

  const coarse = window.matchMedia('(pointer: coarse)');
  const pts = new Map();
  let base = null, lastTap = 0, dragged = false;

  const local = (e) => {
    const r = stage.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  };
  const centroid = () => {
    const a = Array.from(pts.values());
    return {
      x: a.reduce((t, q) => t + q.x, 0) / a.length,
      y: a.reduce((t, q) => t + q.y, 0) / a.length
    };
  };
  const spread = () => {
    const a = Array.from(pts.values());
    return Math.hypot(a[0].x - a[1].x, a[0].y - a[1].y);
  };

  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    pts.set(e.pointerId, local(e));
    dragged = false;
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    base = (pts.size === 2)
      ? { d: spread(), s: lbZoom.scale, pinch: true }
      : { s: lbZoom.scale, tx: lbZoom.tx, ty: lbZoom.ty, p: local(e), t: e.timeStamp };
  });

  stage.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId) || !base) return;
    pts.set(e.pointerId, local(e));
    if (pts.size >= 2 && base.pinch) {
      const c = centroid();
      lbSetScale(base.s * (spread() / base.d), c.x, c.y);
      dragged = true;
    } else if (pts.size === 1 && lbZoom.scale > 1.01) {
      const q = local(e);
      lbZoom.tx = base.tx + (q.x - base.p.x);
      lbZoom.ty = base.ty + (q.y - base.p.y);
      lbClamp();
      if (Math.abs(q.x - base.p.x) + Math.abs(q.y - base.p.y) > 6) dragged = true;
    } else if (pts.size === 1) {
      // Not zoomed: the same drag means "next figure" rather than "pan".
      // Tracked here only so the release knows it was a drag and not a tap;
      // nothing moves under the finger, because the step itself is instant.
      const q = local(e);
      if (Math.abs(q.x - base.p.x) > 10) dragged = true;
      return;
    } else {
      return;
    }
    lbApply(false);
  });

  const lift = (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pts.size === 1) {
      // Second finger lifted mid-pinch — re-anchor rather than let it jump.
      const only = Array.from(pts.keys())[0];
      base = { s: lbZoom.scale, tx: lbZoom.tx, ty: lbZoom.ty, p: pts.get(only) };
      return;
    }
    if (pts.size) return;
    const start = base;
    base = null;
    if (lbZoom.scale < 1.02) lbResetZoom(true);

    // Same thresholds as attachSwipe elsewhere on the page: distance OR
    // velocity, so a flick does not have to cross the whole figure.
    if (dragged && start && start.p && lbZoom.scale < 1.02) {
      const dx = local(e).x - start.p.x;
      const v = Math.abs(dx) / Math.max(1, e.timeStamp - (start.t || e.timeStamp));
      if (Math.abs(dx) > 45 || v > 0.11) { lbStep(dx < 0 ? 1 : -1); return; }
    }

    if (!dragged) {
      const now = e.timeStamp;
      if (now - lastTap < 300) {
        const q = local(e);
        if (lbZoom.scale > 1.01) lbResetZoom(true);
        else { lbSetScale(2.6, q.x, q.y); lbApply(true); }
        lastTap = 0;
      } else {
        lastTap = now;
      }
    }
  };
  stage.addEventListener('pointerup', lift);
  stage.addEventListener('pointercancel', lift);

  // On a coarse pointer a tap on the picture is the first half of a
  // double-tap, so it must not also close the overlay — the backdrop and the
  // close button do that. Fine pointers keep click-anywhere-to-close as it was.
  stage.addEventListener('click', (e) => { if (coarse.matches) e.stopPropagation(); });
}

// Project sections are built by buildProjects() on DOMContentLoaded, so the
// browser resolves a deep link like /#p-rotor while its target still doesn't
// exist and silently leaves the visitor on the hero. Re-apply the fragment
// once the sections are in the DOM, then once more after load in case late
// images shifted the target — but never after the visitor has taken over.
function initHashTarget() {
  const id = decodeURIComponent(location.hash.slice(1));
  if (!id) return;
  let taken = false;
  const takeOver = () => { taken = true; };
  const jump = () => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'instant', block: 'start' });
  };
  jump();
  ['wheel', 'touchstart', 'keydown'].forEach(ev =>
    window.addEventListener(ev, takeOver, { passive: true, once: true }));
  window.addEventListener('load', () => { if (!taken) jump(); }, { once: true });
}

// Home button: its centre sits on the midpoint between the nav bar's left
// edge and the left edge of the "01 Bracket" chip, measured live. The CSS
// margins already give that on screens up to ~1350px, where the bar's edge
// is the screen edge; wider, the links sit in a centred 1240px column and
// this shift is what carries the button to the true midpoint. Uses the
// `translate` property, not `transform`, so the :active press scale still
// applies. The chip's resting position is used (scrollLeft added back), so
// swiping the link strip on a phone does not drag the button.
function initNavHome() {
  const nav = document.querySelector('nav');
  const home = document.getElementById('nav-home');
  const strip = document.getElementById('nav-scroll');
  const first = strip && strip.querySelector('.nav-link');
  if (!nav || !home || !first) return;
  const place = () => {
    home.style.translate = '';
    // Below 640px the strip is a closed panel (display:none), so the first
    // chip has no box and the midpoint arithmetic would resolve against zero
    // and throw the button across the bar. Nothing to centre against: leave it.
    if (!first.getClientRects().length) return;
    const edge = nav.getBoundingClientRect().left;
    const chip = first.getBoundingClientRect().left + strip.scrollLeft;
    const h = home.getBoundingClientRect();
    const dx = (edge + chip) / 2 - (h.left + h.width / 2);
    if (Math.abs(dx) > 0.25) home.style.translate = `${dx.toFixed(2)}px 0`;
  };
  new ResizeObserver(place).observe(nav);
  place();
}

// In-page links (nav chips, home, "see the projects", contact) always
// scroll, whatever the distance. The browser's own smooth scroll gets slower
// the further it goes (~7,000px from About back to the top), which is why
// long jumps used to be instant. This animation takes 300ms plus 0.06ms per
// pixel, capped at 900ms, so the longest trip still reads as a scroll but
// never drags. The target is re-measured every frame (late images can shift
// layout), and a wheel, touch or key press hands control back at once.
// Reduced motion keeps the browser default, which is then an instant jump.
function initAnchorScroll() {
  let run = 0;
  // ease-out, not ease-in-out. The in half of a cubic holds the page still
  // through the opening frames, which is exactly when the eye is on it.
  const ease = (t) => 1 - Math.pow(1 - t, 3);
  const stop = () => { run++; };
  ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, stop, { passive: true }));
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || reducedMotion) return;
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    const el = document.getElementById(decodeURIComponent(href.slice(1)));
    if (!el) return;
    e.preventDefault();
    history.pushState(null, '', href);
    // Layout position from the offsetTop chain, not getBoundingClientRect:
    // sections slide up 10px as they reveal, and a rect taken mid-slide
    // landed the page 10px short once the slide finished.
    const targetY = () => {
      let y = 0;
      for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const max = document.scrollingElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(max, y - margin));
    };
    const from = window.scrollY;
    // Was min(900, 300 + dist * 0.06), which put About 856ms away and made
    // the furthest targets the slowest to arrive — backwards, since those are
    // the ones a lost visitor reaches for. Navigation is the most repeated
    // action on the page, so it stays inside the 300ms-ish band and the
    // distance term only breaks the tie between a short hop and a long one.
    const dur = Math.min(400, 240 + Math.abs(targetY() - from) * 0.02);
    const id = ++run;
    const t0 = performance.now();
    const frame = (now) => {
      if (id !== run) return;
      const k = Math.min(1, (now - t0) / dur);
      window.scrollTo({ top: from + (targetY() - from) * ease(k), behavior: 'instant' });
      if (k < 1) requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  });
}

function initReveal() {
  // Tells the head-script failsafe that reveals are under control; without
  // this the .js-reveal class is withdrawn after 3s and everything shows.
  window.__revealReady = true;
  if (reducedMotion) {
    document.querySelectorAll('.section-reveal').forEach(el => el.classList.add('visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.06, rootMargin: '0px 0px -40px 0px' });
  document.querySelectorAll('.section-reveal').forEach(el => obs.observe(el));

  // A hash landing scrolls the page immediately after this runs, and images
  // without intrinsic size settle later still, so don't rely solely on the
  // observer's first delivery agreeing with the final layout — sweep whatever
  // is on screen once the page has actually loaded.
  const sweep = () => {
    document.querySelectorAll('.section-reveal:not(.visible)').forEach(el => {
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('visible');
    });
  };
  window.addEventListener('load', sweep, { once: true });
}

// Node graph for the "beyond the desk" interests: centre, category hubs,
// and each interest wired only to its own hub.
function initHobbyGraph() {
  // A small "network" of interests, after a citation-graph look: one
  // centre, five category hubs on a ring, each interest fanned out from its
  // hub. Hover (or touch) an
  // interest to light its path back to the centre; the pointer still nudges
  // nearby nodes, and faint signals travel the edges while it is on screen.
  const wrap = document.getElementById('hobby-graph');
  const canvas = document.getElementById('hobby-graph-canvas');
  if (!wrap || !canvas) return;
  const ctx = canvas.getContext('2d');

  const GROUPS = [
    { label: 'Sport',    items: ['Running', 'Tennis', 'Bouldering', 'Snowboarding', 'Basketball'] },
    { label: 'Outdoors', items: ['Hiking', 'Backpack travel'] },
    { label: 'Music',    items: ['Piano', 'Guitar', 'Saxophone'] },
    { label: 'Tech',     items: ['Quadcopter build', 'Cybersecurity', 'Gaming'] },
    { label: 'Culture',  items: ['Fragrance collecting', 'Dystopian films'] },
  ];
  // Colours come from the page's own tokens, so the graph follows the
  // theme: rust on warm white in light, sky on navy in dark.
  const rgb = (hex) => {
    const h = hex.trim().replace('#', '');
    const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    return [0, 2, 4].map(i => parseInt(f.slice(i, i + 2), 16)).join(',');
  };
  let C;
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    C = {
      edge: rgb(v('--rust')),
      accent: v('--rust'),
      node: v('--muted'),
      hot: v('--ink'),
      surface: v('--surface'),
      label: v('--ink'),
      labelDim: `rgba(${rgb(v('--muted-2'))},0.45)`,
      hub: v('--rust'),
    };
  }
  readColors();
  const FONT = getComputedStyle(document.documentElement).getPropertyValue('--font-sans');

  // Seeded RNG: the same jitter, and the same drawing, on every visit.
  const seeded = (k) => () => { k = k + 0x6D2B79F5 | 0; let t = Math.imul(k ^ k >>> 15, 1 | k); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };
  const rand = seeded(7);

  // Centre -> category hub -> that category's interests. No other edges.
  const nodes = [];
  const edges = [];
  const add = (n) => { n.x = n.y = n.ax = n.ay = 0; n.vx = n.vy = 0; nodes.push(n); return nodes.length - 1; };
  const centre = add({ kind: 'centre', r: 5 });
  const interests = [];
  GROUPS.forEach((g) => {
    g.hub = add({ kind: 'hub', label: g.label, r: 0 });
    edges.push({ a: centre, b: g.hub, w: 1 });
    g.ids = g.items.map((label) => {
      const i = add({ kind: 'interest', label, hub: g.hub, r: 3.6 });
      edges.push({ a: g.hub, b: i, w: 0.8 });
      interests.push(i);
      return i;
    });
  });
  // Wide panels split the categories either side of the centre; narrow ones
  // (phones) run a single column with every label on the right.
  const LEFT = GROUPS.filter(g => g.label === 'Sport' || g.label === 'Tech');
  const RIGHT = GROUPS.filter(g => !LEFT.includes(g));

  // A hub is drawn as a chip carrying its category name, so the name is the
  // node and its own lines end under it. Interest labels sit left (L) or
  // right (R) of the dot, always on the side facing away from the hub.
  const labelW = {};
  function labelBox(n) {
    const w = labelW[n.label], x = n.ax, y = n.ay;
    if (n.kind === 'interest') return n.side === 'L' ? [x - w - 11, y - 8, x - 5, y + 8] : [x + 5, y - 8, x + w + 11, y + 8];
    if (n.kind === 'hub') return [x - w / 2 - 7, y - 9, x + w / 2 + 7, y + 9];
    return null;
  }
  const grow = (r, m) => [r[0] - m, r[1] - m, r[2] + m, r[3] + m];
  const boxesMeet = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
  // Segment p-q against a rectangle (Liang-Barsky clip).
  function segHitsBox(px, py, qx, qy, r) {
    let t0 = 0, t1 = 1;
    const dx = qx - px, dy = qy - py;
    const clip = (p, q) => {
      if (p === 0) return q >= 0;
      const t = q / p;
      if (p < 0) { if (t > t1) return false; if (t > t0) t0 = t; } else { if (t < t0) return false; if (t < t1) t1 = t; }
      return true;
    };
    return clip(-dx, px - r[0]) && clip(dx, r[2] - px) && clip(-dy, py - r[1]) && clip(dy, r[3] - py);
  }
  function distToSeg(x, y, A, B) {
    const dx = B.ax - A.ax, dy = B.ay - A.ay;
    const u = Math.max(0, Math.min(1, ((x - A.ax) * dx + (y - A.ay) * dy) / (dx * dx + dy * dy || 1)));
    return Math.hypot(x - A.ax - u * dx, y - A.ay - u * dy);
  }
  const orient = (A, B, P) => (B.ax - A.ax) * (P.ay - A.ay) - (B.ay - A.ay) * (P.ax - A.ax);
  const segsCross = (A, B, P, Q) => orient(A, B, P) * orient(A, B, Q) < 0 && orient(P, Q, A) * orient(P, Q, B) < 0;

  // Number of collisions in the current anchors: a label or chip over a
  // line it does not belong to, over a dot or another label; a dot on a
  // line it is not part of; two lines crossing; anything outside the panel
  // or under the corner hint.
  let W = 0, H = 0, hint = null;
  function collisions() {
    let bad = 0;
    const boxes = nodes.map(labelBox);
    nodes.forEach((n, i) => {
      if (n.ax < 8 || n.ax > W - 8 || n.ay < 8 || n.ay > H - 8) bad++;
      const b = boxes[i];
      if (!b) return;
      if (b[0] < 4 || b[2] > W - 4 || b[1] < 4 || b[3] > H - 4) bad++;
      if (hint && boxesMeet(b, hint)) bad++;
      const g = grow(b, 3);
      edges.forEach(e => {
        if (n.kind === 'hub' && (e.a === i || e.b === i)) return;
        const A = nodes[e.a], B = nodes[e.b];
        if (segHitsBox(A.ax, A.ay, B.ax, B.ay, g)) bad++;
      });
      nodes.forEach((m, j) => {
        if (j !== i && m.kind !== 'hub' && boxesMeet(grow(b, m.r + 3), [m.ax, m.ay, m.ax, m.ay])) bad++;
        if (j > i && boxes[j] && boxesMeet(grow(b, 2), boxes[j])) bad++;
      });
    });
    edges.forEach((e, ei) => {
      const A = nodes[e.a], B = nodes[e.b];
      if (hint && segHitsBox(A.ax, A.ay, B.ax, B.ay, hint)) bad++;
      nodes.forEach((n, k) => { if (n.kind !== 'hub' && k !== e.a && k !== e.b && distToSeg(n.ax, n.ay, A, B) < n.r + 5) bad++; });
      edges.forEach((f, fi) => {
        if (fi > ei && f.a !== e.a && f.a !== e.b && f.b !== e.a && f.b !== e.b && segsCross(A, B, nodes[f.a], nodes[f.b])) bad++;
      });
    });
    return bad;
  }

  // Place everything for the current panel. Interests stack in a column per
  // side with the labels pointing outward, so every line reaches a dot from
  // the side away from its label; each hub fans out to its own block of
  // rows, so fans never cross. jitter() adds the irregularity; with R
  // unset it is zero and the result is the plain, clean-by-construction
  // tree.
  let twoSided = true;
  function place(R) {
    const jit = (a) => R ? (R() - 0.5) * 2 * a : 0;
    const widest = (gs) => Math.max(...gs.flatMap(g => g.items.map(l => labelW[l])));
    const topRight = hint ? hint[3] + 12 : 16, bottom = H - 16;
    const sides = twoSided
      ? [{ dir: -1, groups: LEFT, col: 16 + widest(LEFT), top: 16 }, { dir: 1, groups: RIGHT, col: W - 16 - widest(RIGHT), top: topRight }]
      : [{ dir: 1, groups: GROUPS, col: W - 16 - widest(GROUPS), top: topRight }];
    const c = nodes[centre];
    c.ax = twoSided ? (sides[0].col + sides[1].col) / 2 : 24;
    c.ay = H / 2 + jit(10);
    sides.forEach(({ dir, groups, col, top }) => {
      const gap = twoSided ? 0.8 : 1;
      const slots = groups.reduce((t, g) => t + g.items.length, 0) - 1 + gap * (groups.length - 1);
      const step = Math.min(32, (bottom - top) / slots);
      let y = top + (bottom - top - step * slots) / 2;
      const reach = Math.abs(col - c.ax);
      groups.forEach(g => {
        let sum = 0;
        g.ids.forEach(id => {
          const n = nodes[id];
          n.side = dir < 0 ? 'L' : 'R';
          n.ax = col - dir * Math.abs(jit(9));
          n.ay = y + jit(step * 0.12);
          sum += n.ay;
          y += step;
        });
        y += step * (gap - 1) + step;
        const h = nodes[g.hub];
        h.ax = c.ax + dir * reach * (0.48 + jit(0.1));
        h.ay = sum / g.ids.length + jit(6);
      });
    });
  }

  function layout() {
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || (rect.width === W && rect.height === H)) return;
    W = rect.width; H = rect.height;
    ctx.font = `600 11.5px ${FONT}`;
    GROUPS.forEach(g => g.items.forEach(l => { labelW[l] = ctx.measureText(l).width; }));
    ctx.font = `600 10px ${FONT}`;
    GROUPS.forEach(g => { labelW[g.label] = ctx.measureText(g.label.toUpperCase()).width; });
    const widest = (gs) => Math.max(...gs.flatMap(g => g.items.map(l => labelW[l])));
    // Two columns need room for both label stacks plus the hubs between them.
    const mode = (W - 32 - widest(LEFT) - widest(RIGHT)) >= 190;
    if (mode !== twoSided || !wrap.dataset.mode) {
      twoSided = mode;
      wrap.dataset.mode = mode ? 'two' : 'one';
      // One column holds 15 rows: give it the height it needs (20px a row).
      wrap.style.height = mode ? '' : `${Math.ceil(56 + 20 * (15 - 1 + GROUPS.length - 1))}px`;
      const r2 = wrap.getBoundingClientRect();
      W = r2.width; H = r2.height;
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // The hint text in the top-right corner is a fixed obstacle.
    const hintEl = wrap.querySelector('.graph-hint');
    hint = hintEl ? [W - hintEl.offsetWidth - 20, 0, W, hintEl.offsetTop + hintEl.offsetHeight + 6] : null;
    // First jittered variant with no collisions wins; the unjittered tree is
    // the fallback, and the least-bad of all if even that collides.
    let best = null, bestBad = Infinity;
    for (let k = 1; k <= 40 && bestBad > 0; k++) {
      place(seeded(k * 97));
      const bad = collisions();
      if (bad < bestBad) { bestBad = bad; best = nodes.map(n => [n.ax, n.ay, n.side]); }
    }
    if (bestBad > 0) {
      place(null);
      if (collisions() < bestBad) best = nodes.map(n => [n.ax, n.ay, n.side]);
    }
    best.forEach((v, i) => { nodes[i].ax = v[0]; nodes[i].ay = v[1]; nodes[i].side = v[2]; });
    // With reduced motion nothing animates toward the anchors, so jump there.
    nodes.forEach(n => { if (reducedMotion || (!n.x && !n.y)) { n.x = n.ax; n.y = n.ay; } });
  }
  new ResizeObserver(layout).observe(wrap);
  layout();

  const mouse = { x: -9999, y: -9999, active: false };
  const setPointer = (e) => {
    const r = wrap.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
  };
  wrap.addEventListener('pointermove', setPointer, { passive: true });
  wrap.addEventListener('pointerdown', setPointer, { passive: true });
  wrap.addEventListener('pointerleave', () => { mouse.active = false; });
  wrap.addEventListener('pointercancel', () => { mouse.active = false; });

  // Hit-test the dot and its label together, so the label is a target too.
  function hovered() {
    if (!mouse.active) return -1;
    ctx.font = `500 11.5px ${FONT}`;
    for (const i of interests) {
      const n = nodes[i];
      const w = ctx.measureText(n.label).width;
      const left = n.side === 'L';
      const x0 = left ? n.x - w - 12 : n.x - 8, x1 = left ? n.x + 8 : n.x + w + 12;
      if (mouse.x > x0 && mouse.x < x1 && Math.abs(mouse.y - n.y) < 11) return i;
    }
    return -1;
  }

  function step(t, hi) {
    for (let idx = 0; idx < nodes.length; idx++) {
      const n = nodes[idx];
      if (n.kind === 'centre') { n.x = n.ax; n.y = n.ay; continue; }
      const k = 0.05;
      n.vx += (n.ax - n.x) * k;
      n.vy += (n.ay - n.y) * k;
      if (!reducedMotion) {
        const s = idx * 0.37;
        n.vx += Math.sin(t * 0.0005 + s) * 0.03;
        n.vy += Math.cos(t * 0.0006 + s * 1.3) * 0.03;
      }
      // A slight lean away from the pointer: at most 3px (force / spring),
      // inside the clearance layout() leaves, so nothing lands on a line.
      // Off while a node is traced, so the target stays under the cursor.
      if (mouse.active && hi < 0) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 60) { const f = (60 - d) / 60 * 0.15; n.vx += dx / d * f; n.vy += dy / d * f; }
      }
      n.vx *= 0.82; n.vy *= 0.82;
      n.x += n.vx; n.y += n.vy;
    }
  }

  // Signals: a bright point running centre -> hub -> interest.
  const pulses = [];
  let lastPulse = 0;
  function spawnPulse(t) {
    const i = interests[Math.floor(rand() * interests.length)];
    pulses.push({ path: [centre, nodes[i].hub, i], t0: t });
  }

  function draw(hi, t) {
    ctx.clearRect(0, 0, W, H);
    const lit = new Set();
    if (hi >= 0) { lit.add(hi); lit.add(nodes[hi].hub); lit.add(centre); }
    const isLit = (e) => lit.has(e.a) && lit.has(e.b);

    // edges
    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      const on = hi >= 0 && isLit(e);
      const alpha = on ? 0.95 : hi >= 0 ? 0.1 : 0.22 + e.w * 0.3;
      ctx.strokeStyle = `rgba(${C.edge},${alpha})`;
      ctx.lineWidth = on ? 1.6 : e.w > 0.5 ? 0.9 : 0.6;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }

    // signals
    if (!reducedMotion) {
      for (let p = pulses.length - 1; p >= 0; p--) {
        const u = (t - pulses[p].t0) / 1400;
        if (u >= 1) { pulses.splice(p, 1); continue; }
        const seg = u < 0.5 ? 0 : 1, f = u < 0.5 ? u * 2 : (u - 0.5) * 2;
        const a = nodes[pulses[p].path[seg]], b = nodes[pulses[p].path[seg + 1]];
        const x = a.x + (b.x - a.x) * f, y = a.y + (b.y - a.y) * f;
        const g = ctx.createRadialGradient(x, y, 0, x, y, 7);
        g.addColorStop(0, `rgba(${C.edge},0.95)`); g.addColorStop(1, `rgba(${C.edge},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, 7, 0, Math.PI * 2); ctx.fill();
      }
    }

    // nodes
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dim = hi >= 0 && !lit.has(i);
      ctx.globalAlpha = dim ? 0.4 : 1;
      if (n.kind === 'centre') {
        const g = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, 16);
        g.addColorStop(0, `rgba(${C.edge},0.55)`); g.addColorStop(1, `rgba(${C.edge},0)`);
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(n.x, n.y, 16, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = C.accent;
      } else if (n.kind === 'hub') {
        // Chip: an opaque surface first, so the lines that end at the hub
        // stop at its border, then the tint, rule and name.
        const hw = labelW[n.label] / 2 + 7, x0 = n.x - hw, y0 = n.y - 9;
        const chip = () => { ctx.beginPath(); ctx.roundRect ? ctx.roundRect(x0, y0, hw * 2, 18, 9) : ctx.rect(x0, y0, hw * 2, 18); };
        ctx.globalAlpha = 1;
        ctx.fillStyle = C.surface; chip(); ctx.fill();
        ctx.globalAlpha = dim ? 0.4 : 1;
        ctx.fillStyle = `rgba(${C.edge},${lit.has(i) && hi >= 0 ? 0.2 : 0.09})`; chip(); ctx.fill();
        ctx.strokeStyle = `rgba(${C.edge},0.75)`; ctx.lineWidth = 1; chip(); ctx.stroke();
        ctx.globalAlpha = 1;
        continue;
      } else ctx.fillStyle = lit.has(i) ? C.hot : C.node;
      ctx.beginPath(); ctx.arc(n.x, n.y, n.r + (lit.has(i) && n.kind === 'interest' ? 1.4 : 0), 0, Math.PI * 2); ctx.fill();
      ctx.globalAlpha = 1;
    }

    // labels last, so no edge crosses over text
    ctx.textBaseline = 'middle';
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.kind === 'hub') {
        ctx.font = `600 10px ${FONT}`;
        ctx.fillStyle = hi >= 0 && !lit.has(i) ? C.labelDim : C.hub;
        ctx.textAlign = 'center';
        ctx.fillText(n.label.toUpperCase(), n.x, n.y + 0.5);
      } else if (n.kind === 'interest') {
        const left = n.side === 'L';
        ctx.font = `${lit.has(i) ? 600 : 500} 11.5px ${FONT}`;
        ctx.fillStyle = hi >= 0 && !lit.has(i) ? C.labelDim : C.label;
        ctx.textAlign = left ? 'right' : 'left';
        ctx.fillText(n.label, n.x + (left ? -8 : 8), n.y + 0.5);
      }
    }
  }

  let visible = true;
  new IntersectionObserver((es) => { es.forEach(e => { visible = e.isIntersecting; }); }, { rootMargin: '80px' }).observe(wrap);

  if (reducedMotion) {
    draw(-1, 0);
    wrap.addEventListener('pointermove', () => draw(hovered(), 0), { passive: true });
    wrap.addEventListener('pointerdown', () => draw(hovered(), 0), { passive: true });
    wrap.addEventListener('pointerleave', () => draw(-1, 0));
    new ResizeObserver(() => draw(-1, 0)).observe(wrap);
  } else {
    const tick = (t) => {
      requestAnimationFrame(tick);
      if (!visible) return;
      t = t || 0;
      if (t - lastPulse > 650) { spawnPulse(t); lastPulse = t; }
      const hi = hovered();
      step(t, hi);
      draw(hi, t);
    };
    requestAnimationFrame(tick);
  }

  window.updateHobbyGraphTheme = () => { readColors(); if (reducedMotion) draw(-1, 0); };
}

function initHobbyCarousel() {
  const track = document.getElementById('hobby-track');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('.hobby-slide'));
  const dots = Array.from(document.querySelectorAll('.hobby-dot'));
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  // Reduced-motion visitors get a static first slide, not an un-transitioned
  // snap every few seconds — the existing reducedMotion flag already governs
  // the CSS crossfade duration; this gates the JS interval on the same flag.
  let isPaused = reducedMotion;

  function videoIn(slide) {
    const v = slide.querySelector('video');
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  }
  function videoOut(slide) {
    const v = slide.querySelector('video');
    if (v) { v.pause(); }
  }

  function goTo(n) {
    videoOut(slides[current]);
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    videoIn(slides[current]);
  }

  function scheduleNext() {
    clearTimeout(timer);
    if (isPaused) return;
    const delay = 2800 + Math.random() * 2400; // 2.8s – 5.2s, non-fixed
    timer = setTimeout(() => { goTo(current + 1); scheduleNext(); }, delay);
  }

  goTo(0);
  scheduleNext();

  const carousel = document.getElementById('hobby-carousel');
  carousel.addEventListener('mouseenter', () => clearTimeout(timer));
  carousel.addEventListener('mouseleave', () => scheduleNext());
  // Keyboard users tabbing through the dots get the same pause a mouse hover
  // gives — otherwise the slide can change out from under a focused control.
  carousel.addEventListener('focusin', () => clearTimeout(timer));
  carousel.addEventListener('focusout', (e) => {
    if (!carousel.contains(e.relatedTarget)) scheduleNext();
  });

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    clearTimeout(timer);
    goTo(i);
    scheduleNext();
  }));

  const prevBtn = document.getElementById('hobby-prev');
  const nextBtn = document.getElementById('hobby-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { clearTimeout(timer); goTo(current - 1); scheduleNext(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearTimeout(timer); goTo(current + 1); scheduleNext(); });
  attachSwipe(carousel, () => { clearTimeout(timer); goTo(current - 1); scheduleNext(); },
                        () => { clearTimeout(timer); goTo(current + 1); scheduleNext(); });

  // Touch-only visitors have no hover/focus to pause on — a real, always-
  // visible control, independent of the hover/focus pausing above.
  const playPauseBtn = document.getElementById('hobby-playpause');
  if (playPauseBtn) {
    const syncButton = () => {
      playPauseBtn.classList.toggle('is-paused', isPaused);
      playPauseBtn.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
      playPauseBtn.setAttribute('aria-pressed', String(isPaused));
    };
    syncButton();
    playPauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      syncButton();
      if (isPaused) clearTimeout(timer); else scheduleNext();
    });
  }
}

function initInternshipCarousel() {
  const track = document.getElementById('dornier-track');
  if (!track) return;
  const slides = Array.from(track.querySelectorAll('.internship-slide'));
  const dots = Array.from(document.querySelectorAll('.internship-dot'));
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  let isPaused = reducedMotion;

  function videoIn(slide) {
    const v = slide.querySelector('video');
    if (v) { v.currentTime = 0; v.play().catch(() => {}); }
  }
  function videoOut(slide) {
    const v = slide.querySelector('video');
    if (v) v.pause();
  }

  function goTo(n) {
    videoOut(slides[current]);
    slides[current].classList.remove('active');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    if (dots[current]) dots[current].classList.add('active');
    videoIn(slides[current]);
  }

  function scheduleNext() {
    clearTimeout(timer);
    if (isPaused) return;
    const delay = 3200 + Math.random() * 2200;
    timer = setTimeout(() => { goTo(current + 1); scheduleNext(); }, delay);
  }

  goTo(0);
  scheduleNext();

  const carousel = document.getElementById('dornier-carousel');
  carousel.addEventListener('mouseenter', () => clearTimeout(timer));
  carousel.addEventListener('mouseleave', () => scheduleNext());
  carousel.addEventListener('focusin', () => clearTimeout(timer));
  carousel.addEventListener('focusout', (e) => {
    if (!carousel.contains(e.relatedTarget)) scheduleNext();
  });

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    clearTimeout(timer);
    goTo(i);
    scheduleNext();
  }));

  const prevBtn = document.getElementById('dornier-prev');
  const nextBtn = document.getElementById('dornier-next');
  if (prevBtn) prevBtn.addEventListener('click', () => { clearTimeout(timer); goTo(current - 1); scheduleNext(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { clearTimeout(timer); goTo(current + 1); scheduleNext(); });
  attachSwipe(carousel, () => { clearTimeout(timer); goTo(current - 1); scheduleNext(); },
                        () => { clearTimeout(timer); goTo(current + 1); scheduleNext(); });

  const playPauseBtn = document.getElementById('dornier-playpause');
  if (playPauseBtn) {
    const syncButton = () => {
      playPauseBtn.classList.toggle('is-paused', isPaused);
      playPauseBtn.setAttribute('aria-label', isPaused ? 'Play slideshow' : 'Pause slideshow');
      playPauseBtn.setAttribute('aria-pressed', String(isPaused));
    };
    syncButton();
    playPauseBtn.addEventListener('click', () => {
      isPaused = !isPaused;
      syncButton();
      if (isPaused) clearTimeout(timer); else scheduleNext();
    });
  }
}

function rebootHoloBay(dark) {
  const bay = document.querySelector('holo-bay');
  if (!bay) return;
  const attrs = dark ? HOLO_ATTRS.dark : HOLO_ATTRS.light;
  Object.entries(attrs).forEach(([k,v]) => bay.setAttribute(k, v));
  // If holo-bay.js never loaded, the element was never upgraded — there's no
  // connectedCallback to invoke and nothing booted to tear down. Leave the
  // static fallback in place instead of wiping it and throwing.
  if (typeof bay.connectedCallback !== 'function') return;
  if (bay._renderer) { bay._stop = true; bay._renderer.dispose(); bay._renderer = null; }
  while (bay.firstChild) bay.removeChild(bay.firstChild);
  bay._booted = false;
  bay._stop = false;
  bay.connectedCallback();
}

// Every part of switching theme, in one place, so it can be handed to
// startViewTransition as a single callback.
function applyTheme(dark) {
  const root = document.documentElement;
  if (dark) root.dataset.theme = 'dark';
  else root.removeAttribute('data-theme');
  try { sessionStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  const meta = document.getElementById('theme-color');
  if (meta) meta.setAttribute('content', dark ? '#1A2535' : '#FFFFFF');
  // holo-bay takes its colours as attributes, so it has to be torn down and
  // rebooted — which resets the scene to its opening camera position. Inside a
  // view transition the crossfade covers that jump; it used to be visible.
  rebootHoloBay(dark);
  if (window.updateHobbyGraphTheme) window.updateHobbyGraphTheme();
}

function initTheme() {
  const root = document.documentElement;
  const btn = document.getElementById('theme-toggle');
  btn.addEventListener('click', () => {
    const dark = root.dataset.theme !== 'dark';

    // Reduced motion means no crossfade at all — a full-page colour change is
    // exactly the kind of motion the setting is asking us not to make.
    if (reducedMotion) { applyTheme(dark); return; }

    if (typeof document.startViewTransition === 'function') {
      root.classList.add('theme-swap');
      const vt = document.startViewTransition(() => applyTheme(dark));
      const clear = () => root.classList.remove('theme-swap');
      // A transition can be aborted — the tab is hidden when it starts, or a
      // second toggle skips the first. Both `ready` and `finished` reject when
      // that happens, and an unhandled one lands in the console; the DOM
      // update still runs either way, so the theme is applied regardless.
      // then(clear, clear) rather than finally(), which would re-reject.
      vt.ready.catch(() => {});
      vt.finished.then(clear, clear);
      return;
    }

    root.classList.add('theme-swap-fallback');
    applyTheme(dark);
    setTimeout(() => root.classList.remove('theme-swap-fallback'), 260);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildProjectGrid();
  buildProjects();
  initCalloutFigures();
  buildSoftware();
  initNav();
  initNavHome();
  initReveal();
  initLightboxZoom();
  initHashTarget();
  initAnchorScroll();
  // Pills are sized from measureText once, so measure with the real face.
  (document.fonts && document.fonts.load
    ? document.fonts.load("500 11.5px 'Atkinson Hyperlegible Next'").catch(() => {})
    : Promise.resolve()).then(initHobbyGraph);
  initHobbyCarousel();
  initInternshipCarousel();
  initTheme();
});
