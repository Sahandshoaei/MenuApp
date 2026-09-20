/** DOM id of the customer app's real scroll container (<main>). */
export const CUSTOMER_SCROLL_ROOT = "customer-scroll-root";

export function getCustomerScrollRoot(): HTMLElement | null {
  if (typeof document === "undefined") return null;
  return (
    document.getElementById(CUSTOMER_SCROLL_ROOT) ??
    document.querySelector<HTMLElement>("[data-app-scroll='customer']")
  );
}
