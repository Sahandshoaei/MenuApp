import { Globe } from "lucide-react";

const LanguageSettings = () => {
  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <div className="grid gap-8 md:grid-cols-2 md:items-center">

        {/* Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10">
            <Globe
              size={20}
              className="text-emerald-400"
            />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">
              Language
            </h2>

            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              Choose the language for the admin panel
            </p>
          </div>
        </div>

        {/* Setting */}
        <div>
          <label className="mb-2 block text-sm font-medium text-[var(--color-text-primary)]">
            Language
          </label>

          <select
            defaultValue="en"
            className="
              w-full rounded-xl
              border border-[var(--color-border-strong)]
              bg-[var(--color-bg)]
              px-4 py-3
              text-sm text-[var(--color-text-primary)]
              outline-none
              transition
              focus:border-emerald-500/50
            "
          >
            <option value="en">
              English
            </option>

            <option value="fa">
              فارسی
            </option>

            <option value="ar">
              العربية
            </option>
          </select>

          <p className="mt-2 text-xs text-[var(--color-text-secondary)]">
            This will change the language of the admin panel.
          </p>
        </div>

      </div>
    </section>
  );
};

export default LanguageSettings;