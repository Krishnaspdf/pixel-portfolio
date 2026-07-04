# PixelMon Journey — Implementation Roadmap

> Complete implementation plan derived from all project documentation and confirmed architecture decisions.
> Do not begin coding out of milestone order unless dependencies are satisfied.

---

## Overview

| Milestone | Name | Complexity | Risk | Depends On |❌ or ✅|
|-----------|------|------------|------|------------|
| M0 | Documentation & Decisions | Low | Low | — |✅|
| M1 | Project Scaffold & Tooling | Low | Low | M0 |✅|
| M2 | Config Layer & Content Schemas | Medium | Medium | M1 |✅|
| M3 | Core Engine (Managers) | High | **High** | M2 |✅|
| M4 | World & Scenes (Night) | High | Medium | M3 |⚠️|
| M5 | Creature & Evolution | Medium | Medium | M3, M4 |❌|
| M6 | Portfolio Overlays & Ending | Medium | Medium | M3, M5 |❌|
| M7 | HUD & Global UI | Low | Low | M3, M6 |❌|
| M8 | Visual Polish (Night) | Medium | Low | M4, M5, M6 |❌|
| M9 | Placeholder Themes | Low | Low | M2, M3 |❌|
| M10 | Accessibility & Performance | Medium | Medium | M6, M8 |❌|
| M11 | QA, Deploy & v1.0 Release | Medium | Medium | M10 |❌|

**Estimated total effort:** 6–10 weeks for a solo developer (part-time), assuming Night assets are available.

---

## Version Targets

| Version | Milestone(s) | Deliverable |
|---------|--------------|-------------|
| **v0.1** | M1–M3 (partial) | Scroll drives progress; theme loads; managers wired; debug viewport |
| **v0.2** | M3 (complete) | Full engine: pause/resume, events fire at checkpoints |
| **v0.3** | M4 | Night scenes with parallax and scene transitions at 33/66/95% |
| **v0.4** | M5 | Creature walks, idles, evolves at 45% and 90% |
| **v0.5** | M6 | All portfolio overlays + ending screen with external links |
| **v0.7** | M7–M8 | HUD, particles, fog, polish pass on Night theme |
| **v0.9** | M9–M10 | Placeholder themes, a11y, performance audit |
| **v1.0** | M11 | Production release on Vercel |

---

## M0 — Documentation & Architecture Decisions ✅

**Status:** Complete

**Deliverables:**
- Full documentation set (README, ARCHITECTURE, GAMEPLAY, DESIGN, PROJECT_CONTEXT, TASKS)
- Canonical architecture decisions locked (camera, checkpoints, scenes, overlays, evolution split, styling, external links)
- Documentation audit (strengths, weaknesses, risks)

**Complexity:** Low  
**Risk:** Low  
**Dependencies:** None

---

## M1 — Project Scaffold & Tooling

**Goal:** Runnable Vite + React + TypeScript app with folder structure and global CSS foundation.

### Tasks
- [ ] Initialize Vite + React + TypeScript project
- [ ] Install GSAP + ScrollTrigger, clsx
- [ ] Create folder structure per ARCHITECTURE.md (`src/app`, `src/journey/*`, `src/content`, `src/assets`, `src/styles`)
- [ ] App shell: full-viewport game canvas, no page scroll
- [ ] Global CSS variables (base tokens; theme tokens stubbed)
- [ ] Load pixel fonts (Press Start 2P, VT323)
- [ ] ESLint/TypeScript strict mode verified
- [ ] Dev script and build pipeline working

**Complexity:** Low  
**Risk:** Low  
**Dependencies:** M0  
**Blocks:** Everything

**Acceptance criteria:**
- `npm run dev` renders empty game viewport
- No document body scroll
- Folder structure matches architecture

---

## M2 — Config Layer & Content Schemas ✅

**Status:** Complete (2026-07-04)

**Goal:** Typed configuration files — no hardcoded paths or magic numbers in components.

### Tasks
- [x] Define TypeScript interfaces: `ThemeConfig`, `SceneConfig`, `SpriteConfig`, `EventConfig`, `PortfolioContent`
- [x] Create `eventConfig.ts` with all 7 checkpoints (10/30/45/60/80/90/100)
- [x] Create `themeConfig.ts` — Night full config; Morning/Evening placeholder configs
- [x] Create `spriteConfig.ts` — Night Wispet/Lumorph/Nebulorem stages
- [x] Create `content/portfolio.ts` — bio, skills, projects, contact (placeholder copy OK)
- [x] Create `sceneConfig.ts` — Night scene progress ranges (0–33/33–66/66–95/95–100)
- [x] CSS variable maps per theme in `styles/themes/`
- [x] Asset manifest documenting expected file paths and dimensions (`docs/ASSET_MANIFEST.md`)

**Complexity:** Medium  
**Risk:** Medium — schema mistakes propagate to every system  
**Dependencies:** M1  
**Blocks:** M3, M4, M5, M6, M9

**Acceptance criteria:**
- All configs import without `any`
- Event list matches canonical checkpoint table
- Night asset paths resolve or fail with clear errors

---

## M3 — Core Engine (Managers)

**Goal:** Progress-driven game engine with pause/resume — no visuals required beyond debug output.

### Tasks

#### M3.1 — ThemeManager ✅ (2026-07-04)
- [x] Time-based theme selection (`morning` | `evening` | `night`)
- [x] React Context provider
- [x] Load theme config and CSS variables
- [x] Dev override hook (force theme for QA — `?theme=` in dev builds only)

**Complexity:** Low | **Risk:** Low

#### M3.2 — ProgressManager ✅ (2026-07-04)
- [x] ScrollTrigger scrub: scroll → normalized `0.0–1.0`
- [x] `progress`, `useProgress()` hook (`setProgress()` deferred to restart work in M6)
- [x] Pause/resume API (used by overlays and evolutions)
- [x] Pin scroll container while paused — capture layer locks; exact position restored on resume
- [x] No progress leakage while paused (guarded ScrollTrigger onUpdate)

**Complexity:** Medium | **Risk:** **High** — core coupling with ScrollTrigger

#### M3.3 — EventManager ✅ (2026-07-04)
- [x] Register events from `eventConfig.ts` (no hardcoded checkpoints)
- [x] Fire once on forward crossing; reverse scroll never fires or clears history (preserved until `resetEvents()` / M6 restart)
- [x] Dispatch via publish/subscribe — overlay, evolution, and ending handlers attach in M3.4/M3.7
- [x] No duplicate triggers (Set-guarded, fast-scroll safe, fires in trigger order)

**Complexity:** Medium | **Risk:** **High** — duplicate/missed events break the journey

#### M3.4 — EvolutionManager ✅ (2026-07-04)
- [x] Evolution state (current stage 1–3)
- [x] Triggered by EventManager at 45% and 90% (evolution events derived from `eventConfig.ts` — no hardcoded ids/percentages)
- [x] Blocks progress during evolution sequence (pause → sequence → swap → resume)
- [x] Delegates visual effects to AnimationManager (typed `EvolutionSequence` seam; placeholder timer until M3.5)
- [x] Sprite stage swap on completion; duplicate events ignored; `resetEvolution()` for Restart (M6)

**Complexity:** Medium | **Risk:** Medium — timing coordination with ProgressManager

#### M3.5 — AnimationManager ✅ (2026-07-04)
- [x] GSAP timeline factory for evolution, overlay, camera, transitions (per-family defaults in `animationConfig.ts`)
- [x] Visual effects only — no state ownership (fills the M3.4 `EvolutionSequence` seam via the existing `sequence` prop)
- [x] Reduced-motion flag stub (`prefers-reduced-motion` tracked live; full disable matrix in M10)

**Complexity:** Medium | **Risk:** Low

#### M3.6 — CameraManager ✅ (2026-07-04)
- [x] World offset from progress (vw-based camera travel derived from normalized progress only)
- [x] Creature anchor at ~25% viewport (desktop); responsive adjustments (breakpoints in `cameraConfig.ts`)
- [x] Parallax multiplier interface (used by SceneManager later) — `getParallaxOffsetVw(multiplier)`, reduced-motion aware stub
- [x] Ending mode stub (center + zoom — implemented in M6) — explicit `follow | ending` enum per risk register

**Complexity:** Medium | **Risk:** Medium

#### M3.7 — OverlayManager ✅ (2026-07-04)
- [ ] Open/close lifecycle
- [ ] Pause creature, camera, progress, scroll on open
- [ ] Resume on close
- [ ] Keyboard: Escape to close, focus trap

**Complexity:** Medium | **Risk:** **High** — pause/resume interaction with ProgressManager

#### M3.8 — Engine Integration
- [ ] Provider tree wiring all managers
- [ ] Debug panel: progress %, theme, active scene, evolution stage
- [ ] Manual verification at each checkpoint threshold

**Complexity:** Low | **Risk:** Medium

**Milestone complexity:** High  
**Milestone risk:** **High**  
**Dependencies:** M2  
**Blocks:** M4, M5, M6, M7, M9

**Acceptance criteria:**
- Scrolling advances progress 0→1
- Overlay open freezes progress; close resumes at same point
- Events fire exactly once per checkpoint on forward pass
- EvolutionManager receives triggers at 45% and 90%

---

## M4 — World & Scenes (Night Theme)

**Goal:** Layered Night environments with parallax and progress-based scene activation.

### Tasks
- [ ] SceneManager — activate scene by progress range
- [ ] Scene layer components (sky, clouds, moon, mountains, trees, ground, foreground, fog)
- [ ] Parallax speeds per DESIGN.md (sky 0.15× … foreground 1.20×)
- [ ] Scene transitions at 33%, 66%, 95% (environmental, not hard cuts)
- [ ] Background asset loader with lazy load + preload next scene
- [ ] Scene culling for off-screen layers
- [ ] Placeholder color blocks acceptable until final art is wired

**Complexity:** High  
**Risk:** Medium — asset pipeline and layer count affect performance  
**Dependencies:** M3 (ProgressManager, CameraManager, EventManager for scene transitions)  
**Blocks:** M5, M8

**Acceptance criteria:**
- Four Night scenes visible at correct progress ranges
- Parallax moves at distinct speeds
- Transitions feel environmental at boundary percentages

---

## M5 — Creature & Evolution (Night Theme)

**Goal:** Presentational creature with walk/idle/evolution states driven by engine.

### Tasks
- [ ] `Creature.tsx` — presentational; props only
- [ ] `SpriteRenderer.tsx` — reads `spriteConfig.ts`
- [ ] Walk animation (steps() sprite sheet or frame sequence)
- [ ] Idle animation (breathing bob — CSS OK)
- [ ] Direction facing from scroll direction
- [ ] Evolution visual sequence via AnimationManager (glow, particles, flash, scale ~2–3s)
- [ ] Stage swap: Wispet → Lumorph (45%) → Nebulorem (90%)
- [ ] Shadow and optional aura subcomponents

**Complexity:** Medium  
**Risk:** Medium — sprite sheet layout must match config  
**Dependencies:** M3 (EvolutionManager, AnimationManager), M4 (scene context)  
**Blocks:** M6, M8

**Acceptance criteria:**
- Creature walks on scroll, idles on stop
- Evolution plays full sequence and updates stage
- Creature never owns application state

---

## M6 — Portfolio Overlays & Ending

**Goal:** All scroll-triggered portfolio content and ending cinematic.

### Tasks

#### Overlays (scroll-triggered only)
- [ ] `OverlayHost.tsx` + glass panel base component
- [ ] About — Adventurer's Journal (10%)
- [ ] Tech Stack — Equipment Inventory (30%)
- [ ] Projects — Completed Quests (60%)
- [ ] Contact — Guild Hall (80%) — contact info only; no Resume/GitHub/LinkedIn here
- [ ] GSAP enter/exit animations
- [ ] Content from `portfolio.ts` only

#### Ending (100%)
- [ ] Ending Temple scene activation (95–100%)
- [ ] Final evolution trigger at 90% (coordinate with M5)
- [ ] Ending cinematic: center creature → zoom out → particles
- [ ] Ending screen: Thank you, journey stats, **Resume / GitHub / LinkedIn**, Restart Journey
- [ ] Restart resets progress and state

**Complexity:** Medium  
**Risk:** Medium — ending camera mode must not leak into normal gameplay  
**Dependencies:** M3 (OverlayManager, EventManager, CameraManager), M5 (creature stages)  
**Blocks:** M7, M8, M10

**Acceptance criteria:**
- Four overlays open/close at correct checkpoints with pause behavior
- External links appear **only** on ending screen
- Full journey completable 0→100%

---

## M7 — HUD & Global UI

**Goal:** Minimal RPG-style HUD that never competes with scenery.

### Tasks
- [ ] HUD component (top-right): theme, creature name, biome, journey %, level
- [ ] Scene title card on scene entry (brief, dismisses automatically)
- [ ] Loading/splash state on first load
- [ ] Reduced-motion toggle (visible or system preference)

**Complexity:** Low  
**Risk:** Low  
**Dependencies:** M3, M6  
**Blocks:** M10

---

## M8 — Visual Polish (Night Theme)

**Goal:** Atmospheric Night world — particles, fog, lighting, transitions.

### Tasks
- [ ] Fog layers with slow drift (CSS or lightweight GSAP)
- [ ] Night particles: ghost wisps, blue embers
- [ ] Moon glow pulse
- [ ] Tree sway, grass ambient motion
- [ ] Scene transition polish (fog thicken, lighting shift)
- [ ] Evolution particle burst
- [ ] Ending particle intensification
- [ ] Screen shake on evolution (subtle, reduced-motion aware)

**Complexity:** Medium  
**Risk:** Low — mostly additive  
**Dependencies:** M4, M5, M6  
**Blocks:** M10

---

## M9 — Placeholder Themes (Morning & Evening)

**Goal:** ThemeManager loads all three themes; Morning/Evening are visually minimal but structurally complete.

### Tasks
- [ ] Morning placeholder: solid/gradient background, placeholder creature silhouette, config entry
- [ ] Evening placeholder: same pattern
- [ ] Theme switching verified via dev override
- [ ] Document minimum asset requirements for future full themes

**Complexity:** Low  
**Risk:** Low  
**Dependencies:** M2, M3  
**Blocks:** v1.0 theming expansion (post-release)

---

## M10 — Accessibility & Performance

**Goal:** Production-quality experience for all users and devices.

### Tasks

#### Accessibility
- [ ] `prefers-reduced-motion`: disable screen shake, shorten/skip evolution flash, reduce parallax
- [ ] Keyboard navigation for entire journey
- [ ] Focus trap in overlays; visible focus indicators
- [ ] Semantic HTML and screen reader labels for HUD and overlays
- [ ] Contrast audit on glass panels

#### Performance
- [ ] React render audit — isolate progress updates from full tree
- [ ] GPU transform audit (no top/left animation)
- [ ] Sprite sheet optimization
- [ ] Scene lazy load and preload verification
- [ ] Target 60 FPS on mid-range laptop and mobile

**Complexity:** Medium  
**Risk:** Medium — reduced motion may require timeline refactors  
**Dependencies:** M6, M8  
**Blocks:** M11

---

## M11 — QA, Deploy & v1.0 Release

**Goal:** Shipped production portfolio on Vercel.

### Tasks
- [ ] Full journey test script (forward, reverse scroll, overlay pause, restart)
- [ ] Cross-browser: Chrome, Firefox, Safari
- [ ] Responsive pass: desktop, tablet, mobile
- [ ] Lighthouse performance and accessibility audit
- [ ] Vercel deployment + custom domain (if applicable)
- [ ] Final content pass in `portfolio.ts`
- [ ] Tag v1.0

**Complexity:** Medium  
**Risk:** Medium — Safari ScrollTrigger quirks  
**Dependencies:** M10

---

## Dependency Graph

```text
M0 (Docs) ✅
  └── M1 (Scaffold)
        └── M2 (Config)
              └── M3 (Engine) ◄── highest risk
                    ├── M4 (Scenes)
                    │     └── M8 (Polish)
                    ├── M5 (Creature) ──► M6 (Overlays/Ending)
                    │                           ├── M7 (HUD)
                    │                           └── M8
                    └── M9 (Placeholder themes)
                              │
                    M6 + M8 ──┴── M10 (A11y/Perf) ── M11 (Release)
```

---

## Risk Register

| Risk | Milestone | Severity | Mitigation |
|------|-----------|----------|------------|
| Progress pause/resume bugs | M3 | **High** | Build debug panel early; test overlay open/close at every checkpoint |
| Duplicate/missed events on reverse scroll | M3 | **High** | EventManager unit tests; idempotent trigger design |
| React re-renders on scroll | M3, M10 | Medium | Ref-based progress for GSAP; narrow context subscriptions |
| Scene/checkpoint misalignment | M4 | Medium | Single `sceneConfig.ts` + `eventConfig.ts`; integration test at 33/66/95% |
| Evolution/overlay timing collision | M5, M6 | Medium | Progress lock during evolution; minimum gap between 80% contact and 90% evolution |
| Night assets missing or wrong dimensions | M2, M4 | Medium | Asset manifest in M2; placeholder colors until art verified |
| Ending camera mode leak | M6 | Medium | Explicit CameraManager mode enum; reset on restart |
| Reduced motion vs immersion | M10 | Medium | Define disable matrix before M8 polish |
| Scope creep (audio, mobile, achievements) | All | Medium | Defer to post-v1.0 per Future Ideas |

---

## Post-v1.0 Backlog (Out of Scope)

- AudioManager and soundtracks
- Touch/swipe mobile controls
- Full Morning and Evening theme art and creatures
- Achievement system, hidden collectibles, secret evolution
- Dynamic weather, live day/night transition
- NPC dialogue, mini-games, multiple endings

---

## Recommended Task Order (First Sprint)

1. M1 — Project scaffold
2. M2 — Config schemas + eventConfig
3. M3.1 — ThemeManager
4. M3.2 — ProgressManager
5. M3.3 — EventManager
6. M3.4 — EvolutionManager
7. M3.5 — AnimationManager
8. M3.6 — CameraManager
9. M3.7 — OverlayManager
10. M3.8 — Engine integration + debug panel

Do not start M4 (scenes) until M3 acceptance criteria pass.

---

## Document References

| Topic | Primary doc |
|-------|-------------|
| Architecture decisions | `PROJECT_CONTEXT.md`, `ARCHITECTURE.md` |
| Gameplay timeline | `GAMEPLAY.md` |
| Visual system | `DESIGN.md` |
| Task checklist | `TASKS.MD` |
| AI workflow | `PROJECT_CONTEXT.md`, `rules/cursor.md` |
