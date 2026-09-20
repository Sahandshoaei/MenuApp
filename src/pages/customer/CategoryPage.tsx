import { motion } from "framer-motion";
import { useParams } from "react-router-dom";
import { useMenu } from "../../entities/menu/hooks/useMenu";
import CategoryPageHeader from "../../features/customer/category/CategoryPageHeader";
import CategoryItemCarousel from "../../widgets/customer/category/ui/CategoryItemCarousel";
import { spring } from "@/shared/animations/motion";

/** Second half of the Home card flip — settles from ~90° to flat. */
const CategoryPage = () => {
  const { categoryId } = useParams();
  const { getCategory } = useMenu();
  const category = categoryId ? getCategory(categoryId) : undefined;

  return (
    <div className="min-h-full bg-[var(--color-bg)] px-5 pb-10 pt-6">
      <CategoryPageHeader
        categoryId={categoryId}
        title={category?.title ?? categoryId ?? ""}
      />

      <motion.div
        className="overflow-hidden rounded-[28px] bg-[var(--color-surface)] p-3 shadow-[0_10px_32px_rgba(34,28,94,0.08)]"
        style={{ borderRadius: 28 }}
        initial={{ opacity: 0, rotateY: -80, scale: 0.92 }}
        animate={{ opacity: 1, rotateY: 0, scale: 1 }}
        transition={spring.soft}
      >
        <CategoryItemCarousel />
      </motion.div>
    </div>
  );
};

export default CategoryPage;
