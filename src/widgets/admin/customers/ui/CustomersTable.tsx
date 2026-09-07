import Card from "@/shared/Card";
import CustomerRow from "@/features/admin/customers/CustomerRow";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/table";
import type { CustomerRow as CustomerRowType } from "../lib/useCustomersData";

interface CustomersTableProps {
  customers: CustomerRowType[];
  onSelect: (id: string) => void;
}

const CustomersTable = ({ customers, onSelect }: CustomersTableProps) => {
  return (
    <Card className="overflow-hidden rounded-2xl border border-amber-900/20 bg-[#1a120b]">
      <Table>
        <TableHeader>
          <TableRow className="border-amber-900/20 hover:bg-transparent">
            <TableHead className="text-xs text-zinc-400">Customer</TableHead>
            <TableHead className="text-xs text-zinc-400">Phone</TableHead>
            <TableHead className="text-xs text-zinc-400">Orders</TableHead>
            <TableHead className="text-xs text-zinc-400">Total Spent</TableHead>
            <TableHead className="text-xs text-zinc-400">Rank</TableHead>
            <TableHead className="text-xs text-zinc-400">Last Order</TableHead>
            <TableHead className="w-8" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow className="border-amber-900/10 hover:bg-transparent">
              <TableCell colSpan={7} className="py-8 text-center text-sm text-zinc-500">
                هنوز مشتری‌ای ثبت‌نام نکرده.
              </TableCell>
            </TableRow>
          ) : (
            customers.map((customer) => (
              <CustomerRow
                key={customer.id}
                customer={customer}
                onClick={() => onSelect(customer.id)}
              />
            ))
          )}
        </TableBody>
      </Table>
    </Card>
  );
};

export default CustomersTable;
