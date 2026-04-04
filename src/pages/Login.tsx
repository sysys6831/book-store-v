// src/pages/Login.tsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { login } from "../api/auth.api";
import { useAuthStore } from "../store/authStore";
import { type SignupProps } from "./Signup"; // 이메일/비밀번호 타입 재사용

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();
  const navigate = useNavigate();
  // 1. 전역 상태 창고에서 로그인 함수를 꺼내옵니다.
  const { storeLogin } = useAuthStore();

  const onSubmit = (data: SignupProps) => {
    login(data)
      .then((res) => {
        // 2. 로그인 성공 시 토큰을 저장하고 상태를 바꿉니다.
        storeLogin(res.token);
        window.alert("로그인 완료되었습니다.");
        navigate("/");
      })
      .catch(() => {
        // 3. 실패 시 알림을 띄웁니다.
        window.alert("로그인이 실패했습니다.");
      });
  };

  return (
    <LoginStyle>
      <div className="login-title">
        <Title size="large">로그인</Title>
      </div>
      <div className="login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <fieldset>
            <InputText
              placeholder="이메일"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="error-text">이메일을 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <InputText
              placeholder="비밀번호"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="error-text">비밀번호를 입력해주세요.</p>
            )}
          </fieldset>
          <fieldset>
            <Button type="submit" size="medium" scheme="primary">
              로그인
            </Button>
          </fieldset>
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </div>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  .login-title {
    width: 100%;
    max-width: 400px;
    text-align: left;
    margin-bottom: 20px;
  }
  .login-form {
    width: 100%;
    max-width: 400px;
    padding: 40px;
    background-color: white;
    border: 1px solid ${({ theme }) => theme.color?.border || "#ccc"};
    border-radius: ${({ theme }) => theme.borderRadius?.default || "4px"};
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    fieldset {
      border: 0;
      padding: 0;
      margin: 0 0 20px 0;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .error-text {
      color: red;
      font-size: 0.875rem;
      margin: 0;
      padding-left: 10px;
    }
    input {
      padding: 12px;
    }
    button {
      width: 100%;
      padding: 12px;
    }
    .info {
      text-align: center;
      margin-top: 20px;
      a {
        font-size: 0.875rem;
        color: gray;
        text-decoration: underline;
      }
    }
  }
`;

export default Login;
