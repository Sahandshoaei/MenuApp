import type { TimePeriod } from "@/widgets/admin/dashboard/lib/useOrdersTimeSeries";

interface PeriodToggleProps {
  value: TimePeriod;
  onChange: (value: TimePeriod) => void;
}

const OPTIONS: { value: TimePeriod; label: string }[] = [
  { value: "monthly", label: "ماهانه" },
  { value: "weekly", label: "هفتگی" },
  { value: "today", label: "امروز" },
];

const PeriodToggle = ({ value, onChange }: PeriodToggleProps) => {
  return (
    <div className="flex items-center gap-1 rounded-full bg-[var(--color-accent-tint)] p-1">
      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          onClick={() => onChange(option.value)}
          className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
            value === option.value
              ? "bg-[var(--color-accent)] text-white"
              : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default PeriodToggle;
