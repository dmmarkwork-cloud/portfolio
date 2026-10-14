# Aero Structures Judgement Trainer: Project Plan (v0.1)

Status: planning. No code yet. This document is the source of truth for scope until P0 closes.

## 1. Purpose

A web app that trains and measures **engineering judgement in aerospace structural analysis**, interview-readiness first, on-the-job judgement second.

Design principle: every feature must be justified by a learning mechanism with evidence behind it, not by preference alone.

| User's stated method | Evidence-based mechanism | Source |
|---|---|---|
| Recurring | Spacing effect | Cepeda et al., 2006, *Psychological Bulletin* 132(3) |
| Practice | Retrieval practice (testing effect) | Roediger & Karpicke, 2006, *Psychological Science* 17(3) |
| Visual | Dual coding (words + diagrams) | Mayer, *Multimedia Learning*, 2nd ed., 2009 |
| Interactive | Prediction before feedback (generation effect) | Slamecka & Graf, 1978 |
| Application | Varied, interleaved practice in realistic context | Rohrer & Taylor, 2007 |

Note: "learning styles" matching (meshing hypothesis) is not supported (Pashler et al., 2008). The listed methods are kept because they work for most learners, not because they match a style.

## 2. Definition of "engineering judgement" (what we measure)

| Skill | Exercise form | Metric |
|---|---|---|
| J1 Estimate | Predict magnitude/sign before solving | log10(predicted / exact), tracked over time |
| J2 Governing mode | Pick the critical failure mode / critical location | Accuracy % |
| J3 Error detection | Find the planted error in a worked calc or diagram | Detection rate, time to detect |
| J4 Calibration | Confidence rating (50 to 100%) on every answer | Calibration curve, Brier score |
| J5 Explain | Short structured justification (pick reasoning steps in order) | Accuracy of step selection and order |

J5 is deterministic in v1 (ordered multiple choice), because no AI grading in v1.

## 3. Decisions locked (2026-10-14)

- Platform: **web app**, mobile-friendly, static hosting.
- MVP topics: **Load paths + Margins of Safety** and **Shear flow + Buckling**.
- Goal order: **interview readiness first**, job-style case studies later.
- **No AI grading in v1.** All answers graded deterministically against computed solutions.

## 4. MVP content scope

Every formula module must cite a reference and be unit-tested against a published worked example or closed-form check.

### Module A: Load paths and Margins of Safety

| ID | Exercise template | Core relation | Reference |
|---|---|---|---|
| A1 | Free-body diagrams: reactions for beams, brackets, simple frames | Static equilibrium | Any statics text; Megson ch. 1 to 2 |
| A2 | Load path tracing: which member carries what (click-to-highlight) | Stiffness-proportional load sharing | Niu, *Airframe Structural Design*, ch. 2 |
| A3 | Limit vs ultimate load, factor of safety 1.5 | Ultimate = 1.5 x Limit | 14 CFR 25.301, 25.303, 25.305 |
| A4 | Margin of Safety | MS = Allowable / (Applied x FS) - 1 | Bruhn, *Analysis and Design of Flight Vehicle Structures*, ch. C1 |
| A5 | Material allowables basis | A-basis (99% / 95% conf.), B-basis (90% / 95% conf.) | MMPDS (current edition), ch. 1; 14 CFR 25.613 |
| A6 | Special factors (fitting factor 1.15) | Applied in MS | 14 CFR 25.619, 25.625 |
| A7 | Combined loading interaction ratios | R1^x + R2^y = 1 | Bruhn, ch. C4 |

### Module B: Shear flow and Buckling

| ID | Exercise template | Core relation | Reference |
|---|---|---|---|
| B1 | Bending stress, unsymmetric sections | Generalized flexure formula | Megson, *Aircraft Structures for Engineering Students*, ch. 16 |
| B2 | Shear flow, open thin-walled sections; shear centre | q = -(V/I) * integral(t*y ds) | Megson, ch. 17 |
| B3 | Torsion, closed single-cell | q = T / (2A) (Bredt-Batho) | Megson, ch. 18 |
| B4 | Column buckling with end fixity | Euler: Pcr = c * pi^2 * E * I / L^2 | Bruhn, ch. C2 |
| B5 | Short columns, inelastic | Johnson parabola | Bruhn, ch. C2 |
| B6 | Flat plate buckling in compression and shear | sigma_cr = k * pi^2 * E / (12(1 - nu^2)) * (t/b)^2 | Bruhn, ch. C5; Gerard & Becker, NACA TN 3781 |
| B7 | Stiffened panel, mode identification (local vs global) | Compare B4 and B6 per mode | Niu, ch. 14 |
| B8 (stretch) | Crippling | Gerard / Needham methods | Bruhn, ch. C7 (deferred if accuracy cannot be guaranteed) |

Exact chapter numbers to be verified against the editions the user owns during P0.

## 5. Core loop (one exercise)

1. **Context**: a scenario with a diagram (randomized inputs within physically sensible ranges).
2. **Predict**: user enters an estimate (J1) or picks a mode (J2), plus a confidence rating (J4).
3. **Solve** (optional for drills, required for full problems): user enters a computed value.
4. **Reveal**: the engine computes the exact answer and the diagram animates (stress distribution, shear flow arrows, mode shape).
5. **Explore**: sliders let the user vary one parameter and watch the answer move ("what drives this?").
6. **Schedule**: the result feeds the spaced-repetition scheduler.

## 6. Architecture

| Layer | Choice | Why |
|---|---|---|
| UI | React + TypeScript (Vite) | Typed, fast iteration, large ecosystem |
| Visuals | SVG (hand-built components), D3 for scales only | Crisp on mobile, testable, no heavy 3D needed for MVP |
| Engine | Pure TypeScript module `engine/`, no UI imports | Testable in isolation, auditable formulas |
| Content | YAML/JSON exercise templates in `content/` | Add exercises without code changes |
| Scheduler | FSRS via `ts-fsrs` library | Modern, open, well documented |
| Storage | Browser localStorage + JSON export/import | No backend, no cost; export protects against data loss |
| Tests | Vitest; engine coverage target 100% of formulas | Wrong content = wrong judgement |
| Hosting | GitHub Pages or Vercel (static) | Free |

### Data model (sketch)

- `Template { id, module, skill[J1..J5], params{name, min, max, unit}, solve(params) -> Answer, diagram, references[] }`
- `Attempt { templateId, params, predicted, computed, confidence, correct, timeMs, timestamp }`
- `Card { templateId, fsrsState }`

## 7. Verification strategy (non-negotiable)

1. Each engine function has at least one test reproducing a published worked example (book, page, expected value, tolerance).
2. Dimensional sanity tests (units consistent, sign conventions documented).
3. Property tests: e.g. doubling t multiplies plate sigma_cr by 4; Euler Pcr scales with 1/L^2.
4. Every template displays its references in the reveal step.
5. A "known limitations" note per template (e.g. Euler invalid below transition slenderness).

## 8. Phases and exit criteria

| Phase | Deliverable | Exit criteria |
|---|---|---|
| P0 Spec | This plan finalized; reference list mapped to owned books; 10 templates specified in detail | User sign-off on templates and tolerances |
| P1 Vertical slice | One template end to end (recommend A4 + B6 combined: MS on a buckling-critical plate) | Engine tests pass; loop steps 1 to 6 working on phone |
| P2 Scheduler + dashboard | FSRS daily queue; calibration curve; J1 error trend | 2 weeks of personal daily use without blocking bugs |
| P3 Content fill | Remaining Module A and B templates | All templates verified per section 7 |
| P4 Interview mode | Timed mixed sets, "explain your reasoning" ordered steps | Mock interview set of 10 questions |
| P5 Job-style cases | Repair substantiation and FEA sanity-check scenarios | Defined after P4 |

## 9. Risks

| Risk | Impact | Mitigation |
|---|---|---|
| Formula or sign error in engine | Trains wrong judgement | Section 7; references shown to user |
| Scope creep (fatigue, joints, composites) | Never ships | Locked MVP; backlog only |
| Habit drop-off | Recurring benefit lost | Short daily queue (10 min), streak-free design to avoid gaming |
| Randomized params produce unphysical cases | Misleading intuition | Bounded param ranges per template, validity checks |
| Browser storage cleared | Progress lost | Export/import, reminder to back up |

## 10. Open questions (to resolve in P0)

1. Units: SI only, US customary only, or toggle? (Bruhn and MMPDS are US customary.)
2. Which reference editions do you own (Bruhn, Megson edition, Niu)?
3. Code location: new dedicated repo (recommended, keeps the portfolio site clean) or inside this repo?
4. Estimate tolerance for J1 "correct": proposed default is within a factor of 1.25 (|log10 ratio| < 0.1), adjustable. Needs your agreement.
5. Daily time budget for the review queue (proposed: 10 to 15 minutes).

## Backlog (post-MVP)

Joints and fasteners, fatigue and damage tolerance, composites, AI-graded free-text reasoning, FEA result interpretation drills, cloud sync.
