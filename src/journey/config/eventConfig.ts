/*
 * Canonical gameplay checkpoints (PROJECT_CONTEXT.md / ARCHITECTURE.md).
 * Fixed checkpoints only — never ranges. EventManager (M3) is the ONLY
 * consumer allowed to compare progress against these triggers; components
 * must never write `if (progress > x)` themselves.
 */

/** Normalized journey progress. 0.0 = journey start, 1.0 = ending. */
export type Progress = number;

export type EventType = "overlay" | "evolution" | "ending";

export type EventId =
  | "about"
  | "techStack"
  | "evolution1"
  | "projects"
  | "contact"
  | "evolution2"
  | "ending";

export interface EventConfig {
  readonly id: EventId;
  /** Normalized progress (0.0–1.0) at which the event fires exactly once. */
  readonly trigger: Progress;
  readonly type: EventType;
  /** Immersive in-world title (DESIGN.md overlay names). */
  readonly title: string;
}

/**
 * The seven canonical checkpoints. Order matches the journey timeline;
 * EventManager (M3) registers these verbatim.
 */
export const EVENTS: readonly EventConfig[] = [
  { id: "about", trigger: 0.1, type: "overlay", title: "📖 Adventurer's Journal" },
  { id: "techStack", trigger: 0.3, type: "overlay", title: "⚙ Equipment Inventory" },
  { id: "evolution1", trigger: 0.45, type: "evolution", title: "First Evolution" },
  { id: "projects", trigger: 0.6, type: "overlay", title: "🏆 Completed Quests" },
  { id: "contact", trigger: 0.8, type: "overlay", title: "📬 Guild Hall" },
  { id: "evolution2", trigger: 0.9, type: "evolution", title: "Final Evolution" },
  { id: "ending", trigger: 1.0, type: "ending", title: "🏛 Ending Temple" },
];
