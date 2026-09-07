// import type { AppDispatch } from "@/app/store";

// import {
//   setRank,
//   setReward,
//   redeemReward,
//   updateLoyalty,
//   resetLoyalty,
//   removeCustomerLoyalty,
// } from "../state/loyaltySlice";

// import type {
//   LoyaltyData,
//   LoyaltyRank,
// } from "../types/loyalty";

// export const loyaltyService = {
//   setRank(
//     dispatch: AppDispatch,
//     customerId: string,
//     rank: LoyaltyRank
//   ) {
//     dispatch(
//       setRank({
//         customerId,
//         rank,
//       })
//     );
//   },

//   setReward(
//     dispatch: AppDispatch,
//     customerId: string,
//     reward: number
//   ) {
//     dispatch(
//       setReward({
//         customerId,
//         reward,
//       })
//     );
//   },

//   redeemReward(
//     dispatch: AppDispatch,
//     customerId: string
//   ) {
//     dispatch(
//       redeemReward(customerId)
//     );
//   },

//   update(
//     dispatch: AppDispatch,
//     loyalty: LoyaltyData
//   ) {
//     dispatch(
//       updateLoyalty(loyalty)
//     );
//   },

//   reset(
//     dispatch: AppDispatch,
//     customerId: string
//   ) {
//     dispatch(
//       resetLoyalty(customerId)
//     );
//   },

//   remove(
//     dispatch: AppDispatch,
//     customerId: string
//   ) {
//     dispatch(
//       removeCustomerLoyalty(
//         customerId
//       )
//     );
//   },
// };

import type { AppDispatch } from "@/app/store";


import {

  setRank,

  setReward,

  redeemReward,

  updateLoyalty,

  resetLoyalty,

  removeCustomerLoyalty,

} from "../state/loyaltySlice";


import type {
  LoyaltyData,
  LoyaltyRank,
} from "../types/loyalty";



export const loyaltyService = {


  setRank(
    dispatch:AppDispatch,
    customerId:string,
    rank:LoyaltyRank
  ){

    dispatch(
      setRank({
        customerId,
        rank,
      })
    );

  },



  setReward(
    dispatch:AppDispatch,
    customerId:string,
    reward:number
  ){

    dispatch(
      setReward({
        customerId,
        reward,
      })
    );

  },



  redeemReward(
    dispatch:AppDispatch,
    customerId:string
  ){

    dispatch(
      redeemReward(
        customerId
      )
    );

  },



  update(
    dispatch:AppDispatch,
    customerId:string,
    data:LoyaltyData
  ){

    dispatch(
      updateLoyalty({

        customerId,

        data,

      })
    );

  },



  reset(
    dispatch:AppDispatch,
    customerId:string
  ){

    dispatch(
      resetLoyalty(
        customerId
      )
    );

  },



  remove(
    dispatch:AppDispatch,
    customerId:string
  ){

    dispatch(
      removeCustomerLoyalty(
        customerId
      )
    );

  },


};