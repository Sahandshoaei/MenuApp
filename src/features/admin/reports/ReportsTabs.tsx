export type ReportsTab = "overview" | "bestsellers" | "categories";

interface ReportsTabsProps {
  value: ReportsTab;
  onChange: (tab: ReportsTab) => void;
}

const TABS: { value: ReportsTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "bestsellers", label: "Best Sellers" },
  { value: "categories", label: "Categories" },
];

const ReportsTabs = ({ value, onChange }: ReportsTabsProps) => {
  return (
    <div className="flex items-center gap-6 border-b border-amber-900/20">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`pb-3 text-sm transition-colors ${
            value === tab.value
              ? "border-b-2 border-primary font-medium text-white"
              : "text-zinc-400 hover:text-zinc-200"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default ReportsTabs;
