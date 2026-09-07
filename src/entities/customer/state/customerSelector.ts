// import { RootState } from "../../../app/store/types";

// export const selectActiveCustomerId = (
//   state: RootState
// ) => state.customer.activeCustomerId;

// export const selectProfiles = (
//   state: RootState
// ) => state.customer.profiles;


// export const selectCurrentCustomer = (
//     state: RootState,
// ) => {

//     if (!state.customer.activeCustomerId)

//         return null;

//     return (

//         state.customer.profiles[
//             state.customer.activeCustomerId
//         ] ?? null

//     );

// };

import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/types";


/* ------------------------------------------------ */
/* Active Customer                                  */
/* ------------------------------------------------ */

export const selectActiveCustomerId = (
  state: RootState
) =>
  state.customer.activeCustomerId;


/* ------------------------------------------------ */
/* All Profiles                                     */
/* ------------------------------------------------ */

export const selectProfiles = (
  state: RootState
) =>
  state.customer.profiles;


/* ------------------------------------------------ */
/* Current Customer                                 */
/* ------------------------------------------------ */

export const selectCurrentCustomer = (
  state: RootState
) => {

  const customerId =
    state.customer.activeCustomerId;

  if (!customerId)
    return null;


  return (
    state.customer.profiles[customerId]
    ?? null
  );
};


/* ------------------------------------------------ */
/* Admin: Customers List                            */
/* ------------------------------------------------ */

export const selectCustomers =
  createSelector(
    [
      selectProfiles
    ],
    (profiles) =>
      Object.values(profiles)
  );


/* ------------------------------------------------ */
/* Admin: Customer Count                            */
/* ------------------------------------------------ */

export const selectCustomerCount =
  createSelector(
    [
      selectCustomers
    ],
    (customers) =>
      customers.length
  );


/* ------------------------------------------------ */
/* Admin: Find Customer                             */
/* ------------------------------------------------ */

export const selectCustomerById = (
  state: RootState,
  customerId: string
) =>
  state.customer.profiles[customerId] ?? null;