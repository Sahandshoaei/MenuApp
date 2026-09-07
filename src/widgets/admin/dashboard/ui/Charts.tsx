import RevenueChart from "@/features/admin/dashboard/RevenueChart";
import OrdersSummaryChart from "@/features/admin/dashboard/OrdersSummaryChart";

const Charts = ()=>{

    return(
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <RevenueChart />
            <OrdersSummaryChart />
          </div>
    )
}

export default Charts;