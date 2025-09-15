import PageContainer from "@/components/layout/page-container";
import { login, signInWithKakao, signup } from "../../services/auth";
import { ReactNode } from "react";

export default function Login() {
  return (
    <PageContainer>
      <form className="flex flex-col gap-4">
        <AuthInput type="email" />
        <AuthInput type="password" />
        <AuthButton formAction={login}>Log in</AuthButton>
        <AuthButton formAction={signup}>Sign up</AuthButton>
      </form>
      <AuthButton onClick={signInWithKakao}>카카오 로그인</AuthButton>
    </PageContainer>
  );
}

const AuthInput = ({ type }: { type: string }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={type} className="font-semibold">
        {type}
      </label>
      <input
        id={type}
        name={type}
        required
        className="h-10 rounded-lg bg-gray-200"
      />
    </div>
  );
};

const AuthButton = ({
  onClick,
  formAction,
  children,
}: {
  onClick?: () => void;
  formAction?: (formData: FormData) => void;
  children: ReactNode;
}) => {
  return (
    <button onClick={onClick} formAction={formAction}>
      {children}
    </button>
  );
};
