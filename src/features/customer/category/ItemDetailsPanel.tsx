import type { MenuItem } from "@/entities/menu/types/menu-item";
import { formatToman } from "@/shared/format/money";

interface ItemDetailsPanelProps {
  item: MenuItem;
}

const ItemDetailsPanel = ({ item }: ItemDetailsPanelProps) => {
  return (
    <div className="mt-5 flex items-start justify-between gap-4">
      <h2 className="text-xl font-semibold leading-snug text-[var(--color-text-primary)]">
        {item.name}
      </h2>
      <span className="shrink-0 text-xl font-bold text-[var(--color-accent-strong)]">
        {formatToman(item.price)}
      </span>
    </div>
  );
};

export default ItemDetailsPanel;
