import { ArrowLeft, Phone } from "lucide-react";
import { useState } from "react";

type PhoneStepProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (phone: string) => void;
};

const PhoneStep = ({ loading, error, onSubmit }: PhoneStepProps) => {
  const [phone, setPhone] = useState("");

  const handleSubmit = () => {
    onSubmit(phone);
  };

  return (
    <div className="space-y-5 text-right">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          به بایت‌استریم خوش آمدید
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          برای ادامه شماره موبایل خود را وارد کنید
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs text-[var(--color-text-secondary)]">
          شماره موبایل
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-3">
          <Phone size={16} className="text-[var(--color-accent)]" />

          <span
            className="border-l border-[var(--color-border)] py-3 pl-3 text-xs text-[var(--color-text-secondary)]"
            dir="ltr"
          >
            +98
          </span>

          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="912 345 6789"
            dir="ltr"
            className="w-full bg-transparent py-3 text-left text-sm text-[var(--color-text-primary)] outline-none"
          />
        </div>

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
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
        {loading ? "در حال ارسال..." : "ارسال کد تأیید"}
        {!loading && <ArrowLeft size={15} />}
      </button>
    </div>
  );
};

export default PhoneStep;
