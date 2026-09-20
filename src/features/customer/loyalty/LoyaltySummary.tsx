import { Award, Gift } from "lucide-react";
import { useLoyalty } from "@/entities/loyalty/hooks/useLoyalty";

const RANK_FA: Record<string, string> = {
  none: "بدون رتبه",
  bronze: "برنزی",
  silver: "نقره‌ای",
  gold: "طلایی",
};

const LoyaltySummary = () => {
  const { rank, reward, rewardAvailable } = useLoyalty();

  return (
    <div className="grid grid-cols-2 gap-3">
      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint-strong)]">
            <Award size={18} className="text-[var(--color-accent)]" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-xs text-[var(--color-text-secondary)]">
              رتبه فعلی
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-[var(--color-text-primary)]">
              {RANK_FA[rank] ?? rank}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint-strong)]">
            <Gift size={18} className="text-[var(--color-accent)]" />
          </div>

          <div className="min-w-0 text-right">
            <p className="text-xs text-[var(--color-text-secondary)]">جایزه</p>
            <p className="mt-1 text-sm font-semibold text-[var(--color-text-primary)]">
              {typeof reward === "number" ? `${reward}٪` : reward}
            </p>
            {rewardAvailable && (
              <span className="text-[10px] text-green-600">فعال</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoyaltySummary;
