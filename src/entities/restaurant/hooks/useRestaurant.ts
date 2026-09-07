import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { setOrderingEnabled } from "../state/restaurantSlice";
import type { RootState } from "@/app/store/index";

export const useRestaurant = () => {
  const dispatch = useAppDispatch();
  const settings = useAppSelector((state: RootState) => state.restaurant.settings);

  return {
    settings,
    setOrderingEnabled: (enabled: boolean) => dispatch(setOrderingEnabled(enabled)),
  };
};
