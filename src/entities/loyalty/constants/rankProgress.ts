import type { LoyaltyRank } from "../types/loyalty";

export interface RankProgressConfig {
  min: number;
  max: number;
  next: string;
}

export const RANK_PROGRESS: Record<LoyaltyRank, RankProgressConfig> = {
  none: { min: 0, max: 100, next: "Bronze" },
  bronze: { min: 100, max: 300, next: "Silver" },
  silver: { min: 300, max: 600, next: "Gold" },
  gold: { min: 600, max: 600, next: "Max Rank" },
};

export const getLoyaltyProgress = (rank: LoyaltyRank, spent: number) => {
  const config = RANK_PROGRESS[rank] ?? RANK_PROGRESS.none;

  const progress =
    rank === "gold"
      ? 100
      : Math.min(100, ((spent - config.min) / (config.max - config.min)) * 100);

  const remaining = Math.max(config.max - spent, 0);

  return { config, progress, remaining };
};
