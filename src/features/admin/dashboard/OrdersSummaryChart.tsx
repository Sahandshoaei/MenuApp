import { useState } from "react";
import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from "recharts";
import Card from "@/shared/Card";
import PeriodToggle from "./PeriodToggle";
import { useOrdersTimeSeries, type TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

const OrdersSummaryChart = () => {
  const [period, setPeriod] = useState<TimePeriod>("weekly");
  const data = useOrdersTimeSeries(period);

  return (
    <Card
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-5
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-[var(--color-text-primary)]">خلاصه سفارش‌ها</h3>
        <PeriodToggle value={period} onChange={setPeriod} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="var(--color-text-secondary)"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />

            <Tooltip
              contentStyle={{
                background: "var(--color-surface)",
                border: "1px solid rgba(232,131,42,0.3)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "var(--color-text-primary)" }}
              formatter={(value) => [`${value}`, "سفارش‌ها"]}
            />

            <Bar dataKey="orders" fill="var(--color-accent)" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default OrdersSummaryChart;
