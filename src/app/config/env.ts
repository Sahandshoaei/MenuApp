/// <reference types="vite/client" />

const get = (key: string, fallback?: string) => {
  const value = import.meta.env[key];

  if (value) return value;
  if (fallback !== undefined) return fallback;

  throw new Error(`Missing environment variable: ${key}`);
};

export const env = {
  apiUrl: get("VITE_API_URL", "http://localhost:3000"),
  socketUrl: get("VITE_SOCKET_URL", "ws://localhost:3000"),
  appName: get("VITE_APP_NAME", "Restaurant"),
  isDev: import.meta.env.DEV,
  isProd: import.meta.env.PROD,
};