import type { MenuItem } from "@/entities/menu/types/menu-item";

interface ProductGridItemProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductGridItem = ({ item, onEdit, onDelete }: ProductGridItemProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)]">
      <div className="flex h-24 items-center justify-center bg-[var(--color-accent-tint)]">
        {item.image ? (
          <img
            src={item.image}
            alt={item.name}
            className="h-full w-full object-cover"
          />
        ) : (
          <span className="text-3xl">🍽️</span>
        )}
      </div>

      <div className="p-3">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm text-[var(--color-text-primary)]">{item.name}</span>
          <span className="shrink-0 text-sm text-[var(--color-accent)]">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1 truncate text-xs text-[var(--color-text-secondary)]">
          {item.description}
        </p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-lg border border-[var(--color-border-strong)] py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
          >
            ویرایش
          </button>

          <button
            type="button"
            onClick={onDelete}
            className="flex-1 rounded-lg border border-red-900/40 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductGridItem;
