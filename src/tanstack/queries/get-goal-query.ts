import { QUERYKEY } from "@/constants/query-key.constant";
import { getGoal } from "@/services/goal";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalQuery = (userId: string | null) => {
  return useQuery({
    queryFn: () => getGoal(userId),
    queryKey: [QUERYKEY.GOAL, userId],
    enabled: !!userId,
  });
};
