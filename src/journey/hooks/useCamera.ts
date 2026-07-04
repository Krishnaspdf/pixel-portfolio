import { useContext } from "react";
import {
  CameraContext,
  type CameraContextValue,
} from "../camera/CameraContext";

/**
 * Strongly typed access to camera state — consumed by SceneManager (M4,
 * parallax offsets), the Creature system (M5, anchor position), and the
 * ending cinematic (M6, mode switch).
 * Throws when used outside <CameraManager> so a missing provider fails
 * loudly during development.
 */
export function useCamera(): CameraContextValue {
  const context = useContext(CameraContext);
  if (context === null) {
    throw new Error("useCamera() must be used inside <CameraManager>.");
  }
  return context;
}
