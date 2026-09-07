

import { useEffect } from "react";
import { toast } from "sonner";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";

import { updateOrderStatus } from "@/entities/order/state/orderSlice";
import { selectCurrentOrder } from "@/entities/order/state/orderSelector";

import { addNotification } from "@/entities/notification/state/notificationSlice";

import {
  addSpent,
  unlockReward,
} from "@/entities/loyalty/state/loyaltySlice";

import { selectCurrentLoyalty, selectRankConfig } from "@/entities/loyalty/state/loyaltySelector";

import { selectActiveCustomerId } from "@/entities/customer/state/customerSelector";

import type { LoyaltyRank, LoyaltyRankConfig } from "@/entities/loyalty/types/loyalty";

import type { Notification } from "@/entities/notification/types/notification";


/* -------------------------------------------------------------------------- */
/*                          Loyalty rank calculation                          */
/* -------------------------------------------------------------------------- */

const RANK_ORDER: LoyaltyRank[] = [
  "none",
  "bronze",
  "silver",
  "gold",
];


const calculateLoyalty = (
  totalSpent: number,
  currentRank: LoyaltyRank,
  rankConfig: Record<Exclude<LoyaltyRank, "none">, LoyaltyRankConfig>
): {
  unlocked: boolean;
  rank: LoyaltyRank;
  reward: number;
} => {

  let achievedRank: LoyaltyRank = "none";


  if (
    totalSpent >= rankConfig.gold.minSpent
  ) {
    achievedRank = "gold";

  } else if (
    totalSpent >= rankConfig.silver.minSpent
  ) {
    achievedRank = "silver";

  } else if (
    totalSpent >= rankConfig.bronze.minSpent
  ) {
    achievedRank = "bronze";
  }


  const unlocked =
    RANK_ORDER.indexOf(achievedRank) >
    RANK_ORDER.indexOf(currentRank);


  return {
    unlocked,

    rank: achievedRank,

    reward: unlocked
      ? rankConfig[
          achievedRank as Exclude<
            LoyaltyRank,
            "none"
          >
        ].reward
      : 0,
  };
};


/* -------------------------------------------------------------------------- */
/*                              Notification helper                           */
/* -------------------------------------------------------------------------- */

const createNotification = (
  title: string,
  message: string,
  type: Notification["type"]
): Notification => ({
  id: crypto.randomUUID(),

  title,

  message,

  type,

  read: false,

  createdAt: new Date().toISOString(),
});


/* -------------------------------------------------------------------------- */
/*                             Fake Realtime Provider                         */
/* -------------------------------------------------------------------------- */

export const FakeRealtimeProvider = () => {

  const dispatch = useAppDispatch();


  const customerId = useAppSelector(
    selectActiveCustomerId
  );


  const currentOrder = useAppSelector(
    selectCurrentOrder
  );


  const loyalty = useAppSelector(
    selectCurrentLoyalty
  );


  const rankConfig = useAppSelector(
    selectRankConfig
  );


  useEffect(() => {

    if (
      !customerId ||
      !currentOrder ||
      currentOrder.status !== "pending"
    ) {
      return;
    }


    const orderId = currentOrder.id;


    /* ---------------- Accepted ---------------- */

    const acceptedTimer =
      window.setTimeout(() => {

        dispatch(
          updateOrderStatus({
            orderId,
            status: "accepted",
          })
        );


        dispatch(
          addNotification({
            customerId,

            notification: createNotification(
              "Order Accepted",
              "The restaurant accepted your order 👍",
              "info"
            ),
          })
        );


        toast.info(
          "Your order was accepted 👍"
        );

      }, 2000);


    /* ---------------- Preparing ---------------- */

    const preparingTimer =
      window.setTimeout(() => {

        dispatch(
          updateOrderStatus({
            orderId,
            status: "preparing",
          })
        );


        dispatch(
          addNotification({
            customerId,

            notification: createNotification(
              "Order Update",
              "Your order is being prepared 👨‍🍳",
              "info"
            ),
          })
        );


        toast.info(
          "Your order is being prepared 👨‍🍳"
        );

      }, 6000);


    /* ---------------- Ready ---------------- */

    const readyTimer =
      window.setTimeout(() => {

        dispatch(
          updateOrderStatus({
            orderId,
            status: "ready",
          })
        );


        dispatch(
          addNotification({
            customerId,

            notification: createNotification(
              "Order Ready",
              "Your order is ready ✅",
              "success"
            ),
          })
        );


        toast.success(
          "Your order is ready ✅"
        );

      }, 11000);


    /* ---------------- Served ---------------- */

    const servedTimer =
      window.setTimeout(() => {

        dispatch(
          updateOrderStatus({
            orderId,
            status: "served",
          })
        );


        const spent =
          currentOrder.totalPrice;


        dispatch(
          addSpent({
            customerId,
            amount: spent,
          })
        );


        const totalSpent =
          loyalty.totalSpent + spent;


        const currentRank =
          loyalty.currentRank;


        const result =
          calculateLoyalty(
            totalSpent,
            currentRank,
            rankConfig
          );


        /* ---------------- Loyalty Reward ---------------- */

        if (result.unlocked) {

          dispatch(
            unlockReward({
              customerId,

              rank: result.rank,

              reward: result.reward,
            })
          );


          dispatch(
            addNotification({
              customerId,

              notification: createNotification(
                `${result.rank.toUpperCase()} Rank Unlocked 🎉`,

                `Congratulations! You've earned a ${result.reward}% reward.`,

                "success"
              ),
            })
          );


          toast.success(
            `${result.rank.toUpperCase()} unlocked!`
          );
        }


        /* ---------------- Order Served ---------------- */

        dispatch(
          addNotification({
            customerId,

            notification: createNotification(
              "Order Served",

              "Your order has been served 🍽️",

              "success"
            ),
          })
        );


        toast.success(
          "Order served 🍽️"
        );

      }, 16000);


    return () => {

      clearTimeout(
        acceptedTimer
      );

      clearTimeout(
        preparingTimer
      );

      clearTimeout(
        readyTimer
      );

      clearTimeout(
        servedTimer
      );

    };

  }, [
    customerId,
    currentOrder?.id,
    dispatch,
    loyalty,
    rankConfig,
  ]);


  return null;
};


export default FakeRealtimeProvider;