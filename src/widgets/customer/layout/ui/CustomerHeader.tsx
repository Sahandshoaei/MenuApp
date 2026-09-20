import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bell, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../../../entities/customer/hooks/useCustomer";
import { useNotification } from "../../../../entities/notification/hooks/useNotification";
import { useCart } from "../../../../entities/cart/hooks/useCart";
import {
  CART_BUTTON_DOM_ID,
  useFlyToCartOptional,
} from "../../cart/FlyToCartContext";
import ThemeToggle from "@/features/customer/theme/ThemeToggle";
import { layoutId } from "@/shared/animations/layoutIds";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

interface CustomerHeaderProps {
  onCartClick: () => void;
  onProfileClick?: () => void;
}

export function CustomerHeader({
  onCartClick,
  onProfileClick,
}: CustomerHeaderProps) {
  const navigate = useNavigate();
  const { customer } = useCustomer();
  const { unreadCount } = useNotification();
  const { count } = useCart();
  const fly = useFlyToCartOptional();
  const reducedMotion = usePrefersReducedMotion();

  const prevCountRef = useRef(count);
  const [bumpKey, setBumpKey] = useState(0);

  useEffect(() => {
    if (count > prevCountRef.current) {
      setBumpKey((k) => k + 1);
    }
    prevCountRef.current = count;
  }, [count]);

  const pulseKey = (fly?.badgePulseKey ?? 0) + bumpKey;

  return (
    <header
      className="flex items-center justify-between p-3 transition-colors duration-300"
      style={{
        background: "var(--color-header-bg)",
        color: "var(--color-header-text)",
      }}
    >
      <button
        type="button"
        className="flex cursor-pointer items-center gap-3 text-right"
        onClick={() => {
          if (customer) navigate("/profile");
          else onProfileClick?.();
        }}
      >
        <div
          className="flex h-10 w-10 items-center justify-center rounded-full font-bold"
          style={{
            background: "var(--color-header-avatar-bg)",
            color: "var(--color-header-avatar-text)",
          }}
        >
          {customer?.name?.charAt(0) ?? "م"}
        </div>

        <div>
          <p
            className="font-semibold"
            style={{ color: "var(--color-header-text)" }}
          >
            {customer?.name ?? "مهمان"}
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-header-muted)" }}
          >
            {customer ? "خوش آمدید" : "ورود / ثبت‌نام"}
          </p>
        </div>
      </button>

      <div className="flex items-center gap-2.5">
        <ThemeToggle />

        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur"
          style={{
            background: "var(--color-header-chip)",
            borderColor: "var(--color-header-chip-border)",
            color: "var(--color-header-text)",
          }}
          onClick={() => navigate("/notifications")}
          aria-label="اعلان‌ها"
        >
          <Bell size={18} />

          <AnimatePresence>
            {unreadCount > 0 && (
              <motion.span
                initial={reducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="
                  absolute -left-1 -top-1 flex h-5 min-w-[20px]
                  items-center justify-center rounded-full bg-red-500
                  px-1 text-[10px] font-bold text-white
                "
              >
                {unreadCount > 99 ? "۹۹+" : unreadCount}
              </motion.span>
            )}
          </AnimatePresence>
        </button>

        <motion.button
          ref={fly?.cartButtonRef}
          id={CART_BUTTON_DOM_ID}
          type="button"
          onClick={onCartClick}
          aria-label={`سبد خرید، ${count} مورد`}
          whileTap={reducedMotion ? undefined : { scale: 0.9 }}
          animate={
            reducedMotion || pulseKey === 0
              ? { scale: 1 }
              : { scale: [1, 1.18, 1] }
          }
          transition={spring.snappy}
          className="relative flex h-10 w-10 items-center justify-center rounded-full border backdrop-blur"
          style={{
            background: "var(--color-header-chip)",
            borderColor: "var(--color-header-chip-border)",
            color: "var(--color-header-text)",
          }}
        >
          <ShoppingBag size={18} />

          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key="cart-badge"
                layoutId={layoutId.cartBadge}
                initial={reducedMotion ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={spring.snappy}
                className="
                  absolute -left-1 -top-1 flex h-5 min-w-[20px]
                  items-center justify-center rounded-full px-1
                  text-[10px] font-bold
                "
                style={{
                  background: "var(--color-accent-strong)",
                  color: "var(--color-bg)",
                  boxShadow: "0 2px 8px var(--color-shadow)",
                }}
              >
                {count > 99 ? "۹۹+" : count}
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}
