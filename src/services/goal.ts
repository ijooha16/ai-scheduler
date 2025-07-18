import { GoalType } from "@/types/goal.type";
import { createClient } from "@/utils/supabase/client";

export const getGoal = async (userId: string | null) => {
  const supabase = createClient();

  if (!userId) return;

  try {
    const { data } = await supabase
      .from("goals")
      .select("*")
      .eq("uid", userId)
      .select("*");

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const addGoal = async (goal: GoalType) => {
  const supabase = createClient();
  const { title, theme, todos } = goal;

  try {
    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          title,
          theme,
          completed: false,
        },
      ])
      .select();

    if (error) {
      console.error("Insert goal error:", error);
      return;
    }

    const rowsToInsert = todos.flatMap((stepTodos, stepIndex) =>
      stepTodos.map((task, idx) => ({
        uid: data[0].uid,
        step: stepIndex + 1,
        content: task,
        completed: false,
        goal_id: data[0].id,
        order: idx,
      })),
    );

    await supabase.from("todos").insert(rowsToInsert);
  } catch (error) {
    console.log(error);
  }
};
