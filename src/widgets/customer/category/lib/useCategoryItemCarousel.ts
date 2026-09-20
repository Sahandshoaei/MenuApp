import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useMenu } from "@/entities/menu/hooks/useMenu";
import {
  defaultSlideMotion,
  measureSlideMotions,
  type SlideMotion,
} from "@/shared/animations/carouselMotion";

const CAROUSEL_GAP_PX = 12;

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
  const [slideMotions, setSlideMotions] = useState<Record<string, SlideMotion>>(
    {}
  );

  const scrollRef = useRef<HTMLDivElement>(null);
  const itemNodesRef = useRef<Map<string, HTMLDivElement>>(new Map());
  const ratiosRef = useRef<Map<string, number>>(new Map());
  const rafRef = useRef<number | null>(null);

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

  const updateMotions = useCallback(() => {
    const root = scrollRef.current;
    if (!root) return;

    setSlideMotions(
      measureSlideMotions(root, itemNodesRef.current, CAROUSEL_GAP_PX)
    );
  }, []);

  const scheduleMotions = useCallback(() => {
    if (rafRef.current != null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      rafRef.current = null;
      updateMotions();
    });
  }, [updateMotions]);

  // Reset active index when category changes
  useEffect(() => {
    setActiveIndex(initialIndex);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  // Jump carousel to deep-linked item instantly (for layoutId hero)
  useEffect(() => {
    const root = scrollRef.current;
    if (!root || items.length === 0) return;

    const targetId = items[initialIndex]?.id;
    if (!targetId) return;

    // Wait a frame so refs are mounted
    const id = window.requestAnimationFrame(() => {
      const node = itemNodesRef.current.get(targetId);
      if (!node) return;

      const rootRect = root.getBoundingClientRect();
      const nodeRect = node.getBoundingClientRect();
      const delta =
        nodeRect.left -
        rootRect.left -
        (rootRect.width - nodeRect.width) / 2;

      root.scrollTo({ left: root.scrollLeft + delta, behavior: "auto" });
      updateMotions();
    });

    return () => window.cancelAnimationFrame(id);
  }, [categoryId, items, initialIndex, updateMotions]);

  // Scroll → depth metrics (rAF throttled)
  useEffect(() => {
    const root = scrollRef.current;
    if (!root) return;

    updateMotions();

    const onScroll = () => scheduleMotions();
    root.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", scheduleMotions);

    return () => {
      root.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", scheduleMotions);
      if (rafRef.current != null) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [items, scheduleMotions, updateMotions]);

  // IntersectionObserver keeps activeIndex locked to what's actually visible
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

  // Sync URL with active slide (replace — no history spam)
  useEffect(() => {
    const current = items[activeIndex];
    if (current && current.id !== itemId) {
      navigate(`/category/${categoryId}/${current.id}`, { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeIndex, items]);

  const getSlideMotion = useCallback(
    (id: string): SlideMotion => {
      if (slideMotions[id]) return slideMotions[id];

      // Before first measure: estimate from activeIndex so side slides
      // don't all flash at full focus on mount.
      const index = items.findIndex((item) => item.id === id);
      if (index === -1) return defaultSlideMotion;

      const offset = index - activeIndex;
      const focus = Math.max(0, 1 - Math.abs(offset));
      return { offset, focus };
    },
    [slideMotions, items, activeIndex]
  );

  return {
    category,
    items,
    activeItem: items[activeIndex],
    activeIndex,
    scrollRef,
    registerItemRef,
    getSlideMotion,
    slideMotions,
  };
};
