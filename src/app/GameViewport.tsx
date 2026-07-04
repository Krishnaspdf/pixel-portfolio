import { useTheme } from "../journey/hooks/useTheme";

/**
 * Full-viewport game canvas.
 *
 * WHY: Every world layer (scenes, creature, particles, HUD, overlays)
 * mounts inside this container in later milestones.
 *
 * The placeholder text verifies the scaffold renders, pixel fonts load,
 * and ThemeManager resolved a world. It is removed when the first scene
 * layer lands (M4).
 */
export default function GameViewport() {
  const theme = useTheme();

  return (
    <main className="game-viewport" aria-label="PixelMon Journey">
      <p className="game-viewport__placeholder">
        PixelMon Journey
        <span className="game-viewport__placeholder-sub">
          The adventure is being built… ({theme.label})
        </span>
      </p>
    </main>
  );
}
