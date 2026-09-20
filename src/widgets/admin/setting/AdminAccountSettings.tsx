import { useState } from "react";
import { User, Pencil, Check, X } from "lucide-react";

const STORAGE_KEY = "admin_display_name";

const loadName = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) ?? "Admin";
  } catch {
    return "Admin";
  }
};

const AdminAccountSettings = () => {
  const [name, setName] = useState(loadName);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(name);

  const save = () => {
    const value = draft.trim() || "Admin";
    setName(value);
    localStorage.setItem(STORAGE_KEY, value);
    setEditing(false);
  };

  return (
    <section className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-tint)]">
            <User size={20} className="text-[var(--color-accent)]" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-[var(--color-text-primary)]">حساب ادمین</h2>
            <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
              نام نمایشی که در پنل ادمین نشون داده می‌شه
            </p>
          </div>
        </div>

        {/* Account info */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-[var(--color-text-secondary)]">نام</span>

            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-40 rounded-lg border border-[var(--color-border-strong)] bg-transparent px-2 py-1 text-sm text-[var(--color-text-primary)] outline-none focus:border-[var(--color-accent)]"
                />

                <button
                  type="button"
                  onClick={save}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10"
                >
                  <Check size={14} />
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setDraft(name);
                    setEditing(false);
                  }}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)]"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--color-text-primary)]">{name}</span>

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--color-border-strong)] text-[var(--color-text-secondary)] hover:bg-[var(--color-accent-tint)] hover:text-[var(--color-text-primary)]"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-[var(--color-text-secondary)]">
            چون پنل ادمین فعلاً سیستم ورود/رمز عبور نداره، فیلد ایمیل و پسورد
            حذف شد تا چیزی نمایش داده نشه که واقعاً کار نمی‌کنه.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminAccountSettings;
