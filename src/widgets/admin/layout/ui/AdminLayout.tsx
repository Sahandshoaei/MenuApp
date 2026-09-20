import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { adminNavigationItems } from "../lib/navigation";

const getPageTitle = (pathname: string) => {
  const exactMatch = adminNavigationItems.find(
    (item) => item.path === pathname
  );

  if (exactMatch) return exactMatch.label;

  // برای مسیرهای فرزند بعدی (مثلاً /admin/products/new)
  const parentMatch = adminNavigationItems
    .filter((item) => item.path !== "/admin")
    .find((item) => pathname.startsWith(item.path));

  return parentMatch?.label ?? "داشبورد";
};

export function AdminLayout() {
  const location = useLocation();
  const title = getPageTitle(location.pathname);

  return (
    <div className="flex min-h-screen bg-[var(--color-bg)] text-[var(--color-text-primary)]">
      <AdminSidebar />

      <div className="flex flex-1 flex-col">
        <AdminHeader title={title} />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;

// جریان فعلی (مرحله ۱ - فقط اسکلت):
//
//        AdminLayout
//             │
//     ┌───────┴───────┐
//     ▼               ▼
// AdminSidebar     AdminHeader + <Outlet/>
//                        │
//              (صفحات ادمین این‌جا رندر می‌شوند)
//
// در مراحل بعد:
// - هر صفحه (Dashboard/Orders/Products/Categories) پر می‌شود
// - داده از طریق useAppSelector از Redux خوانده می‌شود
// - همان الگوی customer (Hook → Selector → Slice) دنبال می‌شود
