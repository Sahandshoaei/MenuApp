// اطلاعات مشتری مربوط به لویالتی و علاقه مندی ها و سفارش ها 
// از طریق cutomerId منتقل میشود
import {createSlice,type PayloadAction} from "@reduxjs/toolkit";
import type {LoyaltyData,LoyaltyRank,LoyaltyRankConfig,LoyaltyState} from "../types/loyalty";
import { LOYALTY_RANKS } from "../constants/loyalty-rank";


const STORAGE_KEY = "loyalty";


// ---------------- LocalStorage ----------------

const loadLoyalty = (): Record<string, LoyaltyData> => {

  try {

    const data =localStorage.getItem(STORAGE_KEY);

    return data
      ? JSON.parse(data)
      : {};

  } catch {

    return {};

  }

};


const saveLoyalty = (data: Record<string, LoyaltyData>) => {

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(data)
  );

};



// ---------------- Initial State ----------------

const RANK_CONFIG_KEY = "loyalty_rank_config";

const loadRankConfig = (): Record<Exclude<LoyaltyRank, "none">, LoyaltyRankConfig> => {
  try {
    const data = localStorage.getItem(RANK_CONFIG_KEY);
    return data ? JSON.parse(data) : LOYALTY_RANKS;
  } catch {
    return LOYALTY_RANKS;
  }
};

const saveRankConfig = (config: Record<Exclude<LoyaltyRank, "none">, LoyaltyRankConfig>) => {
  localStorage.setItem(RANK_CONFIG_KEY, JSON.stringify(config));
};

const initialState: LoyaltyState = {
  byCustomer: loadLoyalty(),
  rankConfig: loadRankConfig(),
};


// ---------------- Helper ----------------

const createDefaultLoyalty =(): LoyaltyData => ({

  totalSpent: 0,
  currentRank: "none",
  rank: "none",
  reward: 0,
  unlockedReward: 0,
  rewardAvailable: false,

});



const getCustomerLoyalty = (
  state: LoyaltyState,
  customerId: string
) => {


  if (
    !state.byCustomer[customerId]
  ) {

    state.byCustomer[customerId] =
      createDefaultLoyalty();

  }


  return state.byCustomer[customerId];

};



// ---------------- Slice ----------------


const loyaltySlice = createSlice({

  name: "loyalty",

  initialState,


  reducers: {

    initializeLoyalty(
      state,
      action: PayloadAction<string>
    ) {

      getCustomerLoyalty(
        state,
        action.payload
      );

      saveLoyalty(
        state.byCustomer
      );

    },



    addSpent(
      state,
      action: PayloadAction<{
        customerId:string;
        amount:number;
      }>
    ){

      const customer =
        getCustomerLoyalty(
          state,
          action.payload.customerId
        );


      customer.totalSpent +=
        action.payload.amount;


      saveLoyalty(
        state.byCustomer
      );

    },



    setRank(
      state,
      action: PayloadAction<{
        customerId:string;
        rank:LoyaltyRank;
      }>
    ){

      const customer =
        getCustomerLoyalty(
          state,
          action.payload.customerId
        );


      customer.rank =
        action.payload.rank;


      customer.currentRank =
        action.payload.rank;


      saveLoyalty(
        state.byCustomer
      );

    },



    setReward(
      state,
      action: PayloadAction<{
        customerId:string;
        reward:number;
      }>
    ){

      const customer =
        getCustomerLoyalty(
          state,
          action.payload.customerId
        );


      customer.reward = action.payload.reward;
      customer.unlockedReward = action.payload.reward;
      customer.rewardAvailable = true;


      saveLoyalty(
        state.byCustomer
      );

    },



    redeemReward(
      state,
      action: PayloadAction<string>
    ){

      const customer =
        getCustomerLoyalty(
          state,
          action.payload
        );


      customer.rewardAvailable = false;
      customer.reward = 0;
      customer.unlockedReward = 0;


      saveLoyalty(
        state.byCustomer
      );

    },



    updateLoyalty(
      state,
      action: PayloadAction<{
        customerId:string;
        data:LoyaltyData;
      }>
    ){

      state.byCustomer[
        action.payload.customerId
      ] =
        action.payload.data;


      saveLoyalty(
        state.byCustomer
      );

    },



    resetLoyalty(
      state,
      action: PayloadAction<string>
    ){

      state.byCustomer[
        action.payload
      ] =
        createDefaultLoyalty();


      saveLoyalty(
        state.byCustomer
      );

    },



    removeCustomerLoyalty(
      state,
      action: PayloadAction<string>
    ){

      delete state.byCustomer[
        action.payload
      ];


      saveLoyalty(
        state.byCustomer
      );

    },
    unlockReward(
      state,
      action: PayloadAction<{
        customerId: string;
        rank: LoyaltyRank;
        reward: number;
      }>
    ) {

      const customer =
        getCustomerLoyalty(
          state,
          action.payload.customerId
        );


      customer.rank =
        action.payload.rank;


      customer.currentRank =
        action.payload.rank;


      customer.reward =
        action.payload.reward;


      customer.unlockedReward =
        action.payload.reward;


      customer.rewardAvailable =
        true;


      saveLoyalty(
        state.byCustomer
      );

    },


    updateRankConfig(
      state,
      action: PayloadAction<{
        rank: Exclude<LoyaltyRank, "none">;
        config: LoyaltyRankConfig;
      }>
    ){
      state.rankConfig[action.payload.rank] = action.payload.config;
      saveRankConfig(state.rankConfig);
    },


  },

});



export const {
  initializeLoyalty,
  addSpent,
  setRank,
  setReward,
  unlockReward,
  redeemReward,
  updateLoyalty,
  resetLoyalty,
  removeCustomerLoyalty,
  updateRankConfig,
} =
loyaltySlice.actions;



export const loyaltyReducer =
loyaltySlice.reducer;