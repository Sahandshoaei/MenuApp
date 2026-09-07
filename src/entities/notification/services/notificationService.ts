import type { AppDispatch } from "../../../app/store/types";

import {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
} from "../state/notificationSlice";

import type { NotificationType } from "../types/notification";

export const notificationService = {
  add(
    dispatch: AppDispatch,
    customerId: string,
    title: string,
    message: string,
    type: NotificationType
  ) {
    dispatch(
      addNotification({
        customerId,
        title,
        message,
        type,
      })
    );
  },

  markAsRead(
    dispatch: AppDispatch,
    notificationId: string
  ) {
    dispatch(
      markAsRead(notificationId)
    );
  },

  markAllAsRead(
    dispatch: AppDispatch,
    customerId: string
  ) {
    dispatch(
      markAllAsRead(customerId)
    );
  },

  remove(
    dispatch: AppDispatch,
    notificationId: string
  ) {
    dispatch(
      removeNotification(
        notificationId
      )
    );
  },

  clear(
    dispatch: AppDispatch,
    customerId: string
  ) {
    dispatch(
      clearNotifications(
        customerId
      )
    );
  },
};