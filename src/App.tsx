// src/App.tsx
import { Routes, Route } from "react-router";
import { BookStoreThemeProvider } from "./context/themeContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import ResetPassword from "./pages/ResetPassword";
import Books from "./pages/Books";
import BookDetail from "./pages/BookDetail";

function App() {
  return (
    <BookStoreThemeProvider>
      <Layout>
        {/* URL 주소에 따라 화면이 바뀌는 영역입니다. */}
        <Routes>
          {/* 기본 주소(/)일 때는 Home 컴포넌트를 보여줍니다. */}
          <Route path="/" element={<Home />} />
          {/* /signup 주소일 때는 Signup 컴포넌트를 보여줍니다. */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/books" element={<Books />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/book/:id" element={<BookDetail />} />
        </Routes>
      </Layout>
    </BookStoreThemeProvider>
  );
}

export default App;
