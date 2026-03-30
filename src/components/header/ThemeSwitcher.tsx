import { useContext } from "react";
import { ThemeContext } from "../../context/themeContext";

function ThemeSwitcher() {
  const { themeName, toggleTheme } = useContext(ThemeContext);

  return (
    <button onClick={toggleTheme}>
      {themeName === "light" ? "🌙 다크 모드로" : "☀️ 라이트 모드로"}
    </button>
  );
}

export default ThemeSwitcher;
