import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

import PhoneStep from "./PhoneStep";
import OtpStep from "./OtpStep";
import NameStep from "./NameStep";

import { useAuthentication } from "../hooks/useAuthentication";

type AuthModalProps = {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
};

const AuthModal = ({ open, onClose, onSuccess }: AuthModalProps) => {
  const {
    step,
    phone,
    loading,
    error,
    sendOtp,
    verifyOtp,
    completeRegistration,
    backToPhone,
    reset,
  } = useAuthentication();

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleSuccess = () => {
    reset();
    onSuccess?.();
  };

  const handleRegistration = (name: string) => {
    const success = completeRegistration(name);
    if (success) {
      handleSuccess();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 z-[60] bg-[color:var(--color-overlay)] backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          <div className="pointer-events-none fixed inset-0 z-[70] flex items-center justify-center px-5">
            <motion.div
              className="pointer-events-auto w-full max-w-md"
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
            >
              <div className="mx-auto h-0.5 w-16 rounded-full bg-gradient-to-r from-transparent via-[var(--color-accent)] to-transparent" />

              <div
                className="rounded-3xl border p-6 shadow-2xl"
                style={{
                  background: "var(--color-surface)",
                  borderColor: "var(--color-border-strong)",
                  boxShadow: "0 24px 60px rgba(34,28,94,0.25)",
                }}
              >
                <div className="mb-6 flex items-center justify-between">
                  <div className="text-right">
                    <h2
                      className="text-base font-semibold"
                      style={{ color: "var(--color-text-primary)" }}
                    >
                      {step === "phone" && "ورود / ثبت‌نام"}
                      {step === "otp" && "تأیید هویت"}
                      {step === "name" && "ساخت پروفایل"}
                    </h2>

                    <p
                      className="mt-1 text-xs"
                      style={{ color: "var(--color-text-secondary)" }}
                    >
                      {step === "phone" && "وارد شوید یا حساب بسازید"}
                      {step === "otp" && "شماره موبایل را تأیید کنید"}
                      {step === "name" && "پروفایل خود را کامل کنید"}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleClose}
                    aria-label="بستن"
                    className="flex h-8 w-8 items-center justify-center rounded-lg"
                    style={{
                      background: "var(--color-accent-tint)",
                      border: "0.5px solid var(--color-border)",
                      color: "var(--color-text-secondary)",
                    }}
                  >
                    <X size={15} />
                  </button>
                </div>

                <div className="mb-6 flex gap-1.5">
                  <div
                    className="h-1 flex-1 rounded-full"
                    style={{
                      background:
                        step === "phone" || step === "otp" || step === "name"
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    }}
                  />
                  <div
                    className="h-1 flex-1 rounded-full"
                    style={{
                      background:
                        step === "otp" || step === "name"
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    }}
                  />
                  <div
                    className="h-1 flex-1 rounded-full"
                    style={{
                      background:
                        step === "name"
                          ? "var(--color-accent)"
                          : "var(--color-border)",
                    }}
                  />
                </div>

                <AnimatePresence mode="wait">
                  {step === "phone" && (
                    <motion.div
                      key="phone"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                    >
                      <PhoneStep
                        loading={loading}
                        error={error}
                        onSubmit={sendOtp}
                      />
                    </motion.div>
                  )}

                  {step === "otp" && (
                    <motion.div
                      key="otp"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <OtpStep
                        phone={phone}
                        loading={loading}
                        error={error}
                        onSubmit={verifyOtp}
                        onBack={backToPhone}
                      />
                    </motion.div>
                  )}

                  {step === "name" && (
                    <motion.div
                      key="name"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                    >
                      <NameStep
                        loading={loading}
                        error={error}
                        onSubmit={handleRegistration}
                      />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AuthModal;
