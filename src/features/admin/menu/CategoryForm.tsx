import { useState } from "react";
import type { Category } from "@/entities/menu/types/category";
import { CATEGORY_COLOR_PRESETS } from "@/entities/menu/constants/categoryColorPresets";

interface CategoryFormProps {
  initialValue?: Category | null;
  onSubmit: (values: Omit<Category, "id">) => void;
  onCancel: () => void;
}

const inputClass = `
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

const labelClass = "mb-1.5 block text-xs text-zinc-400";

const findPresetIndex = (glowColor: string) =>
  Math.max(
    0,
    CATEGORY_COLOR_PRESETS.findIndex((preset) => preset.glowColor === glowColor)
  );

const CategoryForm = ({ initialValue, onSubmit, onCancel }: CategoryFormProps) => {
  const [title, setTitle] = useState(initialValue?.title ?? "");
  const [icon, setIcon] = useState(initialValue?.icon ?? "🍽️");
  const [presetIndex, setPresetIndex] = useState(
    initialValue ? findPresetIndex(initialValue.glowColor) : 0
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    if (!title.trim()) return setError("عنوان دسته‌بندی را وارد کنید.");
    if (!icon.trim()) return setError("یک آیکون (ایموجی) انتخاب کنید.");

    const preset = CATEGORY_COLOR_PRESETS[presetIndex];

    onSubmit({
      title: title.trim(),
      icon: icon.trim(),
      glowColor: preset.glowColor,
      gradient: preset.gradient,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>عنوان دسته‌بندی</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Burgers"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>آیکون (ایموجی)</label>
        <input
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
          placeholder="🍔"
          className={`${inputClass} w-20 text-center text-xl`}
        />
      </div>

      <div>
        <label className={labelClass}>رنگ</label>
        <div className="flex gap-2">
          {CATEGORY_COLOR_PRESETS.map((preset, index) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => setPresetIndex(index)}
              className={`
                h-8
                w-8
                rounded-full
                ${preset.glowColor}
                ${
                  presetIndex === index
                    ? "ring-2 ring-primary ring-offset-2 ring-offset-[#1a120b]"
                    : ""
                }
              `}
            />
          ))}
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-amber-900/30 py-2.5 text-sm text-zinc-300 hover:bg-white/5"
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-primary py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
};

export default CategoryForm;
