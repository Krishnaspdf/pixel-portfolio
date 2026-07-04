import { createContext } from "react";
import type { CameraMode } from "../config/cameraConfig";

/**
 * Camera state, provided by CameraManager (M3.6).
 * The world moves; the creature appears to travel (ARCHITECTURE.md).
 */
export interface CameraContextValue {
  /**
   * Explicit mode — "follow" during gameplay; "ending" is a stub until the
   * M6 cinematic (center creature + zoom out). The enum exists now so
   * ending mode can never leak into normal gameplay (ROADMAP.md risk
   * register).
   */
  readonly mode: CameraMode;
  /** Camera distance traveled through the world, in vw units (0 at start). */
  readonly cameraTravelVw: number;
  /**
   * Creature anchor as a fraction of viewport width from the left —
   * responsive (~25% desktop per DESIGN.md). Consumed by the Creature
   * system (M5); the ending cinematic overrides it in M6.
   */
  readonly creatureAnchor: number;
  /**
   * Parallax multiplier interface (used by SceneManager, M4): returns the
   * translateX in vw for a layer moving at `multiplier` × camera speed.
   * Speeds live in sceneConfig.ts — CameraManager knows nothing about
   * scene layers. Under reduced motion, depth motion collapses to a single
   * plane (stub — full matrix in M10).
   */
  readonly getParallaxOffsetVw: (multiplier: number) => number;
  /** Mode switch — the M6 ending sequence enters/exits cinematic mode here. */
  readonly setMode: (mode: CameraMode) => void;
}

/** WHY null default: useCamera() throws outside <CameraManager>. */
export const CameraContext = createContext<CameraContextValue | null>(null);
