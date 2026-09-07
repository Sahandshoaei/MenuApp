import type { Category } from "@/entities/menu/types/category";

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
              ? "border-primary bg-primary/10"
              : "border-amber-900/20 bg-[#1a120b]"
          }
        `}
      >
        <span className="text-sm text-zinc-200">همه</span>
        <span className="text-xs text-zinc-500">
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
                ? "border-primary bg-primary/10"
                : "border-amber-900/20 bg-[#1a120b]"
            }
          `}
        >
          <span className="text-xl">{category.icon}</span>
          <span className="flex flex-col items-start">
            <span className="text-sm text-zinc-200">{category.title}</span>
            <span className="text-xs text-zinc-500">
              {itemCountByCategory[category.id] ?? 0} items
            </span>
          </span>
        </button>
      ))}
    </div>
  );
};

export default CategoryChips;
