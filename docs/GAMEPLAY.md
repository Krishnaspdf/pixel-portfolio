# 🎮 GAMEPLAY.md
# PixelMon Journey — Gameplay Design Document (GDD)

> "Don't scroll through my portfolio.
> Play it."

---

# 📖 Overview

PixelMon Journey is an interactive side-scrolling portfolio where the visitor controls an original creature by scrolling.

Unlike a traditional website, the visitor is not reading sections.

Instead, they are progressing through a handcrafted pixel-art world where every interaction contributes to a short adventure.

The portfolio is designed to last approximately **5–7 minutes**.

The player should feel as though they completed a miniature indie game.

---

# 🎯 Gameplay Philosophy

Every mechanic exists to support one idea:

> **Scrolling is exploration.**

Scrolling should never feel like moving through a webpage.

Scrolling should feel like moving through a world.

The player should constantly discover something new.

---

# 🎮 Core Gameplay Loop

```
Open Website

↓

Theme Loads

↓

Creature Appears

↓

Player Scrolls

↓

Creature Walks

↓

Camera Follows

↓

Environment Changes

↓

Portfolio Event

↓

Continue Journey

↓

Evolution

↓

New Scene

↓

Repeat

↓

Final Evolution

↓

Ending Sequence

↓

Journey Complete
```

---

# 🌎 Theme Selection

Immediately after loading the page:

```javascript
const hour = new Date().getHours();
```

ThemeManager automatically selects:

🌄 Morning

🌇 Evening

🌙 Night

Only one theme is active during each visit.

The world should immediately communicate its atmosphere.

---

# 🌙 Night Journey

(Current Vertical Slice)

Creature

Wispet

↓

Lumorph

↓

Nebulorem

Scenes

Whispering Woods

↓

Forgotten Cemetery

↓

Moonlit Shrine

↓

Ending Temple

---

# 🎮 Player Controls

Desktop

Mouse Wheel

Trackpad

Keyboard (optional)

Mobile (future)

Swipe

Touch drag

The player has only one responsibility:

Continue the journey.

No complicated controls should exist.

---

# 🚶 Creature Behaviour

When the player scrolls:

Creature walks.

Camera moves.

Parallax reacts.

Particles continue.

When the player stops scrolling:

Creature idles.

World continues subtle ambient animation.

The player should never feel that the world freezes.

---

# 🌫 Ambient World

The environment should always feel alive.

Examples

Fog slowly drifts.

Fireflies move.

Moon glows.

Trees sway.

Ghost wisps float.

Particles shimmer.

Small animations create immersion.

---

# 📍 Journey Timeline

Fixed checkpoints only. Never use ranges.

10% About · 30% Tech Stack · 45% Evolution 1 · 60% Projects · 80% Contact · 90% Final Evolution · 100% Ending

---

## 0%

The adventure begins.

Creature spawns.

Scene title appears.

Camera slowly introduces the world.

Player gains control.

---

## 10%

📖 Adventurer's Journal

Large glass panel appears.

Contains:

About Me

Introduction

Developer Story

Player closes overlay.

Journey continues.

---

## 20%

Continue exploring.

Ambient scenery changes.

New landmarks appear.

No interruptions.

---

## 30%

⚙ Equipment Inventory

Displays

Languages

Frameworks

Tools

Technologies

Overlay closes.

Creature continues.

---

## 40%

Transition Zone

Environment changes.

Fog increases.

Camera enters new biome.

Player feels progression.

---

## 45%

✨ First Evolution

Creature stops.

Glow begins.

Particles appear.

Flash.

Creature evolves.

Journey resumes.

This should feel rewarding.

---

## 60%

🏆 Completed Quests

Portfolio projects.

Cards should resemble game quests.

Each project should feel unlocked.

---

## 70%

Continue journey.

Environment becomes more mystical.

Visual anticipation increases.

Player senses the ending approaching.

---

## 80%

📬 Guild Hall

Contact information.

Email.

Overlay closes.

Final stretch begins.

Note: Resume, GitHub, and LinkedIn appear only on the Ending Screen — not in this overlay.

---

## 90%

✨ Final Evolution

Creature reaches strongest form.

Camera slows.

Particles increase.

Music becomes emotional (future).

---

## 100%

🏛 Ending Temple

Creature reaches destination.

Camera slowly zooms out.

Moon becomes brighter.

Particles surround creature.

Display

Thank You

Resume

GitHub

LinkedIn

Restart Journey

Journey statistics

Theme Played

Creature

Journey Time

Completion

External links (Resume, GitHub, LinkedIn) appear **only here** — not as scroll-triggered overlays.

Player leaves feeling they completed a game.

---

# 🏞 Scene Design

Scenes are mapped to fixed progress ranges.

| Progress | Scene |
|----------|--------|
| 0–33% | Scene 1 — Whispering Woods |
| 33–66% | Scene 2 — Forgotten Cemetery |
| 66–95% | Scene 3 — Moonlit Shrine |
| 95–100% | Ending Area — Ending Temple |

Every scene tells a story.

## Scene 1

Whispering Woods (0–33%)

Purpose

Introduce world.

Teach scrolling.

About Me.

Tech Stack.

---

## Scene 2

Forgotten Cemetery (33–66%)

Purpose

Increase mystery.

First evolution.

Projects.

---

## Scene 3

Moonlit Shrine (66–95%)

Purpose

Build anticipation.

Contact.

Final evolution.

---

## Scene 4

Ending Temple (95–100%)

Purpose

Reward exploration.

Celebrate completion.

Encourage further interaction.

---

# 🎥 Camera Behaviour

Camera should feel cinematic.

Never abrupt.

Never jerky.

Creature stays at approximately **25% from the left** on desktop.

Adjust slightly for tablet and mobile.

Only the ending cinematic may center the creature before zooming out.

Camera should

Follow creature.

Reveal scenery naturally.

Slow down near ending.

Create anticipation before evolutions.

---

# 👻 Creature Evolution

Evolution is the player's reward.

Never random.

Never automatic without progress.

Every evolution should feel earned.

Sequence

Stop

↓

Glow

↓

Particles

↓

Flash

↓

Scale

↓

New Form

↓

Continue

---

# 🪟 Overlay Behaviour

Overlays represent discoveries.

Not interruptions.

While overlay is open

Creature pauses.

Camera pauses.

Progress pauses.

Scroll progression stops.

Ambient world continues.

Player remains inside the world.

The illusion should never break.

---

# 🎨 Scene Transitions

Transitions should be environmental.

Examples

Fog thickens.

Ground changes.

Trees become dead.

Shrine appears.

Lighting changes.

The player should never notice image boundaries.

---

# 📈 Difficulty

There is no failure.

No health.

No enemies.

No combat.

The challenge is curiosity.

The reward is discovery.

---

# ❤️ Emotional Journey

Beginning

Curiosity

↓

Wonder

↓

Exploration

↓

Discovery

↓

Excitement

↓

Evolution

↓

Achievement

↓

Reflection

↓

Completion

---

# 🏆 Success Criteria

The gameplay succeeds if the player says:

"I forgot I was looking at a portfolio."

Instead they should say:

"I just finished a tiny pixel-art adventure."

---

# ⏱ Target Session Length

First Visit

5–7 minutes

Returning Visitor

2–4 minutes

The experience should never overstay its welcome.

---

# 🔮 Future Gameplay Ideas

Achievement System

Hidden collectibles

Secret creature evolution

Weather changes

Dynamic music

NPC interactions

Dialogue boxes

Mini-games

Multiple endings

Seasonal events

---

# 🎯 Gameplay Principles

Every feature should answer one question:

Does this make the journey more memorable?

If yes,

build it.

If not,

remove it.

---

# 🌟 Final Vision

PixelMon Journey is not trying to impress visitors with technology alone.

It is trying to make them **feel** something.

The visitor should remember:

✔ The mysterious forest.

✔ The evolving creature.

✔ The smooth animations.

✔ The handcrafted world.

✔ The emotional ending.

Only after that should they remember:

**"This was Krishna Dubey's portfolio."**

That emotional connection is the true objective of this project.