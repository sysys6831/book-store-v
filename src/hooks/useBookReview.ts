// src/hooks/useBookReview.ts
import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/api/http";
import { type BookReviewItem } from "@/models/book.model";

export const useBookReview = (bookId: number) => {
  return useQuery<BookReviewItem[]>({
    queryKey: ["reviews", bookId],
    queryFn: async () => {
      // MSW가 이 주소(/reviews/아이디)를 가로챌 것입니다!
      const response = await httpClient.get(`/reviews/${bookId}`);
      return response.data;
    },
  });
};
