import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../../entities/menu/hooks/useMenu";
import CategoryCard from "../../../features/customer/category/CategoryCard";
import { menuContainerVariants } from "../../../shared/animations/menuVariants";
import { getCustomerScrollRoot } from "../layout/lib/scrollRoot";

/**
 * Home category grid
 * 1) Scroll-linked fold (rotateX) as cards pass under the sticky Menu header
 * 2) Click flip (rotateY ~180°) then navigate into the category
 */

/** How many px under the sticky header until the fold is fully closed */
const FOLD_RANGE = 140;
const MAX_ROTATE_X = -88;
/**
 * Cards only start folding once their top edge crosses this far
 * *above* the sticky header bottom (i.e. they are tucking under it).
 * Using a pure "distance below header" formula folded the first row
 * on load, because those cards sit only ~10–30px under the header.
 */
const FOLD_START_OFFSET = 0;

const CategoryGrid = () => {
  const navigate = useNavigate();
  const gridRef = useRef<HTMLDivElement>(null);
  const cardShellRefs = useRef<Record<string, HTMLDivElement | null>>({});
  /** ref so scroll handler never overwrites an in-progress flip */
  const flippingIdRef = useRef<string | null>(null);
  const [flippingId, setFlippingId] = useState<string | null>(null);
  const { categories, getMenuItemsByCategory } = useMenu();

  /* ------------------------------------------------------------ */
  /* Scroll-linked fold — attaches once to #customer-scroll-root  */
  /* ------------------------------------------------------------ */
  useEffect(() => {
    let ticking = false;
    let root: HTMLElement | null = null;
    let disposed = false;
    let retryId = 0;

    const update = () => {
      if (disposed) return;

      const sticky = document.querySelector<HTMLElement>(
        "[data-home-sticky-header]"
      );
      const foldLine = sticky
        ? sticky.getBoundingClientRect().bottom
        : 140;

      Object.entries(cardShellRefs.current).forEach(([id, el]) => {
        if (!el) return;
        if (flippingIdRef.current === id) return;

        const top = el.getBoundingClientRect().top;
        // Positive = card is still fully below the sticky header (open).
        // Negative = card top has gone under the header (fold).
        const distance = top - foldLine;

        // Only fold while tucking under the header — never on first paint
        // when the first row simply sits under the menu block.
        const raw = (FOLD_START_OFFSET - distance) / FOLD_RANGE;
        const p = Math.min(1, Math.max(0, raw));

        if (p <= 0.001) {
          // Resting / fully visible — force a clean open pose
          el.style.transform = "none";
          el.style.opacity = "1";
          el.style.filter = "none";
          return;
        }

        const rotateX = p * MAX_ROTATE_X;
        const scale = 1 - p * 0.1;
        const opacity = 1 - p * 0.85;
        const y = p * -8;

        el.style.transform = `perspective(1000px) translateY(${y}px) rotateX(${rotateX}deg) scale(${scale})`;
        el.style.opacity = String(opacity);
        el.style.filter = p > 0.2 ? `blur(${p * 5}px)` : "none";
      });

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(update);
    };

    const attachTo = (el: HTMLElement) => {
      root = el;
      root.addEventListener("scroll", onScroll, { passive: true });
      update();
    };

    const tryAttach = () => {
      const el = getCustomerScrollRoot();
      if (el) {
        attachTo(el);
        return;
      }
      // Root not mounted yet (first paint / strict mode) — retry a few times
      retryId = window.setTimeout(tryAttach, 50);
    };

    tryAttach();
    window.addEventListener("resize", onScroll);

    return () => {
      disposed = true;
      window.clearTimeout(retryId);
      root?.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [categories.length]);

  /* ------------------------------------------------------------ */
  /* Click → flip → navigate                                      */
  /* ------------------------------------------------------------ */
  const handleClick = (categoryId: string) => {
    if (flippingIdRef.current) return;

    const el = cardShellRefs.current[categoryId];
    if (!el) {
      navigate(`/category/${categoryId}`);
      return;
    }

    flippingIdRef.current = categoryId;
    setFlippingId(categoryId);

    // Clean start pose (kill any scroll-fold styles)
    el.style.transition = "none";
    el.style.filter = "none";
    el.style.opacity = "1";
    el.style.transformOrigin = "center center";
    el.style.transform = "perspective(1200px) rotateY(0deg) scale(1)";
    void el.offsetWidth; // reflow

    el.style.transition =
      "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.45s ease";
    el.style.transform = "perspective(1200px) rotateY(180deg) scale(0.88)";
    el.style.opacity = "0.2";

    window.setTimeout(() => {
      navigate(`/category/${categoryId}`);
      // Reset after leave so back-navigation is clean
      window.setTimeout(() => {
        flippingIdRef.current = null;
        setFlippingId(null);
      }, 50);
    }, 520);
  };

  return (
    <motion.div
      ref={gridRef}
      variants={menuContainerVariants}
      initial="hidden"
      animate="visible"
      className="mt-5 grid grid-cols-2 gap-4"
      style={{ perspective: 1200, perspectiveOrigin: "50% 30%" }}
    >
      {categories.map((category) => {
        const itemCount = getMenuItemsByCategory(category.id).length;

        return (
          <div
            key={category.id}
            ref={(node) => {
              cardShellRefs.current[category.id] = node;
            }}
            data-category-shell={category.id}
            className="will-change-transform"
            style={{
              transformOrigin:
                flippingId === category.id ? "center center" : "top center",
              transformStyle: "preserve-3d",
            }}
          >
            <CategoryCard
              id={category.id}
              title={category.title}
              icon={category.icon}
              itemCount={itemCount}
              glowColor={category.glowColor}
              gradient={category.gradient}
              isFlipping={flippingId === category.id}
              onClick={() => handleClick(category.id)}
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default CategoryGrid;
