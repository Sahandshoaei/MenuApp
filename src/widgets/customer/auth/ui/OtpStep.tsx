import { ArrowRight, RotateCcw } from "lucide-react";
import { useState } from "react";

type OtpStepProps = {
  phone: string;
  loading: boolean;
  error: string | null;
  onSubmit: (otp: string) => void;
  onBack: () => void;
};

const OtpStep = ({
  phone,
  loading,
  error,
  onSubmit,
  onBack,
}: OtpStepProps) => {
  const [otp, setOtp] = useState("");

  const handleChange = (
    value: string,
  ) => {
    const onlyNumbers =
      value.replace(/\D/g, "");

    if (onlyNumbers.length <= 6) {
      setOtp(onlyNumbers);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Verify your phone
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Enter the 6-digit code sent to
        </p>

        <p className="mt-1 text-sm font-medium text-[var(--color-accent)]">
          +49 {phone}
        </p>
      </div>

      <div>
        <input
          autoFocus
          value={otp}
          onChange={(e) =>
            handleChange(e.target.value)
          }
          maxLength={6}
          inputMode="numeric"
          placeholder="123456"
          className="w-full rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-4 py-4 text-center text-xl tracking-[0.5em] text-[var(--color-text-primary)] outline-none"
        />

        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}

        <p className="mt-3 text-center text-xs text-[var(--color-accent-soft)]">
          Demo OTP: 123456
        </p>
      </div>

      <button
        type="button"
        disabled={
          loading || otp.length !== 6
        }
        onClick={() => onSubmit(otp)}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white disabled:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
        }}
      >
        {loading
          ? "Verifying..."
          : "Verify OTP"}

        {!loading && (
          <ArrowRight size={15} />
        )}
      </button>

      <button
        type="button"
        onClick={onBack}
        className="mx-auto flex items-center gap-2 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-accent)]"
      >
        <RotateCcw size={13} />
        Change phone number
      </button>
    </div>
  );
};

export default OtpStep;
