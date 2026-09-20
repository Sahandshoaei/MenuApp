// MenuCategory is a free string so admin can create new categories.
export type MenuCategory = string;

export interface Category {
  id: string;
  title: string;
  /** Emoji (or short label) — always a string so it can be persisted & rendered safely */
  icon: string;
  glowColor?: string;
  gradient?: string;
}
