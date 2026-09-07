import {
 createSlice,
 type PayloadAction
} from "@reduxjs/toolkit";


import type {
 Reservation,
 ReservationState
} from "../types/reservation";



const STORAGE_KEY =
"reservations";



const loadReservations =
():Record<string,Reservation>=>{

 try{

  const data =
   localStorage.getItem(
    STORAGE_KEY
   );


  return data
   ? JSON.parse(data)
   : {};

 }catch{

  return {};

 }

};



const saveReservations =
(
 reservations:Record<string,Reservation>
)=>{

 localStorage.setItem(
  STORAGE_KEY,
  JSON.stringify(reservations)
 );

};



const initialState:ReservationState={

 reservations:
  loadReservations()

};




const reservationSlice =
createSlice({

 name:"reservation",

 initialState,


 reducers:{


 /* ایجاد رزرو */

 createReservation:(

  state,

  action:PayloadAction<Reservation>

 )=>{


  state.reservations[
   action.payload.id
  ] =
   action.payload;



  saveReservations(
   state.reservations
  );


 },




 /* تغییر وضعیت رزرو */

 updateReservationStatus:(

 state,

 action:PayloadAction<{
  id:string;
  status:Reservation["status"];
 }>

 )=>{


 const reservation =
 state.reservations[
  action.payload.id
 ];



 if(!reservation)
  return;



 reservation.status =
 action.payload.status;



 saveReservations(
  state.reservations
 );


 },




 /* حذف رزرو */

 removeReservation:(

 state,

 action:PayloadAction<string>

 )=>{


 delete state.reservations[
  action.payload
 ];



 saveReservations(
  state.reservations
 );


 },




 /* پاک کردن همه */

 clearReservations:(state)=>{


 state.reservations={};


 saveReservations(
  state.reservations
 );


 },


 }

});




export const {


 createReservation,

 updateReservationStatus,

 removeReservation,

 clearReservations


}=reservationSlice.actions;



export const reservationReducer =
reservationSlice.reducer;