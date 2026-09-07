import { useMemo, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectAllOrders } from "@/entities/order/state/orderSelector";
import { selectProfiles } from "@/entities/customer/state/customerSelector";
import type { Order, OrderStatus } from "@/entities/order/types/order";
import type { Customer } from "@/entities/customer/types/customer";

export type OrderStatusFilter = "all" | OrderStatus;

export interface OrderRow {
  order: Order;
  customer: Customer | null;
}

export const PAGE_SIZE_OPTIONS = [5, 10, 20, 50] as const;

export const useOrdersTableData = () => {

  const orders = useAppSelector(selectAllOrders);
  const profiles = useAppSelector(selectProfiles);
  const [statusFilter, setStatusFilter] = useState<OrderStatusFilter>("all");
  const [dateFilter, setDateFilter] = useState(""); // "" یعنی بدون فیلتر، در غیر این صورت yyyy-mm-dd
  const [pageSize, setPageSize] = useState<number>(5);
  const [page, setPage] = useState(1);
 

  const rows: OrderRow[] = useMemo(() => {
    let result = [...orders].sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    if (statusFilter !== "all") {
      result = result.filter((order) => order.status === statusFilter);
    }

    if (dateFilter) {
      result = result.filter((order) => order.createdAt.slice(0, 10) === dateFilter);
    }

    return result.map((order) => ({
      order,
      customer: profiles[order.customerId] ?? null,
    }));
  }, [orders, profiles, statusFilter, dateFilter]);

  const totalPages = Math.max(1, Math.ceil(rows.length / pageSize));
  const currentPage = Math.min(page, totalPages);

  const pageRows = rows.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const changeStatusFilter = (value: OrderStatusFilter) => {
    setStatusFilter(value);
    setPage(1);
  };

  const changeDateFilter = (value: string) => {
    setDateFilter(value);
    setPage(1);
  };

  const changePageSize = (value: number) => {
    setPageSize(value);
    setPage(1);
  };






  return {
    statusFilter,
    changeStatusFilter,
    dateFilter,
    changeDateFilter,
    pageSize,
    changePageSize,
    pageRows,
    totalCount: rows.length,
    currentPage,
    totalPages,
    setPage,
  };
};
