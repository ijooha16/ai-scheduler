import { Dispatch, FormEvent, SetStateAction } from "react";
import Button from "../common/button";
import BoxContainer from "../layout/box-container";
import { useRouter } from "next/navigation";

const Chat = ({
  inputValue,
  setInputValue,
  onSubmitHandler,
  disabled,
}: ChatProps) => {
  const router = useRouter();
  const placeholder = disabled
    ? "로그인 하고 사용해보세요!"
    : "원하는 목표를 적어보세요. 구체적일수록 좋아요!";

  return (
    <BoxContainer className="h-36 w-full max-w-3xl shrink-0 bg-white">
      {disabled && (
        <div
          className="absolute h-full w-full"
          onClick={() => {
            if (disabled) {
              router.push("/login");
            }
          }}
        />
      )}
      <form
        onSubmit={onSubmitHandler}
        className="flex h-full flex-col items-end justify-between gap-8"
      >
        <input
          disabled={disabled}
          className="w-full focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <Button type="submit" disabled={disabled} bg="gradient">
          confirm
        </Button>
      </form>
    </BoxContainer>
  );
};

export default Chat;

type ChatProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onSubmitHandler: (e: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
};
