import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useAppSelector } from "@/app/store/hooks";
import {selectCurrentOrder} from "@/entities/order/state/orderSelector";
import { selectOrderHistory } from "@/entities/order/state/orderSelector";
import { OrderTabs, type OrderTabKey } from "./OrderTabs";
import { ActiveOrderCard } from "@/features/customer/order/ActiveOrderCard";
import { OrderHistoryList } from "./OrderHistoryList";
import { EmptyOrderState } from "@/features/customer/order/EmptyOrderState";

const panelMotion = {
  initial: { opacity: 0, y: 15 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -15 },
  transition: { duration: 0.25 },
};

export const OrderTabsContent = () => {

  const [activeTab, setActiveTab] = useState<OrderTabKey>("active");

  const currentOrder = useAppSelector(selectCurrentOrder);
  const pastOrders = useAppSelector(selectOrderHistory);
  // const cancelledOrders = useAppSelector(selectCancelledOrders);

  return (
    <>
      <OrderTabs activeTab={activeTab} onTabChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === "active" && (
          <motion.div key="active" {...panelMotion} className="mt-6">
            {currentOrder ? (
              <ActiveOrderCard order={currentOrder} />
            ) : (
              <EmptyOrderState
                title="No active order"
                message="Your current order will show up here once you check out."
              />
            )}
          </motion.div>
        )}

        {activeTab === "past" && (
          <motion.div key="past" {...panelMotion} className="mt-6">
            {pastOrders.length > 0 ? (
              <OrderHistoryList orders={pastOrders} />
            ) : (
              <EmptyOrderState
                title="No past orders"
                message="Orders you've received will appear here."
              />
            )}
          </motion.div>
        )}

        {activeTab === "cancelled" && (
          <motion.div key="cancelled" {...panelMotion} className="mt-6">
            {/* {cancelledOrders.length > 0 ? (
              <OrderHistoryList orders={cancelledOrders} />
            ) : (
              <EmptyOrderState
                title="No cancelled orders"
                message="Orders you cancel will show up here."
              />
            )} */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};