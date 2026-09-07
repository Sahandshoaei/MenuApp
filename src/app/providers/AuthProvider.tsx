import type { ProviderProps } from "./types";

export function AuthProvider({ children }: ProviderProps) {
    return <>{children}</>;
}

// مسئولیت

// مدیریت وضعیت Authentication.

// الان Backend نداری.

// پس فعلاً فقط Wrapper است.


// بعداً اینجا:

// Check Token
// Refresh Token
// Current User
// Permissions
// Logout
// Auto Login
// قرار می‌گیرد.


// چرا از الان می‌سازیم؟
// چون وقتی Login اضافه شود، فقط این فایل تغییر می‌کند.
// بقیه پروژه ثابت می‌ماند.