// src/hooks/useOrders.ts
import { useState, useEffect } from "react";
import {
  type OrderListItem,
  type OrderDetailItem,
} from "../models/order.model";

// 서버 통신을 대체할 임시 가짜 데이터입니다.
const mockOrders: OrderListItem[] = [
  {
    id: 20,
    createdAt: "2024.01.01",
    address: "서울시 북구",
    receiver: "BOB",
    contact: "010-1111-1111",
    bookTitle: "바람의 노래",
    totalQuantity: 1,
    totalPrice: 18000,
  },
  {
    id: 23,
    createdAt: "2024.01.09",
    address: "서울시 광진구",
    receiver: "12312",
    contact: "1312312321",
    bookTitle: "별을 여행하는 아이",
    totalQuantity: 2,
    totalPrice: 33000,
  },
  {
    id: 24,
    createdAt: "2024.01.13",
    address: "서울 광진구 광나루로",
    receiver: "홍길동",
    contact: "010-0000-1111",
    bookTitle: "별을 여행하는 아이",
    totalQuantity: 2,
    totalPrice: 27000,
  },
];

const mockOrderDetail: OrderDetailItem[] = [
  {
    bookId: 1,
    title: "별을 여행하는 아이",
    author: "이별리",
    price: 15000,
    quantity: 1,
  },
  {
    bookId: 2,
    title: "바람의 노래",
    author: "바람이",
    price: 18000,
    quantity: 1,
  },
];

export const useOrders = () => {
  const [orders, setOrders] = useState<OrderListItem[]>([]);
  // 현재 열려있는 주문 상세 내역의 ID를 추적합니다.
  const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

  useEffect(() => {
    // 초기 로딩 시 주문 목록을 불러옵니다.
    setOrders(mockOrders);
  }, []);

  const selectOrderItem = (orderId: number) => {
    // 1. 이미 열려있는 항목을 다시 클릭하면 닫아줍니다.
    if (selectedItemId === orderId) {
      setSelectedItemId(null);
      return;
    }

    // 2. 이미 상세 데이터(detail)를 불러온 적이 있다면, 새로 요청하지 않고 바로 엽니다.
    const targetOrder = orders.find((item) => item.id === orderId);
    if (targetOrder?.detail) {
      setSelectedItemId(orderId);
      return;
    }

    // 3. 상세 데이터가 없다면 서버에 요청합니다. (임시로 setTimeout 사용)
    setTimeout(() => {
      setOrders(
        orders.map((item) =>
          item.id === orderId ? { ...item, detail: mockOrderDetail } : item,
        ),
      );
      setSelectedItemId(orderId);
    }, 200); // 0.2초 뒤에 데이터가 들어온 것처럼 처리
  };

  return { orders, selectedItemId, selectOrderItem };
};
