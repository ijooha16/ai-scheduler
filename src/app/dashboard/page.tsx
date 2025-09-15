"use client";

import useAuthStore from "@/stores/use-auth-store";
import { useGetGoalQuery } from "@/tanstack/queries/get-goal-query";
import GoalCard from "./_components/goal-card";

const Dashboard = () => {
  const { userId } = useAuthStore();
  const { data } = useGetGoalQuery(userId);

  return (
    <>
      {data?.map((d) => (
        <GoalCard data={d} key={d.id} />
      ))}
    </>
  );
};

export default Dashboard;
