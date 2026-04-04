// src/api/auth.api.ts
import { type SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};

export const login = async (data: SignupProps) => {
  const response = await httpClient.post("/users/login", data);
  return response.data; // 서버에서 { token: "..." } 형태로 내려준다고 가정합니다.
};

export const resetPassword = async (data: { email: string }) => {
  const response = await httpClient.post("/users/reset", data);
  return response.data;
};
