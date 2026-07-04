# 🏗️ ARCHITECTURE.md
# PixelMon Journey - System Architecture

> This document defines the technical architecture of PixelMon Journey.

Every developer or AI assistant working on this repository **must follow this architecture**.

Architecture changes require approval.

---

# 📐 Confirmed Architecture Decisions

These decisions are canonical. All implementations must follow them.

## Camera

Creature at approximately **25% from the left** on desktop. Adjust for tablet/mobile. Only the ending cinematic may center the creature before zooming out.

## Progress Checkpoints

Fixed only: 10% About · 30% Tech Stack · 45% Evolution 1 · 60% Projects · 80% Contact · 90% Final Evolution · 100% Ending

## Scene Layout

0–33% Scene 1 · 33–66% Scene 2 · 66–95% Scene 3 · 95–100% Ending Area

## Overlay Behavior

Overlays pause creature, camera, progress, and scroll progression. Ambient animations continue.

## Evolution Architecture

EventManager → EvolutionManager (state + sprite changes) → AnimationManager (GSAP effects only)

## Styling

Plain CSS with CSS variables. No Tailwind.

## External Links

Resume, GitHub, LinkedIn — Ending Screen only. No separate overlays.

---

# 📖 Overview

PixelMon Journey is built as a modular, event-driven application.

Every feature belongs to a dedicated system.

Each system has **one responsibility**.

Systems communicate through shared state and events.

No feature should directly control another feature.

---

# 🧩 High-Level Architecture

```text
                  Browser Scroll
                         │
                         ▼
               ScrollTrigger (GSAP)
                         │
                         ▼
                 ProgressManager
                 (0.0 → 1.0)
                         │
      ┌──────────────────┼──────────────────┐
      ▼                  ▼                  ▼
 EventManager      CameraManager      ThemeManager
      │                  │                  │
      ├────────► OverlayManager         ThemeConfig
      │                  │
      ├────────► EvolutionManager ──► AnimationManager
      │                  │
      │            SceneManager
      │                  │
      └────────► React UI + Creature System
```

Every major feature depends on **ProgressManager**, never on browser scroll directly.

---

# 📂 Project Structure

```text
src/

│
├── app/
│
├── journey/
│
│   ├── camera/
│   │     CameraManager.tsx
│   │
│   ├── creature/
│   │     Creature.tsx
│   │     SpriteRenderer.tsx
│   │     Evolution.tsx
│   │
│   ├── events/
│   │     EventManager.ts
│   │
│   ├── overlays/
│   │     OverlayHost.tsx
│   │
│   ├── scenes/
│   │
│   ├── themes/
│   │
│   ├── hooks/
│   │
│   ├── config/
│   │
│   ├── ui/
│   │
│   └── utils/
│
├── assets/
│
└── styles/
```

Every folder has exactly one responsibility.

---

# 🎮 Core Engine

The engine is driven by one value.

```text
Progress

0.0

↓

1.0
```

Everything reacts to progress.

Nothing reacts directly to browser scrolling.

---

# 🌎 ThemeManager

## Responsibility

Determine which world should load.

---

Input

```ts
new Date().getHours()
```

Output

```ts
type Theme =
    | "morning"
    | "evening"
    | "night"
```

---

Responsibilities

✔ Determine theme

✔ Load assets

✔ Load colors

✔ Load creature config

✔ Expose theme through React Context

---

Never

❌ Manage scenes

❌ Manage overlays

❌ Trigger events

---

# 📈 ProgressManager

Single source of truth.

Responsible for converting ScrollTrigger values into normalized progress.

```ts
0.0

↓

1.0
```

Public API

```ts
progress

setProgress()

useProgress()
```

No other component should calculate progress.

---

# 🎯 EventManager

The heart of the application.

All gameplay events originate here.

Example

```ts
[
    { id: "about", trigger: 0.10, type: "overlay" },
    { id: "techStack", trigger: 0.30, type: "overlay" },
    { id: "evolution1", trigger: 0.45, type: "evolution" },
    { id: "projects", trigger: 0.60, type: "overlay" },
    { id: "contact", trigger: 0.80, type: "overlay" },
    { id: "evolution2", trigger: 0.90, type: "evolution" },
    { id: "ending", trigger: 1.00, type: "ending" }
]
```

Use fixed checkpoints only. Never use ranges.

Supported events

Overlay

Evolution

SceneTransition

Ending

Audio

Future

Achievements

NPC

Weather

---

Never

Use

```ts
if(progress>.45)
```

inside random components.

Always register events.

---

# 🎥 CameraManager

Responsible for creating movement.

The creature stays at approximately **25% from the left** on desktop.

Adjust slightly for tablet and mobile.

The world moves.

Only the ending cinematic may center the creature before zooming out.

Responsibilities

✔ Camera movement

✔ Parallax

✔ Scene transitions

✔ Ending zoom

Never

Manage overlays

Trigger evolution

---

# 🌲 SceneManager

Scenes are independent and mapped to fixed progress ranges.

| Progress | Scene |
|----------|--------|
| 0–33% | Scene 1 |
| 33–66% | Scene 2 |
| 66–95% | Scene 3 |
| 95–100% | Ending Area |

Scene

↓

Layers

↓

Objects

Each scene loads:

Sky

Mountains

Trees

Ground

Foreground

Particles

Example

```text
Night

Scene1 (0–33%)

Scene2 (33–66%)

Scene3 (66–95%)

Ending (95–100%)
```

Morning and Evening follow the same structure.

---

# 👻 Creature System

Creature is purely presentational.

Props

```ts
theme

stage

walking

direction

position
```

Creature never owns application state.

---

Subcomponents

```text
Creature

↓

SpriteRenderer

↓

Shadow

↓

Particles

↓

Aura
```

---

# ✨ Evolution System

Evolution is event driven.

**EvolutionManager** is a dedicated system. It owns evolution state and sprite changes.

**AnimationManager** handles GSAP animations and visual effects only. It does not own evolution state.

Flow

```text
EventManager

↓

EvolutionManager (state + sprite swap)

↓

AnimationManager (GSAP effects)

↓

Continue Journey
```

Evolution stages

Stage 1

↓

Stage 2

↓

Stage 3

Each theme has independent creature configurations.

---

# 🖼 Sprite System

Sprites never live inside components.

Instead

```ts
spriteConfig.ts
```

Example

```ts
night:{

stage1:{...}

stage2:{...}

stage3:{...}

}
```

Adding a new creature should only require editing config.

---

# 🪟 OverlayManager

Displays story overlays.

Overlays are fullscreen.

Glassmorphism.

Reusable.

Current overlays

About

Tech Stack

Projects

Contact

Ending

OverlayManager owns

Current overlay

Open

Close

Animation lifecycle

While open: creature, camera, progress, and scroll progression pause. Ambient animations continue.

Never

Store portfolio data.

Trigger external-link overlays (Resume, GitHub, LinkedIn — Ending Screen only)

---

# 📜 Content System

Portfolio content is separated from UI.

```text
content/

portfolio.ts
```

Example

```ts
name

bio

skills

projects

contact
```

UI reads content.

Never hardcode content inside components.

---

# 🎨 Theme Assets

Every theme follows identical structure.

```text
assets/

morning/

sprites/

backgrounds/

audio/

night/

sprites/

backgrounds/

audio/

evening/

sprites/

backgrounds/

audio/
```

Themes should be interchangeable.

---

# 🌍 Scene Layers

Each scene contains

Sky

Clouds

Moon

Mountains

Trees

Ground

Foreground

Particles

Fog

Parallax

Suggested speeds

| Layer | Speed |
|--------|--------|
| Sky | 0.15x |
| Clouds | 0.20x |
| Mountains | 0.35x |
| Trees | 0.60x |
| Ground | 1.00x |
| Foreground | 1.20x |

---

# 🎬 Animation System

Animations use GSAP.

Never use CSS animations for gameplay events.

**AnimationManager** handles GSAP timelines for visual effects only.

Evolution state and sprite changes belong to **EvolutionManager**.

Use GSAP for

Evolution

Camera

Transitions

Overlay

Particles

CSS animations are acceptable for

Idle bob

Floating particles

Simple blinking

---

# 🎨 Styling

Plain CSS with CSS variables only.

Theme colors, spacing, and effects are driven by CSS variables.

No Tailwind.

---

# 🧠 State Management

React Context

Global

Theme

Progress

Overlay

Evolution Stage

Local

Hover

UI animation

Form state

Never place application state inside presentation components.

---

# ⚡ Performance

Goals

60 FPS

GPU transforms

Sprite sheets

Lazy loading

Scene culling

Preload next scene

Avoid

Large rerenders

Layout thrashing

Expensive filters

---

# ♿ Accessibility

Keyboard navigation

Reduced motion

Focus trapping

Semantic HTML

Readable contrast

Alt text

---

# 🧪 Testing Strategy

Each feature should be tested independently.

Example

ThemeManager

✔ Morning

✔ Evening

✔ Night

✔ Override

EventManager

✔ Event triggers once

✔ No duplicates

✔ Reverse scrolling

Overlay

✔ Keyboard

✔ Mouse

✔ Escape

Creature

✔ Idle

✔ Walk

✔ Evolution

---

# 🚧 Future Expansion

Architecture should support

Morning creatures

Evening creatures

Achievements

NPCs

Audio

Weather

Mini games

Secret paths

Without rewriting existing systems.

---

# 🏁 Guiding Principles

Every system should be:

✔ Modular

✔ Typed

✔ Configurable

✔ Reusable

✔ Testable

✔ Documented

✔ Easy to replace

If adding a feature requires modifying multiple unrelated systems, the architecture should be reconsidered.

---

# ❤️ Final Rule

This repository is **not built like a website**.

It is built like a **small game engine running inside a browser**.

Every architectural decision should reinforce that philosophy.