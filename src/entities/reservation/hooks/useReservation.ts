import {

useAppDispatch,

useAppSelector

} from "@/app/store/hooks";


import {

selectReservations,

selectActiveReservations

} from "../state/reservationSelector";


import {
reservationService
} from "../service/reservationService";



import type {
 Reservation
} from "../types/reservation";




export const useReservation=()=>{


const dispatch=
useAppDispatch();



const reservations=
useAppSelector(
 selectReservations
);



const activeReservations=
useAppSelector(
 selectActiveReservations
);




return {


 reservations,


 activeReservations,



 create:
 (reservation:Reservation)=>
 reservationService.create(
  dispatch,
  reservation
 ),



 updateStatus:
 (
 id:string,
 status:Reservation["status"]
 )=>

 reservationService.updateStatus(
  dispatch,
  id,
  status
 ),



 remove:
 (id:string)=>
 reservationService.remove(
  dispatch,
  id
 )


};


};



//       Customer
//                  |
//                  |
//               Order
//                  |
//                  |
//             Reservation
//                  |
//                  |
//               Table


// Admin
//  |
// Tables Page
//  |
// Reservation
//  |
// Table Status