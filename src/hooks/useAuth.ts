import { useState } from "react";
import { useNavigate } from "react-router"; // react-router-dom 사용 금지 규칙 준수

export const useAuth = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const navigate = useNavigate();

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    navigate("/");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return { isLoggedIn, login, logout };
};
