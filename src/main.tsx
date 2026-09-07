import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./app/router/Index";
import { AppProvider } from "./app/providers/AppProvider";
import "./index.css"


const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("عنصر ریشه (root element) در فایل index.html یافت نشد.");
}

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  </React.StrictMode>
);

          //           ┌──────────────┐
          //           │    Page      │
          //           └──────┬───────┘
          //                  │
          //           ┌──────▼───────┐
          //           │    Widget    │
          //           └──────┬───────┘
          //                  │
          //           ┌──────▼───────┐
          //           │   Feature    │
          //           └──────┬───────┘
          //                  │
          //                Hook
          //                  │
          //     ┌────────────┴────────────┐
          //     │                         │
          // Selector                  Dispatch
          //     │                         │
          //     ▼                         ▼
          //  Read State                 Slice
          //                               │
          //                               ▼
          //                          Change State


//           | بخش          | وظیفه                              |
// | ------------ | ---------------------------------- |
// | **Slice**    | تغییر و مدیریت State               |
// | **Selector** | خواندن/استخراج State               |
// | **Hook**     | API ساده برای استفاده UI از Entity |
// | **Service**  | ارتباط با Backend/API              |
// | **Type**     | تعریف شکل داده                     |
// | **Entity**   | مالک داده و منطق دامنه             |
// | **Feature**  | قابلیت قابل تعامل کاربر            |
// | **Widget**   | ترکیب چند بخش UI                   |
// | **Page**     | صفحه کامل                          |
