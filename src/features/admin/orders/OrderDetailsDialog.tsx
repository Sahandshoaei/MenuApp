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
  const day = date.toLocaleDateString("en-GB").split("/").join("-");
  const time = date.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${day} ${time}`;
};

const OrderDetailsDialog = ({ order, customer, onClose }: OrderDetailsDialogProps) => {
  return (
    <AnimatePresence>
      {order && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            className="fixed left-1/2 top-1/2 z-[70] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-3xl border border-amber-900/20 bg-[#1a120b] p-6 shadow-2xl"
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/5 hover:text-white"
            >
              <X size={18} />
            </button>

            <h2 className="text-base font-semibold text-white">
              سفارش #{order.id.slice(0, 6)}
            </h2>

            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-zinc-400">مشتری</span>
              <span className="text-zinc-200">{customer?.name ?? "—"}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">میز</span>
              <span className="text-zinc-200">{order.tableId}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">تاریخ</span>
              <span className="text-zinc-200">{formatDate(order.createdAt)}</span>
            </div>

            <div className="mt-2 flex items-center justify-between text-sm">
              <span className="text-zinc-400">وضعیت</span>
              <OrderStatusBadge status={order.status} />
            </div>

            <div className="mt-4 border-t border-amber-900/20 pt-4">
              <p className="mb-2 text-xs text-zinc-500">اقلام سفارش</p>

              <div className="space-y-2">
                {order.items.map((item) => (
                  <div key={item.id} className="flex items-center justify-between text-sm">
                    <span className="text-zinc-300">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="text-zinc-400">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between border-t border-amber-900/20 pt-4">
              <span className="text-sm font-medium text-zinc-300">جمع کل</span>
              <span className="text-lg font-semibold text-primary">
                ${order.totalPrice.toFixed(2)}
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default OrderDetailsDialog;
