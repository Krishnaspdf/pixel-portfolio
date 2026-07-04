import { createContext } from "react";
import type { ThemeConfig } from "../config/themeConfig";

/**
 * Active world configuration, provided by ThemeManager.
 *
 * WHY null default: consuming the context outside <ThemeManager> is a
 * programming error — useTheme() throws instead of silently rendering
 * with a wrong or missing theme.
 */
export const ThemeContext = createContext<ThemeConfig | null>(null);
