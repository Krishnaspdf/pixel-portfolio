import { useContext } from "react";
import {
  OverlayContext,
  type OverlayContextValue,
} from "../overlays/OverlayContext";

/**
 * Strongly typed access to overlay lifecycle state.
 * Throws when used outside <OverlayManager> so a missing provider fails
 * loudly during development.
 */
export function useOverlay(): OverlayContextValue {
  const context = useContext(OverlayContext);
  if (context === null) {
    throw new Error("useOverlay() must be used inside <OverlayManager>.");
  }
  return context;
}
