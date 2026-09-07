import type { LoyaltyRank, LoyaltyRankConfig } from "../types/loyalty";

// این مقادیر پیش‌فرض (seed) هستند؛ منبع واقعی الان state.loyalty.rankConfig
// در Redux است که از پنل ادمین (Settings) قابل‌ویرایش است.
export const LOYALTY_RANKS: Record<
  Exclude<LoyaltyRank, "none">,
  LoyaltyRankConfig
> = {
  bronze: {
    minSpent: 100,
    reward: 10,
  },

  silver: {
    minSpent: 300,
    reward: 20,
  },

  gold: {
    minSpent: 600,
    reward: 40,
  },
};