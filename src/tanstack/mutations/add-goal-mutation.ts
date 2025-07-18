import useAuthStore from "@/stores/use-auth-store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { GoalType } from "@/types/goal.type";
import { addGoal } from "@/services/goal";
import { QUERYKEY } from "@/constants/query-key.constant";

export const useAddGoalMutation = () => {
  const queryClient = useQueryClient();
  const userId = useAuthStore.getState().userId;

  return useMutation({
    mutationFn: addGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERYKEY.GOAL, userId] });
    },
  });
};
