import { useState } from "react";
import {AreaChart,Area,XAxis,YAxis,Tooltip,ResponsiveContainer,CartesianGrid} from "recharts";
import Card from "@/shared/Card";
import PeriodToggle from "./PeriodToggle";
import { useOrdersTimeSeries, type TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

const RevenueChart = () => {
  const [period, setPeriod] = useState<TimePeriod>("weekly");
  const data = useOrdersTimeSeries(period);

  return (
    <Card
      className="
        rounded-2xl
        border
        border-amber-900/20
        bg-[#1a120b]
        p-5
      "
    >
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-medium text-white">Revenue</h3>
        <PeriodToggle value={period} onChange={setPeriod} />
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e8832a" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#e8832a" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(255,255,255,0.06)"
              vertical={false}
            />

            <XAxis
              dataKey="label"
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <YAxis
              stroke="#71717a"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />

            <Tooltip
              contentStyle={{
                background: "#1a120b",
                border: "1px solid rgba(232,131,42,0.3)",
                borderRadius: 8,
              }}
              labelStyle={{ color: "#fff" }}
              formatter={(value) => [`$${Number(value).toFixed(2)}`, "Revenue"]}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#e8832a"
              strokeWidth={2}
              fill="url(#revenueGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};

export default RevenueChart;
