import { useAppDispatch, useAppSelector } from "../../../app/store/hooks";

import { selectActiveCustomerId } from "../../customer/state/customerSelector";

import {
  selectCurrentLoyalty,
  selectLoyaltyRank,
  selectReward,
  selectRewardAvailable,
} from "../state/loyaltySelector";

import { loyaltyService } from "../services/loyaltyService";

import type { LoyaltyRank } from "../types/loyalty";

export const useLoyalty = () => {
  const dispatch = useAppDispatch();

  const customerId = useAppSelector(
    selectActiveCustomerId
  );

  const loyalty = useAppSelector(
    selectCurrentLoyalty
  );

  const rank = useAppSelector(
    selectLoyaltyRank
  );

  const reward = useAppSelector(
    selectReward
  );

  const rewardAvailable = useAppSelector(
    selectRewardAvailable
  );

  return {
    loyalty,

    rank,

    reward,

    rewardAvailable,

    setRank: (
      rank: LoyaltyRank
    ) => {
      if (!customerId) return;

      loyaltyService.setRank(
        dispatch,
        customerId,
        rank
      );
    },

    setReward: (
      reward: number
    ) => {
      if (!customerId) return;

      loyaltyService.setReward(
        dispatch,
        customerId,
        reward
      );
    },

    redeemReward: () => {
      if (!customerId) return;

      loyaltyService.redeemReward(
        dispatch,
        customerId
      );
    },

    reset: () => {
      if (!customerId) return;

      loyaltyService.reset(
        dispatch,
        customerId
      );
    },
  };
};