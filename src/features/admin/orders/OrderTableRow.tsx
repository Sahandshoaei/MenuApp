import { TableCell, TableRow } from "@/shared/table";
import { OrderStatusBadge } from "@/entities/common/ui/OrderStatusBadge";
import type { Order } from "@/entities/order/types/order";
import OrderRowActions from "./OrderRowActions";

interface OrderTableRowProps {
  order: Order;
  onView: (order: Order) => void;
}

// تاریخ شمسی + ساعت، با ارقام فارسی
const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} - ${time}`;
};

const formatNumber = (value: number) =>
  value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderTableRow = ({ order, onView }: OrderTableRowProps) => {
  const itemsSummary = order.items.map((item) => item.name).join("، ");

  return (
    <TableRow className="border-[var(--color-border)] hover:bg-[var(--color-accent-tint)]">
      {/* شناسه — با dir=ltr چون شناسه لاتین است و نباید معکوس دیده شود */}
      <TableCell
        dir="ltr"
        className="w-[90px] text-start text-sm text-[var(--color-text-primary)]"
      >
        #{order.id.slice(0, 6)}
      </TableCell>

      <TableCell className="w-[70px] text-sm text-[var(--color-text-primary)]">
        {order.tableId}
      </TableCell>

      {/*
        نکته‌ی مهم: max-width روی خودِ <td> توسط مرورگر نادیده گرفته می‌شود
        (در table-layout: auto). برای همین محدودیت عرض و truncate را روی یک
        div داخلی می‌گذاریم — وگرنه این ستون با سفارش‌های پر-آیتم کش می‌آید
        و عرض بقیه‌ی ستون‌ها را در هر صفحه جابه‌جا می‌کند.
      */}
      <TableCell className="text-sm text-[var(--color-text-secondary)]">
        <div className="max-w-[240px] truncate" title={itemsSummary}>
          {itemsSummary}
        </div>
      </TableCell>

      <TableCell className="w-[170px] text-sm text-[var(--color-text-secondary)]">
        {formatDate(order.createdAt)}
      </TableCell>

      <TableCell className="w-[110px] text-sm text-[var(--color-text-primary)]">
        {formatNumber(order.totalPrice)}
      </TableCell>

      <TableCell className="w-[130px]">
        <OrderStatusBadge status={order.status} />
      </TableCell>

      <TableCell className="w-[70px]">
        <OrderRowActions order={order} onView={onView} />
      </TableCell>
    </TableRow>
  );
};

export default OrderTableRow;
