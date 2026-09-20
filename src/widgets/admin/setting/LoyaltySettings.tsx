import { useState } from "react";
import { Diamond, Pencil, Check, X } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { selectRankConfig } from "@/entities/loyalty/state/loyaltySelector";
import { updateRankConfig } from "@/entities/loyalty/state/loyaltySlice";
import type { LoyaltyRank } from "@/entities/loyalty/types/loyalty";

const RANK_LABELS: Record<Exclude<LoyaltyRank, "none">, string> = {
  bronze: "Bronze",
  silver: "Silver",
  gold: "Gold",
};

const RANKS: Exclude<LoyaltyRank, "none">[] = ["bronze", "silver", "gold"];

const inputClass = `
  w-20 rounded-lg border border-[var(--color-border-strong)] bg-transparent
  px-2 py-1 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]
`;

const LoyaltySettings = () => {
  const dispatch = useAppDispatch();
  const rankConfig = useAppSelector(selectRankConfig);

  const [editingRank, setEditingRank] = useState<Exclude<LoyaltyRank, "none"> | null>(null);
  const [draftMinSpent, setDraftMinSpent] = useState("");
  const [draftReward, setDraftReward] = useState("");

  const startEdit = (rank: Exclude<LoyaltyRank, "none">) => {
    setEditingRank(rank);
    setDraftMinSpent(rankConfig[rank].minSpent.toString());
    setDraftReward(rankConfig[rank].reward.toString());
  };

  const cancelEdit = () => setEditingRank(null);

  const saveEdit = (rank: Exclude<LoyaltyRank, "none">) => {
    dispatch(
      updateRankConfig({
        rank,
        config: {
          minSpent: Number(draftMinSpent) || 0,
          reward: Number(draftReward) || 0,
        },
      })
    );
    setEditingRank(null);
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)]">
            <Diamond size={20} className="text-[var(--color-accent)]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">برنامه‌ی Loyalty</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              آستانه‌ی خرج و مقدار تخفیف هر رتبه رو تنظیم کن
            </p>
          </div>
        </div>

        {/* Tiers */}
        <div>
          <div className="overflow-hidden rounded-xl border border-[var(--color-border)]">
            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-3 bg-[var(--color-accent-tint)] px-4 py-3 text-xs font-medium text-[var(--color-text-secondary)]">
              <span>رتبه</span>
              <span>حداقل خرج ($)</span>
              <span>تخفیف ($)</span>
              <span />
            </div>

            {RANKS.map((rank) => {
              const isEditing = editingRank === rank;
              const config = rankConfig[rank];

              return (
                <div
                  key={rank}
                  className="grid grid-cols-[1fr_1fr_1fr_auto] items-center gap-3 border-t border-[var(--color-border)] px-4 py-3"
                >
                  <span className="text-sm font-medium text-[var(--color-text-primary)]">
                    {RANK_LABELS[rank]}
                  </span>

                  {isEditing ? (
                    <input
                      type="number"
                      className={inputClass}
                      value={draftMinSpent}
                      onChange={(e) => setDraftMinSpent(e.target.value)}
                    />
                  ) : (
                    <span className="text-sm text-[var(--color-text-secondary)]">${config.minSpent}</span>
                  )}

                  {isEditing ? (
                    <input
                      type="number"
                      className={inputClass}
                      value={draftReward}
                      onChange={(e) => setDraftReward(e.target.value)}
                    />
                  ) : (
                    <span className="w-fit rounded-lg bg-[var(--color-accent-tint)] px-2.5 py-1 text-xs font-medium text-[var(--color-accent)]">
                      ${config.reward} تخفیف
                    </span>
                  )}

                  {isEditing ? (
                    <div className="flex gap-1">
                      <button
                        type="button"
                        onClick={() => saveEdit(rank)}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                      >
                        <Check size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => startEdit(rank)}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-text-primary)]"
                    >
                      <Pencil size={14} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoyaltySettings;
