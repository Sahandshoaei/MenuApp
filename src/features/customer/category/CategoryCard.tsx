import { motion } from "framer-motion";
import { CATEGORY_ICON_MAP } from "../../../entities/menu/constants/categoryIcons";
import {
  menuItemTap,
  menuItemVariants,
} from "../../../shared/animations/menuVariants";

type Props = {
  id: string;
  title: string;
  icon: string;
  itemCount?: number;
  glowColor?: string;
  gradient?: string;
  isFlipping?: boolean;
  onClick: () => void;
};

/**
 * Pure visual tile. Transforms for scroll-fold / click-flip are applied
 * by the parent shell in CategoryGrid — keep this free of layoutId and
 * outer transforms so they don't fight each other.
 */
const CategoryCard = ({
  id,
  title,
  icon,
  isFlipping = false,
  onClick,
}: Props) => {
  const LucideCategoryIcon = CATEGORY_ICON_MAP[id];

  return (
    <motion.div
      variants={menuItemVariants}
      whileTap={isFlipping ? undefined : menuItemTap}
      onClick={onClick}
      className="
        flex h-full cursor-pointer flex-col items-center justify-center
        gap-2 rounded-3xl bg-[var(--color-surface)] px-4 py-7 text-center
        shadow-[0_8px_24px_rgba(34,28,94,0.08)]
      "
      style={{ borderRadius: 24 }}
    >
      {LucideCategoryIcon ? (
        <LucideCategoryIcon
          size={50}
          strokeWidth={1.75}
          className="text-[var(--color-accent)]"
        />
      ) : (
        <span className="text-4xl">{icon}</span>
      )}

      <h3 className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
        {title}
      </h3>
    </motion.div>
  );
};

export default CategoryCard;
