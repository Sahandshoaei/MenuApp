import type { RefObject } from "react";
import { motion } from "framer-motion";
import { ImageOff } from "lucide-react";
import type { MenuItem } from "@/entities/menu/types/menu-item";
import { layoutId } from "@/shared/animations/layoutIds";
import { spring } from "@/shared/animations/motion";
import {
  defaultSlideMotion,
  slideVisuals,
  type SlideMotion,
} from "@/shared/animations/carouselMotion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

interface ItemImageCarouselProps {
  items: MenuItem[];
  scrollRef: RefObject<HTMLDivElement | null>;
  registerItemRef: (id: string, node: HTMLDivElement | null) => void;
  /** Entry item keeps layoutId for Home/Offer shared-element morph */
  heroItemId?: string;
  getSlideMotion: (id: string) => SlideMotion;
}

const ItemImageCarousel = ({
  items,
  scrollRef,
  registerItemRef,
  heroItemId,
  getSlideMotion,
}: ItemImageCarouselProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div
      ref={scrollRef}
      className="
        flex
        snap-x
        snap-mandatory
        gap-3
        overflow-x-auto
        px-[7.5%]
        py-1
        [perspective:900px]
        [&::-webkit-scrollbar]:hidden
      "
      style={{
        scrollbarWidth: "none",
        WebkitOverflowScrolling: "touch",
      }}
    >
      {items.map((item) => {
        const isHero = heroItemId === item.id;
        const motionValues = reducedMotion
          ? {
              scale: 1,
              opacity: 1,
              rotateY: 0,
              zIndex: 1,
              imageX: 0,
              imageScale: 1,
            }
          : slideVisuals(getSlideMotion(item.id) ?? defaultSlideMotion);

        return (
          <motion.div
            key={item.id}
            data-item-id={item.id}
            ref={(node) => registerItemRef(item.id, node)}
            className="
              relative
              flex
              aspect-square
              w-[85%]
              shrink-0
              snap-center
              items-center
              justify-center
              overflow-hidden
              rounded-3xl
              bg-[var(--color-accent-tint)]
            "
            style={{
              borderRadius: 24,
              transformStyle: reducedMotion ? undefined : "preserve-3d",
              zIndex: motionValues.zIndex,
            }}
            animate={
              reducedMotion
                ? undefined
                : {
                    scale: motionValues.scale,
                    opacity: motionValues.opacity,
                    rotateY: motionValues.rotateY,
                  }
            }
            transition={
              reducedMotion
                ? { duration: 0 }
                : {
                    type: "spring",
                    stiffness: 260,
                    damping: 32,
                    mass: 0.7,
                  }
            }
          >
            {item.image ? (
              <motion.img
                layoutId={
                  reducedMotion
                    ? undefined
                    : isHero
                      ? layoutId.itemHero(item.id)
                      : undefined
                }
                layout={false}
                src={item.image}
                alt={item.name}
                draggable={false}
                className="pointer-events-none h-full w-full max-w-none object-cover"
                animate={
                  reducedMotion
                    ? undefined
                    : {
                        x: motionValues.imageX,
                        scale: motionValues.imageScale,
                      }
                }
                transition={
                  reducedMotion
                    ? { duration: 0 }
                    : {
                        // layoutId morph uses spring.layout; parallax tracks scroll tightly
                        layout: spring.layout,
                        x: { type: "tween", duration: 0.12, ease: "linear" },
                        scale: { type: "tween", duration: 0.12, ease: "linear" },
                      }
                }
              />
            ) : (
              <ImageOff
                size={32}
                className="text-[var(--color-text-secondary)]"
              />
            )}

            {!reducedMotion && (
              <div
                className="pointer-events-none absolute inset-0 rounded-3xl"
                style={{
                  boxShadow: "inset 0 0 0 1px rgba(34,28,94,0.06)",
                  background: `linear-gradient(
                    90deg,
                    rgba(34,28,94,${(1 - motionValues.opacity) * 0.25}) 0%,
                    transparent 28%,
                    transparent 72%,
                    rgba(34,28,94,${(1 - motionValues.opacity) * 0.25}) 100%
                  )`,
                }}
              />
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default ItemImageCarousel;
