"use client";

import Chat from "@/components/home/chat";
import PageContainer from "@/components/layout/page-container";
import { useRequestMutation } from "@/tanstack/mutations/useRequestMutation";
import styled from "@emotion/styled";
import { FormEvent, Fragment, useEffect, useState } from "react";
import { useAuthStore } from "@/stores/use-auth-store";
import { createClient } from "@/utils/supabase/client";
import ScheduleCard from "@/components/home/schedule-card";
import { ScheduleType } from "@/types/schedule.type";
import { ChatType } from "@/types/chat.type";

const Home = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { mutate: sendRequest, data, isPending } = useRequestMutation();
  const schedule = data ? JSON.parse(data) : "";

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        useAuthStore.getState().login(user.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    data && setChats((prev) => [...prev, { type: "ai", content: schedule }]);
  }, [data]);

  const { userId } = useAuthStore();

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendRequest(inputValue);
    setChats((prev) => [...prev, { type: "ai", content: inputValue }]);
    setInputValue("");
  };

  return (
    <StyledPageContainer>
      <CollapseExpandDiv show={!!data}>
        <>
          <div className="mt-auto" />
          {chats &&
            chats.map((chat) =>
              typeof chat.content === "string" ? (
                <div className="flex w-full justify-end">
                  <div className="bg-white">{chat.content}</div>
                </div>
              ) : (
                <>
                  <div>{chat.content.comment}</div>
                  {chat.content.plans.length > 0 && (
                    <div className="grid grid-cols-3 gap-x-4">
                      {chat.content.plans.map((e: ScheduleType) => (
                        <Fragment key={e.title}>
                          <ScheduleCard data={e} />
                        </Fragment>
                      ))}
                    </div>
                  )}
                </>
              ),
            )}
          {isPending && <div className="w-full">Thinking</div>}
        </>
      </CollapseExpandDiv>
      <Chat
        disabled={!userId}
        inputValue={inputValue}
        setInputValue={setInputValue}
        onSubmitHandler={onSubmitHandler}
      />
    </StyledPageContainer>
  );
};

export default Home;

const StyledPageContainer = styled(PageContainer)`
  min-height: 0;
  background-image: radial-gradient(
    circle,
    var(--color-secondary-50),
    var(--color-primary-50),
    #fff
  );
`;

const CollapseExpandDiv = styled.div<{ show: boolean }>`
  overflow: auto;
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;

  /* Chrome, Safari, Edge */
  &::-webkit-scrollbar {
    width: 6px;
  }

  /* Firefox */
  scrollbar-width: thin;
`;
