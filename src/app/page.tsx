"use client";

import Chat from "@/components/home/chat";
import PageContainer from "@/components/layout/page-container";
import { useRequestMutation } from "@/tanstack/mutations/useRequestMutation";
import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";
import { useState } from "react";

const Home = () => {
  const [inputValue, setInputValue] = useState("");
  const { mutate: sendRequest, data } = useRequestMutation();

  const onClickHandler = () => {
    sendRequest(inputValue);
    setInputValue("");
  };

  return (
    <StyledPageContainer>
      {data && <CollapseExpandDiv show={!!data}>{data}</CollapseExpandDiv>}
      <Chat
        inputValue={inputValue}
        setInputValue={setInputValue}
        onClickHandler={onClickHandler}
      />
    </StyledPageContainer>
  );
};

export default Home;

const StyledPageContainer = styled(PageContainer)`
  background-image: radial-gradient(
    circle,
    var(--color-secondary-50),
    var(--color-primary-50),
    #fff
  );
`;

const CollapseExpandDiv = styled.div<{ show: boolean }>`
  overflow: hidden;
  transition:
    max-height 0.4s ease,
    opacity 0.3s ease;
  max-height: ${({ show }) => (show ? "1000px" : "0")};
  opacity: ${({ show }) => (show ? 1 : 0)};
  flex: 1;
`;
