// src/api/auth.api.ts
import { type SignupProps } from "../pages/Signup";
import { httpClient } from "./http";

export const signup = async (userData: SignupProps) => {
  // POST 메서드로 /users/join 엔드포인트에 회원가입 데이터를 전송합니다.
  const response = await httpClient.post("/users/join", userData);
  return response.data;
};
