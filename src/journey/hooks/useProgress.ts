import { useContext } from "react";
import {
  ProgressContext,
  type ProgressContextValue,
} from "../progress/ProgressContext";

/**
 * Strongly typed access to journey progress — the only sanctioned way to
 * read progress (ARCHITECTURE.md: single source of truth).
 * Throws when used outside <ProgressManager> so a missing provider fails
 * loudly during development.
 */
export function useProgress(): ProgressContextValue {
  const context = useContext(ProgressContext);
  if (context === null) {
    throw new Error("useProgress() must be used inside <ProgressManager>.");
  }
  return context;
}
