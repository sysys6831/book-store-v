// src/components/books/BooksViewSwitcher.tsx
import styled from "styled-components";
import { FaList, FaTh } from "react-icons/fa";
import { useSearchParams } from "react-router";

export type ViewMode = "grid" | "list";

const viewOptions = [
  { value: "list", icon: <FaList /> },
  { value: "grid", icon: <FaTh /> },
];

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();
  // 주소창에 view 값이 없으면 기본값으로 'grid'를 사용합니다.
  const currentView = (searchParams.get("view") as ViewMode) || "grid";

  const handleSwitch = (value: ViewMode) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("view", value);
    setSearchParams(newParams);
  };

  return (
    <SwitcherStyle>
      {viewOptions.map((option) => (
        <button
          key={option.value}
          className={currentView === option.value ? "active" : ""}
          onClick={() => handleSwitch(option.value as ViewMode)}
        >
          {option.icon}
        </button>
      ))}
    </SwitcherStyle>
  );
}

const SwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  button {
    border: none;
    background-color: white;
    font-size: 1.5rem;
    color: #ccc;
    cursor: pointer;
    padding: 4px;
    border-radius: 4px;

    &.active {
      color: ${({ theme }) => theme.color?.primary || "midnightblue"};
    }
  }
`;

export default BooksViewSwitcher;
