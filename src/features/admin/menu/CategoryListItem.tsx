import type { Category } from "@/entities/menu/types/category";
import CategoryIcon from "@/entities/menu/ui/CategoryIcon";

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
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        px-4
        py-3
      "
    >
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-tint)] text-[var(--color-text-primary)]">
          <CategoryIcon category={category} size={20} />
        </span>
        <div>
          <p className="text-sm text-[var(--color-text-primary)]">{category.title}</p>
          <p className="text-xs text-[var(--color-text-secondary)]">{itemCount} items</p>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="rounded-lg border border-[var(--color-border-strong)] px-3 py-1.5 text-xs text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
        >
          ویرایش
        </button>

        <button
          type="button"
          onClick={onDelete}
          disabled={!canDelete}
          title={
            canDelete
              ? ""
              : "این دسته‌بندی آیتم دارد، ابتدا آیتم‌ها را جابه‌جا/حذف کنید"
          }
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
