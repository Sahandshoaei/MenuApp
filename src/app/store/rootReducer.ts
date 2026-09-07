import { combineReducers } from "@reduxjs/toolkit";
import { cartReducer } from "../../entities/cart/state/cartSlice";
import { customerReducer } from "../../entities/customer/state/customerSlice";
import { favoriteReducer } from "../../entities/favorite/state/favoriteSlice";
import { loyaltyReducer } from "../../entities/loyalty/state/loyaltySlice";
import { notificationReducer } from "../../entities/notification/state/notificationSlice";
import { orderReducer } from "../../entities/order/state/orderSlice";
import { menuReducer } from "../../entities/menu/state/menuSlice";
import { tableReducer } from "@/entities/table/state/tableSlice";
import {reservationReducer} from "@/entities/reservation/state/reservationSlice";
import { restaurantReducer } from "@/entities/restaurant/state/restaurantSlice";

export const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
  customer: customerReducer,
  favorites: favoriteReducer,
  notifications: notificationReducer,
  loyalty: loyaltyReducer,
  menu: menuReducer,
  table: tableReducer,
  reservation: reservationReducer,
  restaurant: restaurantReducer,
});