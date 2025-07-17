
import { getTodo } from "@/services/todo";
import { useQuery } from "@tanstack/react-query";

export const useGetTodoQuery = (goalIds: string[] | []) => {
  return useQuery({
    queryFn: () => getTodo(goalIds),
    queryKey: ["todo", goalIds],
    enabled: !!goalIds,
  });
};
