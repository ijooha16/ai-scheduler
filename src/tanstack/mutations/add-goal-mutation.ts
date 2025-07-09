import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useGetUserQuery } from "../queries/get-user";
import { GoalType } from "@/types/goal.type";
import { addGoal } from "@/services/goal";

export const useAddGoalMutation = () => {
  const { userId } = useAuthStore();
  const { data } = useGetUserQuery(userId);

  return useMutation({
    mutationFn: (goal: GoalType) => addGoal({ goal, userId: data.uid }),
  });
};
