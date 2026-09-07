import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";


import type {
  Notification,
  NotificationState,
} from "../types/notification";


import {
  loadNotifications,
  saveNotifications,
} from "../services/notification-storage";



const initialState: NotificationState = {

  byCustomer:
    loadNotifications(),

};





const notificationSlice = createSlice({

  name:"notification",


  initialState,


  reducers:{



   addNotification: (
    state,
    action: PayloadAction<{
      customerId: string;
      notification: Notification;
    }>
  ) => {

    const {
      customerId,
      notification,
    } = action.payload;


    if (!notification) {
      return;
    }


    if (!state.byCustomer[customerId]) {
      state.byCustomer[customerId] = [];
    }


    state.byCustomer[customerId].unshift(
      notification
    );


    saveNotifications(
      state.byCustomer
    );
  },




    markAsRead:

    (
      state,
      action:PayloadAction<{
        customerId:string;
        notificationId:string;
      }>
    )=>{


      const list =
        state.byCustomer[
          action.payload.customerId
        ];



      if(!list)
        return;



      const notification =
        list.find(
          item =>
            item.id ===
            action.payload.notificationId
        );



      if(notification){

        notification.read=true;

      }



      saveNotifications(
        state.byCustomer
      );

    },





    markAllAsRead:

    (
      state,
      action:PayloadAction<string>
    )=>{


      const list =
        state.byCustomer[
          action.payload
        ];



      if(!list)
        return;



      list.forEach(
        item=>{
          item.read=true;
        }
      );



      saveNotifications(
        state.byCustomer
      );

    },





    removeNotification:

    (
      state,
      action:PayloadAction<{
        customerId:string;
        notificationId:string;
      }>
    )=>{


      const list =
        state.byCustomer[
          action.payload.customerId
        ];



      if(!list)
        return;



      state.byCustomer[
        action.payload.customerId
      ] =
        list.filter(
          item =>
          item.id !==
          action.payload.notificationId
        );



      saveNotifications(
        state.byCustomer
      );


    },





    clearNotifications:

    (
      state,
      action:PayloadAction<string>
    )=>{


      state.byCustomer[
        action.payload
      ]=[];



      saveNotifications(
        state.byCustomer
      );


    },





  },

});





export const {

  addNotification,

  markAsRead,

  markAllAsRead,

  removeNotification,

  clearNotifications,


} =
notificationSlice.actions;



export const notificationReducer =
notificationSlice.reducer;


// FakeRealtimeProvider
//         │
//         │ addNotification(...)
//         ↓
// notificationSlice
//         │
//         │ saveNotifications()
//         ↓
// localStorage
//         │
//         ↓
// selectNotifications
//         │
//         ├── filter valid notifications
//         ↓
// selectUnreadCount
//         │
//         ↓
// CustomerHeader