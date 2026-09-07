import { ShoppingBag } from "lucide-react";
import { useCart } from "../../../entities/cart/hooks/useCart";
import CartItem from "../../../features/customer/cart/CartItem";

const CartContent = () => {
  const { items, isEmpty } = useCart();

  if (isEmpty) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
        {/* Empty icon */}
        <div
          className="
            flex
            h-20
            w-20
            items-center
            justify-center
            rounded-2xl
          "
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

        {/* Empty message */}
        <div>
          <h3
            className="mb-1 text-base font-semibold"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            Cart is empty
          </h3>

          <p
            className="text-sm"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            Add some delicious food to get started.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <CartItem
          key={item.id}
          item={item}
        />
      ))}
    </div>
  );
};

export default CartContent;
