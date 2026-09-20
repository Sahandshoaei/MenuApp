import Card from "@/shared/Card";
import { OrderStatusBadge } from "@/entities/common/ui/OrderStatusBadge";
import { useDashboardStats } from "../lib/useDashboardStats";

const RecentOrdersList = () => {
  const { recentOrders } = useDashboardStats();

  return (
    <Card
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        overflow-hidden
      "
    >
      <div
        className="
          border-b
          border-[var(--color-border)]
          px-5
          py-3
          text-sm
          font-medium
          text-[var(--color-text-primary)]
        "
      >
        آخرین سفارش‌ها
      </div>

      {recentOrders.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-[var(--color-text-secondary)]">
          هنوز سفارشی ثبت نشده.
        </p>
      ) : (
        <div>
          {recentOrders.map((order) => (
            <div
              key={order.id}
              className="
                flex
                items-center
                justify-between
                border-b
                border-[var(--color-border)]
                px-5
                py-3
                last:border-b-0
              "
            >
              <div>
                <p className="text-sm text-[var(--color-text-primary)]">
                  میز {order.tableId} —{" "}
                  {order.items.map((item) => item.name).join(", ")}
                </p>
                <p className="mt-0.5 text-xs text-[var(--color-text-secondary)]">
                  ${order.totalPrice.toFixed(2)}
                </p>
              </div>

              <OrderStatusBadge status={order.status} />
            </div>
          ))}
        </div>
      )}
    </Card>
  );
};

export default RecentOrdersList;
