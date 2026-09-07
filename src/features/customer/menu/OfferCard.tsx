import type { MenuItem } from "../../../entities/menu/types/menu-item";

type Props = {
  item: MenuItem;
};

const OfferCard = ({ item }: Props) => {
  return (
    <div
      className="
        overflow-hidden
        rounded-3xl
        bg-[var(--color-surface)]
        shadow-[0_8px_24px_rgba(34,28,94,0.08)]
      "
    >
      <img
        src={item.image}
        alt={item.name}
        className="
          h-40
          w-full
          object-cover
        "
      />

      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {item.description}
        </p>

        <p className="mt-3 font-bold text-[var(--color-accent)]">
          ${item.price}
        </p>
      </div>
    </div>
  );
};

export default OfferCard;
