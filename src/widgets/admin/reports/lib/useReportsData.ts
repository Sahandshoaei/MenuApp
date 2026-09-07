import { useMemo } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectAllOrders } from "@/entities/order/state/orderSelector";
import { selectAllMenuItems, selectAllCategories } from "@/entities/menu/state/menuSelector";
import type { Order } from "@/entities/order/types/order";
import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

export interface BestSellerItem {
  menuItemId: string;
  name: string;
  quantity: number;
  revenue: number;
}

export interface CategoryBreakdownItem {
  categoryId: string;
  title: string;
  icon: string;
  revenue: number;
  percentage: number;
}

const BEST_SELLERS_LIMIT = 10;

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

// همون بازه‌ی زمانی‌ای که در نمودار Dashboard (useOrdersTimeSeries) استفاده می‌شه:
// today → همین امروز، weekly → ۷ روز اخیر، monthly → ۶ ماه اخیر
const isWithinPeriod = (createdAt: string, period: TimePeriod) => {
  const date = new Date(createdAt);
  const now = new Date();

  if (period === "today") {
    return isSameDay(date, now);
  }

  if (period === "weekly") {
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 6);
    weekAgo.setHours(0, 0, 0, 0);
    return date >= weekAgo;
  }

  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 5);
  sixMonthsAgo.setDate(1);
  sixMonthsAgo.setHours(0, 0, 0, 0);
  return date >= sixMonthsAgo;
};

export const useReportsData = (period: TimePeriod) => {
  const orders = useAppSelector(selectAllOrders);
  const menuItems = useAppSelector(selectAllMenuItems);
  const categories = useAppSelector(selectAllCategories);

  // سفارش‌های لغوشده و خارج از بازه‌ی انتخابی حساب نمی‌شن
  const filteredOrders: Order[] = useMemo(
    () =>
      orders.filter(
        (order) => order.status !== "cancelled" && isWithinPeriod(order.createdAt, period)
      ),
    [orders, period]
  );

  const overview = useMemo(() => {
    const totalRevenue = filteredOrders.reduce((sum, o) => sum + o.totalPrice, 0);
    const totalOrders = filteredOrders.length;
    const avgOrderValue = totalOrders ? totalRevenue / totalOrders : 0;

    return { totalRevenue, totalOrders, avgOrderValue };
  }, [filteredOrders]);

  const bestSellers: BestSellerItem[] = useMemo(() => {
    const map: Record<string, BestSellerItem> = {};

    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        if (!map[item.menuItemId]) {
          map[item.menuItemId] = {
            menuItemId: item.menuItemId,
            name: item.name,
            quantity: 0,
            revenue: 0,
          };
        }

        map[item.menuItemId].quantity += item.quantity;
        map[item.menuItemId].revenue += item.price * item.quantity;
      });
    });

    return Object.values(map)
      .sort((a, b) => b.quantity - a.quantity)
      .slice(0, BEST_SELLERS_LIMIT);
  }, [filteredOrders]);

  const categoryBreakdown: CategoryBreakdownItem[] = useMemo(() => {
    const menuItemToCategory: Record<string, string> = {};
    menuItems.forEach((item) => {
      menuItemToCategory[item.id] = item.category;
    });

    const revenueByCategory: Record<string, number> = {};
    let totalRevenue = 0;

    filteredOrders.forEach((order) => {
      order.items.forEach((item) => {
        const categoryId = menuItemToCategory[item.menuItemId] ?? "unknown";
        const revenue = item.price * item.quantity;

        revenueByCategory[categoryId] = (revenueByCategory[categoryId] ?? 0) + revenue;
        totalRevenue += revenue;
      });
    });

    return Object.entries(revenueByCategory)
      .map(([categoryId, revenue]) => {
        const category = categories.find((c) => c.id === categoryId);

        return {
          categoryId,
          title: category?.title ?? "سایر",
          icon: category?.icon ?? "🍽️",
          revenue,
          percentage: totalRevenue ? (revenue / totalRevenue) * 100 : 0,
        };
      })
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredOrders, menuItems, categories]);

  return { overview, bestSellers, categoryBreakdown };
};
