import React, { useEffect, useRef } from "react";
import MenuHeader from "../../widgets/customer/home/MenuHeader";
import CategoryGrid from "../../widgets/customer/home/CategoryGrid";
import TodayOffer from "../../widgets/customer/home/TodayOffer";

export const HomePage: React.FC = () => {
  const headerRef = useRef<HTMLDivElement>(null);

  // ارتفاع واقعی بخش تیتر+سرچ‌باکسِ چسبیده رو به‌صورت یه CSS variable منتشر
  // می‌کنیم تا CategoryGrid بدونه کارت‌ها دقیقاً از کجا باید شروع به چرخیدن/محو
  // شدن کنن (همون‌جایی که زیر این هدر می‌رن).
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

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(node);

    return () => resizeObserver.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[var(--color-bg)] pb-28">
      {/* بخش چسبیده به بالا: تیتر + سرچ‌باکس */}
      <div
        ref={headerRef}
        className="sticky top-0 z-20 bg-[var(--color-bg)] px-5 pt-6 pb-3"
      >
        <MenuHeader />
      </div>

      <div className="space-y-8 px-5">
        <CategoryGrid />
        <TodayOffer />
      </div>
    </div>
  );
};

export default HomePage;
