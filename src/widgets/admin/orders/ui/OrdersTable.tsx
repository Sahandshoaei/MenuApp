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
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-400">
          <span>Show</span>
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
        </div>

        <div className="flex flex-1 items-center justify-end gap-3">
          <DateFilterButton value={dateFilter} onChange={changeDateFilter} />

          <Select
            className="h-10 w-[120px]"
            value={statusFilter}
            onChange={(e) => changeStatusFilter(e.target.value as OrderStatusFilter)}
          >
            <option value="all">All</option>
            {ORDER_STATUS_LIST.map((status) => (
              <option key={status} value={status}>
                {ORDER_STATUS_CONFIG[status].label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      {/* Table */}
      <Card className="overflow-hidden rounded-2xl border border-amber-900/20 bg-[#1a120b]">
        <Table>
          <TableHeader>
            <TableRow className="border-amber-900/20 hover:bg-transparent">
        
              <TableHead className="text-xs text-zinc-400">ID</TableHead>
              <TableHead className="text-xs text-zinc-400">Table</TableHead>
              <TableHead className="text-xs text-zinc-400">Items</TableHead>
              <TableHead className="text-xs text-zinc-400">Date</TableHead>
              <TableHead className="text-xs text-zinc-400">Price</TableHead>
              <TableHead className="text-xs text-zinc-400">Status</TableHead>
              <TableHead className="text-right text-xs text-zinc-400">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {pageRows.length === 0 ? (
              <TableRow className="border-amber-900/10 hover:bg-transparent">
                <TableCell colSpan={7} className="py-8 text-center text-sm text-zinc-500">
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

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-zinc-500">
          Showing {pageRows.length} of {totalCount} entries
        </span>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setPage(currentPage - 1)}
            className="
              rounded-lg
              border
              border-amber-900/30
              px-3
              py-1.5
              text-xs
              text-zinc-300
              transition-colors
              hover:bg-white/5
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Previous
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
                    ? "bg-primary text-white"
                    : "text-zinc-400 hover:bg-white/5"
                }
              `}
            >
              {pageNumber}
            </button>
          ))}

          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setPage(currentPage + 1)}
            className="
              rounded-lg
              border
              border-amber-900/30
              px-3
              py-1.5
              text-xs
              text-zinc-300
              transition-colors
              hover:bg-white/5
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            Next
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
