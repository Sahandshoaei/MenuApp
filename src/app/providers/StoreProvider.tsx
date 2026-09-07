import { Provider } from "react-redux";
import { store } from "@/app/store";
import type { ProviderProps } from "./types";

export function StoreProvider({ children }: ProviderProps) {
    return (
        <Provider store={store}>
            {children}
        </Provider>
    );
}

// مسئولیت

// راه‌اندازی Redux.

// چرا جداست؟

// فرض کن یک روز بخواهی Redux را حذف کنی.

// فقط همین فایل تغییر می‌کند.

// یا اگر Zustand استفاده کنی.

// یا MobX.

// کامپوننت‌های پروژه هیچ تغییری نمی‌کنند.