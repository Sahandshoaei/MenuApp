import {
 useAppDispatch,
 useAppSelector
} from "@/app/store/hooks";


import {

selectTables,

selectTableStats,

selectAvailableTables,

} from "../state/tableSelector";


import {
 tableService
} from "../service/tableService";



export const useTable = ()=>{


 const dispatch =
 useAppDispatch();


 const tables =
 useAppSelector(
  selectTables
 );


 const stats =
 useAppSelector(
  selectTableStats
 );


 const available =
 useAppSelector(
  selectAvailableTables
 );



 return {


  tables,


  stats,


  available,


  reserve:
   (id:string)=>
    tableService.reserve(
     dispatch,
     id
    ),



  occupy:
   (id:string)=>
    tableService.occupy(
     dispatch,
     id
    ),



  release:
   (id:string)=>
    tableService.release(
     dispatch,
     id
    ),



  updateStatus:
   (
    id:string,
    status:any
   )=>
    tableService.updateStatus(
     dispatch,
     id,
     status
    ),

 };

};


// Data flow

// ثبت سفارش مشتری

// Customer
//    |
// Checkout
//    |
// Select Table
//    |
// useTable()
//    |
// createOrder()
//    |
// reserveTable()
//    |
// updateTableStatus()




// Admin

// AdminTablesPage

//         |
//         |

// useTables()

//         |
//         |

// tableSelector

//         |
//         |

// Redux table state

//         |
//         |

// TableGrid
// TableStats