// src/components/books/BooksFilter.tsx
import styled from "styled-components";
import { Link, useSearchParams } from "react-router";
import Button from "../common/Button";

// 카테고리 필터 데이터
const categories = [
  { id: "all", name: "전체" },
  { id: "new", name: "신간" },
  { id: "best", name: "베스트" },
];

// 정렬 옵션 데이터
const sorts = [
  { id: "latest", name: "출간일 순" },
  { id: "likes", name: "좋아요 순" },
  { id: "price", name: "가격 순" },
];

function BooksFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  // 현재 선택된 카테고리와 정렬 값을 가져옵니다. (없으면 기본값)
  const currentCategory = searchParams.get("category") || "all";
  const currentSort = searchParams.get("sort") || "latest";

  // 클릭 시 주소창의 쿼리 파라미터를 업데이트하는 함수
  const handleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  return (
    <BooksFilterStyle>
      {/* 1. 카테고리 필터 영역 */}
      <div className="filter-category">
        {categories.map((item) => (
          <Button
            key={item.id}
            size="medium"
            scheme={currentCategory === item.id ? "primary" : "normal"}
            onClick={() => handleFilter("category", item.id)}
          >
            {/* 에러 원인 해결: 버튼 태그 사이에 이름을 넣어줍니다! */}
            {item.name}
          </Button>
        ))}
      </div>

      {/* 2. 정렬 옵션 영역 */}
      <div className="filter-sort">
        {sorts.map((item) => (
          <Link
            key={item.id}
            to={`?category=${currentCategory}&sort=${item.id}`}
            className={currentSort === item.id ? "active" : ""}
          >
            {/* 에러 원인 해결: 괄호 대신 꺾쇠로 닫아줍니다! */}
            {item.name}
          </Link>
        ))}
      </div>
    </BooksFilterStyle>
  );
}

const BooksFilterStyle = styled.div`
  padding: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
  display: flex;
  flex-direction: column;
  gap: 16px;

  .filter-category {
    display: flex;
    gap: 8px;
    justify-content: space-between;

    button {
      flex: 1;
    }
  }

  .filter-sort {
    display: flex;
    gap: 16px;
    justify-content: flex-end;

    a {
      font-size: 0.875rem;
      color: ${({ theme }) => theme.color?.text || "gray"};
      text-decoration: none;

      &.active {
        color: ${({ theme }) => theme.color?.primary || "red"};
        font-weight: bold;
      }
    }
  }
`;

export default BooksFilter;
