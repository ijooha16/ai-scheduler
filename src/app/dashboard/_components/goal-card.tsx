import Theme from "@/components/common/theme";
import BoxContainer from "@/components/layout/box-container";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { GoalType } from "@/types/goal.type";
import Link from "next/link";
import React from "react";

const GoalCard = ({ d }: { d: GoalType }) => {
  const { data: todos } = useGetTodoQuery(d.id);

  const percentage =
    todos &&
    Math.floor(
      (todos?.filter((todo) => todo.completed).length / todos.length) * 100,
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
};

export default GoalCard;
