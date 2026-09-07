import { ChevronRight } from "lucide-react";
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

const formatRelativeDate = (iso: string | null) => {
  if (!iso) return "—";

  const diffDays = Math.floor(
    (Date.now() - new Date(iso).getTime()) / (1000 * 60 * 60 * 24)
  );

  if (diffDays <= 0) return "امروز";
  if (diffDays === 1) return "دیروز";
  return `${diffDays} روز پیش`;
};

const CustomerRow = ({ customer, onClick }: CustomerRowProps) => {
  return (
    <TableRow
      onClick={onClick}
      className="cursor-pointer border-amber-900/10 hover:bg-white/5"
    >
      <TableCell>
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs text-primary">
            {getInitials(customer.name)}
          </div>
          <span className="truncate text-sm text-zinc-100">{customer.name}</span>
        </div>
      </TableCell>

      <TableCell className="text-sm text-zinc-400">{customer.phone}</TableCell>

      <TableCell className="text-sm text-zinc-200">{customer.ordersCount}</TableCell>

      <TableCell className="text-sm text-zinc-200">
        ${customer.totalSpent.toFixed(2)}
      </TableCell>

      <TableCell>
        <LoyaltyRankBadge rank={customer.rank} />
      </TableCell>

      <TableCell className="text-sm text-zinc-400">
        {formatRelativeDate(customer.lastOrderAt)}
      </TableCell>

      <TableCell>
        <ChevronRight size={16} className="justify-self-end text-zinc-500" />
      </TableCell>
    </TableRow>
  );
};

export default CustomerRow;
