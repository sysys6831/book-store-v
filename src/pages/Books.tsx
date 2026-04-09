// src/pages/Books.tsx
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import { useBooks } from "@/hooks/useBooks";

// ✨ BookItem 컴포넌트와 Book 모델을 불러옵니다. (경로는 프로젝트에 맞게 확인해 주세요)
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
            // ✨ 여기에 view="grid" 속성을 필수로 추가해 줍니다!
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

  .book-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 24px;
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

// ✨ 잊지 말고 꼭 내보내기(export)를 해줍니다.
export default Books;
