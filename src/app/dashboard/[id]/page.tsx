"use client";

import PageContainer from "@/components/layout/page-container";
import { use } from "react";
import { useEditTodoMutation } from "@/tanstack/mutations/edit-todo-mutation";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import styled from "@emotion/styled";
import { Check } from "lucide-react";
import React from "react";
import { TodoType } from "@/types/todo.type";

const GoalDetail = ({ params }: { params: { id: string } }) => {
  const { id } = use(params);
  const { data: todos } = useGetTodoQuery([id]);
  const { mutate: updateTodo } = useEditTodoMutation([id]);
  const groupedTodos = todos?.reduce(
    (acc, cur) => {
      if (!acc[cur.step]) {
        acc[cur.step] = [];
      }
      acc[cur.step].push(cur);
      return acc;
    },
    {} as Record<string, (typeof todos)[number][]>,
  );

  return (
    <>
      {groupedTodos &&
        (
          Object.entries(groupedTodos) as [step: string, todos: TodoType[]][]
        ).map(([step, todos]) => (
          <div className="flex w-full flex-col gap-2" key={step}>
            <h2 className="mb-2 text-xl font-semibold">Step {step}</h2>
            {todos.map((todo) => (
              <StyledTodo key={todo.id} checked={todo.completed}>
                {todo.content}
                <div
                  onClick={() =>
                    updateTodo({
                      id: todo.id,
                      content: todo.content,
                      completed: !todo.completed,
                    })
                  }
                  className="cursor-pointer"
                >
                  {todo.completed ? <Check size={20} /> : <StyledCheckBox />}
                </div>
              </StyledTodo>
            ))}
          </div>
        ))}
    </>
  );
};

export default GoalDetail;

const StyledTodo = styled.div<{checked:boolean}>`
  padding: 6px 12px;
  background-color: ${({checked}) => checked ? 'var(--color-gray-100)' : 'var(--color-secondary-50)'};
  color: ${({checked}) => checked ? 'var(--color-gray-300)' : ''};
  text-decoration: ${({checked}) => checked ? 'line-through' : ''};
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
`;

const StyledCheckBox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 4px;
`;
