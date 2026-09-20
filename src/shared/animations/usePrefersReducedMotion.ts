import { useEffect, useState } from "react";

/**
 * Tracks `prefers-reduced-motion: reduce`.
 * When true, skip decorative motion (fly-to-cart, parallax, heavy springs).
 */
export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    if (!window.matchMedia) return;

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(mq.matches);

    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return reduced;
}

/** Instant transition when reduced motion is on; otherwise passthrough. */
export function motionSafe<T extends object>(
  reduced: boolean,
  transition: T
): T | { duration: number } {
  if (reduced) return { duration: 0 };
  return transition;
}
