// src/pages/Books.tsx
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useBooks } from "@/hooks/useBooks";
import BookItem from "@/components/books/BookItem";
import { type Book } from "@/models/book.model";

function Books() {
  const { data, fetchNextPage, hasNextPage } = useBooks();
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage]);

  return (
    <BooksStyle>
      <div className="book-grid">
        {data?.pages.map((page) =>
          page.items.map((book: Book) => (
            <BookItem key={book.id} book={book} view="grid" />
          )),
        )}
      </div>
      <div ref={ref} className="loading-sentinel">
        {hasNextPage ? "로딩 중..." : "마지막 페이지입니다."}
      </div>
    </BooksStyle>
  );
}

const BooksStyle = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 50px 0;

  /* ✨ 모바일 여백 추가 */
  @media screen and (max-width: 1024px) {
    padding: 50px 20px;
  }

  .book-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;

    /* ✨ 태블릿: 2열 배치 */
    @media screen and (max-width: 768px) {
      grid-template-columns: repeat(2, 1fr);
    }

    /* ✨ 모바일: 1열 배치 */
    @media screen and (max-width: 480px) {
      grid-template-columns: repeat(1, 1fr);
    }
  }

  .loading-sentinel {
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 24px;
    color: gray;
  }
`;

export default Books;
