import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/entities/cart/state/cartSlice";
import type { MenuItem } from "@/entities/menu/types/menu-item";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";
import { useFlyToCartOptional } from "@/widgets/customer/cart/FlyToCartContext";

interface AddToCartFABProps {
  item: MenuItem;
}

const AddToCartFAB = ({ item }: AddToCartFABProps) => {
  const dispatch = useAppDispatch();
  const reducedMotion = usePrefersReducedMotion();
  const fly = useFlyToCartOptional();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [justAdded, setJustAdded] = useState(false);

  const handleClick = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} به سبد اضافه شد`);

    fly?.flyFromElement(buttonRef.current, "var(--color-accent)");

    setJustAdded(true);
    window.setTimeout(() => setJustAdded(false), 900);
  };

  return (
    <div className="sticky bottom-4 mt-6 flex justify-center">
      <motion.button
        ref={buttonRef}
        type="button"
        onClick={handleClick}
        whileHover={reducedMotion ? undefined : { scale: 1.06 }}
        whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        animate={
          justAdded
            ? {
                scale: reducedMotion ? 1 : [1, 1.18, 1],
                backgroundColor: "#2f9e44",
              }
            : { scale: 1, backgroundColor: "var(--color-accent)" }
        }
        transition={reducedMotion ? { duration: 0 } : spring.snappy}
        className="relative flex h-14 w-14 items-center justify-center overflow-hidden rounded-full text-white shadow-[0_10px_28px_rgba(34,28,94,0.28)]"
        aria-label={justAdded ? "اضافه شد" : "افزودن به سبد"}
      >
        <AnimatePresence mode="wait" initial={false}>
          {justAdded ? (
            <motion.span
              key="check"
              initial={
                reducedMotion ? false : { opacity: 0, scale: 0.5, rotate: -40 }
              }
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={reducedMotion ? { duration: 0 } : spring.snappy}
            >
              <Check size={24} strokeWidth={2.5} />
            </motion.span>
          ) : (
            <motion.span
              key="plus"
              initial={reducedMotion ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={reducedMotion ? { duration: 0 } : spring.snappy}
            >
              <Plus size={24} />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AddToCartFAB;
