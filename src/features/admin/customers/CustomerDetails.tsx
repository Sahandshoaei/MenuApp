import { OrderStatusBadge } from "@/entities/common/ui/OrderStatusBadge";
import { getLoyaltyProgress } from "@/entities/loyalty/constants/rankProgress";
import LoyaltyRankBadge from "./LoyaltyRankBadge";
import type { CustomerRow } from "@/widgets/admin/customers/lib/useCustomersData";
import type { Order } from "@/entities/order/types/order";

interface CustomerDetailsProps {
  customer: CustomerRow;
  orders: Order[];
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

const CustomerDetails = ({ customer, orders }: CustomerDetailsProps) => {
  const { config, progress, remaining } = getLoyaltyProgress(
    customer.rank,
    customer.totalSpent
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/15 text-sm text-primary">
          {getInitials(customer.name)}
        </div>
        <div>
          <p className="text-sm text-white">{customer.name}</p>
          <p className="text-xs text-zinc-500">{customer.phone}</p>
        </div>
        <span className="mr-auto">
          <LoyaltyRankBadge rank={customer.rank} />
        </span>
      </div>

      <div className="rounded-2xl bg-white/5 p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-zinc-400">
            پیشرفت تا رتبه {config.next}
          </span>
          <span className="text-primary">{Math.round(progress)}%</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-amber-500 to-orange-400 transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {customer.rank !== "gold" && (
          <p className="mt-2 text-xs text-zinc-500">
            ${remaining} بیشتر تا رسیدن به {config.next}
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs text-zinc-400">
          تاریخچه سفارش‌ها ({orders.length})
        </p>

        {orders.length === 0 ? (
          <p className="py-6 text-center text-sm text-zinc-500">
            هنوز سفارشی ثبت نکرده.
          </p>
        ) : (
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-amber-900/20 px-3 py-2"
              >
                <div>
                  <p className="text-xs text-zinc-200">میز {order.tableId}</p>
                  <p className="text-xs text-zinc-500">
                    ${order.totalPrice.toFixed(2)}
                  </p>
                </div>

                <OrderStatusBadge status={order.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDetails;
