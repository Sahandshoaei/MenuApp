import type { OrderStatus } from "@/entities/order/types/order";

interface OrderProgressTrackerProps {
  status: OrderStatus;
}

const STEPS: { key: OrderStatus; label: string }[] = [
  { key: "accepted", label: "تأیید" },
  { key: "preparing", label: "آماده‌سازی" },
  { key: "ready", label: "آماده" },
  { key: "served", label: "سرو" },
];

const STEP_INDEX: Record<OrderStatus, number> = {
  pending: 0,
  accepted: 1,
  preparing: 2,
  ready: 3,
  served: 4,
  cancelled: -1,
};

const OrderProgressTracker = ({ status }: OrderProgressTrackerProps) => {
  if (status === "cancelled") {
    return (
      <div
        className="mt-5 rounded-xl px-3 py-2 text-center text-xs font-medium"
        style={{
          background: "rgba(217,105,90,0.1)",
          color: "#d9695a",
          border: "0.5px solid rgba(217,105,90,0.25)",
        }}
      >
        این سفارش لغو شده است
      </div>
    );
  }

  const currentIndex = STEP_INDEX[status];

  return (
    <div className="mt-5 flex items-center">
      {STEPS.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isFilled = isDone || isCurrent;

        return (
          <div
            key={step.key}
            className="flex flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center">
              <div
                className="h-2.5 w-2.5 rounded-full transition-colors"
                style={{
                  background: isFilled
                    ? "var(--color-accent)"
                    : "var(--color-accent-tint-strong)",
                }}
              />
              <span
                className="mt-1.5 whitespace-nowrap text-[10px]"
                style={{
                  color: isFilled
                    ? "var(--color-text-primary)"
                    : "var(--color-accent-soft)",
                }}
              >
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div
                className="mx-1 h-[2px] flex-1 rounded-full"
                style={{
                  background: isDone
                    ? "var(--color-accent)"
                    : "var(--color-accent-tint-strong)",
                }}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default OrderProgressTracker;
