// src/components/common/ToastContainer.tsx
import styled from "styled-components";
import { useToastStore } from "@/store/toastStore";

function ToastContainer() {
  const toasts = useToastStore((state) => state.toasts);

  return (
    <ToastContainerStyle>
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast ${toast.type}`}>
          <span className="icon">{toast.type === "info" ? "✅" : "❌"}</span>
          <p>{toast.message}</p>
        </div>
      ))}
    </ToastContainerStyle>
  );
}

const ToastContainerStyle = styled.div`
  position: fixed;
  top: 32px;
  right: 32px;
  z-index: 2000;
  display: flex;
  flex-direction: column;
  gap: 12px;

  .toast {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px 24px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    min-width: 250px;
    animation: slideIn 0.3s ease-out;

    &.error {
      border-left: 4px solid red;
    }
    &.info {
      border-left: 4px solid #ff5800;
    }
  }

  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`;

export default ToastContainer;
