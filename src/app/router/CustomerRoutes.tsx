import { RouteObject } from "react-router-dom";
import {CustomerLayout} from "../../widgets/customer/layout/ui/CustomerLayout"; 
import HomePage from "../../pages/customer/HomePage";
import CategoryPage from "../../pages/customer/CategoryPage";
import FavoritePage from "../../pages/customer/FavoritePage";
import OrderPage from "../../pages/customer/OrderPage";
import ProfilePage from "../../pages/customer/ProfilePage";
import NotificationPage from "@/pages/customer/NotificationPage";

export const customerRoutes: RouteObject = {

  path: "/",
  element: <CustomerLayout />,
  children: [
    {
      index: true,
      element: <HomePage />,
    },
    {
      path: "category/:categoryId/:itemId?",
      element: <CategoryPage />,
    },
    {
      path: "favorites",
      element: <FavoritePage />,
    },
    {
      path: "orders",
      element: <OrderPage />,
    },
    {
      path: "profile",
      element: <ProfilePage />,
    },
    {
      path: "notifications",
      element: <NotificationPage />,
    },
  ],
};