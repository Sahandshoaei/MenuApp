import type { Variants } from "framer-motion";
import { easeOutExpo, spring } from "./motion";

export const menuContainerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
      delayChildren: 0.04,
    },
  },
};

export const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.45,
      ease: easeOutExpo,
    },
  },
};

export const menuItemTap = {
  scale: 0.97,
  transition: spring.snappy,
} as const;
