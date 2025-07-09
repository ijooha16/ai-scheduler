import { getResponseFromGenAi } from "@/services/genai";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useRequestMutation = () => {
  return useMutation({
    mutationFn: (request: string ) => getResponseFromGenAi({ request }),
  });
};
