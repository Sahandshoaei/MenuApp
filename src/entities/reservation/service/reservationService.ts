import type {AppDispatch} from "@/app/store";
import {
createReservation,
updateReservationStatus,
removeReservation
} from "../state/reservationSlice";

import type {
 Reservation,
 ReservationStatus
} from "../types/reservation";





export const reservationService={



 create(

 dispatch:AppDispatch,

 reservation:Reservation

 ){

 dispatch(
  createReservation(
   reservation
  )
 );

 },




 updateStatus(

 dispatch:AppDispatch,

 id:string,

 status:ReservationStatus

 ){

 dispatch(
  updateReservationStatus({
   id,
   status
  })
 );


 },




 remove(

 dispatch:AppDispatch,

 id:string

 ){

 dispatch(
  removeReservation(id)
 );

 },


};