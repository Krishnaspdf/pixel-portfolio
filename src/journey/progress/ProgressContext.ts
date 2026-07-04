import { createContext } from "react";

/**
 * Journey progress state, provided by ProgressManager — the single source
 * of truth (ARCHITECTURE.md). No other component may calculate progress or
 * react to browser scroll directly.
 */
export interface ProgressContextValue {
  /** Normalized journey progress: 0.0 (start) → 1.0 (ending). */
  readonly progress: number;
  readonly isPaused: boolean;
  /** Freezes progress entirely — used by overlays (M3.7) and evolutions (M3.4). */
  readonly pause: () => void;
  /** Resumes from the exact position where pause() was called. */
  readonly resume: () => void;
}

/**
 * WHY null default: consuming progress outside <ProgressManager> is a
 * programming error — useProgress() throws instead of returning stale zeros.
 */
export const ProgressContext = createContext<ProgressContextValue | null>(null);
