/*
 * EvolutionManager (M3.4) — owns evolution STATE and orchestration only
 * (ARCHITECTURE.md split: EventManager → EvolutionManager → AnimationManager).
 *
 * ✔ Subscribes ONLY to the EventManager publication channel
 * ✔ Reacts only to evolution-type checkpoints derived from eventConfig.ts
 * ✔ Pauses ProgressManager while the sequence runs; resumes on completion
 * ✔ Delegates every visual effect through the EvolutionSequence seam —
 *   AnimationManager (M3.5) supplies the real GSAP implementation
 *
 * Never: render sprites, implement animations, know about overlays, camera,
 * or scenes.
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
import { EVOLUTION_SEQUENCE_MS } from "../config/evolutionConfig";
import type { EvolutionStage } from "../config/spriteConfig";
import { useEvents } from "../hooks/useEvents";
import { useProgress } from "../hooks/useProgress";
import {
  EvolutionContext,
  type EvolutionContextValue,
} from "./EvolutionContext";
import {
  createPlaceholderSequence,
  type EvolutionSequence,
} from "./evolutionSequence";
import { getEvolutionTargetStage, INITIAL_STAGE } from "./evolutionUtils";

interface EvolutionManagerProps {
  readonly children: ReactNode;
  /**
   * Visual sequence override — AnimationManager (M3.5) injects its GSAP
   * timeline here. Defaults to a timer-only placeholder.
   */
  readonly sequence?: EvolutionSequence;
}

export default function EvolutionManager({
  children,
  sequence,
}: EvolutionManagerProps) {
  const { pause, resume } = useProgress();
  const { subscribe } = useEvents();

  const [currentStage, setCurrentStage] = useState<EvolutionStage>(INITIAL_STAGE);
  const [isEvolving, setIsEvolving] = useState(false);
  const [lastEvolutionEvent, setLastEvolutionEvent] = useState<EventId | null>(null);

  // WHY refs: evolveTo runs from event callbacks and async completions —
  // guards must read the latest values without stale closures.
  const stageRef = useRef<EvolutionStage>(INITIAL_STAGE);
  const evolvingRef = useRef(false);
  // WHY a generation counter: resetEvolution() mid-sequence must invalidate
  // the pending completion so an interrupted evolution cannot resurrect state.
  const generationRef = useRef(0);
  const sequenceRef = useRef<EvolutionSequence>(
    sequence ?? createPlaceholderSequence(EVOLUTION_SEQUENCE_MS),
  );

  const evolveTo = useCallback(
    (stage: EvolutionStage) => {
      // Duplicate events and already-reached stages are ignored (idempotent).
      if (evolvingRef.current || stage <= stageRef.current) {
        return;
      }
      evolvingRef.current = true;
      setIsEvolving(true);
      // Progress freezes for the whole sequence — the journey pauses while
      // the creature evolves (GAMEPLAY.md).
      pause();

      const generation = generationRef.current;
      void sequenceRef.current(stage)
        // WHY swallow rejection: a failed visual sequence must never
        // soft-lock the journey — state still advances and progress resumes.
        .catch(() => undefined)
        .then(() => {
          if (generation !== generationRef.current) {
            return; // resetEvolution() interrupted this sequence
          }
          stageRef.current = stage;
          setCurrentStage(stage);
          evolvingRef.current = false;
          setIsEvolving(false);
          resume();
        });
    },
    [pause, resume],
  );

  const resetEvolution = useCallback(() => {
    generationRef.current += 1;
    if (evolvingRef.current) {
      // Balance the pause taken by the interrupted sequence.
      resume();
    }
    evolvingRef.current = false;
    stageRef.current = INITIAL_STAGE;
    setCurrentStage(INITIAL_STAGE);
    setIsEvolving(false);
    setLastEvolutionEvent(null);
  }, [resume]);

  useEffect(
    () =>
      subscribe((event) => {
        // Generic manager: only evolution-type checkpoints are relevant;
        // overlay/ending events belong to other subscribers (M3.7).
        if (event.type !== "evolution") {
          return;
        }
        setLastEvolutionEvent(event.id);
        const target = getEvolutionTargetStage(event.id);
        if (target !== null) {
          evolveTo(target);
        }
      }),
    [subscribe, evolveTo],
  );

  const value: EvolutionContextValue = useMemo(
    () => ({
      currentStage,
      isEvolving,
      evolveTo,
      resetEvolution,
      lastEvolutionEvent,
    }),
    [currentStage, isEvolving, evolveTo, resetEvolution, lastEvolutionEvent],
  );

  return (
    <EvolutionContext.Provider value={value}>
      {children}
    </EvolutionContext.Provider>
  );
}
