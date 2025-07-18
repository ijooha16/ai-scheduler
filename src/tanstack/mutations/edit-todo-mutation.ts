import {
  editTodo,
  updateTodoComplete,
  updateTodoContent,
  updateTodoOrder,
} from "@/services/todo";
import { TodoType, UpdateCompletePayload } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTodoMutation = (goalIds: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoType) => editTodo(data),
    mutationKey: ["todo", goalIds],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", goalIds] });
    },
  });
};

export const useUpdateTodoCompleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoComplete,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.setQueryData(
        ["todo", updatedTodo.goal_id],
        (old: TodoType[]) => {
          if (!old) return [];
          return old.map((todo) =>
            todo.id === updatedTodo.id ? updatedTodo : todo,
          );
        },
      );
    },
  });
};

export const useUpdateTodoContentMutation = (todoId: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoType) => updateTodoContent(data),
    mutationKey: ["todo", todoId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });
};

export const useUpdateTodoOrderMutation = (todoId: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoType) => updateTodoOrder(data),
    mutationKey: ["todo", todoId],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", todoId] });
    },
  });
};
