import type { Order, OrderStatus } from "@/entities/order/types/order";
import OrderProgressTracker from "./OrderProgressTracker";

interface ActiveOrderCardProps {
  order: Order;
}

const STATUS_LABEL: Record<OrderStatus, string> = {
  pending: "Pending",
  accepted: "Accepted",
  preparing: "Preparing",
  ready: "Ready",
  served: "Served",
  cancelled: "Cancelled",
};

const STATUS_COLOR: Record<OrderStatus, string> = {
  pending: "var(--color-accent-soft)",
  accepted: "var(--color-accent)",
  preparing: "var(--color-accent)",
  ready: "#6fb37a",
  served: "#6fb37a",
  cancelled: "#d9695a",
};

export const ActiveOrderCard = ({ order }: ActiveOrderCardProps) => {
  return (
    <div
      className="
        mb-8
        rounded-3xl
        p-5
      "
      style={{
        background: "var(--color-surface)",
        border: "0.5px solid var(--color-border)",
        boxShadow: "0 8px 24px rgba(34,28,94,0.08)",
      }}
    >
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p
            className="text-xs font-semibold tracking-[0.2em]"
            style={{ color: "var(--color-accent)" }}
          >
            LIVE ORDER
          </p>

          <h2 className="mt-1 text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
            #{order.id.slice(0, 8)}
          </h2>

          <div className="mt-2 flex flex-wrap gap-2">
            {order.items.map((item) => (
              <span
                key={item.id}
                className="rounded-lg px-3 py-1 text-xs"
                style={{
                  background: "var(--color-bg)",
                  border: "0.5px solid var(--color-border)",
                  color: "var(--color-text-secondary)",
                }}
              >
                {item.name} ×{item.quantity}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center gap-8">
            <div>
              <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                Table
              </p>
              <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                {order.tableId}
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs" style={{ color: "var(--color-text-secondary)" }}>
                Total
              </p>
              <p className="text-lg font-bold" style={{ color: "var(--color-text-primary)" }}>
                ${order.totalPrice.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div
            className="h-2 w-2 rounded-full"
            style={{ background: STATUS_COLOR[order.status] }}
          />

          <span
            className="text-sm font-medium"
            style={{ color: STATUS_COLOR[order.status] }}
          >
            {STATUS_LABEL[order.status]}
          </span>
        </div>
      </div>

      <OrderProgressTracker status={order.status} />
    </div>
  );
};