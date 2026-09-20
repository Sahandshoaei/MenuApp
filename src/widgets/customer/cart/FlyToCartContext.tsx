import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

export const CART_BUTTON_DOM_ID = "customer-cart-button";

type Flight = {
  id: string;
  fromX: number;
  fromY: number;
  toX: number;
  toY: number;
  color: string;
};

type FlyToCartContextValue = {
  flyFromElement: (source: HTMLElement | null, color?: string) => void;
  badgePulseKey: number;
  cartButtonRef: RefObject<HTMLButtonElement | null>;
};

const FlyToCartContext = createContext<FlyToCartContextValue | null>(null);

export function useFlyToCart() {
  const ctx = useContext(FlyToCartContext);
  if (!ctx) {
    throw new Error("useFlyToCart must be used within FlyToCartProvider");
  }
  return ctx;
}

/** Safe optional hook — returns null outside provider */
export function useFlyToCartOptional() {
  return useContext(FlyToCartContext);
}

type ProviderProps = {
  children: ReactNode;
};

export function FlyToCartProvider({ children }: ProviderProps) {
  const reducedMotion = usePrefersReducedMotion();
  const cartButtonRef = useRef<HTMLButtonElement | null>(null);
  const [flights, setFlights] = useState<Flight[]>([]);
  const [badgePulseKey, setBadgePulseKey] = useState(0);

  const removeFlight = useCallback((id: string) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
    setBadgePulseKey((k) => k + 1);
  }, []);

  const flyFromElement = useCallback(
    (source: HTMLElement | null, color = "var(--color-accent)") => {
      if (reducedMotion) {
        setBadgePulseKey((k) => k + 1);
        return;
      }

      const origin = source?.getBoundingClientRect();
      const targetEl =
        cartButtonRef.current ??
        (document.getElementById(CART_BUTTON_DOM_ID) as HTMLElement | null);
      const target = targetEl?.getBoundingClientRect();

      if (!origin || !target) {
        setBadgePulseKey((k) => k + 1);
        return;
      }

      const id = `flight-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;

      setFlights((prev) => [
        ...prev,
        {
          id,
          fromX: origin.left + origin.width / 2,
          fromY: origin.top + origin.height / 2,
          toX: target.left + target.width / 2,
          toY: target.top + target.height / 2,
          color,
        },
      ]);
    },
    [reducedMotion]
  );

  const value = useMemo(
    () => ({
      flyFromElement,
      badgePulseKey,
      cartButtonRef,
    }),
    [flyFromElement, badgePulseKey]
  );

  return (
    <FlyToCartContext.Provider value={value}>
      {children}

      <div className="pointer-events-none fixed inset-0 z-[200] overflow-hidden">
        <AnimatePresence>
          {flights.map((flight) => (
            <FlightParticle
              key={flight.id}
              flight={flight}
              onComplete={() => removeFlight(flight.id)}
            />
          ))}
        </AnimatePresence>
      </div>
    </FlyToCartContext.Provider>
  );
}

function FlightParticle({
  flight,
  onComplete,
}: {
  flight: Flight;
  onComplete: () => void;
}) {
  const midY = Math.min(flight.fromY, flight.toY) - 56;

  return (
    <motion.span
      className="absolute block h-3.5 w-3.5 rounded-full shadow-lg"
      style={{
        background: flight.color,
        boxShadow: `0 0 14px ${flight.color}`,
        marginLeft: -7,
        marginTop: -7,
      }}
      initial={{
        left: flight.fromX,
        top: flight.fromY,
        scale: 1,
        opacity: 1,
      }}
      animate={{
        left: flight.toX,
        top: [flight.fromY, midY, flight.toY],
        scale: [1, 0.9, 0.3],
        opacity: [1, 1, 0.15],
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
        times: [0, 0.45, 1],
      }}
      onAnimationComplete={onComplete}
    />
  );
}
