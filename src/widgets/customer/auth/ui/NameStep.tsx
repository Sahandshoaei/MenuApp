import { ArrowRight, User } from "lucide-react";
import { useState } from "react";

type NameStepProps = {
  loading?: boolean;
  error: string | null;
  onSubmit: (name: string) => void;
};

const NameStep = ({
  loading = false,
  error,
  onSubmit,
}: NameStepProps) => {
  const [name, setName] = useState("");

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-lg font-semibold text-[var(--color-text-primary)]">
          Almost there!
        </h2>

        <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
          Tell us your name to create your profile
        </p>
      </div>

      <div>
        <label className="mb-2 block text-xs text-[var(--color-text-secondary)]">
          Full Name
        </label>

        <div className="flex items-center gap-2 rounded-xl border border-[var(--color-border)] bg-[var(--color-accent-tint)] px-3">
          <User
            size={16}
            className="text-[var(--color-accent)]"
          />

          <input
            autoFocus
            type="text"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
            placeholder="e.g. Sara Ahmadi"
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
        disabled={
          loading || !name.trim()
        }
        onClick={() =>
          onSubmit(name)
        }
        className="flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-medium text-white disabled:opacity-40"
        style={{
          background:
            "linear-gradient(135deg, var(--color-accent), var(--color-accent-strong))",
        }}
      >
        {loading
          ? "Creating..."
          : "Create Profile"}

        {!loading && (
          <ArrowRight size={15} />
        )}
      </button>
    </div>
  );
};

export default NameStep;
