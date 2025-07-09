"use client";

import { useRequestMutation } from "@/tanstack/mutations/useRequestMutation";
import { useState } from "react";

const Chat = () => {
  const [inputValue, setInputValue] = useState("");
  const { mutate: sendRequest, data } = useRequestMutation();

  const onClickHandler = () => {
    sendRequest(inputValue);
    setInputValue('')
  };

  return (
    <div>
      <input
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={() => onClickHandler()}>confirm</button>
      {data && <div>{data}</div>}
    </div>
  );
};

export default Chat;
