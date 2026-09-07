export interface CategoryColorPreset {
  name: string;
  glowColor: string;
  gradient: string;
}

export const CATEGORY_COLOR_PRESETS: CategoryColorPreset[] = [
  {
    name: "orange",
    glowColor: "bg-orange-500/30",
    gradient: "bg-gradient-to-bl from-orange-900/40 to-[#120D0A]",
  },
  {
    name: "pink",
    glowColor: "bg-pink-500/30",
    gradient: "bg-gradient-to-bl from-pink-900/40 to-[#120D0A]",
  },
  {
    name: "yellow",
    glowColor: "bg-yellow-500/30",
    gradient: "bg-gradient-to-bl from-yellow-900/40 to-[#120D0A]",
  },
  {
    name: "emerald",
    glowColor: "bg-emerald-500/30",
    gradient: "bg-gradient-to-bl from-emerald-900/40 to-[#120D0A]",
  },
  {
    name: "blue",
    glowColor: "bg-blue-500/30",
    gradient: "bg-gradient-to-bl from-blue-900/40 to-[#120D0A]",
  },
  {
    name: "purple",
    glowColor: "bg-purple-500/30",
    gradient: "bg-gradient-to-bl from-purple-900/40 to-[#120D0A]",
  },
];
