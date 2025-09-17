import styled from "@emotion/styled";
import { Check, Edit3, Trash } from "lucide-react";
import {
  useUpdateTodoCompleteMutation,
  useUpdateTodoContentMutation,
} from "@/tanstack/mutations/edit-todo-mutation";
import React, { useEffect, useState } from "react";
import { TodoType } from "@/types/todo.type";
import { useRemoveTodoMutation } from "@/tanstack/mutations/remove-todo-mutation";
import { composeContent, parseContent } from "@/utils/parse-content";

export const TodoItem = React.memo(({ todo }: { todo: TodoType }) => {
  const { id, content, completed, goal_id } = todo;

  const { main: initMain, meta: initMeta } = parseContent(content);
  const [mainInput, setMainInput] = useState(initMain);
  const [metaInput, setMetaInput] = useState(initMeta);

  const { mutate: updateTodoComplete } = useUpdateTodoCompleteMutation();
  const { mutate: updateTodoContent } = useUpdateTodoContentMutation();
  const { mutate: removeTodo } = useRemoveTodoMutation();

  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (isEditing) {
      const { main, meta } = parseContent(content);
      setMainInput(main);
      setMetaInput(meta);
    }
  }, [isEditing, content]);

  const clickEditHandler = () => {
    setIsEditing(false);
    const next = composeContent(mainInput, metaInput);
    updateTodoContent({ id, content: next });
  };

  return (
    <StyledTodo key={id} checked={completed}>
      {isEditing ? (
        <div className="flex flex-1 flex-col">
          <input
            className="font-semibold"
            placeholder="할 일 내용"
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
          />
          <input
            className="text-xs text-gray-600"
            placeholder="메모/태그 등 (괄호 없이)"
            value={metaInput}
            onChange={(e) => setMetaInput(e.target.value)}
            onPointerDown={(e) => e.stopPropagation()}
          />
          <div className="mt-1 flex items-center justify-end gap-2"></div>
        </div>
      ) : (
        <div className="flex flex-col gap-1">
          <div className="font-semibold">{initMain}</div>
          {initMeta && (
            <div className="text-xs text-gray-600">
              <span className="tracking-tight">{initMeta}</span>
            </div>
          )}
        </div>
      )}

      <div className="flex gap-3">
        <Trash size={16} onClick={() => removeTodo(id)} />
        {isEditing ? (
          <button onClick={clickEditHandler}>
            <Check size={16} />
          </button>
        ) : (
          <Edit3 size={16} onClick={() => setIsEditing(true)} />
        )}
        <div
          onClick={() => updateTodoComplete({ id, completed: !completed })}
          className="cursor-pointer"
        >
          {completed ? <Check size={20} /> : <StyledCheckBox />}
        </div>
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
  gap: 20px;
  align-items: center;
`;

const StyledCheckBox = styled.div`
  width: 20px;
  height: 20px;
  border: 2px solid white;
  border-radius: 4px;
`;
