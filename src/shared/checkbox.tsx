import * as React from "react";

import { cn } from "@/lib/utils";

type CheckboxProps = Omit<React.ComponentProps<"input">, "type">;

function Checkbox({ className, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      data-slot="checkbox"
      className={cn(
        "h-4 w-4 shrink-0 cursor-pointer rounded-md border border-amber-900/40 bg-[#1a120b] accent-primary outline-none",
        className
      )}
      {...props}
    />
  );
}

export { Checkbox };
