/*
 * Pure helpers for the evolution system (M3.4).
 * React-free and unit-testable. Evolution checkpoints are DERIVED from
 * eventConfig.ts by type — no event id or percentage is hardcoded here.
 */

import type { EventConfig, EventId } from "../config/eventConfig";
import type {
  EvolutionStage,
  SpriteConfig,
  SpriteStageConfig,
} from "../config/spriteConfig";
import { SORTED_EVENTS } from "../events/eventUtils";

/** The creature spawns at stage 1 (Wispet on the Night line). */
export const INITIAL_STAGE: EvolutionStage = 1;

/** Evolution checkpoints in journey order — filtered from config by type. */
export const EVOLUTION_EVENTS: readonly EventConfig[] = SORTED_EVENTS.filter(
  (event) => event.type === "evolution",
);

function isEvolutionStage(value: number): value is EvolutionStage {
  return value === 1 || value === 2 || value === 3;
}

/**
 * The Nth evolution event advances the creature to stage N+1
 * (stage 1 is the spawn form). Returns null for non-evolution events or if
 * config ever defines more evolutions than stages.
 */
export function getEvolutionTargetStage(eventId: EventId): EvolutionStage | null {
  const index = EVOLUTION_EVENTS.findIndex((event) => event.id === eventId);
  if (index === -1) {
    return null;
  }
  const target = INITIAL_STAGE + index + 1;
  return isEvolutionStage(target) ? target : null;
}

/**
 * Resolves the stage entry of a creature line. Consumers (Creature system
 * M5, debug panel) read names and sheets from the active theme's config —
 * never hardcoded.
 */
export function getStageConfig(
  sprites: SpriteConfig,
  stage: EvolutionStage,
): SpriteStageConfig {
  switch (stage) {
    case 1:
      return sprites.stage1;
    case 2:
      return sprites.stage2;
    case 3:
      return sprites.stage3;
  }
}
