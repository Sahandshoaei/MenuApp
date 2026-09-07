import { useNavigate } from "react-router-dom";
import AnimatedOutlet from "./AnimatedOutlet";
import { CustomerHeader } from "./CustomerHeader";
import CustomerBottomNavigation from "./CustomerBottomNavigation";
import CartDrawer from "../../cart/CartDrawer";
import { useState } from "react";
import { useCheckout } from "../../../../entities/cart/hooks/useCheckout";
import AuthModal from "../../auth/ui/AuthModal";

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
    <div className="fixed inset-0 overflow-hidden bg-[var(--color-bg)]">

      {/* ================= HEADER ================= */}
      <div
        className="
          fixed
          inset-x-0
          top-0
          z-50
          bg-[var(--color-bg)]
        "
      >
        <CustomerHeader
          onCartClick={() => setCartOpen(true)}
          onProfileClick={() => setAuthOpen(true)}
        />
      </div>


      {/* ================= SCROLL CONTENT ================= */}
      <main
        className="
          h-full
          overflow-y-auto
          overscroll-contain
          pt-20
          pb-24
          scroll-smooth
        "
      >
        <AnimatedOutlet />
      </main>


      {/* ================= BOTTOM NAVIGATION ================= */}
      <div
        className="
          fixed
          inset-x-0
          bottom-0
          z-50
        "
      >
        <CustomerBottomNavigation
          onRegisterClick={() => setAuthOpen(true)}
        />
      </div>


      {/* ================= CART ================= */}
      <CartDrawer
        open={cartOpen}
        onClose={() => setCartOpen(false)}
        onCheckout={checkout}
        availableTables={availableTables}
        selectedTableId={selectedTableId}
        onSelectTable={setSelectedTableId}
      />


      {/* ================= AUTH ================= */}
      <AuthModal
        open={authOpen}
        onClose={() => setAuthOpen(false)}
        onSuccess={() => {
          setAuthOpen(false);
          navigate("/profile");
        }}
      />

    </div>
  );
}


//جریان فعلی :

    //             CustomerLayout
    //                  │
    //                  ↓
    //             CartDrawer
    //                  │
    //             Checkout
    //                  │
    //       ┌──────────┴──────────┐
    //       ↓                     ↓
    //    Guest                 Customer
    //       │                     │
    //       ↓                     ↓
    //  Auth / OTP            Submit Order
    //       │                     │
    //       ↓                     ↓
    //    Customer             Order Page