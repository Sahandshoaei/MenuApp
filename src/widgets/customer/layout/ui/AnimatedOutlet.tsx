import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";

const pageVariants = {
  initial: {
    opacity: 0,
    x: 30,
  },

  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.22, 1, 0.36, 1],
    },
  },

  exit: {
    opacity: 0,
    x: -30,
    transition: {
      duration: 0.25,
      ease: "easeIn",
    },
  },
};

const AnimatedOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-full w-full"
      >
        {outlet}
      </motion.div>
    </AnimatePresence>
  );
};

export default AnimatedOutlet;



// چرا useOutlet؟

// به جای اینکه مستقیماً:

// <Outlet />

// داشته باشیم، خود Outlet را به عنوان یک React element می‌گیریم:

// const outlet = useOutlet();

// بعد آن را داخل motion.div قرار می‌دهیم:

// <motion.div>
//   {outlet}
// </motion.div>

// این اجازه می‌دهد Motion روی خود صفحه transition اعمال کند.