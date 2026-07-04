import { useContext } from "react";
import type { ThemeConfig } from "../config/themeConfig";
import { ThemeContext } from "../themes/ThemeContext";

/**
 * Strongly typed access to the active world configuration.
 * Throws when used outside <ThemeManager> so a missing provider fails
 * loudly during development instead of rendering a broken world.
 */
export function useTheme(): ThemeConfig {
  const theme = useContext(ThemeContext);
  if (theme === null) {
    throw new Error("useTheme() must be used inside <ThemeManager>.");
  }
  return theme;
}
