import { useRef } from "react";
import { Calendar, X } from "lucide-react";

interface DateFilterButtonProps {
  value: string;
  onChange: (value: string) => void;
}

const formatDisplayDate = (value: string) => {
  if (!value) return "همه تاریخ‌ها";

  return new Date(value).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
};

const DateFilterButton = ({ value, onChange }: DateFilterButtonProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const openPicker = () => {
    const input = inputRef.current;
    if (!input) return;

    // showPicker مستقیم پیکر تاریخ رو باز می‌کنه (باید حتماً داخل
    // یک event handler که با کلیک کاربر صدا زده شده فراخوانی بشه).
    // اگه مرورگر پشتیبانی نکنه، fallback به focus می‌زنیم.
    if (typeof input.showPicker === "function") {
      input.showPicker();
    } else {
      input.focus();
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={openPicker}
        className="
          flex
          items-center
          gap-2
          rounded-xl
          border
          border-amber-900/30
          bg-[#1a120b]
          px-3
          py-2
          text-sm
          text-zinc-300
        "
      >
        <Calendar size={16} />
        <span>{formatDisplayDate(value)}</span>

        {value && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              onChange("");
            }}
            className="text-zinc-500 hover:text-zinc-300"
          >
            <X size={14} />
          </span>
        )}
      </button>

      <input
        ref={inputRef}
        type="date"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        tabIndex={-1}
        className="absolute left-0 top-full h-0 w-0 opacity-0"
      />
    </div>
  );
};

export default DateFilterButton;
