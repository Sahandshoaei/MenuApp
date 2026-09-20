import type { Category } from "@/entities/menu/types/category";
import CategoryIcon from "@/entities/menu/ui/CategoryIcon";

interface CategoryChipsProps {
  categories: Category[];
  itemCountByCategory: Record<string, number>;
  selected: string | null;
  onSelect: (categoryId: string | null) => void;
}

const CategoryChips = ({
  categories,
  itemCountByCategory,
  selected,
  onSelect,
}: CategoryChipsProps) => {
  return (
    <div className="flex gap-2.5 overflow-x-auto pb-1">
      <button
        type="button"
        onClick={() => onSelect(null)}
        className={`
          flex
          shrink-0
          flex-col
          items-start
          rounded-2xl
          border
          px-4
          py-2
          text-right
          ${
            selected === null
              ? "border-[var(--color-accent)] bg-[var(--color-accent-tint)]"
              : "border-[var(--color-border)] bg-[var(--color-surface)]"
          }
        `}
      >
        <span className="text-sm text-[var(--color-text-primary)]">همه</span>
        <span className="text-xs text-[var(--color-text-secondary)]">
          {Object.values(itemCountByCategory).reduce((a, b) => a + b, 0)} items
        </span>
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          type="button"
          onClick={() => onSelect(category.id)}
          className={`
            flex
            shrink-0
            items-center
            gap-2
            rounded-2xl
            border
            px-4
            py-2
            ${
              selected === category.id
                ? "border-[var(--color-accent)] bg-[var(--color-accent-tint)]"
                : "border-[var(--color-border)] bg-[var(--color-surface)]"
            }
          `}
        >
          <CategoryIcon category={category} size={18} className="text-[var(--color-text-primary)]" />
          <span className="flex flex-col items-start">
            <span className="text-sm text-[var(--color-text-primary)]">{category.title}</span>
            <span className="text-xs text-[var(--color-text-secondary)]">
              {itemCountByCategory[category.id] ?? 0} items
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
