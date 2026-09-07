import { Package } from "lucide-react";

interface EmptyOrderStateProps {
  title: string;
  message: string;
}

export const EmptyOrderState = ({ title, message }: EmptyOrderStateProps) => {
  return (
    <div
      className="
        flex
        min-h-[40vh]
        flex-col
        items-center
        justify-center
        px-6
        text-center
      "
    >
      <div
        className="
          mb-4
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-2xl
        "
        style={{
          background: "var(--color-accent-tint)",
          border: "0.5px solid var(--color-border-strong)",
        }}
      >
        <Package size={32} style={{ color: "var(--color-accent)" }} />
      </div>

      <h3 className="text-lg font-semibold" style={{ color: "var(--color-text-primary)" }}>
        {title}
      </h3>

      <p className="mt-1 max-w-sm text-sm" style={{ color: "var(--color-text-secondary)" }}>
        {message}
      </p>
    </div>
  );
};