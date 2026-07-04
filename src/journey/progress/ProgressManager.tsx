/*
 * ProgressManager (M3.2) — the single source of truth for journey progress
 * (ARCHITECTURE.md). Converts scroll input into normalized progress
 * (0.0 → 1.0) via GSAP ScrollTrigger.
 *
 * Pause behavior: while paused the capture layer stops scrolling entirely
 * (overflow hidden), so wheel input cannot accumulate. The saved scroll
 * position is restored on resume, guaranteeing progress continues from the
 * exact same point with no leakage.
 *
 * Never: trigger events, move the camera, manage overlays — EventManager
 * (M3.3) and later systems subscribe to this context instead.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { JOURNEY_SCROLL_LENGTH_VH } from "../config/progressConfig";
import { ProgressContext, type ProgressContextValue } from "./ProgressContext";

gsap.registerPlugin(ScrollTrigger);

interface ProgressManagerProps {
  readonly children: ReactNode;
}

export default function ProgressManager({ children }: ProgressManagerProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const spacerRef = useRef<HTMLDivElement | null>(null);

  // WHY refs alongside state: ScrollTrigger callbacks run outside React's
  // render cycle and must read the pause flag synchronously.
  const pausedRef = useRef(false);
  const savedScrollTopRef = useRef(0);

  const [progress, setProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const scroller = scrollerRef.current;
    const spacer = spacerRef.current;
    if (!scroller || !spacer) {
      return;
    }

    const trigger = ScrollTrigger.create({
      scroller,
      trigger: spacer,
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        // No progress leakage while paused: consumers (EventManager M3.3,
        // camera, scenes) must only ever observe frozen progress.
        if (!pausedRef.current) {
          setProgress(self.progress);
        }
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  const pause = useCallback(() => {
    if (pausedRef.current) {
      return;
    }
    pausedRef.current = true;
    savedScrollTopRef.current = scrollerRef.current?.scrollTop ?? 0;
    setIsPaused(true);
  }, []);

  const resume = useCallback(() => {
    if (!pausedRef.current) {
      return;
    }
    const scroller = scrollerRef.current;
    if (scroller) {
      // Restore the exact position — any input that slipped through while
      // the pause was applying is discarded, never accumulated.
      scroller.scrollTop = savedScrollTopRef.current;
    }
    pausedRef.current = false;
    setIsPaused(false);
  }, []);

  const value: ProgressContextValue = useMemo(
    () => ({ progress, isPaused, pause, resume }),
    [progress, isPaused, pause, resume],
  );

  return (
    <ProgressContext.Provider value={value}>
      {children}
      {/*
       * Invisible scroll capture layer: the document itself never scrolls
       * (M1). This fixed element provides the runway ScrollTrigger scrubs
       * against. Runway length comes from progressConfig — never hardcoded.
       */}
      <div
        ref={scrollerRef}
        className={clsx(
          "progress-scroller",
          isPaused && "progress-scroller--paused",
        )}
        aria-hidden="true"
      >
        <div
          ref={spacerRef}
          style={{ height: `${JOURNEY_SCROLL_LENGTH_VH}vh` }}
        />
      </div>
    </ProgressContext.Provider>
  );
}
