import type { ReactNode } from "react";

interface CategoryBreakdownBarProps {
  icon: ReactNode;
  title: string;
  revenue: number;
  percentage: number;
}

const CategoryBreakdownBar = ({
  icon,
  title,
  revenue,
  percentage,
}: CategoryBreakdownBarProps) => {
  return (
    <div className="py-2.5">
      <div className="mb-1.5 flex items-center justify-between">
        <span className="flex items-center gap-2 text-sm text-[var(--color-text-primary)]">
          <span className="flex items-center justify-center">{icon}</span>
          {title}
        </span>

        <span className="text-xs text-[var(--color-text-secondary)]">
          ${revenue.toFixed(2)} · {percentage.toFixed(0)}%
        </span>
      </div>

      <div className="h-2 overflow-hidden rounded-full bg-[var(--color-accent-tint)]">
        <div
          className="h-full rounded-full bg-[var(--color-accent)]"
          style={{ width: `${Math.min(percentage, 100)}%` }}
        />
      </div>
    </div>
  );
};

export default CategoryBreakdownBar;
