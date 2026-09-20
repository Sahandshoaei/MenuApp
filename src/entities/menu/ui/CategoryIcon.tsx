import { getCategoryIcon } from "../constants/categoryIcons";
import type { Category } from "../types/category";

type Props = {
  category: Pick<Category, "id" | "title" | "icon">;
  size?: number;
  className?: string;
};

/**
 * Renders a category glyph safely:
 * 1) Lucide map by id/title when available
 * 2) else the emoji/string stored on category.icon
 * Never tries to render a component object as a child.
 */
const CategoryIcon = ({ category, size = 20, className }: Props) => {
  const LucideIcon = getCategoryIcon(category);

  if (LucideIcon) {
    return (
      <LucideIcon
        size={size}
        strokeWidth={1.75}
        className={className ?? "text-current"}
      />
    );
  }

  const fallback =
    typeof category.icon === "string" && category.icon.trim()
      ? category.icon
      : "🍽️";

  return (
    <span
      className={className}
      style={{ fontSize: size, lineHeight: 1 }}
      aria-hidden
    >
      {fallback}
    </span>
  );
};

export default CategoryIcon;
