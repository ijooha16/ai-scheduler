"use client";

import useAuthStore from "@/stores/use-auth-store";
import { useGetGoalQuery } from "@/tanstack/queries/get-goal-query";
import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { TodoType } from "@/types/todo.type";
import { TodoItem } from "@/components/common/todo-item";
import Link from "next/link";
import { useRouter } from "next/navigation";

const MyStep = () => {
  const router = useRouter();
  const { userId } = useAuthStore();

  if (!userId) {
    router.push("/");
  }

  const { data } = useGetGoalQuery(userId);

  return (
    <div>
      {data?.map((d) => (
        <div key={d.id}>
          <MyStepBox goalId={d.id} title={d.title} />
        </div>
      ))}
    </div>
  );
};

export default MyStep;

const MyStepBox = ({ goalId, title }: { goalId: number; title: string }) => {
  const { data } = useGetTodoQuery(goalId);

  const currentStep: [step: string, todos: TodoType[]] =
    data &&
    (Object.entries(data) as [step: string, todos: TodoType[]][]).find(
      ([_, todos]) => todos.some((todo) => !todo.completed),
    );

  return (
    <div>
      <div className="flex w-full flex-col gap-2">
        {currentStep && (
          <>
            <Link
              href={`dashboard/${goalId}`}
              className="mb-2 text-xl font-semibold"
            >
              {title} Step {currentStep[0]}/ {data[currentStep[0]]?.length}
            </Link>
            {currentStep[1].map((todo, idx) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
