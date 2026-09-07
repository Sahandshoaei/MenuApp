import type { OrderStatus } from "@/entities/order/types/order";

const STATUS_FLOW: OrderStatus[] = [
  "pending",
  "accepted",
  "preparing",
  "ready",
  "served",
];

export const getNextStatus = (status: OrderStatus): OrderStatus | null => {
  const index = STATUS_FLOW.indexOf(status);

  if (index === -1 || index === STATUS_FLOW.length - 1) return null;

  return STATUS_FLOW[index + 1];
};

export const NEXT_STATUS_ACTION_LABEL: Record<OrderStatus, string> = {
  pending: "قبول سفارش",
  accepted: "شروع آماده‌سازی",
  preparing: "آماده شد",
  ready: "سرو شد",
  served: "",
  cancelled: "",
};

// این فایل تنها منبع منطق "مرحله بعدی" است.
// اگر روزی جریان status عوض شود (مثلاً یک مرحله جدید اضافه شود)
// فقط همین فایل تغییر می‌کند، نه هر جایی که status را advance می‌کند.
