import type { MenuItem } from "@/entities/menu/types/menu-item";

interface ItemDetailsPanelProps {
  item: MenuItem;
}

const ItemDetailsPanel = ({ item }: ItemDetailsPanelProps) => {
  return (
    <div className="mt-5 flex items-center justify-between">
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)]">{item.name}</h2>
      <span className="text-xl font-bold text-[var(--color-accent-strong)]">
        ${item.price.toFixed(2)}
      </span>
    </div>
  );
};

export default ItemDetailsPanel;
