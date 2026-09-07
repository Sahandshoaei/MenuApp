import type { AppDispatch } from "@/app/store";


import {

 reserveTable,

 occupyTable,

 releaseTable,

 updateTableStatus,

} from "../state/tableSlice";


import type {
 TableStatus
} from "../types/table";



export const tableService = {


 updateStatus(
  dispatch:AppDispatch,
  tableId:string,
  status:TableStatus
 ){

  dispatch(
   updateTableStatus({
    tableId,
    status
   })
  );

 },


 reserve(
  dispatch:AppDispatch,
  tableId:string
 ){

  dispatch(
   reserveTable(tableId)
  );

 },


 occupy(
  dispatch:AppDispatch,
  tableId:string
 ){

  dispatch(
   occupyTable(tableId)
  );

 },


 release(
  dispatch:AppDispatch,
  tableId:string
 ){

  dispatch(
   releaseTable(tableId)
  );

 },


};