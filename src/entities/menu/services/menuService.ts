// import { menuItems } from "../constants/menu-items";
// import { categories } from "../constants/categories";
// import type {MenuCategory} from "../types/category";
// import type { Category } from "../types/category";
// import { menuHighlights } from "../constants/hilights";
// import { MenuItem } from "../types/menu-item";

// export const menuService = {

//   getMenuItems(): MenuItem[] {
//     return menuItems;
//   },

//   getMenuItem(
//     id: string
//   ): MenuItem | undefined {
//     return menuItems.find(
//       (item) => item.id === id
//     );
//   },

//   getCategories(): Category[] {
//     return categories;
//   },

//   getCategory(
//     id: MenuCategory
//   ): Category | undefined {
//     return categories.find(
//       (category) => category.id === id
//     );
//   },

//   getMenuItemsByCategory(
//     categoryId: MenuCategory
//   ): MenuItem[] {
//     return menuItems.filter(
//       (item) =>
//         item.category === categoryId
//     );
//   },

//   getFeaturedCategory(): Category | undefined {
//     return categories.find(
//       (category) =>
//         category.id ===
//         menuHighlights.featuredCategoryId
//     );
//   },

//   getTodayOffer(): MenuItem | undefined {
//     return menuItems.find(
//       (item) =>
//         item.id ===
//         menuHighlights.todayOfferId
//     );
//   },

//   getHighlights() {
//     return menuHighlights;
//   },
// };


// فعلاً این Service فقط FakeData را برمی‌گرداند.
// بعداً Backend می‌آید.


// بعد از اضافه شدن Backend
// فقط همین Service تغییر می‌کند.

// getHighlights() {
//   return api.get("/menu/highlights");
// }

// و constants/highlights.ts حذف می‌شود.



// import { menuHighlights } from "../constants/hilights";
// import type { MenuHighlights } from "../types/hilights";

// export const menuService = {
//   getHighlights(): MenuHighlights {
//     return menuHighlights;
//   },
// };

// بعد از این ریفکتور، خودِ آیتم‌ها و دسته‌بندی‌ها دیگه از این
// Service نمیان — از menuSlice (Redux) میان که هم CRUD داره
// هم توی localStorage پرسیست می‌شه.
//
// menuService فقط برای Highlights (دسته‌بندی ویژه/پیشنهاد امروز)
// باقی مونده، چون فعلاً خارج از scope مدیریت ادمین هست.
