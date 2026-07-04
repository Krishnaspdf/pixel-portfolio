/*
 * AnimationManager (M3.5) — centralized GSAP timeline factory
 * (ARCHITECTURE.md Animation System).
 *
 * ✔ Owns the timeline defaults for evolution, overlay, camera, transitions
 * ✔ Fills the M3.4 EvolutionSequence seam with a phase-labeled GSAP timeline
 * ✔ Tracks the prefers-reduced-motion accessibility flag (stub — the full
 *   disable matrix is an M10 task)
 *
 * Never: own application state (stages, progress, overlays), render
 * anything, subscribe to events — state belongs to the other managers.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import gsap from "gsap";
import {
  REDUCED_MOTION_EVOLUTION_MS,
  TIMELINE_DEFAULTS,
} from "../config/animationConfig";
import { EVOLUTION_SEQUENCE_MS } from "../config/evolutionConfig";
import {
  AnimationContext,
  type AnimationContextValue,
} from "./AnimationContext";
import {
  buildEvolutionTimeline,
  readReducedMotionPreference,
  REDUCED_MOTION_QUERY,
} from "./animationUtils";

interface AnimationManagerProps {
  readonly children: ReactNode;
}

export default function AnimationManager({ children }: AnimationManagerProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    readReducedMotionPreference,
  );
  // WHY a ref: sequences are created once at mount but must read the CURRENT
  // flag when they actually run, not the value captured at creation time.
  const reducedMotionRef = useRef(prefersReducedMotion);

  useEffect(() => {
    if (typeof window.matchMedia !== "function") {
      return;
    }
    const query = window.matchMedia(REDUCED_MOTION_QUERY);
    const handleChange = (event: MediaQueryListEvent) => {
      reducedMotionRef.current = event.matches;
      setPrefersReducedMotion(event.matches);
    };
    query.addEventListener("change", handleChange);
    return () => {
      query.removeEventListener("change", handleChange);
    };
  }, []);

  const createTimeline = useCallback<AnimationContextValue["createTimeline"]>(
    (kind, vars) => {
      const defaults = TIMELINE_DEFAULTS[kind];
      // Family defaults are inherited by child tweens; callers may override
      // per-timeline via vars but never redefine family tuning locally.
      return gsap.timeline({
        defaults: { ease: defaults.ease, duration: defaults.durationSeconds },
        ...vars,
      });
    },
    [],
  );

  const createEvolutionSequence = useCallback<
    AnimationContextValue["createEvolutionSequence"]
  >(
    (attachEffects) => (targetStage) =>
      new Promise<void>((resolve) => {
        // Reduced-motion stub: the identical orchestration runs, but
        // near-instantly — no flash lingers for sensitive users.
        const totalMs = reducedMotionRef.current
          ? REDUCED_MOTION_EVOLUTION_MS
          : EVOLUTION_SEQUENCE_MS;
        const timeline = buildEvolutionTimeline(totalMs);
        // M5 attaches glow/particles/flash/scale at the phase labels here.
        attachEffects?.(timeline, targetStage);
        timeline.eventCallback("onComplete", () => {
          // WHY kill: completed sequences must never linger on GSAP's global
          // timeline (60 FPS goal — no leaked tickers).
          timeline.kill();
          resolve();
        });
        timeline.play();
      }),
    [],
  );

  const value: AnimationContextValue = useMemo(
    () => ({ prefersReducedMotion, createTimeline, createEvolutionSequence }),
    [prefersReducedMotion, createTimeline, createEvolutionSequence],
  );

  return (
    <AnimationContext.Provider value={value}>
      {children}
    </AnimationContext.Provider>
  );
}
