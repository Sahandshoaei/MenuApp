import type { Variants } from "framer-motion";
import { spring, tween } from "./motion";

/**
 * Soft fade + slight scale — pairs with layoutId hero morphs.
 * Avoid hard horizontal slides; they fight shared-element motion.
 */
export const pageShellVariants: Variants = {
  initial: {
    opacity: 0,
    scale: 0.98,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: spring.soft,
  },
  exit: {
    opacity: 0,
    scale: 1.015,
    transition: tween.fast,
  },
};

/** Crossfade for title / price / description under the item carousel */
export const detailSwapVariants: Variants = {
  initial: {
    opacity: 0,
    y: 14,
    filter: "blur(4px)",
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: spring.soft,
  },
  exit: {
    opacity: 0,
    y: -10,
    filter: "blur(3px)",
    transition: tween.fast,
  },
};
