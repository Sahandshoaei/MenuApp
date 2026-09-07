import type { Order } from "@/entities/order/types/order";
import { OrderHistoryCard } from "@/features/customer/order/OrderHistoryCard";

interface OrderHistoryListProps {
  orders: Order[];
}

export const OrderHistoryList = ({ orders }: OrderHistoryListProps) => {
  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <OrderHistoryCard key={order.id} order={order} />
      ))}
    </div>
  );
};