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
    label: "New Customer",
    shortLabel: "New",
  },
  bronze: {
    bg: "bg-amber-900/40",
    border: "border-amber-700",
    text: "text-amber-400",
    label: "Bronze Member",
    shortLabel: "Bronze",
  },
  silver: {
    bg: "bg-slate-700/40",
    border: "border-slate-400",
    text: "text-slate-200",
    label: "Silver Member",
    shortLabel: "Silver",
  },
  gold: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-400",
    text: "text-yellow-400",
    label: "Gold Member",
    shortLabel: "Gold",
  },
};

export const LOYALTY_RANK_LIST: LoyaltyRank[] = ["none", "bronze", "silver", "gold"];

// این فایل تک منبع رنگ/برچسب هر LoyaltyRank است.
// هم LoyaltyLevel (پنل مشتری) و هم LoyaltyRankBadge (پنل ادمین)
// از همین استفاده می‌کنند تا رنگ‌ها همیشه یکی بمانند.
