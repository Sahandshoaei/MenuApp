import * as React from "react";
import { ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

function Select({ className, children, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative inline-flex">
      <select
        data-slot="select"
        className={cn(
          "h-10 w-full appearance-none rounded-xl border border-amber-900/30 bg-[#1a120b] py-2 pl-3 pr-8 text-sm text-zinc-200 outline-none transition-colors focus:border-primary disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        {...props}
      >
        {children}
      </select>

      <ChevronDown
        size={14}
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500"
      />
    </div>
  );
}

export { Select };
