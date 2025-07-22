import { QUERYKEY } from "@/constants/query-key.constant";
import { removeTodo } from "@/services/todo";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveTodoMutation = (goalId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeTodo,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.TODO, goalId] }),
  });
};
