import StatsGrid from "@/widgets/admin/dashboard/ui/StatsGrid";
import RecentOrdersList from "@/widgets/admin/dashboard/ui/RecentOrdersList";
import Charts from "@/widgets/admin/dashboard/ui/Charts";

const AdminDashboardPage = () => {
  return (
    <div className="flex flex-col gap-6">
      {/* ردیف ۱: ۴ کارت آماری */}
      <StatsGrid />

     {/* ردیف ۳: لیست سفارش‌های اخیر */}
      <RecentOrdersList />
      
      {/* ردیف ۲: نمودار درآمد + نمودار تعداد سفارش‌ها */}
      
      <Charts/>

     
    </div>
  );
};

export default AdminDashboardPage;
