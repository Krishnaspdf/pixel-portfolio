import { useMemo, type ReactNode } from "react";
import GameViewport from "./GameViewport";
import AnimationManager from "../journey/animations/AnimationManager";
import CameraManager from "../journey/camera/CameraManager";
import EventManager from "../journey/events/EventManager";
import EvolutionManager from "../journey/evolution/EvolutionManager";
import { useAnimation } from "../journey/hooks/useAnimation";
import OverlayManager from "../journey/overlays/OverlayManager";
import ProgressManager from "../journey/progress/ProgressManager";
import ThemeManager from "../journey/themes/ThemeManager";
import EngineDebug from "../journey/ui/EngineDebug";

interface AnimatedEvolutionManagerProps {
  readonly children: ReactNode;
}

/**
 * Fills the M3.4 delegation seam: EvolutionManager receives the GSAP-backed
 * sequence from AnimationManager (M3.5) through its existing `sequence`
 * prop — no EvolutionManager changes required (see evolutionSequence.ts).
 */
function AnimatedEvolutionManager({ children }: AnimatedEvolutionManagerProps) {
  const { createEvolutionSequence } = useAnimation();
  // WHY memo: EvolutionManager captures the sequence once at mount; a stable
  // reference keeps that contract explicit.
  const sequence = useMemo(
    () => createEvolutionSequence(),
    [createEvolutionSequence],
  );
  return <EvolutionManager sequence={sequence}>{children}</EvolutionManager>;
}

/**
 * Application shell.
 *
 * WHY: The app renders a single full-viewport game canvas wrapped by the
 * manager provider tree. ThemeManager (M3.1) decides which world loads;
 * ProgressManager (M3.2) owns normalized journey progress; EventManager
 * (M3.3) publishes checkpoint notifications; AnimationManager (M3.5)
 * provides GSAP timelines and the reduced-motion flag; CameraManager (M3.6)
 * derives world travel, the creature anchor, and parallax offsets;
 * OverlayManager (M3.7) owns overlay lifecycle and pause orchestration;
 * EvolutionManager (M3.4) owns creature stage state. OverlayManager wraps
 * EvolutionManager to match the finalized M3.8 provider order; they remain
 * decoupled and communicate only through EventManager/ProgressManager APIs.
 */
export default function App() {
  return (
    <ThemeManager>
      <ProgressManager>
        <EventManager>
          <AnimationManager>
            <CameraManager>
              <OverlayManager>
                <AnimatedEvolutionManager>
                  <GameViewport />
                  {/* WHY dev-only: the debug HUD must never ship to visitors. */}
                  {import.meta.env.DEV ? <EngineDebug /> : null}
                </AnimatedEvolutionManager>
              </OverlayManager>
            </CameraManager>
          </AnimationManager>
        </EventManager>
      </ProgressManager>
    </ThemeManager>
  );
}
