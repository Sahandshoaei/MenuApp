import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import type {
  Table,
  TableStatus,
  TableState,
} from "../types/table";


const STORAGE_KEY = "tables";


const loadTables = (): Table[] => {

  try {

    const data =
      localStorage.getItem(STORAGE_KEY);

    if (!data)
      return createDefaultTables();


    return JSON.parse(data);

  } catch {

    return createDefaultTables();

  }

};


const saveTables = (
  tables: Table[]
) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(tables)
  );

};



const createDefaultTables = (): Table[] => {

  return Array.from(
    { length: 20 },
    (_, index) => ({
      id:`table-${index + 1}`,
      number:index + 1,
      capacity:4,
      status:"available",
    })
  );

};



const initialState: TableState = {

  tables: loadTables(),

};



const tableSlice = createSlice({

  name:"table",

  initialState,


  reducers:{


    /* تغییر وضعیت میز */

    updateTableStatus: (
      state,
      action: PayloadAction<{
        tableId:string;
        status:TableStatus;
      }>
    )=>{


      const table =
        state.tables.find(
          t=>t.id === action.payload.tableId
        );


      if(!table)
        return;


      table.status =
        action.payload.status;


      saveTables(
        state.tables
      );

    },



    /* رزرو میز */

    reserveTable:(
      state,
      action:PayloadAction<string>
    )=>{


      const table =
        state.tables.find(
          t=>t.id === action.payload
        );


      if(!table)
        return;


      table.status="reserved";


      saveTables(
        state.tables
      );

    },



    /* اشغال شدن میز توسط سفارش */

    occupyTable:(
      state,
      action:PayloadAction<string>
    )=>{


      const table =
        state.tables.find(
          t=>t.id === action.payload
        );


      if(!table)
        return;


      table.status="occupied";


      saveTables(
        state.tables
      );

    },



    /* آزاد کردن میز */

    releaseTable:(
      state,
      action:PayloadAction<string>
    )=>{


      const table =
        state.tables.find(
          t=>t.id === action.payload
        );


      if(!table)
        return;


      table.status="available";


      saveTables(
        state.tables
      );

    },


    /* ساخت دوباره میزها */

    initializeTables:(
      state,
      action:PayloadAction<Table[]>
    )=>{

      state.tables =
        action.payload;


      saveTables(
        state.tables
      );

    },

  }

});


export const {

  updateTableStatus,

  reserveTable,

  occupyTable,

  releaseTable,

  initializeTables,

}=tableSlice.actions;



export const tableReducer =
  tableSlice.reducer;