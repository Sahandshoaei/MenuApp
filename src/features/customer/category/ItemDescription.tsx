import { AnimatePresence, motion } from "framer-motion";
import type { MenuItem } from "@/entities/menu/types/menu-item";
import type { ItemInfoTab } from "./ItemInfoTabs";
import { detailSwapVariants } from "@/shared/animations/pageTransitions";

interface ItemDescriptionProps {
  item: MenuItem;
  activeTab: ItemInfoTab;
}

const ItemDescription = ({ item, activeTab }: ItemDescriptionProps) => {
  const text =
    activeTab === "ingredients"
      ? (item.ingredients ?? "اطلاعاتی برای مواد تشکیل‌دهنده ثبت نشده.")
      : item.description;

  return (
    <div className="relative mt-4 min-h-[4.5rem]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.p
          key={`${item.id}-${activeTab}`}
          variants={detailSwapVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          className="text-sm leading-relaxed text-[var(--color-text-secondary)]"
        >
          {text}
        </motion.p>
      </AnimatePresence>
    </div>
  );
};

export default ItemDescription;
