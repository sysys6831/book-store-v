// src/pages/Books.tsx
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import styled from "styled-components";
import Title from "../components/common/Title";
import BooksFilter from "../components/books/BooksFilter";
import BooksList from "../components/books/BooksList";
import BooksViewSwitcher, {
  type ViewMode,
} from "../components/books/BooksViewSwitcher";
import { type Book } from "../models/book.model";

// 가짜 데이터 (이전과 동일하게 유지)
const mockBooks: Book[] = [
  {
    id: 1,
    title: "우주 과학 기술",
    img: 1,
    category_id: 1,
    form: "종이책",
    isbn: "9781",
    summary: "우주 과학 기술 분야...",
    detail: "상세",
    author: "우주 과학 전문가",
    pages: 300,
    contents: "목차",
    price: 10000,
    likes: 2,
    pubDate: "2024-01-01",
  },
  {
    id: 2,
    title: "별자리 이야기",
    img: 2,
    category_id: 1,
    form: "종이책",
    isbn: "9782",
    summary: "별자리 이야기 분야...",
    detail: "상세",
    author: "별자리 전문가",
    pages: 250,
    contents: "목차",
    price: 11000,
    likes: 3,
    pubDate: "2024-02-01",
  },
  {
    id: 3,
    title: "은하수 탐험",
    img: 3,
    category_id: 1,
    form: "전자책",
    isbn: "9783",
    summary: "은하수 탐험 분야...",
    detail: "상세",
    author: "은하수 탐험가",
    pages: 320,
    contents: "목차",
    price: 9000,
    likes: 1,
    pubDate: "2024-03-01",
  },
  {
    id: 4,
    title: "태양계의 비밀",
    img: 4,
    category_id: 2,
    form: "종이책",
    isbn: "9784",
    summary: "태양계의 비밀 분야...",
    detail: "상세",
    author: "태양계 학자",
    pages: 280,
    contents: "목차",
    price: 12000,
    likes: 0,
    pubDate: "2024-04-01",
  },
];

function Books() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchParams] = useSearchParams();

  // 현재 뷰 상태 가져오기 (기본값 grid)
  const currentView = (searchParams.get("view") as ViewMode) || "grid";

  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  return (
    <BooksStyle>
      <div className="books-inner">
        <Title size="large">도서 검색 결과</Title>

        {/* 필터와 스위처를 양옆으로 배치하기 위한 래퍼 */}
        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        {/* view 상태를 Props로 전달합니다! */}
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
    justify-content: space-between; /* 필터는 왼쪽, 스위처는 오른쪽 */
    align-items: center;
    margin-bottom: 24px;
  }
`;

export default Books;
