/*
 * Pure theme-selection logic for ThemeManager (M3.1).
 * All hour boundaries come from themeConfig.ts — nothing is hardcoded here.
 * Kept free of React so it is trivially unit-testable.
 */

import { THEMES, type ThemeHours, type ThemeName } from "../config/themeConfig";

/** A theme is active while startHour <= hour < endHour; night wraps midnight. */
function isHourInRange(hour: number, hours: ThemeHours): boolean {
  const { startHour, endHour } = hours;
  return startHour < endHour
    ? hour >= startHour && hour < endHour
    : hour >= startHour || hour < endHour;
}

/** Maps a Date#getHours() value (0–23) to the theme active at that time. */
export function resolveThemeName(hour: number): ThemeName {
  const match = Object.values(THEMES).find((theme) => isHourInRange(hour, theme.hours));
  // WHY a fallback: the three configured windows cover all 24 hours, so a
  // match always exists today — this only guards future config edits.
  return match?.id ?? "night";
}

function isThemeName(value: string): value is ThemeName {
  return value in THEMES;
}

/**
 * Dev-only override for QA: ?theme=morning|evening|night.
 * WHY import.meta.env.DEV: it is statically false in production builds, so
 * this code path is tree-shaken away and never affects real visitors.
 */
export function getDevThemeOverride(): ThemeName | null {
  if (!import.meta.env.DEV) {
    return null;
  }
  const requested = new URLSearchParams(window.location.search).get("theme");
  return requested !== null && isThemeName(requested) ? requested : null;
}

/** Final selection: dev override (dev builds only), else time of day. */
export function resolveActiveTheme(hour: number): ThemeName {
  return getDevThemeOverride() ?? resolveThemeName(hour);
}
