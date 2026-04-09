// src/hooks/useBooks.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import { httpClient } from "@/api/http";

export const useBooks = () => {
  return useInfiniteQuery({
    queryKey: ["books"],
    queryFn: async ({ pageParam = 1 }) => {
      const response = await httpClient.get(`/books?page=${pageParam}`);
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      const isLast = lastPage.pagination.currentPage >= 5; // 총 5페이지라고 가정
      return isLast ? undefined : lastPage.pagination.currentPage + 1;
    },
    initialPageParam: 1,
  });
};
