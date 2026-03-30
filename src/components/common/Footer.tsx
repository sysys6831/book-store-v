import styled from "styled-components";

function Footer() {
  return (
    <FooterStyle>
      <h1 className="logo">BOOKSTORE</h1>
      <div className="copyright">
        <p>copyright(c), 2024, Book Store.</p>
      </div>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  width: 100%;
  max-width: 1020px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between; /* 양 끝으로 밀어냅니다 */
  align-items: center;
  padding: 20px 0;
  border-top: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};

  .logo {
    font-size: 1.5rem;
    color: ${({ theme }) => theme.color?.text || "gray"};
  }

  .copyright p {
    font-size: 0.875rem;
    color: ${({ theme }) => theme.color?.text || "gray"};
  }
`;

export default Footer;
