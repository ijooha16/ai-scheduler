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
import React, { useState } from "react";

const GoalCard = ({ d }: { d: GoalType }) => {
  const { data: todos } = useGetTodoQuery(d.id);
  const { userId } = useAuthStore();
  const { mutate: removeGoal } = useRemoveGoalMutation(userId);
  const { id, title, theme } = d;

  const completedStep =
    todos &&
    (Object.values(todos) as TodoType[][])
      .map((todoList) => todoList.every((t) => t.completed))
      .filter(Boolean).length;

  return (
    <div>
      <div onClick={() => removeGoal(id)}>
        <Trash size={14} />
      </div>
      <Link key={id} href={`/dashboard/${id}`}>
        <BoxContainer>
          {title}
          <Theme theme={theme} />
          달성도 {completedStep} /{todos && Object.values(todos).length}
        </BoxContainer>
      </Link>
    </div>
  );
};

export default GoalCard;
