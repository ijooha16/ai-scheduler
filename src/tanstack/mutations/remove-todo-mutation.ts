import { QUERYKEY } from "@/constants/query-key.constant";
import { removeTodo } from "@/services/todo";
import { TodoType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.TODO, updatedTodo.goal_id],
      });
    },
  });
};
