import { Plus } from "lucide-react";
import { toast } from "sonner";
import { useAppDispatch } from "@/app/store/hooks";
import { addToCart } from "@/entities/cart/state/cartSlice";
import type { MenuItem } from "@/entities/menu/types/menu-item";

interface AddToCartFABProps {
  item: MenuItem;
}

const AddToCartFAB = ({ item }: AddToCartFABProps) => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(addToCart(item));
    toast.success(`${item.name} added to cart`);
  };

  return (
    <div className="sticky bottom-4 mt-6 flex justify-center">
      <button
        type="button"
        onClick={handleClick}
        className="flex h-14 w-14 items-center justify-center rounded-full text-white shadow-lg transition-transform hover:scale-105"
        style={{ background: "var(--color-accent)" }}
      >
        <Plus size={24} />
      </button>
    </div>
  );
};

export default AddToCartFAB;
