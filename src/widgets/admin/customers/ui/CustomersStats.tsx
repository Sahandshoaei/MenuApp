import { Users, Wallet, Crown, TrendingUp } from "lucide-react";
import StatCard from "@/entities/common/ui/StatCard";
import type { useCustomersData } from "../lib/useCustomersData";

interface CustomersStatsProps {
  stats: ReturnType<typeof useCustomersData>["stats"];
}

const CustomersStats = ({ stats }: CustomersStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard label="تعداد مشتری" value={stats.totalCustomers} icon={Users} />

      <StatCard
        label="مجموع خرید"
        value={`$${stats.totalRevenue.toFixed(2)}`}
        icon={Wallet}
      />

      <StatCard label="اعضای Gold" value={stats.goldCount} icon={Crown} />

      <StatCard
        label="میانگین خرید"
        value={`$${stats.averageSpent.toFixed(2)}`}
        icon={TrendingUp}
      />
    </div>
  );
};

export default CustomersStats;
