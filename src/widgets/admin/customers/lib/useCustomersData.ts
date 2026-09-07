import { useMemo, useState } from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectProfiles } from "@/entities/customer/state/customerSelector";
import { selectLoyaltyByCustomer } from "@/entities/loyalty/state/loyaltySelector";
import { selectAllOrders } from "@/entities/order/state/orderSelector";
import type { LoyaltyRank } from "@/entities/loyalty/types/loyalty";

export interface CustomerRow {
  id: string;
  name: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  rank: LoyaltyRank;
  lastOrderAt: string | null;
}

export const useCustomersData = () => {
  const profiles = useAppSelector(selectProfiles);
  const loyaltyByCustomer = useAppSelector(selectLoyaltyByCustomer);
  const orders = useAppSelector(selectAllOrders);

  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(
    null
  );

  const rows = useMemo<CustomerRow[]>(() => {
    return Object.values(profiles)
      .map((customer) => {
        const customerOrders = orders.filter(
          (order) => order.customerId === customer.id
        );

        const lastOrder = [...customerOrders].sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        )[0];

        const loyalty = loyaltyByCustomer[customer.id];

        return {
          id: customer.id,
          name: customer.name || "بدون نام",
          phone: customer.phone,
          ordersCount: customerOrders.length,
          totalSpent: loyalty?.totalSpent ?? 0,
          rank: (loyalty?.rank ?? loyalty?.currentRank ?? "none") as LoyaltyRank,
          lastOrderAt: lastOrder?.createdAt ?? null,
        };
      })
      .sort((a, b) => b.totalSpent - a.totalSpent);
  }, [profiles, loyaltyByCustomer, orders]);

  const stats = useMemo(() => {
    const totalCustomers = rows.length;
    const totalRevenue = rows.reduce((sum, row) => sum + row.totalSpent, 0);
    const goldCount = rows.filter((row) => row.rank === "gold").length;
    const averageSpent = totalCustomers > 0 ? totalRevenue / totalCustomers : 0;

    return { totalCustomers, totalRevenue, goldCount, averageSpent };
  }, [rows]);

  const selectedCustomer = rows.find((row) => row.id === selectedCustomerId) ?? null;

  const selectedCustomerOrders = useMemo(() => {
    if (!selectedCustomerId) return [];

    return orders
      .filter((order) => order.customerId === selectedCustomerId)
      .sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
  }, [orders, selectedCustomerId]);

  return {
    rows,
    stats,
    selectedCustomer,
    selectedCustomerOrders,
    openCustomer: (id: string) => setSelectedCustomerId(id),
    closeCustomer: () => setSelectedCustomerId(null),
  };
};
