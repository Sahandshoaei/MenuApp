import type { OrderStatus } from "@/entities/order/types/order";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

const STATUS_CONFIG: Record<OrderStatus, { label: string; color: string; bg: string }> = {
  pending: { label: "Pending", color: "#c9a876", bg: "rgba(201,168,118,0.12)" },
  accepted: { label: "Accepted", color: "#e8832a", bg: "rgba(232,131,42,0.12)" },
  preparing: { label: "Preparing", color: "#e8832a", bg: "rgba(232,131,42,0.12)" },
  ready: { label: "Ready", color: "#f5a84e", bg: "rgba(245,168,78,0.15)" },
  served: { label: "Served", color: "#6fb37a", bg: "rgba(111,179,122,0.12)" },
  cancelled: { label: "Cancelled", color: "#d9695a", bg: "rgba(217,105,90,0.12)" },
};

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];

  return (
    <span
      className="
        rounded-full
        px-3
        py-1
        text-xs
        font-medium
      "
      style={{
        color: config.color,
        background: config.bg,
      }}
    >
      {config.label}
    </span>
  );
};