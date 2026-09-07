import { useMemo } from "react";
import {useAppDispatch,useAppSelector} from "../../../app/store/hooks";
import {addToCart,clear,decrease,increase,remove} from "../state/cartSlice";
import {selectCartCount,selectCartIsEmpty,selectCartItems,selectCartTotal} from "../state/cartSelector";
import type { MenuItem } from "../../../entities/menu/types/menu-item";

export const useCart = () => {
  
  const dispatch = useAppDispatch();

  const items = useAppSelector(
    selectCartItems,
  );

  const total = useAppSelector(
    selectCartTotal,
  );

  const count = useAppSelector(
    selectCartCount,
  );

  const isEmpty = useAppSelector(
    selectCartIsEmpty,
  );

  return useMemo(
    () => ({
      /* State */

      items,

      total,

      count,

      isEmpty,

      /* Actions */

      add: (item: MenuItem) => {
        dispatch(
          addToCart(item),
        );
      },

      remove: (id: string) => {
        dispatch(
          remove(id),
        );
      },

      increase: (id: string) => {
        dispatch(
          increase(id),
        );
      },

      decrease: (id: string) => {
        dispatch(
          decrease(id),
        );
      },

      clear: () => {
        dispatch(
          clear(),
        );
      },
    }),
    [
      dispatch,
      items,
      total,
      count,
      isEmpty,
    ],
  );
};