import { motion } from "framer-motion";
import { layoutId } from "@/shared/animations/layoutIds";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

export type ItemInfoTab = "info" | "ingredients";

interface ItemInfoTabsProps {
  activeTab: ItemInfoTab;
  onChange: (tab: ItemInfoTab) => void;
  weightLabel?: string;
}

const TABS: { id: ItemInfoTab; label: string }[] = [
  { id: "info", label: "توضیحات" },
  { id: "ingredients", label: "مواد تشکیل‌دهنده" },
];

const ItemInfoTabs = ({
  activeTab,
  onChange,
  weightLabel,
}: ItemInfoTabsProps) => {
  const reducedMotion = usePrefersReducedMotion();

  return (
    <div className="mt-5 flex items-center justify-between rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-1.5">
      <div className="relative flex gap-1">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onChange(tab.id)}
              className="relative rounded-xl px-4 py-2 text-sm font-medium"
              style={{
                color: active ? "#fff" : "var(--color-text-secondary)",
              }}
            >
              {active && (
                <motion.span
                  layoutId={
                    reducedMotion ? undefined : layoutId.infoTabPill
                  }
                  className="absolute inset-0 rounded-xl"
                  style={{ background: "var(--color-accent)" }}
                  transition={
                    reducedMotion ? { duration: 0 } : spring.layout
                  }
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {weightLabel && (
        <span className="pl-2 text-xs text-[var(--color-text-secondary)]">
          {weightLabel}
        </span>
      )}
    </div>
  );
};

export default ItemInfoTabs;
