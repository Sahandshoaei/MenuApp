import type { Variants } from "framer-motion";

export const menuContainerVariants: Variants = {
  hidden: {},

  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

export const menuItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.96,
  },

  visible: {
    opacity: 1,
    y: 0,
    scale: 1,

    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};



// اینجا چه اتفاقی می‌افتد؟

// این قسمت:

// staggerChildren: 0.08

// یعنی هر Child با فاصله‌ی 80ms نسبت به قبلی شروع شود.

// و:

// y: 35

// یعنی کارت ابتدا کمی پایین‌تر باشد.

// بعد:

// y: 0

// به جای اصلی خودش برگردد