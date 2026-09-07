import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import {
  submitOrder,
  updateOrderStatus,
  clearCurrentOrder,
  clearCustomerOrders,
  removeOrder,
  resetOrderState,
} from "../state/orderSlice";

import {
  selectCurrentOrder,
  selectOrderHistory,
  selectOrderLoading,
  selectOrderSuccess,
} from "../state/orderSelector";

import { selectActiveCustomerId } from "../../customer/state/customerSelector";
import type { SubmitOrder, OrderStatus } from "../types/order";



export const useOrder = () => {
  const dispatch = useAppDispatch();

  const customerId = useAppSelector(selectActiveCustomerId);

  const currentOrder = useAppSelector(selectCurrentOrder);

  const history = useAppSelector(selectOrderHistory);

  const loading = useAppSelector(selectOrderLoading);

  const success = useAppSelector(selectOrderSuccess);

  return {
    customerId,

    currentOrder,

    history,

    loading,

    success,

    submit: (payload: SubmitOrder) =>
      dispatch(submitOrder(payload)),

    updateStatus: (
      orderId: string,
      status: OrderStatus
    ) =>
      dispatch(
        updateOrderStatus({
          orderId,
          status,
        })
      ),

    clearCurrent: () => {
      if (!customerId) return;

      dispatch(
        clearCurrentOrder(customerId)
      );
    },

    clearHistory: () => {
      if (!customerId) return;

      dispatch(
        clearCustomerOrders(customerId)
      );
    },

    remove: (orderId: string) =>
      dispatch(removeOrder(orderId)),

    reset: () =>
      dispatch(resetOrderState()),
  };
};


// نحوه استفاده

// ثبت سفارش:

// const { submit } = useOrder();

// await submit({
//   customerId,
//   tableId,
//   items,
//   totalPrice,
// });


// گرفتن سفارش جاری:

// const { currentOrder } = useOrder();

// گرفتن تاریخچه:

// const { history } = useOrder();

// تغییر وضعیت سفارش (پنل ادمین):

// const { updateStatus } = useOrder();

// updateStatus(orderId, "preparing");


// حذف سفارش:

// const { remove } = useOrder();

// remove(orderId);

// پاک کردن سفارش جاری مشتری:

// const { clearCurrent } = useOrder();

// clearCurrent();


// پاک کردن تاریخچه:

// const { clearHistory } = useOrder();

// clearHistory();