import { Coffee } from "lucide-react";
import { Salad } from 'lucide-react';
import { CakeSlice } from 'lucide-react';
import { EggFried } from 'lucide-react';
import { Sandwich } from 'lucide-react';
import { Hamburger } from 'lucide-react';
import { Pizza } from 'lucide-react';
import type { LucideIcon } from "lucide-react";
import type { Category } from "../types/category";



// روش ۱ — نگاشت دقیق روی id:
// فقط برای کتگوری‌های از پیش موجود توی categories.ts که id ثابت و شناخته‌شده دارن
// (مثل "drinks", "salads"). این‌ها id شون توی کد نوشته شده، پس مطمئنیم عوض نمی‌شه.
export const CATEGORY_ICON_MAP: Record<string, LucideIcon> = {
  drinks: Coffee,
  salads: Salad,
    desserts: CakeSlice,
    breakfast: EggFried,
    sandwiches: Sandwich,
    burgers: Hamburger,
    pizza: Pizza,
};

// روش ۲ — تشخیص بر اساس کلمه‌ی کلیدی توی عنوان:
// کتگوری‌هایی که از پنل ادمین ساخته می‌شن id تصادفی می‌گیرن (مثلاً "cat_x7f2a9k1")
// که هیچ ربطی به اسمشون نداره، پس روش ۱ براشون جواب نمی‌ده.
// به‌جاش عنوانی که ادمین وارد کرده رو با یه لیست کلمه‌ی کلیدی چک می‌کنیم.
//
// برای اضافه کردن آیکن به یه دسته‌بندی جدید که بعداً از ادمین میاد،
// فقط کافیه یه سطر این‌جا اضافه کنی — لازم نیست منتظر id خاصی باشی.
const KEYWORD_ICON_MAP: Array<{ keywords: string[]; icon: LucideIcon }> = [
  { keywords: ["burger", "hamburger", "cheeseburger"], icon: Hamburger },
  { keywords: ["pizza"], icon: Pizza },
  { keywords: ["salad"], icon: Salad },
  { keywords: ["coffee", "drink", "beverage"], icon: Coffee },
  { keywords: ["dessert"], icon: CakeSlice },
];

/**
 * آیکن مناسب یه کتگوری رو برمی‌گردونه: اول روی id دقیق چک می‌کنه،
 * بعد روی کلمه‌ی کلیدی توی عنوان. اگه هیچ‌کدوم match نشد، undefined
 * برمی‌گردونه و کامپوننت باید به ایموجی خود category.icon فالبک کنه.
 */
export const getCategoryIcon = (
  category: Pick<Category, "id" | "title">
): LucideIcon | undefined => {
  if (CATEGORY_ICON_MAP[category.id]) {
    return CATEGORY_ICON_MAP[category.id];
  }

  const title = category.title.toLowerCase();

  const match = KEYWORD_ICON_MAP.find(({ keywords }) =>
    keywords.some((keyword) => title.includes(keyword))
  );

  return match?.icon;
};
