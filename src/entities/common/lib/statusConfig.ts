import type { OrderStatus } from "@/entities/order/types/order";

export interface OrderStatusConfig {
  label: string;
  color: string;
  bg: string;
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, OrderStatusConfig> = {
  pending: {
    label: "Pending",
    color: "#c9a876",
    bg: "rgba(201,168,118,0.12)",
  },
  accepted: {
    label: "Accepted",
    color: "#e8832a",
    bg: "rgba(232,131,42,0.12)",
  },
  preparing: {
    label: "Preparing",
    color: "#e8832a",
    bg: "rgba(232,131,42,0.12)",
  },
  ready: {
    label: "Ready",
    color: "#f5a84e",
    bg: "rgba(245,168,78,0.15)",
  },
  served: {
    label: "Served",
    color: "#6fb37a",
    bg: "rgba(111,179,122,0.12)",
  },
  cancelled: {
    label: "Cancelled",
    color: "#d9695a",
    bg: "rgba(217,105,90,0.12)",
  },
};

// این فایل تک منبع رنگ/برچسب هر OrderStatus است.
// هم OrderStatusBadge (پنل مشتری و ادمین) و هم
// بخش آمار Dashboard از همین استفاده می‌کنند
// تا رنگ‌ها همیشه یکی بمانند.

export const ORDER_STATUS_LIST: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "served",
  "cancelled",
];
