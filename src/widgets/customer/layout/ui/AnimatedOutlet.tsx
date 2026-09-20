import { AnimatePresence, motion } from "framer-motion";
import { useLocation, useOutlet } from "react-router-dom";
import { spring } from "@/shared/animations/motion";

/**
 * Light page shell. Home exit stays fully opaque so in-page card flips
 * aren't killed by a fade-out of the whole route.
 */
const AnimatedOutlet = () => {
  const location = useLocation();
  const outlet = useOutlet();
  const shellKey = getShellKey(location.pathname);

  return (
    <div className="relative min-h-full w-full">
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.div
          key={shellKey}
          initial={{ opacity: 0, y: 10 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: spring.soft,
          }}
          exit={{
            opacity: 0,
            y: -6,
            transition: { duration: 0.18, ease: "easeIn" },
          }}
          className="min-h-full w-full bg-[var(--color-bg)]"
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

function getShellKey(pathname: string): string {
  if (pathname === "/" || pathname === "") return "home";

  const categoryMatch = pathname.match(/^\/category\/([^/]+)/);
  if (categoryMatch) return `category:${categoryMatch[1]}`;

  return pathname.split("/").filter(Boolean)[0] ?? "root";
}

export default AnimatedOutlet;
