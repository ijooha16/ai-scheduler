import { getResponseFromGenAi } from "@/services/genai";
import { useAuthStore } from "@/stores/use-auth-store";
import { useMutation } from "@tanstack/react-query";
import { useGetUserQuery } from "../queries/get-user";

export const useRequestGoalMutation = () => {
  const { userId } = useAuthStore();
  const { data } = useGetUserQuery(userId);



  return useMutation({
    mutationFn: (request: string) =>
      getResponseFromGenAi({ request, nickname:data.nickname }),
  });
};
