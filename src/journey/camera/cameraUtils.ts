/*
 * Pure helpers for the camera system (M3.6).
 * React-free and unit-testable, mirroring eventUtils/evolutionUtils.
 */

import {
  CAMERA_BREAKPOINTS,
  FALLBACK_CREATURE_ANCHOR,
  WORLD_TRAVEL_LENGTH_VW,
} from "../config/cameraConfig";

/**
 * Camera distance traveled through the world for a normalized progress
 * value, in vw units. Linear by design: ScrollTrigger's scrub is already
 * continuous, and pacing belongs to the scroll runway (progressConfig.ts).
 */
export function computeCameraTravelVw(progress: number): number {
  return progress * WORLD_TRAVEL_LENGTH_VW;
}

/**
 * Resolves the responsive creature anchor for a viewport width.
 * Breakpoints are ordered mobile-first; the widest matching entry wins.
 */
export function resolveCreatureAnchor(viewportWidthPx: number): number {
  let anchor = FALLBACK_CREATURE_ANCHOR;
  for (const breakpoint of CAMERA_BREAKPOINTS) {
    if (viewportWidthPx >= breakpoint.minWidthPx) {
      anchor = breakpoint.creatureAnchor;
    }
  }
  return anchor;
}
