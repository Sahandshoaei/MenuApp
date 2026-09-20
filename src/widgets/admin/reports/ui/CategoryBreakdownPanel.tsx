import Card from "@/shared/Card";
import CategoryBreakdownBar from "@/features/admin/reports/CategoryBreakdownBar";
import CategoryIcon from "@/entities/menu/ui/CategoryIcon";
import { useReportsData } from "../lib/useReportsData";
import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface CategoryBreakdownPanelProps {
  period: TimePeriod;
}

const CategoryBreakdownPanel = ({ period }: CategoryBreakdownPanelProps) => {
  const { categoryBreakdown } = useReportsData(period);

  if (categoryBreakdown.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
        هنوز سفارشی برای محاسبه‌ی عملکرد دسته‌بندی‌ها ثبت نشده.
      </p>
    );
  }

  return (
    <Card className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-5">
      {categoryBreakdown.map((category) => (
        <CategoryBreakdownBar
          key={category.categoryId}
          icon={
            <CategoryIcon
              category={{
                id: category.categoryId,
                title: category.title,
                icon: category.icon,
              }}
              size={16}
            />
          }
          title={category.title}
          revenue={category.revenue}
          percentage={category.percentage}
        />
      ))}
    </Card>
  );
};

export default CategoryBreakdownPanel;
