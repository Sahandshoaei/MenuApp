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
    <Card className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <Table>
        <TableHeader>
          <TableRow className="border-[var(--color-border)] hover:bg-transparent">
            <TableHead className="text-xs text-[var(--color-text-secondary)]">
              مشتری
            </TableHead>
            <TableHead className="w-[180px] text-xs text-[var(--color-text-secondary)]">
              شماره تماس
            </TableHead>
            <TableHead className="w-[180px] text-xs text-[var(--color-text-secondary)]">
              تعداد سفارش
            </TableHead>
            <TableHead className="w-[180px] text-xs text-[var(--color-text-secondary)]">
              مجموع خرید
            </TableHead>
            <TableHead className="w-[180px] text-xs text-[var(--color-text-secondary)]">
              رتبه
            </TableHead>
            <TableHead className="w-[120px] text-xs text-[var(--color-text-secondary)]">
              آخرین سفارش
            </TableHead>
            <TableHead className="w-[40px]" />
          </TableRow>
        </TableHeader>

        <TableBody>
          {customers.length === 0 ? (
            <TableRow className="border-[var(--color-border)] hover:bg-transparent">
              <TableCell
                colSpan={7}
                className="py-8 text-center text-sm text-[var(--color-text-secondary)]"
              >
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
