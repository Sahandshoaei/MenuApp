export type ItemInfoTab = "info" | "ingredients";

interface ItemInfoTabsProps {
  activeTab: ItemInfoTab;
  onChange: (tab: ItemInfoTab) => void;
  weightLabel?: string;
}

const ItemInfoTabs = ({ activeTab, onChange, weightLabel }: ItemInfoTabsProps) => {
  return (
    <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5">
      <div className="flex gap-1">
        <button
          type="button"
          onClick={() => onChange("info")}
          className="rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          style={{
            background: activeTab === "info" ? "var(--color-accent)" : "transparent",
            color: activeTab === "info" ? "#fff" : "var(--color-text-secondary)",
          }}
        >
          Info
        </button>

        <button
          type="button"
          onClick={() => onChange("ingredients")}
          className="rounded-xl px-4 py-2 text-sm font-medium transition-colors"
          style={{
            background: activeTab === "ingredients" ? "var(--color-accent)" : "transparent",
            color: activeTab === "ingredients" ? "#fff" : "var(--color-text-secondary)",
          }}
        >
          Ingredients
        </button>
      </div>

      {weightLabel && (
        <span className="pr-2 text-xs text-[var(--color-text-secondary)]">{weightLabel}</span>
      )}
    </div>
  );
};

export default ItemInfoTabs;
