import {forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";


export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-xl font-medium transition-all disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-white hover:opacity-90 active:scale-[0.98]",
        secondary:
          "bg-muted text-white hover:bg-muted/80 active:scale-[0.98]",
        outline:
          "border border-border bg-transparent hover:bg-muted active:scale-[0.98]",
        danger:
          "bg-red-500 text-white hover:bg-red-600 active:scale-[0.98]",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5",
        lg: "h-12 px-6 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(buttonVariants({ variant, size }), className)}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;