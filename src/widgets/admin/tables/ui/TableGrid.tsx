import { useTable } from "@/entities/table/hooks/useTable";
import TableCard from "@/features/admin/tables/TableCard";

const TableGrid = () => {
  const { tables, reserve, occupy, release } = useTable();

  if (tables.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500">
        میزی برای نمایش وجود ندارد.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6">
      {tables.map((table) => (
        <TableCard
          key={table.id}
          table={table}
          onReserve={() => reserve(table.id)}
          onOccupy={() => occupy(table.id)}
          onRelease={() => release(table.id)}
        />
      ))}
    </div>
  );
};

export default TableGrid;
