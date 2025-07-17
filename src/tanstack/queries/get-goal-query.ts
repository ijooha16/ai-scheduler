import { getGoal } from "@/services/goal";
import { useQuery } from "@tanstack/react-query";

export const useGetGoalQuery = (userId: string | null) => {
  return useQuery({
    queryFn: () => getGoal(userId),
    queryKey: ["goal", userId],
    enabled: !!userId,
  });
};
