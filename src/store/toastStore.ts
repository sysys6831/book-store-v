// src/store/toastStore.ts
import { create } from "zustand";

export interface ToastItem {
  id: number;
  message: string;
  type: "info" | "error";
}

interface ToastState {
  toasts: ToastItem[];
  addToast: (message: string, type?: "info" | "error") => void;
  removeToast: (id: number) => void;
}

export const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, type = "info") => {
    const id = Date.now();
    // 새로운 토스트를 목록에 추가합니다.
    set((state) => ({
      toasts: [...state.toasts, { id, message, type }],
    }));
    // 3초 뒤에 자동으로 해당 토스트를 지웁니다.
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    })),
}));
