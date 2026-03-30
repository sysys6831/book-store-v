// src/components/common/Header.tsx
import styled from "styled-components";

function Header() {
  return (
    <HeaderStyle>
      <h1>book store</h1>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  /* 테마 창고에서 headerBackground 값을 가져옵니다 */
  background-color: ${(props) => props.theme.headerBackground};
  padding: 5px 10px;

  h1 {
    /* 테마 창고에서 headerColor 값을 가져옵니다 */
    color: ${(props) => props.theme.headerColor};
    margin: 0;
  }
`;

export default Header;
