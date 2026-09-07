import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenu } from "@/entities/menu/hooks/useMenu";

export const useCategoryItemCarousel = () => {
  const navigate = useNavigate();
  const { categoryId, itemId } = useParams();
  const { menu, getCategory } = useMenu();

  const items = useMemo(
    () => menu.filter((item) => item.category === categoryId),
    [menu, categoryId]
  );

  const category = categoryId ? getCategory(categoryId) : undefined;

  const initialIndex = useMemo(() => {
    if (!itemId) return 0;
    const index = items.findIndex((item) => item.id === itemId);
    return index === -1 ? 0 : index;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const scrollRef = useRef<HTMLDivElement>(null);

  // رفرنس هر آیتم (برای IntersectionObserver) + آخرین درصد دیده‌شدنش
  const itemNodesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const ratiosRef = useRef<Map<string, number>>(new Map());

  const registerItemRef = useCallback(
    (id: string, node: HTMLDivElement | null) => {
      if (node) {
        itemNodesRef.current.set(id, node);
      } else {
        itemNodesRef.current.delete(id);
        ratiosRef.current.delete(id);
      }
    },
    []
  );

  // وقتی دسته‌بندی عوض بشه (رفتن به یه صفحه‌ی دسته‌بندی دیگه)، index ریست بشه
  useEffect(() => {
    setActiveIndex(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // به‌جای محاسبه‌ی دستی از روی scrollLeft (که چون کانتینر snap-mandatory
  // داره و مرورگر خودش با انیمیشن به موقعیت نهایی می‌رسه، باعث می‌شد index
  // زودتر از رسیدن واقعی عکس عوض بشه)، از IntersectionObserver استفاده
  // می‌کنیم: می‌پرسیم کدوم آیتم *واقعاً* بیشترین درصد دیده‌شدن رو داره،
  // که همیشه با چیزی که کاربر می‌بینه هماهنگه.
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || items.length === 0) return;

    ratiosRef.current.clear();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = entry.target.getAttribute("data-item-id");
          if (id) ratiosRef.current.set(id, entry.intersectionRatio);
        });

        let bestId: string | null = null;
        let bestRatio = 0;

        ratiosRef.current.forEach((ratio, id) => {
          if (ratio > bestRatio) {
            bestRatio = ratio;
            bestId = id;
          }
        });

        if (bestId) {
          const index = items.findIndex((item) => item.id === bestId);
          if (index !== -1) {
            setActiveIndex((prev) => (prev === index ? prev : index));
          }
        }
      },
      {
        root,
        threshold: [0, 0.25, 0.5, 0.75, 0.9, 1],
      }
    );

    itemNodesRef.current.forEach((node) => observer.observe(node));

    return () => observer.disconnect();
  }, [items]);

  // وقتی کاربر با اسکرول/سوایپ آیتم فعال رو عوض کرد، URL هم sync بشه
  // (بدون اضافه کردن رکورد جدید به تاریخچه‌ی مرورگر)
  useEffect(() => {
    const current = items[activeIndex];
    if (current && current.id !== itemId) {
      navigate(`/category/${categoryId}/${current.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, items]);

  return {
    category,
    items,
    activeItem: items[activeIndex],
    activeIndex,
    scrollRef,
    registerItemRef,
  };
};
