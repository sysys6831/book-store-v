import styled from "styled-components";
import { type ButtonScheme, type ButtonSize } from "../../style/theme";

// 기본 버튼의 HTML 속성을 모두 상속받습니다. (onClick 등 사용 가능)
interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  size: ButtonSize;
  scheme: ButtonScheme;
}

function Button({ children, size, scheme, ...props }: Props) {
  return (
    <ButtonStyle size={size} scheme={scheme} {...props}>
      {children}
    </ButtonStyle>
  );
}

const ButtonStyle = styled.button<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.button[size].fontSize};
  padding: ${({ theme, size }) => theme.button[size].padding};
  color: ${({ theme, scheme }) => theme.buttonScheme[scheme].color};
  background-color: ${({ theme, scheme }) =>
    theme.buttonScheme[scheme].backgroundColor};
  border: 0;
  border-radius: ${({ theme }) => theme.borderRadius.default};
  cursor: pointer;
`;

export default Button;
