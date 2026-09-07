import { ArrowRight, Trash2 } from "lucide-react";
import Button from "../../../shared/Button";
import { useCart } from "../../../entities/cart/hooks/useCart";
import { useRestaurant } from "../../../entities/restaurant/hooks/useRestaurant";
import TableSelector from "@/features/customer/cart/TableSelector";
import type { Table } from "../../../entities/table/types/table";

type CartFooterProps = {
  onCheckout: () => void;
  availableTables: Table[];
  selectedTableId: string | null;
  onSelectTable: (tableId: string) => void;
};

const CartFooter = ({
  onCheckout,
  availableTables,
  selectedTableId,
  onSelectTable,
}: CartFooterProps) => {
  const {
    items,
    count,
    total,
    isEmpty,
    clear,
  } = useCart();

  const { settings } = useRestaurant();
  const { orderingEnabled } = settings;

  const canCheckout =
    orderingEnabled && !isEmpty && Boolean(selectedTableId);

  return (
    <div
      className="p-5"
      style={{
        borderTop: "0.5px solid var(--color-border)",
      }}
    >
      {/* Clear cart */}
      {!isEmpty && (
        <button
          type="button"
          onClick={clear}
          className="
            mb-3
            flex
            items-center
            gap-1.5
            text-xs
            transition-colors
          "
          style={{
            color: "var(--color-accent-soft)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color =
              "#e05a4a";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color =
              "var(--color-accent-soft)";
          }}
        >
          <Trash2 size={12} />

          Clear cart
        </button>
      )}

      {/* Ordering disabled by admin */}
      {!orderingEnabled && (
        <div
          className="mb-4 rounded-xl p-3 text-center text-xs"
          style={{
            background: "rgba(224,90,74,0.08)",
            border: "0.5px solid rgba(224,90,74,0.25)",
            color: "#e05a4a",
          }}
        >
          سیستم سفارش‌گیری در حال حاضر غیرفعال است.
        </div>
      )}

      {/* Table selection */}
      <TableSelector
        tables={availableTables}
        selectedTableId={selectedTableId}
        onSelect={onSelectTable}
      />

      {/* Summary */}
      <div
        className="mb-4 rounded-xl p-4"
        style={{
          background: "var(--color-surface)",
          border: "0.5px solid var(--color-border)",
        }}
      >
        {/* Total items */}
        <div
          className="mb-2 flex justify-between text-xs"
          style={{
            color: "var(--color-text-secondary)",
          }}
        >
          <span>Total Items</span>

          <span>{count}</span>
        </div>

        <div
          className="h-px w-full"
          style={{
            background: "var(--color-border)",
          }}
        />

        {/* Total price */}
        <div className="mt-2 flex justify-between">
          <span
            className="text-sm font-medium"
            style={{
              color: "var(--color-text-secondary)",
            }}
          >
            Total
          </span>

          <span
            className="text-lg font-semibold"
            style={{
              color: "var(--color-accent-strong)",
            }}
          >
            ${total.toFixed(2)}
          </span>
        </div>
      </div>

      {/* Checkout */}
      <Button
        type="button"
        disabled={!canCheckout}
        onClick={onCheckout}
        className="
          flex
          w-full
          items-center
          justify-center
          gap-2
          rounded-xl
          py-3.5
          text-sm
          font-medium
          text-white
          transition-opacity
          hover:opacity-90
          disabled:opacity-40
        "
        style={{
          background: canCheckout
            ? "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))"
            : "var(--color-surface)",

          boxShadow: canCheckout
            ? "0 4px 16px rgba(34,28,94,0.25)"
            : "none",

          border: canCheckout
            ? "none"
            : "0.5px solid var(--color-border)",

          color: canCheckout
            ? "#fff"
            : "var(--color-accent-soft)",
        }}
      >
        {orderingEnabled ? "Checkout" : "سفارش‌گیری غیرفعال است"}

        {orderingEnabled && <ArrowRight size={15} />}
      </Button>
    </div>
  );
};

export default CartFooter;
