"use client";

import React, { useState } from "react";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { TodoType } from "@/types/todo.type";
import { useParams } from "next/navigation";
import { TodoItem } from "@/components/common/todo-item";
import { Check, Edit3, Trash } from "lucide-react";
import { useEditGoalMutation } from "@/tanstack/mutations/edit-goal-mutation";
import useAuthStore from "@/stores/use-auth-store";
import {
  useGetGoalByIdQuery,
  useGetGoalQuery,
} from "@/tanstack/queries/get-goal-query";
import { EditGoalType } from "@/types/goal.type";

const GoalDetail = () => {
  const { id } = useParams();
  if (typeof id !== "string") return null;

  const { userId } = useAuthStore();
  const { data: goal } = useGetGoalByIdQuery({ goalId: parseInt(id), userId });
  const { data: todos } = useGetTodoQuery(parseInt(id));

  return (
    <>
      {goal ? <GoalHeader goal={goal} /> : <div>불러오는중...</div>}
      {todos &&
        (Object.entries(todos) as [step: string, todos: TodoType[]][]).map(
          ([step, todos]) => (
            <div className="flex w-full flex-col gap-2" key={step}>
              <h2 className="mb-2 text-xl font-semibold">Step {step}</h2>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          ),
        )}
    </>
  );
};

export default GoalDetail;

const GoalHeader = ({ goal }: { goal: EditGoalType }) => {
  const { id, title, theme } = goal;

  const { userId } = useAuthStore();
  const { mutate: editGoal } = useEditGoalMutation(userId);

  const [inputValue, setInputValue] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const clickEditHandler = () => {
    setIsEditing(false);
    editGoal({ id, title: inputValue, theme });
  };

  return (
    <>
      <div onClick={() => setIsEditing(true)}>
        <Edit3 size={14} />
      </div>
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
    </>
  );
};
