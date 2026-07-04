/*
 * Dev-only engine integration panel (M3.8). Shows the runtime contract
 * between all M3 managers while staying out of production builds — see
 * App.tsx.
 */

import { findNextEvent } from "../events/eventUtils";
import { getStageConfig } from "../evolution/evolutionUtils";
import { useAnimation } from "../hooks/useAnimation";
import { useCamera } from "../hooks/useCamera";
import { useEvents } from "../hooks/useEvents";
import { useEvolution } from "../hooks/useEvolution";
import { useOverlay } from "../hooks/useOverlay";
import { useProgress } from "../hooks/useProgress";
import { useTheme } from "../hooks/useTheme";

const PERCENT = 100;
const PROGRESS_DECIMALS = 4;
const PERCENT_DECIMALS = 1;
const TRIGGER_DECIMALS = 0;
const CAMERA_DECIMALS = 1;
const ANCHOR_DECIMALS = 0;
const SCENE_MANAGER_PLACEHOLDER = "SceneManager pending (M4)";

export default function EngineDebug() {
  const { progress, isPaused, pause, resume } = useProgress();
  const { firedEvents, hasFired } = useEvents();
  const { currentStage, isEvolving, lastEvolutionEvent } = useEvolution();
  const { prefersReducedMotion } = useAnimation();
  const { mode, cameraTravelVw, creatureAnchor } = useCamera();
  const { activeOverlay, isOverlayOpen, closeOverlay } = useOverlay();
  const theme = useTheme();

  const nextEvent = findNextEvent(progress, hasFired);
  // Stage names (Wispet → Lumorph → Nebulorem on Night) come from the active
  // theme's sprite config — never hardcoded.
  const stageName = getStageConfig(theme.sprites, currentStage).name;

  return (
    <aside className="progress-debug" aria-label="Engine debug panel">
      <p>
        theme: {theme.label} ({theme.id}
        {theme.placeholder ? ", placeholder" : ", active"})
      </p>
      <p>progress raw: {progress.toFixed(PROGRESS_DECIMALS)}</p>
      <p>progress %: {(progress * PERCENT).toFixed(PERCENT_DECIMALS)}%</p>
      <p>pause state: {isPaused ? "paused" : "running"}</p>
      <p>current scene: {SCENE_MANAGER_PLACEHOLDER}</p>
      <p>
        next event:{" "}
        {nextEvent
          ? `${nextEvent.id} @ ${(nextEvent.trigger * PERCENT).toFixed(TRIGGER_DECIMALS)}%`
          : "—"}
      </p>
      <p>triggered event count: {firedEvents.length}</p>
      <p>triggered events: {firedEvents.length > 0 ? firedEvents.join(", ") : "none"}</p>
      <p>
        evolution stage: {currentStage} ({stageName})
      </p>
      <p>evolving: {isEvolving ? "yes" : "no"}</p>
      <p>last evolution event: {lastEvolutionEvent ?? "—"}</p>
      <p>
        active overlay:{" "}
        {activeOverlay
          ? `${activeOverlay.event.id} (${activeOverlay.event.title})`
          : "—"}
      </p>
      <p>overlay open: {isOverlayOpen ? "yes" : "no"}</p>
      <p>reduced motion: {prefersReducedMotion ? "yes" : "no"}</p>
      <p>camera mode: {mode}</p>
      <p>camera travel: {cameraTravelVw.toFixed(CAMERA_DECIMALS)}vw</p>
      <p>
        creature anchor: {(creatureAnchor * PERCENT).toFixed(ANCHOR_DECIMALS)}%
      </p>
      <button type="button" onClick={isPaused ? resume : pause}>
        {isPaused ? "resume" : "pause"}
      </button>
      {isOverlayOpen ? (
        <button type="button" onClick={closeOverlay}>
          close overlay
        </button>
      ) : null}
    </aside>
  );
}
