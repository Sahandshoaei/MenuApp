import type { ProviderProps } from "./types";
import { StoreProvider } from "./StoreProvider";
import { ThemeProvider } from "./ThemeProvider";
import { AuthProvider } from "./AuthProvider";
import { RealTimeProvider } from "./RealTimeProvider";
import { NotificationProvider } from "./NotificationProvider";

export function AppProvider({
    children,
}: ProviderProps) {
    return (
        <StoreProvider>
            <ThemeProvider>
                <AuthProvider>
                    <RealTimeProvider>
                        <NotificationProvider>
                            {children}
                        </NotificationProvider>
                    </RealTimeProvider>
                </AuthProvider>
            </ThemeProvider>
        </StoreProvider>
    );
}


// نقطه ورود تمام Providerهای برنامه.

// این فایل هیچ Logicی ندارد و فقط Providerها را کنار هم قرار می‌دهد.

// فقط Compose می‌کند.