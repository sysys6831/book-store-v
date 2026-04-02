// src/pages/Signup.tsx
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router"; // Link 추가
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { signup } from "../api/auth.api";

export interface SignupProps {
  email: string;
  password: string;
}

function Signup() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  const navigate = useNavigate();

  const onSubmit = (data: SignupProps) => {
    signup(data).then(() => {
      window.alert("회원가입이 완료되었습니다.");
      navigate("/login");
    });
  };

  return (
    <SignupStyle>
      {/* 1. Title을 레이아웃 박스 안으로 집어넣어 정렬을 맞춥니다. */}
      <div className="signup-title">
        <Title size="large">회원가입</Title>
      </div>

      {/* 2. 폼 영역을 하얀색 박스로 감싸줍니다. */}
      <div className="signup-form">
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
              회원가입
            </Button>
          </fieldset>

          {/* 3. 비밀번호 초기화 링크를 추가합니다. */}
          <div className="info">
            <Link to="/reset">비밀번호 초기화</Link>
          </div>
        </form>
      </div>
    </SignupStyle>
  );
}

const SignupStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center; /* 전체 요소를 화면 가운데로 정렬 */
  padding: 50px 0;

  /* 제목 영역 스타일 */
  .signup-title {
    width: 100%;
    max-width: 400px;
    text-align: left; /* 박스 안에서는 왼쪽 정렬 */
    margin-bottom: 20px;
  }

  /* 폼 영역(하얀 박스) 스타일 */
  .signup-form {
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

    /* 비밀번호 초기화 링크 스타일 */
    .info {
      text-align: center;
      margin-top: 20px;
      a {
        font-size: 0.875rem;
        color: gray;
        text-decoration: underline; /* 클릭할 수 있음을 보여줌 */
      }
    }
  }
`;

export default Signup;
