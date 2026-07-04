# 📌 PROJECT_CONTEXT.md
# PixelMon Journey — Current Project Context

> This document represents the current state of the project.
> Every AI assistant MUST read this file before making changes.

---

# 🟢 Project Status

Current Phase:

🟡 Implementation In Progress — M3.6 Complete (in review)

Current Milestone:

M3 — Core Engine (Managers) (in progress — M3.1–M3.6 done, M3.7 OverlayManager next)

Progress:

M1–M2 complete · M3 in progress (M3.1–M3.6 done) · M4–M11 pending · 100% planning documentation

Last Updated:

2026-07-04

---

# 🎯 Project Summary

PixelMon Journey is an interactive side-scrolling portfolio inspired by classic Pokémon and retro RPG games.

Visitors do **not** scroll through a webpage.

Instead:

- scrolling moves the creature
- the camera follows
- environments change
- portfolio content appears
- creatures evolve
- the journey ends with a final cinematic

The project is built like a miniature game engine using React and GSAP.

---

# 🎮 Current Scope

Only the **Night Theme** is being fully implemented.

Morning and Evening themes currently exist only as placeholders.

They must still work with the ThemeManager.

---

# 📐 Confirmed Architecture Decisions

These decisions are canonical. Do not change without approval.

## Camera

- Creature stays at approximately **25% from the left** on desktop.
- Adjust slightly for tablet and mobile.
- The camera follows the world; the creature appears to travel.
- Only the **ending cinematic** may center the creature before zooming out.

## Progress Checkpoints

Fixed checkpoints only. Never use ranges.

| Progress | Event |
|----------|--------|
| 10% | About overlay |
| 30% | Tech Stack overlay |
| 45% | Evolution 1 |
| 60% | Projects overlay |
| 80% | Contact overlay |
| 90% | Final evolution |
| 100% | Ending |

## Scene Layout

| Progress | Scene |
|----------|--------|
| 0–33% | Scene 1 — Whispering Woods |
| 33–66% | Scene 2 — Forgotten Cemetery |
| 66–95% | Scene 3 — Moonlit Shrine |
| 95–100% | Ending Area — Ending Temple |

## Overlay Behavior

When an overlay opens:

- Gameplay progress **pauses**
- Creature movement **stops**
- Camera movement **stops**
- Scroll progression **stops**

Ambient animations continue: fog, particles, moon glow, idle breathing, etc.

## Evolution Architecture

- **EvolutionManager** is a dedicated system.
- **EventManager** triggers EvolutionManager.
- **EvolutionManager** controls evolution state and sprite changes.
- **AnimationManager** handles GSAP animations and visual effects only.

## Styling

- Plain **CSS with CSS variables** only.
- **No Tailwind.**
- Theme colors, spacing, and effects are driven by CSS variables.

## External Links

- Resume, GitHub, LinkedIn, and other external links appear **only on the Ending Screen**.
- Do not create separate overlays for them.

---

# 🌙 Night Theme

Creature Line

Stage 1

Wispet

↓

Stage 2

Lumorph

↓

Stage 3

Nebulorem

Scenes

1.

Whispering Woods

↓

2.

Forgotten Cemetery

↓

3.

Moonlit Shrine

↓

4.

Ending Temple

---

# 📜 Story Flow

Journey starts

↓

Creature walks

↓

10%

About Overlay

↓

20%

Continue

↓

30%

Tech Stack Overlay

↓

45%

Evolution

↓

60%

Projects Overlay

↓

80%

Contact Overlay

↓

90%

Final Evolution

↓

100%

Ending Scene

---

# 🏗 Confirmed Technologies

Framework

React

TypeScript

Vite

Animation

GSAP

ScrollTrigger

Styling

CSS

CSS Variables

Pixel Fonts

No Tailwind

Deployment

Vercel

Version Control

Git

GitHub

---

# 🗂 Folder Architecture

Confirmed

src/

journey/

camera/

events/

themes/

creature/

overlays/

scenes/

hooks/

config/

content/

ui/

utils/

assets/

---

# 📂 Asset Status

## Creature Sprites

Night Theme

✔ Available

Morning

❌ Placeholder

Evening

❌ Placeholder

---

## Backgrounds

Night

✔ Available

Morning

❌ Placeholder

Evening

❌ Placeholder

---

## UI

Glass overlays

❌ Not implemented

HUD

❌ Not implemented

Particles

❌ Not implemented

---

# ⚙ Confirmed Systems

The following systems have already been designed.

ThemeManager

ProgressManager

EventManager

SceneManager

CameraManager

OverlayManager

EvolutionManager

Creature

AnimationManager

AudioManager (future)

Do not redesign these systems.

---

# 📋 Session Log — 2026-07-03

Completed today (planning only — no code written):

- [x] Full documentation review across all `/docs` files
- [x] Project understanding summary (vision, gameplay, architecture, user journey)
- [x] Senior engineer presentation and open-question resolution
- [x] **Canonical architecture decisions locked** (camera, checkpoints, scene layout, overlay pause, EvolutionManager split, CSS-only styling, ending-only external links)
- [x] Documentation updated: README, ARCHITECTURE, GAMEPLAY, DESIGN, PROJECT_CONTEXT, TASKS
- [x] Documentation audit (strengths, weaknesses, missing docs, risks)
- [x] **Complete implementation roadmap created** — see `ROADMAP.md`

---

# 📋 Session Log — 2026-07-04

Completed today:

- [x] **M1 — Project Scaffold & Tooling implemented** (branch `m1-project-scaffold`, MR !1)
- [x] Vite + React + TypeScript initialized — strict mode + `noUncheckedIndexedAccess`
- [x] GSAP (ScrollTrigger) and clsx declared as dependencies — no extra libraries
- [x] ESLint flat config — `@typescript-eslint/no-explicit-any` enforced as error
- [x] Folder structure created per ARCHITECTURE.md (`src/app`, `src/journey/*`, `src/content`, `src/assets/*`, `src/styles`)
- [x] App shell: full-viewport `GameViewport` — document never scrolls (`overflow: hidden`, `overscroll-behavior: none`)
- [x] Global CSS tokens: typography, spacing, z-layer map mirroring scene composition, glassmorphism variables
- [x] Theme token files: Night full palette; Morning/Evening placeholders — activated via `[data-theme]` by ThemeManager in M3
- [x] Pixel fonts loaded (Press Start 2P, VT323)

M1 acceptance criteria met: dev server renders empty game viewport · no body scroll · folders match architecture.

---

# 📋 Session Log — 2026-07-04 — M2

Completed today:

- [x] **M2 — Config Layer & Content Schemas implemented** (branch `m2-config-layer`)
- [x] `eventConfig.ts` — 7 canonical checkpoints (10/30/45/60/80/90/100) — fixed triggers only, typed `EventConfig`
- [x] `sceneConfig.ts` — scene ranges (0–33 / 33–66 / 66–95 / 95–100) + parallax speed map per DESIGN.md
- [x] `spriteConfig.ts` — Night line (Wispet → Lumorph → Nebulorem) with idle/walk/evolution sheet configs; Morning/Evening placeholder stages
- [x] `themeConfig.ts` — `ThemeConfig` with active hours, scene names, layer asset paths; Night complete, Morning/Evening placeholders with `placeholder: true`
- [x] `content/portfolio.ts` — typed `PortfolioContent` with placeholder copy; external links isolated to the ending block
- [x] Theme CSS variable maps extended — Night complete atmosphere tokens; Morning/Evening placeholder equivalents
- [x] `docs/ASSET_MANIFEST.md` — expected asset paths, dimensions, and naming conventions

M2 acceptance criteria met: all configs strictly typed with no `any` · event list matches canonical checkpoint table · asset path contract documented in manifest.

No runtime logic, managers, animations, or UI behavior were implemented — those belong to M3+.

---

# 📋 Session Log — 2026-07-04 — M3.1

Completed today:

- [x] **M3.1 — ThemeManager implemented** (branch `m3-1-theme-manager`)
- [x] `journey/themes/themeSelector.ts` — pure time-based selection using `ThemeHours` from `themeConfig.ts` (midnight wrap for night); no hardcoded hour boundaries
- [x] `journey/themes/ThemeContext.ts` — strongly typed `ThemeConfig | null` context
- [x] `journey/themes/ThemeManager.tsx` — resolves theme once per visit via `new Date().getHours()`, sets `data-theme` on the document root (activates M2 CSS variable maps), provides context
- [x] `journey/hooks/useTheme.ts` — typed hook, throws outside provider
- [x] Dev-only override `?theme=morning|evening|night` guarded by `import.meta.env.DEV` — stripped from production builds
- [x] `App.tsx` wraps `GameViewport` with `ThemeManager`; placeholder shows the active theme label for verification

M3.1 acceptance criteria met: theme resolves from time of day · `data-theme` applied to root · config-driven only · dev override works without production impact.

Scope excluded (M3.2+): ProgressManager, scenes, camera, overlays, animations, scrolling.

---

# 📋 Session Log — 2026-07-04 — M3.2

Completed today:

- [x] **M3.2 — ProgressManager implemented** (branch `m3-2-progress-manager`)
- [x] `journey/progress/ProgressManager.tsx` — GSAP ScrollTrigger scrubs an invisible fixed scroll capture layer into normalized progress 0.0→1.0; single source of truth
- [x] `journey/progress/ProgressContext.ts` — typed context exposing `progress`, `isPaused`, `pause()`, `resume()`
- [x] `journey/hooks/useProgress.ts` — typed hook, throws outside provider
- [x] `journey/config/progressConfig.ts` — scroll runway length (`JOURNEY_SCROLL_LENGTH_VH`); no magic numbers in components
- [x] Pause/resume: capture layer locks (`overflow: hidden`) so wheel input cannot accumulate; guarded `onUpdate` prevents progress leakage; exact scroll position restored on resume
- [x] `journey/ui/ProgressDebug.tsx` — dev-only panel showing normalized progress, journey %, paused state + pause/resume toggle
- [x] `--z-scroll-capture` layer token added so future HUD/overlays stay interactive

M3.2 acceptance criteria met: scroll advances progress 0→1 · pause freezes progress completely · no scroll accumulation while paused · resume continues from the exact same value · no checkpoint values hardcoded.

Scope excluded (M3.3+): events, overlays, camera movement, creature movement, scene switching, evolution.

---

# 📋 Session Log — 2026-07-04 — M3.3

Completed today:

- [x] **M3.3 — EventManager implemented** (branch `m3-3-event-manager`)
- [x] `journey/events/eventUtils.ts` — pure crossing detection from `eventConfig.ts` only; fires in trigger order even when a fast scroll skips multiple checkpoints; zero hardcoded values
- [x] `journey/events/EventManager.tsx` — consumes `useProgress()`; fires each event exactly once on forward crossing (Set-guarded, ref-tracked previous progress)
- [x] **Reverse-scroll policy documented:** backwards never fires · fired events stay fired on re-crossing · history preserved until `resetEvents()` (Restart Journey, M6)
- [x] `journey/events/EventsContext.ts` — typed context: `firedEvents`, `hasFired()`, `resetEvents()`, `subscribe()` publication channel for EvolutionManager (M3.4) / OverlayManager (M3.7)
- [x] `journey/hooks/useEvents.ts` — typed hook, throws outside provider
- [x] Debug panel renamed `ProgressDebug` → `EngineDebug`; now also shows next upcoming event and fired history (dev-only)

M3.3 acceptance criteria met: events fire exactly once per forward crossing · no duplicates on reverse + re-cross · generic manager knows nothing about overlays/evolution/camera/scenes/HUD · publish-only design ready for M3.4/M3.7.

Scope excluded (M3.4+): evolution state, overlay lifecycle, camera, scene switching, animations, visual gameplay logic.

---

# 📋 Session Log — 2026-07-04 — M3.4

Completed today:

- [x] **M3.4 — EvolutionManager implemented** (branch `m3-4-evolution-manager`)
- [x] `journey/evolution/evolutionUtils.ts` — evolution checkpoints derived from `eventConfig.ts` by type; Nth evolution event → stage N+1; `getStageConfig()` resolves stage names (Wispet → Lumorph → Nebulorem) from the active theme's `SpriteConfig`
- [x] `journey/evolution/EvolutionManager.tsx` — subscribes only to the EventManager publication channel; orchestrates pause → visual sequence → stage swap → resume; duplicate/already-reached events ignored; generation counter makes `resetEvolution()` safe mid-sequence; rejected sequences still resume (no soft-lock)
- [x] `journey/evolution/evolutionSequence.ts` — typed `EvolutionSequence` delegation seam for AnimationManager (M3.5); placeholder timer (duration from `config/evolutionConfig.ts`, DESIGN.md 2–3s)
- [x] `journey/evolution/EvolutionContext.ts` + `journey/hooks/useEvolution.ts` — typed context: `currentStage`, `isEvolving`, `evolveTo()`, `resetEvolution()`, `lastEvolutionEvent`
- [x] `EngineDebug` extended — stage number + creature name, `isEvolving`, last evolution event (dev-only)

M3.4 acceptance criteria met: state + orchestration only · no sprites/visuals/animations · progress pauses for the full sequence and resumes after · no hardcoded checkpoint ids or percentages · directly consumable by M5 Creature via `useEvolution()`.

Scope excluded (M3.5+): AnimationManager GSAP timelines, Creature.tsx, SpriteRenderer.tsx, overlays, camera, scenes.

---

# 📋 Session Log — 2026-07-04 — M3.5

Completed today:

- [x] **M3.5 — AnimationManager implemented** (branch `m3-5-animation-manager`)
- [x] `journey/config/animationConfig.ts` — per-family timeline defaults (evolution / overlay / camera / transition), evolution phase map (charge → flash → morph → settle per DESIGN.md sequence), reduced-motion stub duration — evolution timing still reads `EVOLUTION_SEQUENCE_MS` from `evolutionConfig.ts`
- [x] `journey/animations/animationUtils.ts` — pure React-free helpers: `prefers-reduced-motion` detection + phase-labeled evolution timeline builder (labels are the M5 attachment points for glow/particles/flash/scale)
- [x] `journey/animations/AnimationManager.tsx` — centralized GSAP timeline factory; visual effects only, owns no application state; tracks the reduced-motion media query live (sequences read the flag at run time via ref)
- [x] `journey/animations/AnimationContext.ts` + `journey/hooks/useAnimation.ts` — typed context: `prefersReducedMotion`, `createTimeline(kind)`, `createEvolutionSequence()`; typed `EvolutionEffectsBuilder` extension point for M5
- [x] M3.4 seam filled — `App.tsx` injects the GSAP-backed `EvolutionSequence` into EvolutionManager through the existing `sequence` prop; zero EvolutionManager changes
- [x] `EngineDebug` extended — reduced-motion flag (dev-only)

M3.5 acceptance criteria met: single timeline factory for all animation families · no state ownership · evolution sequence resolves on timeline completion so pause → swap → resume orchestration is unchanged · reduced-motion flag exposed (full disable matrix deferred to M10) · no magic numbers or hardcoded durations in components.

Scope excluded (M3.6+): camera movement, overlay enter/exit timelines (built via the factory in M3.7), creature visuals (M5 attaches effects at the phase labels).

---

# 📋 Session Log — 2026-07-04 — M3.6

Completed today:

- [x] **M3.6 — CameraManager implemented** (branch `m3-6-camera-manager`)
- [x] `journey/config/cameraConfig.ts` — world travel length (vw), responsive creature-anchor breakpoints (~25% desktop, adjusted tablet/mobile per ARCHITECTURE.md), explicit `CameraMode` enum, reduced-motion parallax stub value
- [x] `journey/camera/cameraUtils.ts` — pure React-free helpers: progress → camera travel (vw) + breakpoint anchor resolution
- [x] `journey/camera/CameraManager.tsx` — world offset derived from normalized progress only (never browser scroll); no smoothing pass (ScrollTrigger scrub is already continuous); camera freezes automatically while progress is paused — zero camera-specific pause code
- [x] Parallax multiplier interface — `getParallaxOffsetVw(multiplier)`; SceneManager (M4) passes speeds from `sceneConfig.ts`, so CameraManager knows nothing about scene layers; ambient layers (multiplier 0) stay camera-independent
- [x] Reduced-motion stub — differential depth motion collapses to a single plane via the AnimationManager flag (full disable matrix in M10)
- [x] Ending-mode stub — explicit `follow | ending` enum so cinematic mode can never leak into gameplay (risk register); center + zoom implemented in M6
- [x] `journey/camera/CameraContext.ts` + `journey/hooks/useCamera.ts` — typed context/hook
- [x] `EngineDebug` extended — camera travel, mode, creature anchor (dev-only)

M3.6 acceptance criteria met: world offset from progress · responsive anchor · parallax interface ready for M4 · ending stub only · no gameplay state ownership · no hardcoded speeds/breakpoints in components.

Scope excluded (M3.7+): overlay lifecycle, scene rendering and parallax consumption (M4), creature rendering (M5), ending cinematic (M6).

---

# 🚧 Current Development Goal

Build the project from the inside out.

See **`ROADMAP.md`** for the full milestone plan with complexity, dependencies, and risk estimates.

Priority order

1. M1 — Project Scaffold

↓

2. M2 — Config Layer

↓

3. M3 — Core Engine (Managers)

↓

4. M4 — World & Scenes

↓

5. M5 — Creature & Evolution

↓

6. M6 — Portfolio Overlays & Ending

↓

7. M7–M8 — HUD & Visual Polish

↓

8. M9–M11 — Placeholder Themes, A11y/Perf, Release

---

# ✅ Current Milestone — M3 Core Engine (Managers)

Tasks

- [x] ThemeManager — time-based selection + React Context (reads `themeConfig.ts`)

- [x] ProgressManager — ScrollTrigger scrub → normalized 0.0–1.0 with pause/resume

- [x] EventManager — register from `eventConfig.ts`, fire exactly once per checkpoint

- [x] EvolutionManager — stage state + pause/sequence/swap/resume orchestration (M3.4)

- [x] AnimationManager — GSAP visual effects, fills the `EvolutionSequence` seam (M3.5)

- [x] CameraManager — world travel from progress, responsive anchor, parallax interface, ending-mode stub (M3.6)

- [ ] OverlayManager (M3.7)

- [ ] Engine integration + debug panel

Nothing visual should be prioritized over architecture.

---

# 📅 Upcoming Milestones

| Milestone | Name | Complexity | Risk |
|-----------|------|------------|------|
| M2 | Config Layer & Content Schemas | Medium | Medium |
| M3 | Core Engine (Managers) | **High** | **High** |
| M4 | World & Scenes (Night) | High | Medium |
| M5 | Creature & Evolution | Medium | Medium |
| M6 | Portfolio Overlays & Ending | Medium | Medium |
| M7 | HUD & Global UI | Low | Low |
| M8 | Visual Polish (Night) | Medium | Low |
| M9 | Placeholder Themes | Low | Low |
| M10 | Accessibility & Performance | Medium | Medium |
| M11 | QA, Deploy & v1.0 | Medium | Medium |

Full task breakdown, dependency graph, version targets, and risk register: **`ROADMAP.md`**

---

# 🎨 Design Rules

The portfolio should always feel like a game.

Do not create traditional webpage layouts.

Every portfolio section is a story event.

Every animation should support immersion.

The world should always remain visible.

Glassmorphism overlays should occupy approximately 80–90% of the viewport.

---

# 🎥 Camera Rules

The creature should remain approximately **25% from the left** on desktop.

Adjust slightly for tablet and mobile.

The camera moves.

The creature appears to travel.

Only the ending cinematic may center the creature before zooming out.

---

# 🌲 Scene Rules

Scenes are mapped to fixed progress ranges:

0–33% Scene 1

33–66% Scene 2

66–95% Scene 3

95–100% Ending Area

Each scene is composed of independent layers.

Sky

Clouds

Moon

Mountains

Trees

Ground

Foreground

Fog

Particles

Never combine everything into one image.

---

# 👻 Creature Rules

Creature owns no application state.

Creature receives

Theme

Stage

Walking

Direction

Position

Everything else belongs elsewhere.

---

# 🧩 Event Rules

Every gameplay event belongs inside EventManager.

Never write

if(progress>.45)

inside random components.

Every event must be registered.

---

# 🪟 Overlay Rules

Overlays pause:

Creature movement

Camera

Progress

Scroll progression

They do NOT pause:

Fog

Particles

Moon glow

Ambient animations

Idle breathing

The world should always feel alive.

Resume, GitHub, LinkedIn, and other external links appear only on the Ending Screen.

---

# 📦 Asset Pipeline

Sprites

↓

spriteConfig.ts

Backgrounds

↓

themeConfig.ts

Portfolio Content

↓

portfolio.ts

Never hardcode asset paths.

---

# ⚡ Performance Goals

Maintain 60 FPS

GPU transforms

Minimal rerenders

Sprite sheets

Lazy loading

Scene culling

Preload next scene

---

# 🚫 Things That Must Never Change

These are project decisions.

Do not modify without approval.

✔ Scroll controls the creature.

✔ Camera follows the creature.

✔ Themes load automatically.

✔ Progress is normalized.

✔ Event-driven architecture.

✔ Scene-based backgrounds.

✔ Original creatures only.

✔ GSAP handles gameplay animations.

✔ React manages UI.

---

# 📝 Coding Guidelines

Use TypeScript strictly.

Avoid any.

Keep components under approximately 250 lines.

Use reusable systems.

Prefer configuration over hardcoding.

Write comments explaining WHY, not WHAT.

---

# 📈 Current Blockers

None.

The project is ready to begin implementation.

---

# 🎯 Next Task

**M3 — Core Engine (Managers)**

1. ThemeManager — time-based theme selection + React Context
2. ProgressManager — ScrollTrigger scrub to normalized progress with pause/resume
3. EventManager — register events from `eventConfig.ts`, fire exactly once
4. EvolutionManager + AnimationManager (state vs effects split)
5. CameraManager and OverlayManager
6. Engine integration + debug panel

Then proceed to **M4 (World & Scenes)** once M3 acceptance criteria pass.

Do not begin M4 (scenes) before M3 (engine) acceptance criteria pass.

See **`ROADMAP.md`** for the complete ordered plan.

---

# 🤖 Instructions for AI

Before writing code:

1.

Read

README.md

ARCHITECTURE.md

CURSOR.md

PROJECT_CONTEXT.md

2.

Summarize your understanding.

3.

Explain your implementation plan.

4.

List files that will change.

5.

Implement ONE feature only.

6.

Summarize changes.

7.

Recommend the next task.

Never continue indefinitely.

---

# ❤️ Final Vision

PixelMon Journey should not feel like a portfolio.

It should feel like completing a short indie game where the player naturally discovers the developer's story through exploration.

Every technical decision should support immersion, maintainability, and long-term scalability.