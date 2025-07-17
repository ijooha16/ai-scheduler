"use client";

import Chat from "@/components/home/chat";
import PageContainer from "@/components/layout/page-container";
import { useRequestGoalMutation } from "@/tanstack/mutations/request-goals-mutation";
import styled from "@emotion/styled";
import { FormEvent, Fragment, useEffect, useState } from "react";
import useAuthStore from "@/stores/use-auth-store";
import { createClient } from "@/utils/supabase/client";
import ScheduleCard from "@/components/home/goal-card";
import { RequestType, GoalType } from "@/types/goal.type";
import { ChatType } from "@/types/chat.type";

const Home = () => {
  const [chats, setChats] = useState<ChatType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const { mutate: sendRequest, data, isPending } = useRequestGoalMutation();
  const schedule = data ? JSON.parse(data) : null;
  const { login, userId } = useAuthStore();

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        login(user.id);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    data &&
      setChats((prev) => [
        ...prev,
        { id: chats.length, type: "ai", content: schedule },
      ]);
  }, [data]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setChats((prev) => [
      ...prev,
      { id: chats.length, type: "user", content: inputValue },
    ]);
    sendRequest(
      chats
        .filter((chat) => chat.type === "user")
        .map((chat) => chat.content)
        .join(" ") +
        " " +
        inputValue,
    );
    setInputValue("");
  };

  const onClickHandler = (e: GoalType) => {
    sendRequest(JSON.stringify(e));
  };

  return (
    <>
      <CollapseExpandDiv show={!!data}>
        <>
          <div className="mt-auto" />
          {chats &&
            chats.map((chat) =>
              typeof chat.content === "string" ? (
                <div key={chat.id} className="flex w-full justify-end">
                  <div className="bg-white">{chat.content}</div>
                </div>
              ) : (
                <Fragment key={chat.id}>
                  <div>{chat.content.comment}</div>
                  {chat.content.goals.length === 3 ? (
                    <div className="grid grid-cols-3 gap-x-4">
                      {chat.content.goals.map((e: GoalType) => (
                        <Fragment key={e.title}>
                          <ScheduleCard
                            onClickHandler={() => onClickHandler(e)}
                            data={e}
                          />
                        </Fragment>
                      ))}
                    </div>
                  ) : chat.content.goals.length === 1 ? (
                    <ScheduleCard single={true} data={chat.content.goals[0]} />
                  ) : null}
                </Fragment>
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
    </>
  );
};

export default Home;

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
