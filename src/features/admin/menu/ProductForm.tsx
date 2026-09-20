import { useState } from "react";
import type { Category } from "@/entities/menu/types/category";
import type { MenuItem } from "@/entities/menu/types/menu-item";

interface ProductFormProps {
  categories: Category[];
  initialValue?: MenuItem | null;
  onSubmit: (values: Omit<MenuItem, "id">) => void;
  onCancel: () => void;
}

const inputClass = `
  w-full
  rounded-xl
  border
  border-[var(--color-border-strong)]
  bg-transparent
  px-3
  py-2.5
  text-sm
  text-[var(--color-text-primary)]
  outline-none
  focus:border-[var(--color-accent)]
`;

const labelClass = "mb-1.5 block text-xs text-[var(--color-text-secondary)]";

const ProductForm = ({
  categories,
  initialValue,
  onSubmit,
  onCancel,
}: ProductFormProps) => {
  const [name, setName] = useState(initialValue?.name ?? "");
  const [description, setDescription] = useState(initialValue?.description ?? "");
  const [price, setPrice] = useState(initialValue?.price.toString() ?? "");
  const [image, setImage] = useState(initialValue?.image ?? "");
  const [category, setCategory] = useState(
    initialValue?.category ?? categories[0]?.id ?? ""
  );
  const [error, setError] = useState("");

  const handleSubmit = () => {
    const parsedPrice = Number(price);

    if (!name.trim()) return setError("نام محصول را وارد کنید.");
    if (!category) return setError("یک دسته‌بندی انتخاب کنید.");
    if (!price || Number.isNaN(parsedPrice) || parsedPrice <= 0) {
      return setError("قیمت باید یک عدد بزرگ‌تر از صفر باشد.");
    }

    onSubmit({
      name: name.trim(),
      description: description.trim(),
      price: parsedPrice,
      image: image.trim(),
      category,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div>
        <label className={labelClass}>دسته‌بندی</label>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={inputClass}
        >
          {categories.map((c) => (
            <option key={c.id} value={c.id} className="bg-[var(--color-surface)]">
              {(typeof c.icon === "string" ? c.icon : "🍽️") + " " + c.title}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className={labelClass}>نام محصول</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Cheese Burger"
          className={inputClass}
        />
      </div>

      <div>
        <label className={labelClass}>توضیح کوتاه</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={2}
          placeholder="Regular beverage included"
          className={`${inputClass} resize-none`}
        />
      </div>

      <div className="flex gap-3">
        <div className="w-24">
          <label className={labelClass}>قیمت ($)</label>
          <input
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            min="0"
            step="0.01"
            placeholder="18"
            className={inputClass}
          />
        </div>

        <div className="flex-1">
          <label className={labelClass}>لینک عکس (URL)</label>
          <input
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://..."
            className={inputClass}
          />
        </div>
      </div>

      {error && <p className="text-xs text-red-400">{error}</p>}

      <div className="mt-2 flex gap-3">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 rounded-xl border border-[var(--color-border-strong)] py-2.5 text-sm text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
        >
          انصراف
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="flex-1 rounded-xl bg-[var(--color-accent)] py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          ذخیره
        </button>
      </div>
    </div>
  );
};

export default ProductForm;
