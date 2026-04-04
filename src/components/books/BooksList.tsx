// src/components/books/BooksList.tsx
import styled from "styled-components";
import BookItem from "./BookItem";
import { type Book } from "../../models/book.model";
import { type ViewMode } from "./BooksViewSwitcher";

interface Props {
  books: Book[];
  view: ViewMode;
}

function BooksList({ books, view }: Props) {
  return (
    // view 상태를 스타일 컴포넌트로 전달
    <BooksListStyle $view={view}>
      {books.map((book) => (
        <BookItem key={book.id} book={book} view={view} />
      ))}
    </BooksListStyle>
  );
}

// $view 처럼 앞에 $를 붙이면 HTML 태그에 속성이 노출되지 않는 styled-components 규칙입니다.
const BooksListStyle = styled.div<{ $view: ViewMode }>`
  display: grid;
  /* view가 grid면 4열, list면 1열로 변경 */
  grid-template-columns: ${({ $view }) =>
    $view === "grid" ? "repeat(4, 1fr)" : "repeat(1, 1fr)"};
  gap: 24px;
`;

export default BooksList;
