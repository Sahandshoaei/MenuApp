import { Users, Wallet, Crown, TrendingUp } from "lucide-react";
import StatCard from "@/entities/common/ui/StatCard";
import type { useCustomersData } from "../lib/useCustomersData";

interface CustomersStatsProps {
  stats: ReturnType<typeof useCustomersData>["stats"];
}

const formatNumber = (value: number) => value.toLocaleString("fa-IR");

const formatAmount = (value: number) =>
  value.toLocaleString("fa-IR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

const CustomersStats = ({ stats }: CustomersStatsProps) => {
  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        label="تعداد مشتری"
        value={formatNumber(stats.totalCustomers)}
        icon={Users}
      />

      <StatCard
        label="مجموع خرید"
        value={formatAmount(stats.totalRevenue)}
        icon={Wallet}
      />

      <StatCard
        label="اعضای طلایی"
        value={formatNumber(stats.goldCount)}
        icon={Crown}
      />

      <StatCard
        label="میانگین خرید"
        value={formatAmount(stats.averageSpent)}
        icon={TrendingUp}
      />
    </div>
  );
};

export default CustomersStats;
