import { getUser } from "@/services/auth";
import { getUserData } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

export const useGetUserQuery = (userId: string | null) => {

  return useQuery({
    queryFn: () => getUserData(userId),
    queryKey: ["user", userId],
    enabled: !!userId,
  });
};
