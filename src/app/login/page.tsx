import PageContainer from "@/components/layout/page-container";
import { login, signInWithKakao, signup } from "../../services/auth";

export default function Login() {
  return (
    <PageContainer>
      <form>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required />
        <label htmlFor="password">Password:</label>
        <input id="password" name="password" type="password" required />
        <button formAction={login}>Log in</button>
        <button formAction={signup}>Sign up</button>
      </form>
      <button onClick={signInWithKakao}>kakao</button>
    </PageContainer>
  );
}
