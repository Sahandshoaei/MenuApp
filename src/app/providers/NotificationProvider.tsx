import { Toaster } from "sonner";
import type { ProviderProps } from "./types";

export function NotificationProvider({
    children,
}: ProviderProps) {
    return (
        <>
            {children}

            <Toaster
                richColors
                position="top-center"
                closeButton
            />
        </>
    );
}

// مسئولیت:
// راه‌اندازی سیستم Notification.


// الان:
// Sonner

// بعداً اگر خواستی:
// React Toastify
// فقط همین فایل تغییر می‌کند.

// چرا؟
// هیچ جای پروژه نباید Import شود:

// import { Toaster } from "sonner";
// فقط اینجا.

// کامپوننت‌ها فقط:

// toast.success(...)

// را صدا می‌زنند.