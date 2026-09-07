import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface PeriodToggleProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

const OPTIONS: { value: TimePeriod; label: string }[] = [
  { value: "monthly", label: "Monthly" },
  { value: "weekly", label: "Weekly" },
  { value: "today", label: "Today" },
];

const PeriodToggle = ({ value, onChange }: PeriodToggleProps) => {
  return (
    <div className="flex items-center gap-1 rounded-full bg-white/5 p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            value === option.value
              ? "bg-primary text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodToggle;
