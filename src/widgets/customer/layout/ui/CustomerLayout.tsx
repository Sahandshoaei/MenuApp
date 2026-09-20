import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LayoutGroup } from "framer-motion";
import AnimatedOutlet from "./AnimatedOutlet";
import { CustomerHeader } from "./CustomerHeader";
import CustomerBottomNavigation from "./CustomerBottomNavigation";
import CartDrawer from "../../cart/CartDrawer";
import { FlyToCartProvider } from "../../cart/FlyToCartContext";
import { useCheckout } from "../../../../entities/cart/hooks/useCheckout";
import AuthModal from "../../auth/ui/AuthModal";
import { CUSTOMER_SCROLL_ROOT } from "../lib/scrollRoot";

export function CustomerLayout() {
  const navigate = useNavigate();

  const [cartOpen, setCartOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);

  const {
    checkout,
    availableTables,
    selectedTableId,
    setSelectedTableId,
  } = useCheckout({
    onRequireAuth: () => {
      setCartOpen(false);
      setAuthOpen(true);
    },
    onSuccess: () => {
      setCartOpen(false);
      navigate("/orders");
    },
  });

  return (
    <FlyToCartProvider>
      <div
        className="fixed inset-0 flex flex-col bg-[var(--color-bg)]"
        dir="rtl"
        lang="fa"
        style={{ fontFamily: "var(--font-customer)" }}
      >
        <div className="relative z-50 shrink-0">
          <CustomerHeader
            onCartClick={() => setCartOpen(true)}
            onProfileClick={() => setAuthOpen(true)}
          />
        </div>

        <LayoutGroup id="customer-app">
          <main
            id={CUSTOMER_SCROLL_ROOT}
            data-app-scroll="customer"
            className="relative z-0 min-h-0 flex-1 overflow-x-hidden overflow-y-auto overscroll-contain pb-28"
          >
            <AnimatedOutlet />
          </main>

          <div className="pointer-events-none fixed inset-x-0 bottom-0 z-50">
            <div className="pointer-events-auto">
              <CustomerBottomNavigation
                onRegisterClick={() => setAuthOpen(true)}
              />
            </div>
          </div>
        </LayoutGroup>

        <CartDrawer
          open={cartOpen}
          onClose={() => setCartOpen(false)}
          onCheckout={checkout}
          availableTables={availableTables}
          selectedTableId={selectedTableId}
          onSelectTable={setSelectedTableId}
        />

        <AuthModal
          open={authOpen}
          onClose={() => setAuthOpen(false)}
          onSuccess={() => {
            setAuthOpen(false);
            navigate("/profile");
          }}
        />
      </div>
    </FlyToCartProvider>
  );
}
