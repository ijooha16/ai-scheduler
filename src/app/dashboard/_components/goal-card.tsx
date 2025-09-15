"use client";

import Theme from "@/components/common/theme";
import BoxContainer from "@/components/layout/box-container";
import useAuthStore from "@/stores/use-auth-store";
import { useRemoveGoalMutation } from "@/tanstack/mutations/remove-goal-mutation";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { GoalType } from "@/types/goal.type";
import { TodoType } from "@/types/todo.type";
import { Trash } from "lucide-react";
import Link from "next/link";

const GoalCard = ({ data }: { data: GoalType }) => {
  const { data: todos } = useGetTodoQuery(data.id);
  const { id, title, theme } = data;

  const completedStep =
    todos &&
    (Object.values(todos) as TodoType[][])
      .map((todoList) => todoList.every((t) => t.completed))
      .filter(Boolean).length;

  return (
    <div>
      <Link key={id} href={`/dashboard/${id}`}>
        <BoxContainer>
          <div className="flex items-center justify-between gap-6">
            <div className="font-semibold">{title}</div>
            <Theme theme={theme} />
          </div>
          {completedStep === 0 ? (
            <div>어서 시작해서 목표를 완료해보세요!</div>
          ) : (
            <div>
              {todos && Object.values(todos).length}개의 스텝 중 {completedStep}
              개의 스텝을 완료했어요!
            </div>
          )}
        </BoxContainer>
      </Link>
    </div>
  );
};

export default GoalCard;
