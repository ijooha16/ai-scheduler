"use client";

import { QUERYKEY } from "@/constants/query-key.constant";
import {
  UpdateOrderBatchPayload,
  updateTodoComplete,
  updateTodoContent,
  updateTodosOrder,
} from "@/services/todo";
import { TodoType } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTodoCompleteMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoComplete,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.TODO, updatedTodo.goal_id],
      });
    },
  });
};

export const useUpdateTodoContentMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTodoContent,
    onSuccess: (updatedTodo: TodoType) => {
      queryClient.invalidateQueries({
        queryKey: [QUERYKEY.TODO, updatedTodo.goal_id],
      });
    },
  });
};

export const useUpdateTodosOrderMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateOrderBatchPayload) => updateTodosOrder(payload),
    onSettled: async (_data, _err, vars) => {
      await queryClient.invalidateQueries({
        queryKey: [QUERYKEY.TODO, vars.goalId],
      });
    },
  });
};
