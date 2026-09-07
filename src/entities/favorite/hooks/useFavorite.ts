import { useMemo } from "react";
import {useAppDispatch,useAppSelector} from "../../../app/store/hooks";
import { useMenu } from "../../menu/hooks/useMenu";
import {addFavorite, removeFavorite, toggleFavorite, clearFavorites} from "../state/favoriteSlice";
import {selectFavoriteIds,selectFavoriteCount} from "../state/favoriteSelector";
import { selectActiveCustomerId } from "../../customer/state/customerSelector";
import type { MenuItem } from "../../menu/types/menu-item";


export const useFavorite = () => {
  const dispatch = useAppDispatch();

  /* ---------------- Customer ---------------- */

  const customerId = useAppSelector(
    selectActiveCustomerId
  );

  /* ---------------- Favorites State ---------------- */

  const favoriteIds = useAppSelector(
    selectFavoriteIds
  );

  const count = useAppSelector(
    selectFavoriteCount
  );

  /* ---------------- Menu ---------------- */

  const { menu } = useMenu();

  /* ---------------- Favorite Items ---------------- */

  const favorites = useMemo(() => {
    return favoriteIds
      .map((id) =>
        menu.find(
          (item) => item.id === id
        )
      )
      .filter(
        (item): item is MenuItem =>
          item !== undefined
      );
  }, [favoriteIds, menu]);

  /* ---------------- API ---------------- */

  return {
    favorites,

    favoriteIds,

    count,

    isFavorite: (id: string) =>
      favoriteIds.includes(id),

    add: (menuItemId: string) => {
      if (!customerId) return;

      dispatch(
        addFavorite({
          customerId,
          menuItemId,
        })
      );
    },

    remove: (menuItemId: string) => {
      if (!customerId) return;

      dispatch(
        removeFavorite({
          customerId,
          menuItemId,
        })
      );
    },

    toggle: (menuItemId: string) => {
      if (!customerId) return;

      dispatch(
        toggleFavorite({
          customerId,
          menuItemId,
        })
      );
    },

    clear: () => {
      if (!customerId) return;

      dispatch(
        clearFavorites(customerId)
      );
    },
  };
};