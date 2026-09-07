import { NavLink } from "react-router-dom";
import { adminNavigationItems } from "../lib/navigation";

const AdminSidebar = () => {
  return (
    <aside
      className="
        hidden
        md:flex
        h-screen
        w-64
        shrink-0
        flex-col
        border-r
        border-amber-900/30
        bg-[#140D08]
        px-4
        py-6
      "
    >
      {/* Brand */}
      <div className="mb-8 px-2">
        <span className="text-lg font-bold text-white">
          Restaurant
        </span>
        <span className="ml-2 text-xs text-amber-500">
          Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex flex-1 flex-col gap-1">
        {adminNavigationItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/admin"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm transition-colors ${
                  isActive
                    ? "bg-primary/15 text-primary"
                    : "text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
                }`
              }
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default AdminSidebar;

// معادل CustomerBottomNavigation، اما به شکل Sidebar ثابت سمت چپ.
// در دسکتاپ (md به بالا) نمایش داده می‌شود.
// نسخه موبایل (اگر لازم شد) را در مرحله بعد به‌صورت Drawer اضافه می‌کنیم.
