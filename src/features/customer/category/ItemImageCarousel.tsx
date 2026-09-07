import type { RefObject } from "react";
import { ImageOff } from "lucide-react";
import type { MenuItem } from "@/entities/menu/types/menu-item";

interface ItemImageCarouselProps {
  items: MenuItem[];
  scrollRef: RefObject<HTMLDivElement | null>;
  registerItemRef: (id: string, node: HTMLDivElement | null) => void;
}

const ItemImageCarousel = ({ items, scrollRef, registerItemRef }: ItemImageCarouselProps) => {
  return (
    <div
      ref={scrollRef}
      className="
        flex
        snap-x
        snap-mandatory
        gap-3
        overflow-x-auto
        [&::-webkit-scrollbar]:hidden
      "
      style={{ scrollbarWidth: "none" }}
    >
      {items.map((item) => (
        <div
          key={item.id}
          data-item-id={item.id}
          ref={(node) => registerItemRef(item.id, node)}
          className="flex aspect-square w-[85%] shrink-0 snap-center items-center justify-center overflow-hidden rounded-3xl bg-[var(--color-surface)]"
        >
          {item.image ? (
            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
          ) : (
            <ImageOff size={32} className="text-[var(--color-text-secondary)]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default ItemImageCarousel;
