// State رو از مدل Domain جدا می‌کنیم.

import type { Customer } from "./customer";

export interface CustomerState {
  profiles: Record<string, Customer>;

  activeCustomerId: string | null;
}