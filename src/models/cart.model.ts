// src/models/cart.model.ts
export interface Cart {
  id: number;
  book_id: number;
  title: string;
  summary: string;
  price: number;
  quantity: number;
}
