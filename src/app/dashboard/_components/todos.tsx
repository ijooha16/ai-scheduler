"use client";

import { useEditTodoMutation } from "@/tanstack/mutations/edit-todo-mutation";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import styled from "@emotion/styled";
import { Check } from "lucide-react";
import React from "react";

const Todos = ({ id }: { id: string }) => {
  const { data: todos } = useGetTodoQuery([id]);
  const { mutate: updateTodo } = useEditTodoMutation([id]);

  return (
    <div className="flex flex-col gap-2">
      {todos?.map((todo) => (
        <StyledTodo key={todo.id}>
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
  );
};

export default Todos;

const StyledTodo = styled.div`
  padding: 6px 12px;
  background-color: lightblue;
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
