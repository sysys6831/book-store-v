import axios from "axios";

const BASE_URL = "http://localhost:9999"; // 실제 API 주소

export const httpClient = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});
