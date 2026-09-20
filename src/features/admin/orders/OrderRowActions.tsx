import { Eye } from "lucide-react";
import type { Order } from "@/entities/order/types/order";

interface OrderRowActionsProps {
  order: Order;
  onView: (order: Order) => void;
}

const OrderRowActions = ({ order, onView }: OrderRowActionsProps) => {
  return (
    <div className="flex items-center justify-start">
      <button
        type="button"
        onClick={() => onView(order)}
        className="rounded-lg p-1.5 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-text-primary)]"
        title="جزئیات سفارش"
      >
        <Eye size={15} />
      </button>
    </div>
  );
};

export default OrderRowActions;