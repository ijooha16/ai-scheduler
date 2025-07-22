"use client";

import Theme from "@/components/common/theme";
import BoxContainer from "@/components/layout/box-container";
import useAuthStore from "@/stores/use-auth-store";
import { useEditGoalMutation } from "@/tanstack/mutations/edit-goal-mutation";
import { useRemoveGoalMutation } from "@/tanstack/mutations/remove-goal-mutation";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { GoalType } from "@/types/goal.type";
import { TodoType } from "@/types/todo.type";
import { Check, Edit3, Trash } from "lucide-react";
import Link from "next/link";
import React, { useState } from "react";

const GoalCard = ({ d }: { d: GoalType }) => {
  const { data: todos } = useGetTodoQuery(d.id);
  const { userId } = useAuthStore();
  const { mutate: removeGoal } = useRemoveGoalMutation(userId);
  const { mutate: editGoal } = useEditGoalMutation(userId);
  const [inputValue, setInputValue] = useState(d.title);
  const [isEditing, setIsEditing] = useState(false);
  const { id, title, theme } = d;

  const completedStep =
    todos &&
    (Object.values(todos) as TodoType[][])
      .map((todoList) => todoList.every((t) => t.completed))
      .filter(Boolean).length;

  const clickEditHandler = () => {
    setIsEditing(false);
    editGoal({ id, title: inputValue, theme });
  };

  return (
    <div>
      <div onClick={() => removeGoal(d.id)}>
        <Trash size={14} />
      </div>
      <div onClick={() => setIsEditing(true)}>
        <Edit3 size={14} />
      </div>
      <Link key={d.id} href={`/dashboard/${d.id}`}>
        <BoxContainer>
          {isEditing ? (
            <div onClick={(e) => e.preventDefault()}>
              <input
                onChange={(e) => setInputValue(e.target.value)}
                value={inputValue}
              />
              <div onClick={() => clickEditHandler()}>
                <Check size={14} />
              </div>
            </div>
          ) : (
            title
          )}
          <Theme theme={d.theme} />
          달성도 {completedStep} /{todos && Object.values(todos).length}
        </BoxContainer>
      </Link>
    </div>
  );
};

export default GoalCard;
