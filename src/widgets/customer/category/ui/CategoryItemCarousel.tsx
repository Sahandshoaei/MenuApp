import { useState } from "react";
import { Heart } from "lucide-react";
import ItemImageCarousel from "@/features/customer/category/ItemImageCarousel";
import ItemDetailsPanel from "@/features/customer/category/ItemDetailsPanel";
import ItemInfoTabs, { type ItemInfoTab } from "@/features/customer/category/ItemInfoTabs";
import ItemDescription from "@/features/customer/category/ItemDescription";
import AddToCartFAB from "@/features/customer/category/AddToCartFAB";
import { useFavorite } from "@/entities/favorite/hooks/useFavorite";
import { useCategoryItemCarousel } from "../lib/useCategoryItemCarousel";

const CategoryItemCarousel = () => {
  const { items, activeItem, scrollRef, registerItemRef } = useCategoryItemCarousel();
  const [tab, setTab] = useState<ItemInfoTab>("info");
  const { isFavorite, toggle } = useFavorite();

  if (items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
        آیتمی در این دسته‌بندی نیست.
      </p>
    );
  }

  return (
    <div>
      <div className="relative">
        <ItemImageCarousel items={items} scrollRef={scrollRef} registerItemRef={registerItemRef} />

        {activeItem && (
          <button
            type="button"
            onClick={() => toggle(activeItem.id)}
            className="absolute right-6 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/80 backdrop-blur"
          >
            <Heart
              size={18}
              fill={isFavorite(activeItem.id) ? "#e8832a" : "none"}
              className={isFavorite(activeItem.id) ? "text-[#e8832a]" : "text-[var(--color-accent)]"}
            />
          </button>
        )}
      </div>

      {activeItem && (
        <>
          <ItemDetailsPanel item={activeItem} />
          <ItemInfoTabs activeTab={tab} onChange={setTab} weightLabel={activeItem.weightLabel} />
          <ItemDescription item={activeItem} activeTab={tab} />
          <AddToCartFAB item={activeItem} />
        </>
      )}
    </div>
  );
};

export default CategoryItemCarousel;
