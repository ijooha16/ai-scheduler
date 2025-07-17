import { editTodo } from "@/services/todo";
import { TodoType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useEditTodoMutation = (goalIds: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: TodoType) => editTodo(data),
    mutationKey: ["todo", goalIds],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todo", goalIds] });
    },
  });
};
