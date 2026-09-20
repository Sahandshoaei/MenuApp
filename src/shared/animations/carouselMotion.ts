/**
 * Progress-based carousel depth — Shakuro-style center focus.
 *
 * offset:  0 = perfectly centered
 *         -1 = one full slide to the left of center
 *         +1 = one full slide to the right
 * focus:   1 at center → 0 when |offset| >= 1
 */

export type SlideMotion = {
  /** Signed distance from center in slide-widths */
  offset: number;
  /** 0..1 how "in focus" the slide is */
  focus: number;
};

export const defaultSlideMotion: SlideMotion = {
  offset: 0,
  focus: 1,
};

/** Clamp helper */
const clamp = (v: number, min: number, max: number) =>
  Math.min(max, Math.max(min, v));

/**
 * Derive visual props from slide motion.
 * Tuned soft — luxury feel, not aggressive 3D.
 */
export function slideVisuals(motion: SlideMotion) {
  const { offset, focus } = motion;
  const o = clamp(offset, -1.25, 1.25);

  return {
    /** Card shell */
    scale: 0.88 + 0.12 * focus,
    opacity: 0.5 + 0.5 * focus,
    rotateY: o * -10,
    zIndex: Math.round(focus * 20),
    /** Image parallax inside the clipped card (px) */
    imageX: o * -18,
    imageScale: 1.06 - 0.06 * focus,
  };
}

/**
 * Compute motion for every registered slide node inside a horizontal scroller.
 */
export function measureSlideMotions(
  root: HTMLElement,
  nodes: Map<string, HTMLElement>,
  gapPx = 12
): Record<string, SlideMotion> {
  const rootRect = root.getBoundingClientRect();
  const rootCenter = rootRect.left + rootRect.width / 2;
  const result: Record<string, SlideMotion> = {};

  nodes.forEach((node, id) => {
    const rect = node.getBoundingClientRect();
    const nodeCenter = rect.left + rect.width / 2;
    const distancePx = nodeCenter - rootCenter;
    const unit = Math.max(rect.width + gapPx, 1);
    const offset = distancePx / unit;
    const focus = clamp(1 - Math.abs(offset), 0, 1);

    result[id] = { offset, focus };
  });

  return result;
}
