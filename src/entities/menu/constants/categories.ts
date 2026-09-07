import { SaladIcon, SandwichIcon } from "lucide-react";
import type { Category } from "../types/category";
import {
  DrinkIcon,
  DessertIcon,
  BreakfastIcon,
} from "@/shared/Icons";



export const categories: Category[] = [

    {
      id: "drinks",
      title: "Drinks",
      icon: DrinkIcon,
      glowColor: "bg-orange-500/30",
      gradient: `
        bg-gradient-to-r
        from-amber-900/40
        via-[#1A110C]
        to-orange-950
    `
  },

  {
    id: "desserts",
    title: "Desserts",
    icon: DessertIcon,
    glowColor: "bg-pink-500/30",
    gradient: "bg-gradient-to-bl from-pink-900/40 to-[#120D0A]",
  },
  {
    id: "breakfast",
    title: "Breakfast",
    icon: BreakfastIcon,
    glowColor: "bg-yellow-500/30",
    gradient: "bg-gradient-to-bl from-yellow-900/40 to-[#120D0A]",
  },
  {
    id: "salads",
    title: "Salads",
    icon: SaladIcon,
    glowColor: "bg-emerald-500/30",
    gradient: "bg-gradient-to-bl from-emerald-900/40 to-[#120D0A]",
  },
  {
    id: "sandwiches",
    title: "Sandwiches",
    icon: SandwichIcon,
    glowColor: "bg-orange-500/30",
    gradient: "bg-gradient-to-bl from-orange-900/40 to-[#120D0A]",
  },
];





