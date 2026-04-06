// src/models/order.model.ts

export interface Delivery {
  address: string;
  receiver: string;
  contact: string;
}

export interface OrderSheet {
  items: number[];
  totalPrice: number;
  totalQuantity: number;
  firstBookTitle: string;
  delivery: Delivery;
}

// 폼(Form)에서 입력받을 필드들의 타입입니다.
export interface DeliveryForm {
  address: string;
  addressDetail: string;
  receiver: string;
  contact: string;
}

// 1. 주문 내역의 기본 정보 모델입니다.
export interface Order {
  id: number;
  createdAt: string; // 주문일자
  address: string;
  receiver: string;
  contact: string;
  bookTitle: string; // 대표 상품명
  totalQuantity: number;
  totalPrice: number;
}

// 2. '자세히' 버튼을 눌렀을 때 나오는 상세 도서 정보 모델입니다.
export interface OrderDetailItem {
  bookId: number;
  title: string;
  author: string;
  price: number;
  quantity: number;
}

// 3. 기본 주문 정보에 상세 정보(detail)를 선택적으로 가질 수 있도록 확장합니다.
export interface OrderListItem extends Order {
  detail?: OrderDetailItem[];
}
