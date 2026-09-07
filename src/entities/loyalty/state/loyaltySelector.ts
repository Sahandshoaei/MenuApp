import { createSelector } from "@reduxjs/toolkit";

import type { RootState } from "../../../app/store/types";

import { selectActiveCustomerId } 
from "../../customer/state/customerSelector";

import type { LoyaltyData } 
from "../types/loyalty";



/* ---------------- All (by customer map) ---------------- */

export const selectLoyaltyByCustomer = (state: RootState) =>
  state.loyalty.byCustomer;

export const selectRankConfig = (state: RootState) =>
  state.loyalty.rankConfig;

/* ---------------- Empty Loyalty ---------------- */

const emptyLoyalty: LoyaltyData = {

  totalSpent: 0,

  currentRank: "none",

  rank: "none",

  reward: 0,

  unlockedReward: 0,

  rewardAvailable: false,

};



/* ---------------- Current Loyalty ---------------- */

export const selectCurrentLoyalty =
  createSelector(

    [

      (state: RootState) =>
        state.loyalty.byCustomer,

      selectActiveCustomerId,

    ],


    (
      byCustomer,
      customerId
    ): LoyaltyData => {


      if (!customerId) {

        return emptyLoyalty;

      }



      return (
        byCustomer[customerId]
        ??
        emptyLoyalty
      );

    }

  );




/* ---------------- Rank ---------------- */

export const selectLoyaltyRank =
  createSelector(
    [selectCurrentLoyalty],
    (loyalty) =>
      loyalty.rank ??
      loyalty.currentRank ??
      "none"
  );




/* ---------------- Reward ---------------- */

export const selectReward =
  createSelector(

    [
      selectCurrentLoyalty
    ],

    (loyalty) =>
      loyalty.reward

  );




/* ---------------- Reward Available ---------------- */

export const selectRewardAvailable =
  createSelector(

    [
      selectCurrentLoyalty
    ],

    (loyalty) =>
      loyalty.rewardAvailable

  );