import { QUERYKEY } from "@/constants/query-key.constant";
import { removeGoal } from "@/services/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useRemoveGoalMutation = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: removeGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.GOAL, userId] });
    },
  });
};
