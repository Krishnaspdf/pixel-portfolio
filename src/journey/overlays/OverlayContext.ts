import { createContext } from "react";
import type { EventConfig } from "../config/eventConfig";

export type OverlayEvent = EventConfig & { readonly type: "overlay" };

export interface OverlayState {
  readonly event: OverlayEvent;
  readonly openedAt: number;
}

/**
 * Overlay lifecycle state, provided by OverlayManager (M3.7).
 * OverlayManager owns open/close orchestration and pause behavior only; M6
 * owns the actual portfolio panel content.
 */
export interface OverlayContextValue {
  readonly activeOverlay: OverlayState | null;
  readonly isOverlayOpen: boolean;
  readonly openOverlay: (event: OverlayEvent) => void;
  readonly closeOverlay: () => void;
}

/** WHY null default: useOverlay() throws outside <OverlayManager>. */
export const OverlayContext = createContext<OverlayContextValue | null>(null);
