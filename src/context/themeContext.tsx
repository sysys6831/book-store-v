import { createContext, type ReactNode, useEffect, useState } from "react";
import { type ThemeName, getTheme } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

// 기본 테마와 로컬스토리지 키 설정
const DEFAULT_THEME_NAME = "light";
const THEME_LOCALSTORAGE_KEY = "book_store_theme";

// 1. Context에 들어갈 데이터의 타입(Interface) 정의
interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

// 2. 초기 상태값 설정
export const state: State = {
  themeName: DEFAULT_THEME_NAME as ThemeName,
  toggleTheme: () => {},
};

// 3. Context 생성
export const ThemeContext = createContext<State>(state);

// 4. Provider 컴포넌트 만들기 (App.tsx를 감싸줄 껍데기)
export const BookStoreThemeProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [themeName, setThemeName] = useState<ThemeName>(
    DEFAULT_THEME_NAME as ThemeName,
  );

  // 테마를 전환하고 로컬 스토리지에 저장하는 함수
  const toggleTheme = () => {
    const newThemeName = themeName === "light" ? "dark" : "light";
    setThemeName(newThemeName);
    localStorage.setItem(THEME_LOCALSTORAGE_KEY, newThemeName);
  };

  // 처음 앱이 켜질 때 로컬 스토리지에서 이전 테마 기록을 가져옴
  useEffect(() => {
    const savedThemeName = localStorage.getItem(
      THEME_LOCALSTORAGE_KEY,
    ) as ThemeName;
    setThemeName(savedThemeName || (DEFAULT_THEME_NAME as ThemeName));
  }, []);

  return (
    // 하위 컴포넌트들이 themeName과 toggleTheme을 쓸 수 있게 제공
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      {/* styled-components의 Provider와 GlobalStyle도 여기서 한 번에 처리 */}
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
