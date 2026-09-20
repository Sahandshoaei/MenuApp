import { formatToman } from "@/shared/format/money";
import React from "react";
import { useAppSelector } from "@/app/store/hooks";
import { selectOrderHistory } from "@/entities/order/state/orderSelector";
import { selectFavoriteCount } from "@/entities/favorite/state/favoriteSelector";

interface StatusProps {
  loyalty?: {
    totalSpent?: number;
    [key: string]: unknown;
  } | null;
}

export const Status: React.FC<StatusProps> = ({ loyalty }) => {
  const orders = useAppSelector(selectOrderHistory);
  const favorites = useAppSelector(selectFavoriteCount);

  const totalSpent =
    typeof loyalty?.totalSpent === "number" ? loyalty.totalSpent : 0;

  return (
    <div className="mt-6 grid grid-cols-3 overflow-hidden rounded-3xl border border-[var(--color-border)] bg-[var(--color-surface)] shadow-[0_6px_20px_rgba(34,28,94,0.06)]">
      <div className="flex flex-col items-center justify-center py-5">
        <p className="text-xl font-bold text-[var(--color-text-primary)]">
          {orders?.length ?? 0}
        </p>
        <span className="text-xs text-[var(--color-text-secondary)]">
          سفارش‌ها
        </span>
      </div>

      <div className="flex flex-col items-center justify-center border-x border-[var(--color-border)] py-5">
        <p className="text-xl font-bold text-[var(--color-text-primary)]">
          {formatToman(totalSpent)}
        </p>
        <span className="text-xs text-[var(--color-text-secondary)]">هزینه</span>
      </div>

      <div className="flex flex-col items-center justify-center py-5">
        <p className="text-xl font-bold text-[var(--color-text-primary)]">
          {Array.isArray(favorites)
            ? favorites.length
            : typeof favorites === "number"
              ? favorites
              : 0}
        </p>
        <span className="text-xs text-[var(--color-text-secondary)]">
          علاقه‌مندی
        </span>
      </div>
    </div>
  );
};
