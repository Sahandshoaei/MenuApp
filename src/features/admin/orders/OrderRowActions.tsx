import { Eye } from "lucide-react";
import type { Order } from "@/entities/order/types/order";

interface OrderRowActionsProps {
  order: Order;
  onView: (order: Order) => void;
}

const OrderRowActions = ({ order, onView }: OrderRowActionsProps) => {
  return (
    <div className="flex items-center justify-end">
      <button
        type="button"
        onClick={() => onView(order)}
        className="rounded-lg p-1.5 text-zinc-400 transition-colors hover:bg-white/5 hover:text-zinc-200"
        title="جزئیات سفارش"
      >
        <Eye size={15} />
      </button>
    </div>
  );
};

export default OrderRowActions;