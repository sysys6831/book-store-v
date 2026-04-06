// src/pages/Login.tsx
import { useForm } from "react-hook-form";
// ❌ 안 쓰는 useNavigate는 지우고 Link만 남겼습니다. (react-router 규칙 준수)
import { Link } from "react-router";
import styled from "styled-components";

import Title from "@/components/common/Title";
import InputText from "@/components/common/InputText";
import Button from "@/components/common/Button";
import { useAuth } from "@/hooks/useAuth";

interface LoginProps {
  email: string;
  password: string;
}

function Login() {
  // ❌ const navigate = useNavigate(); 코드를 완전히 삭제했습니다.

  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>();

  const onSubmit = (data: LoginProps) => {
    console.log("로그인 시도 데이터:", data);
    login("fake-token-1234");
  };

  return (
    <LoginStyle>
      <Title size="large">로그인</Title>

      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <div className="input-group">
            <label>이메일</label>
            <InputText
              type="email"
              placeholder="이메일을 입력하세요"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="error-text">이메일을 입력해 주세요.</span>
            )}
          </div>

          <div className="input-group">
            <label>비밀번호</label>
            <InputText
              type="password"
              placeholder="비밀번호를 입력하세요"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="error-text">비밀번호를 입력해 주세요.</span>
            )}
          </div>

          <div className="submit-btn">
            <Button size="large" scheme="primary" type="submit">
              로그인
            </Button>
          </div>
        </fieldset>
      </form>

      <div className="signup-link">
        회원이 아니신가요? <Link to="/signup">회원가입</Link>
      </div>
    </LoginStyle>
  );
}

const LoginStyle = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .login-form {
    width: 100%;
    margin-top: 24px;

    fieldset {
      border: 0;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .input-group {
      display: flex;
      flex-direction: column;
      gap: 8px;
      label {
        font-weight: bold;
        color: ${({ theme }) => theme.color?.text || "black"};
      }
      .error-text {
        color: red;
        font-size: 0.875rem;
      }
    }

    .submit-btn {
      margin-top: 16px;
      button {
        width: 100%;
      }
    }
  }

  .signup-link {
    margin-top: 24px;
    color: gray;
    a {
      color: ${({ theme }) => theme.color?.primary || "blue"};
      font-weight: bold;
      text-decoration: none;
    }
  }
`;

export default Login;
