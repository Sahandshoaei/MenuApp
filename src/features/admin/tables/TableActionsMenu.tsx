import { useEffect, useRef } from "react";
import type { TableStatus } from "@/entities/table/types/table";

interface TableActionsMenuProps {
  status: TableStatus;
  onReserve: () => void;
  onOccupy: () => void;
  onRelease: () => void;
  onClose: () => void;
}

const TableActionsMenu = ({
  status,
  onReserve,
  onOccupy,
  onRelease,
  onClose,
}: TableActionsMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      ref={menuRef}
      onClick={(e) => e.stopPropagation()}
      className="
        absolute
        top-full
        left-1/2
        z-10
        mt-2
        w-32
        -translate-x-1/2
        overflow-hidden
        rounded-xl
        border
        border-amber-900/30
        bg-[#1a120b]
        shadow-lg
      "
    >
      {status === "available" && (
        <button
          type="button"
          onClick={onReserve}
          className="w-full px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/5"
        >
          رزرو
        </button>
      )}

      {status !== "occupied" && (
        <button
          type="button"
          onClick={onOccupy}
          className="w-full px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/5"
        >
          اشغال
        </button>
      )}

      {status !== "available" && (
        <button
          type="button"
          onClick={onRelease}
          className="w-full px-3 py-2 text-center text-xs text-zinc-200 hover:bg-white/5"
        >
          آزادسازی
        </button>
      )}
    </div>
  );
};

export default TableActionsMenu;
