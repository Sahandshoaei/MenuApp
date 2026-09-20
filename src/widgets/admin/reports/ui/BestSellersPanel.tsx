import Card from "@/shared/Card";
import BestSellerRow from "@/features/admin/reports/BestSellerRow";
import { useReportsData } from "../lib/useReportsData";
import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface BestSellersPanelProps {
  period: TimePeriod;
}

const BestSellersPanel = ({ period }: BestSellersPanelProps) => {
  const { bestSellers } = useReportsData(period);

  if (bestSellers.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
        هنوز سفارشی برای محاسبه‌ی پرفروش‌ترین‌ها ثبت نشده.
      </p>
    );
  }

  return (
    <Card className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-2">
      {bestSellers.map((item, index) => (
        <BestSellerRow
          key={item.menuItemId}
          rank={index + 1}
          name={item.name}
          quantity={item.quantity}
          revenue={item.revenue}
        />
      ))}
    </Card>
  );
};

export default BestSellersPanel;
