import { QUERYKEY } from "@/constants/query-key.constant";
import { getGoal, getGoalById } from "@/services/goal";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalQuery = (userId: string | null) => {
  return useQuery({
    queryFn: () => getGoal(userId),
    queryKey: [QUERYKEY.GOAL, userId],
    enabled: !!userId,
  });
};

export const useGetGoalByIdQuery = ({
  goalId,
  userId,
}: {
  goalId: number | null;
  userId: string | null;
}) => {
  return useQuery({
    queryFn: () => getGoalById(goalId),
    queryKey: [QUERYKEY.GOAL, userId],
    enabled: !!goalId && !!userId,
  });
};
