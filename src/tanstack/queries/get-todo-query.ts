import { QUERYKEY } from "@/constants/query-key.constant";
import { getTodo } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoQuery = (goalId: number) => {
  return useQuery({
    queryFn: () => getTodo(goalId),
    queryKey: [QUERYKEY.TODO, goalId],
    enabled: !!goalId,
  });
};
