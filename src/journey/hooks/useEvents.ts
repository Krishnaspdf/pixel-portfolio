import { useContext } from "react";
import {
  EventsContext,
  type EventsContextValue,
} from "../events/EventsContext";

/**
 * Strongly typed access to the journey event system.
 * Throws when used outside <EventManager> so a missing provider fails
 * loudly during development.
 */
export function useEvents(): EventsContextValue {
  const context = useContext(EventsContext);
  if (context === null) {
    throw new Error("useEvents() must be used inside <EventManager>.");
  }
  return context;
}
