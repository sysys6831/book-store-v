// src/components/common/EllipsisBox.tsx
import { useState } from "react";
import styled from "styled-components";
import Button from "./Button";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";

interface Props {
  children: React.ReactNode;
  linelimit: number;
}

function EllipsisBox({ children, linelimit }: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <EllipsisBoxStyle linelimit={linelimit} $expanded={expanded}>
      <p>{children}</p>
      <div className="toggle">
        <Button
          size="small"
          scheme="normal"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "접기" : "더보기"}{" "}
          {expanded ? <FaAngleUp /> : <FaAngleDown />}
        </Button>
      </div>
    </EllipsisBoxStyle>
  );
}

interface EllipsisBoxStyleProps {
  linelimit: number;
  $expanded: boolean;
}

const EllipsisBoxStyle = styled.div<EllipsisBoxStyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    /* 펼쳐지지 않았을 때만 넘치는 줄을 숨깁니다 */
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? "none" : linelimit};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
    line-height: 1.5;
  }

  .toggle {
    display: flex;
    justify-content: flex-end;
    margin-top: 8px;
    button {
      display: flex;
      align-items: center;
      gap: 4px;
    }
  }
`;

export default EllipsisBox;
