// src/pages/ResetPassword.tsx
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import styled from "styled-components";
import Title from "../components/common/Title";
import InputText from "../components/common/InputText";
import Button from "../components/common/Button";
import { resetPassword } from "../api/auth.api";

interface ResetProps {
  email: string;
}

function ResetPassword() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetProps>();
  const navigate = useNavigate();

  const onSubmit = (data: ResetProps) => {
    resetPassword(data).then(() => {
      window.alert("비밀번호 초기화가 요청되었습니다. 이메일을 확인해 주세요.");
      navigate("/login");
    });
  };

  return (
    <ResetStyle>
      <div className="reset-title">
        <Title size="large">비밀번호 초기화</Title>
      </div>
      <div className="reset-form">
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
            <Button type="submit" size="medium" scheme="primary">
              초기화 요청
            </Button>
          </fieldset>
        </form>
      </div>
    </ResetStyle>
  );
}

const ResetStyle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;

  .reset-title {
    width: 100%;
    max-width: 400px;
    text-align: left;
    margin-bottom: 20px;
  }
  .reset-form {
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
  }
`;

export default ResetPassword;
