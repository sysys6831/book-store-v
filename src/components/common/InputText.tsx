import React, { type ForwardedRef } from "react";
import styled from "styled-components";

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
}

const InputText = React.forwardRef(
  ({ placeholder, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) => {
    return <InputTextStyle placeholder={placeholder} ref={ref} {...props} />;
  },
);

// attrs를 사용해 기본 타입을 text로 고정합니다.
const InputTextStyle = styled.input.attrs({ type: "text" })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
