import { useContext } from "react";
import {
  AnimationContext,
  type AnimationContextValue,
} from "../animations/AnimationContext";

/**
 * Strongly typed access to the centralized GSAP animation services —
 * consumed by the evolution seam wiring (App.tsx), overlays (M3.7), camera
 * (M3.6), and scene transitions (M4).
 * Throws when used outside <AnimationManager> so a missing provider fails
 * loudly during development.
 */
export function useAnimation(): AnimationContextValue {
  const context = useContext(AnimationContext);
  if (context === null) {
    throw new Error("useAnimation() must be used inside <AnimationManager>.");
  }
  return context;
}
