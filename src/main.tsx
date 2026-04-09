// src/main.tsx
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router"; // react-router-dom 금지 규칙 준수

// ✨ React Query 매니저 도구들을 불러옵니다.
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 1. 쿼리 매니저 인스턴스를 하나 생성합니다.
const queryClient = new QueryClient();

async function enableMocking() {
  if (!import.meta.env.DEV) {
    return;
  }
  const { worker } = await import("./mock/browser");
  return worker.start();
}

enableMocking().then(() => {
  ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
      {/* 2. QueryClientProvider를 앱의 가장 바깥쪽에 단단히 둘러줍니다! */}
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </React.StrictMode>,
  );
});
