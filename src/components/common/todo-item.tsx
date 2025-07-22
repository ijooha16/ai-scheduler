import styled from "@emotion/styled";
import { Check } from "lucide-react";
import { useUpdateTodoCompleteMutation } from "@/tanstack/mutations/edit-todo-mutation";
import React from "react";
import { TodoType } from "@/types/todo.type";

export const TodoItem = React.memo(({ todo }: { todo: TodoType }) => {
  const { mutate: updateTodoComplete } = useUpdateTodoCompleteMutation();

  return (
    <StyledTodo key={todo.id} checked={todo.completed}>
      {todo.content}
      <div
        onClick={() =>
          updateTodoComplete({
            id: todo.id,
            completed: !todo.completed,
          })
        }
        className="cursor-pointer"
      >
        {todo.completed ? <Check size={20} /> : <StyledCheckBox />}
      </div>
    </StyledTodo>
  );
});

const StyledTodo = styled.div<{ checked: boolean }>`
  padding: 6px 12px;
  background-color: ${({ checked }) =>
    checked ? "var(--color-gray-100)" : "var(--color-secondary-50)"};
  color: ${({ checked }) => (checked ? "var(--color-gray-300)" : "")};
  text-decoration: ${({ checked }) => (checked ? "line-through" : "")};
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
