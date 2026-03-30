// src/style/global.ts
import "sanitize.css";
import { createGlobalStyle } from "styled-components";
import type { ThemeName } from "./theme";

interface Props {
  themeName: ThemeName;
}

export const GlobalStyle = createGlobalStyle<Props>`
  body {
    padding: 0;
    margin: 0;
    /* 테마가 light면 흰색, dark면 검은색 배경을 칠합니다 */
    background-color: ${(props) => (props.themeName === "light" ? "white" : "black")};
  }

  h1 {
    margin: 0;
  }

  * {
    color: ${(props) => (props.themeName === "light" ? "black" : "white")};
  }
`;
