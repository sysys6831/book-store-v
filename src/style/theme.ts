// src/style/theme.ts
import { type DefaultTheme } from "styled-components";
export type ThemeName = "light" | "dark";

// 2. 각 객체 뒤에 : DefaultTheme 를 붙여서 타입을 명시합니다.
export const light: DefaultTheme = {
  name: "light",
  background: "white",
  color: "black",
  headerBackground: "#d3d3d3",
  headerColor: "#a52a2a",
};

export const dark: DefaultTheme = {
  name: "dark",
  background: "black",
  color: "white",
  headerBackground: "#1e1e4b",
  headerColor: "#e97d7d",
};

export const getTheme = (themeName: ThemeName): DefaultTheme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
