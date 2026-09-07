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
        border-amber-900/20
        bg-[#1a120b]
        overflow-hidden
      "
    >
      <div
        className="
          border-b
          border-amber-900/20
          px-5
          py-3
          text-sm
          font-medium
          text-white
        "
      >
        آخرین سفارش‌ها
      </div>

      {recentOrders.length === 0 ? (
        <p className="px-5 py-6 text-center text-sm text-zinc-500">
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
                border-amber-900/10
                px-5
                py-3
                last:border-b-0
              "
            >
              <div>
                <p className="text-sm text-white">
                  میز {order.tableId} —{" "}
                  {order.items.map((item) => item.name).join(", ")}
                </p>
                <p className="mt-0.5 text-xs text-zinc-500">
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
