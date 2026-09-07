/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#f97316",
          foreground: "#ffffff",
        },
        background: "#0f172a",
        card: "#111827",
        muted: "#1e293b",
        border: "#334155",
      },
    },
  },
  plugins: [],
};