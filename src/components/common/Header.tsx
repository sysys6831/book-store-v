// src/components/common/Header.tsx
import styled from "styled-components";
import { Link } from "react-router";
// 1. 필요한 아이콘들을 불러옵니다.
import { FaSignInAlt, FaUserPlus, FaBook } from "react-icons/fa";

function Header() {
  return (
    <HeaderStyle>
      <h1 className="logo">
        <Link to="/">
          <FaBook className="icon" /> BOOKSTORE
        </Link>
      </h1>
      <nav className="category">
        <ul>
          <li>
            <Link to="/books?category=all">전체</Link>
          </li>
          <li>
            <Link to="/books?category=fairy">동화</Link>
          </li>
          <li>
            <Link to="/books?category=novel">소설</Link>
          </li>
          <li>
            <Link to="/books?category=society">사회</Link>
          </li>
        </ul>
      </nav>
      <div className="auth">
        {/* 2. 링크 텍스트 옆에 아이콘을 배치합니다. */}
        <Link to="/login">
          <FaSignInAlt /> 로그인
        </Link>
        <Link to="/signup">
          <FaUserPlus /> 회원가입
        </Link>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    a {
      display: flex;
      align-items: center;
      gap: 8px; /* 로고 아이콘과 글자 사이 간격 */
      text-decoration: none;
      color: ${({ theme }) => theme.color?.primary || "black"};
    }
  }

  .category ul {
    display: flex;
    gap: 32px;
    list-style: none;
    padding: 0;
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color?.text || "black"};
    }
  }

  .auth {
    display: flex;
    gap: 16px;
    a {
      display: flex;
      align-items: center;
      gap: 4px; /* 아이콘과 글자 사이 간격 */
      text-decoration: none;
      color: ${({ theme }) => theme.color?.text || "black"};
    }
  }
`;

export default Header;
