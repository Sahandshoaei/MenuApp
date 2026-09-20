import { motion } from "framer-motion";
import { spring } from "@/shared/animations/motion";

interface CarouselDotsProps {
  count: number;
  activeIndex: number;
  onDotClick?: (index: number) => void;
}

const CarouselDots = ({ count, activeIndex, onDotClick }: CarouselDotsProps) => {
  if (count <= 1) return null;

  return (
    <div className="mt-4 flex items-center justify-center gap-1.5">
      {Array.from({ length: count }).map((_, index) => {
        const active = index === activeIndex;

        return (
          <button
            key={index}
            type="button"
            aria-label={`آیتم ${index + 1}`}
            onClick={() => onDotClick?.(index)}
            className="flex h-4 w-4 items-center justify-center"
          >
            <motion.span
              animate={{
                width: active ? 18 : 6,
                backgroundColor: active
                  ? "var(--color-accent)"
                  : "var(--color-border-strong)",
              }}
              transition={spring.snappy}
              className="block h-1.5 rounded-full"
            />
          </button>
        );
      })}
    </div>
  );
};

export default CarouselDots;
