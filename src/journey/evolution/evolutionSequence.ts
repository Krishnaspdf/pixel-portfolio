/*
 * AnimationManager delegation seam (M3.4).
 *
 * EvolutionManager owns state and orchestration ONLY — every visual effect
 * (glow, particles, flash, scale, screen shake) belongs to AnimationManager
 * (M3.5). Until it exists, a placeholder timed sequence stands in so the
 * pause → sequence → swap → resume orchestration is fully testable now.
 *
 * AnimationManager will provide a GSAP-timeline implementation of the same
 * EvolutionSequence type — no EvolutionManager changes required.
 */

import type { EvolutionStage } from "../config/spriteConfig";

/** Runs the visual evolution sequence; resolves when it completes. */
export type EvolutionSequence = (targetStage: EvolutionStage) => Promise<void>;

/** Timer-only stand-in for the M3.5 GSAP timeline. No visuals. */
export function createPlaceholderSequence(durationMs: number): EvolutionSequence {
  return () =>
    new Promise<void>((resolve) => {
      window.setTimeout(resolve, durationMs);
    });
}
