import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectAllCategories,
  selectAllMenuItems,
} from "@/entities/menu/state/menuSelector";
import {
  addCategory,
  updateCategory,
  removeCategory,
} from "@/entities/menu/state/menuSlice";
import type { Category } from "@/entities/menu/types/category";
import Modal from "@/entities/common/ui/Modal";
import CategoryListItem from "@/features/admin/menu/CategoryListItem";
import CategoryForm from "@/features/admin/menu/CategoryForm";

const CategoriesPanel = () => {
  const dispatch = useAppDispatch();
  const categories = useAppSelector(selectAllCategories);
  const items = useAppSelector(selectAllMenuItems);

  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const itemCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    });
    return counts;
  }, [items]);

  const openAddModal = () => {
    setEditingCategory(null);
    setModalOpen(true);
  };

  const openEditModal = (category: Category) => {
    setEditingCategory(category);
    setModalOpen(true);
  };

  const handleSubmit = (values: Omit<Category, "id">) => {
    if (editingCategory) {
      dispatch(updateCategory({ ...values, id: editingCategory.id }));
    } else {
      dispatch(addCategory(values));
    }
    setModalOpen(false);
  };

  const handleDelete = (category: Category) => {
    if ((itemCountByCategory[category.id] ?? 0) > 0) return;

    const confirmed = window.confirm(`دسته‌بندی «${category.title}» حذف شود؟`);
    if (confirmed) dispatch(removeCategory(category.id));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Total categories: {categories.length}
        </span>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={16} />
          Add Category
        </button>
      </div>

      <div className="flex flex-col gap-2.5">
        {categories.map((category) => (
          <CategoryListItem
            key={category.id}
            category={category}
            itemCount={itemCountByCategory[category.id] ?? 0}
            onEdit={() => openEditModal(category)}
            onDelete={() => handleDelete(category)}
          />
        ))}
      </div>

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی"}
      >
        <CategoryForm
          initialValue={editingCategory}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default CategoriesPanel;
