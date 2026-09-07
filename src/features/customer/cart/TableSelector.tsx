import type { Table } from "../../../entities/table/types/table";

type TableSelectorProps = {
  tables: Table[];
  selectedTableId: string | null;
  onSelect: (tableId: string) => void;
};

const TableSelector = ({
  tables,
  selectedTableId,
  onSelect,
}: TableSelectorProps) => {
  if (tables.length === 0) {
    return (
      <div
        className="mb-4 rounded-xl p-3 text-center text-xs"
        style={{
          background: "var(--color-surface)",
          border: "0.5px solid var(--color-border)",
          color: "var(--color-text-secondary)",
        }}
      >
        در حال حاضر میز خالی‌ای موجود نیست.
      </div>
    );
  }

  return (
    <div className="mb-4">
      <p className="mb-2 text-xs" style={{ color: "var(--color-text-secondary)" }}>
        میز خود را انتخاب کنید
      </p>

      <div className="flex flex-wrap gap-2">
        {tables.map((table) => {
          const isSelected = table.id === selectedTableId;

          return (
            <button
              key={table.id}
              type="button"
              onClick={() => onSelect(table.id)}
              className="flex h-10 w-10 items-center justify-center rounded-xl text-sm font-medium transition-colors"
              style={{
                background: isSelected
                  ? "var(--color-accent)"
                  : "var(--color-surface)",
                border: isSelected
                  ? "1px solid var(--color-accent)"
                  : "0.5px solid var(--color-border)",
                color: isSelected
                  ? "#fff"
                  : "var(--color-text-secondary)",
              }}
            >
              {table.number}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default TableSelector;
