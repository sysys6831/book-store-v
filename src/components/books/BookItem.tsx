// src/components/books/BookItem.tsx
import styled from "styled-components";
import { FaBookOpen, FaHeart } from "react-icons/fa";
import { type Book } from "../../models/book.model";
import { type ViewMode } from "./BooksViewSwitcher";

const formatPrice = (price: number) => {
  return price.toLocaleString("ko-KR") + "원";
};

interface Props {
  book: Book;
  view: ViewMode;
}

function BookItem({ book, view }: Props) {
  return (
    <BookItemStyle $view={view}>
      <div className="img">
        <FaBookOpen />
      </div>
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
  );
}

const BookItemStyle = styled.div<{ $view: ViewMode }>`
  display: flex;
  /* 핵심 로직: grid면 세로 배치, list면 가로 배치 */
  flex-direction: ${({ $view }) => ($view === "grid" ? "column" : "row")};
  border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
  border: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
  overflow: hidden;
  background-color: white;

  .img {
    /* grid일 땐 너비 100%, list일 땐 고정 너비 160px */
    width: ${({ $view }) => ($view === "grid" ? "100%" : "160px")};
    height: ${({ $view }) => ($view === "grid" ? "180px" : "auto")};
    background-color: #f2f2f2;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 4rem;
    color: black;
    /* list일 때 오른쪽 테두리를 줍니다 */
    border-right: ${({ $view, theme }) =>
      $view === "list" ? `1px solid ${theme.color?.border || "#eee"}` : "none"};
  }

  .content {
    flex: 1;
    padding: 16px 24px;
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
      margin-top: ${({ $view }) => ($view === "grid" ? "8px" : "auto")};
    }

    .price {
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color?.primary || "#ff5800"};
      margin: 0;
      /* 우측 하단 배치 */
      align-self: flex-end;
    }
  }
`;

export default BookItem;
