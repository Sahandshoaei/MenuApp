import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

type ProfileCardProps = {
  icon: ReactNode;
  title: string;
  subtitle: string;
  badge?: string;
  onClick?: () => void;
};

const ProfileCard = ({icon,title,subtitle,badge,onClick}: ProfileCardProps) => {
  
  return (
    <button
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-between
        rounded-2xl
        border
        border-[var(--color-border)]
        bg-[var(--color-surface)]
        p-4
        text-left
        shadow-[0_4px_16px_rgba(34,28,94,0.05)]
        transition
        hover:border-[var(--color-border-strong)]
      "
    >
      <div className="flex items-center gap-4">
        <div
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            bg-[var(--color-accent-tint)]
            text-[var(--color-accent)]
          "
        >
          {icon}
        </div>

        <div>
          <h3 className="font-semibold text-[var(--color-text-primary)]">
            {title}
          </h3>

          <p
            className="
              text-xs
              text-[var(--color-text-secondary)]
            "
          >
            {subtitle}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {badge && (
          <span
            className="
              rounded-full
              bg-[var(--color-accent-tint-strong)]
              px-2
              py-1
              text-xs
              font-medium
              text-[var(--color-accent)]
            "
          >
            {badge}
          </span>
        )}

        <ChevronRight
          size={18}
          className="text-[var(--color-accent-soft)]"
        />
      </div>
    </button>
  );
};

export default ProfileCard;