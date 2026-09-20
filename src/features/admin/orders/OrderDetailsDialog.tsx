import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { OrderStatusBadge } from "@/entities/common/ui/OrderStatusBadge";
import type { Order } from "@/entities/order/types/order";
import type { Customer } from "@/entities/customer/types/customer";

interface OrderDetailsDialogProps {
  order: Order | null;
  customer: Customer | null;
  onClose: () => void;
}

const formatDate = (isoDate: string) => {
  const date = new Date(isoDate);

  const day = date.toLocaleDateString("fa-IR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const time = date.toLocaleTimeString("fa-IR", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return `${day} - ${time}`;
};

const formatNumber = (value: number) =>
  value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const OrderDetailsDialog = ({ order, customer, onClose }: OrderDetailsDialogProps) => {
  return (
    <AnimatePresence>
      {order && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-[#221C5E]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute end-4 top-4 rounded-full p-2 text-[var(--color-text-secondary)] transition-colors hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-text-primary)]"
            >
              <X size={18} />
            </button>

            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              سفارش <span dir="ltr">#{order.id.slice(0, 6)}</span>
            </h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">مشتری</span>
              <span className="text-[var(--color-text-primary)]">{customer?.name ?? "—"}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">میز</span>
              <span className="text-[var(--color-text-primary)]">{order.tableId}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">تاریخ</span>
              <span className="text-[var(--color-text-primary)]">{formatDate(order.createdAt)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-[var(--color-text-secondary)]">وضعیت</span>
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="mt-4 border-t border-[var(--color-border)] pt-4">
              <p className="mb-2 text-xs text-[var(--color-text-secondary)]">اقلام سفارش</p>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-[var(--color-text-secondary)]">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-[var(--color-text-secondary)]">
                      {formatNumber(item.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-[var(--color-border)] pt-4">
              <span className="text-sm font-medium text-[var(--color-text-secondary)]">جمع کل</span>
              <span className="text-lg font-semibold text-[var(--color-accent)]">
                {formatNumber(order.totalPrice)}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsDialog;
