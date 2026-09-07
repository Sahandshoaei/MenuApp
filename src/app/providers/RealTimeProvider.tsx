import type { ProviderProps } from "./types";
import { FakeRealtimeProvider } from "./FakeRealtimeProvider";

export function RealTimeProvider({ children }: ProviderProps) {
  return (
    <>
      <FakeRealtimeProvider />
      {children}
    </>
  );
}

export default RealTimeProvider;

// مسئولیت
// فقط یک Interface برای اتصال Real-time فراهم می‌کند.

// الان:
// FakeRealtime

// بعداً:
// WebSocket
// Socket.io