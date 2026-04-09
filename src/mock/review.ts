// src/mock/review.ts
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker"; // 한국어 이름이 나오도록 fakerKO를 사용하면 더 좋습니다.
import { type BookReviewItem } from "@/models/book.model";

// 1. faker를 이용해 8개의 그럴듯한 가짜 리뷰 데이터를 생성합니다.
const mockReviewData: BookReviewItem[] = Array.from({ length: 8 }).map(
  (_, index) => ({
    id: index,
    userName: faker.person.firstName(),
    content: faker.lorem.paragraph(),
    createdAt: faker.date.past().toISOString(),
    score: faker.helpers.rangeToNumber({ min: 1, max: 5 }),
  }),
);

// 2. 해당 API 주소로 GET 요청이 오면 가짜 데이터를 반환하도록 세팅합니다.
export const reviewsById = http.get(
  "http://localhost:9999/reviews/:bookId",
  () => {
    return HttpResponse.json(mockReviewData, {
      status: 200,
    });
  },
);
