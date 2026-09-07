import { createBrowserRouter } from "react-router-dom";
import { customerRoutes } from "./CustomerRoutes";
import { adminRoutes } from "./AdminRoutes";
import { NotFound } from "../../pages/customer/NotfoundPage";

export const router = createBrowserRouter([
  customerRoutes,
  adminRoutes,
  {
    path: "*",
    element: (
     <NotFound/>
    ),
  },
]);

export default router;