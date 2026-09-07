import type { Category } from "@/entities/menu/types/category";

interface CategoryListItemProps {
  category: Category;
  itemCount: number;
  onEdit: () => void;
  onDelete: () => void;
}

const CategoryListItem = ({
  category,
  itemCount,
  onEdit,
  onDelete,
}: CategoryListItemProps) => {
  const canDelete = itemCount === 0;

  return (
    <div
      className="
        flex
        items-center
        justify-between
        rounded-2xl
        border
        border-amber-900/20
        bg-[#1a120b]
        px-4
        py-3
      "
    >
      <div className="flex items-center gap-3">
        <span className="text-xl">{category.icon}</span>
        <div>
          <p className="text-sm text-white">{category.title}</p>
          <p className="text-xs text-zinc-500">{itemCount} items</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-amber-900/30 px-3 py-1.5 text-xs text-zinc-300 hover:bg-white/5"
        >
          ویرایش
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          title={canDelete ? "" : "این دسته‌بندی آیتم دارد، ابتدا آیتم‌ها را جابه‌جا/حذف کنید"}
          className="
            rounded-lg
            border
            border-red-900/40
            px-3
            py-1.5
            text-xs
            text-red-400
            hover:bg-red-500/10
            disabled:cursor-not-allowed
            disabled:opacity-30
            disabled:hover:bg-transparent
          "
        >
          حذف
        </button>
      </div>
    </div>
  );
};

export default CategoryListItem;
