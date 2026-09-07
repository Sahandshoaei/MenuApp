export type MenuTab = "products" | "categories" | "highlights";

interface MenuTabsProps {
  value: MenuTab;
  onChange: (tab: MenuTab) => void;
}

const TABS: { value: MenuTab; label: string }[] = [
  { value: "products", label: "Products" },
  { value: "categories", label: "Categories" },
  { value: "highlights", label: "Highlights" },
];

const MenuTabs = ({ value, onChange }: MenuTabsProps) => {
  return (
    <div className="flex items-center gap-6 border-b border-amber-900/20">
      {TABS.map((tab) => (
        <button
          key={tab.value}
          type="button"
          onClick={() => onChange(tab.value)}
          className={`
            pb-3
            text-sm
            transition-colors
            ${
              value === tab.value
                ? "border-b-2 border-primary font-medium text-white"
                : "text-zinc-400 hover:text-zinc-200"
            }
          `}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default MenuTabs;
