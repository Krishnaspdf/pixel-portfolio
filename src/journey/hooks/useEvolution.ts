import { useContext } from "react";
import {
  EvolutionContext,
  type EvolutionContextValue,
} from "../evolution/EvolutionContext";

/**
 * Strongly typed access to creature evolution state — consumed by the
 * Creature system (M5) and debug/HUD UI.
 * Throws when used outside <EvolutionManager> so a missing provider fails
 * loudly during development.
 */
export function useEvolution(): EvolutionContextValue {
  const context = useContext(EvolutionContext);
  if (context === null) {
    throw new Error("useEvolution() must be used inside <EvolutionManager>.");
  }
  return context;
}
