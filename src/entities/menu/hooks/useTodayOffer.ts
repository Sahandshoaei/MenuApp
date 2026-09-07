import { useAppSelector } from "@/app/store/hooks";
import { selectMenuItemById, selectHighlights } from "../state/menuSelector";

export const useTodayOffer = () => {
  const { todayOfferId } = useAppSelector(selectHighlights);
  return useAppSelector(selectMenuItemById(todayOfferId));
};
