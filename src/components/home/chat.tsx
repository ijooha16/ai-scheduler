import { Dispatch, SetStateAction } from "react";
import Button from "../common/Button";
import BoxContainer from "../layout/box-container";

const Chat = ({ inputValue, setInputValue, onClickHandler }: ChatProps) => {
  return (
    <BoxContainer className="w-full max-w-3xl items-end gap-8 bg-white">
      <input
        className="w-full focus:outline-none"
        placeholder="원하는 목표를 적어보세요. 구체적일수록 좋아요!"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <Button bg="gradient" onClick={() => onClickHandler()}>
        confirm
      </Button>
    </BoxContainer>
  );
};

export default Chat;

type ChatProps = {
  inputValue: string;
  setInputValue: Dispatch<SetStateAction<string>>;
  onClickHandler: () => void;
};
