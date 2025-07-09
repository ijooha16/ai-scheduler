import { GoalType } from "@/types/goal.type";
import { createClient } from "@/utils/supabase/client";

export const addGoal = async ({
  goal,
  userId,
}: {
  goal: GoalType;
  userId: string;
}) => {
  const supabase = createClient();
  const { title, theme, todos } = goal;

  try {
    const { data, error } = await supabase
      .from("goals")
      .insert([
        {
          uid: userId,
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

    const rowsToInsert = todos.flatMap((weekTodos, weekIndex) =>
      weekTodos.map((task) => ({
        week: weekIndex + 1,
        content: task,
        completed: false,
        goal_id: data[0].id,
      })),
    );

    await supabase.from("todos").insert(rowsToInsert);
  } catch (error) {
    console.log(error);
  }
};
