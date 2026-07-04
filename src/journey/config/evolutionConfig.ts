/*
 * Evolution tuning — consumed by EvolutionManager (M3.4).
 * DESIGN.md: the evolution sequence should feel rewarding and last 2–3s.
 * The real GSAP timeline (AnimationManager, M3.5) replaces the placeholder
 * timer but reads the same duration from here.
 */

/** Total placeholder duration of the evolution sequence, in milliseconds. */
export const EVOLUTION_SEQUENCE_MS = 2500;
