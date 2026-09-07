import { HTMLAttributes } from "react";

const Container = ({ className = "", ...props }: HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={`
            min-h-screen
            bg-[var(--color-bg)]
            text-[var(--color-text-primary)]
            pb-28
            px-5
            pt-6
            ${className}
          `}
          {...props}
        />
  );
};

export default Container;