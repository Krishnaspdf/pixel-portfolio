/*
 * ThemeManager (M3.1) — decides which world should load (ARCHITECTURE.md).
 *
 * Responsibilities:
 * ✔ Determine theme from time of day (new Date().getHours())
 * ✔ Expose the active ThemeConfig through React Context
 * ✔ Activate the matching CSS variable map via data-theme on the root
 *
 * Never: manage scenes, manage overlays, trigger events.
 */

import { useEffect, useMemo, type ReactNode } from "react";
import { THEMES, type ThemeConfig } from "../config/themeConfig";
import { ThemeContext } from "./ThemeContext";
import { resolveActiveTheme } from "./themeSelector";

interface ThemeManagerProps {
  readonly children: ReactNode;
}

export default function ThemeManager({ children }: ThemeManagerProps) {
  // WHY empty deps: the theme is decided exactly once per visit —
  // README.md: "Only one theme is active during each visit."
  const theme: ThemeConfig = useMemo(
    () => THEMES[resolveActiveTheme(new Date().getHours())],
    [],
  );

  useEffect(() => {
    // data-theme activates the palette in src/styles/themes/*.css —
    // colors live in CSS/config only, never in components.
    document.documentElement.dataset.theme = theme.id;
    return () => {
      delete document.documentElement.dataset.theme;
    };
  }, [theme]);

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}
