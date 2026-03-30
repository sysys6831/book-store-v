import styled from "styled-components";

function Footer() {
  return (
    <FooterStyle>
      <hr />
      <p>copyright(c), 2024, book store.</p>
    </FooterStyle>
  );
}

const FooterStyle = styled.footer`
  hr {
    border: 0;
    border-top: 1px solid #ccc;
    margin-top: 20px;
    margin-bottom: 10px;
  }

  p {
    font-size: 14px;
    margin: 0;
    padding-left: 10px;
  }
`;

export default Footer;
