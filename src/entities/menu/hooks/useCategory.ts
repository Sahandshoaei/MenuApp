// import { menuService } from "../services/menuService";

// export const useCategory = () => {
//   return menuService.getCategories();
// };

import { useAppSelector } from "@/app/store/hooks";
import { selectAllCategories } from "../state/menuSelector";

export const useCategory = () => {
  return useAppSelector(selectAllCategories);
};
