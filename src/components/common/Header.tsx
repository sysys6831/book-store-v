// src/components/common/Header.tsx
import styled from "styled-components";
// react-router-dom 금지 규칙 준수
import { Link } from "react-router";
// 필요한 모든 아이콘을 한 번에 불러옵니다.
import {
  FaBook,
  FaUserCircle,
  FaSignInAlt,
  FaUserPlus,
  FaUser,
  FaClipboardList,
  FaSignOutAlt,
} from "react-icons/fa";

import Dropdown from "@/components/common/Dropdown";
import { useAuth } from "@/hooks/useAuth";

function Header() {
  const { isLoggedIn, logout } = useAuth();

  return (
    <HeaderStyle>
      {/* 1. 기존에 작성하신 로고 영역입니다. */}
      <h1 className="logo">
        <Link to="/">
          <FaBook className="icon" /> BOOKSTORE
        </Link>
      </h1>

      {/* 2. 기존에 작성하신 카테고리 메뉴 영역입니다. */}
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

      {/* 3. 새롭게 추가된 프로필 드롭다운 영역입니다. */}
      <nav className="user-menu">
        <Dropdown
          toggleButton={
            <button className="profile-btn">
              <FaUserCircle />
            </button>
          }
        >
          <ul className="profile-dropdown">
            {isLoggedIn ? (
              <>
                <li>
                  <Link to="/mypage">
                    <FaUser /> 마이페이지
                  </Link>
                </li>
                <li>
                  <Link to="/orderlist">
                    <FaClipboardList /> 주문 내역
                  </Link>
                </li>
                <li>
                  <button onClick={logout}>
                    <FaSignOutAlt /> 로그아웃
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login">
                    <FaSignInAlt /> 로그인
                  </Link>
                </li>
                <li>
                  <Link to="/signup">
                    <FaUserPlus /> 회원가입
                  </Link>
                </li>
              </>
            )}
          </ul>
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  /* 학생분이 설정하셨던 중앙 정렬 레이아웃을 그대로 가져왔습니다. */
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
      gap: 8px;
      text-decoration: none;
      color: ${({ theme }) =>
        theme.color?.primary || "#ff5800"}; /* 브랜드 컬러로 변경 가능 */
    }
  }

  .category ul {
    display: flex;
    gap: 32px;
    list-style: none;
    padding: 0;
    margin: 0;
    a {
      text-decoration: none;
      color: ${({ theme }) => theme.color?.text || "black"};
      font-weight: 500;
      &:hover {
        color: ${({ theme }) => theme.color?.primary || "#ff5800"};
      }
    }
  }

  .user-menu {
    .profile-btn {
      background: none;
      border: none;
      font-size: 2rem;
      color: ${({ theme }) => theme.color?.text || "#555"};
      cursor: pointer;
      display: flex;
      align-items: center;
      padding: 0;
      &:hover {
        color: ${({ theme }) => theme.color?.primary || "#ff5800"};
      }
    }

    .profile-dropdown {
      list-style: none;
      margin: 0;
      padding: 0;

      li {
        border-bottom: 1px solid #f5f5f5;
        &:last-child {
          border-bottom: none;
        }

        a,
        button {
          display: flex;
          align-items: center;
          gap: 12px; /* 아이콘과 글자 사이 간격 */
          padding: 12px 20px;
          width: 100%;
          text-align: left;
          text-decoration: none;
          color: ${({ theme }) => theme.color?.text || "black"};
          background: none;
          border: none;
          font-size: 0.9rem;
          cursor: pointer;
          white-space: nowrap;

          &:hover {
            background-color: #f9f9f9;
            color: ${({ theme }) => theme.color?.primary || "#ff5800"};
          }
        }
      }
    }
  }
`;

export default Header;
