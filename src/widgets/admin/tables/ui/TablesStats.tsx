import { LayoutGrid, CheckCircle2, Clock, Users } from "lucide-react";
import StatCard from "@/entities/common/ui/StatCard";
import { useTable } from "@/entities/table/hooks/useTable";

const TablesStats = () => {
  const { stats } = useTable();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="کل میزها" value={stats.total} icon={LayoutGrid} />
      <StatCard label="خالی" value={stats.available} icon={CheckCircle2} />
      <StatCard label="رزرو شده" value={stats.reserved} icon={Clock} />
      <StatCard label="اشغال" value={stats.occupied} icon={Users} />
    </div>
  );
};

export default TablesStats;
