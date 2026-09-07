import type { MenuItem } from "@/entities/menu/types/menu-item";
import type { ItemInfoTab } from "./ItemInfoTabs";

interface ItemDescriptionProps {
  item: MenuItem;
  activeTab: ItemInfoTab;
}

const ItemDescription = ({ item, activeTab }: ItemDescriptionProps) => {
  const text =
    activeTab === "ingredients"
      ? item.ingredients ?? "اطلاعاتی برای مواد تشکیل‌دهنده ثبت نشده."
      : item.description;

  return (
    <p className="mt-4 text-sm leading-relaxed text-[var(--color-text-secondary)]">{text}</p>
  );
};

export default ItemDescription;
