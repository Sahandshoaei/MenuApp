import { Package } from "lucide-react";
import { useAppSelector } from "@/app/store/hooks";
import { selectOrderHistory } from "@/entities/order/state/orderSelector";

export default function OrdersHeader() {
  const history = useAppSelector(selectOrderHistory);

  return (
    <div
      className="flex items-center justify-between border-b pb-4"
      style={{ borderColor: "var(--color-border)" }}
    >
      <div className="text-right">
        <h1
          className="text-xl font-bold"
          style={{ color: "var(--color-text-primary)" }}
        >
          سفارش‌ها
        </h1>

        <p
          className="mt-1 text-sm"
          style={{ color: "var(--color-text-secondary)" }}
        >
          {history.length === 0
            ? "هنوز سفارشی ندارید"
            : `${history.length} سفارش تا الان`}
        </p>
      </div>

      <div
        className="flex h-9 w-9 items-center justify-center rounded-lg"
        style={{
          background: "var(--color-surface)",
          border: "0.5px solid var(--color-border-strong)",
        }}
      >
        <Package size={16} style={{ color: "var(--color-accent)" }} />
      </div>
    </div>
  );
}
