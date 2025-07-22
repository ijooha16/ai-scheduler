import {
  TodoType,
  UpdateCompletePayload,
  UpdateContentPayload,
} from "@/types/todo.type";
import { createClient } from "@/utils/supabase/client";

//todo 가져오기
export const getTodo = async (goalId: number) => {
  const supabase = createClient();

  if (!goalId) return;

  try {
    const { data } = await supabase
      .from("todos")
      .select("*")
      .eq("goal_id", goalId)
      .order("order", { ascending: true });

    const groupedTodos = data?.reduce(
      (acc, cur) => {
        if (!acc[cur.step]) {
          acc[cur.step] = [];
        }
        acc[cur.step].push(cur);
        return acc;
      },
      {} as Record<string, (typeof data)[number][]>,
    );

    return groupedTodos;
  } catch (error) {
    console.log(error);
  }
};

//todo 추가

//todo 삭제
export const removeTodo = async (todoId: number) => {
  const supabase = createClient();

  if (!todoId) return;

  try {
    await supabase.from("todos").delete().eq("id", todoId);
  } catch (error) {
    console.log(error);
  }
};

//todo 수정
export const editTodo = async (data: TodoType) => {
  const supabase = createClient();

  if (!data.id) return;

  try {
    await supabase
      .from("todos")
      .update({ completed: data.completed, content: data.content })
      .eq("id", data.id);
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoContent = async (data: UpdateContentPayload) => {
  const supabase = createClient();
  const { content, id } = data;

  if (!data.id) return;

  try {
    const { data } = await supabase
      .from("todos")
      .update({ content })
      .eq("id", id)
      .select();

    return data?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoComplete = async (data: UpdateCompletePayload) => {
  const supabase = createClient();
  const { completed, id } = data;

  if (!data.id) return;

  try {
    const { data } = await supabase
      .from("todos")
      .update({ completed })
      .eq("id", id)
      .select();

    return data?.[0];
  } catch (error) {
    console.log(error);
  }
};

export const updateTodoOrder = async (data: TodoType) => {
  const supabase = createClient();
  const { order, id } = data;

  if (!data.id) return;

  try {
    await supabase.from("todos").update({ order }).eq("id", id);
  } catch (error) {
    console.log(error);
  }
};
