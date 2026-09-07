import { RouteObject } from "react-router-dom";
import { AdminLayout } from "../../widgets/admin/layout/ui/AdminLayout";
import AdminDashboardPage from "../../pages/admin/AdminDashboardPage";
import AdminOrdersPage from "../../pages/admin/AdminOrdersPage";
import AdminTablesPage from "../../pages/admin/AdminTablesPage";
import AdminMenuPage from "../../pages/admin/AdminMenuPage";
import AdminCustomersPage from "../../pages/admin/AdminCustomersPage";
import AdminSettingsPage from "../../pages/admin/AdminSettingsPage";
import AdminReportsPage from "../../pages/admin/AdminReportsPage";

export const adminRoutes: RouteObject = {
  path: "/admin",
  element: <AdminLayout />,
  children: [
    {
      index: true,
      element: <AdminDashboardPage />,
    },
    {
      path: "orders",
      element: <AdminOrdersPage />,
    },
    {
      path: "tables",
      element: <AdminTablesPage />,
    },
    {
      path: "menu",
      element: <AdminMenuPage />,
    },
    {
      path: "customers",
      element: <AdminCustomersPage />,
    },
    {
      path: "settings",
      element: <AdminSettingsPage />,
    },
     {
      path: "reports",
      element: <AdminReportsPage />,
    },
  ],
};
