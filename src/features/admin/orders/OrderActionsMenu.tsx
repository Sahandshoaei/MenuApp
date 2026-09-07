import { useEffect, useRef, useState } from "react";
import { MoreVertical, type LucideIcon } from "lucide-react";
import { useAppDispatch } from "@/app/store/hooks";
import { updateOrderStatus } from "@/entities/order/state/orderSlice";
import type { Order } from "@/entities/order/types/order";
import { getNextStatus, NEXT_STATUS_ACTION_LABEL } from "@/widgets/admin/orders/lib/orderStatusFlow";

interface OrderActionsMenuProps {
  order: Order;
  triggerIcon?: LucideIcon;
}

const OrderActionsMenu = ({ order, triggerIcon: TriggerIcon = MoreVertical }: OrderActionsMenuProps) => {
  const dispatch = useAppDispatch();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const nextStatus = getNextStatus(order.status);
  const canCancel = order.status !== "served" && order.status !== "cancelled";

  const handleAdvance = () => {
    if (!nextStatus) return;
    dispatch(updateOrderStatus({ orderId: order.id, status: nextStatus }));
    setOpen(false);
  };

  const handleCancel = () => {
    dispatch(updateOrderStatus({ orderId: order.id, status: "cancelled" }));
    setOpen(false);
  };

  return (
    <div ref={menuRef} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-lg p-1.5 text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
      >
        <TriggerIcon size={16} />
      </button>

      {open && (
        <div
          className="
            absolute
            top-8
            right-0
            z-10
            w-48
            overflow-hidden
            rounded-xl
            border
            border-amber-900/30
            bg-[#1a120b]
            shadow-lg
          "
        >
          {nextStatus && (
            <button
              type="button"
              onClick={handleAdvance}
              className="w-full px-4 py-2.5 text-right text-sm text-zinc-200 hover:bg-white/5"
            >
              {NEXT_STATUS_ACTION_LABEL[order.status]}
            </button>
          )}

          {canCancel && (
            <button
              type="button"
              onClick={handleCancel}
              className="w-full px-4 py-2.5 text-right text-sm text-red-400 hover:bg-white/5"
            >
              لغو سفارش
            </button>
          )}

          {!nextStatus && !canCancel && (
            <p className="px-4 py-2.5 text-sm text-zinc-500">اکشنی موجود نیست</p>
          )}
        </div>
      )}
    </div>
  );
};

export default OrderActionsMenu;
