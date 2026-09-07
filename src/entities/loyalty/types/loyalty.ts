


export type LoyaltyRank = "none" | "bronze" | "silver" | "gold";

export interface LoyaltyRankConfig {
  minSpent: number;
  reward: number;
}

export interface LoyaltyData {
  totalSpent: number;
  currentRank: LoyaltyRank;
  rank: LoyaltyRank;
  reward: number;
  unlockedReward: number;
  rewardAvailable: boolean;
}

export interface LoyaltyState {
  byCustomer: Record<string, LoyaltyData>;
  rankConfig: Record<Exclude<LoyaltyRank, "none">, LoyaltyRankConfig>;
}