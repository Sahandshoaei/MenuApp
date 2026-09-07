import type { TableStatus } from "../types/table";

export interface TableStatusConfig {
  label: string;
  color: string;
  bg: string;
}

export const TABLE_STATUS_CONFIG: Record<TableStatus, TableStatusConfig> = {
  available: {
    label: "Free",
    color: "#6fb37a",
    bg: "rgba(111,179,122,0.12)",
  },
  reserved: {
    label: "Reserved",
    color: "#f5a84e",
    bg: "rgba(245,168,78,0.15)",
  },
  occupied: {
    label: "Busy",
    color: "#d9695a",
    bg: "rgba(217,105,90,0.12)",
  },
};
