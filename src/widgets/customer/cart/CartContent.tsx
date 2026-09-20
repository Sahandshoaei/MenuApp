import { AnimatePresence, motion } from "framer-motion";
import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../entities/cart/hooks/useCart";
import CartItem from "../../../features/customer/cart/CartItem";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

const CartContent = () => {
  const { items, isEmpty } = useCart();
  const reducedMotion = usePrefersReducedMotion();

  if (isEmpty) {
    return (
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={spring.soft}
        className="flex h-full flex-col items-center justify-center gap-4 text-center"
      >
        <div
          className="flex h-20 w-20 items-center justify-center rounded-2xl"
          style={{
            background: "var(--color-surface)",
            border: "0.5px solid var(--color-border)",
          }}
        >
          <ShoppingBag
            size={36}
            style={{ color: "var(--color-accent-soft)" }}
          />
        </div>

        <div>
          <h3
            className="mb-1 text-base font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            سبد خالی است
          </h3>
          <p
            className="text-sm"
            style={{ color: "var(--color-text-secondary)" }}
          >
            برای شروع، چند آیتم خوشمزه اضافه کنید.
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div layout={!reducedMotion} className="flex flex-col gap-3">
      <AnimatePresence initial={false} mode="popLayout">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </AnimatePresence>
    </motion.div>
  );
};

export default CartContent;
