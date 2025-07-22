import { QUERYKEY } from "@/constants/query-key.constant";
import { removeTodo } from "@/services/todo";
import { TodoType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.setQueryData(
        [QUERYKEY.TODO, updatedTodo.goal_id],
        (old: TodoType[][]) => {
          if (!old) return [];
          return Object.values(old).map((todo) =>
            todo.filter((t) => t.id !== updatedTodo.id),
          );
        },
      );
    },
  });
};
