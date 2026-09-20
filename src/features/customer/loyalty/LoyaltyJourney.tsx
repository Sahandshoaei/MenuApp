import { Check, Lock } from "lucide-react";
import { useLoyalty } from "@/entities/loyalty/hooks/useLoyalty";
import { useAppSelector } from "@/app/store/hooks";
import { selectRankConfig } from "@/entities/loyalty/state/loyaltySelector";
import { formatToman } from "@/shared/format/money";

const LoyaltyJourney = () => {
  const { rank } = useLoyalty();
  const rankConfig = useAppSelector(selectRankConfig);

  const journey = [
    {
      rank: "none",
      title: "شروع",
      amount: formatToman(0),
    },
    {
      rank: "bronze",
      title: "عضو برنزی",
      amount: formatToman(rankConfig.bronze.minSpent),
    },
    {
      rank: "silver",
      title: "عضو نقره‌ای",
      amount: formatToman(rankConfig.silver.minSpent),
    },
    {
      rank: "gold",
      title: "عضو طلایی",
      amount: formatToman(rankConfig.gold.minSpent),
    },
  ];

  const currentIndex = journey.findIndex((item) => item.rank === rank);

  return (
    <div className="rounded-3xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] p-5">
      <h3 className="mb-5 text-sm font-semibold text-[var(--color-text-primary)]">
        مسیر وفاداری
      </h3>

      <div className="space-y-4">
        {journey.map((item, index) => {
          const unlocked = index <= currentIndex;

          return (
            <div key={item.rank} className="flex items-center gap-3">
              <div
                className={`
                  flex h-9 w-9 items-center justify-center rounded-full
                  ${
                    unlocked
                      ? "bg-[var(--color-accent-tint-strong)]"
                      : "bg-[var(--color-border)]"
                  }
                `}
              >
                {unlocked ? (
                  <Check size={16} className="text-[var(--color-accent)]" />
                ) : (
                  <Lock
                    size={15}
                    className="text-[var(--color-text-secondary)] opacity-40"
                  />
                )}
              </div>

              <div className="text-right">
                <p className="text-sm font-medium text-[var(--color-text-primary)]">
                  {item.title}
                </p>
                <p className="text-xs text-[var(--color-text-secondary)]">
                  باز شدن از {item.amount}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoyaltyJourney;
