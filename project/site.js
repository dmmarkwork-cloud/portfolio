const PROJECTS = [
  {
    anchor: 'p-nozzle', group: 'flagship', short: 'Nozzle',
    kicker: ['Propulsion', 'Multiphysics', 'DFM'],
    title: 'Uncooled SS316 C-D Nozzle',
    result: 'Stress governs at the chamber junction: a factor of safety of 7.12.',
    key: { v: '7.12', k: 'factor of safety; v1.0 said 42.70' },
    check: 'Hand calcs and 17 FEA validation gates',
    // The hero above already shows the von Mises plot; the ledger shows the
    // hardware that result belongs to.
    gridThumb: 'dfm/images/exploded-view.png',
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
        // The inner wall from the junction reading to the throat reading,
        // traced on this plot: the straight converging run, then the fillet
        // into the throat. The hero's switch moves the reading along it.
        wall: 'M843 113 L1000 282 Q1044 329 1121 329',
        caption: 'Governing stress at the chamber-to-converging junction: 29.6\u00a0MPa membrane plus bending on mesh J3. The 82.3\u00a0MPa peak at the sharp corner is singular and excluded.',
        callouts: [
          { x: 843, y: 113, bx: 700, by: 34, rev: 'v2.0', key: 'Chamber-to-converging junction. v2.0 reads it here: <span class="data">7.12</span>' },
          { x: 1121, y: 329, bx: 1000, by: 440, rev: 'v1.0', key: 'Throat. v1.0 read it here: <s class="data">42.70</s>, withdrawn' }
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
  const fgStyle = `position:absolute;inset:0;width:100%;height:100%;box-sizing:border-box;padding:${pad};display:block;filter:drop-shadow(0 3px 10px rgba(0,0,0,0.28));`; // taste-skill-ignore: lifts the figure off its blurred backdrop inside the viewer (data-ui)
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
  // A reading that belongs to one release carries it, so the home page's
  // switch can bring that release's leader forward.
  const rev = (c) => c.rev ? ` data-rev="${c.rev}"` : '';
  const lines = view.callouts.map(c =>
    `<line x1="${c.x}" y1="${c.y}" x2="${c.bx}" y2="${c.by}"${rev(c)} vector-effect="non-scaling-stroke"/>`).join('');
  const marks = view.callouts.map((c, i) =>
    `<span class="callout-dot"${rev(c)} style="left:${pct(c.x, w)};top:${pct(c.y, h)};"></span>`
    + `<span class="callout-balloon"${rev(c)} style="left:${pct(c.bx, w)};top:${pct(c.by, h)};">${i + 1}</span>`).join('');
  return `<div class="callouts" data-w="${w}" data-h="${h}" aria-hidden="true">`
    + `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none">${lines}</svg>${marks}</div>`;
}
// Spans, not <li>, because the project key sits inside the figure's
// <button>, which may only hold phrasing content; the roles keep it a list.
function calloutKey(view) {
  return view.callouts.map((c, i) =>
    `<span role="listitem"><span class="callout-balloon">${i + 1}</span><span>${c.key}</span></span>`).join('');
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
  // The key is written twice: inside the figure's frame (wider screens) and
  // under the thumbnail strip (phones, where the 300px frame cannot hold a
  // caption, a key and a readable figure). CSS shows one of them.
  [`lead-key-${pi}`, `lead-key-below-${pi}`].forEach(id => {
    const keyEl = document.getElementById(id);
    if (!keyEl) return;
    keyEl.innerHTML = lead.callouts ? calloutKey(lead) : '';
    keyEl.hidden = !lead.callouts;
  });

  // Update thumb borders and opacity in-place (no rebuild)
  const thumbsEl = document.getElementById(`thumbs-${pi}`);
  if (thumbsEl) {
    let activeBtn = null;
    thumbsEl.querySelectorAll('.thumb-btn').forEach((btn, i) => {
      const active = i === vi;
      if (active) activeBtn = btn;
      btn.setAttribute('aria-current', active ? 'true' : 'false');
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

// ── Settle ─────────────────────────────────────────────
// Content swapped in place (a figure, its caption, a release's numbers)
// arrives at once and settles from 0.6 opacity over 150ms on the page's
// ease-out curve, with a 2px blur to bridge a picture. Nothing waits for an
// exit. Reduced motion keeps the fade, which says something changed.
const EASE_OUT = 'cubic-bezier(0.23, 1, 0.32, 1)';
function settle(el, blur) {
  if (!el || !el.animate) return;
  el.animate(blur && !reducedMotion
    ? [{ opacity: 0.6, filter: 'blur(2px)' }, { opacity: 1, filter: 'blur(0)' }]
    : [{ opacity: 0.6 }, { opacity: 1 }], { duration: 150, easing: EASE_OUT });
}

function selectView(pi, vi) {
  viewIndex[pi] = vi;
  renderGallery(pi);
  settle(document.getElementById(`lead-img-${pi}`), true);
  settle(document.getElementById(`lead-cap-${pi}`), false);
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
  // The page's figure under the viewer is now the new one; it stays hidden
  // like the one opened, ready for the viewer to close into.
  if (lbHidden) {
    const s = leadMedia(lbProject);
    if (s) { s.style.visibility = 'hidden'; lbHidden = s; }
  }
}

// Only the backdrop closes. The frame itself used to close on any click, which
// was fine when there was nothing in here to press; with arrows over the image
// a near-miss would have thrown away your place in a 13-figure set.
function lbBackdrop(e) {
  if (e.target === document.getElementById('lightbox')) closeLightbox();
}

// ── The viewer opens out of its figure ─────────────────
// "Enlarge" used to fade the viewer in from the middle of the screen,
// unconnected to the figure pressed. Now the figure itself grows from its
// place on the page into the viewer while the backdrop darkens around it,
// and shrinks back into its place on closing, so the reader keeps track of
// which piece of evidence they opened. The viewer is laid out first, drawn
// back over the figure, then let go (FLIP). Steps between figures stay
// instant. Reduced motion keeps the plain fade.
const LB_BG = 'rgba(14, 16, 17, 0.9)';
let lbFlight = null;
const lbChrome = () => ['lb-close', 'lb-prev', 'lb-next'].map(id => document.getElementById(id))
  .concat([document.querySelector('.lb-caption-row')]).filter(Boolean);
const leadMedia = (pi) => {
  const area = document.getElementById(`lead-img-${pi}`);
  return area && area.querySelector(':scope > img, :scope > video');
};
// The rectangle a picture covers inside an element that shows it whole
// (object-fit: contain) within its padding, in viewport pixels.
function shownRect(el, nat) {
  const r = el.getBoundingClientRect(), cs = getComputedStyle(el);
  const pl = parseFloat(cs.paddingLeft), pt = parseFloat(cs.paddingTop);
  const bw = r.width - pl - parseFloat(cs.paddingRight), bh = r.height - pt - parseFloat(cs.paddingBottom);
  const [nw, nh] = nat;
  if (!nw || !nh || bw <= 0 || bh <= 0) return null;
  const s = Math.min(bw / nw, bh / nh), w = nw * s, h = nh * s;
  return { x: r.left + pl + (bw - w) / 2, y: r.top + pt + (bh - h) / 2, w, h, top: r.top, bottom: r.bottom };
}
// The transform (origin at the element's top-left) that lays the picture
// shown in `el` over the rectangle `to`.
function flipOnto(el, nat, to) {
  const box = el.getBoundingClientRect();
  const from = shownRect(el, nat);
  if (!from || !to) return null;
  const k = to.w / from.w;
  return `translate(${to.x - box.left - k * (from.x - box.left)}px, ${to.y - box.top - k * (from.y - box.top)}px) scale(${k})`;
}
const onScreen = (r) => r && r.bottom > 0 && r.top < window.innerHeight;
function lbLand() {
  if (!lbFlight) return;
  const f = lbFlight;
  lbFlight = null;
  f.anims.forEach(a => a.cancel());
  if (f.src) f.src.style.visibility = '';
  document.getElementById('lightbox').classList.remove('lb-flip');
}

function openLightbox(pi) {
  lbLand();
  if (lbHidden) { lbHidden.style.visibility = ''; lbHidden = null; }
  lbProject = pi;
  // Sizing moved to .lb-media-el so the mobile stage can take a definite
  // height (panning needs somewhere to pan to) without touching the desktop
  // layout, where the container still hugs the image. eager, because this
  // element is inserted at the exact moment it is needed.
  lbRender();
  const lb = document.getElementById('lightbox');
  lbReturnFocus = document.activeElement;
  lb.inert = false;
  const src = leadMedia(pi);
  const el = lbEl();
  const nat = src ? [src.naturalWidth || src.videoWidth, src.naturalHeight || src.videoHeight] : [0, 0];
  const start = src && !reducedMotion && el && el.animate ? shownRect(src, nat) : null;
  if (onScreen(start)) {
    lb.classList.add('lb-flip', 'open');
    const from = flipOnto(el, nat, start);
    if (from) {
      src.style.visibility = 'hidden';
      const anims = [
        el.animate([{ transform: from }, { transform: 'none' }], { duration: 320, easing: 'cubic-bezier(0.32, 0.72, 0, 1)' }),
        lb.animate([{ backgroundColor: 'rgba(14, 16, 17, 0)' }, { backgroundColor: LB_BG }], { duration: 260, easing: 'ease' }),
        ...lbChrome().map(c => c.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 200, delay: 160, easing: 'ease', fill: 'backwards' }))
      ];
      lbFlight = { anims, src: null };
      anims[0].onfinish = () => { if (lbFlight && lbFlight.anims === anims) lbFlight = null; lb.classList.remove('lb-flip'); };
    } else {
      lb.classList.remove('lb-flip');
    }
  } else {
    lb.classList.add('open');
  }
  // The figure on the page stays hidden while the viewer shows it, the way
  // a photo leaves its place in a phone's library while it is open.
  if (src && lb.classList.contains('lb-flip')) lbHidden = src;
  document.documentElement.classList.add('lb-open');
  lb.focus({ preventScroll: true });
  document.addEventListener('keydown', onLbKey);
}
let lbHidden = null;

function closeLightbox() {
  const lb = document.getElementById('lightbox');
  const pi = lbProject;
  const el = lbEl();
  const finish = () => {
    lb.classList.remove('open');
    lb.classList.remove('is-zoomed');
    lb.inert = true;
    document.documentElement.classList.remove('lb-open');
    lbZoom.scale = 1; lbZoom.tx = 0; lbZoom.ty = 0;
    lbDrag.x = 0; lbDrag.y = 0; lbDrag.axis = null;
    lb.style.backgroundColor = '';
    lbChrome().forEach(c => { c.style.opacity = ''; });
    if (lbHidden) { lbHidden.style.visibility = ''; lbHidden = null; }
  };
  document.removeEventListener('keydown', onLbKey);
  lbProject = null;
  if (lbReturnFocus && lbReturnFocus.focus) lbReturnFocus.focus({ preventScroll: true });
  lbReturnFocus = null;
  // Back into its place on the page, from wherever it is now: mid-opening,
  // or dragged down by a finger. Zoomed in, it simply fades.
  const src = pi !== null ? leadMedia(pi) : null;
  if (!reducedMotion && src && el && el.animate && lbZoom.scale <= 1.01) {
    const nat = [src.naturalWidth || src.videoWidth, src.naturalHeight || src.videoHeight];
    const now = getComputedStyle(el).transform;
    const bg = getComputedStyle(lb).backgroundColor;
    lbLand();
    el.style.transform = 'none';
    const home = shownRect(src, nat);
    const to = onScreen(home) ? flipOnto(el, nat, home) : null;
    if (to) {
      lb.inert = true;
      lb.classList.add('lb-flip');
      if (lbHidden && lbHidden !== src) lbHidden.style.visibility = '';
      lbHidden = src;
      src.style.visibility = 'hidden';
      const anims = [
        el.animate([{ transform: now === 'none' ? 'none' : now }, { transform: to }], { duration: 260, easing: EASE_OUT, fill: 'forwards' }),
        lb.animate([{ backgroundColor: bg }, { backgroundColor: 'rgba(14, 16, 17, 0)' }], { duration: 220, easing: 'ease', fill: 'forwards' }),
        ...lbChrome().map(c => c.animate([{ opacity: getComputedStyle(c).opacity }, { opacity: 0 }], { duration: 120, fill: 'forwards' }))
      ];
      lbFlight = { anims, src: null };
      anims[0].onfinish = () => {
        if (!lbFlight || lbFlight.anims !== anims) return;
        finish();
        // Read the closed style while lb-flip still holds the transitions
        // off; lifted in the same pass, the viewer would fade out for 150ms
        // with the figure back at full size.
        void getComputedStyle(lb).opacity;
        lbLand();
        el.style.transform = '';
      };
      return;
    }
    el.style.transform = '';
  }
  lbLand();
  finish();
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
      if (v.video && v.poster) return { type: 'img', src: v.poster };
    }
    return null;
  }
  // A transparent render on a plain field is shown whole; a photograph or a
  // render with its own background fills its frame.
  const contained = (p, m) => m && m.src.toLowerCase().endsWith('.png') && p.gridFit !== 'cover';

  // A ledger row is the back of a trading card: the name and the result in
  // a sentence on the left, the one number to remember on the right, how it
  // was checked underneath. The chapters live on the projects page.
  const flagships = PROJECTS.filter(p => p.group === 'flagship');
  const chapterPage = document.getElementById('projects-container') ? '' : 'projects';
  container.innerHTML = flagships.map((p, ci) => {
    const media = firstImage(p);
    const thumb = media
      ? `<img class="ledger-thumb${contained(p, media) ? ' is-contain' : ''}" src="${media.src}" alt="" loading="lazy" style="object-position:${p.gridFocus || 'center'};">`
      : '';
    return `
      <li><a class="ledger-row" href="${chapterPage}#${p.anchor}" data-i="${ci}">
        ${thumb}
        <span class="ledger-name">${p.title}</span>
        <span class="ledger-result">${p.result}</span>
        <span class="ledger-key"><span class="ledger-num">${dataValue(p.key.v)}</span><span class="ledger-k">${p.key.k}</span></span>
        <span class="ledger-check">${p.wip ? '<span class="ledger-status">Analysis in progress</span>' : ''}${p.check}</span>
      </a></li>`;
  }).join('');

  // The frame beside the column holds every row's picture, stacked; the row
  // you are on shows its own, and the frame slides down to sit level with
  // it. A transform transition, so a fast run down the list retargets from
  // wherever the frame is instead of queueing.
  const frame = document.getElementById('ledger-frame');
  if (frame) {
    frame.innerHTML = flagships.map((p, ci) => {
      const media = firstImage(p);
      return media
        ? `<img src="${media.src}" alt="" loading="lazy" class="${contained(p, media) ? 'is-contain' : ''}${ci === 0 ? ' is-on' : ''}" style="object-position:${p.gridFocus || 'center'};">`
        : '<span></span>';
    }).join('');
    const rows = [...container.querySelectorAll('.ledger-row')];
    const pics = [...frame.children];
    let on = 0;
    const show = (i) => {
      if (i === on) return;
      pics[on].classList.remove('is-on');
      pics[i].classList.add('is-on');
      on = i;
      const list = container.getBoundingClientRect();
      const row = rows[i].getBoundingClientRect();
      const room = Math.max(0, list.height - frame.offsetHeight);
      frame.style.transform = `translateY(${Math.min(room, Math.max(0, row.top - list.top))}px)`;
    };
    rows.forEach((row, i) => {
      row.addEventListener('pointerenter', () => show(i));
      row.addEventListener('focus', () => show(i));
    });
  }

  const built = document.getElementById('built-list');
  if (built) {
    built.innerHTML = PROJECTS.filter(p => p.group === 'built').map(p => {
      const media = firstImage(p);
      const thumb = media
        ? `<img src="${media.src}" alt="" loading="lazy" style="object-position:${p.gridFocus || 'center'};">`
        : '<span></span>';
      return `
        <li><a class="built-row" href="${chapterPage}#${p.anchor}">
          ${thumb}
          <span><strong>${p.title}</strong><span>${p.result}</span></span>
        </a></li>`;
    }).join('');
  }

}

// The projects page opens on an index of all seven, grouped as the page
// is, each with its number.
function buildProjectIndex() {
  // The same list fills the bar's jump menu, where each row carries the
  // chapter it opens so the current one can be marked.
  const jump = document.getElementById('jump-list');
  if (jump) {
    let group = null;
    jump.innerHTML = PROJECTS.map(p => {
      const head = p.group !== group
        ? `<li role="presentation"><p class="grp">${p.group === 'flagship' ? 'Analyses' : 'Built by hand'}</p></li>` : '';
      group = p.group;
      const k = p.group === 'flagship' ? (p.wip ? 'In progress' : dataValue(p.key.v)) : '';
      return head + `<li><a href="#${p.anchor}"><span>${p.title}</span><span class="k">${k}</span></a></li>`;
    }).join('');
  }
  // The projects page's own index links within the page; the 404 page's
  // links into it from wherever the wrong address was.
  // Its base is the bar's own Projects link, which the Pages mirror's build
  // rewrites under /portfolio/ along with every other path on that page.
  const projectsLink = document.querySelector('.nav-scroll a[href$="projects"]');
  [['proj-index', ''], ['nf-index', projectsLink ? projectsLink.getAttribute('href') : '/projects']].forEach(([id, page]) => {
    const index = document.getElementById(id);
    if (!index) return;
    let group = null;
    index.innerHTML = PROJECTS.map(p => {
      const head = p.group !== group
        ? `<li><p class="grp">${p.group === 'flagship' ? 'Analyses' : 'Built by hand'}</p></li>` : '';
      group = p.group;
      const k = p.group === 'flagship' ? (p.wip ? 'In progress' : dataValue(p.key.v)) : '';
      return head + `<li><a href="${page}#${p.anchor}"><span>${p.title}</span><span class="k">${k}</span></a></li>`;
    }).join('');
  });
}

// The project chapter crossing the reading line (42% down the screen), or
// null above the first one.
function currentChapter() {
  const mid = window.innerHeight * 0.42;
  let cur = null;
  document.querySelectorAll('.proj-section').forEach(s => {
    const r = s.getBoundingClientRect();
    if (r.top <= mid && r.bottom >= mid) cur = s.id;
  });
  return cur;
}

// ── The jump menu ───────────────────────────────────────
// On the projects page the bar's "/ chapter" opens a list of all seven, so
// a reader deep in one chapter can go to another without scrolling back to
// the index. It opens from its button, closes on a choice, Escape, or a
// click elsewhere, and the arrow keys move through it.
function initJumpMenu() {
  const btn = document.getElementById('nav-jump');
  const menu = document.getElementById('jump-menu');
  if (!btn || !menu) return;
  const links = () => [...menu.querySelectorAll('a')];
  // The chapter crossing the reading line is the one marked.
  const mark = () => {
    const cur = currentChapter();
    links().forEach(a => a.classList.toggle('is-here', !!cur && a.getAttribute('href') === '#' + cur));
  };
  const open = (focusFirst) => {
    mark();
    menu.hidden = false;
    btn.setAttribute('aria-expanded', 'true');
    if (focusFirst) (menu.querySelector('a.is-here') || links()[0]).focus();
  };
  const close = (returnFocus) => {
    if (menu.hidden) return;
    menu.hidden = true;
    btn.setAttribute('aria-expanded', 'false');
    if (returnFocus) btn.focus();
  };
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (menu.hidden) open(e.detail === 0); else close(false);
  });
  menu.addEventListener('click', (e) => { if (e.target.closest('a')) close(false); });
  document.addEventListener('click', (e) => { if (!menu.hidden && !menu.contains(e.target) && e.target !== btn) close(false); });
  document.addEventListener('keydown', (e) => {
    if (menu.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); close(true); return; }
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      const all = links();
      const i = all.indexOf(document.activeElement);
      const n = e.key === 'ArrowDown' ? (i + 1) % all.length : (i - 1 + all.length) % all.length;
      all[n].focus();
    }
  });
  menu.addEventListener('focusout', (e) => { if (!menu.contains(e.relatedTarget) && e.relatedTarget !== btn) close(false); });
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

// ── Scroll area ────────────────────────────────────────
// shadcn/ui's ScrollArea (Radix) for a sideways strip, without React: the
// strip keeps its native scrolling (wheel, swipe, keys) and only the bar is
// drawn here. The thumb is sized to the visible share of the strip and
// dragged with pointer events, so mouse, pen and touch all work; a press on
// the track jumps the thumb's centre to that point, as Radix does.
function scrollArea(rail) {
  const root = document.createElement('div');
  root.className = 'scroll-area';
  rail.parentNode.insertBefore(root, rail);
  root.appendChild(rail);
  const bar = document.createElement('div');
  bar.className = 'scroll-bar';
  bar.setAttribute('aria-hidden', 'true');
  const thumb = document.createElement('div');
  thumb.className = 'scroll-thumb';
  bar.appendChild(thumb);
  root.appendChild(bar);

  const max = () => rail.scrollWidth - rail.clientWidth;
  const track = () => bar.clientWidth - 2;   // inside the 1px inset
  let dragging = false, startX = 0, startLeft = 0, hideTimer = 0;

  const sync = () => {
    const m = max();
    root.classList.toggle('has-overflow', m > 1);
    if (m <= 1) return;
    const w = Math.max(18, track() * rail.clientWidth / rail.scrollWidth);
    thumb.style.width = `${w}px`;
    thumb.style.transform = `translateX(${(track() - w) * (rail.scrollLeft / m)}px)`;
  };
  const show = () => { clearTimeout(hideTimer); root.classList.add('is-active'); };
  const hideSoon = () => {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!dragging && !root.matches(':hover')) root.classList.remove('is-active');
    }, 600);
  };

  rail.addEventListener('scroll', () => { sync(); show(); hideSoon(); }, { passive: true });
  root.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') show(); });
  root.addEventListener('pointerleave', hideSoon);

  thumb.addEventListener('pointerdown', (e) => {
    e.preventDefault();
    e.stopPropagation();
    dragging = true;
    startX = e.clientX;
    startLeft = rail.scrollLeft;
    thumb.setPointerCapture(e.pointerId);
    root.classList.add('is-dragging');
    show();
  });
  thumb.addEventListener('pointermove', (e) => {
    if (!dragging) return;
    const free = Math.max(1, track() - thumb.offsetWidth);
    rail.scrollLeft = startLeft + (e.clientX - startX) * (max() / free);
  });
  const endDrag = () => {
    if (!dragging) return;
    dragging = false;
    root.classList.remove('is-dragging');
    hideSoon();
  };
  thumb.addEventListener('pointerup', endDrag);
  thumb.addEventListener('pointercancel', endDrag);

  bar.addEventListener('pointerdown', (e) => {
    if (e.target === thumb) return;
    const b = bar.getBoundingClientRect();
    const free = Math.max(1, track() - thumb.offsetWidth);
    const x = e.clientX - b.left - 1 - thumb.offsetWidth / 2;
    rail.scrollLeft = Math.max(0, Math.min(1, x / free)) * max();
  });

  if ('ResizeObserver' in window) new ResizeObserver(sync).observe(rail);
  window.addEventListener('resize', sync);
  sync();
}

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
// A real table: a quantity and its value per row, so it reads as one to a
// screen reader and keeps its row lines.
function metricRows(values) {
  return `<table class="metrics"><tbody>${values.map(v => `
    <tr><th scope="row">${v.k}</th><td${NUMERIC_VALUE.test(v.v) ? ' class="is-num"' : ''}>${dataValue(v.v)}</td></tr>`).join('')}
  </tbody></table>`;
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
  const table = document.getElementById(`rev-table-${pi}`);
  const note = document.getElementById(`rev-note-${pi}`);
  table.innerHTML = metricRows(rel.values);
  note.textContent = rel.note;
  // 7.12 turning into a struck-through 42.70 is the page's story; the swap
  // gets the same settle as a figure, so the change reads as a change.
  settle(table, true);
  settle(note, false);
  document.querySelectorAll(`#rev-${pi} .rev-toggle button`).forEach(b =>
    b.setAttribute('aria-pressed', b.dataset.rev === id ? 'true' : 'false'));
  placeThumb(document.querySelector(`#rev-${pi} .rev-toggle`));
  document.getElementById(`rev-${pi}`).classList.toggle('is-superseded', !!rel.superseded);
}

// Discipline tags as one plain line: "Propulsion, multiphysics and DFM".
// Acronyms and proper names keep their capitals.
// The hero figure carries the same callouts as the project it comes from.
function initCalloutFigures() {
  document.querySelectorAll('[data-callouts]').forEach(el => {
    const p = PROJECTS.find(x => x.anchor === el.dataset.callouts);
    const v = p && p.views.find(x => x.callouts);
    if (!v) return;
    el.insertAdjacentHTML('beforeend', calloutMarkup(v));
    // First page of a visit only, after the hero has risen in: each leader
    // draws from the place a result was read out to its balloon, then the
    // balloons settle in, 60ms apart. A returning page shows them at rest.
    if (reducedMotion || document.documentElement.classList.contains('intro-seen')) return;
    const layer = el.querySelector('.callouts');
    if (!layer || !layer.animate) return;
    const start = 420;
    // Grown from its dot by scaling about that point, in the figure's own
    // units. A dash-offset draw would be simpler, but the leaders keep a
    // constant width (non-scaling-stroke), and Chrome measures dashes in
    // screen space there, so the line showed whole from the first frame.
    layer.querySelectorAll('line').forEach((l, i) => {
      l.style.transformOrigin = `${l.getAttribute('x1')}px ${l.getAttribute('y1')}px`;
      l.animate([{ transform: 'scale(0.001)' }, { transform: 'scale(1)' }],
        { duration: 300, delay: start + i * 60, easing: EASE_OUT, fill: 'backwards' });
    });
    layer.querySelectorAll('.callout-dot').forEach((d, i) =>
      d.animate([{ opacity: 0 }, { opacity: 1 }],
        { duration: 150, delay: start + i * 60, easing: EASE_OUT, fill: 'backwards' }));
    layer.querySelectorAll('.callout-balloon').forEach((b, i) =>
      b.animate([{ opacity: 0, transform: 'scale(0.95)' }, { opacity: 1, transform: 'scale(1)' }],
        { duration: 150, delay: start + 300 + i * 60, easing: EASE_OUT, fill: 'backwards' }));
  });
}

// ── Segmented switches ─────────────────────────────────
// The hero's reading switch and each revision record's toggle: one yellow
// block behind the buttons slides to the one pressed, where a highlight
// used to fade out on one button while another faded in. One object moving
// reads as one control changing state. It is placed without motion at first
// and on resize; the CSS transition carries a change, and retargets from
// wherever the block is if the choice changes mid-slide. Until the script
// places it, the pressed button keeps its own fill.
function initSegmented(group) {
  if (!group || group.querySelector('.seg-thumb')) return;
  const thumb = document.createElement('span');
  thumb.className = 'seg-thumb';
  thumb.setAttribute('aria-hidden', 'true');
  group.prepend(thumb);
  group._place = (animate) => {
    const on = group.querySelector('button[aria-pressed="true"]');
    if (!on) return;
    if (!animate) thumb.style.transition = 'none';
    thumb.style.width = `${on.offsetWidth}px`;
    thumb.style.transform = `translateX(${on.offsetLeft}px)`;
    if (!animate) { thumb.getBoundingClientRect(); thumb.style.transition = ''; }
  };
  group._place(false);
  group.classList.add('has-thumb');
  if ('ResizeObserver' in window) new ResizeObserver(() => group._place(false)).observe(group);
}
const placeThumb = (group) => { if (group && group._place) group._place(true); };

// ── A number that rolls ────────────────────────────────
// The readout's figures roll to a new value column by column, the way a
// counter does: up when the number grows, down when it shrinks, through the
// digits between. Each column is 0–9 three times over, clipped to one
// figure, so a roll can start from wherever an interrupted one left it. A
// column the value does not need (the 4 of 42.70) closes to nothing, and
// the box keeps the width of the widest value, so the label beside it never
// moves. Screen readers get the value from a line of text kept beside it.
function odometer(el, values, start) {
  const split = (v) => { const [i, f = ''] = String(v).split('.'); return [i, f]; };
  const intN = Math.max(...values.map(v => split(v)[0].length));
  const fracN = Math.max(...values.map(v => split(v)[1].length));
  const digits = (v) => {
    const [i, f] = split(v);
    return [...Array(intN - i.length).fill(null), ...i.split('').map(Number), ...f.padEnd(fracN, '0').split('').map(Number)];
  };
  const cells = '0123456789'.repeat(3).split('').map(d => `<span>${d}</span>`).join('');
  let cols = '';
  for (let k = 0; k < intN + fracN; k++) {
    if (k === intN && fracN) cols += '<span class="odo-dot">.</span>';
    cols += `<span class="odo-col"><span class="odo-strip">${cells}</span></span>`;
  }
  el.innerHTML = `<span class="odo">${cols}<span class="rig-strike"></span></span>`;
  el.setAttribute('aria-hidden', 'true');
  const colEls = [...el.querySelectorAll('.odo-col')];
  const strips = colEls.map(c => c.firstElementChild);
  const fs = () => parseFloat(getComputedStyle(el).fontSize) || 16;
  // One figure's width and the point's, in em, so the sizes follow the
  // readout's fluid type; measured again once the web font is in.
  const measure = () => {
    const m = document.createElement('span');
    m.style.cssText = 'position:absolute;visibility:hidden;white-space:nowrap;';
    el.appendChild(m);
    m.textContent = '0';
    const dw = m.getBoundingClientRect().width / fs();
    m.textContent = '.';
    const dot = m.getBoundingClientRect().width / fs();
    m.remove();
    el.style.setProperty('--dw', `${dw.toFixed(4)}em`);
    el.style.minWidth = `${((intN + fracN) * dw + (fracN ? dot : 0)).toFixed(4)}em`;
  };
  const at = (s, i) => { s.style.transform = `translateY(${-i}em)`; };
  const now = (s) => -new DOMMatrixReadOnly(getComputedStyle(s).transform).m42 / fs();
  const rest = (d) => 10 + (d === null ? 0 : d);
  let cur = digits(start), value = Number(start);
  strips.forEach((s, k) => { at(s, rest(cur[k])); colEls[k].classList.toggle('is-blank', cur[k] === null); });
  measure();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  return {
    to(v) {
      const next = digits(v);
      const up = Number(v) > value;
      strips.forEach((s, k) => {
        let from = now(s);
        s.getAnimations().forEach(a => a.cancel());
        if (from >= 20) from -= 10; else if (from < 10) from += 10;
        const d = next[k] === null ? 0 : next[k];
        const target = up ? d + 10 * Math.ceil((from - d) / 10 - 1e-6) : d + 10 * Math.floor((from - d) / 10 + 1e-6);
        at(s, target);
        if (!reducedMotion && Math.abs(target - from) > 0.001) {
          const a = s.animate([{ transform: `translateY(${-from}em)` }, { transform: `translateY(${-target}em)` }],
            { duration: 560, easing: EASE_OUT });
          a.onfinish = () => at(s, rest(next[k]));
        } else {
          at(s, rest(next[k]));
        }
        colEls[k].classList.toggle('is-blank', next[k] === null);
      });
      cur = next;
      value = Number(v);
    }
  };
}

// ── The reading travels ────────────────────────────────
// Switching readings moves the chosen release's dot along the nozzle's
// inner wall, from the reading it leaves to the one it takes, with its
// leader drawn from the dot the whole way. It shows where each release read
// the stress, as well as that the number changed. The wall is the path
// traced on the plot (the view's `wall`), from the v2.0 reading to v1.0's.
function wallTravel(layer, view) {
  const svg = layer.querySelector('svg');
  if (!svg || !view.wall || reducedMotion) return null;
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', view.wall);
  path.setAttribute('fill', 'none');
  svg.appendChild(path);
  const len = path.getTotalLength();
  const [w, h] = view.size;
  const ease = (t) => t < 0.5 ? 8 * t ** 4 : 1 - (-2 * t + 2) ** 4 / 2;
  const put = (dot, line, x, y) => {
    dot.style.left = `${(x / w * 100).toFixed(3)}%`;
    dot.style.top = `${(y / h * 100).toFixed(3)}%`;
    line.setAttribute('x1', x.toFixed(1));
    line.setAttribute('y1', y.toFixed(1));
  };
  let raf = 0, home = null;
  return (id) => {
    // A second switch mid-way sends the first dot home before the next sets off.
    if (home) { cancelAnimationFrame(raf); home(); home = null; }
    const c = view.callouts.find(x => x.rev === id);
    const dot = layer.querySelector(`.callout-dot[data-rev="${id}"]`);
    const line = layer.querySelector(`line[data-rev="${id}"]`);
    if (!c || !dot || !line) return;
    const to = id === 'v1.0' ? 1 : 0, from = 1 - to;
    home = () => put(dot, line, c.x, c.y);
    let t0 = 0;
    const frame = (t) => {
      if (!t0) t0 = t;
      const k = Math.min(1, (t - t0) / 560);
      const p = path.getPointAtLength((from + (to - from) * ease(k)) * len);
      put(dot, line, p.x, p.y);
      if (k < 1) raf = requestAnimationFrame(frame);
      else { home(); home = null; }
    };
    raf = requestAnimationFrame(frame);
  };
}

// ── The revision switch ────────────────────────────────
// The home page's figure is the nozzle as v2.0 reads it. The switch moves
// the reading back to where v1.0 took it, the throat, and the readout and
// its note follow from the project's own revision record, so the numbers
// can never disagree with the projects page. The chosen release's leader
// comes forward; the other steps back. Without script the switch is hidden
// and the figure keeps both readings drawn, with the note naming both.
function initRevisionSwitch() {
  const rig = document.querySelector('.hero-rig');
  const nozzle = PROJECTS.find(p => p.anchor === 'p-nozzle');
  const r = nozzle && nozzle.revisions;
  if (!rig || !r) return;
  const num = document.getElementById('rig-num');
  const unit = document.getElementById('rig-unit');
  const note = document.getElementById('rig-note');
  const sw = rig.querySelector('.rig-switch');
  const buttons = [...rig.querySelectorAll('.rig-switch button')];
  const fos = (rel) => (rel.values.find(v => v.k === 'Factor of safety') || {}).v || '';
  const unitOf = (rel) => `factor of safety, ${rel.id}, ${rel.superseded ? 'withdrawn' : 'current'}`;
  // The note for the release the page opens on is the page's own sentence,
  // which names both readings for a reader who never touches the switch;
  // the other release's is the revision record's.
  const first = rig.dataset.rev;
  const opening = note.textContent.trim();
  const noteOf = (rel) => rel.id === first ? opening : rel.note;
  // Both releases' label and note are laid in the same place, the one not
  // shown transparent, so the readout keeps the height of the longer note
  // and the sentence under it stays put.
  const stack = (el, text) => {
    el.innerHTML = r.releases.map(rel => `<span data-rev="${rel.id}"${rel.id === first ? ' class="is-on"' : ''}>${text(rel)}</span>`).join('');
    el.setAttribute('aria-hidden', 'true');
  };
  stack(unit, unitOf);
  stack(note, noteOf);
  const said = document.createElement('p');
  said.className = 'sr-only';
  rig.querySelector('.rig-read').appendChild(said);
  const say = (rel) => { said.textContent = `Factor of safety ${fos(rel)}, ${unitOf(rel).replace('factor of safety, ', '')}. ${noteOf(rel)}`; };
  const firstRel = r.releases.find(x => x.id === first) || r.releases[0];
  say(firstRel);
  const odo = odometer(num, r.releases.map(fos), fos(firstRel));
  num.classList.toggle('is-withdrawn', !!firstRel.superseded);
  initSegmented(sw);
  const layer = rig.querySelector('.callouts');
  const view = nozzle.views.find(v => v.callouts);
  const travel = layer && view ? wallTravel(layer, view) : null;
  const set = (id) => {
    const rel = r.releases.find(x => x.id === id);
    if (!rel || rig.dataset.rev === id) return;
    rig.dataset.rev = id;
    buttons.forEach(b => b.setAttribute('aria-pressed', b.dataset.rev === id ? 'true' : 'false'));
    placeThumb(sw);
    odo.to(fos(rel));
    num.classList.toggle('is-withdrawn', !!rel.superseded);
    [unit, note].forEach(el => [...el.children].forEach(s => s.classList.toggle('is-on', s.dataset.rev === id)));
    say(rel);
    if (travel) travel(id);
    if (reducedMotion) settle(num, false);
  };
  buttons.forEach(b => b.addEventListener('click', () => set(b.dataset.rev)));
}

// The GitHub mark for the repository buttons (fill, so it reads at 16px).
const GITHUB_ICON = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path fill="currentColor" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/></svg>';

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
            <span class="thumb-label">${v.label}</span>
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
    // The heading for the hand builds carries a small index of the three,
    // with their pictures, so it does not stand alone in half the width.
    const pic = (q) => q.gridThumb || (q.views.find(x => x.src) || {}).src || (q.views.find(x => x.poster) || {}).poster;
    const builds = PROJECTS.filter(q => q.group === 'built');
    const groupHead = isBuilt && PROJECTS[pi - 1] && PROJECTS[pi - 1].group !== 'built' ? `
    <div id="built" data-section="built" class="built-head section-reveal">
      <div class="wrap grid12">
        <header class="col-read rv">
          <h2 class="sec-title">Built by hand</h2>
          <p class="sec-lede">Three projects where the drawing became a thing on a bench: a foam-board UAV, a carved rotor and a servo-driven wing section.</p>
        </header>
        <nav class="col-side rv" style="--rv:1" aria-label="The three builds"><ul class="built-jump">${builds.map(q => `
          <li><a href="#${q.anchor}"><img src="${pic(q)}" alt="" loading="lazy" style="object-position:${q.gridFocus || 'center'};"><span>${q.short}</span></a></li>`).join('')}
        </ul></nav>
      </div>
    </div>` : '';
    const repoHtml = p.repo
      ? `<a href="${p.repo}" class="proj-repo-btn btn btn-quiet" target="_blank" rel="noopener">${GITHUB_ICON}Full working on GitHub</a>`
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

        <div class="proj-stage rv" style="--rv:1">
          <div class="${splitClass}" data-ui>
            <button type="button" class="lead-btn" onclick="openLightbox(${pi})" title="Click to enlarge">
              <div id="lead-img-${pi}" class="lead-media-area" style="display:block;background:var(--surface);min-height:0;overflow:hidden;box-sizing:border-box;"></div>
              <div class="lead-cap-row">
                <span id="lead-cap-${pi}" class="lead-cap"></span>
                <span class="lead-enlarge">⤢ Enlarge${p.views.length > 1 ? `, ${p.views.length} figures` : ''}</span>
                <span id="lead-key-${pi}" class="callout-key" role="list" hidden></span>
              </div>
            </button>
            ${thumbsHtml}
            <span id="lead-key-below-${pi}" class="callout-key key-below" role="list" hidden></span>
          </div>
        </div>

        <div class="proj-read rv">
          <h2 class="proj-title">${p.title}</h2>
          <p class="proj-result">${p.result}</p>
          <p class="proj-tags">${p.wip ? '<span class="proj-status">Analysis in progress.</span> ' : ''}${tagLine(p.kicker)}</p>
          ${readHtml}
          ${repoHtml}
        </div>

      </div>
    </section>`;
  }).join('');

  // Seven lead figures (and their blurred backdrops) used to start loading
  // together on arrival, competing with the one on screen. Each is now built
  // when its section comes within 800px of the viewport. They are not lazy
  // <img>s because Safari can skip the load of a lazy image inserted by script.
  const leads = PROJECTS.map((_, pi) => document.getElementById(`lead-img-${pi}`));
  const built = new Set();
  let seen = null;
  const ensure = (pi) => {
    if (built.has(pi) || !leads[pi]) return;
    built.add(pi);
    renderGallery(pi);
    if (seen) seen.unobserve(leads[pi]);
  };
  // An in-page jump builds the figures it is about to land among before it
  // moves, so nothing is built while the page is in motion.
  // Returns the images of the figures it had to build, so the jump can let
  // them decode before it moves.
  window.ensureLeadsBetween = (y0, y1) => {
    const fresh = [];
    leads.forEach((el, pi) => {
      if (!el || built.has(pi)) return;
      let y = 0; for (let n = el; n; n = n.offsetParent) y += n.offsetTop;
      if (y + el.offsetHeight > y0 && y < y1) { ensure(pi); fresh.push(...el.querySelectorAll('img')); }
    });
    return fresh;
  };
  if ('IntersectionObserver' in window) {
    seen = new IntersectionObserver((entries) => entries.forEach(e => {
      if (e.isIntersecting) ensure(+e.target.dataset.pi);
    }), { rootMargin: '800px 0px' });
    leads.forEach((el, pi) => { if (el) { el.dataset.pi = pi; seen.observe(el); } });
    // Once the page has loaded, the rest are built in idle time, one per
    // idle period, so a jump deep into the page finds them already drawn.
    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 250));
    window.addEventListener('load', () => {
      let i = 0;
      const next = () => {
        while (i < leads.length && built.has(i)) i++;
        if (i >= leads.length) return;
        ensure(i++);
        idle(next, { timeout: 2000 });
      };
      idle(next, { timeout: 2000 });
    }, { once: true });
  } else {
    PROJECTS.forEach((_, pi) => ensure(pi));
  }

  container.querySelectorAll('.rev-toggle').forEach(initSegmented);

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
    scrollArea(rail);
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
    attachSwipe(btn, () => step(-1), () => step(1),
      () => [...area.querySelectorAll(':scope > img, :scope > video, :scope > .callouts')]);
  });
}

// Hand-drawn brand marks for tools simple/iconic enough to reproduce
// accurately from memory (see RASTER_LOGOS below for real vendor artwork,
// and toolItem() for the plain monogram used when neither exists).
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

// A tool is its name with its mark. A vendor logo drawn on a white or a
// black field keeps that field as a small plate, so it never shows a
// mismatched box on the other theme; a transparent one sits on the page.
function toolItem(t) {
  let icon;
  if (t.raster) {
    const { src, bg } = RASTER_LOGOS[t.raster];
    const plate = bg === '#fff' ? ' is-plate' : bg === '#000' ? ' is-dark' : '';
    icon = `<span class="tool-icon${plate}"><img src="${src}" alt="" loading="lazy"></span>`;
  } else if (t.icon) {
    icon = `<span class="tool-icon">${TOOL_ICONS[t.icon]}</span>`;
  } else {
    icon = `<span class="tool-icon"><span class="initials">${t.initials}</span></span>`;
  }
  return `<li class="tool-item">${icon}<span>${t.name}</span></li>`;
}

function buildSoftware() {
  const list = document.getElementById('software-list');
  if (!list) return;
  list.innerHTML = TOOL_GROUPS.map(g => `
    <div class="tool-group">
      <p class="tool-group-label">${g.label}</p>
      <ul class="tool-list">${TOOLS.filter(t => t.cat === g.id).map(toolItem).join('')}</ul>
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
    document.documentElement.classList.remove('menu-open');
    if (menuBtn) { menuBtn.setAttribute('aria-expanded', 'false'); menuLabel.textContent = 'Menu'; }
  };
  if (nav && navScroll) {
    menuBtn = document.createElement('button');
    menuBtn.type = 'button';
    menuBtn.className = 'nav-menu-btn';
    menuBtn.setAttribute('aria-controls', 'nav-scroll');
    menuBtn.setAttribute('aria-expanded', 'false');
    // A word, not an icon: "Menu" says what it opens, "Close" what it does.
    menuBtn.innerHTML = '<span class="nav-menu-label">Menu</span>';
    const actions = nav.querySelector('.nav-actions');
    (actions || navScroll.parentNode).insertBefore(menuBtn, actions ? actions.firstChild : navScroll);
    menuLabel = menuBtn.querySelector('.nav-menu-label');
    nav.classList.add('nav-collapsed');

    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const open = nav.classList.toggle('nav-open');
      menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      menuLabel.textContent = open ? 'Close' : 'Menu';
      document.documentElement.classList.toggle('menu-open', open);
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

  const hereEl = document.getElementById('nav-here');
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
    // Only sections the nav links to count: an inner page's footer has a
    // data-section but no link, and lighting it left the phone menu saying
    // "Jump to a section" at the bottom of the page.
    const linked = [...document.querySelectorAll('[data-section]')]
      .filter(s => document.querySelector(`[data-nav="${s.getAttribute('data-section')}"]`));
    if (linked.length && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
      best = linked[linked.length - 1].getAttribute('data-section');
    }
    let activeEl = null;
    document.querySelectorAll('[data-nav]').forEach(a => {
      const on = a.getAttribute('data-nav') === best;
      a.classList.toggle('active', on);
      if (on) activeEl = a;
    });
    // On the projects page the bar names the chapter you are reading after
    // the page's own name, so a long page always says where you are.
    if (hereEl) {
      const cur = currentChapter();
      const p = cur && PROJECTS.find(x => x.anchor === cur);
      const next = p ? p.short : 'Jump to a project';
      if (hereEl.textContent !== next) hereEl.textContent = next;
    }
    if (nav) nav.classList.toggle('is-stuck', window.scrollY > 4);
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
// The picture follows the finger the whole way (it used to change only on
// release, with nothing moving underneath), then carries on out or springs
// back.
function attachSwipe(el, onPrev, onNext, follow) {
  if (!el) return;
  el.classList.add('swipe-x');
  let id = null, x0 = 0, y0 = 0, t0 = 0, axis = null, swiped = false;
  // What follows the finger (from `follow`), how far it has been moved, and
  // the spring taking it back, if one is running: a new touch stops it
  // where it is and the drag carries on from there.
  let moving = null, off = 0, from = 0, back = null, hist = [];
  const put = (x) => { off = x; if (moving) moving.forEach(m => { m.style.transform = x ? `translateX(${x}px)` : ''; }); };

  el.addEventListener('pointerdown', (e) => {
    if (id !== null) return;                // a second finger mid-swipe would jump
    if (e.pointerType === 'mouse') return;  // a mouse has the arrows
    id = e.pointerId; x0 = e.clientX; y0 = e.clientY; t0 = e.timeStamp; axis = null;
    // A touch swipe usually ends with no click at all, and the flag below
    // then ate the next real tap (it took two to open the viewer after a
    // swipe). A new touch means the swipe's click is not coming.
    swiped = false;
    if (back) { back.stop(); back = null; }
    from = off;
    hist = [{ t: e.timeStamp, x: e.clientX, y: 0 }];
  }, { passive: true });

  el.addEventListener('pointermove', (e) => {
    if (e.pointerId !== id || axis === 'y') return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    if (axis === null && Math.abs(dx) + Math.abs(dy) > 10) {
      axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
      if (axis === 'x') {
        try { el.setPointerCapture(id); } catch (_) {}
        if (follow && !reducedMotion && !moving) moving = follow();
      }
    }
    if (axis !== 'x') return;
    hist.push({ t: e.timeStamp, x: e.clientX, y: 0 });
    if (hist.length > 8) hist.shift();
    put(from + dx);
  }, { passive: true });

  const end = (e) => {
    if (e.pointerId !== id) return;
    const dx = e.clientX - x0;
    const v = Math.abs(dx) / Math.max(1, e.timeStamp - t0);
    const fling = recentVelocity(hist).x;
    if (axis === 'x' && (Math.abs(dx) > 45 || v > 0.11)) {
      swiped = true;
      const go = dx < 0 ? onNext : onPrev;
      if (moving) {
        // On out at the finger's speed, then the next comes in from the
        // other side: the one that leaves and the one that arrives move the
        // same way.
        const dir = dx < 0 ? 1 : -1;
        const w = el.getBoundingClientRect().width;
        const gone = moving;
        const dur = Math.max(90, Math.min(170, (w * 0.5 - Math.abs(off)) / Math.max(Math.abs(fling), 1.2)));
        let left = gone.length;
        gone.forEach(m => {
          const a = m.animate([{ transform: `translateX(${off}px)`, opacity: 1 }, { transform: `translateX(${-dir * w * 0.5}px)`, opacity: 0 }],
            { duration: dur, easing: 'linear', fill: 'forwards' });
          a.onfinish = () => {
            if (--left) return;
            go();
            const next = follow();
            next.forEach(n => n.animate([{ transform: `translateX(${dir * Math.min(80, w * 0.2)}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
              { duration: 240, easing: EASE_OUT }));
            // Whatever stays in the page (a carousel's slide) drops its
            // held pose once its own fade has hidden it.
            setTimeout(() => gone.forEach(g => { g.style.transform = ''; g.getAnimations().forEach(x => x.cancel()); }), 340);
          };
        });
        moving = null; off = 0;
      } else {
        go();
      }
    } else if (axis === 'x' && moving) {
      const held = moving;
      back = spring2({ x: off, y: 0 }, { x: 0, y: 0 }, { x: fling * 1000, y: 0 },
        (p) => put(p.x), () => { back = null; put(0); if (moving === held) moving = null; });
    }
    id = null; axis = null;
  };
  el.addEventListener('pointerup', end);
  el.addEventListener('pointercancel', () => {
    id = null; axis = null;
    if (moving && off) { const held = moving; back = spring2({ x: off, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }, (p) => put(p.x), () => { back = null; put(0); if (moving === held) moving = null; }); }
  });

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

// ── Springs ────────────────────────────────────────────
// A critically damped spring (no overshoot), for whatever a finger lets
// go of: it starts at the finger's own speed, so there is no seam between
// the drag and the motion, and settles on its target in about `response`
// seconds. X and Y are two springs, since each axis has its own speed.
// Grabbing again stops it where it is and the drag carries on from there.
function spring2(from, to, v, onFrame, done, response = 0.36) {
  const w = 2 * Math.PI / response;
  const axis = (x0, v0) => ({ x0, v0, c: v0 + w * x0 });
  const ax = axis(from.x - to.x, v.x), ay = axis(from.y - to.y, v.y);
  const pos = (a, t) => (a.x0 + a.c * t) * Math.exp(-w * t);
  const vel = (a, t) => (a.v0 - w * a.c * t) * Math.exp(-w * t);
  let raf = 0, t0 = 0, stopped = false;
  const frame = (now) => {
    if (stopped) return;
    if (!t0) t0 = now;
    const t = (now - t0) / 1000;
    const x = pos(ax, t), y = pos(ay, t);
    const still = Math.abs(x) < 0.4 && Math.abs(y) < 0.4 && Math.abs(vel(ax, t)) < 20 && Math.abs(vel(ay, t)) < 20;
    if (still || t > 1.5) { stopped = true; onFrame({ x: to.x, y: to.y }); if (done) done(); return; }
    onFrame({ x: to.x + x, y: to.y + y });
    raf = requestAnimationFrame(frame);
  };
  raf = requestAnimationFrame(frame);
  return { stop() { stopped = true; cancelAnimationFrame(raf); } };
}
// Resistance past an edge: the further past, the less it follows (Apple's
// rubber band, c = 0.55).
const rubber = (over, dim) => (over * dim * 0.55) / (dim + 0.55 * over);
// Velocity from the last ~90ms of a pointer's samples, in px/ms.
function recentVelocity(hist) {
  const last = hist[hist.length - 1];
  if (!last) return { x: 0, y: 0 };
  let i = hist.length - 1;
  while (i > 0 && last.t - hist[i - 1].t <= 90) i--;
  const first = hist[i === hist.length - 1 ? Math.max(0, i - 1) : i];
  const dt = Math.max(1, last.t - first.t);
  return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt };
}

// The unzoomed figure under a finger in the viewer: across steps to the
// next figure, down closes the viewer.
const lbDrag = { x: 0, y: 0, axis: null };

function initLightboxZoom() {
  const stage = document.getElementById('lightbox-media');
  const lb = document.getElementById('lightbox');
  const closeBtn = document.getElementById('lb-close');
  if (closeBtn) closeBtn.addEventListener('click', (e) => { e.stopPropagation(); closeLightbox(); });
  [['lb-prev', -1], ['lb-next', 1]].forEach(([id, d]) => {
    const b = document.getElementById(id);
    if (b) b.addEventListener('click', (e) => { e.stopPropagation(); lbStep(d); });
  });
  if (!stage || !window.PointerEvent) return;

  const coarse = window.matchMedia('(pointer: coarse)');
  const pts = new Map();
  let base = null, lastTap = 0, dragged = false, hist = [], moving = null;
  const stop = () => { if (moving) { moving.stop(); moving = null; } };

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
  const many = () => lbProject !== null && PROJECTS[lbProject].views.length > 1;

  // Draws the unzoomed drag. Across: the figure follows the finger (with
  // resistance when there is no other figure to step to). Down: it follows
  // freely and shrinks a little, the backdrop and the controls fading with
  // the distance; up resists.
  const showDrag = () => {
    const m = lbEl();
    if (!m) return;
    m.classList.remove('settling');
    if (lbDrag.axis === 'y') {
      const down = Math.max(0, lbDrag.y);
      const y = lbDrag.y >= 0 ? lbDrag.y : -rubber(-lbDrag.y, m.offsetHeight);
      const s = 1 - Math.min(0.25, down / (window.innerHeight * 1.2));
      m.style.transform = `translate(${lbDrag.x + (1 - s) * m.offsetWidth / 2}px, ${y + (1 - s) * m.offsetHeight / 2}px) scale(${s})`;
      const k = Math.min(1, down / (window.innerHeight * 0.45));
      lb.style.backgroundColor = `rgba(14, 16, 17, ${(0.9 * (1 - k)).toFixed(3)})`;
      lbChrome().forEach(c => { c.style.opacity = String(1 - Math.min(1, down / 120)); });
    } else {
      const x = many() ? lbDrag.x : Math.sign(lbDrag.x) * rubber(Math.abs(lbDrag.x), m.offsetWidth);
      m.style.transform = x ? `translateX(${x}px)` : '';
    }
  };
  const clearDrag = () => {
    const m = lbEl();
    if (m) m.style.transform = '';
    lb.style.backgroundColor = '';
    lbChrome().forEach(c => { c.style.opacity = ''; });
    lbDrag.x = 0; lbDrag.y = 0; lbDrag.axis = null;
  };
  // Zoomed in: the pan resists past the picture's edges instead of
  // stopping dead, and on release coasts with the finger's speed to where
  // that speed would carry it (Apple's projection, deceleration 0.996/ms),
  // springing back inside the edges if it would have gone past them.
  const bounds = () => {
    const m = lbEl();
    return m ? { x: m.offsetWidth * (1 - lbZoom.scale), y: m.offsetHeight * (1 - lbZoom.scale), w: m.offsetWidth, h: m.offsetHeight } : null;
  };
  const band = (v, lo, dim) => v > 0 ? rubber(v, dim) : v < lo ? lo - rubber(lo - v, dim) : v;
  const panTo = (x, y) => {
    const b = bounds();
    if (!b) return;
    lbZoom.tx = band(x, b.x, b.w);
    lbZoom.ty = band(y, b.y, b.h);
    lbApply(false);
  };
  const coast = (v) => {
    const b = bounds();
    if (!b) return;
    const reach = 0.996 / (1 - 0.996);
    const clamp = (p, lo) => Math.min(0, Math.max(lo, p));
    const to = { x: clamp(lbZoom.tx + v.x * reach, b.x), y: clamp(lbZoom.ty + v.y * reach, b.y) };
    moving = spring2({ x: lbZoom.tx, y: lbZoom.ty }, to, { x: v.x * 1000, y: v.y * 1000 },
      (p) => { lbZoom.tx = p.x; lbZoom.ty = p.y; lbApply(false); }, () => { moving = null; }, 0.5);
  };
  // Released across: past 45px or flicked (the page's thresholds), the
  // figure carries on out at the finger's speed and the next comes in from
  // the other side; otherwise it springs back.
  const releaseAcross = (avg, v) => {
    const m = lbEl();
    if (!m) return;
    if (many() && (Math.abs(lbDrag.x) > 45 || avg > 0.11)) {
      const dir = lbDrag.x < 0 ? 1 : -1;
      const w = m.offsetWidth + 40;
      const dur = Math.max(90, Math.min(180, (w - Math.abs(lbDrag.x)) / Math.max(Math.abs(v.x), 1.2)));
      const out = m.animate([{ transform: `translateX(${lbDrag.x}px)` }, { transform: `translateX(${-dir * w}px)` }],
        { duration: dur, easing: 'linear', fill: 'forwards' });
      out.onfinish = () => {
        clearDrag();
        lbStep(dir);
        const n = lbEl();
        if (n) n.animate([{ transform: `translateX(${dir * Math.min(120, w * 0.25)}px)`, opacity: 0 }, { transform: 'none', opacity: 1 }],
          { duration: 240, easing: EASE_OUT });
      };
      return;
    }
    moving = spring2({ x: lbDrag.x, y: 0 }, { x: 0, y: 0 }, { x: v.x * 1000, y: 0 },
      (p) => { lbDrag.x = p.x; showDrag(); }, () => { moving = null; clearDrag(); });
  };
  // Released after a drag down: far enough, or flicked down, closes the
  // viewer into the figure's place on the page; otherwise everything
  // springs back.
  const releaseDown = (v) => {
    if (lbDrag.y > 110 || (v.y > 0.5 && lbDrag.y > 30)) { closeLightbox(); return; }
    moving = spring2({ x: lbDrag.x, y: lbDrag.y }, { x: 0, y: 0 }, { x: v.x * 1000, y: v.y * 1000 },
      (p) => { lbDrag.x = p.x; lbDrag.y = p.y; showDrag(); }, () => { moving = null; clearDrag(); });
  };

  stage.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse') return;
    stop();
    pts.set(e.pointerId, local(e));
    dragged = false;
    hist = [{ t: e.timeStamp, ...local(e) }];
    try { stage.setPointerCapture(e.pointerId); } catch (_) {}
    base = (pts.size === 2)
      ? { d: spread(), s: lbZoom.scale, pinch: true }
      : { s: lbZoom.scale, tx: lbZoom.tx, ty: lbZoom.ty, p: local(e), t: e.timeStamp, ox: lbDrag.x, oy: lbDrag.y };
  });

  stage.addEventListener('pointermove', (e) => {
    if (!pts.has(e.pointerId) || !base) return;
    const q = local(e);
    pts.set(e.pointerId, q);
    hist.push({ t: e.timeStamp, ...q });
    if (hist.length > 8) hist.shift();
    if (pts.size >= 2 && base.pinch) {
      const c = centroid();
      lbSetScale(base.s * (spread() / base.d), c.x, c.y);
      dragged = true;
      lbApply(false);
      return;
    }
    if (pts.size !== 1 || base.pinch) return;
    const dx = q.x - base.p.x, dy = q.y - base.p.y;
    if (base.s > 1.01) {
      if (Math.abs(dx) + Math.abs(dy) > 6) dragged = true;
      panTo(base.tx + dx, base.ty + dy);
      return;
    }
    // Unzoomed. The direction is settled on the first 10px of travel.
    if (!lbDrag.axis) {
      if (Math.abs(dx) + Math.abs(dy) < 10) return;
      lbDrag.axis = Math.abs(dx) > Math.abs(dy) ? 'x' : 'y';
    }
    dragged = true;
    if (reducedMotion) return;
    lbDrag.x = base.ox + dx;
    lbDrag.y = lbDrag.axis === 'y' ? base.oy + dy : 0;
    showDrag();
  });

  const lift = (e) => {
    if (!pts.has(e.pointerId)) return;
    pts.delete(e.pointerId);
    if (pts.size === 1) {
      // Second finger lifted mid-pinch — re-anchor rather than let it jump.
      const only = Array.from(pts.values())[0];
      base = { s: lbZoom.scale, tx: lbZoom.tx, ty: lbZoom.ty, p: only, t: e.timeStamp, ox: lbDrag.x, oy: lbDrag.y };
      hist = [{ t: e.timeStamp, ...only }];
      return;
    }
    if (pts.size) return;
    const start = base;
    base = null;
    const v = recentVelocity(hist);
    if (start && !start.pinch && start.s > 1.01 && dragged) { coast(v); return; }
    // A pinch let go just above 1x snaps back to it.
    if (lbZoom.scale !== 1 && lbZoom.scale < 1.02) lbResetZoom(true);

    if (dragged && start && !start.pinch && lbDrag.axis) {
      if (reducedMotion) {
        // No travel: a swipe across steps, a swipe down closes.
        const dx = local(e).x - start.p.x, dy = local(e).y - start.p.y;
        const axis = lbDrag.axis;
        clearDrag();
        if (axis === 'x' && Math.abs(dx) > 45) lbStep(dx < 0 ? 1 : -1);
        else if (axis === 'y' && dy > 110) closeLightbox();
        return;
      }
      const avg = Math.abs(lbDrag.x - start.ox) / Math.max(1, e.timeStamp - start.t);
      if (lbDrag.axis === 'x') releaseAcross(avg, v); else releaseDown(v);
      return;
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
  const ease = (t) => 1 - Math.pow(1 - t, 4);
  const stop = () => { run++; };
  ['wheel', 'touchstart', 'keydown'].forEach(ev => window.addEventListener(ev, stop, { passive: true }));
  const pageY = (n) => { let y = 0; for (; n; n = n.offsetParent) y += n.offsetTop; return y; };
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
    // parts slide up as they reveal, and a rect taken mid-slide lands short.
    const targetY = () => {
      const margin = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
      const max = document.scrollingElement.scrollHeight - window.innerHeight;
      return Math.max(0, Math.min(max, pageY(el) - margin));
    };
    const vh = window.innerHeight;
    // Arrive to a finished page: the sections around the target are shown at
    // once rather than fading in after the scroll has stopped, and any
    // project figure there is built now, before the glide, not during it.
    const y = targetY();
    document.querySelectorAll('.section-reveal:not(.visible)').forEach(s => {
      const top = pageY(s);
      if (top < y + vh * 1.5 && top + s.offsetHeight > y - vh) s.classList.add('visible', 'reveal-instant');
    });
    const fresh = window.ensureLeadsBetween ? window.ensureLeadsBetween(y - vh, y + vh * 1.5) : [];
    requestAnimationFrame(() => requestAnimationFrame(() =>
      document.querySelectorAll('.reveal-instant').forEach(s => s.classList.remove('reveal-instant'))));
    // A long jump used to race past every chapter in between in 400ms: a
    // blur of half-drawn figures, each built as it flashed by, and the
    // frames dropped while they were. Now the page goes straight to half a
    // screen short of the target and glides only that last stretch, so the
    // motion shows the arrival, which is the part that carries meaning.
    let from = window.scrollY;
    const far = Math.abs(y - from) > vh * 1.5;
    if (far) {
      from = y - Math.sign(y - from) * vh * 0.5;
      window.scrollTo({ top: from, behavior: 'instant' });
    }
    const id = ++run;
    let t0 = 0, to = 0, dur = 0;
    // The target is measured once, when the glide starts, and corrected on
    // the last frame. Measuring it every frame forced a layout of the whole
    // page inside the animation, which was most of the stutter.
    const frame = (now) => {
      if (id !== run) return;
      if (!t0) { t0 = now; to = targetY(); dur = Math.min(380, 220 + Math.abs(to - from) * 0.12); }
      const k = Math.min(1, (now - t0) / dur);
      window.scrollTo({ top: k < 1 ? from + (to - from) * ease(k) : targetY(), behavior: 'instant' });
      if (k < 1) requestAnimationFrame(frame);
    };
    // After a jump, or with a figure built just now (decoded first, at most
    // 120ms), one frame is painted at the landing spot before the glide, so
    // the first paint of that region happens while the page is still.
    const start = () => requestAnimationFrame(() => requestAnimationFrame(frame));
    if (fresh.length && fresh[0].decode) {
      Promise.race([Promise.all(fresh.map(i => i.decode().catch(() => {}))), new Promise(r => setTimeout(r, 120))]).then(start);
    } else if (far) {
      start();
    } else {
      requestAnimationFrame(frame);
    }
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
  // On screen at load, or the target of the link that brought the visitor
  // here: shown at once, with no fade, so a page never opens on a blank band.
  const hashEl = location.hash && document.getElementById(decodeURIComponent(location.hash.slice(1)));
  const hashSection = hashEl && (hashEl.closest('.section-reveal') || (hashEl.classList.contains('section-reveal') ? hashEl : null));
  const instant = [];
  document.querySelectorAll('.section-reveal').forEach(el => {
    const r = el.getBoundingClientRect();
    if ((r.top < window.innerHeight && r.bottom > 0) || el === hashSection) {
      el.classList.add('visible', 'reveal-instant');
      instant.push(el);
    } else {
      obs.observe(el);
    }
  });
  requestAnimationFrame(() => requestAnimationFrame(() =>
    instant.forEach(el => el.classList.remove('reveal-instant'))));

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

// The interests as a small tree: the centre, five kinds of thing, and each
// interest on its own branch. It is also the index of the photo strip above
// it: an interest with a photo there has a yellow dot, pointing at it lights
// that photo, and pointing at a photo lights its branch. Nothing moves on
// its own; the branches lean from the pointer and a single signal runs out
// to the interest you choose.
function initHobbyGraph() {
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
  const ITEM_FONT = 15, HUB_FONT = 14;

  // Colours from the page's tokens, so the graph follows the theme.
  const rgb = (hex) => {
    const h = hex.trim().replace('#', '');
    const f = h.length === 3 ? h.split('').map(c => c + c).join('') : h;
    return [0, 2, 4].map(i => parseInt(f.slice(i, i + 2), 16)).join(',');
  };
  let C;
  function readColors() {
    const cs = getComputedStyle(document.documentElement);
    const v = (n) => cs.getPropertyValue(n).trim();
    C = { ink: v('--ink'), inkRGB: rgb(v('--ink')), muted: v('--muted'), mutedRGB: rgb(v('--muted')),
          surface: v('--surface'), accent: v('--accent') };
  }
  readColors();
  const FONT = getComputedStyle(document.documentElement).getPropertyValue('--font-sans');

  // The strip's photos, keyed by the interest each one shows.
  const photos = new Map([...document.querySelectorAll('.hobby-strip [data-interest]')]
    .map(li => [li.dataset.interest, li]));
  const stripList = document.querySelector('.hobby-strip');

  const seeded = (k) => () => { k = k + 0x6D2B79F5 | 0; let t = Math.imul(k ^ k >>> 15, 1 | k); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

  // Centre -> category hub -> that category's interests. No other edges.
  const nodes = [];
  const edges = [];
  const add = (n) => { n.x = n.y = n.ax = n.ay = 0; n.vx = n.vy = 0; nodes.push(n); return nodes.length - 1; };
  const centre = add({ kind: 'centre', r: 5 });
  const interests = [];
  GROUPS.forEach((g) => {
    g.hub = add({ kind: 'hub', label: g.label, r: 0 });
    edges.push({ a: centre, b: g.hub });
    g.ids = g.items.map((label) => {
      const i = add({ kind: 'interest', label, hub: g.hub, r: 4, photo: photos.has(label) });
      edges.push({ a: g.hub, b: i });
      interests.push(i);
      return i;
    });
  });
  const byLabel = new Map(interests.map(i => [nodes[i].label, i]));
  // Wide panels split the categories either side of the centre; narrow ones
  // (phones) run a single column with every label on the right.
  const LEFT = GROUPS.filter(g => g.label === 'Sport' || g.label === 'Tech');
  const RIGHT = GROUPS.filter(g => !LEFT.includes(g));

  // A hub is its category name on the panel's own colour, so the lines that
  // meet it stop at the word. Interest labels sit on the side away from it.
  const labelW = {};
  function labelBox(n) {
    const w = labelW[n.label], x = n.ax, y = n.ay;
    if (n.kind === 'interest') return n.side === 'L' ? [x - w - 13, y - 10, x - 6, y + 10] : [x + 6, y - 10, x + w + 13, y + 10];
    if (n.kind === 'hub') return [x - w / 2 - 8, y - 11, x + w / 2 + 8, y + 11];
    return null;
  }
  const grow = (r, m) => [r[0] - m, r[1] - m, r[2] + m, r[3] + m];
  const boxesMeet = (a, b) => a[0] < b[2] && b[0] < a[2] && a[1] < b[3] && b[1] < a[3];
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

  // Collisions in the current anchors: a label over a line it does not
  // belong to, over a dot or another label; a dot on a foreign line; two
  // lines crossing; anything outside the panel.
  let W = 0, H = 0;
  function collisions() {
    let bad = 0;
    const boxes = nodes.map(labelBox);
    nodes.forEach((n, i) => {
      if (n.ax < 8 || n.ax > W - 8 || n.ay < 8 || n.ay > H - 8) bad++;
      const b = boxes[i];
      if (!b) return;
      if (b[0] < 4 || b[2] > W - 4 || b[1] < 4 || b[3] > H - 4) bad++;
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
      nodes.forEach((n, k) => { if (n.kind !== 'hub' && k !== e.a && k !== e.b && distToSeg(n.ax, n.ay, A, B) < n.r + 5) bad++; });
      edges.forEach((f, fi) => {
        if (fi > ei && f.a !== e.a && f.a !== e.b && f.b !== e.a && f.b !== e.b && segsCross(A, B, nodes[f.a], nodes[f.b])) bad++;
      });
    });
    return bad;
  }

  // Interests stack in a column per side with their labels pointing out;
  // each hub fans out to its own block of rows, so fans never cross.
  let twoSided = true;
  function place(R) {
    const jit = (a) => R ? (R() - 0.5) * 2 * a : 0;
    const widest = (gs) => Math.max(...gs.flatMap(g => g.items.map(l => labelW[l])));
    const top = 22, bottom = H - 22;
    const sides = twoSided
      ? [{ dir: -1, groups: LEFT, col: 20 + widest(LEFT) + 14 }, { dir: 1, groups: RIGHT, col: W - 20 - widest(RIGHT) - 14 }]
      : [{ dir: 1, groups: GROUPS, col: W - 20 - widest(GROUPS) - 14 }];
    const c = nodes[centre];
    c.ax = twoSided ? (sides[0].col + sides[1].col) / 2 : 26;
    c.ay = H / 2 + jit(10);
    sides.forEach(({ dir, groups, col }) => {
      const gap = twoSided ? 0.8 : 1;
      const slots = groups.reduce((t, g) => t + g.items.length, 0) - 1 + gap * (groups.length - 1);
      const step = Math.min(38, (bottom - top) / slots);
      let y = top + (bottom - top - step * slots) / 2;
      const reach = Math.abs(col - c.ax);
      groups.forEach(g => {
        let sum = 0;
        g.ids.forEach(id => {
          const n = nodes[id];
          n.side = dir < 0 ? 'L' : 'R';
          n.ax = col - dir * Math.abs(jit(9));
          n.ay = y + jit(step * 0.1);
          sum += n.ay;
          y += step;
        });
        y += step * (gap - 1) + step;
        const h = nodes[g.hub];
        h.ax = c.ax + dir * reach * (0.5 + jit(0.1));
        h.ay = sum / g.ids.length + jit(6);
      });
    });
  }

  function layout() {
    const rect = wrap.getBoundingClientRect();
    if (!rect.width || (rect.width === W && rect.height === H)) return;
    W = rect.width; H = rect.height;
    ctx.font = `600 ${ITEM_FONT}px ${FONT}`;
    GROUPS.forEach(g => g.items.forEach(l => { labelW[l] = ctx.measureText(l).width; }));
    ctx.font = `600 ${HUB_FONT}px ${FONT}`;
    GROUPS.forEach(g => { labelW[g.label] = ctx.measureText(g.label).width; });
    const widest = (gs) => Math.max(...gs.flatMap(g => g.items.map(l => labelW[l])));
    const mode = (W - 68 - widest(LEFT) - widest(RIGHT)) >= 260;
    if (mode !== twoSided || !wrap.dataset.mode) {
      twoSided = mode;
      wrap.dataset.mode = mode ? 'two' : 'one';
      // One column holds all fifteen rows: give it the height they need.
      wrap.style.height = mode ? '' : `${Math.ceil(56 + 30 * (15 - 1 + GROUPS.length - 1))}px`;
      const r2 = wrap.getBoundingClientRect();
      W = r2.width; H = r2.height;
    }
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    // First jittered variant with no collisions wins; the plain tree is the
    // fallback, and the least-bad of all if even that collides.
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
    nodes.forEach(n => { n.x = n.ax; n.y = n.ay; n.vx = n.vy = 0; });
  }

  const mouse = { x: -9999, y: -9999, active: false };
  let pinned = -1;          // an interest lit from its photo
  let shown = -1;           // the interest currently traced
  let pulse = null;         // one signal, centre -> hub -> interest

  function hovered() {
    if (!mouse.active) return -1;
    ctx.font = `500 ${ITEM_FONT}px ${FONT}`;
    for (const i of interests) {
      const n = nodes[i];
      const w = ctx.measureText(n.label).width;
      const left = n.side === 'L';
      const x0 = left ? n.x - w - 14 : n.x - 9, x1 = left ? n.x + 9 : n.x + w + 14;
      if (mouse.x > x0 && mouse.x < x1 && Math.abs(mouse.y - n.y) < 13) return i;
    }
    return -1;
  }
  const current = () => { const h = hovered(); return h >= 0 ? h : pinned; };

  // Light the traced interest's photo and step the others back.
  function syncStrip(hi) {
    if (!stripList) return;
    const li = hi >= 0 ? photos.get(nodes[hi].label) : null;
    stripList.classList.toggle('is-tracing', !!li);
    photos.forEach(p => p.classList.toggle('is-on', p === li));
  }

  // Branches lean a little from the pointer and spring back; returns whether
  // anything is still moving.
  function step(hi) {
    let moving = false;
    for (const n of nodes) {
      if (n.kind === 'centre') continue;
      n.vx += (n.ax - n.x) * 0.08;
      n.vy += (n.ay - n.y) * 0.08;
      if (mouse.active && hi < 0) {
        const dx = n.x - mouse.x, dy = n.y - mouse.y;
        const d = Math.hypot(dx, dy) || 1;
        if (d < 64) { const f = (64 - d) / 64 * 0.18; n.vx += dx / d * f; n.vy += dy / d * f; }
      }
      n.vx *= 0.78; n.vy *= 0.78;
      n.x += n.vx; n.y += n.vy;
      if (Math.abs(n.vx) > 0.01 || Math.abs(n.vy) > 0.01 || Math.abs(n.ax - n.x) > 0.05 || Math.abs(n.ay - n.y) > 0.05) moving = true;
    }
    return moving;
  }

  function draw(hi, t) {
    ctx.clearRect(0, 0, W, H);
    const lit = new Set();
    if (hi >= 0) { lit.add(hi); lit.add(nodes[hi].hub); lit.add(centre); }
    const tracing = hi >= 0;

    for (const e of edges) {
      const a = nodes[e.a], b = nodes[e.b];
      const on = tracing && lit.has(e.a) && lit.has(e.b);
      ctx.strokeStyle = on ? C.ink : `rgba(${C.mutedRGB},${tracing ? 0.18 : 0.45})`;
      ctx.lineWidth = on ? 2 : 1;
      ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
    }

    // The signal: one solid dot along the traced path.
    if (pulse) {
      const u = Math.min(1, (t - pulse.t0) / 420);
      const seg = u < 0.5 ? 0 : 1, f = u < 0.5 ? u * 2 : (u - 0.5) * 2;
      const a = nodes[pulse.path[seg]], b = nodes[pulse.path[seg + 1]];
      const e = 1 - Math.pow(1 - f, 3);
      ctx.fillStyle = C.accent; ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(a.x + (b.x - a.x) * e, a.y + (b.y - a.y) * e, 5, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
      if (u >= 1) pulse = null;
    }

    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      if (n.kind === 'centre') {
        ctx.fillStyle = C.ink;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill();
      } else if (n.kind === 'hub') {
        const hw = labelW[n.label] / 2 + 8;
        ctx.fillStyle = C.surface;
        ctx.fillRect(n.x - hw, n.y - 11, hw * 2, 22);
      } else {
        const on = lit.has(i);
        const r = n.r + (on ? 1.5 : 0);
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        if (n.photo) {
          ctx.fillStyle = C.accent; ctx.fill();
          ctx.strokeStyle = C.ink; ctx.lineWidth = 1.5; ctx.stroke();
        } else {
          ctx.fillStyle = on ? C.ink : tracing ? `rgba(${C.mutedRGB},0.5)` : C.muted; ctx.fill();
        }
      }
    }

    // Labels last, so no line crosses a word.
    ctx.textBaseline = 'middle';
    for (let i = 0; i < nodes.length; i++) {
      const n = nodes[i];
      const dim = tracing && !lit.has(i);
      if (n.kind === 'hub') {
        ctx.font = `600 ${HUB_FONT}px ${FONT}`;
        ctx.fillStyle = dim ? C.muted : C.ink;
        ctx.textAlign = 'center';
        ctx.fillText(n.label, n.x, n.y + 0.5);
      } else if (n.kind === 'interest') {
        const left = n.side === 'L';
        ctx.font = `${lit.has(i) ? 600 : 400} ${ITEM_FONT}px ${FONT}`;
        ctx.fillStyle = dim ? C.muted : C.ink;
        ctx.textAlign = left ? 'right' : 'left';
        ctx.fillText(n.label, n.x + (left ? -10 : 10), n.y + 0.5);
      }
    }
  }

  // Drawn on demand: a frame loop runs only while something is moving.
  let raf = 0;
  const frame = (t) => {
    raf = 0;
    const hi = current();
    if (hi !== shown) {
      shown = hi;
      syncStrip(hi);
      pulse = hi >= 0 && !reducedMotion ? { path: [centre, nodes[hi].hub, hi], t0: t } : null;
    }
    const moving = reducedMotion ? false : step(hi);
    draw(hi, t);
    if (moving || pulse) raf = requestAnimationFrame(frame);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(frame); };

  const setPointer = (e) => {
    const r = wrap.getBoundingClientRect();
    mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.active = true;
    kick();
  };
  wrap.addEventListener('pointermove', setPointer, { passive: true });
  wrap.addEventListener('pointerdown', setPointer, { passive: true });
  const leave = () => { mouse.active = false; kick(); };
  wrap.addEventListener('pointerleave', leave);
  wrap.addEventListener('pointercancel', leave);
  // The other direction: a photo lights its own branch.
  photos.forEach((li, label) => {
    li.addEventListener('pointerenter', () => { pinned = byLabel.get(label); kick(); });
    li.addEventListener('pointerleave', () => { pinned = -1; kick(); });
  });

  new ResizeObserver(() => { layout(); kick(); }).observe(wrap);
  layout();
  kick();
  window.updateHobbyGraphTheme = () => { readColors(); kick(); };
}

// ── Slide carousels ────────────────────────────────────
// Beyond the desk (About) and the Dornier internship use the same slideshow:
// autoplay at a varied interval, paused on hover and keyboard focus, arrows,
// dots, swipe, and a play/pause button for touch visitors, who have no hover
// to pause on. Reduced motion starts it paused on the first slide.
// It only runs while at least half of it is on screen and the tab is in
// front. It used to start its timer at page load, so it turned over while
// the visitor was still reading the top of the page (and in background
// tabs), and they scrolled down to whichever photo it had reached.
function initCarousel({ prefix, slide, dot, minDelay, spread }) {
  const track = document.getElementById(`${prefix}-track`);
  if (!track) return;
  const slides = Array.from(track.querySelectorAll(`.${slide}`));
  const dots = Array.from(document.querySelectorAll(`.${dot}`));
  if (!slides.length) return;

  let current = 0;
  let timer = null;
  let isPaused = reducedMotion;
  let inView = !('IntersectionObserver' in window);
  const showing = () => inView && !document.hidden;

  const videoIn = (s) => { const v = s.querySelector('video'); if (v && showing()) { v.currentTime = 0; v.play().catch(() => {}); } };
  const videoOut = (s) => { const v = s.querySelector('video'); if (v) v.pause(); };

  function goTo(n) {
    videoOut(slides[current]);
    slides[current].classList.remove('active');
    slides[current].setAttribute('aria-hidden', 'true');
    if (dots[current]) dots[current].classList.remove('active');
    current = (n + slides.length) % slides.length;
    slides[current].classList.add('active');
    slides[current].removeAttribute('aria-hidden');
    if (dots[current]) dots[current].classList.add('active');
    videoIn(slides[current]);
  }
  function scheduleNext() {
    clearTimeout(timer);
    if (isPaused || !showing()) return;
    timer = setTimeout(() => { goTo(current + 1); scheduleNext(); }, minDelay + Math.random() * spread);
  }
  const step = (d) => { clearTimeout(timer); goTo(current + d); scheduleNext(); };

  slides.forEach(s => s.setAttribute('aria-hidden', 'true'));
  goTo(0);
  scheduleNext();

  const carousel = document.getElementById(`${prefix}-carousel`);
  // Coming into view (or back to the tab) starts the clock and resumes the
  // current clip where it was; leaving stops both.
  const wake = () => {
    const v = slides[current].querySelector('video');
    if (showing()) { if (v) v.play().catch(() => {}); scheduleNext(); }
    else { clearTimeout(timer); if (v) v.pause(); }
  };
  if (!inView) {
    new IntersectionObserver((entries) => entries.forEach(e => {
      const now = e.intersectionRatio >= 0.5;
      if (now === inView) return;
      inView = now;
      wake();
    }), { threshold: [0, 0.5] }).observe(carousel);
  }
  document.addEventListener('visibilitychange', wake);
  carousel.addEventListener('mouseenter', () => clearTimeout(timer));
  carousel.addEventListener('mouseleave', () => scheduleNext());
  carousel.addEventListener('focusin', () => clearTimeout(timer));
  carousel.addEventListener('focusout', (e) => { if (!carousel.contains(e.relatedTarget)) scheduleNext(); });

  dots.forEach((d, i) => d.addEventListener('click', () => { clearTimeout(timer); goTo(i); scheduleNext(); }));
  const prevBtn = document.getElementById(`${prefix}-prev`);
  const nextBtn = document.getElementById(`${prefix}-next`);
  if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
  if (nextBtn) nextBtn.addEventListener('click', () => step(1));
  attachSwipe(carousel, () => step(-1), () => step(1), () => [...slides[current].children]);
  carousel.addEventListener('pointerdown', (e) => { if (e.pointerType !== 'mouse') clearTimeout(timer); });
  carousel.addEventListener('pointerup', (e) => { if (e.pointerType !== 'mouse') scheduleNext(); });

  const playPauseBtn = document.getElementById(`${prefix}-playpause`);
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
  if (meta) meta.setAttribute('content', dark ? '#121517' : '#FFFFFF');
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

// ── Copy the address ───────────────────────────────────
// "Email me" opens a mail app, which on a computer without one set up does
// nothing a visitor can see, and many people would rather paste an address
// into their own mail or tracking tool. The button beside the address
// copies it and says so where the eye already is.
function initCopy() {
  document.querySelectorAll('.copy-btn[data-copy]').forEach(btn => {
    const text = btn.dataset.copy;
    const status = document.createElement('span');
    status.className = 'sr-only';
    status.setAttribute('role', 'status');
    btn.after(status);
    let timer = 0;
    const copied = () => {
      btn.classList.add('is-done');
      status.textContent = 'Email address copied';
      clearTimeout(timer);
      timer = setTimeout(() => { btn.classList.remove('is-done'); status.textContent = ''; }, 1600);
    };
    const byHand = () => {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (_) {}
      ta.remove();
      return ok;
    };
    btn.addEventListener('click', () => {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(text).then(copied, () => { if (byHand()) copied(); });
      } else if (byHand()) {
        copied();
      }
    });
    btn.hidden = false;
  });
}

// A clip in the page (not in a carousel) plays only while it is on screen,
// and not at all under reduced motion, where its poster frame stands in.
function initInViewVideos() {
  const vids = document.querySelectorAll('video[data-inview]');
  if (!vids.length || reducedMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach(e => {
    if (e.isIntersecting) e.target.play().catch(() => {});
    else e.target.pause();
  }), { threshold: 0.35 });
  vids.forEach(v => { v.preload = 'metadata'; io.observe(v); });
}

// ── Projects: built before the first paint ─────────────
// On the projects page this script sits straight after the chapters'
// container, and the page's head holds its first paint until the band after
// it has been read in (<link rel="expect" blocking="render">). So the
// chapters are built here, while the page is still loading, and a #chapter
// address is landed on before anything is drawn: the page appears whole and
// already at the chapter. It used to paint the yellow band halfway down the
// first screen and then push it away when the chapters arrived (a layout
// shift of 0.55), and a result clicked on Home showed the page's top for a
// few frames before jumping 2,212px to its chapter.
const pageYOf = (n) => { let y = 0; for (; n; n = n.offsetParent) y += n.offsetTop; return y; };
const builtEarly = document.readyState === 'loading' && !!document.getElementById('projects-container');
if (builtEarly) {
  buildProjectIndex();
  buildProjects();
  const vh = window.innerHeight;
  const id = decodeURIComponent(location.hash.slice(1));
  const target = id && document.getElementById(id);
  let landY = window.scrollY;
  if (target) {
    landY = Math.max(0, pageYOf(target) - (parseFloat(getComputedStyle(target).scrollMarginTop) || 0));
    // Instant, stated: the page's scroll-behavior is smooth, and a bare
    // scrollTo here would start a glide that the first paint catches at 0.
    window.scrollTo({ top: landY, behavior: 'instant' });
    if (window.ensureLeadsBetween) window.ensureLeadsBetween(landY - vh, landY + vh * 1.5);
  }
  // Whatever will be on screen is shown at once: its parts would otherwise
  // sit at opacity 0 until initReveal runs, after the rest of the page is in.
  document.querySelectorAll('.section-reveal').forEach(s => {
    const top = pageYOf(s) - landY;
    if (top < vh && top + s.offsetHeight > 0) s.classList.add('visible', 'reveal-instant');
  });
  requestAnimationFrame(() => requestAnimationFrame(() =>
    document.querySelectorAll('.reveal-instant').forEach(s => s.classList.remove('reveal-instant'))));
}

// ── The plot carried across ────────────────────────────
// The home page's nozzle plot links to the nozzle chapter, where the same
// plot is the chapter's figure. Followed from the plot, the change of page
// carries it: the plot flies from the hero to its place in the chapter
// while the pages crossfade around it, so the claim and its evidence join
// up. Only on that link, once per click; browsers without cross-page view
// transitions, and reduced motion, get the ordinary change of page.
// On the home page the plot is named for the transition as it is clicked.
function initPlotFlight() {
  const fig = document.querySelector('.rig-fig');
  const img = fig && fig.querySelector('img');
  if (!img || reducedMotion) return;
  fig.addEventListener('click', (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    img.style.viewTransitionName = 'nozzle-plot';
    try { sessionStorage.setItem('plot-flight', String(Date.now())); } catch (_) {}
  });
  // Back on this page (from the cache), the name is dropped again.
  window.addEventListener('pageshow', () => { img.style.viewTransitionName = ''; });
}
// On the projects page, just before the first frame: a copy of the plot is
// laid exactly over the chapter's figure and given the same name, the
// figure and its callouts are hidden under it, and all of it is put back
// once the plot has landed. The copy matters because the figure shows the
// plot inside a padded frame; the copy is the plot alone, the same shape as
// the one that left.
if (builtEarly) {
  window.addEventListener('pagereveal', (e) => {
    let t = 0;
    try { t = +sessionStorage.getItem('plot-flight') || 0; sessionStorage.removeItem('plot-flight'); } catch (_) {}
    if (!e.viewTransition || reducedMotion || Date.now() - t > 5000 || location.hash !== '#p-nozzle') return;
    const real = leadMedia(PROJECTS.findIndex(p => p.anchor === 'p-nozzle'));
    if (!real) return;
    const view = PROJECTS.find(p => p.anchor === 'p-nozzle').views[0];
    const r = shownRect(real, view.size);
    if (!r) return;
    const copy = document.createElement('img');
    copy.src = real.getAttribute('src');
    copy.alt = '';
    copy.setAttribute('aria-hidden', 'true');
    copy.style.cssText = `position:fixed;left:${r.x}px;top:${r.y}px;width:${r.w}px;height:${r.h}px;z-index:30;pointer-events:none;view-transition-name:nozzle-plot;`;
    document.body.appendChild(copy);
    const layer = real.parentElement.querySelector('.callouts');
    real.style.visibility = 'hidden';
    if (layer) layer.style.visibility = 'hidden';
    const land = () => {
      copy.remove();
      real.style.visibility = '';
      if (layer) { layer.style.visibility = ''; layer.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 180, easing: 'ease' }); }
    };
    e.viewTransition.finished.then(land, land);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  buildProjectGrid();
  if (!builtEarly) buildProjectIndex();
  initJumpMenu();
  if (!builtEarly) buildProjects();
  initCalloutFigures();
  initRevisionSwitch();
  initPlotFlight();
  buildSoftware();
  initNav();
  initReveal();
  initLightboxZoom();
  initHashTarget();
  initAnchorScroll();
  // Pills are sized from measureText once, so measure with the real face.
  (document.fonts && document.fonts.load
    ? document.fonts.load("500 11.5px 'Atkinson Hyperlegible Next'").catch(() => {})
    : Promise.resolve()).then(initHobbyGraph);
  initCarousel({ prefix: 'hobby', slide: 'hobby-slide', dot: 'hobby-dot', minDelay: 2800, spread: 2400 });
  initCarousel({ prefix: 'dornier', slide: 'internship-slide', dot: 'internship-dot', minDelay: 3200, spread: 2200 });
  initInViewVideos();
  initCopy();
  initTheme();
});
