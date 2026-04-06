// src/api/order.api.ts
import { type OrderSheet } from "../models/order.model";
// import { httpClient } from "./http";

export const order = async (orderData: OrderSheet) => {
  // 실제 개발 시 주석을 풀고 백엔드와 통신합니다.
  // const response = await httpClient.post("/orders", orderData);
  // return response.data;

  console.log("서버로 전송된 주문 데이터:", orderData);
  // 1초 뒤에 성공 응답을 주는 임시 코드입니다.
  return new Promise((resolve) => setTimeout(resolve, 1000));
};
