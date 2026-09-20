import { AnimatePresence, motion } from "framer-motion";
import CartHeader from "./CartHeader";
import CartContent from "./CartContent";
import CartFooter from "./CartFooter";
import type { Table } from "../../../entities/table/types/table";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

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
  const reducedMotion = usePrefersReducedMotion();

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-40"
            style={{ background: "var(--color-overlay)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={reducedMotion ? { duration: 0.12 } : { duration: 0.25 }}
            onClick={onClose}
          />

          <motion.aside
            className="
              fixed right-0 top-0 z-50 flex h-screen w-full max-w-md
              flex-col backdrop-blur-2xl backdrop-saturate-150
            "
            style={{
              background: "var(--color-surface-glass)",
              borderLeft: "0.5px solid var(--color-border-strong)",
              boxShadow: "-8px 0 32px rgba(34,28,94,0.15)",
            }}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={
              reducedMotion
                ? { duration: 0.18 }
                : spring.soft
            }
          >
            <CartHeader onClose={onClose} />

            <div className="flex-1 overflow-y-auto p-5">
              <CartContent />
            </div>

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
