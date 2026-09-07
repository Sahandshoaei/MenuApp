import { LOYALTY_RANK_CONFIG } from "@/entities/loyalty/lib/rankConfig";
import type { LoyaltyRank } from "@/entities/loyalty/types/loyalty";

interface LoyaltyRankBadgeProps {
  rank: LoyaltyRank;
}

const LoyaltyRankBadge = ({ rank }: LoyaltyRankBadgeProps) => {
  const config = LOYALTY_RANK_CONFIG[rank];

  return (
    <span
      className="rounded-full px-2.5 py-1 text-xs font-medium"
      style={{
        color: config.color,
        background: config.bg,
      }}
    >
      {config.label}
    </span>
  );
};

export default LoyaltyRankBadge;
