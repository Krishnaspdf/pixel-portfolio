/*
 * Canonical scene progress ranges (ARCHITECTURE.md scene layout).
 * Scenes are the only progress *ranges* in the engine — gameplay events use
 * fixed checkpoints (see eventConfig.ts). SceneManager (M4) activates the
 * scene whose range contains the current normalized progress.
 */

export type SceneId = "scene1" | "scene2" | "scene3" | "ending";

/**
 * Layer stack per DESIGN.md scene composition.
 * Never one giant background image — each layer animates independently.
 */
export type SceneLayerId =
  | "sky"
  | "clouds"
  | "moon"
  | "mountains"
  | "trees"
  | "ground"
  | "foreground"
  | "fog"
  | "particles";

export interface SceneConfig {
  readonly id: SceneId;
  /** Inclusive normalized progress where the scene begins. */
  readonly start: number;
  /** Normalized progress where the scene ends (exclusive, inclusive for "ending"). */
  readonly end: number;
}

/** Scene 1: 0–33% · Scene 2: 33–66% · Scene 3: 66–95% · Ending: 95–100%. */
export const SCENES: readonly SceneConfig[] = [
  { id: "scene1", start: 0, end: 0.33 },
  { id: "scene2", start: 0.33, end: 0.66 },
  { id: "scene3", start: 0.66, end: 0.95 },
  { id: "ending", start: 0.95, end: 1 },
];

/**
 * Parallax speed multipliers per DESIGN.md.
 * Fog and particles are ambient layers: they animate independently of camera
 * movement (M8), so their multiplier is 0 and CameraManager ignores them.
 */
export const PARALLAX_SPEEDS: Readonly<Record<SceneLayerId, number>> = {
  sky: 0.15,
  clouds: 0.2,
  moon: 0.25,
  mountains: 0.35,
  trees: 0.6,
  ground: 1.0,
  foreground: 1.2,
  fog: 0,
  particles: 0,
};
