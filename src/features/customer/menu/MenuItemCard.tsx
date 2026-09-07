import type { MouseEvent } from "react";
import { Heart } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "../../../app/store/hooks";
import { addToCart } from "../../../entities/cart/state/cartSlice";
import type { MenuItem } from "../../../entities/menu/types/menu-item";
import { useFavorite } from "../../../entities/favorite/hooks/useFavorite";
import Button from "../../../shared/Button";
import Card from "../../../shared/Card";

type MenuItemCardProps = {
  item: MenuItem;
  onClick?: () => void;
};

const MenuItemCard = ({
  item,
  onClick,
}: MenuItemCardProps) => {
  const dispatch = useAppDispatch();

  const {
    isFavorite,
    toggle,
  } = useFavorite();

  const favoriteStatus = isFavorite(item.id);

  /* ---------------- Add To Cart ---------------- */

  const handleAddToCart = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    dispatch(addToCart(item));

    toast.success(
      `${item.name} added to cart`
    );
  };

  /* ---------------- Favorite ---------------- */

  const handleToggleFavorite = (
    e: MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    toggle(item.id);
  };

  /* ---------------- Card Click ---------------- */

  const handleCardClick = () => {
    onClick?.();
  };

  return (
    <Card
      className="cursor-pointer overflow-hidden rounded-3xl bg-[var(--color-surface)] shadow-[0_6px_20px_rgba(34,28,94,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_rgba(34,28,94,0.12)]"
      onClick={handleCardClick}
    >
      <div className="space-y-4 p-5">

        {/* Header */}
        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0 space-y-1">
            <h3
              className="truncate text-lg font-semibold"
              style={{
                color: "var(--color-text-primary)",
              }}
            >
              {item.name}
            </h3>

            <p
              className="line-clamp-2 text-sm"
              style={{
                color: "var(--color-text-secondary)",
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Favorite */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            aria-label={
              favoriteStatus
                ? "Remove from favorites"
                : "Add to favorites"
            }
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              transition-all
              hover:bg-[var(--color-accent-tint)]
            "
          >
            <Heart
              size={18}
              fill={
                favoriteStatus
                  ? "var(--color-accent)"
                  : "none"
              }
              className={
                favoriteStatus
                  ? "text-[var(--color-accent)]"
                  : "text-[var(--color-accent-soft)]"
              }
            />
          </button>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">

          <span
            className="text-lg font-bold"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            ${item.price}
          </span>

          <Button
            size="sm"
            className="
              rounded-lg
              px-4
              text-sm
              font-medium
              text-white
              transition-opacity
              hover:opacity-90
            "
            style={{
              background:
                "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
              boxShadow:
                "0 4px 16px rgba(34,28,94,0.25)",
              border: "none",
            }}
            onClick={handleAddToCart}
          >
            Add
          </Button>

        </div>
      </div>
    </Card>
  );
};

export default MenuItemCard;