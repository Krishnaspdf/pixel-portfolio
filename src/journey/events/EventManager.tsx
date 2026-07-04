/*
 * EventManager (M3.3) — the heart of the application (ARCHITECTURE.md).
 * Registers checkpoints from eventConfig.ts and fires each EXACTLY ONCE when
 * normalized progress crosses its trigger while moving forward.
 *
 * Reverse-scroll policy (canonical, documented decision):
 * ✔ Scrolling backwards never fires events.
 * ✔ Events that already fired stay fired — re-crossing forward does not
 *   re-trigger them (no duplicates).
 * ✔ History is preserved until resetEvents() (Restart Journey, M6).
 *
 * Generic by design: this manager knows nothing about overlays, evolution,
 * camera, scenes, HUD, or animations. It only publishes notifications —
 * handlers subscribe via context in M3.4 (EvolutionManager) and M3.7
 * (OverlayManager).
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { EventId } from "../config/eventConfig";
import { useProgress } from "../hooks/useProgress";
import {
  EventsContext,
  type EventsContextValue,
  type JourneyEventListener,
} from "./EventsContext";
import { findCrossedEvents } from "./eventUtils";

interface EventManagerProps {
  readonly children: ReactNode;
}

export default function EventManager({ children }: EventManagerProps) {
  const { progress } = useProgress();

  const [firedEvents, setFiredEvents] = useState<readonly EventId[]>([]);

  // WHY refs: crossing detection must read/write synchronously across rapid
  // progress updates — state alone would race under fast scrolling.
  const firedSetRef = useRef(new Set<EventId>());
  const previousProgressRef = useRef(0);
  const listenersRef = useRef(new Set<JourneyEventListener>());

  useEffect(() => {
    const previous = previousProgressRef.current;
    previousProgressRef.current = progress;

    const crossed = findCrossedEvents(previous, progress, (id) =>
      firedSetRef.current.has(id),
    );
    if (crossed.length === 0) {
      return;
    }

    crossed.forEach((event) => firedSetRef.current.add(event.id));
    setFiredEvents((history) => [...history, ...crossed.map((e) => e.id)]);

    // Publish in trigger order — even one fast scroll that skips several
    // checkpoints notifies subscribers exactly once per event.
    crossed.forEach((event) => {
      listenersRef.current.forEach((listener) => listener(event));
    });
  }, [progress]);

  const hasFired = useCallback(
    (id: EventId) => firedSetRef.current.has(id),
    [],
  );

  const resetEvents = useCallback(() => {
    // WHY no progress rewind here: previousProgressRef already tracks the
    // current position, so clearing history can never mass-fire checkpoints
    // behind the player. Restart Journey (M6) additionally rewinds progress
    // to 0 through ProgressManager.
    firedSetRef.current.clear();
    setFiredEvents([]);
  }, []);

  const subscribe = useCallback((listener: JourneyEventListener) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  const value: EventsContextValue = useMemo(
    () => ({ firedEvents, hasFired, resetEvents, subscribe }),
    [firedEvents, hasFired, resetEvents, subscribe],
  );

  return (
    <EventsContext.Provider value={value}>{children}</EventsContext.Provider>
  );
}
