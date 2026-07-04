/*
 * OverlayManager (M3.7) — owns overlay lifecycle and pause orchestration.
 *
 * ✔ Subscribes only to overlay-type EventManager notifications
 * ✔ Opens one active story event at a time
 * ✔ Pauses ProgressManager while open; resume happens only on close
 * ✔ Provides Escape-to-close and a local focus trap for keyboard users
 *
 * Never: own portfolio content, manage scenes/creature/camera directly, or
 * trigger gameplay events. Camera and future creature motion freeze because
 * ProgressManager is paused, preserving one source of truth.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { useAnimation } from "../hooks/useAnimation";
import { useEvents } from "../hooks/useEvents";
import { useProgress } from "../hooks/useProgress";
import {
  OverlayContext,
  type OverlayContextValue,
  type OverlayEvent,
  type OverlayState,
} from "./OverlayContext";

interface OverlayManagerProps {
  readonly children: ReactNode;
}

const FOCUSABLE_SELECTOR = [
  "a[href]",
  "button:not([disabled])",
  "textarea:not([disabled])",
  "input:not([disabled])",
  "select:not([disabled])",
  "[tabindex]:not([tabindex='-1'])",
].join(",");

function isOverlayEvent(event: { readonly type: string }): event is OverlayEvent {
  return event.type === "overlay";
}

export default function OverlayManager({ children }: OverlayManagerProps) {
  const { subscribe } = useEvents();
  const { pause, resume } = useProgress();
  const { createTimeline, prefersReducedMotion } = useAnimation();

  const panelRef = useRef<HTMLDivElement | null>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);
  const activeOverlayRef = useRef<OverlayState | null>(null);

  const [activeOverlay, setActiveOverlay] = useState<OverlayState | null>(null);

  const isOverlayOpen = activeOverlay !== null;

  const openOverlay = useCallback(
    (event: OverlayEvent) => {
      if (activeOverlayRef.current !== null) {
        return;
      }

      previouslyFocusedRef.current =
        document.activeElement instanceof HTMLElement
          ? document.activeElement
          : null;

      const nextOverlay: OverlayState = {
        event,
        openedAt: Date.now(),
      };

      activeOverlayRef.current = nextOverlay;
      setActiveOverlay(nextOverlay);
      pause();
    },
    [pause],
  );

  const closeOverlay = useCallback(() => {
    if (activeOverlayRef.current === null) {
      return;
    }

    activeOverlayRef.current = null;
    setActiveOverlay(null);
    resume();
    previouslyFocusedRef.current?.focus();
    previouslyFocusedRef.current = null;
  }, [resume]);

  useEffect(
    () =>
      subscribe((event) => {
        if (isOverlayEvent(event)) {
          openOverlay(event);
        }
      }),
    [openOverlay, subscribe],
  );

  useEffect(() => {
    if (!isOverlayOpen) {
      return;
    }

    const panel = panelRef.current;
    if (!panel) {
      return;
    }

    const timeline = createTimeline("overlay", { paused: true });
    timeline.fromTo(
      panel,
      { autoAlpha: 0, y: prefersReducedMotion ? 0 : 16, scale: 0.98 },
      {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: prefersReducedMotion ? 0.01 : undefined,
      },
    );
    timeline.play();

    const firstFocusable = panel.querySelector<HTMLElement>(FOCUSABLE_SELECTOR);
    firstFocusable?.focus();

    return () => {
      timeline.kill();
    };
  }, [createTimeline, isOverlayOpen, prefersReducedMotion]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Escape") {
        event.stopPropagation();
        closeOverlay();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const panel = panelRef.current;
      if (!panel) {
        return;
      }

      const focusable = Array.from(
        panel.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR),
      );
      if (focusable.length === 0) {
        event.preventDefault();
        panel.focus();
        return;
      }

      const first = focusable[0] as HTMLElement;
      const last = focusable[focusable.length - 1] as HTMLElement;

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
        return;
      }

      if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    },
    [closeOverlay],
  );

  const value: OverlayContextValue = useMemo(
    () => ({ activeOverlay, isOverlayOpen, openOverlay, closeOverlay }),
    [activeOverlay, closeOverlay, isOverlayOpen, openOverlay],
  );

  return (
    <OverlayContext.Provider value={value}>
      {children}
      {activeOverlay ? (
        <div
          className="overlay-layer"
          role="presentation"
          onKeyDown={handleKeyDown}
        >
          <div
            ref={panelRef}
            className="overlay-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby="overlay-title"
            tabIndex={-1}
          >
            <h1 id="overlay-title" className="overlay-panel__title">
              {activeOverlay.event.title}
            </h1>
            <div className="overlay-panel__divider" aria-hidden="true" />
            <button
              className="overlay-panel__close"
              type="button"
              onClick={closeOverlay}
            >
              Continue Journey
            </button>
          </div>
        </div>
      ) : null}
    </OverlayContext.Provider>
  );
}
