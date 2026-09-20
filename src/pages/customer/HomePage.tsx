import React, { useEffect, useRef } from "react";
import MenuHeader from "../../widgets/customer/home/MenuHeader";
import CategoryGrid from "../../widgets/customer/home/CategoryGrid";
import TodayOffer from "../../widgets/customer/home/TodayOffer";

export const HomePage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = headerRef.current;
    if (!node) return;

    const updateHeight = () => {
      document.documentElement.style.setProperty(
        "--sticky-header-height",
        `${node.offsetHeight}px`
      );
    };

    updateHeight();
    const ro = new ResizeObserver(updateHeight);
    ro.observe(node);
    return () => ro.disconnect();
  }, []);

  return (
    <div className="bg-[var(--color-bg)] pb-8">
      {/*
        Sticky fold target for CategoryGrid.
        top-0 is relative to #customer-scroll-root (the real scroller).
      */}
      <div
        ref={headerRef}
        data-home-sticky-header
        className="sticky top-0 z-20 border-b border-[var(--color-border)] bg-[var(--color-bg)]/95 px-5 pb-3 pt-5 backdrop-blur-md"
      >
        <MenuHeader />
      </div>

      <div className="space-y-8 px-5 pt-2 pb-40">
        <CategoryGrid />
        <TodayOffer />
        {/* Extra room so scroll-fold is always reachable on tall screens */}
        <div className="h-40" aria-hidden />
      </div>
    </div>
  );
};

export default HomePage;
