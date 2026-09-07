import type { ProviderProps } from "./types";

export function ThemeProvider({ children }: ProviderProps) {
    return <>{children}</>;
}

// مسئولیت

// مدیریت Theme کل برنامه.

// الان فقط Wrapper است.

// بعداً می‌تواند:

// Dark Mode
// Light Mode
// RTL
// Font Size
// Color Scheme

// را مدیریت کند.

// چرا الان خالی است؟

// چون نمی‌خواهیم وقتی Dark Mode اضافه شد مجبور شویم ساختار پروژه را تغییر دهیم.

// از الان جای آن مشخص است.