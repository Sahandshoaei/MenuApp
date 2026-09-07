import type { Order } from "@/entities/order/types/order";
import { OrderStatusBadge } from "./OrderStatusBadge";

interface OrderHistoryCardProps {
  order: Order;
}

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString([], { day: "2-digit", month: "short" });

export const OrderHistoryCard = ({ order }: OrderHistoryCardProps) => {
  const itemsLabel = order.items
    .map((item) => `${item.quantity}× ${item.name}`)
    .join(", ");

  return (
    <div
      className="
        rounded-2xl
        p-4
      "
      style={{
        background: "var(--color-surface)",
        border: "0.5px solid var(--color-border)",
      }}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium" style={{ color: "var(--color-text-primary)" }}>
            Order #{order.id.slice(0, 8)}
          </p>

          <p className="mt-0.5 text-xs" style={{ color: "var(--color-accent-soft)" }}>
            {formatDate(order.createdAt)}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />
      </div>

      <p
        className="mt-2 truncate text-xs"
        style={{ color: "var(--color-text-secondary)" }}
      >
        {itemsLabel}
      </p>

      <p className="mt-2 text-sm font-semibold" style={{ color: "var(--color-text-primary)" }}>
        ${order.totalPrice.toFixed(2)}
      </p>
    </div>
  );
};