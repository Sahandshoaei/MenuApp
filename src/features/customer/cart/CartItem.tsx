import { motion } from "framer-motion";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { CartItem as CartItemType } from "../../../entities/cart/types/cart";
import { useCart } from "../../../entities/cart/hooks/useCart";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";
import { formatToman } from "@/shared/format/money";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({ item }: CartItemProps) => {
  const { increase, decrease, remove } = useCart();
  const itemTotal = item.price * item.quantity;
  const reducedMotion = usePrefersReducedMotion();

  return (
    <motion.div
      layout={!reducedMotion}
      initial={reducedMotion ? false : { opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={
        reducedMotion
          ? { opacity: 0 }
          : { opacity: 0, y: -8, scale: 0.96, height: 0, marginBottom: 0 }
      }
      transition={reducedMotion ? { duration: 0.12 } : spring.soft}
      className="flex items-center justify-between gap-4 overflow-hidden rounded-xl p-3"
      style={{
        background: "var(--color-surface)",
        border: "0.5px solid var(--color-border)",
      }}
    >
      <div className="min-w-0 flex-1 text-right">
        <h3
          className="truncate text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {item.name}
        </h3>

        <p
          className="mt-1 text-xs"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {formatToman(item.price)}
        </p>

        {item.note && (
          <p
            className="mt-1 truncate text-[11px]"
            style={{ color: "var(--color-accent-soft)" }}
          >
            {item.note}
          </p>
        )}
      </div>

      <div className="flex items-center gap-2">
        <motion.button
          type="button"
          whileTap={reducedMotion ? undefined : { scale: 0.88 }}
          onClick={() => decrease(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            background: "var(--color-accent-tint)",
            border: "0.5px solid var(--color-border)",
            color: "var(--color-accent)",
          }}
        >
          <Minus size={13} />
        </motion.button>

        <motion.span
          key={item.quantity}
          initial={reducedMotion ? false : { scale: 0.8, opacity: 0.5 }}
          animate={{ scale: 1, opacity: 1 }}
          className="min-w-[20px] text-center text-sm font-medium"
          style={{ color: "var(--color-text-primary)" }}
        >
          {item.quantity}
        </motion.span>

        <motion.button
          type="button"
          whileTap={reducedMotion ? undefined : { scale: 0.88 }}
          onClick={() => increase(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{
            background: "var(--color-accent-tint)",
            border: "0.5px solid var(--color-border)",
            color: "var(--color-text-primary)",
          }}
        >
          <Plus size={13} />
        </motion.button>
      </div>

      <div className="flex items-center gap-2">
        <span
          className="min-w-[72px] text-left text-sm font-semibold"
          style={{ color: "var(--color-text-primary)" }}
        >
          {formatToman(itemTotal)}
        </span>

        <motion.button
          type="button"
          whileTap={reducedMotion ? undefined : { scale: 0.88, rotate: -8 }}
          onClick={() => remove(item.id)}
          className="flex h-7 w-7 items-center justify-center rounded-lg"
          style={{ color: "var(--color-accent-soft)" }}
          aria-label={`حذف ${item.name}`}
        >
          <Trash2 size={14} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CartItem;
