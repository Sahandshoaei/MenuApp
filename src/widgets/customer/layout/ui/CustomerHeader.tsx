import { Bell, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCustomer } from "../../../../entities/customer/hooks/useCustomer";
import { useNotification } from "../../../../entities/notification/hooks/useNotification";

interface CustomerHeaderProps {
  onCartClick: () => void;
  onProfileClick?: () => void;
}

export function CustomerHeader({onCartClick , onProfileClick }: CustomerHeaderProps) {

  const navigate = useNavigate();
  const { customer } = useCustomer();
  const { unreadCount } = useNotification();

  return (
    
    <header className="flex items-center justify-between p-3 bg-[#6A689A]">


      <div className="flex items-center cursor-pointer gap-3" onClick={() => navigate("/profile")
}>
        <div
          className="
            flex h-10 w-10
            items-center
            justify-center
            rounded-full
            bg-white
            font-bold
            text-[#221C5E]
          "
        >
          {customer?.name?.charAt(0) ?? "G"}
        </div>

        <div>
          <p className="font-semibold">
            {customer?.name ?? "Guest"}
          </p>

          <p className="text-xs text-gray-400">
            {customer ? "Welcome back" : "Welcome Guest"}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          className="
            relative
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            border
            border-white/10
            bg-white/5
            backdrop-blur
          "
          onClick={() => navigate("/notifications")}
        >
          <Bell size={18} />

          {unreadCount > 0 && (
            <span
              className="
                absolute
                -right-1
                -top-1
                flex
                h-5
                min-w-[20px]
                items-center
                justify-center
                rounded-full
                bg-red-500
                px-1
                text-[10px]
                font-bold
                text-white
              "
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </button>

        <button className="
            h-10
            w-10
            rounded-full
            border
            border-white/10
            bg-white/5
            flex
            items-center
            justify-center
            backdrop-blur
            "
        onClick={onCartClick}>
          <ShoppingBag size={18} />
        </button>
      </div>
    </header>
  );
}