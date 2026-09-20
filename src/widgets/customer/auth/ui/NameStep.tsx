import { ArrowLeft, User } from "lucide-react";
import { useState } from "react";

type NameStepProps = {
  loading?: boolean;
  error: string | null;
  onSubmit: (name: string) => void;
};

const NameStep = ({ loading = false, error, onSubmit }: NameStepProps) => {
  const [name, setName] = useState("");

  return (
    <div className="space-y-5 text-right">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          تقریباً تمام شد!
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          برای ساخت پروفایل، نام خود را وارد کنید
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs text-[var(--color-text-secondary)]">
          نام کامل
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-3">
          <User size={16} className="text-[var(--color-accent)]" />

          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="مثلاً سارا احمدی"
            className="w-full bg-transparent py-3 text-sm text-[var(--color-text-primary)] outline-none"
          />
        </div>

        {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      </div>

      <button
        type="button"
        disabled={loading || !name.trim()}
        onClick={() => onSubmit(name)}
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white disabled:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
        }}
      >
        {loading ? "در حال ایجاد..." : "ساخت پروفایل"}
        {!loading && <ArrowLeft size={15} />}
      </button>
    </div>
  );
};

export default NameStep;
