import {
  LayoutDashboard,
  ClipboardList,
  LayoutGrid,
  UtensilsCrossed,
  Users,
  Settings,
  BarChart3,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface AdminNavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const adminNavigationItems: AdminNavigationItem[] = [
  {
    label: "Dashboard",
    path: "/admin",
    icon: LayoutDashboard,
  },

  {
    label: "Orders",
    path: "/admin/orders",
    icon: ClipboardList,
  },

  {
    label: "Tables",
    path: "/admin/tables",
    icon: LayoutGrid,
  },

  {
    label: "Menu",
    path: "/admin/menu",
    icon: UtensilsCrossed,
  },

  {
    label: "Customers",
    path: "/admin/customers",
    icon: Users,
  },
   {
    label: "Reports",
    path: "/admin/reports",
    icon: BarChart3,
  },

  {
    label: "Settings",
    path: "/admin/settings",
    icon: Settings,
  },
   
];

// این فایل دقیقاً معادل
// widgets/customer/layout/lib/navigation.ts
// است، فقط برای پنل ادمین.

// چرا جدا نگه داشتیم؟
// چون آیتم‌های ناوبری ادمین منطق دیگری دارند
// (مثلاً مسیر پایه /admin و بدون protectedRoutes)
