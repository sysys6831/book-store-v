// src/store/authStore.ts
import { create } from "zustand";

interface StoreState {
  isloggedIn: boolean;
  storeLogin: (token: string) => void;
  storeLogout: () => void;
}

export const getToken = () => {
  return localStorage.getItem("token");
};

const setToken = (token: string) => {
  localStorage.setItem("token", token);
};

export const removeToken = () => {
  localStorage.removeItem("token");
};

// 전역 상태 창고 생성
export const useAuthStore = create<StoreState>((set) => ({
  // 처음 켜질 때 토큰이 있으면 true, 없으면 false
  isloggedIn: getToken() ? true : false,

  storeLogin: (token: string) => {
    setToken(token);
    set({ isloggedIn: true });
  },

  storeLogout: () => {
    removeToken();
    set({ isloggedIn: false });
  },
}));
