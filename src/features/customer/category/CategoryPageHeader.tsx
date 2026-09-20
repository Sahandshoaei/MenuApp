import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

interface CategoryPageHeaderProps {
  categoryId?: string;
  title: string;
}

const CategoryPageHeader = ({ title }: CategoryPageHeaderProps) => {
  const navigate = useNavigate();
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="mb-5">
      <motion.button
        type="button"
        onClick={() => navigate(-1)}
        initial={reducedMotion ? false : { opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={reducedMotion ? { duration: 0 } : spring.soft}
        className="mb-3 flex h-9 w-9 items-center justify-center rounded-full text-[var(--color-accent)] transition-colors hover:bg-[var(--color-accent-tint)]"
        aria-label="بازگشت"
      >
        <ChevronRight size={22} />
      </motion.button>

      <motion.h1
        initial={reducedMotion ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={reducedMotion ? { duration: 0 } : spring.soft}
        className="text-right text-2xl font-bold text-[var(--color-text-primary)]"
      >
        {title}
      </motion.h1>
    </div>
  );
};

export default CategoryPageHeader;
