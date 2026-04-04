// src/components/books/BookItem.tsx 전체 코드 교체

import styled from "styled-components";
import { FaHeart } from "react-icons/fa";
import { type Book } from "../../models/book.model";
import { type ViewMode } from "./BooksViewSwitcher";
import { Link } from "react-router";

const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR") + "원";
};

interface Props {
  book: Book;
  view: ViewMode;
}

function BookItem({ book, view }: Props) {
  return (
    <Link to={`/book/${book.id}`} style={{ textDecoration: "none" }}>
      <BookItemStyle $view={view}>
        {/* 타입 에러 방지를 위한 as unknown as string 처리 */}
        <img
          src={book.img as unknown as string}
          alt={book.title}
          className="book-img"
        />
        <div className="content">
          <h2>{book.title}</h2>
          <p className="summary">{book.summary}</p>
          <p className="author">{book.author}</p>
          <div className="likes">
            <FaHeart />
            <span>{book.likes}</span>
          </div>
          <p className="price">{formatPrice(book.price)}</p>
        </div>
      </BookItemStyle>
    </Link>
  );
}

const BookItemStyle = styled.div<{ $view: ViewMode }>`
  display: flex;
  flex-direction: ${({ $view }) => ($view === "grid" ? "column" : "row")};
  border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
  border: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
  overflow: hidden;
  background-color: white;
  transition: box-shadow 0.2s;

  &:hover {
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }

  .book-img {
    /* 1. 이미지 사이즈 통일 로직 적용 */
    /* Grid 뷰: 가로 꽉 차게, 세로 고정 240px */
    width: ${({ $view }) =>
      $view === "grid" ? "100%" : "200px"}; /* List 뷰 가로 크기 확대 */
    height: ${({ $view }) =>
      $view === "grid" ? "240px" : "200px"}; /* List 뷰 세로 크기 고정 */

    /* 2. 비율 유지 트릭: 원본 사진의 비율을 무시하고 지정된 영역을 꽉 채웁니다. */
    object-fit: cover;

    border-right: ${({ $view, theme }) =>
      $view === "list" ? `1px solid ${theme.color?.border || "#eee"}` : "none"};
  }

  .content {
    flex: 1;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    h2 {
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0;
      color: ${({ theme }) => theme.color?.text || "black"};
    }

    .summary,
    .author {
      font-size: 0.875rem;
      color: gray;
      margin: 0;
    }

    .likes {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 0.875rem;
      font-weight: bold;
      /* Grid 뷰일 땐 하단에 gap을 줍니다. */
      margin-top: ${({ $view }) => ($view === "grid" ? "8px" : "auto")};
    }

    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color?.primary || "#ff5800"};
      margin: 0;
      /* 가격만 우측 하단 배치 */
      align-self: flex-end;
    }
  }
`;

export default BookItem;
