import { useRef, type MouseEvent } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "../../../app/store/hooks";
import { addToCart } from "../../../entities/cart/state/cartSlice";
import type { MenuItem } from "../../../entities/menu/types/menu-item";
import { useFavorite } from "../../../entities/favorite/hooks/useFavorite";
import Button from "../../../shared/Button";
import { useFlyToCartOptional } from "../../../widgets/customer/cart/FlyToCartContext";
import Card from "../../../shared/Card";
import { formatToman } from "@/shared/format/money";

type MenuItemCardProps = {
  item: MenuItem;
  onClick?: () => void;
};

const MenuItemCard = ({ item, onClick }: MenuItemCardProps) => {
  const dispatch = useAppDispatch();
  const fly = useFlyToCartOptional();
  const addBtnRef = useRef<HTMLButtonElement>(null);

  const { isFavorite, toggle } = useFavorite();
  const favoriteStatus = isFavorite(item.id);

  const handleAddToCart = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    dispatch(addToCart(item));
    fly?.flyFromElement(addBtnRef.current);
    toast.success(`${item.name} به سبد اضافه شد`);
  };

  const handleToggleFavorite = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggle(item.id);
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-[0_6px_20px_rgba(34,28,94,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(34,28,94,0.12)]"
      onClick={() => onClick?.()}
    >
      <div className="space-y-4 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0 space-y-1 text-right">
            <h3
              className="truncate text-lg font-semibold"
              style={{ color: "var(--color-text-primary)" }}
            >
              {item.name}
            </h3>

            <p
              className="line-clamp-2 text-sm"
              style={{ color: "var(--color-text-secondary)" }}
            >
              {item.description}
            </p>
          </div>

          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={
              favoriteStatus
                ? "حذف از علاقه‌مندی‌ها"
                : "افزودن به علاقه‌مندی‌ها"
            }
            className="
              flex h-9 w-9 shrink-0 items-center justify-center
              rounded-full transition-all
              hover:bg-[var(--color-accent-tint)]
            "
          >
            <Heart
              size={18}
              fill={favoriteStatus ? "var(--color-accent)" : "none"}
              className={
                favoriteStatus
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-accent-soft)]"
              }
            />
          </button>
        </div>

        <div className="flex items-center justify-between">
          <span
            className="text-lg font-bold"
            style={{ color: "var(--color-text-primary)" }}
          >
            {formatToman(item.price)}
          </span>

          <Button
            ref={addBtnRef}
            size="sm"
            className="rounded-lg px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
              boxShadow: "0 4px 16px rgba(34,28,94,0.25)",
              border: "none",
            }}
            onClick={handleAddToCart}
          >
            افزودن
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;
