export type TableStatus =
  | "available"
  | "reserved"
  | "occupied";


export interface Table {

  id: string;

  number: number;

  status: TableStatus;

  capacity: number;

}


export interface TableState {

  tables: Table[];

}