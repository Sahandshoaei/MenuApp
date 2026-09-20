import { ChevronLeft } from "lucide-react";
import { TableCell, TableRow } from "@/shared/table";
import LoyaltyRankBadge from "./LoyaltyRankBadge";
import type { CustomerRow as CustomerRowType } from "@/widgets/admin/customers/lib/useCustomersData";

interface CustomerRowProps {
  customer: CustomerRowType;
  onClick: () => void;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const formatNumber = (value: number) => value.toLocaleString("fa-IR");

const formatAmount = (value: number) =>
  value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const formatRelativeDate = (iso: string | null) => {
  if (!iso) return "—";

  const diffDays = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "امروز";
  if (diffDays === 1) return "دیروز";
  return `${formatNumber(diffDays)} روز پیش`;
};

const CustomerRow = ({ customer, onClick }: CustomerRowProps) => {
  return (
    <TableRow
      onClick={onClick}
      className="cursor-pointer border-[var(--color-border)] hover:bg-[var(--color-accent-tint)]"
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[var(--color-accent-tint-strong)] text-xs text-[var(--color-accent)]">
            {getInitials(customer.name)}
          </div>

          {/*
            مثل ستون «اقلام» در جدول سفارش‌ها: محدودیت عرض باید روی یک
            عنصر داخلی باشد، چون مرورگر max-width را روی خود <td> نادیده
            می‌گیرد و نام‌های بلند عرض بقیه‌ی ستون‌ها را جابه‌جا می‌کنند.
          */}
          <span
            className="max-w-[180px] truncate text-sm text-[var(--color-text-primary)]"
            title={customer.name}
          >
            {customer.name}
          </span>
        </div>
      </TableCell>

      {/* شماره تماس لاتین است و نباید معکوس دیده شود */}
      <TableCell
        dir="ltr"
        className="w-[140px] text-start text-sm text-[var(--color-text-secondary)]"
      >
        {customer.phone}
      </TableCell>

      <TableCell className="w-[100px] text-sm text-[var(--color-text-primary)]">
        {formatNumber(customer.ordersCount)}
      </TableCell>

      <TableCell className="w-[120px] text-sm text-[var(--color-text-primary)]">
        {formatAmount(customer.totalSpent)}
      </TableCell>

      <TableCell className="w-[110px]">
        <LoyaltyRankBadge rank={customer.rank} />
      </TableCell>

      <TableCell className="w-[120px] text-sm text-[var(--color-text-secondary)]">
        {formatRelativeDate(customer.lastOrderAt)}
      </TableCell>

      <TableCell className="w-[40px]">
        <ChevronLeft size={16} className="text-[var(--color-text-secondary)]" />
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
