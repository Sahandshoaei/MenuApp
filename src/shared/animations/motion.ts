/**
 * Shared motion tokens for the customer app.
 * Keep springs soft and short — closer to the Shakuro restaurant shot.
 */

export const spring = {
  soft: {
    type: "spring",
    stiffness: 280,
    damping: 28,
    mass: 0.85,
  },
  snappy: {
    type: "spring",
    stiffness: 420,
    damping: 32,
    mass: 0.7,
  },
  slow: {
    type: "spring",
    stiffness: 180,
    damping: 26,
    mass: 1,
  },
  /** Shared-element / layoutId morphs */
  layout: {
    type: "spring",
    stiffness: 320,
    damping: 34,
    mass: 0.9,
  },
} as const;

export const easeOutExpo = [0.22, 1, 0.36, 1] as const;

export const duration = {
  fast: 0.2,
  normal: 0.35,
  slow: 0.5,
} as const;

export const tween = {
  fast: { duration: duration.fast, ease: easeOutExpo },
  normal: { duration: duration.normal, ease: easeOutExpo },
  slow: { duration: duration.slow, ease: easeOutExpo },
} as const;
