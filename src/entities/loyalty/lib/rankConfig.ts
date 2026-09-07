import type { LoyaltyRank } from "../types/loyalty";

export interface LoyaltyRankBadgeConfig {
  label: string;
  color: string;
  bg: string;
}

export const LOYALTY_RANK_CONFIG: Record<LoyaltyRank, LoyaltyRankBadgeConfig> = {
  none: {
    label: "بدون رتبه",
    color: "#9ca3af",
    bg: "rgba(156,163,175,0.12)",
  },
  bronze: {
    label: "Bronze",
    color: "#c68a4e",
    bg: "rgba(198,138,78,0.15)",
  },
  silver: {
    label: "Silver",
    color: "#c7c7cf",
    bg: "rgba(199,199,207,0.15)",
  },
  gold: {
    label: "Gold",
    color: "#f5c451",
    bg: "rgba(245,196,81,0.18)",
  },
};
