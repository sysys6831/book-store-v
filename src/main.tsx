import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
// 1. react-router에서 BrowserRouter를 불러옵니다.
import { BrowserRouter } from "react-router";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    {/* 2. App 컴포넌트 전체를 BrowserRouter로 감싸줍니다. */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);
