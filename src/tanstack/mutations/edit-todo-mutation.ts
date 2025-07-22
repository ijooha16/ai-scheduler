import { QUERYKEY } from "@/constants/query-key.constant";
import {
  updateTodoComplete,
} from "@/services/todo";
import { TodoType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodoCompleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoComplete,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.setQueryData(
        [QUERYKEY.TODO, updatedTodo.goal_id],
        (old: TodoType[][]) => {
          if (!old) return [];
          return Object.values(old).map((todo) =>
            todo.map((t) => (t.id === updatedTodo.id ? updatedTodo : t)),
          );
        },
      );
    },
  });
};
