
import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "@/app/store/index";
import type { Order, OrderStatus } from "../types/order"; // مسیر تایپ‌های خود را چک کنید
import { selectActiveCustomerId } from "@/entities/customer/state/customerSelector"; // مسیر سلکتور مشتری

/* -------------------------------------------------------------------------- */
/*                                   Base                                     */
/* -------------------------------------------------------------------------- */

export const selectOrderState = (state: RootState) => state.order;
export const selectOrderEntities = (state: RootState) => state.order.entities;
export const selectOrderLoading = (state: RootState) => state.order.loading;
export const selectOrderSuccess = (state: RootState) => state.order.success;

const selectHistoryByCustomer = (state: RootState) => state.order.historyByCustomer;
const selectCurrentOrderByCustomer = (state: RootState) => state.order.currentOrderByCustomer;

/* -------------------------------------------------------------------------- */
/*                              Current Customer                              */
/* -------------------------------------------------------------------------- */

export const selectCurrentOrder = createSelector(
  [selectActiveCustomerId, selectCurrentOrderByCustomer, selectOrderEntities],
  (customerId, currentOrderByCustomer, entities) => {
    if (!customerId) return null;
    const orderId = currentOrderByCustomer[customerId];
    if (!orderId) return null;
    return entities[orderId] ?? null;
  }
);

/* -------------------------------------------------------------------------- */
/*                                  History                                   */
/* -------------------------------------------------------------------------- */

// ✅ این سلکتور مموایز شد تا هشدار کنسول کاملاً رفع شود
export const selectOrderHistory = createSelector(
  [selectActiveCustomerId, selectHistoryByCustomer, selectOrderEntities],
  (customerId, historyByCustomer, entities): Order[] => {
    if (!customerId) return [];

    const ids = historyByCustomer[customerId] ?? [];
    return ids
      .map((id) => entities[id])
      .filter((order): order is Order => order !== undefined);
  }
);

/* -------------------------------------------------------------------------- */
/*                                   Admin                                    */
/* -------------------------------------------------------------------------- */

export const selectAllOrders = createSelector(
  [selectOrderEntities],
  (entities) => Object.values(entities)
);

export const selectOrdersByStatus = (status: OrderStatus) =>
  createSelector([selectAllOrders], (orders) =>
    orders.filter((order) => order.status === status)
  );

export const selectOrderById = (orderId: string) => (state: RootState) =>
  state.order.entities[orderId] ?? null;


//     پنل مشتری :

// گرفتن سفارش جاری:
// const order = useAppSelector(
//   selectCurrentOrder
// );

// گرفتن تاریخچه سفارش‌ها:
// const history =
//   useAppSelector(
//     selectOrderHistory
//   );



// پنل ادمین :

// همه سفارش‌ها:
// const orders =
//   useAppSelector(
//     selectAllOrders
//   );

// همه سفارش‌های در حال آماده‌سازی:
// const preparing =
//   useAppSelector(
//     selectOrdersByStatus(
//       "preparing"
//     )
//   );

// گرفتن یک سفارش:
// const order =
//   useAppSelector(
//     selectOrderById(id)
//   );