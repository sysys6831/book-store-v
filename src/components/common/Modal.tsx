// src/components/common/Modal.tsx
import React from "react";
import styled from "styled-components";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, children }: Props) {
  if (!isOpen) return null;

  return (
    <ModalStyle onClick={onClose}>
      <div className="modal-body" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>
        {children}
      </div>
    </ModalStyle>
  );
}

const ModalStyle = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6); /* 반투명 배경 */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;

  .modal-body {
    position: relative;
    background-color: white;
    padding: 24px;
    border-radius: 8px;
    max-width: 80%;
    max-height: 80vh;
    overflow-y: auto;

    .close-btn {
      position: absolute;
      top: 12px;
      right: 12px;
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
    }
  }
`;

export default Modal;
