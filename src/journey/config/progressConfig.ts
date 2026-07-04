/*
 * Progress tuning — consumed by ProgressManager (M3.2).
 * WHY here: the runway length controls journey pacing (GAMEPLAY.md targets a
 * 5–7 minute first visit). It is tuning data, never a component constant.
 */

/** Height of the invisible scroll runway, in viewport-height units. */
export const JOURNEY_SCROLL_LENGTH_VH = 700;
