import { useState } from "react";
import ReportsTabs, { type ReportsTab } from "@/features/admin/reports/ReportsTabs";
import PeriodToggle from "@/features/admin/dashboard/PeriodToggle";
import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";
import ReportsOverviewPanel from "./ReportsOverviewPanel";
import BestSellersPanel from "./BestSellersPanel";
import CategoryBreakdownPanel from "./CategoryBreakdownPanel";

const ReportsManager = () => {
  const [tab, setTab] = useState<ReportsTab>("overview");
  const [period, setPeriod] = useState<TimePeriod>("weekly");

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between border-b border-amber-900/20">
        <ReportsTabs value={tab} onChange={setTab} />
        <div className="pb-3">
          <PeriodToggle value={period} onChange={setPeriod} />
        </div>
      </div>

      {tab === "overview" && <ReportsOverviewPanel period={period} />}
      {tab === "bestsellers" && <BestSellersPanel period={period} />}
      {tab === "categories" && <CategoryBreakdownPanel period={period} />}
    </div>
  );
};

export default ReportsManager;
