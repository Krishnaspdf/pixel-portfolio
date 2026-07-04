/*
 * Camera tuning — consumed by CameraManager (M3.6).
 *
 * ARCHITECTURE.md: the creature stays at approximately 25% from the left on
 * desktop (adjusted slightly for tablet/mobile); the WORLD moves so the
 * creature appears to travel. Only the ending cinematic (M6) may center it.
 */

/**
 * Total horizontal distance the camera travels across the full journey,
 * in viewport-width units (100 = one screen). Tuning data — SceneManager
 * (M4) sizes its scenes against this same value so world length and camera
 * travel always agree.
 */
export const WORLD_TRAVEL_LENGTH_VW = 400;

/**
 * Explicit camera modes (ROADMAP.md risk register: "Ending camera mode
 * leak — explicit CameraManager mode enum; reset on restart").
 * "ending" centers the creature and zooms out — implemented in M6.
 */
export type CameraMode = "follow" | "ending";

export interface CameraBreakpoint {
  /** Inclusive minimum viewport width for this anchor, in px. */
  readonly minWidthPx: number;
  /** Creature anchor as a fraction of viewport width from the left. */
  readonly creatureAnchor: number;
}

/**
 * DESIGN.md: ~25% from the left on desktop, adjusted slightly for smaller
 * screens (the creature needs more world visible ahead of it).
 * Ordered mobile-first by ascending minWidthPx; the widest match wins.
 */
export const CAMERA_BREAKPOINTS: readonly CameraBreakpoint[] = [
  { minWidthPx: 0, creatureAnchor: 0.35 }, // mobile
  { minWidthPx: 768, creatureAnchor: 0.3 }, // tablet
  { minWidthPx: 1024, creatureAnchor: 0.25 }, // desktop — canonical value
];

/** Canonical desktop anchor — safe fallback if breakpoints ever misconfigure. */
export const FALLBACK_CREATURE_ANCHOR = 0.25;

/**
 * Reduced-motion stub (M10 does the full pass): differential depth motion
 * collapses so all camera-driven layers move as one plane. Ambient layers
 * (multiplier 0, e.g. fog/particles) remain camera-independent.
 */
export const REDUCED_MOTION_PARALLAX_MULTIPLIER = 1;
