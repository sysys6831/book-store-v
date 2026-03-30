// src/style/styled.d.ts
import "styled-components";
import type { ThemeName } from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    name: ThemeName;
    background: string;
    color: string;
    headerBackground: string;
    headerColor: string;
  }
}
