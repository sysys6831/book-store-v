import styled from "styled-components";
// 주의: 아래 타입(HeadingSize, ColorKey)은 theme.ts에 미리 정의되어 있어야 합니다.
import { type HeadingSize, type ColorKey } from "../../style/theme";

interface Props {
  children: React.ReactNode;
  size: HeadingSize;
  color?: ColorKey;
}

function Title({ children, size, color }: Props) {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
}

// children을 제외한 Props만 스타일로 전달합니다.
const TitleStyle = styled.h1<Omit<Props, "children">>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) =>
    color ? theme.color[color] : theme.color.primary};
`;

export default Title;
