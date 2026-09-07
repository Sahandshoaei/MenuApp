// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { Customer } from "../types/customer";
// import {loadCustomers,saveCustomers} from "../services/customer-storage";

// interface CustomerState {
//   profiles: Record<string, Customer>;
//   activeCustomerId: string | null;
// }

// const persisted = loadCustomers();

// const initialState: CustomerState = {
//   profiles: persisted.profiles,
//   activeCustomerId: persisted.activeCustomerId,
// };

// const customerSlice = createSlice({
//   name: "customer",
//   initialState,

//   reducers: {
//     setActiveCustomer: (
//       state,
//       action: PayloadAction<Customer>
//     ) => {
//       const customer = action.payload;

//       // اگر وجود نداشت ایجاد می‌شود
//       state.profiles[customer.phone] = customer;

//       // کاربر فعال
//       state.activeCustomerId = customer.phone;

//       saveCustomers(
//         state.profiles,
//         state.activeCustomerId
//       );
//     },

//     logout: (state) => {
//       state.activeCustomerId = null;

//       saveCustomers(
//         state.profiles,
//         state.activeCustomerId
//       );
//     },

//     updateCustomer: (
//       state,
//       action: PayloadAction<Customer>
//     ) => {
//       const customer = action.payload;

//       state.profiles[customer.phone] = customer;

//       saveCustomers(
//         state.profiles,
//         state.activeCustomerId
//       );
//     },
//   },
// });

// export const {
//   setActiveCustomer,
//   logout,
//   updateCustomer,
// } = customerSlice.actions;



// export const customerReducer = customerSlice.reducer;


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

import type { Customer } from "../types/customer";
import type { CustomerState } from "../types/customer-state";

import {
  loadCustomers,
  saveCustomers,
} from "../services/customer-storage";

const persisted = loadCustomers();

const initialState: CustomerState = {
  profiles: persisted.profiles,
  activeCustomerId: persisted.activeCustomerId,
};

const customerSlice = createSlice({
  name: "customer",

  initialState,

  reducers: {
    /* -------------------------------------------------- */
    /* Set Active Customer                                */
    /* -------------------------------------------------- */

    setActiveCustomer: (
      state,
      action: PayloadAction<Customer>
    ) => {
      const customer = action.payload;

      state.profiles[customer.phone] = customer;

      state.activeCustomerId = customer.phone;

      saveCustomers(
        state.profiles,
        state.activeCustomerId
      );
    },

    /* -------------------------------------------------- */
    /* Logout                                             */
    /* -------------------------------------------------- */

    logout: (state) => {
      state.activeCustomerId = null;

      saveCustomers(
        state.profiles,
        state.activeCustomerId
      );
    },

    /* -------------------------------------------------- */
    /* Add Customer                                       */
    /* -------------------------------------------------- */

    addCustomer: (
      state,
      action: PayloadAction<Customer>
    ) => {
      const customer = action.payload;

      state.profiles[customer.phone] = customer;

      saveCustomers(
        state.profiles,
        state.activeCustomerId
      );
    },

    /* -------------------------------------------------- */
    /* Update Customer                                    */
    /* -------------------------------------------------- */

    updateCustomer: (
      state,
      action: PayloadAction<Customer>
    ) => {
      const customer = action.payload;

      state.profiles[customer.phone] = customer;

      saveCustomers(
        state.profiles,
        state.activeCustomerId
      );
    },

    /* -------------------------------------------------- */
    /* Remove Customer                                    */
    /* -------------------------------------------------- */

    removeCustomer: (
      state,
      action: PayloadAction<string>
    ) => {
      const customerId = action.payload;

      delete state.profiles[customerId];

      /*
       * اگر مشتری‌ای که حذف شده،
       * مشتری فعال فعلی باشد،
       * session را هم پاک می‌کنیم.
       */
      if (state.activeCustomerId === customerId) {
        state.activeCustomerId = null;
      }

      saveCustomers(
        state.profiles,
        state.activeCustomerId
      );
    },
  },
});

export const {
  setActiveCustomer,
  logout,
  addCustomer,
  updateCustomer,
  removeCustomer,
} = customerSlice.actions;

export const customerReducer =
  customerSlice.reducer;

// نگهداری اطلاعات مشتری


// وقتی برنامه اجرا می‌شود:

// Redux
// ↓
// LocalStorage
// ↓
// Profile

// اتوماتیک لود می‌شود.




// سناریو کلی:

// کاربر جدید
// ↓
// Checkout
// ↓
// RegisterModal
// ↓
// Profile ساخته می‌شود
// ↓
// LocalStorage ذخیره می‌شود
// ↓
// Refresh
// ↓
// Profile باقی می‌ماند
// ↓
// Checkout مستقیم انجام می‌شود



// Customer
//         │
//         ▼
// activeCustomerId
//         │
//  ┌──────┼─────────┬─────────┬─────────┐
//  ▼      ▼         ▼         ▼
// Orders Favorites Loyalty Notifications
//  │        │         │           │
// Record   Record    Record      Record
//  │        │         │           │
// 0912     0912      0912        0912
// 0935     0935      0935        0935