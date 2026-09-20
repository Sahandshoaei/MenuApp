import { ShoppingBag, CheckCircle2, XCircle } from "lucide-react";
import { useRestaurant } from "@/entities/restaurant/hooks/useRestaurant";

const OrderingSettings = () => {
  const { settings, setOrderingEnabled } = useRestaurant();
  const { orderingEnabled } = settings;

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <div className="grid gap-8 md:grid-cols-2 md:items-start">
        {/* Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)]">
            <ShoppingBag size={20} className="text-[var(--color-accent)]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">سیستم سفارش‌گیری</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              فعال یا غیرفعال کردن ثبت سفارش برای مشتری‌ها
            </p>
          </div>
        </div>

        {/* Setting */}
        <div>
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-[var(--color-text-primary)]">دریافت سفارش</h3>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                وقتی غیرفعال باشه، مشتری‌ها نمی‌تونن سفارش ثبت کنن.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setOrderingEnabled(!orderingEnabled)}
              className={`relative h-6 w-11 rounded-full transition-colors ${
                orderingEnabled ? "bg-[var(--color-accent)]" : "bg-[var(--color-accent-tint)]"
              }`}
            >
              <span
                className={`absolute top-1 h-4 w-4 rounded-full bg-[var(--color-surface)] shadow transition-transform ${
                  orderingEnabled ? "right-1" : "right-6"
                }`}
              />
            </button>
          </div>

          {/* Status */}
          <div
            className={`mt-5 flex items-start gap-3 rounded-xl border p-4 ${
              orderingEnabled
                ? "border-emerald-500/20 bg-emerald-500/5"
                : "border-red-500/20 bg-red-500/5"
            }`}
          >
            {orderingEnabled ? (
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-emerald-400" />
            ) : (
              <XCircle size={18} className="mt-0.5 shrink-0 text-red-400" />
            )}

            <div>
              <p
                className={`text-sm font-medium ${
                  orderingEnabled ? "text-emerald-300" : "text-red-300"
                }`}
              >
                {orderingEnabled
                  ? "سیستم سفارش‌گیری الان فعاله"
                  : "سیستم سفارش‌گیری الان غیرفعاله"}
              </p>
              <p className="mt-1 text-xs text-[var(--color-text-secondary)]">
                {orderingEnabled
                  ? "مشتری‌ها می‌تونن به‌صورت عادی سفارش بدن."
                  : "مشتری‌ها نمی‌تونن سفارش جدید ثبت کنن."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderingSettings;
