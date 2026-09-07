import * as React from "react";

import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "flex h-10 w-full min-w-0 rounded-xl border border-amber-900/30 bg-[#1a120b] px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  );
}

export { Input };
