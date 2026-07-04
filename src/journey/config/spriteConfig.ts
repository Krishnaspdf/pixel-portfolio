/*
 * Sprite configuration — the ONLY place sprite sheet paths and frame data
 * live (ARCHITECTURE.md Sprite System). Adding or replacing a creature must
 * only require editing this file. Components (M5) receive sprite data through
 * the active ThemeConfig and never reference paths directly.
 *
 * Sheets are horizontal strips of fixed-size frames.
 * Full dimension and naming contract: docs/ASSET_MANIFEST.md
 */

import type { ThemeName } from "./themeConfig";

export type EvolutionStage = 1 | 2 | 3;

/**
 * Animation set per README.md creature system.
 * The "final idle" state reuses the stage-3 idle sheet after evolution2.
 */
export type SpriteAnimationId = "idle" | "walk" | "evolution";

export interface SpriteAnimationConfig {
  /** Path relative to `src/assets/` — resolved by the asset loader (M4/M5). */
  readonly sheetPath: string;
  readonly frameCount: number;
  /** Source pixel size of one frame — nearest-neighbor scaled, never blurred. */
  readonly frameWidth: number;
  readonly frameHeight: number;
  /** Playback rate for steps() sprite animation. */
  readonly fps: number;
  readonly loop: boolean;
}

export interface SpriteStageConfig {
  /** Display name shown in HUD and ending stats. */
  readonly name: string;
  readonly stage: EvolutionStage;
  readonly animations: Readonly<Record<SpriteAnimationId, SpriteAnimationConfig>>;
}

/** One creature line: three evolution stages (ARCHITECTURE.md). */
export interface SpriteConfig {
  readonly stage1: SpriteStageConfig;
  readonly stage2: SpriteStageConfig;
  readonly stage3: SpriteStageConfig;
}

/*
 * Shared frame contract (docs/ASSET_MANIFEST.md).
 * Named constants so an art revision changes one value, not every entry.
 */
const FRAME_SIZE_PX = 64;
const IDLE_FRAME_COUNT = 4;
const WALK_FRAME_COUNT = 6;
const EVOLUTION_FRAME_COUNT = 8;
const IDLE_FPS = 4;
const WALK_FPS = 8;
const EVOLUTION_FPS = 6;

/** Builds the standard idle/walk/evolution set for one creature sheet family. */
function buildAnimations(
  theme: ThemeName,
  creatureSlug: string,
): Readonly<Record<SpriteAnimationId, SpriteAnimationConfig>> {
  const dir = `sprites/${theme}`;
  const frame = { frameWidth: FRAME_SIZE_PX, frameHeight: FRAME_SIZE_PX };
  return {
    idle: {
      sheetPath: `${dir}/${creatureSlug}-idle.png`,
      frameCount: IDLE_FRAME_COUNT,
      fps: IDLE_FPS,
      loop: true,
      ...frame,
    },
    walk: {
      sheetPath: `${dir}/${creatureSlug}-walk.png`,
      frameCount: WALK_FRAME_COUNT,
      fps: WALK_FPS,
      loop: true,
      ...frame,
    },
    // Evolution plays once; EvolutionManager (M3) swaps the stage afterwards.
    evolution: {
      sheetPath: `${dir}/${creatureSlug}-evolution.png`,
      frameCount: EVOLUTION_FRAME_COUNT,
      fps: EVOLUTION_FPS,
      loop: false,
      ...frame,
    },
  };
}

/* ---------- Night line (fully specified — current vertical slice) ---------- */

export const NIGHT_SPRITES: SpriteConfig = {
  stage1: { name: "Wispet", stage: 1, animations: buildAnimations("night", "wispet") },
  stage2: { name: "Lumorph", stage: 2, animations: buildAnimations("night", "lumorph") },
  stage3: { name: "Nebulorem", stage: 3, animations: buildAnimations("night", "nebulorem") },
};

/* ---------- Morning / Evening lines (PLACEHOLDER — ROADMAP.md M9) ---------- */

function buildPlaceholderStage(theme: ThemeName, stage: EvolutionStage): SpriteStageConfig {
  return {
    name: `Placeholder (stage ${stage})`,
    stage,
    animations: buildAnimations(theme, `placeholder-stage${stage}`),
  };
}

export const MORNING_SPRITES: SpriteConfig = {
  stage1: buildPlaceholderStage("morning", 1),
  stage2: buildPlaceholderStage("morning", 2),
  stage3: buildPlaceholderStage("morning", 3),
};

export const EVENING_SPRITES: SpriteConfig = {
  stage1: buildPlaceholderStage("evening", 1),
  stage2: buildPlaceholderStage("evening", 2),
  stage3: buildPlaceholderStage("evening", 3),
};

/** All creature lines keyed by theme — consumed by themeConfig.ts. */
export const SPRITES: Readonly<Record<ThemeName, SpriteConfig>> = {
  morning: MORNING_SPRITES,
  evening: EVENING_SPRITES,
  night: NIGHT_SPRITES,
};
