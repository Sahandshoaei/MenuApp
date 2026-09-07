import { ClipboardList, DollarSign, Flame, UtensilsCrossed } from "lucide-react";
import StatCard from "@/features/admin/dashboard/StatCard";
import { useDashboardStats } from "../lib/useDashboardStats";

const StatsGrid = () => {
  const { todayOrdersCount, todayRevenue, activeOrdersCount, menuItemsCount } =
    useDashboardStats();

  return (
    <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
      <StatCard
        label="سفارش امروز"
        value={todayOrdersCount}
        icon={ClipboardList}
      />

      <StatCard
        label="درآمد امروز"
        value={`$${todayRevenue.toFixed(2)}`}
        icon={DollarSign}
      />

      <StatCard
        label="سفارش فعال"
        value={activeOrdersCount}
        icon={Flame}
      />

      <StatCard
        label="آیتم منو"
        value={menuItemsCount}
        icon={UtensilsCrossed}
      />
    </div>
  );
};

export default StatsGrid;
