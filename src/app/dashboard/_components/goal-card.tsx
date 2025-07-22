import Theme from "@/components/common/theme";
import BoxContainer from "@/components/layout/box-container";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { GoalType } from "@/types/goal.type";
import { TodoType } from "@/types/todo.type";
import Link from "next/link";
import React from "react";

const GoalCard = ({ d }: { d: GoalType }) => {
  const { data: todos } = useGetTodoQuery(d.id);

  const completedStep =
    todos &&
    (Object.values(todos) as TodoType[][])
      .map((todoList) => todoList.every((t) => t.completed))
      .filter(Boolean).length;

  return (
    <Link key={d.id} href={`/dashboard/${d.id}`}>
      <BoxContainer>
        {d.title}
        <Theme theme={d.theme} />
        달성도 {completedStep} /{todos && Object.values(todos).length}
      </BoxContainer>
    </Link>
  );
};

export default GoalCard;
