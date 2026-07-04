/*
 * Pure helpers for the event system (M3.3).
 * React-free and unit-testable. All checkpoint data comes from
 * eventConfig.ts — no trigger value is ever hardcoded here.
 */

import {
  EVENTS,
  type EventConfig,
  type EventId,
  type Progress,
} from "../config/eventConfig";

/**
 * Events ordered by trigger. WHY: a single fast scroll can skip several
 * checkpoints in one progress update — firing must still happen in journey
 * order (about before techStack, etc.).
 */
export const SORTED_EVENTS: readonly EventConfig[] = [...EVENTS].sort(
  (a, b) => a.trigger - b.trigger,
);

/**
 * Unfired events crossed while moving FORWARD from `previous` to `current`.
 * Reverse movement (current <= previous) never fires anything.
 */
export function findCrossedEvents(
  previous: Progress,
  current: Progress,
  hasFired: (id: EventId) => boolean,
): readonly EventConfig[] {
  if (current <= previous) {
    return [];
  }
  return SORTED_EVENTS.filter(
    (event) =>
      !hasFired(event.id) && previous < event.trigger && current >= event.trigger,
  );
}

/** The next unfired event at or ahead of `current` — null when none remain. */
export function findNextEvent(
  current: Progress,
  hasFired: (id: EventId) => boolean,
): EventConfig | null {
  return (
    SORTED_EVENTS.find(
      (event) => !hasFired(event.id) && event.trigger >= current,
    ) ?? null
  );
}
