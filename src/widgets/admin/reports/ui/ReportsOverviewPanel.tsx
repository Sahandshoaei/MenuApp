import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DollarSign, ClipboardList, TrendingUp } from "lucide-react";
import Card from "@/shared/Card";
import StatCard from "@/entities/common/ui/StatCard";
import { useReportsData } from "../lib/useReportsData";
import { useOrdersTimeSeries, type TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface ReportsOverviewPanelProps {
  period: TimePeriod;
}

const ReportsOverviewPanel = ({ period }: ReportsOverviewPanelProps) => {
  const { overview } = useReportsData(period);
  const trend = useOrdersTimeSeries(period);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
        <StatCard
          label="درآمد"
          value={`$${overview.totalRevenue.toFixed(2)}`}
          icon={DollarSign}
        />
        <StatCard
          label="تعداد سفارش"
          value={overview.totalOrders}
          icon={ClipboardList}
        />
        <StatCard
          label="میانگین هر سفارش"
          value={`$${overview.avgOrderValue.toFixed(2)}`}
          icon={TrendingUp}
        />
      </div>

      <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
        <h3 className="mb-4 text-sm font-medium text-[var(--color-text-primary)]">روند درآمد</h3>

        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trend}>
              <defs>
                <linearGradient id="reportsRevenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity={0} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" vertical={false} />

              <XAxis dataKey="label" stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="var(--color-text-secondary)" fontSize={12} tickLine={false} axisLine={false} />

              <Tooltip
                contentStyle={{
                  background: "var(--color-surface)",
                  border: "1px solid rgba(232,131,42,0.3)",
                  borderRadius: 8,
                }}
                labelStyle={{ color: "var(--color-text-primary)" }}
                formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
              />

              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--color-accent)"
                strokeWidth={2}
                fill="url(#reportsRevenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
};

export default ReportsOverviewPanel;
