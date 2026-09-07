import type { MenuCategory } from "./category";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: MenuCategory;
  // اختیاری، برای صفحه‌ی جزئیات (بج "۲۵۰ g / ۱۲ pieces" و تب Ingredients)
  weightLabel?: string;
  ingredients?: string;
}

