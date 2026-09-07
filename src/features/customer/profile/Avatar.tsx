import React from "react";

interface AvatarProps {
  name?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ name }) => {
  if (!name) {
    return (
      <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-accent-tint-strong)] text-3xl font-bold text-[var(--color-text-primary)]">
        G
      </div>
    );
  }

  const firstLetter = name.charAt(0).toUpperCase();

  return (
    <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[var(--color-accent-strong)] text-3xl font-bold text-[var(--color-surface)]">
      {firstLetter}
    </div>
  );
};