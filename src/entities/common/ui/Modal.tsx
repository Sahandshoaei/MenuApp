import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import type { ReactNode } from "react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

const Modal = ({ open, onClose, title, children }: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[60] bg-[#221C5E]/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[61] flex items-center justify-center p-4"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
          >
            <div
              className="
                w-full
                max-w-md
                rounded-2xl
                border
                border-[var(--color-border)]
                bg-[var(--color-surface)]
                p-6
                shadow-2xl
              "
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-base font-medium text-[var(--color-text-primary)]">
                  {title}
                </h2>

                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-lg p-1 text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-text-primary)]"
                >
                  <X size={18} />
                </button>
              </div>

              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
