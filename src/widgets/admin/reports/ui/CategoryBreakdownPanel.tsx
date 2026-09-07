import Card from "@/shared/Card";
import CategoryBreakdownBar from "@/features/admin/reports/CategoryBreakdownBar";
import { useReportsData } from "../lib/useReportsData";
import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface CategoryBreakdownPanelProps {
  period: TimePeriod;
}

const CategoryBreakdownPanel = ({ period }: CategoryBreakdownPanelProps) => {
  const { categoryBreakdown } = useReportsData(period);

  if (categoryBreakdown.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-zinc-500">
        هنوز سفارشی برای محاسبه‌ی عملکرد دسته‌بندی‌ها ثبت نشده.
      </p>
    );
  }

  return (
    <Card className="rounded-2xl border border-amber-900/20 bg-[#1a120b] p-5">
      {categoryBreakdown.map((category) => (
        <CategoryBreakdownBar
          key={category.categoryId}
          icon={category.icon}
          title={category.title}
          revenue={category.revenue}
          percentage={category.percentage}
        />
      ))}
    </Card>
  );
};

export default CategoryBreakdownPanel;
