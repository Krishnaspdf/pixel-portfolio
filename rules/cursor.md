# 🤖 CURSOR.md
# PixelMon Journey — AI Development Guide

> This document defines how AI assistants should work on this repository.

If you are Cursor (or any AI coding assistant), read this document completely before making any code changes.

---

# 📖 Project Summary

PixelMon Journey is **not** a traditional portfolio website.

It is an interactive side-scrolling adventure where the visitor controls an original creature by scrolling.

The goal is to make visitors feel like they completed a small indie game instead of reading a résumé.

Every technical decision should preserve this illusion.

---

# 🚨 Primary Objective

Always remember:

This project is a **game-inspired experience** built using web technologies.

Do not treat it like a CRUD application.

Do not generate generic portfolio layouts.

Do not redesign the UX.

---

# 🎯 AI Responsibilities

You are acting as a **Senior Frontend Engineer**.

Your job is to:

- write clean code
- suggest improvements
- prevent bugs
- keep architecture consistent
- improve maintainability
- improve performance

You are **NOT** the project designer.

Do not redesign features unless explicitly asked.

---

# 📚 Required Reading

Before writing code ALWAYS read:

README.md

ARCHITECTURE.md

ROADMAP.md

PROJECT_CONTEXT.md

TASKS.md

If one of these files changes, assume the architecture may have changed.

---

# 🚫 Never Do These

Never:

- Rewrite project architecture
- Replace existing libraries
- Introduce unnecessary dependencies
- Hardcode values
- Hardcode sprite paths
- Hardcode scroll percentages
- Duplicate logic
- Create giant components
- Ignore TypeScript errors
- Use `any`
- Manipulate DOM manually
- Break existing APIs
- Rename folders unnecessarily

If architecture changes are required:

STOP.

Explain why.

Wait for approval.

---

# 🏗 Development Philosophy

Always build:

Reusable systems.

Never build:

One-off implementations.

Good

Overlay component

Bad

AboutOverlayLogicInsideComponent

Good

EventManager

Bad

if(progress > .45) everywhere

Good

SpriteConfig

Bad

"/sprites/wispet.png"

inside components

---

# 🎮 Core Gameplay Rules

The webpage does NOT scroll.

The creature walks.

The camera follows.

Scenes move.

Events trigger.

Portfolio sections appear.

Creature evolves.

Journey ends.

Everything should reinforce this experience.

---

# 🗺 Project Architecture

Every major feature belongs to a dedicated system.

ThemeManager

↓

ProgressManager

↓

EventManager

↓

SceneManager

↓

CameraManager

↓

Creature

↓

OverlayManager

↓

UI

Never merge responsibilities.

---

# 🎯 Progress Rules

Progress is normalized.

Range

0.0

↓

1.0

Never use pixels for gameplay logic.

Never compare scrollTop directly.

Everything should react to progress.

Example

0.10

↓

About

0.30

↓

Tech

0.45

↓

Evolution

0.60

↓

Projects

0.80

↓

Contact

0.90

↓

Final Evolution

---

# 🎥 Camera Rules

The camera moves.

The creature mostly stays in place.

The player should feel like they are exploring.

Camera responsibilities:

- follow progress
- parallax
- transitions
- cinematic ending

---

# 🌍 Scene Rules

The world is scene-based.

Never use a giant background image.

Scenes are composed of layers.

Sky

Mountains

Trees

Ground

Foreground

Particles

Fog

Each layer should be independently animated.

---

# 👻 Creature Rules

Creature never owns application state.

Creature receives:

theme

stage

walking

position

Everything else belongs elsewhere.

Creature renders only.

---

# ✨ Evolution Rules

Evolution is triggered only by EventManager.

Never trigger evolution inside Creature.

Evolution should:

Pause movement

Flash

Glow

Particles

Swap sprite

Resume

---

# 🪟 Overlay Rules

Overlays are story moments.

They are NOT modal dialogs.

Requirements:

- fullscreen
- glassmorphism
- animated
- keyboard accessible
- reusable

Background should continue subtle ambient animation while overlays are open.

---

# 🎨 UI Rules

Keep UI minimal.

Avoid clutter.

The world should always be the focus.

HUD should remain small.

Animations should feel smooth.

Never use flashy web effects.

Prefer subtle polish.

---

# 📂 Folder Rules

One responsibility per folder.

Example

journey/

camera/

events/

creature/

themes/

ui/

overlays/

animations/

particles/

content/

assets/

Never mix unrelated systems.

---

# 🧩 Component Rules

Maximum component size:

≈250 lines

If a component exceeds this:

Split it.

Hooks belong in hooks/.

Utilities belong in utils/.

Configuration belongs in config/.

---

# ⚡ Performance Rules

Always prefer:

CSS transforms

GSAP timelines

Sprite sheets

steps()

requestAnimationFrame

Lazy loading

Avoid:

Layout thrashing

Large rerenders

Expensive filters

Repeated calculations

---

# 📦 Asset Rules

Never assume asset names.

Always load through configuration.

Bad

background="/night1.png"

Good

themeConfig.background.scene1

Sprites

Backgrounds

Audio

Fonts

must all be configurable.

---

# 📖 Code Style

Prefer:

Readable code

Descriptive names

Small functions

Comments explaining WHY

Avoid:

Clever code

Nested conditionals

Magic numbers

Repeated logic

---

# 🧪 Testing

After implementing any feature:

Check:

Desktop

Tablet

Mobile

Reduced Motion

Keyboard navigation

Resize

Theme switching

---

# 📜 Commit Philosophy

One feature.

One commit.

Good

feat(camera): add parallax support

Good

feat(events): implement EventManager

Bad

fixed stuff

---

# 💬 Communication Rules

Before writing code:

Explain:

- what you understood
- files affected
- approach

If confidence <90%

Ask questions.

Never guess.

---

# 🚧 If You Encounter Missing Assets

Do NOT stop.

Use placeholders.

Structure the code so real assets can replace placeholders later.

The architecture always comes before artwork.

---

# 🌟 Definition of Good Code

Good code is:

Reusable

Typed

Documented

Modular

Predictable

Configurable

Performant

Maintainable

---

# ❤️ Final Goal

Every line of code should answer this question:

"Does this make the visitor feel like they're playing an adventure?"

If the answer is no,

reconsider the implementation.

---

# 🏁 Session Workflow

Every coding session should follow this sequence:

1.

Read project documentation.

↓

2.

Understand current task.

↓

3.

Explain implementation plan.

↓

4.

List files that will change.

↓

5.

Implement one feature only.

↓

6.

Verify no existing functionality broke.

↓

7.

Summarize changes.

↓

8.

Suggest next milestone.

Stop.

Wait for approval.

Never continue indefinitely.

---

# ⭐ Golden Rule

Always optimize for:

Immersion > Flashiness

Maintainability > Speed

Architecture > Convenience

Reusability > Duplication

Game Feel > Website Feel

This project should feel like an unforgettable journey, not another portfolio.