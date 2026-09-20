import type { LoyaltyRank, LoyaltyRankConfig } from "../types/loyalty";

/** آستانه‌ها به تومان */
export const LOYALTY_RANKS: Record<
  Exclude<LoyaltyRank, "none">,
  LoyaltyRankConfig
> = {
  bronze: {
    minSpent: 1_000_000,
    reward: 10,
  },
  silver: {
    minSpent: 3_000_000,
    reward: 20,
  },
  gold: {
    minSpent: 6_000_000,
    reward: 40,
  },
};
