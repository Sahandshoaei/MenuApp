/**
 * Format amounts as Iranian Toman with Persian digits & separators.
 * Prices in the app are stored as integer toman (no decimals).
 */
export function formatToman(amount: number): string {
  const value = Math.round(Number(amount) || 0);

  try {
    return (
      new Intl.NumberFormat("fa-IR", {
        maximumFractionDigits: 0,
      }).format(value) + " تومان"
    );
  } catch {
    return `${value.toLocaleString("en-US")} تومان`;
  }
}

/** Compact form without the currency word (e.g. charts / tight UI) */
export function formatTomanNumber(amount: number): string {
  const value = Math.round(Number(amount) || 0);
  try {
    return new Intl.NumberFormat("fa-IR", {
      maximumFractionDigits: 0,
    }).format(value);
  } catch {
    return value.toLocaleString("en-US");
  }
}
