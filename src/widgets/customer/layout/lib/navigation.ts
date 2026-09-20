import { House, Heart, Package, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "منو",
    path: "/",
    icon: House,
  },
  {
    label: "علاقه‌مندی",
    path: "/favorites",
    icon: Heart,
  },
  {
    label: "سفارش‌ها",
    path: "/orders",
    icon: Package,
  },
  {
    label: "پروفایل",
    path: "/profile",
    icon: User,
  },
];
