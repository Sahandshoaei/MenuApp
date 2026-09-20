import { ShoppingBag, X } from "lucide-react";
import { useCart } from "../../../entities/cart/hooks/useCart";

type CartHeaderProps = {
  onClose: () => void;
};

const CartHeader = ({ onClose }: CartHeaderProps) => {
  const { count } = useCart();

  return (
    <div
      className="flex items-center justify-between p-5"
      style={{ borderBottom: "0.5px solid var(--color-border)" }}
    >
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-xl"
          style={{
            background: "var(--color-accent-tint-strong)",
            border: "0.5px solid var(--color-border-strong)",
          }}
        >
          <ShoppingBag size={16} style={{ color: "var(--color-accent)" }} />
        </div>

        <div>
          <h2
            className="text-base font-semibold"
            style={{ color: "var(--color-text-primary)" }}
          >
            سبد خرید
          </h2>

          <p
            className="text-xs"
            style={{ color: "var(--color-text-secondary)" }}
          >
            {count} مورد
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="بستن سبد"
        className="flex h-8 w-8 items-center justify-center rounded-lg"
        style={{
          background: "var(--color-surface)",
          border: "0.5px solid var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        <X size={15} />
      </button>
    </div>
  );
};

export default CartHeader;
