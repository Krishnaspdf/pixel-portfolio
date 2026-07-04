/*
 * Pure helpers for the animation system (M3.5).
 * React-free and unit-testable, mirroring eventUtils/evolutionUtils.
 */

import gsap from "gsap";
import { EVOLUTION_PHASES, MS_PER_SECOND } from "../config/animationConfig";

/** Media query behind the accessibility flag (DESIGN.md, ROADMAP.md M10). */
export const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

/** Safe initial read — false when matchMedia is unavailable (tests/SSR). */
export function readReducedMotionPreference(): boolean {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") {
    return false;
  }
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

/**
 * Builds the phase-labeled evolution timeline. Every phase from
 * animationConfig becomes a GSAP label followed by a spacer tween reserving
 * the phase's duration. Visual tweens attach AT these labels in M5 — the
 * timeline structure itself never changes.
 */
export function buildEvolutionTimeline(totalDurationMs: number): gsap.core.Timeline {
  // WHY paused: callers attach effects and completion callbacks first,
  // then start playback explicitly.
  const timeline = gsap.timeline({ paused: true });
  for (const phase of EVOLUTION_PHASES) {
    timeline.addLabel(phase.id);
    // WHY an empty-object tween: it reserves the phase slot with zero visual
    // side effects — the creature does not render until M5.
    timeline.to({}, { duration: (totalDurationMs * phase.share) / MS_PER_SECOND });
  }
  return timeline;
}
