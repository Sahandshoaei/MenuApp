export type OrderTabKey = "active" | "past" | "cancelled";

interface OrderTabsProps {
  activeTab: OrderTabKey;
  onTabChange: (tab: OrderTabKey) => void;
}

const TABS: { key: OrderTabKey; label: string }[] = [
  { key: "active", label: "Active" },
  { key: "past", label: "Past" },
  { key: "cancelled", label: "Cancelled" },
];

export const OrderTabs = ({ activeTab, onTabChange }: OrderTabsProps) => {
  return (
    <div
      className="
        flex
        items-center
        gap-1
        rounded-2xl
        p-1
      "
      style={{
        background: "var(--color-surface)",
        border: "0.5px solid var(--color-border)",
      }}
    >
      {TABS.map((tab) => {
        const isActive = tab.key === activeTab;

        return (
          <button
            key={tab.key}
            type="button"
            onClick={() => onTabChange(tab.key)}
            className="
              flex-1
              rounded-xl
              px-3
              py-2
              text-sm
              font-medium
              transition-colors
            "
            style={{
              background: isActive ? "var(--color-accent-strong)" : "transparent",
              color: isActive ? "var(--color-surface)" : "var(--color-text-secondary)",
            }}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};