// src/pages/Signup.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";

// 1. 회원가입에 필요한 데이터 규격을 정합니다.
interface SignupProps {
  email: string;
  password: string;
}

function Signup() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupProps>();

  // 2. 가입하기 버튼을 눌렀을 때 실행될 함수입니다.
  const onSubmit = (data: SignupProps) => {
    // 실제로는 여기서 서버의 회원가입 API를 호출합니다.
    console.log("회원가입 요청 데이터:", data);

    // 3. 성공했다고 가정하고 알림을 띄운 뒤 로그인 화면으로 보냅니다.
    window.alert("회원가입이 완료되었습니다!");
    navigate("/login");
  };

  return (
    <SignupStyle>
      <Title size="large">회원가입</Title>

      {/* 4. form 요소로 감싸고 onSubmit 이벤트를 연결해 줍니다. */}
      <form className="signup-form" onSubmit={handleSubmit(onSubmit)}>
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

          {/* type="submit" 버튼을 누르면 form 전체가 전송됩니다. */}
          <div className="submit-btn">
            <Button size="large" scheme="primary" type="submit">
              가입하기
            </Button>
          </div>
        </fieldset>
      </form>
    </SignupStyle>
  );
}

const SignupStyle = styled.div`
  max-width: 480px;
  margin: 0 auto;
  padding: 50px 0;
  display: flex;
  flex-direction: column;
  align-items: center;

  .signup-form {
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
`;

export default Signup;
