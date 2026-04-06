// src/pages/Books.tsx
import { useSearchParams } from "react-router";
import styled from "styled-components";
import Title from "@/components/common/Title";
import BooksFilter from "@/components/books/BooksFilter";
import BooksList from "@/components/books/BooksList";
import BooksViewSwitcher, {
  type ViewMode,
} from "@/components/books/BooksViewSwitcher";
import { useBooks } from "@/hooks/useBooks"; // ✨ 새로 만든 훅을 불러옵니다!

function Books() {
  // URL에서 뷰 모드(바둑판/목록) 파라미터를 읽어옵니다.
  const [searchParams] = useSearchParams();
  const currentView = (searchParams.get("view") as ViewMode) || "grid";

  // ✨ 기존 useState, useEffect 대신 React Query가 적용된 커스텀 훅을 사용합니다.
  const { data: books, isLoading, isError } = useBooks();

  // 로딩 중이거나 에러가 났을 때의 화면을 처리합니다.
  if (isLoading) return <div>데이터를 불러오는 중입니다...</div>;
  if (isError || !books)
    return <div>도서 목록을 불러오는 데 실패했습니다.</div>;

  return (
    <BooksStyle>
      <div className="books-inner">
        <Title size="large">도서 검색 결과</Title>

        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {/* 불러온 books 데이터를 그대로 하위 컴포넌트로 넘겨줍니다. */}
        <BooksList books={books} view={currentView} />
      </div>
    </BooksStyle>
  );
}

const BooksStyle = styled.div`
  width: 100%;
  padding: 50px 0;

  .books-inner {
    width: 100%;
    max-width: 1020px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .filter-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 24px;
  }
`;

export default Books;
