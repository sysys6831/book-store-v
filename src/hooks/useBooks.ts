import { useQuery } from "@tanstack/react-query";
import { httpClient } from "@/api/http";
import { type Book } from "@/models/book.model";

export const useBooks = () => {
  // useQuery를 사용하면 로딩, 에러, 데이터를 한 번에 관리할 수 있습니다.
  return useQuery<Book[]>({
    queryKey: ["books"],
    queryFn: async () => {
      const response = await httpClient.get("/books");
      return response.data;
    },
  });
};
