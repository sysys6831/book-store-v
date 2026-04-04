// src/pages/BookDetail.tsx
import { useState, useEffect } from "react";
// 1. 주소창에서 id 값을 읽어오기 위해 useParams를 추가합니다!
import { useParams } from "react-router";
import styled from "styled-components";
import { type BookDetail as IBookDetail } from "../models/book.model";
import Title from "../components/common/Title";
import { formatNumber, formatDate } from "../utils/format";
import EllipsisBox from "../components/common/EllipsisBox";
import AddToCart from "../components/books/AddToCart";
import LikeButton from "../components/books/LikeButton";

// 2. 6권의 상세 데이터를 모두 가지고 있는 배열을 만듭니다.
// src/pages/BookDetail.tsx 내의 mockBookDetails 데이터 전체

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
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
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
  {
    id: 2,
    title: "별자리 이야기",
    img: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    categoryName: "과학",
    form: "종이책",
    isbn: "9782",
    summary: "밤하늘에 숨겨진 신비로운 신화...",
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
    detail:
      "어두운 밤하늘을 찬란하게 수놓은 아름다운 별자리들 뒤에는 고대인들의 풍부한 상상력과 신비로운 신화적 이야기가 숨겨져 있습니다. 그리스 로마 신화의 영웅들과 신들이 어떻게 하늘의 별이 되어 영원히 빛나게 되었는지, 그리고 동서양의 각기 다른 문화권에서 이 별자리들을 어떻게 해석하고 의미를 부여했는지 흥미진진하게 풀어냅니다. 계절별로 우리 머리 위를 지나가는 별자리들을 망원경 없이도 맨눈으로 쉽게 찾는 방법과 천체 관측 실전 가이드를 함께 제공하여 실용성까지 더했습니다. 어두운 밤, 사랑하는 가족이나 연인과 함께 별을 바라보며 나눌 수 있는 따뜻하고 낭만적인 이야기들이 가득 담겨 있는 이 책은 당신의 밤하늘을 더욱 의미 있게 만들어 줄 것 입니다. 밤하늘의 주인공들을 지금 만나보세요.",
    author: "별자리 전문가",
    pages: 250,
    contents: "1장: 봄의 대삼각형\n2장: 북극성과 북두칠성",
    price: 11000,
    likes: 3,
    liked: false,
    pubDate: "2024-02-01",
  },
  {
    id: 3,
    title: "은하수 탐험",
    img: "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 1,
    categoryName: "과학",
    form: "전자책",
    isbn: "9783",
    summary: "우리 은하를 넘어 안드로메다까지...",
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
    detail:
      "우리가 살고 있는 '우리 은하'는 수천억 개의 별들이 모여 거대한 소용돌이를 이루는 우주의 고향입니다. 이 책은 은하수의 화려한 모습 뒤에 숨겨진 천문학적 현상들과 은하의 일생을 추적합니다. 은하의 중심부에 위치한 거대 질량 블랙홀의 강력한 정체와 은하들이 서로의 중력에 이끌려 충돌하고 합쳐지는 장엄한 우주의 드라마를 생생한 시각 자료와 함께 설명합니다. 망원경으로만 보던 신비로운 색채의 성단과 성운이 어떻게 만들어지는지, 그리고 우리 은하 너머의 또 다른 우주인 이웃 은하들은 어떤 모습을 하고 있는지 탐구합니다. 방대한 우주의 규모와 시간을 실감하게 하는 이 책은 당신의 시야를 지구 밖 넓은 세계로 확장시켜 줄 것 입니다.",
    author: "은하수 탐험가",
    pages: 320,
    contents: "1장: 우리 은하의 구조\n2장: 이웃 은하들",
    price: 9000,
    likes: 1,
    liked: false,
    pubDate: "2024-03-01",
  },
  {
    id: 4,
    title: "태양계의 비밀",
    img: "https://images.unsplash.com/photo-1446941611757-91d2c3bd3d45?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    categoryName: "과학",
    form: "종이책",
    isbn: "9784",
    summary: "가장 가까운 우주 친구들...",
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
    detail:
      "수성부터 해왕성까지, 태양계를 이루는 개성 넘치는 행성들의 놀라운 특징들을 완벽하게 파헤칩니다. 뜨거운 태양의 강력한 폭풍부터 목성의 거대한 대적점, 토성의 아름다운 고리 등 각 행성들이 품고 있는 극한의 환경들을 최신 탐사선의 고해상도 자료를 토대로 생생하게 설명합니다. 행성뿐만 아니라 소행성대와 혜성 등 태양계 주변을 떠도는 작은 천체들의 역할과 인류의 다음 주거지로 가장 강력하게 주목받는 화성 탐사의 현재 기술력과 미래 식민지 건설 계획까지 비중 있게 다룹니다. 우리가 살고 있는 지구를 더 깊이 이해하기 위해 반드시 알아야 할 이웃 행성들의 생생한 기록들을 지금 바로 확인해 보세요.",
    author: "태양계 학자",
    pages: 280,
    contents: "1장: 불타는 태양\n2장: 가스 거인들",
    price: 12000,
    likes: 0,
    liked: false,
    pubDate: "2024-04-01",
  },
  {
    id: 5,
    title: "블랙홀 연구",
    img: "https://images.unsplash.com/photo-1614728263952-84ea256f9679?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    categoryName: "과학",
    form: "전자책",
    isbn: "9785",
    summary: "시공간이 뒤틀리는 우주의 심연...",
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
    detail:
      "빛조차 빠져나오지 못하는 우주의 가장 강력한 중력장, 블랙홀의 신비로운 미스터리를 현대 물리학의 시각으로 분석합니다. 아인슈타인의 일반 상대성 이론이 예측한 시공간의 뒤틀림 현상이 실제 블랙홀 주변에서 어떻게 일어나는지, 그리고 블랙홀 내부로 빨려 들어가면 어떤 현상이 벌어질지에 대한 최신 이론들을 흥미롭게 소개합니다. 최근 인류가 최초로 성공한 블랙홀 그림자 관측 프로젝트의 뒷이야기와 사건의 지평선(Event Horizon) 너머의 세상을 상상해 보는 즐거움을 선사합니다. 물리학적 사고의 한계를 뛰어넘는 블랙홀의 놀라운 세계를 이 책을 통해 탐험해 보시기 바랍니다.",
    author: "블랙홀 연구원",
    pages: 400,
    contents: "1장: 상대성 이론\n2장: 블랙홀 관측 프로젝트",
    price: 15000,
    likes: 5,
    liked: false,
    pubDate: "2024-05-01",
  },
  {
    id: 6,
    title: "우주선 만들기",
    img: "https://images.unsplash.com/photo-1516849841032-87cbac4d88f7?q=80&w=800&auto=format&fit=crop" as unknown as number,
    category_id: 2,
    categoryName: "과학",
    form: "종이책",
    isbn: "9786",
    summary: "기초 공학부터 우주 비행까지...",
    // EllipsisBox 테스트를 위해 아주 긴 초장문 텍스트로 변경했습니다.
    detail:
      "막연하게만 느껴졌던 우주선 설계의 기초를 누구나 이해할 수 있는 공학적 관점에서 철저하게 풀어냅니다. 선체의 거대한 재료 공학부터 생명 유지 장치, 그리고 궤도 제어 시스템 등 우주선이 갖춰야 할 필수 요소들을 단계별로 설명합니다. 단순히 이론적인 지식에 그치지 않고, 모형 로켓을 제작하고 발사하는 과정에서의 실무적인 팁과 우주 비행사가 되기 위해 필요한 훈련 과정까지 담고 있습니다. 공학적인 호기심을 가진 학생들부터 실제 우주 개발 분야에 관심이 있는 성인들까지 모두 만족할 수 있는 실무 가이드북입니다. 당신만의 우주선을 설계하는 첫걸음을 이 책과 함께 시작해 보세요.",
    author: "우주 엔지니어",
    pages: 200,
    contents: "1장: 기체 역학\n2장: 제어 시스템 구축",
    price: 8000,
    likes: 2,
    liked: false,
    pubDate: "2024-06-01",
  },
];
function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState<IBookDetail | null>(null);

  useEffect(() => {
    // 임시 테스트용이므로 항상 1번 데이터를 강제로 불러오거나 id로 찾습니다.
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
      /* ✨ 핵심 해결책: 이미지가 오른쪽 영역을 침범하지 못하도록 최대 너비를 고정합니다! */
      max-width: 450px;
      height: 480px;
      object-fit: cover;
      /* 보너스: 사진 모서리를 살짝 둥글게 만들어주면 훨씬 고급스러워 보입니다. */
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
