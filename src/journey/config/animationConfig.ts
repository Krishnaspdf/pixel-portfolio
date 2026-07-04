/*
 * Animation tuning — consumed by AnimationManager (M3.5).
 *
 * Central defaults for every GSAP timeline family so systems never duplicate
 * timeline settings (README.md: "Never duplicate animation timelines").
 * Evolution timing reads EVOLUTION_SEQUENCE_MS from evolutionConfig.ts so the
 * GSAP sequence and the M3.4 orchestration always agree on duration.
 */

import { EVOLUTION_SEQUENCE_MS } from "./evolutionConfig";

/** GSAP durations are expressed in seconds; configs store milliseconds. */
export const MS_PER_SECOND = 1000;

/** Timeline families owned by AnimationManager (ROADMAP.md M3.5). */
export type AnimationKind = "evolution" | "overlay" | "camera" | "transition";

export interface TimelineDefaults {
  /** Default ease inherited by child tweens unless overridden. */
  readonly ease: string;
  /** Default child tween duration, in seconds (GSAP unit). */
  readonly durationSeconds: number;
}

/*
 * WHY per-family defaults: overlays (M3.7), camera (M3.6), and scene
 * transitions (M4) build their timelines through the same factory — tuning
 * happens here, never inside components.
 */
export const TIMELINE_DEFAULTS: Readonly<Record<AnimationKind, TimelineDefaults>> = {
  evolution: {
    ease: "power2.inOut",
    durationSeconds: EVOLUTION_SEQUENCE_MS / MS_PER_SECOND,
  },
  overlay: { ease: "power3.out", durationSeconds: 0.6 },
  camera: { ease: "none", durationSeconds: 1 },
  transition: { ease: "sine.inOut", durationSeconds: 1.2 },
};

/**
 * Evolution phase map — DESIGN.md sequence: light grows → particles →
 * flash → scale → new form → ambient glow. Each phase becomes a GSAP label
 * so the Creature system (M5) attaches glow/particle/flash/scale effects
 * without modifying AnimationManager.
 */
export type EvolutionPhaseId = "charge" | "flash" | "morph" | "settle";

export interface EvolutionPhaseConfig {
  readonly id: EvolutionPhaseId;
  /** Fraction of the total sequence duration (all shares sum to 1). */
  readonly share: number;
}

export const EVOLUTION_PHASES: readonly EvolutionPhaseConfig[] = [
  { id: "charge", share: 0.32 }, // light grows + particles gather
  { id: "flash", share: 0.12 }, // white flash hides the form change
  { id: "morph", share: 0.28 }, // scale animation → new form
  { id: "settle", share: 0.28 }, // ambient glow fades back to gameplay
];

/**
 * Reduced-motion stub (ROADMAP.md M3.5): the sequence still runs so the
 * pause → swap → resume orchestration is unchanged, just near-instantly.
 * The full reduced-motion disable matrix is an M10 task.
 */
export const REDUCED_MOTION_EVOLUTION_MS = 400;
