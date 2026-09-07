// import { useMemo } from "react";
// import { useAppSelector } from "@/app/store/hooks";
// import { selectAllOrders } from "@/entities/order/state/orderSelector";
// import type { Order, OrderStatus } from "@/entities/order/types/order";
// import { ORDER_STATUS_LIST } from "@/entities/common/lib/statusConfig";
// import { menuService } from "@/entities/menu/services/menuService";

// const ACTIVE_STATUSES: OrderStatus[] = [
//   "pending",
//   "accepted",
//   "preparing",
//   "ready",
// ];

// const isToday = (isoDate: string) => {
//   const date = new Date(isoDate);
//   const now = new Date();

//   return (
//     date.getFullYear() === now.getFullYear() &&
//     date.getMonth() === now.getMonth() &&
//     date.getDate() === now.getDate()
//   );
// };

// const RECENT_ORDERS_LIMIT = 5;

// export interface DashboardStats {
//   todayOrdersCount: number;
//   todayRevenue: number;
//   activeOrdersCount: number;
//   menuItemsCount: number;
//   statusCounts: Record<OrderStatus, number>;
//   recentOrders: Order[];
// }

// export const useDashboardStats = (): DashboardStats => {
//   const orders = useAppSelector(selectAllOrders);

//   return useMemo(() => {
//     const todayOrders = orders.filter((order) => isToday(order.createdAt));

//     const todayRevenue = todayOrders
//       .filter((order) => order.status !== "cancelled")
//       .reduce((sum, order) => sum + order.totalPrice, 0);

//     const activeOrdersCount = orders.filter((order) =>
//       ACTIVE_STATUSES.includes(order.status)
//     ).length;

//     const statusCounts = ORDER_STATUS_LIST.reduce((acc, status) => {
//       acc[status] = 0;
//       return acc;
//     }, {} as Record<OrderStatus, number>);

//     orders.forEach((order) => {
//       statusCounts[order.status] += 1;
//     });

//     const recentOrders = [...orders]
//       .sort(
//         (a, b) =>
//           new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
//       )
//       .slice(0, RECENT_ORDERS_LIMIT);

//     return {
//       todayOrdersCount: todayOrders.length,
//       todayRevenue,
//       activeOrdersCount,
//       menuItemsCount: menuService.getMenuItems().length,
//       statusCounts,
//       recentOrders,
//     };
//   }, [orders]);
// };

// چرا همه‌چیز اینجا با useMemo محاسبه می‌شود؟
// چون orders از Redux می‌آید و ممکن است لیست بزرگی باشد؛
// نمی‌خواهیم هر رندر، دوباره فیلتر/sort/reduce انجام شود.
// فقط وقتی خودِ آرایه orders عوض شود، دوباره محاسبه می‌شود.

import { useMemo } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectAllOrders } from "@/entities/order/state/orderSelector";
import { selectAllMenuItems } from "@/entities/menu/state/menuSelector";
import type { Order, OrderStatus } from "@/entities/order/types/order";
import { ORDER_STATUS_LIST } from "@/entities/common/lib/statusConfig";

const ACTIVE_STATUSES: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
];

const isToday = (isoDate: string) => {
  const date = new Date(isoDate);
  const now = new Date();

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  );
};

const RECENT_ORDERS_LIMIT = 5;

export interface DashboardStats {
  todayOrdersCount: number;
  todayRevenue: number;
  activeOrdersCount: number;
  menuItemsCount: number;
  statusCounts: Record<OrderStatus, number>;
  recentOrders: Order[];
}

export const useDashboardStats = (): DashboardStats => {
  const orders = useAppSelector(selectAllOrders);
  const menuItems = useAppSelector(selectAllMenuItems);

  return useMemo(() => {
    const todayOrders = orders.filter((order) => isToday(order.createdAt));

    const todayRevenue = todayOrders
      .filter((order) => order.status !== "cancelled")
      .reduce((sum, order) => sum + order.totalPrice, 0);

    const activeOrdersCount = orders.filter((order) =>
      ACTIVE_STATUSES.includes(order.status)
    ).length;

    const statusCounts = ORDER_STATUS_LIST.reduce((acc, status) => {
      acc[status] = 0;
      return acc;
    }, {} as Record<OrderStatus, number>);

    orders.forEach((order) => {
      statusCounts[order.status] += 1;
    });

    const recentOrders = [...orders]
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )
      .slice(0, RECENT_ORDERS_LIMIT);

    return {
      todayOrdersCount: todayOrders.length,
      todayRevenue,
      activeOrdersCount,
      menuItemsCount: menuItems.length,
      statusCounts,
      recentOrders,
    };
  }, [orders, menuItems]);
};

// چرا همه‌چیز اینجا با useMemo محاسبه می‌شود؟
// چون orders از Redux می‌آید و ممکن است لیست بزرگی باشد؛
// نمی‌خواهیم هر رندر، دوباره فیلتر/sort/reduce انجام شود.
// فقط وقتی خودِ آرایه orders عوض شود، دوباره محاسبه می‌شود.
