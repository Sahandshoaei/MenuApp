import type { OrderTab } from "@/widgets/admin/orders/lib/useOrdersTableData";

interface OrdersTabsProps {
  value: OrderTab;
  onChange: (tab: OrderTab) => void;
}

const TABS: { value: OrderTab; label: string }[] = [
  { value: "all", label: "All Orders" },
  { value: "active", label: "Active" },
  { value: "completed", label: "Completed" },
];

const OrdersTabs = ({ value, onChange }: OrdersTabsProps) => {
  return (
    <div className="flex items-center gap-6">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`
            pb-3 text-sm transition-colors
            ${
              value === tab.value
                ? "border-b-2 border-[var(--color-accent)] font-medium text-[var(--color-text-primary)]"
                : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default OrdersTabs;
