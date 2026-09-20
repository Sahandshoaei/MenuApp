import { House, Heart, Package, User } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAppSelector } from "../../../../app/store/hooks";
import { selectCurrentCustomer } from "../../../../entities/customer/state/customerSelector";
import { layoutId } from "@/shared/animations/layoutIds";
import { spring } from "@/shared/animations/motion";
import { usePrefersReducedMotion } from "@/shared/animations/usePrefersReducedMotion";

type CustomerBottomNavigationProps = {
  onRegisterClick: () => void;
};

const navItems = [
  {  icon: House, path: "/", protected: false },
  {  icon: Heart, path: "/favorites", protected: true },
  {  icon: Package, path: "/orders", protected: true },
  {  icon: User, path: "/profile", protected: true },
] as const;

const CustomerBottomNavigation = ({
  onRegisterClick,
}: CustomerBottomNavigationProps) => {
  const customer = useAppSelector(selectCurrentCustomer);
  const location = useLocation();
  const reducedMotion = usePrefersReducedMotion();

  const handleNavigation = (
    e: React.MouseEvent,
    protectedRoute: boolean
  ) => {
    if (!protectedRoute) return;
    if (customer) return;
    e.preventDefault();
    onRegisterClick();
  };

  const isItemActive = (path: string) => {
    if (path === "/") {
      return (
        location.pathname === "/" ||
        location.pathname.startsWith("/category")
      );
    }
    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  return (
    <nav
      className="
        fixed bottom-5 left-1/2 z-50 w-[80%] max-w-md
        -translate-x-1/2 rounded-full
        border border-[var(--color-border-strong)]
        bg-[var(--color-surface)]/50 px-4 py-3
        shadow-[0_8px_32px_rgba(34,28,94,0.15)]
        backdrop-blur-xl backdrop-saturate-150
      "
    >
      <div className="mx-auto flex max-w-md items-center justify-between">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isItemActive(item.path);

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={(e) => handleNavigation(e, item.protected)}
              className="relative flex flex-col items-center gap-1 rounded-full px-3 py-2"
              style={{
                color: active
                  ? "var(--color-text-primary)"
                  : "var(--color-accent-soft)",
              }}
            >
              {active && (
                <motion.span
                  layoutId={reducedMotion ? undefined : layoutId.navPill}
                  className="absolute inset-0 rounded-full bg-[var(--color-accent-tint-strong)] shadow-[inset_0_1px_2px_rgba(255,255,255,0.6),0_2px_6px_rgba(34,28,94,0.12)]"
                  transition={
                    reducedMotion ? { duration: 0 } : spring.layout
                  }
                />
              )}

              <span className="relative z-10 flex flex-col items-center gap-1">
                <Icon size={25} />
                
              </span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};

export default CustomerBottomNavigation;
