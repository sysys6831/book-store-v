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

// src/pages/Books.tsx 내부의 mockBooks 수정

const mockBooks: Book[] = [
  {
    id: 1,
    title: "우주 과학 기술",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    form: "종이책",
    isbn: "9781",
    summary: "우주 과학 기술 분야의 핵심...",
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
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    form: "종이책",
    isbn: "9782",
    summary: "밤하늘을 수놓은 신비로운...",
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
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    form: "전자책",
    isbn: "9783",
    summary: "끝없는 은하수 너머의...",
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
    img: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    form: "종이책",
    isbn: "9784",
    summary: "우리가 사는 태양계의...",
    detail: "상세",
    author: "태양계 학자",
    pages: 280,
    contents: "목차",
    price: 12000,
    likes: 0,
    pubDate: "2024-04-01",
  },
  {
    id: 5,
    title: "블랙홀 연구",
    // 깨짐 방지를 위한 블랙홀 고해상도 이미지 주소
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    form: "전자책",
    isbn: "9785",
    summary: "빛조차 빠져나갈 수 없는...",
    detail: "상세",
    author: "블랙홀 연구원",
    pages: 400,
    contents: "목차",
    price: 15000,
    likes: 5,
    pubDate: "2024-05-01",
  },
  {
    id: 6,
    title: "우주선 만들기",
    img: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=400&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    form: "종이책",
    isbn: "9786",
    summary: "나만의 우주선을 설계하는...",
    detail: "상세",
    author: "우주 엔지니어",
    pages: 200,
    contents: "목차",
    price: 8000,
    likes: 2,
    pubDate: "2024-06-01",
  },
];

function Books() {
  const [books, setBooks] = useState<Book[]>(mockBooks);
  const [searchParams] = useSearchParams();

  const currentView = (searchParams.get("view") as ViewMode) || "grid";

  useEffect(() => {
    setBooks(mockBooks);
  }, []);

  return (
    <BooksStyle>
      <div className="books-inner">
        <Title size="large">도서 검색 결과</Title>

        <div className="filter-wrapper">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

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
