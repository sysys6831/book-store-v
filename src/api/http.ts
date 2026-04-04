// src/api/http.ts
import axios, { type AxiosRequestConfig } from "axios";
import { getToken, removeToken } from "../store/authStore";

const BASE_URL = "http://localhost:9999"; // 백엔드 포트에 맞게 확인해 주세요!
const DEFAULT_TIMEOUT = 30000;

export const createClient = (config?: AxiosRequestConfig) => {
  const axiosInstance = axios.create({
    baseURL: BASE_URL,
    timeout: DEFAULT_TIMEOUT,
    headers: {
      "content-type": "application/json",
      // 토큰이 있으면 헤더에 달고, 없으면 빈 문자열을 보냅니다.
      Authorization: getToken() ? getToken() : "",
    },
    withCredentials: true,
    ...config,
  });

  // 응답(Response) 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      // 로그인 만료(401) 에러가 발생한 경우 처리
      if (error.response.status === 401) {
        removeToken();
        window.location.href = "/login"; // 강제 로그인 페이지 이동
        return;
      }
      return Promise.reject(error);
    },
  );

  return axiosInstance;
};

export const httpClient = createClient();
