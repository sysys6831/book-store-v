// src/api/http.ts
import axios from "axios";

export const httpClient = axios.create({
  baseURL: "http://localhost:3000", // 백엔드 서버 주소 (환경에 맞게 수정)
  timeout: 30000,
  headers: {
    "content-type": "application/json",
  },
});
