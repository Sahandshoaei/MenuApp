import { AnimatePresence, motion } from "framer-motion";
import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";
import type { Table } from "../../../entities/table/types/table";

type CartDrawerProps = {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
  availableTables: Table[];
  selectedTableId: string | null;
  onSelectTable: (tableId: string) => void;
};

const CartDrawer = ({
  open,
  onClose,
  onCheckout,
  availableTables,
  selectedTableId,
  onSelectTable,
}: CartDrawerProps) => {

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 z-40"
            style={{
              background: "rgba(0, 28, 94, 0.6)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Drawer */}
          <motion.aside
            className="
              fixed
              right-0
              top-0
              z-50
              flex
              h-screen
              w-full
              max-w-md
              flex-col
              backdrop-blur-2xl
              backdrop-saturate-150
            "
            style={{
              background: "var(--color-surface-glass)",
              borderLeft: "0.5px solid var(--color-border-strong)",
              boxShadow: "-8px 0 32px rgba(34,28,94,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{
              type: "spring",
              stiffness: 250,
              damping: 25,
            }}
          >
            {/* Header */}
            <CartHeader
              onClose={onClose}/>

            {/* Content */}
            <div className="flex-1 overflow-y-auto p-5">
              <CartContent />
            </div>

            {/* Footer */}
            <CartFooter
              onCheckout={onCheckout}
              availableTables={availableTables}
              selectedTableId={selectedTableId}
              onSelectTable={onSelectTable}
            />
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;



// وظیفه CartDrawer

// خود CartDrawer فقط این کارها را انجام می‌دهد:

// باز/بسته شدن Drawer
// نمایش Header
// نمایش محتوای Cart
// نمایش CartItem
// نمایش CartSummary
// مدیریت Checkout
// اگر کاربر Guest باشد → باز کردن Register Modal
// اگر Login باشد → ثبت Order

// اما محاسبه تعداد، قیمت و عملیات Cart را از useCart می‌گیرد.


// جریان دیتا:

// CartDrawer
//     │
//     ├── CartHeader
//     │
//     ├── CartContent
//     │      │
//     │      └── CartItem
//     │             │
//     │             └── useCart
//     │
//     └── CartFooter
//            │
//            └── useCart



//مسئولیت ها :

// CartDrawer
// │
// ├── CartHeader
// │     ├── عنوان
// │     ├── تعداد آیتم
// │     └── Close
// │
// ├── CartContent
// │     └── CartItem
// │
// └── CartFooter
//       ├── Clear Cart
//       ├── Total Items
//       ├── Total Price
//       └── Checkout