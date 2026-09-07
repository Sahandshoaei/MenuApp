import { ArrowRight, Phone } from "lucide-react";
import { useState } from "react";

type PhoneStepProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (phone: string) => void;
};

const PhoneStep = ({
  loading,
  error,
  onSubmit,
}: PhoneStepProps) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    onSubmit(phone);
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Welcome to BiteStream
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Enter your phone number to continue
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs text-[var(--color-text-secondary)]">
          Phone Number
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-3">
          <Phone
            size={16}
            className="text-[var(--color-accent)]"
          />

          <span className="border-r border-[var(--color-border)] py-3 pr-3 text-xs text-[var(--color-text-secondary)]">
            +49
          </span>

          <input
            type="tel"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
            placeholder="123 456 7890"
            className="w-full bg-transparent py-3 text-sm text-[var(--color-text-primary)] outline-none"
          />
        </div>

        {error && (
          <p className="mt-2 text-xs text-red-500">
            {error}
          </p>
        )}
      </div>

      <button
        type="button"
        disabled={loading}
        onClick={handleSubmit}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white disabled:opacity-50"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
        }}
      >
        {loading ? "Sending..." : "Send OTP"}

        {!loading && <ArrowRight size={15} />}
      </button>
    </div>
  );
};

export default PhoneStep;
