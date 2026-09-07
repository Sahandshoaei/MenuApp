// import {
//   useAppDispatch,
//   useAppSelector,
// } from "../../../app/store/hooks";

// import { selectActiveCustomerId } from "../../customer/state/customerSelector";

// import {
//   selectNotifications,
//   selectUnreadCount,
// } from "../state/notificationSelector";

// import { notificationService } from "../services/notificationService";

// import type { NotificationType } from "../types/notification";

// export const useNotification = () => {
//   const dispatch = useAppDispatch();

//   const customerId = useAppSelector(
//     selectActiveCustomerId
//   );

//   const notifications =
//     useAppSelector(
//       selectNotifications
//     );

//   const unreadCount =
//     useAppSelector(
//       selectUnreadCount
//     );

//   return {
//     notifications,

//     unreadCount,

//     add: (
//       title: string,
//       message: string,
//       type: NotificationType
//     ) => {
//       if (!customerId) return;

//       notificationService.add(
//         dispatch,
//         customerId,
//         title,
//         message,
//         type
//       );
//     },

//     markAsRead: (
//       notificationId: string
//     ) =>
//       notificationService.markAsRead(
//         dispatch,
//         notificationId
//       ),

//     markAllAsRead: () => {
//       if (!customerId) return;

//       notificationService.markAllAsRead(
//         dispatch,
//         customerId
//       );
//     },

//     remove: (
//       notificationId: string
//     ) =>
//       notificationService.remove(
//         dispatch,
//         notificationId
//       ),

//     clear: () => {
//       if (!customerId) return;

//       notificationService.clear(
//         dispatch,
//         customerId
//       );
//     },
//   };
// };


import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import {
  selectNotifications,
  selectUnreadCount,
  selectNotificationCount,
} from "../state/notificationSelector";

import {
  addNotification,
  markAsRead,
  markAllAsRead,
  removeNotification,
  clearNotifications,
} from "../state/notificationSlice";

import type { Notification } from "../types/notification";

import { selectActiveCustomerId } from "../../customer/state/customerSelector";


export const useNotification = () => {

  const dispatch = useAppDispatch();


  const customerId = useAppSelector(
    selectActiveCustomerId
  );


  const notifications = useAppSelector(
    selectNotifications
  );


  const unreadCount = useAppSelector(
    selectUnreadCount
  );


  const count = useAppSelector(
    selectNotificationCount
  );


  return {

    notifications,

    unreadCount,

    count,

    add: (
      notification: Notification
    ) => {

      if (!customerId) return;

      dispatch(
        addNotification({
          customerId,
          notification,
        })
      );

    },


    markAsRead: (
      notificationId: string
    ) => {

      if (!customerId) return;

      dispatch(
        markAsRead({
          customerId,
          notificationId,
        })
      );

    },


    markAllAsRead: () => {

      if (!customerId) return;

      dispatch(
        markAllAsRead(customerId)
      );

    },


    remove: (
      notificationId: string
    ) => {

      if (!customerId) return;

      dispatch(
        removeNotification({
          customerId,
          notificationId,
        })
      );

    },


    clear: () => {

      if (!customerId) return;

      dispatch(
        clearNotifications(customerId)
      );

    },

  };

};