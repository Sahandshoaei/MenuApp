import { cn } from "@/lib/utils";

interface AvatarProps {
  name: string;
  className?: string;
}

// چون Customer فیلد عکس نداره، یه آواتار حرف‌اول‌دار با رنگ ثابت
// (بر اساس نام) می‌سازیم؛ همون اسم همیشه همون رنگ رو می‌گیره.
const AVATAR_COLORS = [
  "#e8832a",
  "#6fb37a",
  "#c9a876",
  "#5a8fd6",
  "#d9695a",
  "#a978d6",
];

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
};

const getColor = (name: string) => {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

function Avatar({ name, className }: AvatarProps) {
  return (
    <div
      className={cn(
        "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold text-white",
        className
      )}
      style={{ background: getColor(name) }}
    >
      {getInitials(name)}
    </div>
  );
}

export { Avatar };
