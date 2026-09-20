import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectAllCategories,
  selectAllMenuItems,
  selectHighlights,
} from "@/entities/menu/state/menuSelector";
import { updateHighlights } from "@/entities/menu/state/menuSlice";
import type { MenuHighlights } from "@/entities/menu/types/hilights";
import HighlightsForm from "@/features/admin/menu/HighlightsForm";

const HighlightsPanel = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const items = useAppSelector(selectAllMenuItems);
  const highlights = useAppSelector(selectHighlights);

  const handleSubmit = (values: MenuHighlights) => {
    dispatch(updateHighlights(values));
  };

  if (categories.length === 0 || items.length === 0) {
    return (
      <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
        برای تنظیم Highlights، حداقل یک دسته‌بندی و یک آیتم لازم است.
      </p>
    );
  }

  return (
    <HighlightsForm
      categories={categories}
      items={items}
      initialValue={highlights}
      onSubmit={handleSubmit}
    />
  );
};

export default HighlightsPanel;
