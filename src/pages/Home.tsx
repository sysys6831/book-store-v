// src/pages/Home.tsx
import styled from "styled-components";
import Title from "@/components/common/Title";
import Banner from "@/components/common/Banner";

const mockBooks = [
  {
    id: 1,
    title: "별을 여행하는 아이 (특별 한정판 양장본)",
    author: "이별리",
    price: 15000,
    img: "https://picsum.photos/id/10/300/400",
  },
  {
    id: 2,
    title: "시간의 정원",
    author: "시간수",
    price: 12000,
    img: "https://picsum.photos/id/11/300/400",
  },
  {
    id: 3,
    title: "빛의 파도",
    author: "광이",
    price: 22000,
    img: "https://picsum.photos/id/12/300/400",
  },
  {
    id: 4,
    title: "그림자 게임",
    author: "그림자",
    price: 25000,
    img: "https://picsum.photos/id/13/300/400",
  },
];

const mockReviews = [
  {
    id: 1,
    author: "우주먼지",
    date: "2024-03-01",
    score: 5,
    content:
      "너무 아름다운 이야기입니다. 밤하늘을 볼 때마다 생각날 것 같아요. 아이들에게 읽어주기에도 너무 좋고 어른들이 읽어도 깊은 여운이 남는 아주 훌륭한 책입니다. 강력하게 추천합니다!",
  },
  {
    id: 2,
    author: "시간탐험가",
    date: "2024-03-05",
    score: 4,
    content: "시간이라는 주제를 새롭게 풀어낸 점이 좋았습니다. 추천합니다.",
  },
  {
    id: 3,
    author: "빛의속도",
    date: "2024-03-10",
    score: 5,
    content: "과학을 이렇게 서정적으로 표현할 수 있다니 놀랍습니다.",
  },
];

function Home() {
  return (
    <HomeStyle>
      <Banner />

      <section className="section">
        <Title size="large">베스트 셀러</Title>
        <div className="book-grid">
          {mockBooks.map((book) => (
            <div key={book.id} className="book-card">
              <img src={book.img} alt={book.title} />
              <div className="info">
                <h4>{book.title}</h4>
                <p className="author">{book.author}</p>
                <p className="price">{book.price.toLocaleString()}원</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <Title size="large">신간 안내</Title>
        <div className="book-grid">
          {mockBooks
            .slice()
            .reverse()
            .map((book) => (
              <div key={`new-${book.id}`} className="book-card">
                <img src={book.img} alt={book.title} />
                <div className="info">
                  <h4>{book.title}</h4>
                  <p className="author">{book.author}</p>
                  <p className="price">{book.price.toLocaleString()}원</p>
                </div>
              </div>
            ))}
        </div>
      </section>

      <section className="section review-section">
        <Title size="large">리뷰</Title>
        <div className="review-grid">
          {mockReviews.map((review) => (
            <div key={review.id} className="review-card">
              <div className="header">
                <div>
                  <span className="author">{review.author}</span>
                  <span className="score">{"⭐".repeat(review.score)}</span>
                </div>
                <span className="date">{review.date}</span>
              </div>
              <p className="content">{review.content}</p>
            </div>
          ))}
        </div>
      </section>
    </HomeStyle>
  );
}

const HomeStyle = styled.div`
  max-width: 1020px;
  margin: 0 auto;
  padding: 40px 0;
  /* 모바일 화면에서 양옆 여백을 주기 위해 padding을 추가합니다. */
  @media screen and (max-width: 1024px) {
    padding: 40px 20px;
  }

  .section {
    margin-bottom: 64px;

    /* ✨ 반응형 도서 목록 (기본 4열 -> 태블릿 2열 -> 모바일 1열) */
    .book-grid {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 24px;
      margin-top: 24px;

      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
      }

      .book-card {
        border: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
        border-radius: 8px;
        overflow: hidden;

        img {
          width: 100%;
          height: 250px;
          object-fit: cover;
        }

        .info {
          padding: 16px;

          h4 {
            margin: 0 0 8px 0;
            font-size: 1rem;
            /* ✨ 한 줄 말줄임표 처리 */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .author {
            margin: 0 0 8px 0;
            color: gray;
            font-size: 0.875rem;
            /* ✨ 한 줄 말줄임표 처리 */
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }

          .price {
            margin: 0;
            font-weight: bold;
            color: ${({ theme }) => theme.color?.primary || "#ff5800"};
          }
        }
      }
    }

    /* ✨ 반응형 리뷰 목록 (기본 3열 -> 태블릿 2열 -> 모바일 1열) */
    .review-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 24px;
      margin-top: 24px;

      @media screen and (max-width: 768px) {
        grid-template-columns: repeat(2, 1fr);
      }
      @media screen and (max-width: 480px) {
        grid-template-columns: repeat(1, 1fr);
      }

      .review-card {
        border: 1px solid ${({ theme }) => theme.color?.border || "#eee"};
        border-radius: 8px;
        padding: 24px;
        background-color: #fafafa;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;

          .author {
            font-weight: bold;
            margin-right: 8px;
          }
          .score {
            font-size: 0.875rem;
          }
          .date {
            color: gray;
            font-size: 0.875rem;
          }
        }

        .content {
          margin: 0;
          line-height: 1.5;
          color: #333;
          /* ✨ 다중 행(3줄) 말줄임표 처리 */
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
`;

export default Home;
