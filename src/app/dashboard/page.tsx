"use client";

import Theme from "@/components/common/theme";
import BoxContainer from "@/components/layout/box-container";
import PageContainer from "@/components/layout/page-container";
import useAuthStore from "@/stores/use-auth-store";
import { useGetGoalQuery } from "@/tanstack/queries/get-goal-query";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import Link from "next/link";
import React from "react";

const Dashboard = () => {
  const { userId } = useAuthStore();
  const { data } = useGetGoalQuery(userId);
  const goalIdArr = data?.map((d) => d.id) || [];
  const { data: todos } = useGetTodoQuery(goalIdArr);

  return (
    <>
      {data?.map((d) => {
        const isGoalTodo = todos?.filter((todo) => todo.goal_id === d.id);
        const percentage =
          isGoalTodo &&
          Math.floor(
            (isGoalTodo?.filter((todo) => todo.completed).length /
              isGoalTodo.length) *
              100,
          );

        return (
          <Link key={d.id} href={`/dashboard/${d.id}`}>
            <BoxContainer>
              {d.title}
              <Theme theme={d.theme} />
              달성도 {percentage} %
            </BoxContainer>
          </Link>
        );
      })}
    </>
  );
};

export default Dashboard;
