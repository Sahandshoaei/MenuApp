import { useState } from "react";
import Card from "@/shared/Card";
import { Select } from "@/shared/select";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/shared/table";
import {
  useOrdersTableData,
  PAGE_SIZE_OPTIONS,
  type OrderStatusFilter,
} from "../lib/useOrdersTableData";
import DateFilterButton from "@/features/admin/orders/DateFilterButton";
import OrderTableRow from "@/features/admin/orders/OrderTableRow";
import OrderDetailsDialog from "@/features/admin/orders/OrderDetailsDialog";
import { ORDER_STATUS_CONFIG, ORDER_STATUS_LIST } from "@/entities/common/lib/statusConfig";
import type { Order } from "@/entities/order/types/order";

const toPersianDigits = (value: number) => value.toLocaleString("fa-IR");

const OrdersTable = () => {
  const {
    statusFilter,
    changeStatusFilter,
    dateFilter,
    changeDateFilter,
    pageSize,
    changePageSize,
    pageRows,
    totalCount,
    currentPage,
    totalPages,
    setPage,
  } = useOrdersTableData();

  const [viewingOrder, setViewingOrder] = useState<Order | null>(null);

  const viewingCustomer =
    viewingOrder != null
      ? pageRows.find((row) => row.order.id === viewingOrder.id)?.customer ?? null
      : null;

  return (
    <div dir="rtl" className="flex flex-col gap-4">
      {/* نوار ابزار */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
          <span>نمایش</span>
          <Select
            className="h-9 w-[72px] px-2"
            value={pageSize}
            onChange={(e) => changePageSize(Number(e.target.value))}
          >
            {PAGE_SIZE_OPTIONS.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
          <span>ردیف</span>
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <DateFilterButton value={dateFilter} onChange={changeDateFilter} />

          <Select
            className="h-10 w-[150px]"
            value={statusFilter}
            onChange={(e) => changeStatusFilter(e.target.value as OrderStatusFilter)}
          >
            <option value="all">همه وضعیت‌ها</option>
            {ORDER_STATUS_LIST.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_CONFIG[status].label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* جدول */}
      <Card className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
        <Table>
          <TableHeader>
            <TableRow className="border-[var(--color-border)] hover:bg-transparent">
              <TableHead className="w-[90px] text-xs text-[var(--color-text-secondary)]">
                شناسه
              </TableHead>
              <TableHead className="w-[70px] text-xs text-[var(--color-text-secondary)]">
                میز
              </TableHead>
              <TableHead className="text-xs text-[var(--color-text-secondary)]">
                اقلام
              </TableHead>
              <TableHead className="w-[170px] text-xs text-[var(--color-text-secondary)]">
                تاریخ
              </TableHead>
              <TableHead className="w-[110px] text-xs text-[var(--color-text-secondary)]">
                مبلغ
              </TableHead>
              <TableHead className="w-[130px] text-xs text-[var(--color-text-secondary)]">
                وضعیت
              </TableHead>
              <TableHead className="w-[70px] text-xs text-[var(--color-text-secondary)]">
                عملیات
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow className="border-[var(--color-border)] hover:bg-transparent">
                <TableCell
                  colSpan={7}
                  className="py-8 text-center text-sm text-[var(--color-text-secondary)]"
                >
                  سفارشی برای نمایش وجود ندارد.
                </TableCell>
              </TableRow>
            ) : (
              pageRows.map(({ order }) => (
                <OrderTableRow
                  key={order.id}
                  order={order}
                  onView={setViewingOrder}
                />
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      {/* صفحه‌بندی */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          نمایش {toPersianDigits(pageRows.length)} سفارش از مجموع{" "}
          {toPersianDigits(totalCount)} سفارش
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="
              rounded-lg
              border
              border-[var(--color-border-strong)]
              px-3
              py-1.5
              text-xs
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-[var(--color-accent-tint)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            قبلی
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNumber) => (
            <button
              key={pageNumber}
              type="button"
              onClick={() => setPage(pageNumber)}
              className={`
                h-7
                w-7
                rounded-lg
                text-xs
                transition-colors
                ${
                  currentPage === pageNumber
                    ? "bg-[var(--color-accent)] text-white"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
                }
              `}
            >
              {toPersianDigits(pageNumber)}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="
              rounded-lg
              border
              border-[var(--color-border-strong)]
              px-3
              py-1.5
              text-xs
              text-[var(--color-text-secondary)]
              transition-colors
              hover:bg-[var(--color-accent-tint)]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            بعدی
          </button>
        </div>
      </div>

      <OrderDetailsDialog
        order={viewingOrder}
        customer={viewingCustomer}
        onClose={() => setViewingOrder(null)}
      />
    </div>
  );
};

export default OrdersTable;
