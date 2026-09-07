import {
  House,
  Heart,
  Package,
  User,
} from "lucide-react";

import type { LucideIcon } from "lucide-react";

export interface NavigationItem {
  label: string;
  path: string;
  icon: LucideIcon;
}

export const navigationItems: NavigationItem[] = [
  {
    label: "Menu",
    path: "/",
    icon: House,
  },

  {
    label: "Favorites",
    path: "/favorites",
    icon: Heart,
  },

  {
    label: "Orders",
    path: "/orders",
    icon: Package,
  },

  {
    label: "Profile",
    path: "/profile",
    icon: User,
  },
];