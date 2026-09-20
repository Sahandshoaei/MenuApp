import type { LoyaltyRank } from "@/entities/loyalty/types/loyalty";

export interface LoyaltyRankConfig {
  bg: string;
  border: string;
  text: string;
  label: string;
  shortLabel: string;
}

export const LOYALTY_RANK_CONFIG: Record<LoyaltyRank, LoyaltyRankConfig> = {
  none: {
    bg: "bg-zinc-700",
    border: "border-zinc-600",
    text: "text-zinc-300",
    label: "مشتری جدید",
    shortLabel: "جدید",
  },
  bronze: {
    bg: "bg-amber-900/40",
    border: "border-amber-700",
    text: "text-amber-400",
    label: "عضو برنزی",
    shortLabel: "برنزی",
  },
  silver: {
    bg: "bg-slate-700/40",
    border: "border-slate-400",
    text: "text-slate-200",
    label: "عضو نقره‌ای",
    shortLabel: "نقره‌ای",
  },
  gold: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-400",
    text: "text-yellow-400",
    label: "عضو طلایی",
    shortLabel: "طلایی",
  },
};

export const LOYALTY_RANK_LIST: LoyaltyRank[] = [
  "none",
  "bronze",
  "silver",
  "gold",
];
