// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // 👇 여기서부터 resolve 옵션을 추가하여 Vite에게 @의 위치를 알려줍니다.
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
