// src/mock/books.ts
import { http, HttpResponse } from "msw";
import { fakerKO as faker } from "@faker-js/faker";
import { type Book } from "@/models/book.model";

// ✨ request 변수에 Request 타입을 명시해 주었습니다.
export const booksHandler = http.get(
  "http://localhost:9999/books",
  ({ request }: { request: Request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get("page")) || 1;
    const limit = 4;

    const pagedData: Book[] = Array.from({ length: limit }).map((_, index) => ({
      id: (page - 1) * limit + index + 1,
      title: `[${page}페이지] ${faker.lorem.words(2)}`,
      img: `https://picsum.photos/seed/${(page - 1) * limit + index}/300/400` as unknown as number,
      category_id: 1,
      form: "종이책",
      isbn: faker.commerce.isbn(),
      summary: faker.lorem.sentence(),
      detail: faker.lorem.paragraph(),
      author: faker.person.fullName(),
      pages: faker.helpers.rangeToNumber({ min: 100, max: 500 }),
      contents: "목차 내용",
      price: faker.helpers.rangeToNumber({ min: 10000, max: 30000 }),
      likes: faker.helpers.rangeToNumber({ min: 0, max: 100 }),
      pubDate: faker.date.past().toISOString(),
    }));

    return HttpResponse.json(
      {
        items: pagedData,
        pagination: { totalCount: 20, currentPage: page },
      },
      { status: 200 },
    );
  },
);
