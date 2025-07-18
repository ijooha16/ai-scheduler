
import { getTodo } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoQuery = (goalId: number) => {
  return useQuery({
    queryFn: () => getTodo(goalId),
    queryKey: ["todo", goalId],
    enabled: !!goalId,
  });
};
