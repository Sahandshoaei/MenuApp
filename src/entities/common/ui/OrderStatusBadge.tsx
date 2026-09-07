import type { OrderStatus } from "@/entities/order/types/order";
import { ORDER_STATUS_CONFIG } from "../lib/statusConfig";

interface OrderStatusBadgeProps {
  status: OrderStatus;
}

export const OrderStatusBadge = ({ status }: OrderStatusBadgeProps) => {
  const config = ORDER_STATUS_CONFIG[status];

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
