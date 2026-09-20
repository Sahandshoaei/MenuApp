import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import {
  selectAllMenuItems,
  selectAllCategories,
} from "@/entities/menu/state/menuSelector";
import {
  addMenuItem,
  updateMenuItem,
  removeMenuItem,
} from "@/entities/menu/state/menuSlice";
import type { MenuItem } from "@/entities/menu/types/menu-item";
import Modal from "@/entities/common/ui/Modal";
import CategoryChips from "@/features/admin/menu/CategoryChips";
import ProductGridItem from "@/features/admin/menu/ProductGridItem";
import ProductForm from "@/features/admin/menu/ProductForm";

const ProductsPanel = () => {
  const dispatch = useAppDispatch();
  const items = useAppSelector(selectAllMenuItems);
  const categories = useAppSelector(selectAllCategories);

  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  const itemCountByCategory = useMemo(() => {
    const counts: Record<string, number> = {};
    items.forEach((item) => {
      counts[item.category] = (counts[item.category] ?? 0) + 1;
    });
    return counts;
  }, [items]);

  const visibleItems = selectedCategory
    ? items.filter((item) => item.category === selectedCategory)
    : items;

  const openAddModal = () => {
    setEditingItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setModalOpen(true);
  };

  const handleSubmit = (values: Omit<MenuItem, "id">) => {
    if (editingItem) {
      dispatch(updateMenuItem({ ...values, id: editingItem.id }));
    } else {
      dispatch(addMenuItem(values));
    }
    setModalOpen(false);
  };

  const handleDelete = (item: MenuItem) => {
    const confirmed = window.confirm(`آیتم «${item.name}» حذف شود؟`);
    if (confirmed) dispatch(removeMenuItem(item.id));
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <span className="text-sm text-[var(--color-text-secondary)]">
          Total items: {items.length}
        </span>

        <button
          type="button"
          onClick={openAddModal}
          className="flex items-center gap-2 rounded-xl bg-[var(--color-accent)] px-4 py-2 text-sm font-medium text-white hover:opacity-90"
        >
          <Plus size={16} />
          Add Item
        </button>
      </div>

      <CategoryChips
        categories={categories}
        itemCountByCategory={itemCountByCategory}
        selected={selectedCategory}
        onSelect={setSelectedCategory}
      />

      {visibleItems.length === 0 ? (
        <p className="py-10 text-center text-sm text-[var(--color-text-secondary)]">
          آیتمی برای نمایش نیست.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {visibleItems.map((item) => (
            <ProductGridItem
              key={item.id}
              item={item}
              onEdit={() => openEditModal(item)}
              onDelete={() => handleDelete(item)}
            />
          ))}
        </div>
      )}

      <Modal
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title={editingItem ? "ویرایش آیتم منو" : "افزودن آیتم منو"}
      >
        <ProductForm
          categories={categories}
          initialValue={editingItem}
          onSubmit={handleSubmit}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

export default ProductsPanel;
