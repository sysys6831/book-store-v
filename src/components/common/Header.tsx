import styled from "styled-components";
import { Link } from "react-router"; // 반드시 react-router를 사용합니다!

function Header() {
  return (
    <HeaderStyle>
      <h1 className="logo">
        <Link to="/">BOOKSTORE</Link>
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
        <Link to="/login">로그인</Link>
        <Link to="/signup">회원가입</Link>
      </div>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto; /* 중앙 정렬 */
  display: flex;
  justify-content: space-between; /* 양 끝과 가운데로 균일하게 배치 */
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};

  .logo {
    font-size: 1.5rem;
    font-weight: bold;
    a {
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
      text-decoration: none;
      color: ${({ theme }) => theme.color?.text || "black"};
    }
  }
`;

export default Header;
