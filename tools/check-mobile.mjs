#!/usr/bin/env node
//
// check-mobile.mjs — guardrails for the mobile build of portfolio-light.html
//
// Zero dependencies, no build step, runs in well under a second:
//
//     node tools/check-mobile.mjs
//
// It exists because every mobile regression this page has had was silent.
// Nothing threw, nothing looked wrong on the laptop the edit was made on,
// and the damage only showed up on a phone. Each check below is one of those
// failures, written down so it cannot happen twice.
//
// This is static analysis only — it reads the source, it does not render. For
// geometry (page height, overflow, touch-target boxes) open
// tools/mobile-harness.html against a local server; see its header.
//
// Exit code 0 = pass, 1 = at least one FAIL. WARNs never fail the run.

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
// An explicit path is accepted so the checks can be run against a deliberately
// broken copy — a guardrail nobody has watched fail is not a guardrail.
const file = process.argv[2] || join(root, 'project', 'portfolio-light.html');
const src = readFileSync(file, 'utf8');
const lineOf = (i) => src.slice(0, i).split('\n').length;

// Blank out HTML comments before scanning for tags, keeping every byte offset
// (and therefore every line number) intact. Without this the prose in the
// mobile-overrides header, which names <style> literally, reads as markup and
// the stylesheet scan below splits in the wrong places.
const code = src.replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, ' '));

const fails = [];
const warns = [];
const passes = [];
const fail = (rule, msg) => fails.push(`${rule}: ${msg}`);
const warn = (rule, msg) => warns.push(`${rule}: ${msg}`);
const pass = (rule, msg) => passes.push(`${rule}: ${msg}`);

// ── Collect the stylesheets in document order ───────────────────────────────
const styles = [...code.matchAll(/<style([^>]*)>([\s\S]*?)<\/style>/g)].map((m) => ({
  attrs: m[1],
  css: m[2],
  start: m.index,
  line: lineOf(m.index)
}));

// ── 1. The mobile overrides must stay the last stylesheet ───────────────────
// CSS breaks same-specificity ties on source order, so a desktop rule written
// after these wins with no error and nothing to see.
{
  const rule = '1/ mobile-overrides is last';
  const i = styles.findIndex((s) => /id=["']mobile-overrides["']/.test(s.attrs));
  if (i === -1) {
    fail(rule, 'no <style id="mobile-overrides"> found — was it deleted or renamed?');
  } else if (i !== styles.length - 1) {
    fail(
      rule,
      `it is stylesheet ${i + 1} of ${styles.length}; a later <style> at line ` +
        `${styles[i + 1].line} can silently outrank every mobile override. Move it back to last.`
    );
  } else {
    pass(rule, `last of ${styles.length} stylesheets (line ${styles[i].line})`);
  }
}

// ── 2. Every :hover must sit inside the hover media query ───────────────────
// A hover rule that reaches a touch device fires on tap and then stays applied
// until something else is tapped. This is what froze the six project cards in
// their lifted state.
{
  const rule = '2/ :hover gated';
  const offenders = [];
  for (const sheet of styles) {
    let depth = 0;
    let hoverDepth = null;
    let offset = sheet.start + src.slice(sheet.start).indexOf('>') + 1;
    for (const line of sheet.css.split('\n')) {
      if (/@media[^{]*\(\s*hover\s*:\s*hover\s*\)/.test(line)) hoverDepth = depth;
      if (line.includes(':hover') && hoverDepth === null) {
        offenders.push(`line ${lineOf(offset)}: ${line.trim().slice(0, 72)}`);
      }
      depth += (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
      if (hoverDepth !== null && depth <= hoverDepth) hoverDepth = null;
      offset += line.length + 1;
    }
  }
  // Inline JS hover handlers are the same bug wearing a different hat.
  for (const m of src.matchAll(/\son(mouseover|mouseout|mouseenter|mouseleave)=/g)) {
    offenders.push(`line ${lineOf(m.index)}: inline ${m[1]} attribute`);
  }
  if (offenders.length) {
    fail(
      rule,
      `${offenders.length} hover rule(s) outside @media (hover: hover) and (pointer: fine):\n` +
        offenders.map((o) => `        ${o}`).join('\n')
    );
  } else {
    pass(rule, 'every :hover rule is behind the hover query; no inline mouse handlers');
  }
}

// ── 3. No fixed pixel width in an inline style= attribute ───────────────────
// Inline styles beat every media query in this file, so a hard width there is
// unfixable from the mobile stylesheet. Heights and max-widths are fine: they
// do not cause horizontal overflow.
{
  const rule = '3/ no fixed inline widths';
  const offenders = [];
  for (const m of src.matchAll(/\sstyle="([^"]*)"/g)) {
    const decl = m[1];
    const w = decl.match(/(?:^|;)\s*(width\s*:\s*\d{3,}px)/);
    if (w) offenders.push(`line ${lineOf(m.index)}: ${w[1]}`);
    // A fixed track in an inline grid is the original mobile bug: the 172px
    // thumbnail rail left the lead image ~200px wide on a phone. A px inside
    // minmax() or repeat(auto-fit/auto-fill, …) is the opposite — that is the
    // track telling the browser when to reflow — so strip those first.
    const grid = decl.match(/grid-template-columns\s*:([^;]*)/);
    if (grid) {
      const bare = grid[1]
        .replace(/minmax\([^)]*\)/g, '')
        .replace(/repeat\(\s*auto-(?:fit|fill)[^)]*\)/g, '');
      const g = bare.match(/(\d{3,}px)/);
      if (g) offenders.push(`line ${lineOf(m.index)}: inline grid track ${g[1]}`);
    }
  }
  if (offenders.length) {
    fail(rule, `${offenders.length} found:\n` + offenders.map((o) => `        ${o}`).join('\n'));
  } else {
    pass(rule, 'no inline fixed widths or fixed inline grid tracks');
  }
}

// ── 4. Mouse-only listeners ─────────────────────────────────────────────────
// mousemove/mouseenter never fire on touch. Some here are deliberate: hover
// video previews and hover-to-pause are mouse enhancements that already have a
// touch path (the play/pause button, swipe). New ones are worth a look, so
// this reports rather than fails.
{
  const rule = '4/ mouse-only listeners';
  const found = [...src.matchAll(/addEventListener\('(mouse[a-z]+)'/g)].map(
    (m) => `line ${lineOf(m.index)}: ${m[1]}`
  );
  const EXPECTED = 8; // 2 video-preview pairs + 2 carousel hover-pause pairs
  if (found.length > EXPECTED) {
    warn(
      rule,
      `${found.length} found, baseline is ${EXPECTED}. Confirm the new one has a touch ` +
        `path (pointer* events, or a visible control):\n` +
        found.map((o) => `        ${o}`).join('\n')
    );
  } else {
    pass(rule, `${found.length} (baseline ${EXPECTED}), all with an existing touch path`);
  }
}

// ── 5. The mobile affordances are still wired up ────────────────────────────
// Cheap tripwire for a refactor that drops one of them wholesale.
{
  const rule = '5/ mobile affordances present';
  const required = {
    'nav split (pinned CTA + toggle)': /<div class="nav-actions">/,
    'nav link strip': /id="nav-scroll"/,
    'swipe helper': /function attachSwipe\(/,
    'swipe wired (3 call sites)': /attachSwipe\(/g,
    'lightbox pan/zoom': /function initLightboxZoom\(/,
    'lightbox zoom initialised': /initLightboxZoom\(\);/,
    'lightbox close button': /id="lb-close"/,
    'overview snap rail': /scroll-snap-type:\s*x mandatory/,
    'touch hit areas': /\.hobby-dot::after/,
    'pointer-aware copy': /class="touch-only"/,
    'viewport meta': /<meta name="viewport"[^>]*width=device-width/
  };
  const missing = Object.entries(required)
    .filter(([, re]) => !re.test(src))
    .map(([k]) => k);
  const swipeSites = (src.match(/attachSwipe\(/g) || []).length - 1; // minus the definition
  if (missing.length) {
    fail(rule, `missing: ${missing.join(', ')}`);
  } else if (swipeSites < 3) {
    fail(rule, `attachSwipe has ${swipeSites} call sites, expected 3 (gallery + 2 carousels)`);
  } else {
    pass(rule, `all present; attachSwipe wired at ${swipeSites} sites`);
  }
}

// ── Report ──────────────────────────────────────────────────────────────────
const rel = relative(process.cwd(), file).replace(/\\/g, '/');
console.log(`\nmobile checks — ${rel}\n`);
for (const p of passes) console.log(`  PASS  ${p}`);
for (const w of warns) console.log(`  WARN  ${w}`);
for (const f of fails) console.log(`  FAIL  ${f}`);
console.log(
  `\n${passes.length} passed, ${warns.length} warning(s), ${fails.length} failed\n` +
    (fails.length ? '' : 'Geometry is not covered here — open tools/mobile-harness.html for that.\n')
);
process.exit(fails.length ? 1 : 0);
