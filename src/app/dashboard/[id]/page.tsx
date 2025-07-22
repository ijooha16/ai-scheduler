"use client";

import { useGetTodoQuery } from "@/tanstack/queries/get-todo-query";
import { TodoType } from "@/types/todo.type";
import { useParams } from "next/navigation";
import { TodoItem } from "@/components/common/todo-item";

const GoalDetail = () => {
  const { id } = useParams();
  if (typeof id !== "string") return null;
  const { data: todos } = useGetTodoQuery(parseInt(id));

  return (
    <>
      {todos &&
        (Object.entries(todos) as [step: string, todos: TodoType[]][]).map(
          ([step, todos]) => (
            <div className="flex w-full flex-col gap-2" key={step}>
              <h2 className="mb-2 text-xl font-semibold">Step {step}</h2>
              {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} />
              ))}
            </div>
          ),
        )}
    </>
  );
};

export default GoalDetail;
