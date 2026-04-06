// src/pages/BookDetail.tsx
import { useState, useEffect } from "react";
import { useParams } from "react-router"; // react-router 규칙 준수
import styled from "styled-components";

// ✨ 모든 컴포넌트와 모델, 유틸 함수를 절대 경로(@/)로 불러옵니다.
import { type BookDetail as IBookDetail } from "@/models/book.model";
import Title from "@/components/common/Title";
import { formatNumber, formatDate } from "@/utils/format";
import EllipsisBox from "@/components/common/EllipsisBox";
import AddToCart from "@/components/books/AddToCart";
import LikeButton from "@/components/books/LikeButton";

const mockBookDetails: IBookDetail[] = [
  {
    id: 1,
    title: "우주 과학 기술",
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    categoryName: "과학",
    form: "종이책",
    isbn: "9781",
    summary: "현대 우주 과학의 정점...",
    detail:
      "이 책은 현대 우주 과학 기술의 눈부신 발전을 다각도에서 조명하는 최고의 지침서입니다. 인류가 최초로 달에 발을 내디딘 역사적인 순간부터, 현재 화성 탐사 로버가 보내오는 경이로운 최신 데이터에 이르기까지 인류가 축적한 모든 핵심 기술력을 이 한 권에 집약했습니다. 특히 로켓 엔진의 강력한 추진 원리와 인공위성의 정밀한 궤도 계산법 등 전문적인 공학 내용을 일반인도 아주 쉽고 재미있게 이해할 수 있도록 풍부한 시각 자료와 함께 풀어서 설명한 점이 가장 큰 특징입니다. 미래 우주 산업의 무한한 비전과 외계 행성 거주 가능성에 대한 최신 과학적 연구 결과까지 포함되어 있어, 밤하늘을 넘어 우주를 꿈꾸는 모든 이들에게 가슴 벅찬 감동과 명확한 꿈을 선사할 것 입니다. 거대한 우주 탐험의 역사를 지금 바로 직접 확인해 보세요.",
    author: "우주 과학 전문가",
    pages: 300,
    contents: "1장: 로켓의 원리\n2장: 인공위성 궤도\n3장: 행성 탐사",
    price: 10000,
    likes: 2,
    liked: false,
    pubDate: "2024-01-01",
  },
  // 테스트를 위해 1번 데이터만 남겨두거나 기존 데이터를 모두 유지하셔도 됩니다.
];

function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<IBookDetail | null>(null);

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

  return (
    <BookDetailStyle>
      <header className="header">
        <img
          src={book.img as unknown as string}
          alt={book.title}
          className="book-img"
        />
        <div className="info">
          <Title size="large" color="text">
            {book.title}
          </Title>

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

      <div className="content">
        <Title size="medium">상세 설명</Title>
        <EllipsisBox linelimit={4}>{book.detail}</EllipsisBox>

        <Title size="medium">목차</Title>
        <p className="index">{book.contents}</p>
      </div>
    </BookDetailStyle>
  );
}

const BookDetailStyle = styled.div`
  padding: 50px 0;
  max-width: 1020px;
  margin: 0 auto;

  .header {
    display: flex;
    align-items: start;
    gap: 24px;
    padding: 0 0 24px 0;
    border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};

    .book-img {
      flex: 1;
      max-width: 450px;
      height: 480px;
      object-fit: cover;
      border-radius: 8px;
    }

    .info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 12px;

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
    padding: 24px 0;
    .index {
      white-space: pre-line;
      line-height: 1.5;
    }
  }
`;

export default BookDetail;
