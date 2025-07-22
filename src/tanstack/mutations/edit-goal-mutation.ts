import { QUERYKEY } from "@/constants/query-key.constant";
import { editGoal } from "@/services/goal";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditGoalMutation = (userId: string | null) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: editGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.GOAL, userId] });
    },
  });
};
