import { TodoType, UpdateCompletePayload } from "@/types/todo.type";
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
      .order("goal_id", { ascending: true });

    return data;
  } catch (error) {
    console.log(error);
  }
};

//todo 추가

//todo 삭제

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

export const updateTodoContent = async (data: TodoType) => {
  const supabase = createClient();
  const { content, id } = data;

  if (!data.id) return;

  try {
    await supabase.from("todos").update({ content }).eq("id", id);
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
