/**
 * Central layoutId names so shared-element transitions
 * stay in sync across Home ↔ Category ↔ Item ↔ chrome.
 */
export const layoutId = {
  categoryHero: (id: string) => `category-hero-${id}`,
  categoryTitle: (id: string) => `category-title-${id}`,
  itemHero: (id: string) => `item-hero-${id}`,
  navPill: "customer-nav-pill",
  cartBadge: "cart-badge",
  infoTabPill: "item-info-tab-pill",
  flyParticle: (id: string) => `fly-particle-${id}`,
} as const;
