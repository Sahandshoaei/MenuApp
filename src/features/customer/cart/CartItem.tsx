import {Minus,Plus,Trash2} from "lucide-react";
import type { CartItem as CartItemType } from "../../../entities/cart/types/cart";
import { useCart } from "../../../entities/cart/hooks/useCart";

type CartItemProps = {
  item: CartItemType;
};

const CartItem = ({item}: CartItemProps) => {

  const {increase,decrease,remove} = useCart();
  const itemTotal = item.price * item.quantity;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        gap-4
        rounded-xl
        p-3
      "
      style={{
        background: "var(--color-surface)",
        border:
          "0.5px solid var(--color-border)",
      }}
    >
      {/* Item information */}
      <div className="min-w-0 flex-1">
        <h3
          className="
            truncate
            text-sm
            font-medium
          "
          style={{
            color: "var(--color-text-primary)",
          }}
        >
          {item.name}
        </h3>

        <p
          className="mt-1 text-xs"
          style={{
            color: "var(--color-text-secondary)",
          }}
        >
          ${item.price.toFixed(2)}
        </p>

        {item.note && (
          <p
            className="
              mt-1
              truncate
              text-[11px]
            "
            style={{
              color: "var(--color-accent-soft)",
            }}
          >
            {item.note}
          </p>
        )}
      </div>

      {/* Quantity controls */}
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={() =>
            decrease(item.id)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
          "
          style={{
            background: "var(--color-accent-tint)",
            border:
              "0.5px solid var(--color-border)",
            color: "var(--color-accent)",
          }}
        >
          <Minus size={13} />
        </button>

        <span
          className="
            min-w-[20px]
            text-center
            text-sm
            font-medium
          "
          style={{
            color: "var(--color-text-primary)",
          }}
        >
          {item.quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            increase(item.id)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
          "
          style={{
            background: "var(--color-accent-tint)",
            border:
              "0.5px solid var(--color-border)",
            color: "var(--color-text-primary)",
          }}
        >
          <Plus size={13} />
        </button>
      </div>

      {/* Total + remove */}
      <div className="flex items-center gap-2">
        <span
          className="
            min-w-[55px]
            text-right
            text-sm
            font-semibold
          "
          style={{
            color: "var(--color-text-primary)",
          }}
        >
          ${itemTotal.toFixed(2)}
        </span>

        <button
          type="button"
          onClick={() =>
            remove(item.id)
          }
          className="
            flex
            h-7
            w-7
            items-center
            justify-center
            rounded-lg
          "
          style={{
            color: "var(--color-accent-soft)",
          }}
        >
          <Trash2 size={14} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;