// import { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { useMenu } from "../../../entities/menu/hooks/useMenu";
// import CategoryCard from "../../../features/customer/category/CategoryCard";
// import { motion } from "framer-motion";
// import {menuContainerVariants,menuItemVariants} from "../../../shared/animations/menuVariants";

// // فاصله‌ای (به پیکسل) که چرخش/محو شدن توش اتفاق می‌افته: از وقتی لبه‌ی بالای
// // کارت به این فاصله از لبه‌ی زیرین هدر چسبیده می‌رسه، شروع به چرخیدن می‌کنه،
// // و دقیقاً وقتی به لبه‌ی هدر می‌رسه (زیرش می‌ره) کاملاً چرخیده و محو شده.
// const ANIMATION_RANGE = 90;

// const CategoryGrid = () => {
//   const navigate = useNavigate();
//   const gridRef = useRef<HTMLDivElement>(null);
//   const cardRefs = useRef<Record<string, HTMLDivElement | null>>({});

//   const {
//     categories,
//     getMenuItemsByCategory,
//   } = useMenu();

//   useEffect(() => {
//     let ticking = false;

//     const updateCards = () => {
//       // ارتفاع هدر چسبیده رو از یه CSS variable می‌خونیم که HomePage ست می‌کنه
//       const headerHeight = parseFloat(
//         getComputedStyle(document.documentElement).getPropertyValue(
//           "--sticky-header-height"
//         ) || "0"
//       );

//       Object.values(cardRefs.current).forEach((node) => {
//         if (!node) return;

//         const top = node.getBoundingClientRect().top;
//         const distance = top - headerHeight;

//         // progress: ۰ = کاملاً پایین‌تر از بازه (حالت عادی) | ۱ = دقیقاً زیر هدر
//         const progress = Math.min(
//           1,
//           Math.max(0, 1 - distance / ANIMATION_RANGE)
//         );

//         const rotateX = progress * -90;
//         const opacity = 1 - progress;

//         node.style.transform = `perspective(600px) rotateX(${rotateX}deg)`;
//         node.style.opacity = String(opacity);
//       });

//       ticking = false;
//     };

//     const onScroll = () => {
//       if (!ticking) {
//         window.requestAnimationFrame(updateCards);
//         ticking = true;
//       }
//     };

//     // این پروژه کل صفحه رو با window اسکرول نمی‌کنه — یه ancestor داخلی
//     // (مثلاً <main className="overflow-y-auto">) واقعی‌ای هست که اسکرول
//     // می‌شه. باید همون رو پیدا کنیم و به scroll خودش گوش بدیم، نه window؛
//     // وگرنه این ایونت هیچ‌وقت فایر نمی‌شه.
//     const getScrollParent = (
//       element: HTMLElement | null
//     ): EventTarget => {
//       let node = element?.parentElement ?? null;

//       while (node) {
//         const { overflowY } = getComputedStyle(node);

//         if (overflowY === "auto" || overflowY === "scroll") {
//           return node;
//         }

//         node = node.parentElement;
//       }

//       return window;
//     };

//     const scrollParent = getScrollParent(gridRef.current);

//     updateCards();
//     scrollParent.addEventListener("scroll", onScroll, {
//       passive: true,
//     });
//     window.addEventListener("resize", onScroll);

//     return () => {
//       scrollParent.removeEventListener("scroll", onScroll);
//       window.removeEventListener("resize", onScroll);
//     };
//   }, [categories.length]);

//   return (
//     <div ref={gridRef} className="grid grid-cols-2 gap-4 mt-5">
//       {categories.map((category) => {
//         const itemCount =
//           getMenuItemsByCategory(category.id).length;

//         return (
//           <div
//             key={category.id}
//             ref={(node) => {
//               cardRefs.current[category.id] = node;
//             }}
//             style={{
//               transformOrigin: "top center",
//               willChange: "transform, opacity",
//             }}
//           >
//             <CategoryCard
//               id={category.id}
//               title={category.title}
//               icon={category.icon}
//               itemCount={itemCount}
//               glowColor={category.glowColor}
//               gradient={category.gradient}
//               onClick={() =>
//                 navigate(`/category/${category.id}`)
//               }
//             />
//           </div>
//         );
//       })}
//     </div>
//   );
// };

// export default CategoryGrid;

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { useMenu } from "../../../entities/menu/hooks/useMenu";
import CategoryCard from "../../../features/customer/category/CategoryCard";

import {
  menuContainerVariants,
} from "../../../shared/animations/menuVariants";

const ANIMATION_RANGE = 90;

const CategoryGrid = () => {
  const navigate = useNavigate();

  const gridRef = useRef<HTMLDivElement>(null);

  const cardRefs = useRef<
    Record<string, HTMLDivElement | null>
  >({});

  const {
    categories,
    getMenuItemsByCategory,
  } = useMenu();

  useEffect(() => {
    let ticking = false;

    const updateCards = () => {
      const headerHeight = parseFloat(
        getComputedStyle(document.documentElement)
          .getPropertyValue(
            "--sticky-header-height"
          ) || "0"
      );

      Object.values(cardRefs.current).forEach(
        (node) => {
          if (!node) return;

          const top =
            node.getBoundingClientRect().top;

          const distance =
            top - headerHeight;

          const progress = Math.min(
            1,
            Math.max(
              0,
              1 -
                distance /
                  ANIMATION_RANGE
            )
          );

          const rotateX =
            progress * -90;

          const opacity =
            1 - progress;

          node.style.transform =
            `perspective(600px) rotateX(${rotateX}deg)`;

          node.style.opacity =
            String(opacity);
        }
      );

      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(
          updateCards
        );

        ticking = true;
      }
    };

    const getScrollParent = (
      element: HTMLElement | null
    ): EventTarget => {
      let node =
        element?.parentElement ?? null;

      while (node) {
        const { overflowY } =
          getComputedStyle(node);

        if (
          overflowY === "auto" ||
          overflowY === "scroll"
        ) {
          return node;
        }

        node = node.parentElement;
      }

      return window;
    };

    const scrollParent =
      getScrollParent(
        gridRef.current
      );

    updateCards();

    scrollParent.addEventListener(
      "scroll",
      onScroll,
      {
        passive: true,
      }
    );

    window.addEventListener(
      "resize",
      onScroll
    );

    return () => {
      scrollParent.removeEventListener(
        "scroll",
        onScroll
      );

      window.removeEventListener(
        "resize",
        onScroll
      );
    };
  }, [categories.length]);

  return (
    <motion.div
      ref={gridRef}
      variants={menuContainerVariants}
      initial="hidden"
      animate="visible"
      className="
        grid
        grid-cols-2
        gap-4
        mt-5
      "
    >
      {categories.map((category) => {
        const itemCount =
          getMenuItemsByCategory(
            category.id
          ).length;

        return (
          <div
            key={category.id}
            ref={(node) => {
              cardRefs.current[
                category.id
              ] = node;
            }}
            style={{
              transformOrigin:
                "top center",

              willChange:
                "transform, opacity",
            }}
          >
            <CategoryCard
              id={category.id}
              title={category.title}
              icon={category.icon}
              itemCount={itemCount}
              glowColor={
                category.glowColor
              }
              gradient={
                category.gradient
              }
              onClick={() =>
                navigate(
                  `/category/${category.id}`
                )
              }
            />
          </div>
        );
      })}
    </motion.div>
  );
};

export default CategoryGrid;

//  جریان داده این شکلی است:

//                 Entity Menu
//                     │
//                     │ useMenu()
//                     ▼
//              CategoryGrid
//                     │
//                     │ props
//                     ▼
//               CategoryCard
