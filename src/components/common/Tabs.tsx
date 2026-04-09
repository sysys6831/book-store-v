// src/components/common/Tabs.tsx
import React, { useState } from "react";
import styled from "styled-components";

interface TabItem {
  title: string;
  content: React.ReactNode;
}

interface Props {
  tabs: TabItem[];
}

function Tabs({ tabs }: Props) {
  // 첫 번째 탭(인덱스 0)을 기본 활성화 상태로 둡니다.
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeIndex === index ? "active" : ""}
            onClick={() => setActiveIndex(index)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="tab-content">{tabs[activeIndex].content}</div>
    </TabsStyle>
  );
}

const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid ${({ theme }) => theme.color?.border || "#ddd"};

    button {
      padding: 12px 24px;
      border: none;
      background-color: #f1f1f1;
      cursor: pointer;
      font-weight: bold;
      color: gray;

      &.active {
        background-color: ${({ theme }) => theme.color?.primary || "#ff5800"};
        color: white;
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export default Tabs;
