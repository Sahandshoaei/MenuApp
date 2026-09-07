import { useAppSelector } from "@/app/store/hooks";
import { selectCategoryById, selectHighlights } from "../state/menuSelector";

export const useFeaturedCategory = () => {
  const { featuredCategoryId } = useAppSelector(selectHighlights);
  return useAppSelector(selectCategoryById(featuredCategoryId));
};
