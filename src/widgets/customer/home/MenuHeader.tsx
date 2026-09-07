import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../../entities/menu/hooks/useMenu";

// سرچ بر اساس حرف‌های ابتدایی اسم خود آیتم‌ها (startsWith)، نه سرچ متنی کامل.
// یعنی تایپ "برگ" فقط آیتم‌هایی که اسمشون با "برگ" شروع می‌شه رو نشون می‌ده.

const MenuHeader = () => {
  const navigate = useNavigate();
  const { menu } = useMenu();
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const trimmed = query.trim().toLowerCase();

    if (!trimmed) return [];

    return menu.filter((item) =>
      item.name.toLowerCase().startsWith(trimmed)
    );
  }, [menu, query]);

  const showResults = query.trim().length > 0;

  return (
    <div className="relative">
      <h1 className="text-2xl font-bold text-[var(--color-text-primary)]">
        Menu
      </h1>

      <div className="relative mt-4">
        <Search
          size={16}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[var(--color-accent-soft)]"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search menu items..."
          className="
            w-full
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            py-3
            pl-11
            pr-4
            text-sm
            text-[var(--color-text-primary)]
            outline-none
            transition-colors
            placeholder:text-[var(--color-text-secondary)]
            focus:border-[var(--color-border-strong)]
          "
        />
      </div>

      {/* Live results */}
      {showResults && (
        <div
          className="
            absolute
            left-0
            right-0
            top-full
            z-20
            mt-2
            max-h-72
            overflow-y-auto
            rounded-2xl
            border
            border-[var(--color-border)]
            bg-[var(--color-surface)]
            shadow-[0_12px_32px_rgba(34,28,94,0.12)]
          "
        >
          {results.length === 0 ? (
            <p className="p-4 text-center text-sm text-[var(--color-text-secondary)]">
              چیزی با این حروف پیدا نشد.
            </p>
          ) : (
            results.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  navigate(`/category/${item.category}`);
                  setQuery("");
                }}
                className="
                  flex
                  w-full
                  items-center
                  justify-between
                  gap-3
                  border-b
                  border-[var(--color-border)]
                  px-4
                  py-3
                  text-left
                  transition-colors
                  last:border-b-0
                  hover:bg-[var(--color-accent-tint)]
                "
              >
                <span className="truncate text-sm font-medium text-[var(--color-text-primary)]">
                  {item.name}
                </span>

                <span className="shrink-0 text-sm font-semibold text-[var(--color-accent)]">
                  ${item.price}
                </span>
              </button>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default MenuHeader;
