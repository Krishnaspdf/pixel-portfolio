/*
 * CameraManager (M3.6) — creates the sensation of travel (ARCHITECTURE.md).
 * The creature stays anchored (~25% from the left on desktop); the WORLD
 * moves. Consumes normalized progress only — never browser scroll.
 *
 * ✔ World offset derived from progress (vw units — resolution independent)
 * ✔ Responsive creature anchor from cameraConfig breakpoints
 * ✔ Parallax multiplier interface for SceneManager (M4)
 * ✔ Explicit mode enum with ending stub (cinematic implemented in M6)
 *
 * Never: manage overlays, trigger evolution, own gameplay state.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  REDUCED_MOTION_PARALLAX_MULTIPLIER,
  type CameraMode,
} from "../config/cameraConfig";
import { useAnimation } from "../hooks/useAnimation";
import { useProgress } from "../hooks/useProgress";
import { CameraContext, type CameraContextValue } from "./CameraContext";
import { computeCameraTravelVw, resolveCreatureAnchor } from "./cameraUtils";

interface CameraManagerProps {
  readonly children: ReactNode;
}

export default function CameraManager({ children }: CameraManagerProps) {
  const { progress } = useProgress();
  const { prefersReducedMotion } = useAnimation();

  const [mode, setModeState] = useState<CameraMode>("follow");
  const [creatureAnchor, setCreatureAnchor] = useState(() =>
    resolveCreatureAnchor(window.innerWidth),
  );

  useEffect(() => {
    const handleResize = () => {
      setCreatureAnchor(resolveCreatureAnchor(window.innerWidth));
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // WHY direct derivation, no smoothing pass: ScrollTrigger's scrub already
  // produces continuous progress — a second lerp would double-smooth the
  // camera. And because progress freezes while paused (M3.2), the camera
  // freezes with it: overlays (M3.7) and evolutions (M3.4) need zero
  // camera-specific pause code.
  const cameraTravelVw = computeCameraTravelVw(progress);

  const getParallaxOffsetVw = useCallback(
    (multiplier: number) => {
      // Reduced-motion stub: depth (differential) motion collapses to one
      // plane; the journey still advances. Ambient layers (multiplier 0)
      // stay camera-independent. Full disable matrix lands in M10.
      const effectiveMultiplier =
        prefersReducedMotion && multiplier !== 0
          ? REDUCED_MOTION_PARALLAX_MULTIPLIER
          : multiplier;
      // Negative: the world translates left as the creature travels right.
      return -cameraTravelVw * effectiveMultiplier;
    },
    [cameraTravelVw, prefersReducedMotion],
  );

  const setMode = useCallback((next: CameraMode) => {
    // Ending cinematic (center creature + zoom out) is implemented in M6;
    // until then the mode flag simply switches. The explicit enum prevents
    // cinematic behavior from ever leaking into normal gameplay.
    setModeState(next);
  }, []);

  const value: CameraContextValue = useMemo(
    () => ({
      mode,
      cameraTravelVw,
      creatureAnchor,
      getParallaxOffsetVw,
      setMode,
    }),
    [mode, cameraTravelVw, creatureAnchor, getParallaxOffsetVw, setMode],
  );

  return (
    <CameraContext.Provider value={value}>{children}</CameraContext.Provider>
  );
}
