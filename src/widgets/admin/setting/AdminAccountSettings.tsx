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
    <section className="rounded-2xl border border-amber-900/20 bg-[#1a120b] p-6">
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Info */}
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10">
            <User size={20} className="text-primary" />
          </div>

          <div>
            <h2 className="text-base font-semibold text-white">حساب ادمین</h2>
            <p className="mt-1 text-sm text-zinc-400">
              نام نمایشی که در پنل ادمین نشون داده می‌شه
            </p>
          </div>
        </div>

        {/* Account info */}
        <div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-zinc-400">نام</span>

            {editing ? (
              <div className="flex items-center gap-2">
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  className="w-40 rounded-lg border border-amber-900/30 bg-transparent px-2 py-1 text-sm text-white outline-none focus:border-primary"
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
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-900/30 text-zinc-400 hover:bg-white/5"
                >
                  <X size={14} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm text-white">{name}</span>

                <button
                  type="button"
                  onClick={() => setEditing(true)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-900/30 text-zinc-400 hover:bg-white/5 hover:text-white"
                >
                  <Pencil size={14} />
                </button>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-zinc-500">
            چون پنل ادمین فعلاً سیستم ورود/رمز عبور نداره، فیلد ایمیل و پسورد
            حذف شد تا چیزی نمایش داده نشه که واقعاً کار نمی‌کنه.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AdminAccountSettings;
