/*
 * Theme configuration — the single source ThemeManager (M3) reads to load a
 * world (README.md Dynamic Theme System). Active hours, scene dressing, layer
 * asset paths, and the creature line all live here. Components never
 * reference these values directly.
 */

import type { SceneId, SceneLayerId } from "./sceneConfig";
import { SPRITES, type SpriteConfig } from "./spriteConfig";

export type ThemeName = "morning" | "evening" | "night";

/**
 * Active window compared against Date#getHours() by ThemeManager (M3).
 * A theme is active while startHour <= hour < endHour.
 * Night wraps midnight, so its startHour is greater than its endHour.
 */
export interface ThemeHours {
  readonly startHour: number;
  readonly endHour: number;
}

/**
 * World dressing for one scene: in-world name plus one asset per layer.
 * Particles are procedural (M8) and therefore have no asset entry.
 */
export interface ThemeSceneConfig {
  readonly name: string;
  readonly layers: Readonly<Partial<Record<SceneLayerId, string>>>;
}

export interface ThemeConfig {
  readonly id: ThemeName;
  /** HUD label. */
  readonly label: string;
  readonly hours: ThemeHours;
  /** True while the theme ships placeholder art only (ROADMAP.md M9). */
  readonly placeholder: boolean;
  readonly scenes: Readonly<Record<SceneId, ThemeSceneConfig>>;
  readonly sprites: SpriteConfig;
}

/** Builds the standard 8-layer path set for one scene directory. */
function buildSceneLayers(
  theme: ThemeName,
  sceneSlug: string,
): Readonly<Partial<Record<SceneLayerId, string>>> {
  const dir = `backgrounds/${theme}/${sceneSlug}`;
  return {
    sky: `${dir}/sky.png`,
    clouds: `${dir}/clouds.png`,
    moon: `${dir}/moon.png`, // sun art for morning/evening — see docs/ASSET_MANIFEST.md
    mountains: `${dir}/mountains.png`,
    trees: `${dir}/trees.png`,
    ground: `${dir}/ground.png`,
    foreground: `${dir}/foreground.png`,
    fog: `${dir}/fog.png`,
  };
}

/* ---------- Night (fully specified — current vertical slice) ---------- */

export const NIGHT_THEME: ThemeConfig = {
  id: "night",
  label: "🌙 Night",
  hours: { startHour: 19, endHour: 5 }, // 07:01 PM → 05:00 AM (wraps midnight)
  placeholder: false,
  scenes: {
    scene1: { name: "Whispering Woods", layers: buildSceneLayers("night", "whispering-woods") },
    scene2: { name: "Forgotten Cemetery", layers: buildSceneLayers("night", "forgotten-cemetery") },
    scene3: { name: "Moonlit Shrine", layers: buildSceneLayers("night", "moonlit-shrine") },
    ending: { name: "Ending Temple", layers: buildSceneLayers("night", "ending-temple") },
  },
  sprites: SPRITES.night,
};

/* ---------- Morning / Evening (PLACEHOLDER — ROADMAP.md M9) ---------- */

function buildPlaceholderScenes(theme: ThemeName): Readonly<Record<SceneId, ThemeSceneConfig>> {
  return {
    scene1: { name: "Scene 1 (placeholder)", layers: buildSceneLayers(theme, "scene1") },
    scene2: { name: "Scene 2 (placeholder)", layers: buildSceneLayers(theme, "scene2") },
    scene3: { name: "Scene 3 (placeholder)", layers: buildSceneLayers(theme, "scene3") },
    ending: { name: "Ending (placeholder)", layers: buildSceneLayers(theme, "ending") },
  };
}

export const MORNING_THEME: ThemeConfig = {
  id: "morning",
  label: "🌄 Morning",
  hours: { startHour: 5, endHour: 12 }, // 05:01 AM → 12:00 PM
  placeholder: true,
  scenes: buildPlaceholderScenes("morning"),
  sprites: SPRITES.morning,
};

export const EVENING_THEME: ThemeConfig = {
  id: "evening",
  label: "🌇 Evening",
  hours: { startHour: 12, endHour: 19 }, // 12:01 PM → 07:00 PM
  placeholder: true,
  scenes: buildPlaceholderScenes("evening"),
  sprites: SPRITES.evening,
};

/** All worlds keyed by theme — ThemeManager (M3) selects exactly one per visit. */
export const THEMES: Readonly<Record<ThemeName, ThemeConfig>> = {
  morning: MORNING_THEME,
  evening: EVENING_THEME,
  night: NIGHT_THEME,
};
