import {
  createSelector
} from "@reduxjs/toolkit";

import type {
  RootState
} from "../../../app/store/types";



export const selectTables = (
 state:RootState
)=>
 state.table.tables;




export const selectTableById = (
 state:RootState,
 tableId:string
)=>
 state.table.tables.find(
  table=>table.id===tableId
 );




export const selectAvailableTables =
createSelector(

 [
  selectTables
 ],

 (tables)=>
 tables.filter(
  table=>
  table.status==="available"
 )

);




export const selectOccupiedTables =
createSelector(

 [
  selectTables
 ],

 (tables)=>
 tables.filter(
  table=>
  table.status==="occupied"
 )

);




export const selectReservedTables =
createSelector(

 [
  selectTables
 ],

 (tables)=>
 tables.filter(
  table=>
  table.status==="reserved"
 )

);



export const selectTableStats =
createSelector(

 [
  selectTables
 ],

(tables)=>({

 total:
  tables.length,


 available:
  tables.filter(
   t=>t.status==="available"
  ).length,


 reserved:
  tables.filter(
   t=>t.status==="reserved"
  ).length,


 occupied:
  tables.filter(
   t=>t.status==="occupied"
  ).length,

})

);