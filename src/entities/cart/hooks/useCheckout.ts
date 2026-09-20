import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useAppSelector } from "../../../app/store/hooks";
import { selectCurrentCustomer } from "../../customer/state/customerSelector";
import { useCart } from "./useCart";
import { useOrder } from "../../order/hooks/useOrder";
import { useTable } from "../../table/hooks/useTable";
import { useRestaurant } from "../../restaurant/hooks/useRestaurant";
import type { OrderItem } from "../../order/types/order";

type UseCheckoutOptions = {
  onRequireAuth?: () => void;
  onSuccess?: () => void;
};

export const useCheckout = ({
  onRequireAuth,
  onSuccess,
}: UseCheckoutOptions = {}) => {
  const customer = useAppSelector(selectCurrentCustomer);

  const { settings } = useRestaurant();
  const { orderingEnabled } = settings;

  const {
    items,
    total,
    isEmpty,
    clear,
  } = useCart();

  const { submit } = useOrder();
  const { available: availableTables, occupy } = useTable();

  const [selectedTableId, setSelectedTableId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const checkout = useCallback(async () => {
    // سفارش‌گیری توسط ادمین غیرفعال شده
    if (!orderingEnabled) {
      toast.error("سفارش‌گیری در حال حاضر غیرفعال است.");
      return false;
    }

    // Cart خالی است
    if (isEmpty) {
      return false;
    }

    // میز انتخاب نشده
    if (!selectedTableId) {
      toast.error("لطفاً یک میز انتخاب کنید.");
      return false;
    }

    // Guest
    if (!customer) {
      onRequireAuth?.();
      return false;
    }

    const orderItems: OrderItem[] = items.map((item) => ({
      id: crypto.randomUUID(),
      menuItemId: item.id,
      name: item.name,
      quantity: item.quantity,
      price: item.price,
    }));

    setSubmitting(true);

    try {
      await submit({
        customerId: customer.id,
        order: {
          tableId: selectedTableId,
          items: orderItems,
          totalPrice: total,
          status: "pending",
        },
      }).unwrap();

      // میز انتخاب‌شده الان اشغال شده
      occupy(selectedTableId);

      clear();
      setSelectedTableId(null);
      onSuccess?.();

      return true;
    } catch (error) {
      console.error("Checkout failed:", error);
      toast.error("ثبت سفارش با مشکل روبه‌رو شد. دوباره تلاش کنید.");

      return false;
    } finally {
      setSubmitting(false);
    }
  }, [
    customer,
    isEmpty,
    items,
    total,
    submit,
    clear,
    onRequireAuth,
    onSuccess,
    selectedTableId,
    occupy,
    orderingEnabled,
  ]);

  return {
    checkout,
    customer,
    items,
    total,
    isEmpty,
    submitting,
    isAuthenticated: Boolean(customer),
    availableTables,
    selectedTableId,
    setSelectedTableId,
    orderingEnabled,
  };
};


//جریان معماری :

// CartDrawer
//      │
//      ↓
// CartFooter
//      │
//      ↓
// useCheckout()
//      │
//      ├── Guest
//      │     ↓
//      │   AuthModal
//      │     ↓
//      │   OTP
//      │     ↓
//      │   Customer
//      │
//      └── Logged in
//            ↓
//        submitOrder (order/state/orderSlice)
//            ↓
//        currentOrderByCustomer به‌روزرسانی می‌شود
//            ↓
//        Navigate → /orders → ActiveOrderCard