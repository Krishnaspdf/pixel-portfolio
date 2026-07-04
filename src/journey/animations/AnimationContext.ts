import { createContext } from "react";
import type { AnimationKind } from "../config/animationConfig";
import type { EvolutionStage } from "../config/spriteConfig";
import type { EvolutionSequence } from "../evolution/evolutionSequence";

/**
 * Extension point for the Creature system (M5): attach glow/particle/flash/
 * scale tweens at the phase labels of a prepared evolution timeline
 * (labels come from EVOLUTION_PHASES in animationConfig.ts).
 * AnimationManager stays untouched when the visuals arrive.
 */
export type EvolutionEffectsBuilder = (
  timeline: gsap.core.Timeline,
  targetStage: EvolutionStage,
) => void;

/**
 * Animation services, provided by AnimationManager (M3.5).
 * Visual effects only — no application state lives here (ARCHITECTURE.md
 * split: EventManager → EvolutionManager → AnimationManager).
 */
export interface AnimationContextValue {
  /** Accessibility flag stub — the full reduced-motion matrix lands in M10. */
  readonly prefersReducedMotion: boolean;
  /**
   * Centralized GSAP timeline factory. Every system (evolution, overlays
   * M3.7, camera M3.6, scene transitions M4) builds timelines through this
   * so family defaults are configured once and never duplicated.
   */
  readonly createTimeline: (
    kind: AnimationKind,
    vars?: gsap.TimelineVars,
  ) => gsap.core.Timeline;
  /**
   * Fills the M3.4 EvolutionSequence seam with a real GSAP timeline.
   * Resolves when the sequence completes; EvolutionManager then swaps the
   * stage and resumes progress.
   */
  readonly createEvolutionSequence: (
    attachEffects?: EvolutionEffectsBuilder,
  ) => EvolutionSequence;
}

/** WHY null default: useAnimation() throws outside <AnimationManager>. */
export const AnimationContext = createContext<AnimationContextValue | null>(null);
