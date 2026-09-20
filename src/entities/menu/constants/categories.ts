import type { Category } from "../types/category";

export const categories: Category[] = [
  {
    id: "drinks",
    title: "نوشیدنی‌ها",
    icon: "☕",
    glowColor: "bg-orange-500/30",
    gradient: `
        bg-gradient-to-r
        from-amber-900/40
        via-[#1A110C]
        to-orange-950
    `,
  },
  {
    id: "desserts",
    title: "دسرها",
    icon: "🍰",
    glowColor: "bg-pink-500/30",
    gradient: "bg-gradient-to-bl from-pink-900/40 to-[#120D0A]",
  },
  {
    id: "breakfast",
    title: "صبحانه",
    icon: "🍳",
    glowColor: "bg-yellow-500/30",
    gradient: "bg-gradient-to-bl from-yellow-900/40 to-[#120D0A]",
  },
  {
    id: "salads",
    title: "سالادها",
    icon: "🥗",
    glowColor: "bg-emerald-500/30",
    gradient: "bg-gradient-to-bl from-emerald-900/40 to-[#120D0A]",
  },
  {
    id: "sandwiches",
    title: "ساندویچ‌ها",
    icon: "🥪",
    glowColor: "bg-orange-500/30",
    gradient: "bg-gradient-to-bl from-orange-900/40 to-[#120D0A]",
  },
];
