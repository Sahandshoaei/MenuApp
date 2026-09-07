
// MenuCategory قبلاً یک Union ثابت بود (فقط ۵ دسته‌بندی مشخص).
// چون ادمین باید بتونه دسته‌بندی جدید بسازه، به string تبدیلش کردیم.
export type MenuCategory = string;

import type { ComponentType, SVGProps } from "react";

export interface Category {
  id: string;
  title: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  glowColor?: string;
  gradient?: string;
}
