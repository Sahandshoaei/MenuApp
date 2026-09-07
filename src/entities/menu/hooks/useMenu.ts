import { useAppSelector } from "@/app/store/hooks";
import {
  selectAllMenuItems,
  selectAllCategories,
  selectHighlights,
} from "../state/menuSelector";
import type { MenuCategory } from "../types/category";

export const useMenu = () => {
  const menu = useAppSelector(selectAllMenuItems);
  const categories = useAppSelector(selectAllCategories);
  const highlights = useAppSelector(selectHighlights);

  const featuredCategory = categories.find(
    (category) => category.id === highlights.featuredCategoryId
  );

  const todayOffer = menu.find(
    (item) => item.id === highlights.todayOfferId
  );

  const getMenuItem = (id: string) => {
    return menu.find((item) => item.id === id);
  };

  const getCategory = (id: MenuCategory) => {
    return categories.find((category) => category.id === id);
  };

  const getMenuItemsByCategory = (categoryId: MenuCategory) => {
    return menu.filter((item) => item.category === categoryId);
  };

  const getFeaturedCategory = () => featuredCategory;
  const getTodayOffer = () => todayOffer;

  return {
    menu,
    categories,

    getMenuItem,
    getCategory,

    getMenuItemsByCategory,

    getFeaturedCategory,
    getTodayOffer,

    featuredCategory,
    todayOffer,
  };
};
