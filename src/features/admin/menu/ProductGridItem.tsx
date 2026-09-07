import type { MenuItem } from "@/entities/menu/types/menu-item";

interface ProductGridItemProps {
  item: MenuItem;
  onEdit: () => void;
  onDelete: () => void;
}

const ProductGridItem = ({ item, onEdit, onDelete }: ProductGridItemProps) => {
  return (
    <div className="overflow-hidden rounded-2xl border border-amber-900/20 bg-[#1a120b]">
      <div className="flex h-24 items-center justify-center bg-white/5">
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
          <span className="truncate text-sm text-white">{item.name}</span>
          <span className="shrink-0 text-sm text-primary">
            ${item.price.toFixed(2)}
          </span>
        </div>

        <p className="mt-1 truncate text-xs text-zinc-500">
          {item.description}
        </p>

        <div className="mt-3 flex gap-2">
          <button
            type="button"
            onClick={onEdit}
            className="flex-1 rounded-lg border border-amber-900/30 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
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
