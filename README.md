# 🌌 PixelMon Journey
### An Interactive Pokémon-Inspired Portfolio Experience

> **"Don't scroll through my portfolio. Play it."**

---

# 📖 Project Overview

PixelMon Journey is a highly interactive portfolio website that blends modern web development with classic 2D side-scrolling adventure games.

Instead of scrolling through sections on a webpage, visitors control the journey of an original pixel-art creature. As the visitor scrolls, the creature walks through handcrafted environments, discovers portfolio information, evolves, and ultimately reaches the end of its adventure.

The experience is designed to feel like a short indie game rather than a traditional portfolio.

This project is inspired by the feeling of classic Pokémon and Mario games but uses completely original creatures, artwork, environments, names, and mechanics.

---

# 🎯 Project Goals

This portfolio aims to demonstrate:

- Frontend Engineering
- UI/UX Design
- Animation
- Storytelling
- Game-inspired interaction
- Performance optimization
- Attention to detail
- Creative problem solving

Visitors should remember the experience rather than simply reading a résumé.

---

# 🎮 Core Gameplay

The webpage itself never scrolls.

Instead:

User Scroll

↓

Progress

↓

Creature Walks

↓

Camera Follows

↓

Scene Changes

↓

Portfolio Sections

↓

Evolution

↓

Ending

The scroll wheel acts like movement controls in a side-scrolling game.

---

# 🌎 Dynamic Theme System

When the application starts:

```javascript
const hour = new Date().getHours();
```

The website automatically loads one of three completely different worlds.

---

## 🌄 Morning

Time

05:01 AM → 12:00 PM

Theme

Peaceful

Bright

Warm

Creature

Sun-themed creature

Environment

Forest

Golden light

Morning fog

---

## 🌇 Evening

Time

12:01 PM → 07:00 PM

Theme

Relaxed

Orange

Sunset

Creature

Fire creature

Environment

Mountains

Lanterns

Orange skies

---

## 🌙 Night

Time

07:01 PM → 05:00 AM

Theme

Haunted

Purple

Mysterious

Creature

Wispet

Lumorph

Nebulorem

Environment

Haunted Forest

Forgotten Cemetery

Moonlit Shrine

Ending Temple

---

# 🚀 Current Development Scope

Only the Night Theme will be fully implemented initially.

Morning and Evening themes should exist as placeholders so the ThemeManager is production-ready from day one.

---

# 🎯 Scroll Progress

Everything is controlled using normalized progress.

0.0 → 1.0

Never use pixel values for gameplay logic.

All events must trigger from progress percentages.

Fixed checkpoints only. Never use ranges.

0.10 → About

0.30 → Tech Stack

0.45 → Evolution 1

0.60 → Projects

0.80 → Contact

0.90 → Final Evolution

1.00 → Ending

---

# 🏞 Scene System

The world is divided into scenes.

Never use one giant background.

Night Theme

Scene 1 — Whispering Woods (0–33%)

↓

Scene Transition

↓

Scene 2 — Forgotten Cemetery (33–66%)

↓

Scene Transition

↓

Scene 3 — Moonlit Shrine (66–95%)

↓

Ending Area — Ending Temple (95–100%)

Every scene should have:

Sky

Background

Midground

Foreground

Ground

Particles

Decorations

Each layer should support parallax.

---

# 🎥 Camera System

The creature should remain approximately **25% from the left** on desktop.

Adjust slightly for tablet and mobile.

The world moves.

The creature appears to travel.

Only the ending cinematic may center the creature before zooming out.

The camera is responsible for:

Following progress

Parallax

Scene transitions

Ending zoom

---

# 👾 Creature System

Each creature has:

Idle

Walk

Evolution

Final Idle

Sprites should be configurable.

Never hardcode sprite paths.

Creature should never manage application state.

Creature only renders.

---

# ✨ Evolution System

Evolution is event-driven.

EventManager triggers EvolutionManager.

EvolutionManager controls evolution state and sprite changes.

AnimationManager handles GSAP animations and visual effects.

When progress reaches a threshold:

Pause movement

Play evolution animation

Swap sprite

Resume journey

Evolution effects include:

Glow

Scale

Particles

Flash

Screen shake (subtle)

---

# 🪟 Overlay System

Portfolio content appears as fullscreen glassmorphism panels.

These are not modal dialogs.

They are story events.

Characteristics

• 80–90% viewport

• Background blur

• Semi-transparent

• Smooth GSAP animation

• Keyboard accessible

While overlays are open:

Creature pauses

Camera pauses

Progress pauses

Scroll progression stops

Ambient world continues

Fog continues

Moon glows

Particles continue

The world should always feel alive.

---

# 🏰 Portfolio Sections

Instead of traditional names:

About

↓

📖 Adventurer's Journal

Tech Stack

↓

⚙ Equipment Inventory

Projects

↓

🏆 Completed Quests

Contact

↓

📬 Guild Hall

These names preserve immersion while remaining understandable.

Resume, GitHub, LinkedIn, and other external links appear **only on the Ending Screen** — not as separate overlays.

---

# 🧭 HUD

Display a minimal RPG-style HUD.

Example

Theme

Creature

Current Biome

Journey Progress

Level

HUD must be subtle.

Never distract from the experience.

---

# 🎬 Ending

The ending should feel like completing a game.

Sequence

Creature reaches shrine

↓

Final evolution

↓

Camera slowly zooms out

↓

Particles

↓

Thank You

↓

GitHub

↓

Resume

↓

LinkedIn

↓

Restart Journey

---

# ⚙️ Architecture Principles

This project follows modular architecture.

Each system has one responsibility.

Managers

ThemeManager

ProgressManager

EventManager

SceneManager

CameraManager

OverlayManager

EvolutionManager

CreatureManager

AnimationManager

AudioManager (future)

Never mix responsibilities.

---

# 📂 Folder Structure

src/

journey/

camera/

creature/

events/

themes/

scenes/

ui/

overlays/

animations/

particles/

hooks/

utils/

content/

assets/

sprites/

backgrounds/

audio/

fonts/

---

# 🧠 AI Development Rules

If you are an AI assistant working on this repository:

ALWAYS

Read README.md

Read ARCHITECTURE.md

Read ROADMAP.md

Understand project goals before coding.

Follow the existing architecture.

Never redesign systems without permission.

Build reusable components.

Prefer composition.

Write production-quality code.

Document complex logic.

Keep components focused.

Avoid duplication.

Use TypeScript strictly.

Prefer configuration over hardcoding.

---

# 🚫 Never Do These

❌ Never hardcode sprite paths.

❌ Never hardcode progress values inside components.

❌ Never manipulate the DOM directly.

❌ Never duplicate animation timelines.

❌ Never introduce new libraries without approval.

❌ Never mix UI logic with animation logic.

❌ Never put portfolio data inside components.

❌ Never use magic numbers.

❌ Never break immersion.

---

# 📦 Recommended Libraries

React

TypeScript

GSAP

ScrollTrigger

Vite

clsx

Styling uses plain CSS with CSS variables. No Tailwind.

---

# 🚀 Performance Goals

Maintain 60 FPS.

Use transform instead of top/left.

Lazy load scenes.

Preload next scene.

Use sprite sheets.

Use steps() animations.

Minimize React re-renders.

---

# ♿ Accessibility

Reduced Motion support.

Keyboard navigation.

Focus trapping.

Semantic HTML.

Readable contrast.

Screen reader labels.

---

# 🎯 Coding Philosophy

Build systems.

Not pages.

Build reusable components.

Not one-off components.

Build configurable timelines.

Not hardcoded animations.

Build a game engine.

Not a website.

---

# 📈 Roadmap

Phase 1

Core Engine

Phase 2

Night Theme

Phase 3

Morning Theme

Phase 4

Evening Theme

Phase 5

Optimization

Phase 6

Polish

---

# ❤️ Final Vision

When a recruiter finishes this experience they should think:

"I've never seen a portfolio like this before."

The project should feel like a complete adventure lasting approximately 5–7 minutes.

The user should remember the journey long after leaving the website.