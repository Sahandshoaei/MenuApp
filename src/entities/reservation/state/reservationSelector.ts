import {
 createSelector
} from "@reduxjs/toolkit";


import type {
 RootState
} from "../../../app/store/types";



export const selectReservations =
(
 state:RootState
)=>
 Object.values(
  state.reservation.reservations
 );





export const selectReservationById =
(
 state:RootState,
 id:string
)=>
 state.reservation.reservations[id]
 ?? null;





export const selectReservationsByTable =
createSelector(

 [
  selectReservations,
  (
   state:RootState,
   tableId:string
  )=>tableId
 ],

 (
 reservations,
 tableId
 )=>

 reservations.filter(
  r=>r.tableId===tableId
 )

);





export const selectActiveReservations =
createSelector(

 [
  selectReservations
 ],

 reservations=>

 reservations.filter(

 r=>

 r.status==="pending"
 ||
 r.status==="confirmed"

 )

);