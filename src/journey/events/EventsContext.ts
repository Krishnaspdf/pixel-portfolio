import { createContext } from "react";
import type { EventConfig, EventId } from "../config/eventConfig";

/** Notification callback — invoked exactly once per fired event. */
export type JourneyEventListener = (event: EventConfig) => void;

/**
 * Event state and publication API, provided by EventManager.
 * EventManager is intentionally generic: it publishes notifications only.
 * Overlay, evolution, and ending handlers subscribe in M3.4/M3.7.
 */
export interface EventsContextValue {
  /** Event ids in the order they fired. History survives reverse scrolling. */
  readonly firedEvents: readonly EventId[];
  readonly hasFired: (id: EventId) => boolean;
  /** Clears fired history — reserved for Restart Journey (M6). */
  readonly resetEvents: () => void;
  /**
   * Publication channel: subscribers receive each event at fire time.
   * Returns an unsubscribe function. Consumed by EvolutionManager (M3.4)
   * and OverlayManager (M3.7).
   */
  readonly subscribe: (listener: JourneyEventListener) => () => void;
}

/** WHY null default: useEvents() throws outside <EventManager>. */
export const EventsContext = createContext<EventsContextValue | null>(null);
