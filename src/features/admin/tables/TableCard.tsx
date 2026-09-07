import { useState } from "react";
import { Users } from "lucide-react";
import type { Table } from "@/entities/table/types/table";
import { TABLE_STATUS_CONFIG } from "@/entities/table/lib/tableStatusConfig";
import TableActionsMenu from "./TableActionsMenu";

interface TableCardProps {
  table: Table;
  onReserve: () => void;
  onOccupy: () => void;
  onRelease: () => void;
}

const TableCard = ({ table, onReserve, onOccupy, onRelease }: TableCardProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const config = TABLE_STATUS_CONFIG[table.status];

  return (
    <div
      onClick={() => setMenuOpen((prev) => !prev)}
      className="
        relative
        flex
        cursor-pointer
        flex-col
        items-center
        gap-1
        rounded-2xl
        border
        bg-[#1a120b]
        p-4
        transition-colors
      "
      style={{
        borderColor: menuOpen ? config.color : "rgba(120,53,15,0.2)",
      }}
    >
      <span className="text-lg font-semibold text-white">{table.number}</span>

      <span
        className="rounded-full px-2 py-0.5 text-[11px] font-medium"
        style={{ color: config.color, background: config.bg }}
      >
        {config.label}
      </span>

      <span className="mt-1 flex items-center gap-1 text-[11px] text-zinc-500">
        <Users size={11} />
        {table.capacity}
      </span>

      {menuOpen && (
        <TableActionsMenu
          status={table.status}
          onReserve={() => {
            onReserve();
            setMenuOpen(false);
          }}
          onOccupy={() => {
            onOccupy();
            setMenuOpen(false);
          }}
          onRelease={() => {
            onRelease();
            setMenuOpen(false);
          }}
          onClose={() => setMenuOpen(false)}
        />
      )}
    </div>
  );
};

export default TableCard;
