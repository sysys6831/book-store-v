// src/style/theme.ts
import { type DefaultTheme } from "styled-components";

export type ThemeName = "light" | "dark";
// 추가된 타입들
export type ColorKey =
  | "primary"
  | "background"
  | "secondary"
  | "third"
  | "border"
  | "text";
export type HeadingSize = "large" | "medium" | "small";
export type ButtonSize = "large" | "medium" | "small";
export type ButtonScheme = "primary" | "normal" | "dark";

export const light: DefaultTheme = {
  name: "light",
  color: {
    primary: "#ff5800",
    background: "white",
    secondary: "#5F5F5F",
    third: "green",
    border: "grey",
    text: "black",
  },
  heading: {
    large: { fontSize: "2rem" },
    medium: { fontSize: "1.5rem" },
    small: { fontSize: "1rem" },
  },
  button: {
    large: { fontSize: "1.5rem", padding: "1rem 2rem" },
    medium: { fontSize: "1rem", padding: "0.5rem 1rem" },
    small: { fontSize: "0.75rem", padding: "0.25rem 0.5rem" },
  },
  buttonScheme: {
    primary: { color: "white", backgroundColor: "midnightblue" },
    normal: { color: "black", backgroundColor: "lightgrey" },
    dark: { color: "white", backgroundColor: "black" },
  },
  borderRadius: {
    default: "4px",
  },
};

export const dark: DefaultTheme = {
  ...light,
  name: "dark",
  color: {
    ...light.color,
    background: "midnightblue",
    text: "white",
  },
};

export const getTheme = (themeName: ThemeName): DefaultTheme => {
  switch (themeName) {
    case "light":
      return light;
    case "dark":
      return dark;
  }
};
