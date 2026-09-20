import React from "react";

interface InfoProps {
  name?: string;
  phone?: string;
}

export const Info: React.FC<InfoProps> = ({ name, phone }) => {
  if (!name) {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
          مهمان
        </h2>
        <p className="text-[var(--color-text-secondary)]">
          وارد شوید تا جوایز وفاداری جمع کنید
        </p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">
        {name}
      </h2>
      {phone && (
        <p className="text-[var(--color-text-secondary)]" dir="ltr">
          {phone}
        </p>
      )}
    </div>
  );
};
