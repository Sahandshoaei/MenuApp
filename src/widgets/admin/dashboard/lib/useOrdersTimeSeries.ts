import { useMemo } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectAllOrders } from "@/entities/order/state/orderSelector";

export type TimePeriod = "monthly" | "weekly" | "today";

export interface TimeSeriesPoint {
  label: string;
  revenue: number;
  orders: number;
}

const HOUR_BUCKET_SIZE = 4; // 6 بازه‌ی ۴ ساعته در روز

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

export const useOrdersTimeSeries = (period: TimePeriod): TimeSeriesPoint[] => {
  const orders = useAppSelector(selectAllOrders);

  return useMemo(() => {
    const validOrders = orders.filter((order) => order.status !== "cancelled");

    /* ---------------- Today: بازه‌های ۴ ساعته ---------------- */
    if (period === "today") {
      const buckets: TimeSeriesPoint[] = [];

      for (let hour = 0; hour < 24; hour += HOUR_BUCKET_SIZE) {
        buckets.push({
          label: `${String(hour).padStart(2, "0")}:00`,
          revenue: 0,
          orders: 0,
        });
      }

      const now = new Date();

      validOrders.forEach((order) => {
        const createdAt = new Date(order.createdAt);
        if (!isSameDay(createdAt, now)) return;

        const bucketIndex = Math.floor(createdAt.getHours() / HOUR_BUCKET_SIZE);
        buckets[bucketIndex].revenue += order.totalPrice;
        buckets[bucketIndex].orders += 1;
      });

      return buckets;
    }

    /* ---------------- Weekly: ۷ روز اخیر ---------------- */
    if (period === "weekly") {
      const days: TimeSeriesPoint[] = [];
      const dayKeys: string[] = [];

      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(date.getDate() - i);

        days.push({
          label: date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          revenue: 0,
          orders: 0,
        });

        dayKeys.push(date.toDateString());
      }

      validOrders.forEach((order) => {
        const createdAt = new Date(order.createdAt);
        const index = dayKeys.indexOf(createdAt.toDateString());
        if (index === -1) return;

        days[index].revenue += order.totalPrice;
        days[index].orders += 1;
      });

      return days;
    }

    /* ---------------- Monthly: ۶ ماه اخیر ---------------- */
    const months: TimeSeriesPoint[] = [];
    const monthKeys: string[] = [];

    for (let i = 5; i >= 0; i--) {
      const date = new Date();
      date.setMonth(date.getMonth() - i);

      months.push({
        label: date.toLocaleDateString("en-US", { month: "short" }),
        revenue: 0,
        orders: 0,
      });

      monthKeys.push(`${date.getFullYear()}-${date.getMonth()}`);
    }

    validOrders.forEach((order) => {
      const createdAt = new Date(order.createdAt);
      const key = `${createdAt.getFullYear()}-${createdAt.getMonth()}`;
      const index = monthKeys.indexOf(key);
      if (index === -1) return;

      months[index].revenue += order.totalPrice;
      months[index].orders += 1;
    });

    return months;
  }, [orders, period]);
};
