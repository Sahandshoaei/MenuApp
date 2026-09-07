import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../../app/store/types";

import { selectActiveCustomerId } from "../../customer/state/customerSelector";

import type { Notification } from "../types/notification";


// ---------------- Notifications ----------------

export const selectNotifications =
  createSelector(
    [
      (state: RootState) =>
        state.notifications.byCustomer,

      selectActiveCustomerId,
    ],

    (byCustomer, customerId): Notification[] => {

      if (!customerId) {
        return [];
      }

      const notifications =
        byCustomer?.[customerId];

      if (!Array.isArray(notifications)) {
        return [];
      }

      return notifications.filter(
        (
          notification
        ): notification is Notification =>
          notification !== null &&
          typeof notification === "object"
      );
    }
  );


// ---------------- Count ----------------

export const selectNotificationCount =
  createSelector(
    [selectNotifications],

    (notifications) =>
      notifications.length
  );


// ---------------- Unread ----------------

export const selectUnreadNotifications =
  createSelector(
    [selectNotifications],

    (notifications) =>
      notifications.filter(
        (notification) =>
          !notification.read
      )
  );


// ---------------- Unread Count ----------------

export const selectUnreadCount =
  createSelector(
    [selectUnreadNotifications],

    (notifications) =>
      notifications.length
  );


// ---------------- Empty ----------------

export const selectNotificationsIsEmpty =
  createSelector(
    [selectNotifications],

    (notifications) =>
      notifications.length === 0
  );

//   این قسمت مهم است:

// return Array.isArray(notifications)
//   ? notifications
//   : [];

// پس حتی اگر دیتای خراب یا قدیمی داشته باشیم، دیگر:

// notifications.filter is not a function

// نمی‌گیریم.



// الان ساختار جدید این است:

// {
//   "customer-1": [
//     {
//       "id": "notification-1",
//       "title": "Order Ready",
//       "message": "Your order is ready",
//       "type": "success",
//       "read": false,
//       "createdAt": "2026-08-17T10:00:00.000Z"
//     }
//   ]
// }