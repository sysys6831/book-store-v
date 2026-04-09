// src/components/books/BookReview.tsx
import React, { useState } from "react";
import styled from "styled-components";
import { useBookReview } from "@/hooks/useBookReview";
import Button from "@/components/common/Button";

// ✨ 방금 만든 토스트 알림 도구를 불러옵니다.
import { useToastStore } from "@/store/toastStore";

interface Props {
  bookId: number;
}

function BookReview({ bookId }: Props) {
  const { data: reviews, isLoading } = useBookReview(bookId);
  const addToast = useToastStore((state) => state.addToast);

  // 사용자가 입력할 리뷰 내용과 별점을 기억하는 창고(상태)입니다.
  const [content, setContent] = useState("");
  const [score, setScore] = useState(5);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // 내용이 텅 비어있으면 경고 토스트를 띄우고 돌려보냅니다.
    if (!content.trim()) {
      addToast("리뷰 내용을 입력해 주세요.", "error");
      return;
    }

    // ✨ 실제로는 여기서 서버로 데이터를 전송(POST)합니다.
    // 여기서는 UI 확인을 위해 작성 완료 토스트를 띄우고 칸을 비웁니다.
    addToast("리뷰가 성공적으로 등록되었습니다!");
    setContent("");
    setScore(5);
  };

  if (isLoading) return <div>리뷰를 불러오는 중입니다...</div>;

  return (
    <BookReviewStyle>
      {/* ✨ 새롭게 추가된 리뷰 작성 폼 영역입니다. */}
      <form className="review-form" onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="도서에 대한 리뷰를 남겨주세요."
        />
        <div className="form-footer">
          <select
            value={score}
            onChange={(e) => setScore(Number(e.target.value))}
          >
            <option value={5}>⭐⭐⭐⭐⭐ 5점</option>
            <option value={4}>⭐⭐⭐⭐ 4점</option>
            <option value={3}>⭐⭐⭐ 3점</option>
            <option value={2}>⭐⭐ 2점</option>
            <option value={1}>⭐ 1점</option>
          </select>
          <Button size="medium" scheme="primary" type="submit">
            작성하기
          </Button>
        </div>
      </form>

      {/* 기존 리뷰 목록 영역입니다. */}
      <div className="review-list">
        {!reviews || reviews.length === 0 ? (
          <div className="empty">등록된 리뷰가 없습니다.</div>
        ) : (
          reviews.map((review) => (
            <div key={review.id} className="review-item">
              <div className="header">
                <span className="author">👤 {review.userName}</span>
                <span className="score">⭐ {review.score}점</span>
              </div>
              <p className="content">{review.content}</p>
            </div>
          ))
        )}
      </div>
    </BookReviewStyle>
  );
}

const BookReviewStyle = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;

  /* ✨ 리뷰 작성 폼 스타일 */
  .review-form {
    display: flex;
    flex-direction: column;
    gap: 12px;

    textarea {
      width: 100%;
      height: 100px;
      padding: 12px;
      border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
      border-radius: 8px;
      resize: none;
      font-family: inherit;
      font-size: 0.875rem;

      &:focus {
        outline: none;
        border-color: ${({ theme }) => theme.color?.primary || "#1e1e1e"};
      }
    }

    .form-footer {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      gap: 12px;

      select {
        padding: 8px 12px;
        border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
        border-radius: 4px;
        outline: none;
        cursor: pointer;
      }
    }
  }

  /* 기존 리뷰 목록 스타일 */
  .review-list {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .empty {
      text-align: center;
      color: gray;
      padding: 40px 0;
    }

    .review-item {
      padding: 16px;
      border: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
      border-radius: 8px;
      background-color: #fafafa;

      .header {
        display: flex;
        justify-content: space-between;
        margin-bottom: 8px;
        font-weight: bold;
        font-size: 0.875rem;

        .author {
          color: ${({ theme }) => theme.color?.text || "black"};
        }
        .score {
          color: ${({ theme }) => theme.color?.primary || "#ff5800"};
        }
      }

      .content {
        margin: 0;
        line-height: 1.5;
        font-size: 0.875rem;
        color: #333;
      }
    }
  }
`;

export default BookReview;
