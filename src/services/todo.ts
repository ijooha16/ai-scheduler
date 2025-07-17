import { TodoType } from "@/types/todo.type";
import { createClient } from "@/utils/supabase/client";

export const getTodo = async (goalIds: string[] | []) => {
  const supabase = createClient();

  if (!goalIds) return;

  try {
    const { data } = await supabase
      .from("todos")
      .select("*")
      .in("goal_id", goalIds)
      .select("*");

    return data;
  } catch (error) {
    console.log(error);
  }
};

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
