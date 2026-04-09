// src/pages/BookDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import styled from "styled-components";

import { type BookDetail as IBookDetail } from "@/models/book.model";
import Title from "@/components/common/Title";
import { formatNumber, formatDate } from "@/utils/format";
import EllipsisBox from "@/components/common/EllipsisBox";
import AddToCart from "@/components/books/AddToCart";
import LikeButton from "@/components/books/LikeButton";
import BookReview from "@/components/books/BookReview";

import Tabs from "@/components/common/Tabs";
import Modal from "@/components/common/Modal";
import Dropdown from "@/components/common/Dropdown";

const mockBookDetails: IBookDetail[] = [
  {
    id: 1,
    title: "우주 과학 기술",
    img: "https://picsum.photos/seed/1/300/400" as unknown as number, // 임시 이미지
    category_id: 1,
    categoryName: "과학",
    form: "종이책",
    isbn: "9781",
    summary: "현대 우주 과학의 정점...",
    detail:
      "이 책은 현대 우주 과학 기술의 눈부신 발전을 다각도에서 조명하는 최고의 지침서입니다. 인류가 최초로 달에 발을 내디딘 역사적인 순간부터, 현재 화성 탐사 로버가 보내오는 경이로운 최신 데이터에 이르기까지 인류가 축적한 모든 핵심 기술력을 이 한 권에 집약했습니다.",
    author: "우주 과학 전문가",
    pages: 300,
    contents: "1장: 로켓의 원리\n2장: 인공위성 궤도\n3장: 행성 탐사",
    price: 10000,
    likes: 2,
    liked: false,
    pubDate: "2024-01-01",
  },
];

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<IBookDetail | null>(null);

  // ✨ 모달창의 열림/닫힘 상태를 관리합니다.
  const [isImgOpen, setIsImgOpen] = useState(false);

  useEffect(() => {
    const targetBook =
      mockBookDetails.find((item) => item.id === Number(id)) ||
      mockBookDetails[0];
    setBook(targetBook);
  }, [id]);

  if (!book) return <div>존재하지 않는 도서입니다.</div>;

  const toggleLike = () => {
    setBook((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        liked: !prev.liked,
        likes: prev.liked ? prev.likes - 1 : prev.likes + 1,
      };
    });
  };

  const bookInfoList = [
    { label: "카테고리", value: book.categoryName },
    { label: "포맷", value: book.form },
    { label: "저자", value: book.author },
    { label: "페이지", value: `${book.pages} 페이지` },
    { label: "ISBN", value: book.isbn },
    { label: "출간일", value: formatDate(book.pubDate) },
    { label: "가격", value: `${formatNumber(book.price)} 원` },
  ];

  // ✨ 탭 컴포넌트에 넘겨줄 배열 데이터를 구성합니다.
  const tabItems = [
    {
      title: "상세 설명",
      content: <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>,
    },
    {
      title: "목차",
      content: <p className="index">{book.contents}</p>,
    },
    {
      title: "도서 리뷰",
      content: <BookReview bookId={book.id} />,
    },
  ];

  return (
    <BookDetailStyle>
      <header className="header">
        {/* ✨ 클릭 시 모달창이 열리도록 이벤트를 달아줍니다. */}
        <div className="img-wrapper" onClick={() => setIsImgOpen(true)}>
          <img
            src={book.img as unknown as string}
            alt={book.title}
            className="book-img"
          />
          <div className="img-hint">🔍 크게 보기</div>
        </div>

        <div className="info">
          <div className="title-area">
            <Title size="large" color="text">
              {book.title}
            </Title>
            {/* ✨ 드롭다운 컴포넌트를 활용한 더보기 메뉴입니다. */}
            <Dropdown toggleButton={<button className="more-btn">⋮</button>}>
              <ul className="dropdown-list">
                <li>공유하기</li>
                <li>장바구니 담기</li>
                <li>오류 신고</li>
              </ul>
            </Dropdown>
          </div>

          {bookInfoList.map((item) => (
            <dl key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </dl>
          ))}

          <p className="summary">{book.summary}</p>
          <LikeButton book={book} onClick={toggleLike} />
          <AddToCart book={book} />
        </div>
      </header>

      {/* ✨ 세로로 길던 3개의 영역을 탭 하나로 완벽하게 대체합니다! */}
      <div className="content">
        <Tabs tabs={tabItems} />
      </div>

      {/* ✨ 모달 컴포넌트를 맨 아래에 선언하여 이미지를 크게 띄웁니다. */}
      <Modal isOpen={isImgOpen} onClose={() => setIsImgOpen(false)}>
        <img
          src={book.img as unknown as string}
          alt="확대된 표지"
          className="modal-img"
        />
      </Modal>
    </BookDetailStyle>
  );
}

// src/pages/BookDetail.tsx 내부의 하단 스타일 코드 교체

const BookDetailStyle = styled.div`
  padding: 50px 0;
  max-width: 1020px;
  margin: 0 auto;

  /* ✨ 모바일 여백 추가 */
  @media screen and (max-width: 1024px) {
    padding: 30px 20px;
  }

  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
    margin-bottom: 24px;

    /* ✨ 핵심: 태블릿/모바일에서는 가로 배치를 세로 배치로 변경 */
    @media screen and (max-width: 768px) {
      flex-direction: column;
      align-items: center;
    }

    .img-wrapper {
      flex: 1;
      max-width: 450px;
      width: 100%; /* 모바일에서 꽉 차게 */
      position: relative;
      cursor: pointer;

      .book-img {
        width: 100%;
        height: 480px;
        object-fit: cover;
        border-radius: 8px;

        /* 모바일에서는 사진 높이를 기기 비율에 맞게 조절 */
        @media screen and (max-width: 768px) {
          height: auto;
          aspect-ratio: 3 / 4;
        }
      }

      .img-hint {
        position: absolute;
        bottom: 12px;
        right: 12px;
        background-color: rgba(0, 0, 0, 0.6);
        color: white;
        padding: 4px 12px;
        border-radius: 20px;
        font-size: 0.875rem;
      }
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;
      width: 100%; /* 세로 배치 시 텍스트 영역도 꽉 차게 */

      .title-area {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .more-btn {
          background: none;
          border: none;
          font-size: 1.5rem;
          cursor: pointer;
          color: gray;
        }

        .dropdown-list {
          list-style: none;
          margin: 0;
          padding: 0;
          li {
            padding: 8px 16px;
            cursor: pointer;
            &:hover {
              background-color: #f5f5f5;
            }
          }
        }
      }

      dl {
        display: flex;
        margin: 0;
        dt {
          width: 80px;
          color: ${({ theme }) => theme.color?.secondary || "gray"};
        }
        dd {
          margin: 0;
          color: ${({ theme }) => theme.color?.text || "black"};
        }
      }

      .summary {
        margin-top: 16px;
        color: gray;
        font-size: 0.875rem;
      }
    }
  }

  .content {
    .index {
      white-space: pre-line;
      line-height: 1.5;
      color: #555;
    }
  }

  .modal-img {
    max-width: 100%;
    max-height: 70vh;
    border-radius: 8px;
    object-fit: contain;
  }
`;

export default BookDetail;
