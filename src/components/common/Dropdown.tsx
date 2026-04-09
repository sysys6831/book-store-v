// src/components/common/Dropdown.tsx
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

// ✨ 드롭다운에 필요한 고유 속성만 정확하게 정의합니다.
interface Props {
  toggleButton: React.ReactNode;
  children: React.ReactNode;
}

function Dropdown({ toggleButton, children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <DropdownStyle ref={dropdownRef}>
      {/* ✨ 여기서 toggleButton을 정확히 사용합니다! */}
      <div className="toggle" onClick={() => setIsOpen(!isOpen)}>
        {toggleButton}
      </div>
      {isOpen && <div className="panel">{children}</div>}
    </DropdownStyle>
  );
}

const DropdownStyle = styled.div`
  position: relative;
  display: inline-block;

  .toggle {
    cursor: pointer;
  }

  .panel {
    position: absolute;
    top: 110%;
    right: 0;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.color?.border || "#ddd"};
    border-radius: 4px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    z-index: 100;
    min-width: 150px;
    padding: 8px 0;
  }
`;

export default Dropdown;
