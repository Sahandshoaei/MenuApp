import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/ThemeProvider";
import { spring } from "@/shared/animations/motion";

/**
 * Compact header chip that switches light ↔ dark.
 * Uses header tokens so it sits cleanly on the accent bar.
 */
const ThemeToggle = () => {
  const { isDark, toggleTheme } = useTheme();

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      transition={spring.snappy}
      aria-label={isDark ? "حالت روشن" : "حالت تاریک"}
      title={isDark ? "حالت روشن" : "حالت تاریک"}
      className="
        relative flex h-10 w-10 items-center justify-center
        overflow-hidden rounded-full
        border backdrop-blur
      "
      style={{
        background: "var(--color-header-chip)",
        borderColor: "var(--color-header-chip-border)",
        color: "var(--color-header-text)",
      }}
    >
      <motion.span
        key={isDark ? "moon" : "sun"}
        initial={{ opacity: 0, rotate: -40, scale: 0.6 }}
        animate={{ opacity: 1, rotate: 0, scale: 1 }}
        exit={{ opacity: 0, rotate: 40, scale: 0.6 }}
        transition={spring.snappy}
        className="flex items-center justify-center"
      >
        {isDark ? <Sun size={18} /> : <Moon size={18} />}
      </motion.span>
    </motion.button>
  );
};

export default ThemeToggle;
