import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { MenuItem } from "../../../entities/menu/types/menu-item";
import { layoutId } from "../../../shared/animations/layoutIds";
import { spring } from "../../../shared/animations/motion";
import { formatToman } from "@/shared/format/money";

type Props = {
  item: MenuItem;
};

const OfferCard = ({ item }: Props) => {
  const navigate = useNavigate();

  const openItem = () => {
    navigate(`/category/${item.category}/${item.id}`);
  };

  return (
    <motion.button
      type="button"
      onClick={openItem}
      whileTap={{ scale: 0.985 }}
      transition={spring.snappy}
      className="
        w-full
        overflow-hidden
        rounded-3xl
        bg-[var(--color-surface)]
        text-right
        shadow-[0_8px_24px_rgba(34,28,94,0.08)]
      "
    >
      <div className="overflow-hidden">
        <motion.img
          layoutId={layoutId.itemHero(item.id)}
          transition={spring.layout}
          src={item.image}
          alt={item.name}
          className="h-40 w-full object-cover"
        />
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-text-primary)]">
          {item.name}
        </h3>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          {item.description}
        </p>

        <p className="mt-3 font-bold text-[var(--color-accent)]">
          {formatToman(item.price)}
        </p>
      </div>
    </motion.button>
  );
};

export default OfferCard;
