import useAuthStore from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useGetUserQuery } from "../queries/get-user-query";
import { GoalType } from "@/types/goal.type";
import { addGoal } from "@/services/goal";

export const useAddGoalMutation = () => {
  const userId = useAuthStore.getState().userId;
  const { data } = useGetUserQuery(userId);

  return useMutation({
    mutationFn: (goal: GoalType) => addGoal({ goal, userId: data.uid }),
  });
};
