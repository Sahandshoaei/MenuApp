import { useState } from "react";
import type { Category } from "@/entities/menu/types/category";
import type { MenuItem } from "@/entities/menu/types/menu-item";
import type { MenuHighlights } from "@/entities/menu/types/hilights";

interface HighlightsFormProps {
  categories: Category[];
  items: MenuItem[];
  initialValue: MenuHighlights;
  onSubmit: (values: MenuHighlights) => void;
}

const labelClass = "mb-1.5 block text-xs text-zinc-400";

const selectClass = `
  w-full
  rounded-xl
  border
  border-amber-900/30
  bg-transparent
  px-3
  py-2.5
  text-sm
  text-zinc-100
  outline-none
  focus:border-primary
`;

const HighlightsForm = ({
  categories,
  items,
  initialValue,
  onSubmit,
}: HighlightsFormProps) => {
  const [featuredCategoryId, setFeaturedCategoryId] = useState(
    initialValue.featuredCategoryId
  );
  const [todayOfferId, setTodayOfferId] = useState(initialValue.todayOfferId);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onSubmit({ featuredCategoryId, todayOfferId });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-md rounded-2xl border border-amber-900/20 bg-[#1a120b] p-5">
      <p className="mb-4 text-sm text-zinc-400">
        این‌ها همون‌هایی هستن که در صفحه‌ی اصلی پنل مشتری به‌صورت ویژه نمایش داده می‌شن.
      </p>

      <div className="mb-4">
        <label className={labelClass}>دسته‌بندی ویژه (Featured Category)</label>
        <select
          value={featuredCategoryId}
          onChange={(e) => setFeaturedCategoryId(e.target.value)}
          className={selectClass}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id} className="bg-[#1a120b]">
              {category.icon} {category.title}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-5">
        <label className={labelClass}>پیشنهاد امروز (Today's Offer)</label>
        <select
          value={todayOfferId}
          onChange={(e) => setTodayOfferId(e.target.value)}
          className={selectClass}
        >
          {items.map((item) => (
            <option key={item.id} value={item.id} className="bg-[#1a120b]">
              {item.name} — ${item.price.toFixed(2)}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={handleSave}
        className="w-full rounded-xl bg-primary py-2.5 text-sm font-medium text-white hover:opacity-90"
      >
        {saved ? "ذخیره شد ✓" : "ذخیره"}
      </button>
    </div>
  );
};

export default HighlightsForm;
