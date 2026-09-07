import { TableCell, TableRow } from "@/shared/table";
import { OrderStatusBadge } from "@/entities/common/ui/OrderStatusBadge";
import type { Order } from "@/entities/order/types/order";
import OrderRowActions from "./OrderRowActions";

interface OrderTableRowProps {
  order: Order;
  onView: (order: Order) => void;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);
  const day = date.toLocaleDateString("en-GB").split("/").join("-");
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
};

const OrderTableRow = ({ order, onView }: OrderTableRowProps) => {
  const itemsSummary = order.items.map((item) => item.name).join(", ");

  return (
    <TableRow className="border-amber-900/10 hover:bg-white/[0.02]">
     
      <TableCell className="text-sm text-zinc-200">
        #{order.id.slice(0, 6)}
      </TableCell>

      <TableCell className="text-sm text-zinc-200">
        {order.tableId}
      </TableCell>

      <TableCell className="max-w-[220px] truncate text-sm text-zinc-400">
        {itemsSummary}
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {formatDate(order.createdAt)}
      </TableCell>

      <TableCell className="text-sm text-zinc-200">
        ${order.totalPrice.toFixed(2)}
      </TableCell>

      <TableCell>
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell>
        <OrderRowActions order={order} onView={onView} />
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
