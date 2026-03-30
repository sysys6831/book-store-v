import { BookStoreThemeProvider } from "./context/themeContext";
import ThemeSwitcher from "./components/header/ThemeSwitcher";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";

function App() {
  return (
    <BookStoreThemeProvider>
      <ThemeSwitcher />
      <Layout>
        <Home />
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
