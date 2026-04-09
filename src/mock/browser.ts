// src/mock/browser.ts
import { setupWorker } from "msw/browser";
import { reviewsById } from "./review";
import { booksHandler } from "./books"; // ✨ 방금 만든 도서 목록 핸들러를 불러옵니다.

// ✨ 핸들러 배열에 booksHandler를 함께 넣어줍니다.
const handlers = [reviewsById, booksHandler];

export const worker = setupWorker(...handlers);
