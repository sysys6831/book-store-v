// src/style/styled.d.ts
import "styled-components";
import {
  type ThemeName,
  type ColorKey,
  type HeadingSize,
  type ButtonSize,
  type ButtonScheme,
} from "./theme";

declare module "styled-components" {
  export interface DefaultTheme {
    name: ThemeName;
    color: Record<ColorKey, string>;
    heading: {
      [key in HeadingSize]: { fontSize: string };
    };
    button: {
      [key in ButtonSize]: { fontSize: string; padding: string };
    };
    buttonScheme: {
      [key in ButtonScheme]: { color: string; backgroundColor: string };
    };
    borderRadius: {
      default: string;
    };
  }
}
