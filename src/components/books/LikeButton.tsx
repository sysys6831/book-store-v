// src/components/book/LikeButton.tsx
import styled from "styled-components";
import { type BookDetail } from "../../models/book.model";
import Button from "../common/Button";
import { FaHeart } from "react-icons/fa";

interface Props {
  book: BookDetail;
  onClick: () => void;
}

function LikeButton({ book, onClick }: Props) {
  return (
    <LikeButtonStyle>
      <Button
        size="small"
        scheme={book.liked ? "primary" : "normal"}
        onClick={onClick}
      >
        <FaHeart /> {book.likes}
      </Button>
    </LikeButtonStyle>
  );
}

const LikeButtonStyle = styled.div`
  margin-bottom: 16px;
`;

export default LikeButton;
