import styled from "@emotion/styled";
import { Check, Edit3, Trash } from "lucide-react";
import {
  useUpdateTodoCompleteMutation,
  useUpdateTodoContentMutation,
} from "@/tanstack/mutations/edit-todo-mutation";
import React, { useState } from "react";
import { TodoType } from "@/types/todo.type";
import { useRemoveTodoMutation } from "@/tanstack/mutations/remove-todo-mutation";

export const TodoItem = React.memo(({ todo }: { todo: TodoType }) => {
  const { id, content, completed, goal_id } = todo;

  const { mutate: updateTodoComplete } = useUpdateTodoCompleteMutation();
  const { mutate: updateTodoContent } = useUpdateTodoContentMutation();
  const { mutate: removeTodo } = useRemoveTodoMutation(goal_id!);

  const [inputValue, setInputValue] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const clickEditHandler = () => {
    setIsEditing(false);
    updateTodoContent({ id, content: inputValue });
  };

  return (
    <StyledTodo key={id} checked={completed}>
      {isEditing ? (
        <div>
          <input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <div onClick={() => clickEditHandler()}>
            <Check />
          </div>
        </div>
      ) : (
        <div>{content}</div>
      )}
      <Trash onClick={() => removeTodo(id)} />
      <div onClick={() => setIsEditing(true)}>
        <Edit3 />
      </div>
      <div
        onClick={() =>
          updateTodoComplete({
            id,
            completed: !completed,
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
