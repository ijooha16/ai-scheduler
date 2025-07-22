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

// export const getCurrentStepTodos = async (goalId: number) => {
//   const supabase = createClient();

//   // 1. 모든 todos 불러오기
//   const { data: todos, error } = await supabase
//     .from("todos")
//     .select("*")
//     .eq("goal_id", goalId);

//   if (error || !todos) {
//     console.error("Fetch error:", error);
//     return [];
//   }

//   // 2. step별로 그룹화
//   const stepMap = todos.reduce((acc, todo) => {
//     if (!acc[todo.step]) acc[todo.step] = [];
//     acc[todo.step].push(todo);
//     return acc;
//   }, {} as Record<number, typeof todos>);

//   // 3. step 오름차순으로 정렬
//   const sortedSteps = Object.keys(stepMap)
//     .map(Number)
//     .sort((a, b) => a - b);

//   // 4. 각 step별로 전체가 completed 되었는지 확인
//   for (const step of sortedSteps) {
//     const stepTodos = stepMap[step];
//     const isAllCompleted = stepTodos.every((t) => t.completed);

//     if (!isAllCompleted) {
//       // 아직 완료 안 된 step 발견 → 그 step 리턴
//       return stepTodos;
//     }
//   }

//   // 모든 step이 완료된 경우 → 마지막 step 리턴
//   const lastStep = sortedSteps[sortedSteps.length - 1];
//   return stepMap[lastStep];
// };

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
