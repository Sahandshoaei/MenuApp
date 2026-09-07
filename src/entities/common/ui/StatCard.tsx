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
        border-amber-900/20
        bg-[#1a120b]
        p-4
      "
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-zinc-400">{label}</p>
          <p className="mt-1 text-2xl font-semibold text-white">{value}</p>
        </div>

        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-primary/15
            text-primary
          "
        >
          <Icon size={18} />
        </div>
      </div>
    </Card>
  );
};

export default StatCard;
