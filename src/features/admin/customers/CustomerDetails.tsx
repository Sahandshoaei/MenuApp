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

const formatNumber = (value: number) => value.toLocaleString("fa-IR");

const formatAmount = (value: number) =>
  value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const CustomerDetails = ({ customer, orders }: CustomerDetailsProps) => {
  const { config, progress, remaining } = getLoyaltyProgress(
    customer.rank,
    customer.totalSpent
  );

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[var(--color-accent-tint-strong)] text-sm text-[var(--color-accent)]">
          {getInitials(customer.name)}
        </div>
        <div>
          <p className="text-sm text-[var(--color-text-primary)]">{customer.name}</p>
          <p dir="ltr" className="text-start text-xs text-[var(--color-text-secondary)]">{customer.phone}</p>
        </div>
        <span className="ms-auto">
          <LoyaltyRankBadge rank={customer.rank} />
        </span>
      </div>

      <div className="rounded-2xl bg-[var(--color-accent-tint)] p-4">
        <div className="mb-2 flex items-center justify-between text-xs">
          <span className="text-[var(--color-text-secondary)]">
            پیشرفت تا رتبه {config.next}
          </span>
          <span className="text-[var(--color-accent)]">٪{formatNumber(Math.round(progress))}</span>
        </div>

        <div className="h-2 overflow-hidden rounded-full bg-[var(--color-accent-tint)]">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[var(--color-accent)] to-[var(--color-accent-strong)] transition-all"
            style={{ width: `${progress}%` }}
          />
        </div>

        {customer.rank !== "gold" && (
          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            {formatAmount(remaining)} بیشتر تا رسیدن به {config.next}
          </p>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs text-[var(--color-text-secondary)]">
          تاریخچه سفارش‌ها ({formatNumber(orders.length)})
        </p>

        {orders.length === 0 ? (
          <p className="py-6 text-center text-sm text-[var(--color-text-secondary)]">
            هنوز سفارشی ثبت نکرده.
          </p>
        ) : (
          <div className="flex max-h-64 flex-col gap-2 overflow-y-auto">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex items-center justify-between rounded-xl border border-[var(--color-border)] px-3 py-2"
              >
                <div>
                  <p className="text-xs text-[var(--color-text-primary)]">میز {order.tableId}</p>
                  <p className="text-xs text-[var(--color-text-secondary)]">
                    {formatAmount(order.totalPrice)}
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
