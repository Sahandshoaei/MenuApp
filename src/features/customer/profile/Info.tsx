import React from "react";

interface InfoProps {
  name?: string;
  phone?: string;
}

export const Info: React.FC<InfoProps> = ({ name, phone }) => {
  if (!name) {
    return (
      <div className="mt-4">
        <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">Guest</h2>
        <p className="text-[var(--color-text-secondary)]">Sign in to start collecting rewards</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h2 className="text-2xl font-bold text-[var(--color-text-primary)]">{name}</h2>
      {phone && <p className="text-[var(--color-text-secondary)]">{phone}</p>}
    </div>
  );
};