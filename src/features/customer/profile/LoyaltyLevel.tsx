import React from "react";
import { Crown } from "lucide-react";

const rankColors = {
  none: {
    bg: "var(--color-accent-tint)",
    border: "var(--color-border)",
    text: "var(--color-text-secondary)",
    label: "مشتری جدید",
  },
  bronze: {
    bg: "rgba(180,120,60,0.15)",
    border: "rgba(180,120,60,0.4)",
    text: "#9a6a30",
    label: "عضو برنزی",
  },
  silver: {
    bg: "rgba(148,163,184,0.18)",
    border: "rgba(148,163,184,0.45)",
    text: "#64748b",
    label: "عضو نقره‌ای",
  },
  gold: {
    bg: "rgba(234,179,8,0.15)",
    border: "rgba(234,179,8,0.4)",
    text: "#a16207",
    label: "عضو طلایی",
  },
};

interface LoyaltyLevelProps {
  loyalty: {
    rank?: string;
    currentRank?: string;
  } | null;
}

export const LoyaltyLevel: React.FC<LoyaltyLevelProps> = ({ loyalty }) => {
  const currentRank = loyalty?.currentRank ?? loyalty?.rank ?? "none";
  const rankKey = (
    currentRank in rankColors ? currentRank : "none"
  ) as keyof typeof rankColors;
  const rank = rankColors[rankKey];

  return (
    <div
      className="mt-5 inline-flex items-center gap-2 rounded-full border px-4 py-2"
      style={{
        background: rank.bg,
        borderColor: rank.border,
        color: rank.text,
      }}
    >
      <Crown size={16} />
      <span className="font-medium">{rank.label}</span>
    </div>
  );
};
