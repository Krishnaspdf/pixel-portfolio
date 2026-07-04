import { createContext } from "react";
import type { EventId } from "../config/eventConfig";
import type { EvolutionStage } from "../config/spriteConfig";

/**
 * Evolution state, provided by EvolutionManager (M3.4).
 * State + orchestration only — sprites render in M5, effects in M3.5.
 */
export interface EvolutionContextValue {
  /** Current creature stage: 1 → 2 → 3 (names come from the theme's SpriteConfig). */
  readonly currentStage: EvolutionStage;
  /** True while the evolution sequence runs (progress is paused meanwhile). */
  readonly isEvolving: boolean;
  /**
   * Orchestrates a full evolution: pause progress → run visual sequence →
   * swap stage → resume. Ignored when already evolving or when `stage` has
   * already been reached (duplicate events are safe).
   */
  readonly evolveTo: (stage: EvolutionStage) => void;
  /** Restart Journey support (M6): back to stage 1, not evolving. */
  readonly resetEvolution: () => void;
  /** Last evolution event received from EventManager — debug/HUD use. */
  readonly lastEvolutionEvent: EventId | null;
}

/** WHY null default: useEvolution() throws outside <EvolutionManager>. */
export const EvolutionContext = createContext<EvolutionContextValue | null>(null);
