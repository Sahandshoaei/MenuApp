import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useParams } from "react-router-dom";
import ItemImageCarousel from "@/features/customer/category/ItemImageCarousel";
import ItemDetailsPanel from "@/features/customer/category/ItemDetailsPanel";
import ItemInfoTabs, {
  type ItemInfoTab,
} from "@/features/customer/category/ItemInfoTabs";
import ItemDescription from "@/features/customer/category/ItemDescription";
import AddToCartFAB from "@/features/customer/category/AddToCartFAB";
import CarouselDots from "@/features/customer/category/CarouselDots";
import { useFavorite } from "@/entities/favorite/hooks/useFavorite";
import { useCategoryItemCarousel } from "../lib/useCategoryItemCarousel";
import { detailSwapVariants } from "@/shared/animations/pageTransitions";
import { spring } from "@/shared/animations/motion";

const CategoryItemCarousel = () => {
  const { itemId, categoryId } = useParams();
  const {
    items,
    activeItem,
    activeIndex,
    scrollRef,
    registerItemRef,
    getSlideMotion,
  } = useCategoryItemCarousel();

  const [tab, setTab] = useState<ItemInfoTab>("info");
  const [heartPulseKey, setHeartPulseKey] = useState(0);
  const { isFavorite, toggle } = useFavorite();

  // Freeze entry layoutId so swipe doesn't hop shared-element ids
  const entryHeroItemIdRef = useRef<string | undefined>(itemId);
  const entryCategoryRef = useRef(categoryId);
  if (entryCategoryRef.current !== categoryId) {
    entryCategoryRef.current = categoryId;
    entryHeroItemIdRef.current = itemId;
  }

  const handleToggleFavorite = () => {
    if (!activeItem) return;
    toggle(activeItem.id);
    setHeartPulseKey((k) => k + 1);
  };

  const scrollToIndex = useCallback(
    (index: number) => {
      const root = scrollRef.current;
      const target = items[index];
      if (!root || !target) return;

      const node = root.querySelector<HTMLElement>(
        `[data-item-id="${target.id}"]`
      );
      if (!node) return;

      const rootRect = root.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const delta =
        nodeRect.left -
        rootRect.left -
        (rootRect.width - nodeRect.width) / 2;

      root.scrollTo({ left: root.scrollLeft + delta, behavior: "smooth" });
    },
    [items, scrollRef]
  );

  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
        آیتمی در این دسته‌بندی نیست.
      </p>
    );
  }

  const favorite = activeItem ? isFavorite(activeItem.id) : false;

  return (
    <div>
      <div className="relative">
        <ItemImageCarousel
          items={items}
          scrollRef={scrollRef}
          registerItemRef={registerItemRef}
          heroItemId={entryHeroItemIdRef.current}
          getSlideMotion={getSlideMotion}
        />

        {activeItem && (
          <motion.button
            key={`heart-${activeItem.id}-${heartPulseKey}`}
            type="button"
            onClick={handleToggleFavorite}
            whileTap={{ scale: 0.86 }}
            initial={heartPulseKey > 0 ? { scale: 0.75 } : false}
            animate={{ scale: 1 }}
            transition={spring.snappy}
            className="absolute right-6 top-4 z-30 flex h-9 w-9 items-center justify-center rounded-full bg-white/85 shadow-sm backdrop-blur"
            aria-label={favorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
          >
            <Heart
              size={18}
              fill={favorite ? "#e8832a" : "none"}
              className={
                favorite ? "text-[#e8832a]" : "text-[var(--color-accent)]"
              }
            />
          </motion.button>
        )}
      </div>

      <CarouselDots
        count={items.length}
        activeIndex={activeIndex}
        onDotClick={scrollToIndex}
      />

      {/* Title / price / copy crossfade with the active slide */}
      <AnimatePresence mode="wait">
        {activeItem && (
          <motion.div
            key={activeItem.id}
            variants={detailSwapVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <ItemDetailsPanel item={activeItem} />
            <ItemInfoTabs
              activeTab={tab}
              onChange={setTab}
              weightLabel={activeItem.weightLabel}
            />
            <ItemDescription item={activeItem} activeTab={tab} />
            <AddToCartFAB item={activeItem} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryItemCarousel;
