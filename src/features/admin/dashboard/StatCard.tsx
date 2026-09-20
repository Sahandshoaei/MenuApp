import type { LucideIcon } from "lucide-react";
import Card from "@/shared/Card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
}

const StatCard = ({ label, value, icon: Icon }: StatCardProps) => {
  return (
    <Card
      className="
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-[var(--color-text-secondary)]">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-[var(--color-text-primary)]">{value}</p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-accent-tint-strong)]
            text-[var(--color-accent)]
          "
        >
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
